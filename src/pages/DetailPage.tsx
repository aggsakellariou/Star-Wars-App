import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Share2, Info } from "lucide-react";

export default function DetailPage({ type }: { type: string }) {
	const { id } = useParams<{ id: string }>();
    const title = type === "films" ? "Film" : "Character";

	return (
		<div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
			<Button variant="ghost" className="-ml-4 text-muted-foreground hover:text-foreground" render={<Link to={`/${type}`} />} nativeButton={false}>
				<ChevronLeft className="mr-2 h-4 w-4" />
				Back to {type}
			</Button>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-1 space-y-6">
					<div className="aspect-[3/4] rounded-2xl bg-muted flex items-center justify-center border shadow-inner">
						<Info className="h-16 w-16 text-muted-foreground/20" />
					</div>
					<div className="flex gap-4">
						<Button className="flex-1" size="lg">
							<Heart className="mr-2 h-5 w-5" />
							Favorite
						</Button>
						<Button variant="outline" size="icon" className="h-11 w-11">
							<Share2 className="h-5 w-5" />
						</Button>
					</div>
				</div>

				<div className="md:col-span-2 space-y-8">
					<div className="space-y-2">
						<div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
							{type?.slice(0, -1)} #{id}
						</div>
						<h1 className="text-4xl font-bold tracking-tight">Dummy {title} Detail</h1>
						<p className="text-xl text-muted-foreground">
							Detailed information about this specific {title.toLowerCase()} will be displayed here once data is connected.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{[
							{ label: "Attribute 1", value: "Value A" },
							{ label: "Attribute 2", value: "Value B" },
							{ label: "Attribute 3", value: "Value C" },
							{ label: "Attribute 4", value: "Value D" },
						].map((attr) => (
							<div key={attr.label} className="p-4 rounded-xl border bg-card/30">
								<p className="text-sm text-muted-foreground font-medium">{attr.label}</p>
								<p className="text-lg font-semibold">{attr.value}</p>
							</div>
						))}
					</div>

					<div className="space-y-4 pt-4">
						<h3 className="text-xl font-semibold">Description</h3>
						<p className="text-muted-foreground leading-relaxed">
							This section will contain more in-depth details, such as the character's backstory or the film's opening crawl. The Star Wars API provides rich data that we will fetch and display here.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
