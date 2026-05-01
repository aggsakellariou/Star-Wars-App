import type { Film } from "./FilmColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film as FilmIcon, Calendar, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export function FilmCard({ film }: { film: Film }) {
  const id = film.url.split("/").filter(Boolean).pop();

  return (
    <Link to={`/films/${id}`} className="block">
      <Card className="group overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-[10px]">
              Episode {film.episode_id}
            </Badge>
            <FilmIcon className="h-4 w-4 text-primary/40 transition-colors group-hover:text-primary" />
          </div>
          <CardTitle className="line-clamp-1 text-lg">{film.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Released: {film.release_date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clapperboard className="h-3.5 w-3.5 text-primary/60" />
            <span className="truncate">Dir: {film.director}</span>
          </div>
          <p className="line-clamp-2 text-xs text-muted-foreground/80 italic">
            "{film.opening_crawl}"
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
