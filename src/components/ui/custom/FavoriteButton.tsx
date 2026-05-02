import { Heart } from "lucide-react";
import { useFavorites, type FavoriteItem } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FavoriteButtonProps {
  item: FavoriteItem;
}

export function FavoriteButton({ item }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(item.id, item.type);

  const handleToggle = () => {
    toggleFavorite(item);
    if (!favorited) {
      toast.success(`Added ${item.name} to favorites`);
    } else {
      toast.info(`Removed ${item.name} from favorites`);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "h-10 px-6 inline-flex items-center gap-2 transition-colors font-display text-sm uppercase cursor-pointer border-[3px]",
        favorited 
          ? "bg-primary text-secondary border-primary hover:bg-secondary hover:text-primary" 
          : "bg-secondary text-primary border-secondary hover:bg-primary hover:text-secondary"
      )}
    >
      <Heart 
        className={cn(
          "h-4 w-4 transition-transform active:scale-125",
          favorited && "fill-current"
        )} 
      />
      <span>{favorited ? "Favorited" : "Add to Favorites"}</span>
    </button>
  );
}
