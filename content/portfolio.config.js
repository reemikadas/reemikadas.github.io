const portfolio = {
  site: {
    title: "Reemika Subrata Das | Data & Applied AI",
    description: "Reemika Subrata Das is a data analytics and applied AI professional building reliable AI, machine-learning, BI, and data-engineering solutions.",
    brandName: "Reemika Das",
    brandMark: "R",
    resume: "Reemika_Subrata_Das_Resume.pdf",
    githubUsername: "reemikadas",
    analyticsId: "G-RB2D7MWZB1"
  },
  sectionOrder: ["home", "about", "experience", "skills", "projects", "contact"],
  navigation: {
    home: "Home",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact"
  },
  sections: {
    home: {
      enabled: true,
      eyebrow: "Data Analytics · Applied AI · San Jose",
      name: "Reemika\nSubrata Das",
      welcome: "Welcome, I'm glad you're here.",
      introduction: "I turn complex data and emerging AI capabilities into reliable, useful products that people can understand and trust.",
      location: "SAN JOSE, CALIFORNIA",
      profileImage: "Reemika_Das_Profile_Pic.png",
      profileImageAlt: "Reemika Subrata Das working on a laptop in a café in San Jose",
      actions: [
        { label: "Explore my work →", href: "#projects", primary: true },
        { label: "Download résumé", href: "Reemika_Subrata_Das_Resume.pdf", download: true }
      ]
    },
    about: {
      enabled: true,
      eyebrow: "About me",
      title: "From reporting\nto responsible AI.",
      tagline: "I connect business questions, dependable data, and practical machine intelligence.",
      paragraphs: [
        "My career began in finance and operations, where I learned how accurate reporting and clear analysis shape everyday decisions. At XL Dynamics, I expanded that foundation into MIS reporting and business intelligence, translating stakeholder needs into dashboards, repeatable processes, and decision-ready insights.",
        "Since then, I have moved deeper into data science and applied AI—earning an M.S. in Business Analytics with an AI/ML concentration from Santa Clara University and building forecasting, RAG, Text-to-SQL, data-engineering, and evaluation systems. Today, I bring the full journey together: business context, analytical discipline, and production-minded AI engineering."
      ],
      kpis: [
        { value: "5+", label: "Years of experience" },
        { value: "3.71", label: "Master's GPA / 4.00" },
        { value: "20", label: "Public GitHub repos", dynamic: "githubRepos" }
      ]
    },
    experience: {
      enabled: true,
      eyebrow: "Experience",
      title: "Work that compounds.",
      subtitle: "Five roles across applied AI, data science, business intelligence, credit risk, and finance—each one adding a stronger layer of technical and business judgment.",
      items: [
        {
          period: "Dec 2025 — Present",
          role: "Research Assistant",
          company: "Santa Clara University",
          highlights: [
            "Developed, tested, and deployed a Python-based AI provenance assistant on AWS EC2, using LLMs, Flask, FastAPI, and MySQL across 41K+ artwork and 70K+ image records.",
            "Designed a secure Text-to-SQL architecture with SQLGlot validation, approved-table authorization, SELECT-only enforcement, query controls, and multi-model fallback.",
            "Building an evaluation and observability pipeline for token use, latency, provider performance, quality, and cost optimization."
          ]
        },
        {
          period: "Jan 2025 — Jun 2025",
          role: "Data Scientist Practicum",
          company: "Adobe · with Santa Clara University",
          highlights: [
            "Developed and benchmarked ARIMA, feed-forward neural network, RNN, and LSTM demand-forecasting models, achieving 2.4% MAPE.",
            "Built a reusable Python ML pipeline across 6,400+ daily records with lag, rolling-window, fiscal-calendar, holiday, growth, and Fourier features."
          ]
        },
        {
          period: "Nov 2021 — Aug 2024",
          role: "Process Executive — MIS",
          company: "XL Dynamics India Pvt Ltd",
          highlights: [
            "Prepared 30+ MIS reports for senior management, finance, and marketing teams by extracting, cleaning, validating, and transforming mortgage data in Excel.",
            "Created dashboards and recurring reporting for 7–8 cross-functional teams, and documented standard operating procedures to reduce knowledge gaps and escalation."
          ]
        },
        {
          period: "Jun 2021 — Oct 2021",
          role: "Credit Risk Analyst",
          company: "MP Financial Advisory Services LLP",
          highlights: [
            "Built Excel-based financial models for five client credit evaluations, summarizing creditworthiness, risk exposure, and recommendation drivers for lending decisions."
          ]
        },
        {
          period: "Jun 2018 — Jun 2019",
          role: "Account Assistant",
          company: "Trio Logistics Pvt Ltd",
          highlights: [
            "Improved tax-filing readiness for 50+ clients through reconciliation reports, monthly summaries, and accurate financial records."
          ]
        }
      ]
    },
    skills: {
      enabled: true,
      eyebrow: "Technical skills",
      title: "A practical AI & data toolkit.",
      subtitle: "From ingestion and analysis through modeling, evaluation, deployment, and business intelligence.",
      items: [
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
        { name: "SQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
        { name: "Advanced Excel", icon: "https://api.iconify.design/vscode-icons:file-type-excel.svg" },
        { name: "Tableau", icon: "https://api.iconify.design/logos:tableau-icon.svg" },
        { name: "Databricks", icon: "https://cdn.simpleicons.org/databricks/FF3621" },
        { name: "PySpark", icon: "https://cdn.simpleicons.org/apachespark/E25A1C" },
        { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/150458" },
        { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy/013243" },
        { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
        { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
        { name: "Keras", icon: "https://cdn.simpleicons.org/keras/D00000" },
        { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "AWS EC2", icon: "https://api.iconify.design/logos:aws.svg" },
        { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
        { name: "Git & GitHub", icon: "https://cdn.simpleicons.org/git/F05032" }
      ]
    },
    projects: {
      enabled: true,
      eyebrow: "Featured projects",
      title: "Built to answer real questions.",
      subtitle: "Four projects spanning SQL learning, governed data engineering, conversational RAG, and evidence-first agentic AI.",
      items: [
        {
          name: "SQL Challenge Journal",
          type: "SQL · Learning Platform",
          description: "An organized public journal of HackerRank and DataLemur challenges, with MySQL and PostgreSQL solutions published as clear, reusable Markdown through a purpose-built notebook publisher.",
          thumbnail: "assets/projects/sql-challenge-journal.webp",
          thumbnailAlt: "Editorial illustration of connected database tables and a completed SQL query",
          tags: ["MySQL", "PostgreSQL", "Markdown publishing"],
          links: [
            { label: "Open website", url: "https://sql-challenge-publisher.das-reemika.chatgpt.site/" },
            { label: "View repository", url: "https://github.com/reemikadas/SQL-Challenge-Journal" }
          ]
        },
        {
          name: "Uber vs Lyft Fare Analytics Platform",
          type: "Data Engineering · BI · ML",
          description: "A governed Databricks medallion pipeline, Tableau analysis, and predictive-fare workflow built across fare and Boston weather data to compare services and model ride prices.",
          thumbnail: "assets/projects/uber-lyft-fare-analytics.webp",
          thumbnailAlt: "Editorial illustration of ride routes, weather, data layers, and an analytics dashboard",
          tags: ["699K+ records", "$1.19 MAE", "0.9625 R²"],
          links: [{ label: "View repository", url: "https://github.com/reemikadas/uber-lyft-fare-analytics-platform" }]
        },
        {
          name: "HealthMate",
          type: "Conversational RAG · Evaluation",
          description: "A full-stack fitness and nutrition guide that grounds responses in eight curated knowledge documents using semantic retrieval, FAISS, LangChain, Hugging Face embeddings, and Groq inference.",
          thumbnail: "assets/projects/healthmate.webp",
          thumbnailAlt: "Editorial illustration of a conversational assistant connected to fitness, nutrition, and retrieval sources",
          tags: ["8 source documents", "36 eval cases", "Cited answers"],
          links: [{ label: "View repository", url: "https://github.com/reemikadas/HealthMate_AI_Fitness_Nutrition_Guide" }]
        },
        {
          name: "IdeaCourt",
          type: "Agentic AI · Product Validation",
          description: "An evidence-first startup validation workbench that coordinates specialized research agents, produces a Build/Pivot/Stop verdict, and unlocks downstream planning only when the evidence supports it.",
          thumbnail: "assets/projects/ideacourt.webp",
          thumbnailAlt: "Editorial illustration of AI agents evaluating evidence around a balanced decision scale",
          tags: ["8 agents", "Evidence gates", "Multi-model fallback"],
          links: [{ label: "View repository", url: "https://github.com/reemikadas/IdeaCourt" }]
        }
      ]
    },
    contact: {
      enabled: true,
      eyebrow: "Contact",
      title: "Let’s turn a hard problem\ninto useful work.",
      opportunityLine: "Looking for opportunities in AI/ML Engineering, BI/Data Engineering, and Data Science.",
      links: [
        { icon: "email", url: "mailto:das.reemika@gmail.com", tooltip: "das.reemika@gmail.com", ariaLabel: "Email das.reemika@gmail.com" },
        { icon: "phone", url: "tel:+14088297230", tooltip: "408-829-7230", ariaLabel: "Call 408-829-7230" },
        { icon: "linkedin", url: "https://www.linkedin.com/in/reemikadas", tooltip: "linkedin.com/in/reemikadas", ariaLabel: "LinkedIn profile: linkedin.com/in/reemikadas" },
        { icon: "github", url: "https://github.com/reemikadas", tooltip: "github.com/reemikadas", ariaLabel: "GitHub profile: github.com/reemikadas" },
        { icon: "resume", url: "Reemika_Subrata_Das_Resume.pdf", tooltip: "Download résumé PDF", ariaLabel: "Download résumé PDF", download: true }
      ],
      form: {
        enabled: true,
        endpoint: "https://script.google.com/macros/s/AKfycbxg6GF1NAJgcrLMhja36R2kUymlNDFng4hCRIiwFO84-IvHxmqQhOM5mjDoVForlGHDzg/exec",
        title: "Send a message",
        buttonLabel: "Send message →",
        successMessage: "Message received. I’ll get back to you soon.",
        errorMessage: "Something went wrong. Please email me directly at das.reemika@gmail.com."
      }
    }
  },
  footer: "Reemika Subrata Das · San Jose, California"
};

export default portfolio;
