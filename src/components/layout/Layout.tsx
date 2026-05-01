import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/header/header";

export function Layout() {
	const location = useLocation();
	const isHome = location.pathname === "/";

	return (
		<div className={`flex min-h-screen flex-col ${isHome ? "bg-[hsl(var(--sw-yellow))]" : "bg-background"} text-foreground`}>
			<Header />
			<Outlet />
		</div>
	);
}
