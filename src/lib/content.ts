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
        thesis: "Building healthcare software means correctness matters more than elegance.",
        context:
          "MedX is a production medical services platform managing healthcare workflows across multiple stakeholders, operating in a regulated environment where reliability and clarity directly affect real users and operations.",
        theProblem:
          "The existing frontend codebase was unstable under active development, with unclear structure and requirements that kept shifting as the product evolved.",
        whyThisWasDifficult:
          "Correctness and reliability directly affected real users and operations, so any refactor had to happen without disrupting a system already in production — while requirements were loosely defined and needed daily translation into technical decisions.",
        whatWeChanged:
          "Introduced clearer frontend structure and reusable UI patterns (tables, trees, tabs, form elements, hooks), built authentication with dynamic token rotation, implemented dynamic forms with React Hook Form, and migrated initial page fetching to server components for performance.",
        tradeoffs: {
          annotation: "// tradeoff: incremental refactor over rewrite",
          detail:
            "Chose targeted, incremental refactors over a rewrite — slower short-term velocity in exchange for not destabilizing a live system multiple stakeholders depended on.",
        },
        whatIdDoDifferently:
          "Push for a shared component library earlier — some of the reusable patterns were built reactively, after duplication had already spread across the codebase.",
      },
      {
        title: "Revixir",
        category: "Discontinued",
        url: "https://revixir.com",
        image: "/revixir-preview.png",
        thesis: "Fast iteration only works when the architecture expects change.",
        context:
          "Revixir was a provider credentialing system managing onboarding, verification, and access control for healthcare providers in a multi-tenant environment.",
        theProblem:
          "The product needed to move fast in its early stage, but multi-tenant credentialing carries real security and correctness requirements that don't tolerate move-fast shortcuts.",
        whyThisWasDifficult:
          "Balancing rapid iteration with secure, role-based access control meant the architecture had to anticipate change rather than get patched after each new requirement.",
        whatWeChanged:
          "Built a multi-tenant frontend architecture on Next.js and server components, implemented secure authentication and role-based access, and designed reusable patterns for complex, conditional credentialing workflows.",
        tradeoffs: {
          annotation: "// tradeoff: upfront design time over later rebuild",
          detail:
            "Invested in performance and maintainability from the outset rather than retrofitting later — added upfront design time in exchange for not having to rebuild auth and access patterns mid-flight.",
        },
        whatIdDoDifferently:
          "Document the multi-tenant patterns earlier as shared reference — without it, onboarding new contributors into the credentialing logic took longer than it should have.",
      },
      {
        title: "SupplyTech",
        category: "MVP",
        url: "https://supplytechsyg.com/",
        image: "/supplytech-preview.png",
        thesis: "Marketplace products become operational products faster than people expect.",
        context:
          "SupplyTech is an early-stage B2B marketplace connecting warehouse providers with clients through discovery and onboarding.",
        theProblem:
          "The product needed to communicate value to a non-technical audience and validate market assumptions before the product itself had matured.",
        whyThisWasDifficult:
          "Building discovery and onboarding flows before product-market fit meant designing for flexibility without over-engineering an MVP — every architectural choice had to earn its complexity.",
        whatWeChanged:
          "Built an animated landing page to communicate positioning, warehouse onboarding flows with admin verification, a searchable and filterable client discovery experience, and role-based dashboard structures ready for future booking and payments.",
        tradeoffs: {
          annotation: "// tradeoff: extensible structure over full build-out",
          detail:
            "Kept the frontend structure deliberately extensible rather than fully built out — avoided investing in booking and payments UI before the business model was validated.",
        },
        whatIdDoDifferently:
          "Instrument usage earlier — decisions about what to build next were made on stakeholder intuition rather than actual discovery-flow data, because analytics weren't wired in from day one.",
      },
    ],
  },

  decisions: {
    sectionLabel: "03 / DECISIONS",
    question: "What principles repeat across projects?",
    items: [
      { category: "State", statement: "Zustand until complexity proves I need Redux Toolkit." },
      { category: "Forms", statement: "Validation belongs where users make mistakes, not where APIs reject them." },
      { category: "Animation", statement: "Motion should explain state changes, not decorate them." },
      { category: "Components", statement: "I optimize for change before I optimize for reuse." },
      { category: "Performance", statement: "Measure first. Optimize second." },
      { category: "TypeScript", statement: "Types should remove ambiguity, not create ceremony." },
      { category: "APIs", statement: "Normalize inconsistency once instead of handling it everywhere." },
    ],
    // Each item renders with its category as the annotation-motif label underneath — PORTFOLIO.md §4.
  },

  signal: {
    sectionLabel: "04 / SIGNAL",
    question: "Did other people notice?",
    quotes: [
      {
        name: "Simon Dobretsov",
        provenance: "AHS — chief executive officer",
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
