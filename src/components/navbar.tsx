import myGamesData from "@/data/mygames.json";
import { Badge } from "@/components/ui/badge";
import type { Game } from "./game-card";

interface GamesProps {
  games: Game[];
}

export default function Navbar({ games }: GamesProps) {
  return (
    <header className="w-full py-4">
      <p className="font-light text-center duration-5000 text-5xl m-10">
        EXIT Personal Collection
      </p>

      <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
        <Badge>Total Games: {games.length}</Badge>
        <Badge>
          Games played: {Object.keys(myGamesData.gameIDsPlayed).length}
        </Badge>
        <Badge>Games owned: {myGamesData.gameIDsOwned.length}</Badge>
      </div>
    </header>
  );
}
