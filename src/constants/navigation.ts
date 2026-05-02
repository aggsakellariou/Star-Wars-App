import { Users, Film, Heart } from "lucide-react";

export const APP_SUBTITLE = "Discover characters, films, and starships from a galaxy far, far away. Save your favorites and dive into the lore.";

export const navLinks = [
  {
    label: "Characters",
    href: "/characters",
    icon: Users,
    description: "Detailed profiles of iconic heroes and villains.",
  },
  {
    label: "Films",
    href: "/films",
    icon: Film,
    description: "Explore the saga through its legendary cinematic history.",
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
    description: "Keep track of the characters and films you love most.",
  },
];
