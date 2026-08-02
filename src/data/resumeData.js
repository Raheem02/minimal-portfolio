/**
 * Portfolio Data Source: Abdul Raheem (Backend Engineer)
 * Single Source of Truth for experiences, projects, education, certs, and skills.
 */

export const PROFILE = {
  name: "Abdul Raheem",
  title: "Backend Engineer",
  status: "Available for Roles",
  location: "Bengaluru, India",
  email: "77abdulraheem@gmail.com",
  linkedin: "https://www.linkedin.com/in/raheem02",
  website: "https://raheem.page/",
  bio: "Backend Engineer focused on building robust distributed systems, Java Spring Boot microservices, RESTful APIs, and cloud deployments. Experienced in leading end-to-end service migration, database architecture, and production API design across enterprise InsureTech and security domains.",
  resumeUrl: null,
  social: {
    email: "77abdulraheem@gmail.com",
    linkedin: "https://www.linkedin.com/in/raheem02",
    github: "https://github.com/Raheem02",
  },
}

export const CORE_SKILLS = [
  "Java",
  "Spring Boot",
  "Microservices",
  "REST APIs",
  "Python",
  "FastAPI",
  "Azure SQL",
  "Azure Cosmos DB",
  "PostgreSQL",
  "Android",
  "Git",
  "Maven",
]

export const WORK_EXPERIENCES = [
  {
    id: "techmile",
    period: "Jan 2026 – Present",
    role: "Backend Developer",
    company: "Insuremile",
    description:
      "Led end-to-end migration of core Java microservices from JDK 8 to JDK 17, resolving Spring Boot dependency conflicts, API deprecations, and production integration issues. Built a Python sales automation service to generate daily reports and scheduled insights via automated API pipelines. Redesigned internal Android employee applications and integrated backend REST APIs. Configured Azure Cosmos DB document stores and managed API Gateway routing for service-to-service communication.",
    stack: [
      "Java",
      "Spring Boot",
      "JDK 17",
      "Python",
      "REST APIs",
      "Azure Cosmos DB",
      "API Gateway",
      "Android",
    ],
    featured: true,
  },
  {
    id: "ignite3i",
    period: "Nov 2024 – Jan 2026",
    role: "Software Engineer",
    company: "Ignite3i",
    companyUrl: "https://ignite3i.com/",
    description:
      "Engineered a binary log-code decoding system for network tower fault detection, automating error matching against technical manuals for root-cause diagnosis. Built 10+ RESTful APIs across a 5-service microservices architecture, supporting the entire insurance policy lifecycle (quote, proposal, KYC, payment, and policy download). Modernized backend service runtimes, designed API Gateway pipelines, and executed seamless database migrations from Supabase to Azure SQL.",
    stack: [
      "Java",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "Azure SQL",
      "Supabase",
      "Maven",
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
    period: "2024 – 2026",
    degree: "M.Tech in Computer Science",
    institution: "University of Visvesvaraya College of Engineering",
    location: "Bengaluru, India",
    cgpa: "CGPA 8.58",
    url: "https://uvce.ac.in/",
  },
  {
    id: "be",
    period: "2019 – 2023",
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
    title: "Tec-Hunt Application – DEXTERIX",
    description:
      "Engineered and deployed an Android application for the Tec-Hunt event at DEXTERIX, driving a 60% increase in campus event participation.",
  },
]
