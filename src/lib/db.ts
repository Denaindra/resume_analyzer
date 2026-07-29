import fs from "fs";
import path from "path";

export interface Resume {
  id: string;
  title: string;
  lastModified: string;
  completionScore: number;
  atsScore: number;
  sections: {
    personalInfo: { name: string; email: string; phone: string; summary: string };
    experience: { company: string; role: string; duration: string; description: string }[];
    education: { institution: string; degree: string; year: string }[];
    skills: string[];
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: "Free" | "Pro";
}

const STORE_PATH = path.join(process.cwd(), "src/lib/db_store.json");

function getInitialData() {
  return {
    users: [
      {
        id: "usr_1",
        email: "user@example.com",
        name: "Alex Carter",
        subscription: "Free",
      },
    ] as User[],
    resumes: [
      {
        id: "res_1",
        title: "Software Engineer Resume",
        lastModified: "2026-07-19T10:00:00Z",
        completionScore: 85,
        atsScore: 92,
        sections: {
          personalInfo: {
            name: "Alex Carter",
            email: "user@example.com",
            phone: "+1 (555) 019-2834",
            summary: "Experienced software engineer specializing in building full-stack web applications with Next.js and Tailwind CSS.",
          },
          experience: [
            {
              company: "Tech Corp",
              role: "Senior Frontend Engineer",
              duration: "2024 - Present",
              description: "Lead development of cloud-native UI dashboards. Improved performance by 35% using React Server Components.",
            },
            {
              company: "Innovate LLC",
              role: "Full Stack Developer",
              duration: "2022 - 2024",
              description: "Designed RESTful APIs using Node.js and built responsive user interfaces using modern CSS frameworks.",
            },
          ],
          education: [
            {
              institution: "State University",
              degree: "B.S. in Computer Science",
              year: "2022",
            },
          ],
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
        },
      },
      {
        id: "res_2",
        title: "Product Manager Resume",
        lastModified: "2026-07-18T15:30:00Z",
        completionScore: 60,
        atsScore: 78,
        sections: {
          personalInfo: {
            name: "Alex Carter",
            email: "user@example.com",
            phone: "+1 (555) 019-2834",
            summary: "Detail-oriented Product Manager with a background in engineering, specialized in agile workflows and product design.",
          },
          experience: [
            {
              company: "Product Studio",
              role: "Associate Product Manager",
              duration: "2024 - Present",
              description: "Manage product backlog, define user stories, and collaborate with cross-functional design and engineering teams.",
            },
          ],
          education: [
            {
              institution: "State University",
              degree: "B.S. in Computer Science",
              year: "2022",
            },
          ],
          skills: ["Product Roadmap", "Agile/Scrum", "User Research", "Wireframing", "SQL"],
        },
      },
    ] as Resume[],
  };
}

export function readDb(): { users: User[]; resumes: Resume[] } {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      const initial = getInitialData();
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const data = fs.readFileSync(STORE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading db_store:", error);
    return getInitialData();
  }
}

export function writeDb(data: { users: User[]; resumes: Resume[] }) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing db_store:", error);
  }
}
