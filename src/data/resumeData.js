/**
 * Portfolio Data Source: Abdul Raheem (Backend Engineer)
 * Single Source of Truth for experiences, projects, education, certs, and skills.
 */

export const PROFILE = {
  name: "Abdul Raheem",
  title: "Software Engineer",
  status: "Available for Roles",
  location: "Bengaluru, India",
  email: "77abdulraheem@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulraheem-swe",
  website: "https://raheem.page",
  metaDescription: "Software Engineer in Bengaluru with 2 years of backend experience in Java, Spring Boot, Python, Azure Cosmos DB, PostgreSQL, and Redis.",
  bio: "Software Engineer with 2 years of production experience building distributed microservices, low-latency database architectures, and asynchronous data pipelines in Java (Spring Boot) and Python (FastAPI). Contractual notice period: 30 days.",
  resumeUrl: null,
  social: {
    email: "77abdulraheem@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdulraheem-swe",
    github: "https://github.com/Raheem02",
  },
}

export const CORE_SKILLS = [
  "Java",
  "Spring Boot",
  "Distributed Systems",
  "Microservices",
  "REST APIs",
  "Azure Cosmos DB",
  "PostgreSQL",
  "Redis",
  "Rate Limiting",
  "Caching",
  "Python",
  "FastAPI",
  "Docker",
  "TCP/IP Sockets",
  "HikariCP",
  "Git",
  "Linux",
]

export const WORK_EXPERIENCES = [
  {
    id: "techmile",
    period: "Jan 2026 - Present",
    role: "Software Engineer",
    company: "Insuremile",
    description:
      "Responsible for backend microservices architecture and database performance. Implemented distributed rate limiting and multi-tier Redis caching to sustain platform throughput under traffic spikes. Optimized HikariCP connection pools to eliminate connection timeouts. Tuned Azure Cosmos DB partition keys and query indexing across PostgreSQL and MongoDB to maintain sub-50ms latency. Modernized core services from JDK 8 to JDK 17 and built asynchronous data pipelines in Python with FastAPI.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Azure Cosmos DB",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Rate Limiting",
      "Caching",
      "HikariCP",
      "Python",
      "FastAPI",
      "Docker",
    ],
    featured: true,
  },
  {
    id: "ignite3i",
    period: "Nov 2024 - Jan 2026",
    role: "Software Engineer",
    company: "Ignite3i",
    companyUrl: "https://ignite3i.com/",
    description:
      "Engineered a low-latency Java socket service decoding raw binary telemetry packets from over 1,000 cell towers over TCP/IP in sub-seconds. Implemented idempotent payment APIs with unique request hashing to prevent duplicate transaction settlements during network retries. Migrated production database infrastructure from Supabase to Azure SQL, restructuring schemas to cut p95 query latency by 35%. Built REST APIs with Spring Security and JWT, writing test suites with JUnit 5 and Mockito.",
    stack: [
      "Java",
      "Spring Boot",
      "TCP/IP Sockets",
      "Azure SQL",
      "Spring Security",
      "JWT",
      "JUnit 5",
      "Mockito",
      "Linux",
      "Git",
    ],
    featured: true,
  },
]

export const PROJECTS = [
  {
    id: "phishing-detection",
    period: "2024",
    title: "Phishing URL Detection System",
    description:
      "Developed a multi-signal phishing URL detection pipeline analyzing 1.3 million URLs by aggregating lexical features, WHOIS metadata, SSL validation, and threat intelligence sources. Trained LightGBM and Random Forest classification models and built a FastAPI backend service delivering real-time URL risk scoring with sub-300ms inference latency.",
    repoUrl: "https://github.com/Raheem02/minimal-portfolio",
    stack: [
      "FastAPI",
      "LightGBM",
      "Random Forest",
      "scikit-learn",
      "Python",
      "Threat Intel",
    ],
    featured: true,
  },
  {
    id: "learn-ar",
    period: "2023",
    title: "Learn with AR Platform",
    description:
      "Designed and developed an Android AR learning application funded by the Karnataka State Council for Science and Technology (KSCST). Built with Unity 3D and ARCore to deliver interactive 3D visualizations across 8 educational modules. Implemented markerless AR rendering, integrated Blender 3D assets, and optimized mobile graphics performance.",
    repoUrl: "https://github.com/Raheem02/minimal-portfolio",
    stack: ["Unity 3D", "ARCore", "C#", "Blender", "Android"],
    featured: true,
  },
]

export const EDUCATION = [
  {
    id: "mtech",
    period: "2024 - 2026",
    degree: "M.Tech in Computer Science",
    institution: "University of Visvesvaraya College of Engineering",
    location: "Bengaluru, India",
    cgpa: "CGPA 8.58",
    url: "https://uvce.ac.in/",
  },
  {
    id: "be",
    period: "2019 - 2023",
    degree: "B.E. in Computer Science",
    institution: "Atria Institute of Technology",
    location: "Bengaluru, India",
    cgpa: "CGPA 7.42",
    url: "https://atria.edu/",
  },
]

export const CERTIFICATIONS = [
  {
    title: "Java Full Stack Web Development",
    issuer: "TapAcademy",
    idCode: "TA02JUN23075",
    year: "2023",
  },
  {
    title: "Software Testing",
    issuer: "NPTEL",
    idCode: "NPTEL24CS91S452802123",
    year: "2024",
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Coursera",
    year: "2023",
  },
  {
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    idCode: "E7578E91EB19",
    year: "2023",
  },
]

export const PUBLICATIONS_AND_ACTIVITIES = [
  {
    id: "papers",
    period: "Research",
    title: "Peer-Reviewed Research Publications",
    description:
      "Authored 2 peer-reviewed research papers published in international journals, focusing on multi-signal machine learning architectures for phishing detection.",
  },
  {
    id: "tec-hunt",
    period: "Activities",
    title: "Tec-Hunt Application - DEXTERIX",
    description:
      "Engineered and deployed an Android application for the Tec-Hunt event at DEXTERIX, driving a 60% increase in campus event participation.",
  },
]
