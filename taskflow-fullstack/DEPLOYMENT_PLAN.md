# TaskFlow Deployment Plan

## Goal

Deploy `taskflow-fullstack` in the simplest recruiter-friendly way with the lowest ongoing cost.

## Recommended Stack

### Frontend

- Platform: `Vercel`
- Why: the React/Vite frontend is static-friendly, fast to deploy, and a custom domain can be attached easily.
- Note: because this is a React Router SPA, a `vercel.json` rewrite is included so deep links like `/projects/123` do not 404 on refresh.

### Backend

- Platform: `Render Web Service`
- Why: Spring Boot can run as a normal web service without changing the app structure.
- Note: a ready `render.yaml` blueprint is included at [render.yaml](/Users/ruhatkaratas/Documents/Portfolio%20Website/taskflow-fullstack/render.yaml:1).

### Database

- Platform: `Supabase Postgres`
- Why: it gives a real hosted Postgres database and is more practical for a continuing portfolio demo than a temporary free database.

## Why This Combination

- `Vercel` is a very easy fit for the frontend.
- `Render` is one of the simplest ways to host a Spring Boot backend publicly.
- `Supabase` gives a persistent Postgres database on the free plan, while free Render Postgres databases expire after 30 days.

## Important Reality Check

This setup is good for a portfolio demo, but not for production.

As of `May 27, 2026`, the main limitations are:

- `Vercel Hobby` is free for personal projects.
- `Render Free Web Services` spin down after inactivity and have monthly free usage limits.
- `Render Free Postgres` databases expire after 30 days, which is why they are not the recommended database for this project.
- `Supabase Free` projects pause after inactivity, so the first request after a long gap may feel slow.

## Environment Variables

### Backend

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `APP_PORT`
- `JWT_SECRET`
- `JWT_ACCESS_TOKEN_EXPIRATION_MS`
- `JWT_REFRESH_TOKEN_EXPIRATION_MS`
- `CORS_ALLOWED_ORIGINS`
- `APP_DEMO_SEED`

### Frontend

- `VITE_API_BASE_URL`

## Recommended Deployment Flow

1. Create a hosted Postgres database in `Supabase`.
2. Put the database host, port, db name, username, and password into the backend environment variables on `Render`.
3. Set a long random `JWT_SECRET` on `Render`.
4. Deploy the backend from `taskflow-fullstack/backend`.
5. Copy the backend public URL.
6. Set `VITE_API_BASE_URL` in the frontend deployment to that backend URL.
7. Add the frontend public domain to backend `CORS_ALLOWED_ORIGINS`.
8. If you want a ready-made recruiter demo workspace, set `APP_DEMO_SEED=true` for the first launch.
9. Deploy the frontend from `taskflow-fullstack/frontend`.
10. Verify:
   - register
   - login
   - create project
   - create task
   - drag and drop board flow

## Render Backend Settings

- Runtime: `Docker` or `Java`
- Root directory: `taskflow-fullstack/backend`
- Port: `10000` on Render side is normal, but the app should bind using the provided `PORT` or `APP_PORT` value

If you use Render Blueprint setup, point it to:

- `taskflow-fullstack/render.yaml`

Recommended env mapping:

- `APP_PORT` = `10000`
- `DB_HOST` = Supabase host
- `DB_PORT` = Supabase port
- `DB_NAME` = Supabase database name
- `DB_USERNAME` = Supabase username
- `DB_PASSWORD` = Supabase password
- `JWT_SECRET` = strong random value
- `CORS_ALLOWED_ORIGINS` = frontend domain list
- `APP_DEMO_SEED` = `true` for the first seeded launch, then optionally `false` after the demo workspace is created

## Vercel Frontend Settings

- Framework preset: `Vite`
- Root directory: `taskflow-fullstack/frontend`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite file: `taskflow-fullstack/frontend/vercel.json`

Frontend env:

- `VITE_API_BASE_URL=https://your-taskflow-backend.onrender.com`

## Final Portfolio Requirement

Before marking TaskFlow as fully portfolio-ready, the deployed app should have:

- a stable demo account
- at least one project with realistic seeded data
- a short README deployment section
- a live demo link added to the portfolio website

## Demo Seed Accounts

If `APP_DEMO_SEED=true`, the backend creates a recruiter-friendly workspace automatically:

- `demo.owner@taskflow.dev` / `Password1`
- `demo.teammate@taskflow.dev` / `Password1`
- `demo.reviewer@taskflow.dev` / `Password1`

It also creates:

- one seeded project: `TaskFlow Portfolio Launch`
- seeded project members
- multiple tasks across `TODO`, `IN_PROGRESS`, `IN_REVIEW`, and `DONE`

This is useful for portfolio demos because the dashboard and board are not empty on first login.

## Official References

- Vercel Hobby Plan: https://vercel.com/docs/accounts/plans/hobby
- Vercel Pricing: https://vercel.com/pricing
- Vite on Vercel and SPA rewrites: https://examples.vercel.com/docs/frameworks/vite
- Render Free Deploy Docs: https://render.com/free
- Render Web Services Docs: https://render.com/docs/web-services/
- Render First Deploy Docs: https://render.com/docs/your-first-deploy
- Render Blueprint Spec: https://render.com/docs/blueprint-spec
- Supabase Pricing: https://supabase.com/pricing
