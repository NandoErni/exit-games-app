import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Game {
  id: string;
  title: string;
  year?: number;
  image?: string;
  difficulty?: string;
  bgg_url?: string;
}

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
          className="text-blue-500 underline text-sm mt-1 block"
        >
          BGG page
        </a>
      </CardContent>
    </Card>
  );
}
