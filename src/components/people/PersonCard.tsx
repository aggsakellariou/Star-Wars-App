import type { Person } from "@/components/people/PeopleColumns";
import { Link } from "react-router-dom";

const idOf = (person: Person) => person.url.split("/").filter(Boolean).pop();
const ageOf = (person: Person) => {
  if (person.birth_year === "unknown") return "??";
  return person.birth_year.replace("BBY", "");
};

export function PersonCard({ person }: { person: Person }) {
  const id = idOf(person);
  return (
    <Link to={`/characters/${id}`} className="block bg-primary text-secondary border-[5px] border-secondary hover:bg-secondary hover:text-primary transition group">
      <div className="px-4 py-2 border-b-[5px] border-secondary group-hover:border-primary font-mono-sw text-[10px] uppercase flex justify-between">
        <span>{person.gender}</span><span>{ageOf(person)} BBY</span>
      </div>
      <h3 className="font-display text-3xl uppercase leading-none p-4">{person.name}</h3>
      <div className="grid grid-cols-3 border-t-[5px] border-secondary group-hover:border-primary">
        <div className="p-2 border-r-[5px] border-secondary group-hover:border-primary text-center min-w-0">
          <div className="font-mono-sw text-[9px]">HGT</div>
          <div className="font-display truncate">{person.height === "unknown" ? "??" : person.height}</div>
        </div>
        <div className="p-2 border-r-[5px] border-secondary group-hover:border-primary text-center min-w-0">
          <div className="font-mono-sw text-[9px]">MASS</div>
          <div className="font-display truncate">{person.mass === "unknown" ? "??" : person.mass}</div>
        </div>
        <div className="p-2 text-center min-w-0">
          <div className="font-mono-sw text-[9px]">FILMS</div>
          <div className="font-display truncate">{person.films.length}</div>
        </div>
      </div>
    </Link>
  );
}
