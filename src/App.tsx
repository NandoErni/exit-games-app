import { useState, useEffect } from "react";
import GameCard from "./components/game-card";
import gamesData from "./data/games.json";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [games, setGames] = useState<typeof gamesData>([]);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center my-5">
          <h1 className="text-3xl font-bold text-center my-10">EXIT Spiel Collection</h1>
          <ModeToggle />
        </div>

        <Separator className="mb-6" />

        <Badge className="mb-6">Total Games: {games.length}</Badge>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-6">
          {games.sort((a, b) => a.year - b.year).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
