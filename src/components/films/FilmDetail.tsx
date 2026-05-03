import type { Film } from "./FilmColumns";
import { formatDate } from "@/lib/utils";

interface Props {
  film: Film & {
    characterNames: string[];
    planetNames: string[];
    starshipNames: string[];
    vehicleNames: string[];
    speciesNames: string[];
  };
}

export function FilmDetail({ film }: Props) {
  return (
    <div className="bg-primary text-secondary border-[6px] border-secondary">
      <div className="border-b-[8px] border-secondary p-6 flex items-end justify-between">
        <div className="font-display text-[10rem] leading-none">
          {film.episode_id}
        </div>
        <div className="text-right">
          <div className="font-mono-sw text-sm">EPISODE</div>
          <div className="font-mono-sw text-sm">
            {formatDate(film.release_date)}
          </div>
        </div>
      </div>
      <div className="p-8 border-b-[8px] border-secondary">
        <h1 className="font-display text-6xl uppercase leading-none">
          {film.title}
        </h1>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="p-8 border-r-[8px] border-b-[8px] border-secondary">
          <div className="font-mono-sw text-xs uppercase mb-2">
            Opening Crawl
          </div>
          <p className="text-sm font-bold leading-relaxed">
            {film.opening_crawl}
          </p>
        </div>
        <div className="p-8 border-b-[8px] border-secondary">
          <div className="font-mono-sw text-xs uppercase mb-2">Credits</div>
          <div className="text-sm font-bold uppercase">
            DIR. {film.director}
          </div>
          <div className="text-sm font-bold mt-1 uppercase">
            PROD. {film.producer}
          </div>

          <div className="mt-8">
            <div className="font-mono-sw text-xs uppercase mb-2">Released</div>
            <div className="text-sm font-bold">
              {formatDate(film.release_date)}
            </div>
          </div>
        </div>

        <ResourceSection
          title="Cast"
          items={film.characterNames}
          total={film.characters.length}
        />
        <ResourceSection
          title="Planets"
          items={film.planetNames}
          total={film.planets.length}
        />
        <ResourceSection
          title="Starships"
          items={film.starshipNames}
          total={film.starships.length}
        />
        <ResourceSection
          title="Vehicles"
          items={film.vehicleNames}
          total={film.vehicles.length}
        />
        <ResourceSection
          title="Species"
          items={film.speciesNames}
          total={film.species.length}
        />
      </div>

      <div className="p-8 bg-secondary text-primary flex justify-between items-center text-[10px] font-mono-sw uppercase opacity-80">
        <div>Created: {formatDate(film.created)}</div>
        <div>Edited: {formatDate(film.edited)}</div>
      </div>
    </div>
  );
}

function ResourceSection({
  title,
  items,
  total,
}: {
  title: string;
  items: string[];
  total: number;
}) {
  return (
    <div className="p-8 border-b-[8px] border-secondary md:col-span-2">
      <div className="font-mono-sw text-xs uppercase mb-3">
        {title} ({total})
      </div>
      <div className="flex flex-wrap gap-0">
        {items.length > 0 ? (
          items.map((name) => (
            <span
              key={name}
              className="border-2 border-secondary px-3 py-1 font-mono-sw text-xs uppercase -mr-[2px] -mb-[2px]"
            >
              {name}
            </span>
          ))
        ) : null}
      </div>
    </div>
  );
}
