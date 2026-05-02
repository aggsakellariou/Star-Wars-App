import { Link } from "react-router-dom";
import { AlertTriangle, Search } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { resetApiCooldown } from "@/lib/api";

export function GridErrorState({ refetch }: { refetch: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-10 w-10 text-destructive" />}
      title="Connection Failed"
      description="We were unable to connect to the Star Wars API servers. Please check your internet connection and try again."
      action={
        <button
          onClick={() => {
            resetApiCooldown();
            refetch();
          }}
          className="h-10 px-6 bg-secondary text-primary border-[3px] border-secondary hover:bg-primary hover:text-secondary transition-colors font-display text-sm uppercase cursor-pointer"
        >
          Try Again
        </button>
      }
      className="bg-primary text-secondary border-[5px] border-secondary"
    />
  );
}

export function DetailErrorState({ 
  type = "character", 
  returnPath = "/characters" 
}: { 
  type?: "character" | "film", 
  returnPath?: string 
}) {
  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <EmptyState
        icon={<AlertTriangle className="h-10 w-10 text-destructive" />}
        title="Transmission Interrupted"
        description={`The requested ${type} could not be retrieved from the archives.`}
        action={
          <Link 
            to={returnPath} 
            className="h-10 px-6 inline-flex items-center bg-secondary text-primary border-[3px] border-secondary hover:bg-primary hover:text-secondary transition-colors font-display text-sm uppercase cursor-pointer"
          >
            Return to Hub
          </Link>
        }
      />
    </div>
  );
}
