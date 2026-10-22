export type Service = { title: string; summary: string; items: string[] };

/** The three services from the original portfolio, plus AI-assisted development. */
export const services: Service[] = [
  {
    title: "Web designer",
    summary:
      "With a solid academic foundation in web design and web development, I offer top-notch services to clients and companies, delivering quality results.",
    items: [
      "User interface design",
      "Web page development",
      "UX element interactions",
      "Brand positioning for your company",
      "Product design and mockups",
    ],
  },
  {
    title: "Web developer",
    summary:
      "I build performant, accessible, and maintainable web applications, from front-end interfaces to server-side APIs.",
    items: [
      "Responsive, accessible front-ends with HTML, CSS, JavaScript and Next.js",
      "Backend development with PHP and Laravel, RESTful APIs",
      "Database design and integration with MySQL and Supabase",
      "Performance optimization and SEO-friendly markup",
      "Deployment, CI/CD and hosting support",
    ],
  },
  {
    title: "Video editor",
    summary:
      "With almost 4 years of experience editing church videos and a strong academic background, I specialize in video editing that elevates your brand.",
    items: [
      "Video editing and post-production",
      "Web page creation",
      "UX element interactions",
      "Branding and positioning",
      "Product design and mockups",
    ],
  },
  {
    title: "AI-assisted development",
    summary:
      "I pair with AI coding agents to move from idea to working software faster, without giving up quality.",
    items: [
      "Spec-first planning before any code is written",
      "Tests written first, then the code that passes them",
      "Automated browser checks with Playwright",
      "Every AI-written change reviewed by me before it ships",
    ],
  },
];
