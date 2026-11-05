import { experiences, projects } from "./content";
export const palette = {
  lime: "#C6FF00",
  blue: "#304FFE",
  orange: "#FF5A1F",
  yellow: "#F4FF00",
  black: "#080808",
  white: "#F5F2EA",
  purple: "#A77BFF",
  cyan: "#65EBF2",
  pink: "#FF8BCC",
};
export const chapters = [
  {
    id: "awakening",
    title: "My canvas",
    label: "Home",
    bg: palette.lime,
    ink: palette.black,
    length: 2.2,
  },
  {
    id: "about",
    title: "The human glitch",
    label: "About",
    bg: palette.blue,
    ink: palette.white,
    length: 2.4,
  },
  {
    id: "experience",
    title: "Experience archive",
    label: "Experience",
    bg: palette.purple,
    ink: palette.black,
    length: Math.max(2, experiences.length * 0.9),
  },
  {
    id: "work",
    title: "Project multiverse",
    label: "Projects",
    bg: palette.black,
    ink: palette.white,
    length: Math.max(2, projects.length * 0.95),
  },
  {
    id: "skills",
    title: "Technical playground",
    label: "Skills",
    bg: palette.orange,
    ink: palette.black,
    length: 3,
  },
  {
    id: "beyond",
    title: "The other side",
    label: "Off-screen",
    bg: palette.pink,
    ink: palette.black,
    length: 3,
  },
  {
    id: "contact",
    title: "The grand finale",
    label: "Contact",
    bg: palette.lime,
    ink: palette.black,
    length: 2.5,
  },
];
export const copy = {
  opening: {
    lines: ["THE", "INTERNET", "IS MY", "CANVAS."],
    eyebrow: "AN EXPERIMENT IN BEING MYSELF.",
    description: "AI & DATA SCIENCE ENGINEERING",
    roles: "DEVELOPER / CREATOR / EXPERIMENTER",
    sticker: "CREATIVE BY DEFAULT.",
    marquee: "CODE × CURIOSITY × CONTROLLED CHAOS ×",
  },
  about: {
    lines: ["TOO CURIOUS", "TO THINK", "ORDINARY."],
    label: "THE HUMAN GLITCH.",
    subhead: "A brain with too many tabs open.",
  },
  experience: {
    heading: "BUILT THROUGH EXPERIENCE.",
    label: "LEARNING IN THE WILD. ALWAYS EVOLVING.",
  },
  work: { heading: "IDEAS DON’T SIT STILL.", label: "THE PROJECT MULTIVERSE" },
  skills: {
    heading: "MY TOOLBOX IS A LITTLE UNHINGED.",
    label: "CAUTION: IDEAS UNDER CONSTRUCTION.",
  },
  beyond: {
    heading: "NOT EVERYTHING REVOLVES AROUND CODE.",
    label: "THE OTHER SIDE OF MY BRAIN.",
  },
  contact: {
    first: "YOU MADE IT TO THE END.",
    invitation: "NOW LET’S BUILD SOMETHING UNEXPECTED.",
    signature: "CURIOSITY HAS NO OFF SWITCH.",
  },
};
export const projectThemes = {
  neural: {
    bg: "#17121F",
    ink: "#F5F2EA",
    accent: "#C6FF00",
    label: "CODE REVIEW / EXPERIMENT 01",
  },
  prediction: {
    bg: "#304FFE",
    ink: "#F5F2EA",
    accent: "#F4FF00",
    label: "DATA SCIENCE / EXPERIMENT 02",
  },
  rag: {
    bg: "#65EBF2",
    ink: "#080808",
    accent: "#FF55AD",
    label: "CONNECTED KNOWLEDGE / EXPERIMENT 03",
  },
  web: {
    bg: "#FF5A1F",
    ink: "#080808",
    accent: "#C6FF00",
    label: "CREATIVE DEVELOPMENT / EXPERIMENT 04",
  },
  data: {
    bg: "#F4FF00",
    ink: "#080808",
    accent: "#304FFE",
    label: "OPEN-ENDED EXPLORATION / EXPERIMENT 05",
  },
};
