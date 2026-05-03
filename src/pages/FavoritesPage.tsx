import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, Ghost, Users, Clapperboard, Layers } from "lucide-react";
import { EmptyState } from "@/components/ui/custom/EmptyState";
import { useFavorites, type FavoriteItem } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState<'all' | 'character' | 'film'>('all');
  const hasCharacters = favorites.some(f => f.type === 'character');
  const hasFilms = favorites.some(f => f.type === 'film');
  const showFilters = hasCharacters && hasFilms;

  const handleRemove = (item: FavoriteItem) => {
    toggleFavorite(item);
    toast.info(`Removed ${item.name} from favorites`);
  };

  const filteredFavorites = favorites.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  const filterItems = [
    { id: 'all', label: 'All', icon: <Layers className="h-4 w-4" /> },
    { id: 'character', label: 'Characters', icon: <Users className="h-4 w-4" /> },
    { id: 'film', label: 'Films', icon: <Clapperboard className="h-4 w-4" /> },
  ] as const;

  return (
    <div className="flex flex-col h-full w-full px-4">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="font-display text-6xl md:text-8xl uppercase leading-none">
                Your Favorites
              </h1>
              <div className="h-2 w-24 bg-primary" />
              <p className="font-mono-sw text-sm uppercase opacity-70 max-w-md">
                The galaxy's most wanted. Keep track of the legends and stories you've discovered.
              </p>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-0 border-[3px] border-primary bg-primary">
                {filterItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 font-display text-xs uppercase transition-colors border-[2px] border-primary",
                      filter === item.id 
                        ? "bg-secondary text-primary" 
                        : "bg-primary text-secondary hover:bg-secondary/10"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {favorites.length === 0 ? (
            <EmptyState 
              icon={<Ghost className="h-16 w-16" />}
              title="NO LEGENDS SAVED"
              description="Your collection is empty. Explore the galaxy to find your favorite characters and films."
              action={
                <Link 
                  to="/characters" 
                  className="h-12 px-8 inline-flex items-center bg-primary text-secondary border-[3px] border-primary hover:bg-secondary hover:text-primary transition-colors font-display text-sm uppercase"
                >
                  Start Exploring
                </Link>
              }
            />
          ) : filteredFavorites.length === 0 ? (
            <EmptyState 
              icon={<Ghost className="h-16 w-16" />}
              title={`NO ${filter === 'character' ? 'CHARACTERS' : 'FILMS'} SAVED`}
              description={`You haven't added any ${filter}s to your favorites yet.`}
              action={
                <button 
                  onClick={() => setFilter('all')}
                  className="h-12 px-8 inline-flex items-center bg-primary text-secondary border-[3px] border-primary hover:bg-secondary hover:text-primary transition-colors font-display text-sm uppercase"
                >
                  Show All Favorites
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[4px] border-secondary bg-secondary">
              {filteredFavorites.map((item, index) => (
                <div 
                  key={`${item.type}-${item.id}`} 
                  className={cn(
                    "@container group bg-primary text-secondary border-[2px] border-secondary p-6 flex items-center gap-6 hover:bg-secondary hover:text-primary transition-all",
                    filteredFavorites.length % 2 !== 0 && index === filteredFavorites.length - 1 && "md:col-span-2"
                  )}
                >
                  <div className="h-20 w-20 bg-secondary/10 flex items-center justify-center border-[3px] border-secondary group-hover:border-primary transition-colors hidden @[300px]:flex">
                    <Heart className="h-10 w-10 fill-current opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono-sw text-[10px] uppercase tracking-tighter mb-1 opacity-70 group-hover:opacity-100">
                      {item.type}
                    </div>
                    <h4 className="font-display text-2xl uppercase leading-tight truncate">
                      {item.name}
                    </h4>
                    <p className="font-mono-sw text-xs uppercase opacity-60 group-hover:opacity-100 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-col @[400px]:flex-row gap-2">
                    <button 
                      onClick={() => handleRemove(item)}
                      className="p-3 border-[3px] border-secondary hover:bg-destructive hover:border-destructive hover:text-white transition-colors group-hover:border-primary"
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <Link 
                      to={`/${item.type === 'character' ? 'characters' : 'films'}/${item.id}`} 
                      className="p-3 bg-secondary text-primary border-[3px] border-secondary hover:bg-primary hover:text-secondary transition-colors group-hover:bg-primary group-hover:text-secondary group-hover:border-primary"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
