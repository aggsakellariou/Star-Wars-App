import type { Person } from "@/components/people/PeopleColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Ruler, Weight, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export function PersonCard({ person }: { person: Person }) {
  const id = person.url.split("/").filter(Boolean).pop();

  return (
    <Link to={`/people/${id}`} className="block">
      <Card className="group overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="capitalize text-[10px]">
              {person.gender}
            </Badge>
            <User className="h-4 w-4 text-primary/40 transition-colors group-hover:text-primary" />
          </div>
          <CardTitle className="line-clamp-1 text-lg">{person.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>Age: {person.birth_year === "unknown" ? "Unknown" : person.birth_year.replace(/[^0-9.]/g, "")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clapperboard className="h-3.5 w-3.5" />
              <span>{person.films.length} films</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-md bg-primary/5 p-2 transition-colors group-hover:bg-primary/10">
              <Ruler className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{person.height}cm</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-primary/5 p-2 transition-colors group-hover:bg-primary/10">
              <Weight className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{person.mass}kg</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
