import { Users, Film, Heart } from "lucide-react";

export const HOME_CONTENT = {
  subtitle: "Discover characters, films, and starships from a galaxy far, far away. Save your favorites and dive into the lore.",
  primaryCtas: [
    { label: "Characters", to: "/people", icon: Users },
    { label: "Films", to: "/films", icon: Film },
  ],
  resources: [
    {
      title: "Characters",
      desc: "Detailed profiles of iconic heroes and villains.",
      to: "/people",
      icon: Users,
    },
    {
      title: "Films",
      desc: "Explore the saga through its legendary cinematic history.",
      to: "/films",
      icon: Film,
    },
    {
      title: "Favorites",
      desc: "Keep track of the characters and films you love most.",
      to: "/favorites",
      icon: Heart,
    },
  ],
};
