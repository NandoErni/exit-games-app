import { useState, useEffect } from "react";
import gamesData from "./data/games.json";
import myGamesData from "./data/mygames.json";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Games from "@/components/games";
import exitLogo from "@/assets/EXIT-Logo.png";

export default function App() {
  const [games, setGames] = useState<typeof gamesData>([]);

  useEffect(() => {
    setGames(gamesData.filter((game) => !game.title.includes("Kids") && !game.title.includes("Family")));
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center my-5">
          <img src={exitLogo} alt="EXIT Logo" className="p-4" />
          <h1 className="text-sm font-light text-center mb-5">Personal Collection</h1>
          <ModeToggle />
        </div>


        <div className="flex flex-wrap justify-center items-center space-x-4">
              <Badge className="mb-6">Total Games: {games.length}</Badge>
              <Badge className="mb-6">Games played: {Object.keys(myGamesData.gameIDsPlayed).length}</Badge>
              <Badge className="mb-6">Games owned: {myGamesData.gameIDsOwned.length}</Badge>
        </div>
        
        <Separator className="mb-6" />
        <Games games={games} />
      </div>
    </ThemeProvider>
  );
}
