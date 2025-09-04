import { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import gamesData from "./data/games.json";

export default function App() {
  const [games, setGames] = useState<typeof gamesData>([]);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  return (
    <div className="w-full bg-gray-50 flex flex-col items-center">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-center my-10">EXIT Spiel Collection</h1>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-6">
        {games.sort((a, b) => a.year - b.year).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
