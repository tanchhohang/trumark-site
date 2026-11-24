interface Service {
  name: string;
  words: string[];
  gradient: string;
  description: string;
}

export const services: Service[] = [
  {
    name: "Strategy",
    words: ["Strategy"],
    gradient: "linear-gradient(160deg,#1b2a2f,#5a3a22 70%,#c9772b)",
    description:
      "A clear position for your brand, who it speaks to, and what you want them to remember.",
  },
  {
    name: "Branding & design",
    words: ["Branding &", "design"],
    gradient: "linear-gradient(160deg,#1d1b2e,#c4622d 65%,#2f4a2a)",
    description:
      "Visual identities, from type and colour to the way your brand appears on screen and in print.",
  },
  {
    name: "Development",
    words: ["Development"],
    gradient: "linear-gradient(160deg,#16222b,#3d5a6b 60%,#a8b5a0)",
    description:
      "Websites and software built around what your customers need to do, and engineered to keep performing as your users, data and team grow.",
  },
  {
    name: "Marketing",
    words: ["Marketing"],
    gradient: "linear-gradient(160deg,#2a1f3d,#7a3d6b 60%,#e0a45a)",
    description:
      "Campaigns and search content that help people find you and decide what to do next.",
  },
];
