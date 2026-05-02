import { useParams } from "react-router-dom";
import { useCharacterDetail } from "@/hooks/use-swapi";
import { PersonDetail } from "@/components/people/PersonDetail";
import { DetailSkeleton } from "@/components/ui/custom/Skeletons";
import { DetailErrorState } from "@/components/ui/custom/ErrorStates";
import { BackButton } from "@/components/ui/custom/BackButton";

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
          <BackButton to="/characters" label="Back to Characters" />

          <PersonDetail person={data} />
        </div>
      </div>
    </div>
  );
}
