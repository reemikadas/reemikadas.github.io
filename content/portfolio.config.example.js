// Copy this file to portfolio.config.js, then replace every sample value.
// Set any section's `enabled` value to false to hide it from the page and navigation.
const portfolio = {
  site: {
    title: "Your Name | Professional Portfolio",
    description: "A short description used by search engines and link previews.",
    brandName: "Your Name",
    brandMark: "YN",
    resume: "assets/your-resume.pdf",
    githubUsername: "your-github-username",
    analyticsId: "", // Optional Google Analytics measurement ID, for example G-XXXXXXXXXX.
    navigationCta: { label: "Let's Connect", href: "#contact" }
  },
  sectionOrder: ["home", "about", "experience", "skills", "projects", "contact"],
  navigation: {
    home: "Home",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    contact: ""
  },
  sections: {
    home: {
      enabled: true,
      eyebrow: "Open to your target opportunities",
      name: "Your\nName",
      welcome: "Welcome, I'm glad you're here.",
      introduction: "Write one sentence about the problems you solve and the value you create.",
      location: "CITY, COUNTRY",
      profileImage: "assets/profile.webp",
      profileImageAlt: "Your Name",
      actions: [
        { label: "Explore my work ↓", href: "#projects", primary: true },
        { label: "Email me", href: "mailto:you@example.com", icon: "assets/icons/gmail.svg" }
      ]
    },
    about: {
      enabled: true,
      eyebrow: "About me",
      title: "Your short\ncareer theme.",
      tagline: "A concise statement connecting your experience and direction.",
      paragraphs: [
        "Introduce your career journey, domain experience, and the kinds of decisions your work supports.",
        "Describe your recent development, education, technical focus, and what you bring together today."
      ],
      kpis: [
        { value: "5+", label: "Years of experience" },
        { value: "3.8", label: "GPA / 4.00" },
        { value: "0", label: "Public GitHub repos", dynamic: "githubRepos" }
      ]
    },
    experience: {
      enabled: true,
      eyebrow: "Experience",
      title: "Your experience title.",
      subtitle: "Summarize the progression and range of your professional experience in one sentence.",
      items: [
        {
          period: "Jan 2024 — Present",
          role: "Role Title",
          company: "Company Name",
          highlights: [
            "Start with a strong action verb and describe a measurable result.",
            "Add another concise achievement relevant to your target role."
          ]
        }
      ]
    },
    skills: {
      enabled: true,
      eyebrow: "Technical skills",
      title: "Your toolkit title.",
      subtitle: "Describe how these tools support your work.",
      items: [
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" }
      ]
    },
    projects: {
      enabled: true,
      eyebrow: "Featured projects",
      title: "Your projects title.",
      subtitle: "Summarize the themes that connect your selected projects.",
      items: [
        {
          name: "Project Name",
          type: "Project category · Domain",
          description: "Explain the problem, solution, and outcome in two concise sentences.",
          thumbnail: "assets/projects/project.webp",
          thumbnailAlt: "Accessible description of the project thumbnail",
          tags: ["Technology", "Metric", "Outcome"],
          links: [
            { label: "Open website", url: "https://example.com" },
            { label: "View repository", url: "https://github.com/your-github-username/project" }
          ]
        }
      ],
      cta: {
        label: "View All Repositories",
        url: "https://github.com/your-github-username?tab=repositories",
        icon: "github"
      }
    },
    contact: {
      enabled: true,
      eyebrow: "Contact",
      hiringPrompt: "Hiring for your target role?",
      title: "Your closing\ncall to action.",
      links: [
        { icon: "email", url: "mailto:you@example.com", tooltip: "you@example.com", ariaLabel: "Email you@example.com" },
        { icon: "linkedin", url: "https://www.linkedin.com/in/your-profile", tooltip: "linkedin.com/in/your-profile", ariaLabel: "LinkedIn profile" },
        { icon: "github", url: "https://github.com/your-github-username", tooltip: "github.com/your-github-username", ariaLabel: "GitHub profile" },
        { icon: "resume", url: "assets/your-resume.pdf", tooltip: "Download résumé PDF", ariaLabel: "Download résumé PDF", download: true }
      ],
      form: {
        enabled: false, // Enable only after adding a form endpoint that accepts JSON POST requests.
        endpoint: "",
        title: "Send a message",
        buttonLabel: "Send message →",
        successMessage: "Message received. I’ll get back to you soon.",
        errorMessage: "Something went wrong. Please email me directly."
      }
    }
  },
  footer: {
    specialty: "Your field · Your specialty",
    location: "Your City, Country"
  }
};

export default portfolio;
