import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import myGamesData from "@/data/mygames.json";

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
};

export default function GameCard({ game }: Props) {
  const [open, setOpen] = useState(false);
  const gameMetaData = (
    myGamesData.gameIDsPlayed as Record<string, GameMetaData>
  )[String(game.id)];
  const hasBeenSolved = gameMetaData !== undefined;

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
          <a
            href={game.bgg_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ring underline text-sm mt-1 block"
          >
            BGG page
          </a>
        </CardContent>
      </Card>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{game.title}</DrawerTitle>
            {game.id in myGamesData.gameIDsPlayed ? (
              <DrawerDescription className="text-success">
                This case has already been solved
              </DrawerDescription>
            ) : (
              <DrawerDescription className="text-destructive">
                This case has not yet been solved
              </DrawerDescription>
            )}
          </DrawerHeader>
          {game.image && (
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-contain rounded mb-2"
            />
          )}
          {hasBeenSolved && (
            <div className="text-center mb-4">
              <p className="mb-2">
                This case was solved on: {gameMetaData?.date} with{" "}
                {gameMetaData?.players.join(", ")}
              </p>
              <p className="mb-2">Location: {gameMetaData?.location}</p>
              <p className="mb-2">Time taken: {gameMetaData?.time}</p>
              <p className="mb-2">
                Help cards used: {gameMetaData?.helpCardsUsed || 0}
              </p>
              <p className="mb-2">
                Stars:{" "}
                {gameMetaData?.stars ? "⭐".repeat(gameMetaData.stars) : "N/A"}
              </p>
              <p className="mb-2">
                Best puzzle: {gameMetaData?.bestPuzzle || "N/A"}
              </p>
              <p className="mb-2">
                Most difficult puzzle:{" "}
                {gameMetaData?.mostDifficultPuzzle || "N/A"}
              </p>
            </div>
          )}

          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
