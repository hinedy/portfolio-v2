// Locked content asset — restructured from the original resume.tsx to match
// the IA, copy, and voice locked in PORTFOLIO.md (§6, §8).
// Source material for evidence/signal sections pulled from the original
// resume.tsx DATA object (work, testimonials, featuredProjects) and
// restructured into the new six-part case-study format and provenance-tagged
// signal format. Blog posts are unchanged — see WRITING section, which
// references the existing .mdx files by slug rather than duplicating content.

export const CONTENT = {
  meta: {
    name: "Ahmed Hinedy",
    role: "Frontend Software Engineer",
    location: "Alexandria, Egypt",
    url: "https://hinedy.vercel.app",
  },

  nav: {
    label: "Position — Evidence — Decisions — Writing — Contact",
    items: [
      { href: "/#position", label: "Position" },
      { href: "/#evidence", label: "Evidence" },
      { href: "/#decisions", label: "Decisions" },
      { href: "/blog", label: "Writing" },
      { href: "/#contact", label: "Contact" },
    ],
    // Annotation motif intentionally NOT used here — see PORTFOLIO.md §4.
  },

  hero: {
    headline: "Software gets complicated long before it gets big.",
    sub: "I design interfaces around constraints, tradeoffs, and the people who have to maintain them.",
    // Full layout/motion/portrait spec: PORTFOLIO.md §11.
    // Portrait asset: ascii-portrait.ts (ASCII_PORTRAIT export).
    portraitAnnotation: "// rendered, not photographed",
  },

  position: {
    sectionLabel: "01 / POSITION",
    question: "How do you think?",
    body: [
      "I care less about frameworks than the decisions behind them.",
      "Most frontend problems aren't visual problems. They're problems of ownership, complexity, changing requirements, and keeping a product understandable as it grows.",
      "That's why I spend more time thinking about architecture, state boundaries, constraints, and tradeoffs than collecting libraries.",
    ],
  },

  evidence: {
    sectionLabel: "02 / EVIDENCE",
    question: "Can you prove it?",
    caseStudies: [
      {
        title: "MedX",
        category: "Production",
        url: "https://medxsvc.com",
        image: "/medx-preview.png",
        owned: "Frontend Engineer",
        decisionSurface: ["Zustand", "React Query", "React Hook Form", "SignalR", "MSAL", "Stripe"],
        thesis: "Building healthcare operations software means correctness matters more than elegance.",
        context:
          "MedX is a multi-role healthcare operations platform coordinating medical service orders between providers, patients, and administrators — handling onboarding, scheduling, escrow-style payments, claims/remits, notifications, and real-time operational workflows in a highly dynamic environment.",
        theProblem:
          "The platform needed a dynamic service builder letting healthcare practices define their own service types, pricing, intake forms, and conditional workflow logic at runtime — plus strict role-based access across every protected operational area, layered on top of a legacy frontend that had accumulated inconsistent patterns under rapidly changing requirements.",
        whyThisWasDifficult:
          "The service builder needed real runtime \"if-this-then-that\" logic — dynamically adding charges, revealing questions, requiring documentation — so the UI had to interpret configuration as behavior, not just render static forms. That had to work alongside RBAC-gated workflows, long-lived authenticated sessions, and live SignalR updates synchronized against Stripe-powered escrow payments, without disrupting a system already handling real financial and medical operations.",
        whatWeChanged:
          "Organized the frontend around feature domains to isolate workflow-heavy business logic, implemented layered state management (Zustand, React Context, React Hook Form, React Query), and built a centralized auth/network layer handling token refresh, retry flows, and cross-tab synchronization. Improved responsiveness through route-based code splitting and lazy loading, particularly for export and reporting workflows — contributing to a ~49.5% reduction in main bundle size, improved First Contentful Paint, and lower Total Blocking Time.",
        tradeoffs: {
          annotation: "// tradeoff: one centralized network layer over per-feature handling",
          detail:
            "Invested in a single centralized auth/network layer rather than letting each feature handle its own token refresh and retry logic — more upfront architecture work in exchange for not duplicating fragile synchronization logic across a dozen different screens.",
        },
        whatIdDoDifferently:
          "Push for the feature-domain organization earlier — some of the legacy inconsistency I inherited could have been avoided if domain boundaries had been established before the codebase grew past a certain size.",
      },
      {
        title: "Revixir",
        category: "Discontinued",
        url: "https://revixir.com",
        image: "/revixir-preview.png",
        owned: "Frontend Engineer",
        decisionSurface: ["Next.js 14", "Zod", "Framer Motion", "RBAC (420+ permissions)"],
        thesis: "Fast iteration only works when the architecture expects change.",
        context:
          "Revixir is a multi-tenant healthcare credentialing platform for organizations managing provider verification, onboarding, compliance, and administration — supporting three application contexts: a central admin portal, tenant-specific client environments, and impersonation sessions for support operations.",
        theProblem:
          "The platform needed subdomain-based tenant isolation, JWT auth with middleware-level token rotation and impersonation handling, and a granular RBAC system — 420+ permissions — governing what every user could see and do across three distinct application contexts.",
        whyThisWasDifficult:
          "Navigation, layouts, and permissions all needed to change dynamically depending on whether someone was in the admin portal, a tenant environment, or an impersonation session — while credentialing records carried large amounts of operational and compliance data that had to stay usable rather than overwhelming, and requirements kept evolving in parallel with backend contract changes.",
        whatWeChanged:
          "Built the frontend on Next.js 14 App Router with middleware-level tenant resolution and auth, implemented the 420+ permission RBAC system, and built reusable infrastructure — form layouts, modal flows, toast notifications, loading skeletons, permission-aware rendering — used across onboarding, provider management, and entity administration instead of building each module in isolation. Used Zod-based schema validation with React Hook Form so validation logic lived with the form, not scattered across API error handling.",
        tradeoffs: {
          annotation: "// tradeoff: shared infrastructure over shipping isolated pages",
          detail:
            "Spent time building reusable form, modal, and table infrastructure instead of shipping each workflow as its own isolated page — slower to the first module, faster for every module after it, since onboarding, provider management, and entity administration all reused the same underlying patterns.",
        },
        whatIdDoDifferently:
          "Document the tenant-resolution and impersonation-session logic earlier — it's the part of the system where getting it wrong is easy and expensive, and it deserved a written reference sooner than it got one.",
      },
      {
        title: "SupplyTech",
        category: "MVP",
        url: "https://supplytechsyg.com/",
        image: "/supplytech-preview.png",
        // RESOLVED: this was a freelance engagement with a team of three developers with
        // intersecting responsibilities — "Lead Frontend Engineer" overstates solo ownership,
        // plain "Frontend Developer" undersells the architecture work documented below. Using
        // the literal external title, with team context now stated explicitly in theProblem.
        owned: "Frontend Developer",
        decisionSurface: ["Next.js", "Zustand", "Radix UI", "TanStack Table"],
        thesis: "Marketplace products become operational products faster than people expect.",
        context:
          "SupplyTech is a logistics and warehouse operations platform supporting warehouse discovery, onboarding, operational management, and future booking infrastructure for warehouse providers and clients.",
        theProblem:
          "The platform needed multi-role dashboards, warehouse onboarding, and operational tooling built during the MVP and product-definition stage — as a freelance engagement with a three-person dev team and intersecting responsibilities, while product direction and stakeholder requirements were still actively changing.",
        whyThisWasDifficult:
          "Every architectural choice had to earn its complexity in a greenfield codebase with evolving requirements — balancing reusable component architecture against the risk of over-engineering before the product direction had settled, while still supporting role-based rendering, localization (Arabic and English), and data-heavy operational views across desktop and mobile.",
        whatWeChanged:
          "Built on Next.js and TypeScript with Zustand for state, Radix UI and TanStack Table for the component layer, and React Hook Form for forms. Implemented JWT authentication with protected routes and persistent sessions, SSR for public-facing SEO pages, and reusable UI primitives shared across onboarding, warehouse management, and admin tooling.",
        tradeoffs: {
          annotation: "// tradeoff: reusable primitives over one-off screens",
          detail:
            "Built shared component primitives — tables, forms, loading states — even at MVP stage rather than one-off screens per workflow. Slightly more setup cost early, but it meant new operational views could be assembled instead of rebuilt as requirements kept shifting.",
        },
        whatIdDoDifferently:
          "Instrument usage earlier — decisions about what to build next were made on stakeholder intuition rather than actual discovery-flow data, because analytics weren't wired in from day one.",
      },
    ],
  },

  decisions: {
    sectionLabel: "03 / DECISIONS",
    question: "What principles repeat across projects?",
    // Rendered as a table, not a list — see PORTFOLIO.md §12.
    // evidenceRefs (array) links to caseStudy titles in `evidence.caseStudies` — only set where
    // the case study text genuinely substantiates the claim. Do not add a ref without checking
    // the actual case study content first (§12 explains why). Schema changed from a single
    // `evidenceRef` string to `evidenceRefs` array now that some principles are honestly
    // demonstrated across more than one project.
    items: [
      { category: "State", statement: "Zustand until complexity proves I need Redux Toolkit.", evidenceRefs: ["MedX"] },
      { category: "Forms", statement: "Validation belongs where users make mistakes, not where APIs reject them.", evidenceRefs: ["Revixir"] },
      { category: "Animation", statement: "Motion should explain state changes, not decorate them.", evidenceRefs: [] },
      { category: "Components", statement: "I optimize for change before I optimize for reuse.", evidenceRefs: ["Revixir", "MedX"] },
      { category: "Performance", statement: "Measure first. Optimize second.", evidenceRefs: ["MedX"] },
      { category: "TypeScript", statement: "Types should remove ambiguity, not create ceremony.", evidenceRefs: [] },
      { category: "APIs", statement: "Normalize inconsistency once instead of handling it everywhere.", evidenceRefs: ["MedX"] },
    ],
    // Rows with evidenceRefs.length > 0 render at higher visual weight and get a hover
    // annotation callout ("// evidence: {evidenceRefs.join(', ')}") that scrolls to and
    // highlights the relevant line in that case study. Rows with an empty array render at
    // standard weight, no hover state, no callout — PORTFOLIO.md §12.
    // Animation and TypeScript remain unlinked: tool usage is documented (Framer Motion,
    // TypeScript across all three projects) but none of the case studies discuss an actual
    // *decision* about motion or typing — presence of a tool isn't evidence of a principle.
  },

  signal: {
    sectionLabel: "04 / SIGNAL",
    question: "Did other people notice?",
    quotes: [
      {
        name: "Simon Dobretsov",
        // RESOLVED: both titles are real — CEO of AHS (the company) and CTO of MedX (the
        // product/project). AHS as a company is no longer active; MedX remains in production.
        // Using the project-context title since this quote sits alongside the MedX case study.
        provenance: "MedX — CTO",
        quote:
          "Ahmed was a critical member of a UI/UX design team for a major project being developed from the ground up in the healthcare space. His technical contributions were notable and his ability to work on a highly-dynamic and evolving project and team were even more noteworthy. Developers that produce good technical work and can function in a team environment with pressure from ever-changing client requirements are hard to find, and you will not go wrong with selecting Ahmed for any of your front end project needs. He produces timely and high quality work even in a higher pressure and time constrained environment.",
      },
      {
        name: "Eliezer Valenzuela",
        provenance: "SophyTech — software engineer",
        quote:
          "Ahmed is extremely knowledgeable rising talent. He has very good communication as well as UI/UX knowledge. He went above and beyond to deliver the task on time. Would highly recommend him and hire him again for any upcoming projects. I wish him best of luck for his future endeavors.",
      },
      {
        name: "Jack Rayan",
        provenance: "freelance client",
        quote:
          "I had a very good experience working with Ahmed, overall very professional, great communicator and fast!",
      },
    ],
    // Note: quote length/truncation for card display is a UI decision, not a content decision —
    // full text preserved here, truncate in component if needed.
  },

  writing: {
    sectionLabel: "05 / WRITING",
    question: "Can you articulate your reasoning?",
    note: "Content unchanged — restyle presentation only to match the spec-sheet system (PORTFOLIO.md §6).",
    posts: [
      {
        slug: "best-practices",
        title: "The Hidden Cost of \u201cBest Practices\u201d in Frontend Systems",
        publishedAt: "2026-01-27",
        summary: "Why practices optimized for code review often break under real product change",
      },
      {
        slug: "bundle",
        title: "How We Cut Our React App's Bundle Size in Half",
        publishedAt: "2025-02-20",
        summary: "Why Bundle Size Matters?",
      },
      {
        slug: "cookies",
        title: "HTTP Cookies Demystified: A Web Developer's Guide",
        publishedAt: "2024-09-08",
        summary: "Understanding HTTP Cookies in Web Development.",
      },
    ],
  },

  contact: {
    sectionLabel: "06 / CONTACT",
    question: "Want to solve another hard problem?",
    line: "If you're building something complex, I'd like to hear about it.",
    email: "ahmedhinedy@gmail.com",
    tel: "+201020790221",
    social: {
      GitHub: "https://github.com/hinedy",
      DEV: "https://dev.to/hinedy",
      LinkedIn: "https://linkedin.com/in/ahmedhinedy",
      Behance: "https://www.behance.net/ahmedhinedy",
    },
  },

  footer: {
    colophon: [
      "// set in Big Shoulders Display, Inter, Space Mono",
      "// last shipped [date — fill in at deploy]",
    ],
    // Footer is the one other confirmed placement for the annotation motif — PORTFOLIO.md §4.
    // Nav intentionally excluded.
  },

  microcopy: {
    // Locked replacements — PORTFOLIO.md §8. Use "chosen because..." sparingly (max 2-3x per page).
    stack: "chosen because...",
    role: "owned",
    tech: "decision surface",
    duration: "time invested",
    outcome: "what changed",
  },
} as const;
