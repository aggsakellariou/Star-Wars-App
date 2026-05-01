import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/custom/EmptyState";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : isError ? (
            <EmptyState
              icon={<Search className="h-10 w-10 text-destructive" />}
              title="Connection Failed"
              description="We were unable to connect to the Star Wars API servers. Please check your internet connection and try again."
              action={
                <Button
                  onClick={() => {
                    resetApiCooldown();
                    refetch();
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Try Again
                </Button>
              }
              className="bg-destructive/5 border-destructive/20"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
