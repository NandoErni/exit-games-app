import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import myGamesData from "@/data/mygames.json";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

export interface Game {
  id: number;
  title: string;
  year: number;
  image?: string;
  difficulty: number;
  bgg_url?: string;
}

interface Props {
  game: Game;
}

type GameMetaData = {
  players: string[];
  date: string;
  location: string;
  time: string;
  helpCardsUsed: number;
  stars: number;
  bestPuzzle: string;
  mostDifficultPuzzle: string;
  mostBeautifulMoment: string;
};

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function GameCard({ game }: Props) {
  const [open, setOpen] = useState(false);
  const gameMetaData = (
    myGamesData.gameIDsPlayed as Record<string, GameMetaData>
  )[String(game.id)];
  const hasBeenSolved = gameMetaData !== undefined;
  const hasBeenBought = myGamesData.gameIDsOwned.includes(game.id);

  return (
    <>
      <Card
        className="hover:shadow-lg transition-shadow"
        onClick={() => setOpen(true)}
      >
        <CardHeader className="font-bold text-lg">{game.title}</CardHeader>
        <CardContent>
          {game.image && (
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-contain rounded mb-2"
            />
          )}
          <p className="text-sm">Year: {game.year || "N/A"}</p>
          <p className="text-sm">Difficulty: {game.difficulty || "N/A"}</p>
          {game.bgg_url && (
            <a
              href={game.bgg_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ring underline text-sm mt-1 block"
            >
              BGG page
            </a>
          )}
        </CardContent>
      </Card>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{game.title}</DrawerTitle>
            {hasBeenSolved ? (
              <DrawerDescription className="text-success">
                This case has been solved on{" "}
                {new Date(gameMetaData?.date).toLocaleDateString(
                  "en-GB",
                  dateTimeFormatOptions
                )}{" "}
                at {gameMetaData?.location} in {gameMetaData?.time}
              </DrawerDescription>
            ) : hasBeenBought ? (
              <DrawerDescription className="text-destructive">
                This case has not yet been solved but you own it
              </DrawerDescription>
            ) : (
              <DrawerDescription className="text-destructive">
                This case has not yet been solved
              </DrawerDescription>
            )}
          </DrawerHeader>
          <ScrollArea className="flex-1 overflow-y-auto px-4">
            {game.image && (
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-contain rounded mb-4"
              />
            )}
            {hasBeenSolved && (
              <div className="text-center mb-4">
                <div className="mb-4 flex justify-center flex-wrap gap-1">
                  {gameMetaData?.players.map((player) => (
                    <Badge key={player} variant={"secondary"}>
                      {player}
                    </Badge>
                  ))}
                </div>
                <div className="mb-2 flex justify-center flex-wrap gap-5">
                  <p>🃏 {gameMetaData?.helpCardsUsed || 0} Help Cards</p>
                  <p>⭐ {gameMetaData?.stars || 0}</p>
                </div>

                {gameMetaData?.bestPuzzle && (
                  <p className="mb-2">Best puzzle: {gameMetaData.bestPuzzle}</p>
                )}

                {gameMetaData?.mostDifficultPuzzle && (
                  <p className="mb-2">
                    Most difficult puzzle: {gameMetaData.mostDifficultPuzzle}
                  </p>
                )}

                {gameMetaData?.mostBeautifulMoment && (
                  <p className="mb-2">
                    Best moment: {gameMetaData.mostBeautifulMoment}
                  </p>
                )}
              </div>
            )}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}
