# Project Blueprint: portfolio-website

## Goal

Build a polished, recruiter-facing developer portfolio website that presents your technical identity, highlights your Spring Boot and React project ecosystem, and makes it easy for recruiters to understand what you build and why you are a strong fit for Java, React, and Fullstack roles.

## Portfolio Purpose

This project is your professional front door.

It should not feel like a generic landing page or a template clone.

It should feel like a deliberate developer brand experience that answers these recruiter questions quickly:

- who is this developer
- what stack does he focus on
- what projects prove those skills
- can he explain architecture and outcomes clearly
- does his work look professional and production-minded

## What This Project Must Prove

- React and TypeScript fluency
- clean component structure
- responsive UI implementation
- strong content hierarchy
- practical UI/UX awareness
- personal branding and communication skill
- ability to present technical work in a recruiter-friendly way
- ability to connect GitHub repos, live demos, and case studies into one system

## Recommended Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- optional GitHub API integration
- Vercel deployment

## Primary Audience

### Recruiters

Need fast clarity on:

- role fit
- stack fit
- project quality
- professionalism

### Hiring managers / technical interviewers

Need:

- better project detail
- architecture explanations
- GitHub links
- proof of engineering depth

### Other developers

May want:

- repository links
- implementation notes
- blog posts
- case studies

## Core Brand Positioning

Use a clear and consistent positioning line such as:

`Fullstack Developer | Java Spring Boot | React | PostgreSQL | AI-assisted Development`

This line should appear in:

- hero section
- metadata / SEO text
- GitHub profile alignment
- CV / downloadable resume alignment

## Product Scope

This website should include:

- home page
- about section
- skills section
- projects showcase
- project detail or case study pages
- blog / notes section
- contact section
- CV download link
- GitHub and live demo links

## Information Architecture

### Home

Purpose:

- introduce you quickly
- establish technical direction
- guide users toward projects and contact

Suggested sections:

- hero
- short value proposition
- featured projects
- tech focus highlights
- mini about summary
- call to action

### About

Purpose:

- tell your story in a professional, concise way
- explain your current focus and goals

Suggested sections:

- short biography
- engineering interests
- preferred stack
- working style
- what you are building now

### Skills

Purpose:

- organize your stack clearly
- avoid a random logo cloud

Suggested categories:

- Backend
- Frontend
- Database
- DevOps / Tooling
- Documentation / Workflow
- AI-assisted development

### Projects

Purpose:

- show the project ecosystem as a coherent system
- make each project easy to scan

Suggested content per card:

- project name
- one-line summary
- stack tags
- what it proves
- GitHub link
- live demo link if available
- case study link

### GitHub Showcase

Purpose:

- reinforce code credibility
- surface pinned repositories and contribution mindset

Possible content:

- selected repos
- contribution / commit philosophy
- repository quality standards
- documentation focus

### Blog / Notes

Purpose:

- show communication skill
- show reflective learning

Suggested early topics:

- Building REST APIs with Spring Boot
- Spring Security and JWT explained
- PostgreSQL relational design notes
- Docker Compose with Spring Boot and PostgreSQL
- How I use AI tools in my development workflow

### Contact

Purpose:

- remove friction for recruiters

Suggested content:

- email
- GitHub
- LinkedIn
- CV download
- short call to action

## Page Strategy

### Recommended initial structure

For version 1, use a hybrid structure:

- single polished landing page for fast scanning
- separate routes for project detail and blog posts

Recommended routes:

- `/`
- `/projects`
- `/projects/:slug`
- `/blog`
- `/blog/:slug`

This gives you both simplicity and room to grow.

## Design Direction

The site should feel:

- professional
- modern
- intentional
- technical without being cold

Avoid:

- generic template look
- overcrowded gradients
- over-animated sections
- too many badges or logos
- vague marketing language

Suggested visual direction:

- strong editorial typography
- clean spacing
- subtle motion
- warm neutral or muted industrial color palette
- one accent color used consistently

## Content Strategy

The content should emphasize:

- real project outcomes
- engineering focus
- clarity over hype
- practical product thinking

Use language like:

- “Built to demonstrate...”
- “This project focuses on...”
- “What this project proves...”
- “Key engineering decisions...”

Avoid weak phrases like:

- “I am passionate about coding”
- “I love solving problems”
- “Welcome to my portfolio”

unless backed by something concrete right after.

## Project Card Data Model

Use a structured model like:

```ts
type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  stack: string[];
  category: "backend" | "fullstack" | "frontend" | "ai";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  status: "planned" | "in-progress" | "completed";
  whatItProves: string[];
  image?: string;
};
```

This helps the portfolio stay data-driven and easy to scale.

## Blog Post Data Model

Use a lightweight model like:

```ts
type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
};
```

## Case Study Structure

Each project case study page should include:

1. Problem
2. Solution
3. Key Features
4. Tech Stack
5. Architecture
6. Database Design
7. Screenshots
8. What I Learned
9. Future Improvements
10. GitHub Link
11. Live Demo Link

## Recommended File Structure

```text
portfolio-website/
├── public/
│   ├── cv/
│   └── images/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── projects/
│   │   └── blog/
│   ├── content/
│   │   ├── projects/
│   │   └── blog/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── types/
│   └── main.tsx
├── README.md
└── package.json
```

## Recommended Components

### Layout

- `Navbar`
- `Footer`
- `SectionHeading`
- `Container`

### Home page

- `HeroSection`
- `FeaturedProjectsSection`
- `SkillsPreviewSection`
- `AboutPreviewSection`
- `ContactCtaSection`

### Projects

- `ProjectCard`
- `ProjectTagList`
- `ProjectGrid`
- `ProjectCaseStudyLayout`

### Blog

- `BlogCard`
- `BlogList`
- `BlogTag`

### Shared UI

- `Button`
- `Badge`
- `Pill`
- `LinkButton`

## State Management

This project should stay simple.

Use:

- static local data first
- React state only where needed

Do not add global state management unless there is a real need.

## Content Sourcing Strategy

For version 1, prefer local static content:

- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/social-links.ts`
- `src/content/blog/*.md` later if needed

Optional later additions:

- GitHub API for pinned repository metadata
- MDX-based blog content

## SEO / Metadata Plan

Include:

- title and description per route
- Open Graph metadata
- clean favicon / social preview later

Suggested homepage metadata direction:

- title: `Bulent Ruhat Karatas | Fullstack Developer`
- description: `Portfolio of a Fullstack Developer focused on Java, Spring Boot, React, PostgreSQL, and AI-assisted development.`

## Deployment Plan

Use:

- Vercel for the portfolio website

Deployment expectations:

- production build passes cleanly
- mobile layout verified
- links verified
- downloadable CV works

## Accessibility and UX Expectations

- semantic sections
- keyboard-friendly nav
- adequate color contrast
- visible hover / focus states
- clear CTA buttons
- responsive layout across mobile and desktop

## Version 1 Scope

The first version should include:

- polished homepage
- project listing
- at least one project detail page pattern
- blog list placeholder or starter section
- contact links
- CV download link
- responsive layout

Do not wait to launch until every project is finished.

## Version 2 Scope

After the first deployment, add:

- full case study pages
- live GitHub showcase integration
- blog post detail pages
- screenshots and richer media
- motion polish

## Deliverables

The portfolio repository should eventually include:

- React + TypeScript application
- Tailwind setup
- clean folder structure
- reusable data-driven project model
- README
- deployment instructions
- screenshots

## First Implementation Slice

The first code slice should do only this:

1. scaffold the React + TypeScript + Tailwind project
2. create the base route structure
3. build the global layout
4. create the home page section skeleton
5. add project and skills data models
6. create placeholder content for existing repos

## Success Criteria

The first version is successful if:

- the homepage clearly states your technical positioning
- the UI already feels professional on mobile and desktop
- recruiters can understand your stack and main projects in under one minute
- the site is structured to grow with case studies and blog posts
- the project itself becomes a strong React portfolio piece
