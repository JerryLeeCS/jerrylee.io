import { Project } from "app/types/project";

export const projects: Project[] = [
  {
    title: "📝 Emoji Journal",
    description:
      "Make journal easier to look back on by using emojis to represent your mood.",
    link: "https://www.emojijournal.net/",
    tags: [
      "Next.js",
      "React Native",
      "TypeScript",
      "Tailwind CSS",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Redis",
    ],
    startDate: new Date("2024-07-01"),
  },
  {
    title: "🚘 Motional - Self-driving Car Data Analytic Platform",
    description: "Help self-driving cars to be safer and more efficient.",
    link: "https://www.motional.com/",
    tags: [
      "React",
      "TypeScript",
      "Python",
      "Highcharts",
      "Looker",
      "AWS",
      "PostgreSQL",
    ],
    startDate: new Date("2021-06-01"),
    endDate: new Date("2024-07-01"),
  },
  {
    title:
      "🛢️ Beyond Limits - Oil Refinery Optimization & Oil Drilling Monitoring",
    description:
      "Improve oil refinery efficiency and monitoring oil drilling operations by giving insights and suggestions.",
    link: "https://www.beyondlimits.ai/",
    tags: [
      "React",
      "TypeScript",
      "Feathers.js",
      "Node.js",
      "Python",
      "Go",
      "PostgreSQL",
    ],
    startDate: new Date("2019-10-01"),
    endDate: new Date("2021-06-01"),
  },
  {
    title: "🏠 DoubleDoor - Real Estate Platform",
    description: "Connect real estate buyers and sellers.",
    link: "https://www.doubledoor.io/",
    tags: [
      "Vue",
      "TypeScript",
      "CSS",
      "HTML",
      "Material Design",
      "Express",
      "Node.js",
      "MongoDB",
    ],
    startDate: new Date("2018-07-01"),
    endDate: new Date("2019-06-01"),
  },
];
