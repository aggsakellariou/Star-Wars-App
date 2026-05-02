import type { Film } from "./FilmColumns";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

const idOf = (film: Film) => film.url.split("/").filter(Boolean).pop();

export function FilmCard({ film }: { film: Film }) {
  const id = idOf(film);
  return (
    <Link to={`/films/${id}`} className="block bg-primary text-secondary border-[5px] border-secondary hover:bg-secondary hover:text-primary transition group">
      <div className="border-b-[5px] border-secondary group-hover:border-primary flex">
        <div className="font-display text-5xl px-4 py-2 leading-none">{film.episode_id}</div>
        <div className="flex-1 border-l-[5px] border-secondary group-hover:border-primary p-3 flex flex-col justify-between">
          <span className="font-mono-sw text-[10px]">EPISODE</span>
          <span className="font-mono-sw text-xs">{formatDate(film.release_date)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-2xl uppercase leading-tight mb-2">{film.title}</h3>
        <div className="font-mono-sw text-xs uppercase">DIR. {film.director}</div>
      </div>
    </Link>
  );
}
