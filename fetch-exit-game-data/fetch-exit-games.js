// fetch-exit-games.js
import fetch from "node-fetch";
import fs from "fs";
import { parseStringPromise } from "xml2js";

const SEARCH_URL =
  "https://boardgamegeek.com/xmlapi2/search?query=EXIT%3A%20Das%20Spiel&type=boardgame";
const THING_URL = "https://boardgamegeek.com/xmlapi2/thing";

// Matches variants like "EXIT: Das Spiel – …", "EXIT – Das Spiel …", even with ® and different dashes
const EXIT_DE_REGEX = /^EXIT(?:\s*®)?\s*[:\-–]\s*Das Spiel\b/i;

async function fetchXML(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
  const text = await res.text();
  return parseStringPromise(text);
}

function pickGermanTitle(nameNodes = []) {
  // Gather all name values
  const values = nameNodes
    .map((n) => n?.$?.value)
    .filter(Boolean);

  // Prefer a value that clearly looks like the German series title
  const german = values.find((v) => EXIT_DE_REGEX.test(v));

  // Fallbacks: primary -> first entry (just in case)
  const primary = nameNodes.find((n) => n?.$?.type === "primary")?.$?.value || null;

  return german || primary || values[0] || null;
}

async function fetchGameDetails(ids) {
  const url = `${THING_URL}?id=${ids.join(",")}&stats=1`;
  const data = await fetchXML(url);

  return (data.items.item || []).map((game) => {
    const title = pickGermanTitle(game.name || []);
    const year = parseInt(game.yearpublished?.[0]?.$.value) || null;
    const image = game.image?.[0] || null;
    const weight =
      parseFloat( game.statistics?.[0]?.ratings?.[0]?.averageweight?.[0]?.$.value);

    return {
      id: parseInt(game.$.id),
      title,              // German only
      year,
      image,
      difficulty: weight, // BGG average weight
      bgg_url: `https://boardgamegeek.com/boardgame/${game.$.id}`,
    };
  });
}

async function main() {
  console.log("🔍 Searching for EXIT games...");
  const searchResult = await fetchXML(SEARCH_URL);

  const items = searchResult.items.item || [];
  const ids = items.map((i) => i.$.id);

  console.log(`Found ${ids.length} games. Fetching details in chunks...`);

  // Chunk by 20 (BGG limit)
  const chunks = [];
  for (let i = 0; i < ids.length; i += 20) chunks.push(ids.slice(i, i + 20));

  let allGames = [];
  for (const [index, chunk] of chunks.entries()) {
    console.log(`➡️ Fetching chunk ${index + 1}/${chunks.length}...`);
    const games = await fetchGameDetails(chunk);
    allGames = allGames.concat(games);
    // polite delay to avoid throttling
    await new Promise((r) => setTimeout(r, 2000));
  }

  fs.writeFileSync('games.json', JSON.stringify(allGames, null, 2));
  console.log("✅ Saved games.json with", allGames.length, "games.");
}

main().catch((err) => console.error(err));
