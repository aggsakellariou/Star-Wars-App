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

  if (isError || !id || !data) {
    return (
      <div className="flex flex-col h-full w-full px-4">
        <DetailErrorState type="character" returnPath="/characters" />
      </div>
    );
  }

  const character = data;

  return (
    <div className="flex flex-col h-full w-full px-4">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="space-y-8">
          <div className="flex flex-row justify-between items-center gap-4">
            <BackButton to="/characters" label="Back to Characters" />
            <FavoriteButton 
              item={{
                id: id!,
                type: 'character',
                name: character.name,
                subtitle: character.speciesNames?.[0] || 'Unknown Species',
                url: character.url
              }} 
            />
          </div>

          <PersonDetail person={character} />
        </div>
      </div>
    </div>
  );
}
