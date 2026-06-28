/* ============================================================
   DeepVerse — Portfolio content
   Edit this file to update text, projects, skills, etc.
   ============================================================ */

export const profile = {
  name: "DEEPVERSE",
  alias: "Deep Sharma",
  role: "Software Engineer · AI & Data Science",
  tagline: "A Universe of Code & Imagination",  email: "deep21sv@gmail.com",
  phone: "+91 9650511019",
  location: "Faridabad, India",
  summary:
    "Software Engineering and AI & Data Science undergraduate with strong foundations in Python, Java, SQL, C++, data structures, object-oriented programming, databases, cloud computing and machine learning. Experienced in building data-driven applications and eager to develop scalable software systems. Fast learner with a growth mindset, strong debugging ability and a passion for reliable, maintainable, high-performance code.",
  goal:
    "To develop scalable, reliable software systems and grow as an engineer who writes clean, maintainable, high-performance code.",
  socials: [
    { brand: "github", label: "GitHub", url: "https://github.com/deep-2105" },
    { brand: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/deep-sharma-6275b4236" },
    { brand: "x", label: "Email", url: "mailto:deep21sv@gmail.com" },
  ],
};

/* Hero artwork gradients used to generate procedural card "posters" */
const POSTERS = [
  "linear-gradient(160deg,#1b2348,#0a0d1c 70%),radial-gradient(60% 60% at 70% 20%,rgba(229,181,74,.4),transparent)",
  "linear-gradient(160deg,#2a1530,#0a0712 70%),radial-gradient(60% 60% at 30% 20%,rgba(255,122,60,.35),transparent)",
  "linear-gradient(160deg,#102a2a,#06120f 70%),radial-gradient(60% 60% at 70% 25%,rgba(110,168,255,.35),transparent)",
  "linear-gradient(160deg,#241a3a,#0a0814 70%),radial-gradient(60% 60% at 40% 20%,rgba(180,120,255,.32),transparent)",
  "linear-gradient(160deg,#0e2238,#06101c 70%),radial-gradient(60% 60% at 65% 25%,rgba(120,200,255,.32),transparent)",
];

export const projects = [
  {
    name: "BlindSide",
    tag: "Featured · Blind Dating App",
    desc: "A blind dating application focused on personality-first matching — onboarding lifestyle/fitness flows, journey-scroll layout, envelope animations and a mobile-first design, backed by Supabase.",
    meta: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "CSS"],
    poster: POSTERS[0],
    github: "https://github.com/deep-2105/BlindSide",
    demo: "https://blind-side-silk.vercel.app/",
    duration: "Live",
    status: "Deployed",
    statsLine: [{ value: "Next.js", label: "Stack" }, { value: "Supabase", label: "Backend" }, { value: "Live", label: "Vercel" }],
  },
  {
    name: "IPL Win Probability Predictor",
    tag: "ML Web App",
    desc: "End-to-end IPL match outcome prediction using Python & ML — preprocessing, feature engineering, Git version control and iterative model improvement.",
    meta: ["Python", "Jupyter", "ML", "Pandas"],
    poster: POSTERS[2],
    github: "https://github.com/deep-2105/deep_sharma_C_IPLWinProbabilityPredictor",
    demo: "",
    duration: "Project",
    status: "Complete",
    statsLine: [{ value: "ML", label: "Model" }, { value: "E2E", label: "Pipeline" }, { value: "Git", label: "Versioned" }],
  },
  {
    name: "Cardiovascular Disease Prediction",
    tag: "ML · Healthcare",
    desc: "Modular prediction system using classification algorithms with focus on clean code, evaluation and maintainability.",
    meta: ["Python", "scikit-learn", "OOP"],
    poster: POSTERS[3],
    github: "https://github.com/deep-2105",
    demo: "",
    duration: "Project",
    status: "Complete",
    statsLine: [{ value: "Class.", label: "Models" }, { value: "Modular", label: "Design" }, { value: "Clean", label: "Code" }],
  },
  {
    name: "AWS Cloud Internship Project",
    tag: "Cloud · Internship",
    desc: "Deployed applications on AWS using EC2 & S3 at Ediglobe — gathered requirements, managed tasks, incorporated feedback and improved deployment reliability.",
    meta: ["AWS", "EC2", "S3", "DevOps"],
    poster: POSTERS[4],
    github: "https://github.com/deep-2105",
    demo: "",
    duration: "Internship",
    status: "Complete",
    statsLine: [{ value: "EC2", label: "Compute" }, { value: "S3", label: "Storage" }, { value: "Deploy", label: "Reliable" }],
  },
  {
    name: "Data Analysis Project",
    tag: "Data Viz",
    desc: "Exploratory data analysis, visualization and insight generation using Python libraries.",
    meta: ["Pandas", "NumPy", "Matplotlib"],
    poster: POSTERS[1],
    github: "https://github.com/deep-2105",
    demo: "",
    duration: "Project",
    status: "Complete",
    statsLine: [{ value: "EDA", label: "Analysis" }, { value: "Viz", label: "Charts" }, { value: "Insight", label: "Reports" }],
  },
  {
    name: "DSA Practice",
    tag: "Open Source",
    desc: "Coding problems across arrays, strings, linked lists, stacks, queues, trees, searching and sorting — focused on time complexity and clean implementations.",
    meta: ["C++", "Java", "DSA"],
    poster: POSTERS[2],
    github: "https://github.com/deep-2105",
    demo: "",
    duration: "Ongoing",
    status: "Active",
    statsLine: [{ value: "Trees", label: "Solved" }, { value: "O(n)", label: "Complexity" }, { value: "Git", label: "Tracked" }],
  },
];

export const education = [
  {
    time: "Undergraduate",
    role: "BCA · AI & Data Science",
    org: "K.R. Mangalam University",
    desc: "Bachelor of Computer Applications in Artificial Intelligence & Data Science — foundations in software engineering, DSA, OOP, databases, cloud and machine learning.",
  },
];

/* Netflix-style season — every section becomes a streamable episode */
export const episodes = [
  { rank: "01", name: "About Me", tag: "Origin Story", desc: "Software Engineering & AI/DS undergraduate building data-driven applications.", duration: "4m", progress: 100, target: "about", poster: POSTERS[3] },
  { rank: "02", name: "Projects", tag: "The Series", desc: "ML, data analysis and software engineering builds.", duration: "9m", progress: 80, target: "projects", poster: POSTERS[0] },
  { rank: "03", name: "Skills", tag: "The Spellbook", desc: "Programming, frontend, backend, ML, cloud, databases & tools.", duration: "5m", progress: 65, target: "skills", poster: POSTERS[2] },
  { rank: "04", name: "Experience", tag: "Chronicles", desc: "AWS Cloud Computing Internship at Ediglobe.", duration: "6m", progress: 50, target: "experience", poster: POSTERS[4] },
  { rank: "05", name: "Achievements", tag: "Hall of Honors", desc: "IBM, AWS, NASSCOM and problem-solving trophies.", duration: "3m", progress: 30, target: "achievements", poster: POSTERS[1] },
  { rank: "06", name: "Certifications", tag: "The Sigils", desc: "IBM Big Data, NASSCOM Catalyst, AWS internship.", duration: "3m", progress: 25, target: "achievements", poster: POSTERS[0] },
  { rank: "07", name: "Resume", tag: "The Scroll", desc: "ATS-ready and cinematic — download in one tap.", duration: "2m", progress: 10, target: "resume", poster: POSTERS[2] },
  { rank: "08", name: "Contact", tag: "Final Act", desc: "Reach out for roles, collaborations and projects.", duration: "1m", progress: 0, target: "contact", poster: POSTERS[3] },
];

export const skills = [
  { icon: "code", title: "Programming Languages", desc: "Strong fundamentals across paradigms and languages.", items: "Python · Java · SQL · C++ · JavaScript", level: 90 },
  { icon: "layers", title: "Frontend", desc: "Responsive interfaces built from the ground up.", items: "HTML · CSS · JavaScript · Responsive Design", level: 78 },
  { icon: "cloud", title: "Backend & SE", desc: "OOP, DBMS, SDLC, REST APIs and clean architecture.", items: "OOP · DBMS · Git/GitHub · REST APIs · Testing", level: 84 },
  { icon: "ai", title: "Machine Learning", desc: "Data-driven models with clean evaluation pipelines.", items: "scikit-learn · Pandas · NumPy · Matplotlib", level: 85 },
  { icon: "cloud", title: "Cloud & Big Data", desc: "Cloud deployment and big-data foundations.", items: "AWS (EC2, S3) · Hadoop · Apache Spark", level: 80 },
  { icon: "projects", title: "Databases", desc: "Relational design, queries and management.", items: "SQL · DBMS · Data Modeling", level: 82 },
  { icon: "spark", title: "Tools", desc: "Version control, debugging and software workflows.", items: "Git · GitHub · SDLC · Debugging", level: 88 },
];

export const experience = [
  {
    time: "Internship",
    role: "AWS Cloud Computing Intern",
    org: "Ediglobe",
    desc: "Worked collaboratively on cloud projects, deployed applications on AWS using EC2 and S3, gathered requirements, managed tasks, incorporated feedback and improved deployment reliability.",
  },
];

export const stats = [
  { value: "5", label: "Languages" },
  { value: "5+", label: "Projects" },
  { value: "3", label: "Certifications" },
];

export const achievements = [
  { trophy: "🏆", title: "IBM Big Data Foundations", desc: "Mastered big-data ecosystems and analytics fundamentals.", tag: "IBM" },
  { trophy: "🏆", title: "AWS Cloud Internship", desc: "Deployed apps on AWS EC2 & S3 at Ediglobe with reliable workflows.", tag: "AWS" },
  { trophy: "🏆", title: "NASSCOM Developer Catalyst", desc: "Recognised contributor in NASSCOM's developer program.", tag: "NASSCOM" },
  { trophy: "🏆", title: "Software Engineering Portfolio", desc: "Maintained projects with Git, docs, issue tracking & best practices.", tag: "Portfolio" },
  { trophy: "🏆", title: "GitHub Contributions", desc: "Consistent commits and open-source DSA practice.", tag: "OSS" },
  { trophy: "🏆", title: "Problem Solving", desc: "Arrays, trees, sorting & more with clean, efficient code.", tag: "DSA" },
];

export const certifications = [
  { title: "IBM Big Data Foundations", org: "IBM", year: "" },
  { title: "NASSCOM Developer Catalyst Program", org: "NASSCOM", year: "" },
  { title: "AWS Cloud Computing Internship Certificate", org: "Ediglobe", year: "" },
];

/* Sidebar / nav structure — id maps to section anchors */
export const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "skills", label: "Skills", icon: "skills" },
  { id: "experience", label: "Experience", icon: "experience" },
  { id: "achievements", label: "Awards", icon: "spark" },
  { id: "resume", label: "Resume", icon: "resume" },
  { id: "contact", label: "Contact", icon: "contact" },
];
