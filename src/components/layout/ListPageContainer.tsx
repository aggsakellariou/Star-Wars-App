import * as React from "react";
import { EmptyState } from "@/components/ui/custom/EmptyState";
import { Search } from "lucide-react";
import { resetApiCooldown } from "@/lib/api";

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
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="space-y-1 bg-[hsl(var(--sw-yellow))] text-[hsl(var(--sw-bg))] p-6 border-[5px] border-[hsl(var(--sw-bg))]">
            <h1 className="text-5xl font-display uppercase tracking-tighter">{title}</h1>
            <p className="font-mono-sw text-xs uppercase opacity-80">{description}</p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-[180px] w-full bg-[hsl(var(--sw-bg))/10] animate-pulse border-[5px] border-[hsl(var(--sw-bg))/20]" />
                ))}
              </div>
            </div>
          ) : isError ? (
            <EmptyState
              icon={<Search className="h-10 w-10 text-[hsl(var(--sw-red,0_100%_50%))]" />}
              title="Connection Failed"
              description="We were unable to connect to the Star Wars API servers. Please check your internet connection and try again."
              action={
                <button
                  onClick={() => {
                    resetApiCooldown();
                    refetch();
                  }}
                  className="h-10 px-6 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-yellow))] hover:text-[hsl(var(--sw-bg))] transition-colors font-display text-sm uppercase cursor-pointer"
                >
                  Try Again
                </button>
              }
              className="bg-[hsl(var(--sw-yellow))] text-[hsl(var(--sw-bg))] border-[5px] border-[hsl(var(--sw-bg))]"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
