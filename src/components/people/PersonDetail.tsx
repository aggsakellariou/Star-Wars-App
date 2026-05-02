import type { Person } from "./PeopleColumns";
import { getCharacterStats } from "@/constants/character";

interface Props {
  person: Person & {
    homeworldName?: string;
    filmTitles: string[];
    speciesNames: string[];
    vehicleNames: string[];
    starshipNames: string[];
  };
}

export function PersonDetail({ person }: Props) {
  const stats = getCharacterStats(person);

  return (
    <div className="bg-primary text-secondary border-[6px] border-secondary p-6 md:p-10">
      <div className="border-b-[8px] border-secondary p-8">
        <div className="font-mono-sw text-sm mb-2 uppercase">Character Profile</div>
        <h1 className="font-display text-7xl md:text-9xl uppercase leading-none break-words">
          {person.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div 
            key={stat.label} 
            className={`p-8 border-b-[8px] border-secondary ${
              i % 4 !== 3 ? "lg:border-r-[8px]" : ""
            } ${i % 2 !== 1 ? "md:border-r-[8px]" : ""}`}
          >
            <div className="font-mono-sw text-xs uppercase mb-2">{stat.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl uppercase">{stat.value}</span>
              {stat.unit && <span className="font-mono-sw text-sm">{stat.unit}</span>}
            </div>
          </div>
        ))}
        
        <div className="p-8 border-b-[8px] border-secondary md:border-r-[8px] lg:border-r-0">
          <div className="font-mono-sw text-xs uppercase mb-2">Homeworld</div>
          <div className="font-display text-4xl uppercase">{person.homeworldName || "..."}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <ResourceSection title="Films" items={person.filmTitles} total={person.films.length} />
        <ResourceSection title="Species" items={person.speciesNames} total={person.species.length} />
        <ResourceSection title="Vehicles" items={person.vehicleNames} total={person.vehicles.length} />
        <ResourceSection title="Starships" items={person.starshipNames} total={person.starships.length} />
      </div>

      <div className="p-8 border-t-[8px] border-secondary bg-secondary text-primary flex justify-between items-center text-[10px] font-mono-sw uppercase opacity-80">
        <div>Created: {new Date(person.created).toLocaleString()}</div>
        <div>Edited: {new Date(person.edited).toLocaleString()}</div>
      </div>
    </div>
  );
}

function ResourceSection({ title, items, total }: { title: string, items: string[], total: number }) {
  return (
    <div className="p-8 border-b-[8px] border-secondary last:border-b-0 first:border-t-0">
      <div className="font-mono-sw text-xs uppercase mb-3">{title} ({total})</div>
      <div className="flex flex-wrap gap-0">
        {items.length > 0 ? (
          items.map((name) => (
            <span key={name} className="border-2 border-secondary px-3 py-1 font-mono-sw text-xs uppercase -mr-[2px] -mb-[2px]">
              {name}
            </span>
          ))
        ) : total > 0 ? (
          <div className="animate-pulse flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-6 w-24 bg-secondary/10 border-2 border-secondary" />
            ))}
          </div>
        ) : (
          <span className="text-xs opacity-50 font-mono-sw">NONE</span>
        )}
      </div>
    </div>
  );
}
