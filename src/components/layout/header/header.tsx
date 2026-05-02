import { Link } from "react-router-dom";
import { Logo } from "@/components/layout/header/logo";
import { MobileNav } from "@/components/layout/header/mobile-nav";
import { ThemeToggle } from "@/components/layout/header/theme-toggle";
import { navLinks } from "@/constants/navigation";

export function Header() {

	return (
		<header className="sticky top-0 z-50 w-full bg-primary text-secondary border-b-[5px] border-secondary transition-all">
			<nav className="flex h-16 w-full items-center justify-between px-6 max-w-7xl mx-auto">
				<Link
					className="p-1 hover:bg-secondary hover:text-primary transition-colors"
					to="/"
				>
					<Logo className="h-6" />
				</Link>
				<div className="hidden flex-1 items-center justify-center gap-8 md:flex">
					{navLinks.map((link) => (
						<Link 
              key={link.label} 
              to={link.href}
              className="font-mono-sw text-xs uppercase font-bold tracking-widest hover:underline decoration-[3px] underline-offset-4"
            >
              {link.label}
            </Link>
					))}
				</div>
				<div className="hidden items-center justify-end md:flex gap-4">
					<ThemeToggle />
				</div>
				<div className="flex items-center md:hidden gap-2">
					<ThemeToggle />
					<MobileNav />
				</div>
			</nav>
		</header>
	);
}
