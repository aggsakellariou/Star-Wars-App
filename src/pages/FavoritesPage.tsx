import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, Ghost } from "lucide-react";
import { EmptyState } from "@/components/ui/custom/EmptyState";

export default function FavoritesPage() {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
			<div className="space-y-1">
				<h1 className="text-3xl font-bold tracking-tight">Your Favorites</h1>
				<p className="text-muted-foreground">Keep track of the characters and films you love most.</p>
			</div>

			{/* Empty State */}
			<EmptyState 
				icon={<Ghost className="h-10 w-10" />}
				title="No favorites yet"
				description="Start exploring and click the heart icon to save your favorite characters and films."
				action={
					<Button render={<Link to="/people" />} nativeButton={false}>
						Start Exploring
					</Button>
				}
			/>

			{/* Placeholder for list (when items exist) */}
			<div className="hidden grid grid-cols-1 md:grid-cols-2 gap-4">
				{[1, 2].map((i) => (
					<div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-all">
						<div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
							<Heart className="h-8 w-8 text-primary/20" />
						</div>
						<div className="flex-1">
							<h4 className="font-semibold">Favorite Item {i}</h4>
							<p className="text-xs text-muted-foreground uppercase tracking-wide">Character</p>
						</div>
						<div className="flex gap-2">
							<Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
								<Trash2 className="h-5 w-5" />
							</Button>
							<Button variant="ghost" size="icon" render={<Link to="/people/1" />} nativeButton={false}>
								<ArrowRight className="h-5 w-5" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
