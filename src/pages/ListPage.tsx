import { PeopleGrid } from "@/components/people/PeopleGrid";
import { FilmGrid } from "@/components/films/FilmGrid";
import type { Person } from "@/components/people/PeopleColumns";
import type { Film } from "@/components/films/FilmColumns";

interface ListPageProps {
  type: "people" | "films";
}

const dummyPeople: Person[] = [
  {
    name: "Luke Skywalker",
    birth_year: "19BBY",
    gender: "male",
    height: "172",
    mass: "77",
    skin_color: "fair",
    url: "https://swapi.dev/api/people/1/",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    species: [],
    starships: [],
    vehicles: [],
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
  },
  {
    name: "Darth Vader",
    birth_year: "41.9BBY",
    gender: "male",
    height: "202",
    mass: "136",
    skin_color: "white",
    url: "https://swapi.dev/api/people/4/",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    species: [],
    starships: [],
    vehicles: [],
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
  },
]

const dummyFilms: Film[] = [
  {
    title: "A New Hope",
    episode_id: 4,
    release_date: "1977-05-25",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    opening_crawl: "It is a period of civil war...",
    url: "https://swapi.dev/api/films/1/",
    species: [],
    starships: [],
    vehicles: [],
    characters: [],
    planets: [],
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
  },
]

export default function ListPage({ type }: ListPageProps) {
  const title = type === "films" ? "Films" : "Characters";

  return (
    <div className="flex flex-col h-full w-full px-4">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="space-y-1"> 
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">
              Browse and filter the list of {title.toLowerCase()} from the Star Wars universe.
            </p>
          </div>

          {type === "films" ? (
            <FilmGrid data={dummyFilms} />
          ) : (
            <PeopleGrid data={dummyPeople} />
          )}
        </div>
      </div>
    </div>
  );
}
