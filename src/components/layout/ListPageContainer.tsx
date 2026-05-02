import * as React from "react";
import { GridSkeleton } from "@/components/ui/custom/Skeletons";
import { GridErrorState } from "@/components/ui/custom/ErrorStates";

interface ListPageContainerProps {
  title: string;
  description: string;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  children: React.ReactNode;
}

export function ListPageContainer({
  title,
  description,
  isLoading,
  isError,
  refetch,
  children,
}: ListPageContainerProps) {
  return (
    <div className="flex flex-col h-full w-full px-4">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="space-y-6">
          <div className="space-y-1 bg-primary text-secondary p-6 border-[5px] border-secondary">
            <h1 className="text-5xl font-display uppercase tracking-tighter">{title}</h1>
            <p className="font-mono-sw text-xs uppercase opacity-80">{description}</p>
          </div>

          {isLoading ? (
            <GridSkeleton />
          ) : isError ? (
            <GridErrorState refetch={refetch} />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
