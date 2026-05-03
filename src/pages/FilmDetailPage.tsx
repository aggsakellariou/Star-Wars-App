import { useParams } from "react-router-dom";
import { useFilmDetail } from "@/hooks/use-swapi";
import { FilmDetail } from "@/components/films/FilmDetail";
import { DetailSkeleton } from "@/components/ui/custom/Skeletons";
import { DetailErrorState } from "@/components/ui/custom/ErrorStates";
import { BackButton } from "@/components/ui/custom/BackButton";
import { FavoriteButton } from "@/components/ui/custom/FavoriteButton";

export default function FilmDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFilmDetail(id!);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full px-4">
        <DetailSkeleton />
      </div>
    );
  }

  if (isError || !id || !data) {
    return (
      <div className="flex flex-col h-full w-full px-4">
        <DetailErrorState type="film" returnPath="/films" />
      </div>
    );
  }

  const filmData = data;

  return (
    <div className="flex flex-col h-full w-full px-4">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="space-y-8">
          <div className="flex flex-row justify-between items-center gap-4">
            <BackButton to="/films" label="Back to Films" />
            <FavoriteButton 
              item={{
                id: id!,
                type: 'film',
                name: filmData.title,
                subtitle: `Released: ${filmData.release_date}`,
                url: filmData.url
              }} 
            />
          </div>
          <FilmDetail film={filmData} />
        </div>
      </div>
    </div>
  );
}
