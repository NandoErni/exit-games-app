import gamesData from "@/data/games.json";
import myGamesData from "@/data/mygames.json";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import { cn, debounce } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(
    debounce(() => {
      if (window.scrollY > 20 && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY < 10 && scrolled) {
        setScrolled(false);
      }
    }, 100),
    [scrolled]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur scroll-smooth transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className={cn("absolute top-4 right-4")}>
        <ModeToggle />
      </div>
      <p
        className={cn(
          "font-light text-center transition-all duration-300",
          scrolled ? "text-3xl m-5" : "text-5xl m-10"
        )}
      >
        EXIT Personal Collection
      </p>

      <div className="flex flex-wrap justify-center items-center gap-2">
        <Badge className="mb-6">Total Games: {gamesData.length}</Badge>
        <Badge className="mb-6">
          Games played: {Object.keys(myGamesData.gameIDsPlayed).length}
        </Badge>
        <Badge className="mb-6">
          Games owned: {myGamesData.gameIDsOwned.length}
        </Badge>
      </div>
    </header>
  );
}
