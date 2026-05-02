import { Link } from "react-router-dom";
import { navLinks, APP_SUBTITLE } from "@/constants/navigation";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full px-4 min-h-screen bg-[hsl(var(--sw-yellow))] text-[hsl(var(--sw-bg))]">
      <div className="w-full max-w-5xl mx-auto py-6">
        <div className="border-[6px] border-[hsl(var(--sw-bg))] p-6 md:p-10">
          <h1 className="font-display uppercase text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] mb-8 font-black tracking-tighter">
            STAR
            <br />
            WARS
            <br />
            <span className="text-stroke">UNIVERSE</span>
          </h1>
          <div className="grid md:grid-cols-3 gap-0 border-y-4 border-[hsl(var(--sw-bg))]">
            <p className="md:col-span-3 p-4 text-xl md:text-2xl border-[hsl(var(--sw-bg))]">
              {APP_SUBTITLE}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {navLinks.map((r, i) => (
              <Link
                key={r.href}
                to={r.href}
                className={`p-6 ${i < 2 ? "md:border-r-4" : ""} border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-bg))] hover:text-[hsl(var(--sw-yellow))] transition group`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display text-5xl">0{i + 1}</span>
                  <r.icon className="w-8 h-8" />
                </div>
                <div className="font-display text-2xl uppercase mb-2">
                  {r.label}
                </div>
                <p className="text-sm">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
