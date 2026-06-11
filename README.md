# 🌿 ZenTask

**A minimalist task management app where your productivity grows like a plant.**

ZenTask is a full-stack SaaS application built with a calm, plant-themed UI. Tasks move through a kanban board — and as they progress from To Do to Done, they visually bloom from a seedling 🌱 into a flower 🌸. Your overall completion is shown as a live-growing plant on the dashboard.

---

## ✨ Features

- 🌱 **Plant growth metaphor** — every task grows through Sprouting → Growing → Bloomed
- 🌸 **Animated dashboard** — a live SVG garden plant that reflects your overall progress
- 📋 **Kanban board** — drag tasks across To Do, In Progress, and Done columns
- 🔐 **Auth** — email/password and Google OAuth via Supabase
- 🍃 **Animated login/signup** — floating leaves drift up the decorative panel
- 📅 **Task details** — title, description, priority (Low/Medium/High), due date
- ⚡ **Server Actions** — instant mutations with no loading spinners
- 📱 **Responsive** — works on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Framework | Next.js 15 (App Router + TypeScript)  |
| Auth     | Supabase Auth (email + Google OAuth)    |
| Database | Supabase PostgreSQL + Row Level Security|
| Styling  | Tailwind CSS v3 + Poppins               |
| UI       | Radix UI, Lucide React, Sonner          |
| Deploy   | Vercel                                  |

---

## 📂 Project Structure

```
ZenTask/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page with floating leaf animation
│   │   └── signup/         # Signup page
│   ├── api/auth/callback/  # Supabase OAuth callback
│   ├── dashboard/          # Protected kanban board + garden hero
│   ├── actions.ts          # Server Actions (create/update/delete tasks)
│   ├── globals.css         # Tailwind + custom animation keyframes
│   └── layout.tsx
├── components/
│   ├── garden-hero.tsx     # Animated SVG plant showing overall progress
│   ├── task-board.tsx      # Kanban board with 3 columns
│   ├── task-card.tsx       # Individual task card with plant indicator
│   ├── task-form.tsx       # Create/edit task modal (Radix UI Dialog)
│   └── navbar.tsx
├── lib/supabase/           # Browser + server Supabase clients
├── middleware.ts           # Auth protection for /dashboard
├── supabase/schema.sql     # Database schema + RLS policies
└── types/index.ts          # Task, TaskStatus, TaskPriority types
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/dvdivicay/ZenTask.git
cd ZenTask
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. To enable Google OAuth: **Authentication → Providers → Google** — paste your Google Client ID and Secret

### 4. Configure environment variables

Copy the template and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Your keys are in Supabase → **Project Settings → API**.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ☁️ Deploy to Vercel

1. Push the repo to GitHub
2. Import it at [vercel.com](https://vercel.com/new)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
4. Deploy — done

---

## 👨‍💻 Developer

Built by **Jay** — a computer engineering student passionate about clean, focused, and user-centered web apps.

---

## 📄 License

Licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Free to use, modify, and distribute under the same terms.
