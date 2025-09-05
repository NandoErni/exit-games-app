import { useState, useEffect } from "react";
import gamesData from "@/data/games.json";
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator";
import Games from "@/components/games";
import Navbar from "@/components/navbar";

export default function App() {
  const [games, setGames] = useState<typeof gamesData>([]);

  useEffect(() => {
    setGames(gamesData.filter((game) => !game.title.includes("Kids") && !game.title.includes("Family")));
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full flex flex-col items-center">
        
        <Navbar />
        
        <Separator className="mb-6" />
        <Games games={games} />
      </div>
    </ThemeProvider>
  );
}
