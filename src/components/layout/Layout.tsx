import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";

export function Layout() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header />
			<main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
				<Outlet />
			</main>
			<footer className="border-t py-6 text-center text-sm text-muted-foreground">
				<p>&copy; {new Date().getFullYear()} Star Wars Explorer. All rights reserved.</p>
			</footer>
		</div>
	);
}
