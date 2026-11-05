// The single source of truth for the exhibition. null = not yet verified.
// Replace draft copy with your own results before publishing. Never add assumed metrics.
export const personal = {
  name: "Suyash Pandey",
  initials: "SP",
  discipline: "AI & Data Science Engineering",
  location: "India",
  availability: "Open to meaningful collaborations",
  email: null as string | null,
  social: {
    github: null as string | null,
    linkedin: null as string | null,
    instagram: null as string | null,
  },
  introduction:
    "I am Suyash Pandey, an AI and Data Science engineering student building intelligent systems, meaningful digital experiences, and new possibilities at the intersection of technology and creativity.",
  interests:
    "My interests span artificial intelligence, software development, problem solving, product thinking, and creative experimentation.",
  achievements: [] as string[],
};
export const navigation = [
  { label: "The story", href: "/#about" },
  { label: "Selected work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
];
export type Project = {
  slug: string;
  number: string;
  title: string;
  displayTitle: string;
  category: string;
  year: string;
  description: string;
  problem: string;
  technologies: string[];
  features: string[];
  architecture: string[];
  result: string;
  github: string | null;
  demo: string | null;
  visual: "neural" | "prediction" | "rag" | "web" | "data";
  status: string;
};
export const projects: Project[] = [
  {
    slug: "ai-code-review",
    number: "01",
    title: "AI Code Review & Bug Detection Assistant",
    displayTitle: "CODE THAT\nCHECKS CODE.",
    category: "AI CODE REVIEW & BUG DETECTION",
    year: "CONCEPT / EDITABLE",
    description:
      "Exploring how intelligent systems can make better code a little more human.",
    problem:
      "Code review takes care, context, and time. This project explores an AI-assisted approach to identifying potential bugs and explaining improvements in a developer-friendly way.",
    technologies: ["Python", "LLMs", "FastAPI"],
    features: [
      "Context-aware review",
      "Potential bug identification",
      "Readable improvement suggestions",
    ],
    architecture: [
      "Code input",
      "Context preparation",
      "LLM analysis",
      "Review & suggestions",
    ],
    result:
      "Implementation details, screenshots, and measured results are awaiting verification. The capabilities above describe the intended scope, not verified outcomes.",
    github: null,
    demo: null,
    visual: "neural",
    status: "Project overview · details to be verified",
  },
  {
    slug: "placement-prediction",
    number: "02",
    title: "Student Placement Prediction System",
    displayTitle: "PREDICT.\nDON’T GUESS.",
    category: "STUDENT PLACEMENT PREDICTION",
    year: "CONCEPT / EDITABLE",
    description:
      "Finding the signals that turn student data into more informed decisions.",
    problem:
      "Exploring how historical student data could help identify placement-related patterns, while recognizing the limitations and fairness considerations of predictive models.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    features: [
      "Exploratory data analysis",
      "Classification workflow",
      "Interpretable predictions",
    ],
    architecture: [
      "Student data",
      "Cleaning & analysis",
      "Model evaluation",
      "Prediction interface",
    ],
    result:
      "Dataset, model selection, evaluation metrics, and implementation are pending verification. No accuracy claims are made.",
    github: null,
    demo: null,
    visual: "prediction",
    status: "Project overview · details to be verified",
  },
  {
    slug: "rag-application",
    number: "03",
    title: "RAG-based AI Application",
    displayTitle: "CONNECT\nTHE DOTS.",
    category: "RETRIEVAL-AUGMENTED GENERATION",
    year: "CONCEPT / EDITABLE",
    description: "Bringing the right context to the conversations that matter.",
    problem:
      "General language models do not inherently know the contents of a specific document collection. This concept explores grounding responses in retrieved source material.",
    technologies: ["Python", "LLMs", "RAG", "FastAPI"],
    features: [
      "Document ingestion",
      "Semantic retrieval",
      "Source-grounded answers",
    ],
    architecture: [
      "Documents",
      "Chunking & embeddings",
      "Retrieval",
      "Context-aware generation",
    ],
    result:
      "The document sources, retrieval implementation, screenshots, and evaluation are pending verification.",
    github: null,
    demo: null,
    visual: "rag",
    status: "Project overview · details to be verified",
  },
  {
    slug: "interactive-web",
    number: "04",
    title: "Interactive Web Experiences",
    displayTitle: "WHAT IF\nTHE WEB?",
    category: "INTERACTIVE WEB EXPERIENCES",
    year: "ONGOING EXPLORATION",
    description: "Digital spaces that invite you to feel, play, and discover.",
    problem:
      "Exploring how motion, thoughtful interaction, and editorial design can make a digital experience more expressive without making it harder to use.",
    technologies: ["React", "Next.js", "TypeScript", "Three.js"],
    features: [
      "Responsive compositions",
      "Motion with intention",
      "Accessible interactions",
    ],
    architecture: [
      "Content system",
      "React components",
      "Motion & 3D",
      "Responsive experience",
    ],
    result:
      "This portfolio is a live exploration of that direction. Other web projects, source links, and screenshots can be added after verification.",
    github: null,
    demo: null,
    visual: "web",
    status: "Creative development · evolving collection",
  },
  {
    slug: "data-explorations",
    number: "05",
    title: "AI & Data Science Explorations",
    displayTitle: "STAY\nUNFINISHED.",
    category: "AI & DATA SCIENCE EXPLORATIONS",
    year: "EDITABLE COLLECTION",
    description: "Small experiments. Unexpected connections. New questions.",
    problem:
      "An editable collection for AI and data science experiments. Specific research questions and datasets will be documented as individual projects are verified.",
    technologies: ["Python", "NumPy", "Pandas"],
    features: [
      "Data exploration",
      "Reproducible experiments",
      "Visual storytelling",
    ],
    architecture: ["Question", "Data exploration", "Experiment", "Reflection"],
    result:
      "Individual experiments, datasets, screenshots, and findings are not yet published.",
    github: null,
    demo: null,
    visual: "data",
    status: "Collection placeholder · awaiting verified projects",
  },
];
export const experiences = [
  {
    role: "AI Intern",
    field: "Intelligence, explored.",
    theme: "Learning to turn questions into intelligent possibilities.",
    skills: ["ARTIFICIAL INTELLIGENCE", "EXPERIMENTATION"],
  },
  {
    role: "Data Entry Intern",
    field: "Precision is a practice.",
    theme: "An appreciation for the details that give data its value.",
    skills: ["DATA", "ATTENTION TO DETAIL"],
  },
  {
    role: "AI Intern",
    field: "A deeper perspective.",
    theme: "Continuing the exploration of intelligent systems.",
    skills: ["AI SYSTEMS", "PROBLEM SOLVING"],
  },
  {
    role: "Web Developer Intern",
    field: "From thought to interface.",
    theme: "Exploring the craft of meaningful digital experiences.",
    skills: ["WEB DEVELOPMENT", "INTERFACES"],
  },
  {
    role: "Solution Developer Intern",
    field: "Connecting the pieces.",
    theme: "Looking at challenges through a solution-oriented lens.",
    skills: ["SOLUTION DEVELOPMENT", "SYSTEMS THINKING"],
  },
].map((item, index) => ({
  ...item,
  id: String(index + 1).padStart(2, "0"),
  company: null as string | null,
  dates: null as string | null,
  responsibilities: null as string | null,
  technologies: null as string[] | null,
  achievements: [] as string[],
}));
export const skillGroups = [
  {
    title: "Programming",
    skills: [
      {
        name: "Python",
        description:
          "A language for turning ideas into scripts, systems, and experiments.",
      },
      {
        name: "JavaScript",
        description: "The interactive language of the web.",
      },
      {
        name: "SQL",
        description: "Finding meaningful answers in structured data.",
      },
    ],
  },
  {
    title: "AI & Data Science",
    skills: [
      {
        name: "Machine Learning",
        description: "Exploring patterns and building models from data.",
      },
      {
        name: "Data Analysis",
        description:
          "Making sense of data through investigation and interpretation.",
      },
      {
        name: "Pandas",
        description: "Manipulating and exploring tabular data in Python.",
      },
      {
        name: "NumPy",
        description: "Numerical computing and array-based experimentation.",
      },
      {
        name: "Scikit-learn",
        description: "Practical tools for modeling and evaluation.",
      },
      {
        name: "LLMs",
        description: "Exploring language models and their applications.",
      },
      {
        name: "RAG",
        description: "Connecting language models to relevant source knowledge.",
      },
    ],
  },
  {
    title: "Development",
    skills: [
      {
        name: "React",
        description: "Composable interfaces built from thoughtful components.",
      },
      {
        name: "Next.js",
        description: "Full-stack React experiences, from routing to rendering.",
      },
      { name: "FastAPI", description: "Building clear, typed Python APIs." },
      {
        name: "Streamlit",
        description: "Bringing data experiments to life as interactive apps.",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", description: "Keeping a deliberate history of the work." },
      {
        name: "GitHub",
        description:
          "A home for code, collaboration, and open-source exploration.",
      },
      {
        name: "Playwright",
        description: "Testing real interactions across browser experiences.",
      },
    ],
  },
];
export const interests = [
  {
    number: "01",
    title: "Chess",
    subtitle: "Thinking a few moves ahead.",
    symbol: "♞",
  },
  {
    number: "02",
    title: "Badminton",
    subtitle: "Finding rhythm in movement.",
    symbol: "↗",
  },
  {
    number: "03",
    title: "Stories & worlds",
    subtitle: "Reading Western comic novels.",
    symbol: "Aa",
  },
  {
    number: "04",
    title: "Making things happen",
    subtitle: "Creative experiments, leadership & events.",
    symbol: "✳",
  },
];
