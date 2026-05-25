# LearnOS — Next-Gen Student Dashboard

A high-fidelity, animated student learning dashboard built with Next.js 14 (App Router), Supabase, Tailwind CSS, and Framer Motion.

---

## 🛠 Tech Stack

| Tool | Role |
|------|------|
| **Next.js 14** (App Router) | Framework, RSC, routing |
| **Supabase** | PostgreSQL DB + auth-ready client |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Spring-physics animations |
| **Lucide React** | Dynamic icon rendering |
| **TypeScript** | End-to-end type safety |

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-seed.sql`
3. Copy your project URL and anon key from **Settings → API**

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run

```bash
npm run dev
# → http://localhost:3000
```

---

## 🏗 Architecture

### Server / Client Component Split

The key architectural decision is where data fetching lives.

```
app/dashboard/page.tsx          ← Server Component
  └─ <Suspense fallback={...}>
       └─ CoursesLoader()       ← async Server Component — fetches from Supabase
            └─ <BentoGrid />    ← "use client" — animations, interactivity
                 ├─ <HeroTile />
                 ├─ <ActivityTile />
                 ├─ <StatsTile />
                 └─ <CourseCard /> × N
```

**Why this split?**

- `getCourses()` runs on the server — no API keys exposed to the browser, no client-side waterfalls.
- The `<Suspense>` boundary in `page.tsx` shows `<CoursesSkeleton />` while Supabase responds, giving instant perceived performance.
- All interactive/animated components are Client Components (`"use client"`) so Framer Motion and React state work normally.
- `app/dashboard/loading.tsx` provides the same skeleton for full-page navigations.

### Supabase Client

`lib/supabase-server.ts` uses `@supabase/ssr`'s `createServerClient`, which reads cookies from `next/headers`. This enables server-side Supabase calls that are compatible with Next.js caching and RSC.

---

## 🎨 Animation Strategy

All animations use **`transform` and `opacity` only** — no width/height/top/left changes — ensuring zero layout shifts (CLS = 0).

| Feature | Implementation |
|---------|----------------|
| Staggered tile entrance | `motion.div` with `containerVariants` + `staggerChildren: 0.08` |
| Card hover elevation | `whileHover={{ scale: 1.02 }}` with spring physics |
| Sidebar active pill | `layoutId="sidebar-active-pill"` for shared layout animation |
| Mobile nav active state | `layoutId="mobile-nav-pill"` |
| Progress bar fill | CSS transition on `width` (doesn't repaint layout, triggers once on mount) |
| Activity graph cells | Staggered `scale` + `opacity` entrance per cell |
| Streak dots | Staggered `scale` entrance |

Spring config used consistently: `{ type: "spring", stiffness: 300, damping: 20 }`

---

## 🗂 Folder Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Redirects → /dashboard
│   └── dashboard/
│       ├── layout.tsx          # Sidebar + main wrapper
│       ├── page.tsx            # RSC with Suspense
│       ├── loading.tsx         # Route-level skeleton
│       └── error.tsx           # Error boundary (client)
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx         # Collapsible nav (client)
│   │   ├── MobileNav.tsx       # Bottom tab bar (client)
│   │   ├── BentoGrid.tsx       # Staggered grid (client)
│   │   ├── HeroTile.tsx        # Greeting + streak
│   │   ├── CourseCard.tsx      # Dynamic course tile
│   │   ├── ActivityTile.tsx    # Contribution graph
│   │   └── StatsTile.tsx       # XP / streak stats
│   └── ui/
│       └── Skeletons.tsx       # Shimmer skeleton loaders
├── lib/
│   ├── supabase-server.ts      # SSR Supabase client
│   └── data.ts                 # getCourses() server function
├── types/
│   └── index.ts                # TypeScript interfaces
├── supabase-seed.sql           # DB schema + seed data
├── .env.example                # Required env vars
└── tailwind.config.ts
```

---

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js

---

## 🎯 Challenges & Solutions

**Challenge:** Dynamic Lucide icon rendering from a string field in the DB.  
**Solution:** Import `* as LucideIcons`, PascalCase-transform `icon_name`, and cast to `React.ElementType` with a `BookOpen` fallback.

**Challenge:** Progress bar animation without layout shift.  
**Solution:** Start width at `0%` via inline style, then set `width` to the DB value in a `useEffect` after mount. The CSS `transition` handles the animation, keeping it GPU-composited.

**Challenge:** Sidebar collapse keeping the active indicator pill in sync.  
**Solution:** Framer Motion's `layoutId` shares layout state across the icon-only and expanded states, animating the pill smoothly through both.
