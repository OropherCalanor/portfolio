# portfolio-website

## Overview

`portfolio-website` is the recruiter-facing hub of my portfolio ecosystem. It presents my technical identity, connects my Spring Boot and React projects into one coherent system, and makes it easier for recruiters and hiring teams to understand what each project proves.

The first version focuses on a strong React foundation with a polished homepage, project listing, project detail page structure, and a technical notes section.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Framer Motion

## Features

- recruiter-focused homepage
- reusable global layout
- project showcase driven by structured content data
- project detail / case study page pattern
- blog / notes list and detail page pattern
- responsive UI foundation

## Routes

- `/`
- `/projects`
- `/projects/:slug`
- `/blog`
- `/blog/:slug`

## Architecture

The app is organized around:

- `components` for reusable UI and layout
- `pages` for route screens
- `data` for static portfolio content
- `types` for shared content contracts
- `app/router.tsx` for route configuration

This structure keeps the website easy to scale as more repos, screenshots, and case studies are added.

## Installation

### Prerequisites

- Node.js 24+
- npm 11+

### Run locally

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
```

## Current Status

This first implementation slice includes:

- app scaffold and routing
- shared layout
- homepage section structure
- project, skill, and blog content models
- responsive portfolio pages

## What I Learned

- how to structure a portfolio as a scalable content system
- how to translate roadmap planning into React routes and reusable components
- how to keep technical presentation recruiter-friendly without making the UI feel generic

## Future Improvements

- add real screenshots and richer case studies
- add route-level SEO metadata
- add final CV asset and real LinkedIn link
- add GitHub API integration for live project metadata
- add deployed project links as the ecosystem grows

## Author

- Name: Bulent Ruhat Karatas
- GitHub: [OropherCalanor](https://github.com/OropherCalanor)
