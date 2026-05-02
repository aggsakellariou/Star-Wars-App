import type { Person } from "@/components/people/PeopleColumns";

export const formatCharacterStat = (val: string | undefined) => {
  if (!val || val.toLowerCase() === "unknown" || val.toLowerCase() === "n/a") return "??";
  return val;
};

export const getCharacterStats = (person: Person) => [
  { label: "Height", value: formatCharacterStat(person.height), unit: "CM" },
  { label: "Mass", value: formatCharacterStat(person.mass), unit: "KG" },
  { 
    label: "Birth Year", 
    value: person.birth_year === "unknown" ? "??" : person.birth_year.replace("BBY", ""), 
    unit: person.birth_year.includes("BBY") ? "BBY" : "" 
  },
  { label: "Gender", value: formatCharacterStat(person.gender), unit: "" },
  { label: "Hair Color", value: formatCharacterStat(person.hair_color), unit: "" },
  { label: "Skin Color", value: formatCharacterStat(person.skin_color), unit: "" },
  { label: "Eye Color", value: formatCharacterStat(person.eye_color), unit: "" },
];
