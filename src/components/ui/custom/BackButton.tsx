import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  to: string;
  label: string;
}

export function BackButton({ to, label }: BackButtonProps) {
  return (
    <Link 
      to={to} 
      className="h-10 px-6 inline-flex items-center gap-2 bg-secondary text-primary border-[3px] border-secondary hover:bg-primary hover:text-secondary transition-colors font-display text-sm uppercase cursor-pointer w-fit group"
    >
      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span>{label}</span>
    </Link>
  );
}
