import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Film, Heart } from "lucide-react";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center space-y-12 py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
			<div className="space-y-4 max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tighter sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
					Explore the Star Wars Universe
				</h1>
				<p className="text-xl text-muted-foreground">
					Discover characters, films, and starships from a galaxy far, far away. Save your favorites and dive into the lore.
				</p>
			</div>

			<div className="flex flex-wrap justify-center gap-4">
				<Button size="lg" render={<Link to="/people" />} nativeButton={false}>
					<Users className="mr-2 h-5 w-5" />
					Browse Characters
				</Button>
				<Button size="lg" variant="outline" render={<Link to="/films" />} nativeButton={false}>
					<Film className="mr-2 h-5 w-5" />
					Watch Films
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-12">
				<div className="flex flex-col items-center space-y-3 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1">
					<div className="p-3 rounded-full bg-primary/10 text-primary">
						<Users className="h-6 w-6" />
					</div>
					<h3 className="text-xl font-semibold">82+ Characters</h3>
					<p className="text-sm text-muted-foreground">Detailed profiles of iconic heroes and villains.</p>
				</div>
				<div className="flex flex-col items-center space-y-3 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1">
					<div className="p-3 rounded-full bg-primary/10 text-primary">
						<Film className="h-6 w-6" />
					</div>
					<h3 className="text-xl font-semibold">6 Iconic Films</h3>
					<p className="text-sm text-muted-foreground">Explore the saga through its legendary cinematic history.</p>
				</div>
				<div className="flex flex-col items-center space-y-3 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1">
					<div className="p-3 rounded-full bg-primary/10 text-primary">
						<Heart className="h-6 w-6" />
					</div>
					<h3 className="text-xl font-semibold">Favorites</h3>
					<p className="text-sm text-muted-foreground">Keep track of the characters and films you love most.</p>
				</div>
			</div>
		</div>
	);
}
