import { useParams } from "react-router-dom";
import { useCharacterDetail } from "@/hooks/use-swapi";
import { PersonDetail } from "@/components/people/PersonDetail";
import { DetailSkeleton } from "@/components/ui/custom/Skeletons";
import { DetailErrorState } from "@/components/ui/custom/ErrorStates";
import { BackButton } from "@/components/ui/custom/BackButton";
import { FavoriteButton } from "@/components/ui/custom/FavoriteButton";

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useCharacterDetail(id!);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full px-4">
        <DetailSkeleton />
      </div>
    );
  }

  if (isError || !id) {
    return (
      <div className="flex flex-col h-full w-full px-4">
        <DetailErrorState type="character" returnPath="/characters" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full px-4">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <BackButton to="/characters" label="Back to Characters" />
            <FavoriteButton 
              item={{
                id: id!,
                type: 'character',
                name: data.name,
                subtitle: data.speciesNames?.[0] || 'Unknown Species',
                url: data.url
              }} 
            />
          </div>

          <PersonDetail person={data} />
        </div>
      </div>
    </div>
  );
}
