import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/constants/navigation";

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
				{
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
						scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<Link
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					to="/"
				>
					<Logo className="h-4" />
				</Link>
				<div className="hidden flex-1 items-center justify-center gap-2 md:flex">
					{navLinks.map((link) => (
						<Button key={link.label} size="sm" variant="ghost" render={<Link to={link.href} />} nativeButton={false}>{link.label}</Button>
					))}
				</div>
				<div className="hidden items-center justify-end md:flex">
					<ThemeToggle />
				</div>
				<div className="flex items-center md:hidden">
					<ThemeToggle />
					<MobileNav />
				</div>
			</nav>
		</header>
	);
}
