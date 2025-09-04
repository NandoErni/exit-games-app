import { useState } from "react";
import GameCard, { type Game } from "./game-card";
import { Badge } from "./ui/badge";
import myGamesData from "@/data/mygames.json";


interface GamesProps {
  games: Game[];
}
const gameFilters = [
  "all",
  //"einsteiger",
  //"fortgeschrittene",
  //"profi",
  "not-owned",
  "owned",
  "played",
  "not-played",
  "advent-calendar"
] as const;
type GameFilter = (typeof gameFilters)[number];

const filterFunctions: Record<GameFilter, (game: Game) => boolean> = {
  "all": () => true,
  //"einsteiger": (game) => true,
  //"fortgeschrittene": (game) => true,
  //"profi": (game) => true,
  "not-owned": (game) => !myGamesData.gameIDsOwned.includes(game.id),
  "owned": (game) => myGamesData.gameIDsOwned.includes(game.id),
  "played": (game) => myGamesData.gameIDsPlayed.includes(game.id),
  "not-played": (game) => !myGamesData.gameIDsPlayed.includes(game.id),
  "advent-calendar": (game) => game.title.toLowerCase().includes("adventskalender"),
};

export default function Games({ games }: GamesProps) {
  const [gameFilter, setGameFilter] = useState<GameFilter>("all");

  return (
    <>
      <div className="flex items-center space-x-2 space-y-2 mb-6 flex-wrap justify-center">
        {gameFilters.map((filter) => (
          <Badge
            key={filter}
            variant={gameFilter === filter ? "secondary" : "outline"}
            onClick={() => setGameFilter(filter)}
            className="cursor-pointer"
          >
            {filter.replace("-", " ")}
          </Badge>
        ))}
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-6">
        {games
          .filter((game) => filterFunctions[gameFilter](game))
          .sort((a, b) => a.year - b.year)
          .map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
      </div>
    </>
  );
}
