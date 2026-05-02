import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to: string;
  label: string;
}

export function BackButton({ to, label }: BackButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="border-[5px] border-secondary bg-primary text-secondary hover:bg-secondary hover:text-primary hover:border-primary font-display text-xl px-6 py-4 h-auto uppercase rounded-none transition-all group w-fit"
      render={<Link to={to} />}
    >
      <div className="flex items-center gap-3">
        <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        <span>{label}</span>
      </div>
    </Button>
  );
}
