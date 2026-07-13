# BudgetFlow

A modern budget and expense management platform that helps you create budgets, track expenses, visualize spending habits, and stay on top of your personal finances — through a clean, responsive dashboard.

![BudgetFlow](https://img.shields.io/badge/status-ready--to--deploy-059669) ![Next.js](https://img.shields.io/badge/Next.js-15-000000) ![TypeScript](https://img.shields.io/badge/TypeScript-5-2563eb)

---

## Overview

BudgetFlow lets a signed-in user:

- Create multiple **budgets** (e.g. Groceries, Rent, Travel), each with a name, spending limit, icon, and color
- Log **expenses** against a budget with a title, amount, category, optional note, and date
- See a **dashboard** with total budget, total spent, remaining balance, this month's spending, and number of active budgets
- Visualize spending with a **category pie chart** and a **monthly bar chart**
- **Search, filter, and sort** every transaction
- Review a **recent activity feed** logging every create/update/delete action
- Toggle **light/dark mode**, with the preference persisted across sessions
- Use the app fully responsively on desktop, tablet, and mobile

Every budget and expense is scoped to the signed-in user — the app checks ownership on every read, update, and delete, so no one can see or touch another user's data.

---

## Features

- 🔐 **Authentication** — Clerk (sign up, log in, log out, protected `/dashboard` routes)
- 💰 **Budget CRUD** — create, edit, delete, with icon + color pickers
- 🧾 **Expense CRUD** — create, edit, delete, with category, note, and date
- 📊 **Analytics** — category breakdown pie chart, monthly spending bar chart, budget utilization
- 🔍 **Search & filters** — by title/note, budget, category; sort by newest, oldest, highest, lowest
- 🕓 **Activity log** — automatic entries for every budget/expense action
- 🌗 **Light & dark mode** — persisted via `next-themes`
- 📱 **Fully responsive** — sidebar collapses to a mobile drawer, tables collapse to cards
- ✅ **Validated forms** — Zod schemas with inline error messages
- 🛡️ **Ownership checks** — every server action verifies the resource belongs to the caller
- 💀 **Skeleton loading states** and **empty states** throughout
- 🔔 **Toast notifications** for every create/update/delete action

---

## Tech Stack

| Layer          | Choice                                    |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 15 (App Router, Turbopack)         |
| Language       | TypeScript                                 |
| Styling        | Tailwind CSS v4                            |
| UI primitives  | Radix UI (hand-built shadcn-style components) |
| Icons          | Lucide React                               |
| Animation      | Framer Motion                              |
| Charts         | Recharts                                   |
| Backend        | Next.js Server Actions                     |
| Database       | PostgreSQL via [Neon](https://neon.tech)   |
| ORM            | Drizzle ORM                                |
| Auth           | [Clerk](https://clerk.com)                 |
| Validation     | Zod                                        |
| Deployment     | [Vercel](https://vercel.com)               |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your accounts (all free tiers, no card required)

- **Neon** — [neon.tech](https://neon.tech) → New Project → copy the pooled connection string
- **Clerk** — [dashboard.clerk.com](https://dashboard.clerk.com) → New Application → copy the publishable + secret keys

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your real values:

```bash
cp .env.example .env.local
```

See [Environment Variables](#environment-variables) below for what each one does.

### 4. Push the database schema

```bash
npm run db:push
```

This creates the `users`, `budgets`, `expenses`, and `activity_log` tables in your Neon database from `src/db/schema.ts`.

### 5. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Sign up, and you're in.

---

## Environment Variables

All variables live in `.env.local` (never committed — see `.env.example` for the template).

| Variable | Where to get it |
| --- | --- |
| `DATABASE_URL` | Neon dashboard → your project → **Connection Details** → "Pooled connection" |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → your app → **API Keys** |
| `CLERK_SECRET_KEY` | Clerk dashboard → your app → **API Keys** |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Set to `/sign-in` (already configured) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Set to `/sign-up` (already configured) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` | Set to `/dashboard` (already configured) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | Set to `/dashboard` (already configured) |
| `CLERK_WEBHOOK_SECRET` | *(optional)* Clerk dashboard → **Webhooks** → create an endpoint pointing at `/api/webhooks/clerk`, subscribe to `user.created`, `user.updated`, `user.deleted` |

> The app also lazily creates a user row on first dashboard visit (see `src/lib/auth.ts`), so the webhook is a nice-to-have for instant sync, not a hard requirement.

---

## Database Setup

The schema lives in `src/db/schema.ts` and is managed by Drizzle Kit.

```bash
npm run db:generate   # generate a SQL migration from schema changes
npm run db:push       # push the schema directly to your Neon database (fastest for dev)
npm run db:studio     # open Drizzle Studio to browse your data visually
```

**Tables:**

- `users` — `id`, `clerkId`, `email`, `name`, `createdAt`
- `budgets` — `id`, `userId`, `name`, `amount`, `icon`, `color`, `createdAt`
- `expenses` — `id`, `budgetId`, `userId`, `title`, `amount`, `category`, `note`, `date`, `createdAt`
- `activityLog` — `id`, `userId`, `action`, `description`, `timestamp`

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Add the same environment variables from `.env.local` in the Vercel project's **Settings → Environment Variables**
4. Deploy — Vercel auto-builds and gives you a live URL
5. In Clerk, add your Vercel domain to **Allowed Origins** if prompted
6. *(Optional)* Point a Clerk webhook at `https://your-domain.vercel.app/api/webhooks/clerk`

Every push to your main branch will auto-redeploy.

---

## Folder Structure

```
src/
├── app/
│   ├── (auth)/sign-in, sign-up      # Clerk auth pages
│   ├── actions/                     # Server actions (budgets.ts, expenses.ts)
│   ├── api/webhooks/clerk/          # Clerk → DB sync webhook
│   ├── dashboard/                   # Protected app (layout, page, budgets, expenses, settings)
│   ├── layout.tsx                   # Root layout (fonts, ClerkProvider, ThemeProvider)
│   ├── page.tsx                     # Public landing page
│   └── globals.css                  # Design tokens (light/dark theme)
├── components/
│   ├── ui/                          # Reusable primitives (button, card, dialog, select, ...)
│   ├── dashboard/                   # Sidebar, topbar, charts, activity feed, summary cards
│   ├── budgets/                     # Budget card, form dialog, new-budget button
│   ├── expenses/                    # Expenses table, form dialog, new-expense button
│   └── landing/                     # Hero, features, testimonials, FAQ, footer
├── db/
│   ├── schema.ts                    # Drizzle schema
│   └── index.ts                     # DB client
├── lib/
│   ├── auth.ts                      # getCurrentUser() — session + lazy user sync
│   ├── queries.ts                   # Read queries (dashboard summary, analytics, etc.)
│   ├── validations.ts               # Zod schemas
│   ├── categories.ts                # Category + icon/color constants
│   └── utils.ts                     # cn(), formatCurrency(), formatDate()
└── middleware.ts                    # Clerk route protection
```

---

## Security Notes

- Every server action (`src/app/actions/*.ts`) re-derives the current user from the Clerk session — it never trusts a `userId` passed from the client.
- Every read/update/delete query filters by `userId` (or checks the parent budget's `userId` before attaching an expense to it), so one user can never read or mutate another user's rows.
- `/dashboard/*` routes are protected at the middleware level via `clerkMiddleware` + `createRouteMatcher`.

---

## Future Improvements

- CSV / PDF export of expenses
- Recurring expenses and budget rollover
- Multi-currency support
- Shared/family budgets with invited members
- Push/email notifications when a budget crosses a threshold
- Optimistic UI updates for instant feedback before the server responds

---

## Screenshots

> Add screenshots here after your first deploy:
>
> - `docs/screenshot-landing.png` — Landing page
> - `docs/screenshot-dashboard.png` — Dashboard overview
> - `docs/screenshot-budgets.png` — Budgets grid
> - `docs/screenshot-expenses.png` — Expenses table with filters


---

## License

Built as a portfolio project. Free to use and adapt.
