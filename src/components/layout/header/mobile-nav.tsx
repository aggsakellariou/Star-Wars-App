import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerTrigger,
	DrawerClose,
} from "@/components/ui/drawer";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="md:hidden">
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						aria-label="Toggle menu"
						className="size-9 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
						size="icon"
						variant="outline"
					>
						{open ? (
							<XIcon className="size-4.5" />
						) : (
							<MenuIcon className="size-4.5" />
						)}
					</Button>
				</DrawerTrigger>
				<DrawerContent className="p-4 pb-10">
					<DrawerHeader className="mb-4 flex flex-row items-center justify-between px-2 text-left">
						<DrawerTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
							Navigate
						</DrawerTitle>
						<DrawerDescription className="sr-only">
							Mobile navigation menu
						</DrawerDescription>
						<DrawerClose asChild>
							<Button
								variant="ghost"
								size="icon"
								className="size-8 rounded-full"
								autoFocus
							>
								<XIcon className="size-4" />
							</Button>
						</DrawerClose>
					</DrawerHeader>

					<nav className="flex flex-col gap-1">
						{navLinks.map((link) => {
							const Icon = link.icon;
							return (
								<Link
									className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted active:bg-muted/80"
									to={link.href}
									key={link.label}
									onClick={() => setOpen(false)}
								>
									<span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50 border border-border/50">
										<Icon className="size-5" />
									</span>
									<span className="flex flex-col text-left">
										<span className="text-sm font-semibold">{link.label}</span>
										<span className="text-xs text-muted-foreground">
											{link.description}
										</span>
									</span>
								</Link>
							);
						})}
					</nav>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
