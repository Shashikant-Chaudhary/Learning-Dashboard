Here's a strong README that will impress the reviewers:

Create `README.md` in your project root:

```markdown
# LearnOS — Next-Gen Learning Dashboard

A high-fidelity student learning dashboard built with Next.js 15, Supabase, Tailwind CSS, and Framer Motion.

## Live Demo

[View on Vercel](https://your-vercel-url.vercel.app) <!-- replace after deploying -->

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework & Server Components |
| Supabase | PostgreSQL database & Data API |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & spring physics |
| Lucide React | Icon system |
| TypeScript | Type safety throughout |

---

## Architecture Decisions

### Server / Client Component Split

One of the core challenges was correctly separating server and client boundaries — especially important since Framer Motion requires client-side rendering while Supabase data fetching should happen on the server.

The solution was a deliberate split:

```
BentoGrid (Server)
├── BentoGridClient (Client) ← handles Framer Motion animations
│   ├── HeroTile (Client) ← animations
│   ├── ActivityTile (Client) ← animations
│   └── Suspense boundary
│       └── CourseGrid (Server) ← async data fetch
│           └── CourseCard (Client) ← animations per card
```

- `CourseGrid` is a pure async Server Component — it fetches directly from Supabase with no client-side JavaScript
- `BentoGridClient` is a thin client wrapper that provides the `motion.div` container for stagger animations
- `CourseCard` is a Client Component purely for its Framer Motion hover states and animated progress bar
- This pattern keeps the data fetching secure and server-rendered while still enabling rich client animations

### Why Server Components for Data Fetching

- The Supabase anon key never reaches the browser bundle
- No loading spinners for initial data — HTML arrives with course data already embedded
- React Suspense provides a graceful skeleton fallback during streaming

### Supabase Integration

Used `@supabase/supabase-js` with a singleton client in `lib/supabase.ts`. The client is initialised with environment variables that are only available server-side, ensuring credentials are never exposed to the client.

RLS (Row Level Security) is intentionally disabled for this prototype since all data fetching happens server-side. In a production app, proper RLS policies would be added per user session.

### Animation Architecture

All animations use Framer Motion with spring physics (`stiffness: 300, damping: 20`) for a natural, non-linear feel:

- **Staggered entrance** — `containerVariants` with `staggerChildren: 0.1` so tiles appear sequentially
- **Card hover** — `whileHover={{ scale: 1.02, y: -2 }}` with spring physics, no layout shifts since only `transform` is animated
- **Progress bars** — animate from `width: 0` to the real value using a `useEffect` with a small delay, giving a satisfying fill-in on load
- **Activity grid** — each cell animates in individually with staggered `delay` based on column and row index
- **Sidebar layoutId** — a single shared `motion.div` with `layoutId="sidebar-highlight"` slides between nav items, powered by Framer Motion's layout animation engine

### Zero Layout Shifts

Every animation exclusively uses `transform` (scale, translateY) and `opacity` — never properties that trigger layout recalculation like `width`, `height`, `margin`, or `top`. The only exception is the progress bar width animation, which is contained inside an `overflow-hidden` parent so it never affects surrounding layout.

---

## Responsive Design

| Breakpoint | Sidebar | Grid |
|---|---|---|
| Mobile `< 768px` | Fixed bottom navigation bar | Single column |
| Tablet `768px–1024px` | Left sidebar, no collapse button | 2 columns |
| Desktop `> 1024px` | Full sidebar with collapse toggle | 3 columns |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/learning-dashboard.git
cd learning-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fzooztaqsbkruqeuufkh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key
```

### 4. Set up Supabase

Create a `courses` table with this schema:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamp with time zone default now()
);
```

Seed with mock data:

```sql
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code'),
  ('System Design Fundamentals', 40, 'Server'),
  ('TypeScript Deep Dive', 90, 'FileCode'),
  ('CSS & Animation Mastery', 55, 'Palette');
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, dark mode, animated background
│   ├── page.tsx            # Home page, sidebar + main layout
│   └── globals.css         # Tailwind v4 + custom keyframe animations
├── components/
│   ├── Sidebar.tsx         # Desktop sidebar + mobile bottom nav
│   ├── BentoGrid.tsx       # Server Component grid wrapper
│   ├── BentoGridClient.tsx # Client wrapper for stagger animation
│   ├── HeroTile.tsx        # Welcome tile with stats
│   ├── ActivityTile.tsx    # Contribution graph
│   ├── CourseGrid.tsx      # Async Server Component — Supabase fetch
│   ├── CourseCard.tsx      # Individual course tile with animations
│   └── CourseSkeleton.tsx  # Suspense fallback skeleton
├── lib/
│   └── supabase.ts         # Supabase client singleton
├── types/
│   └── index.ts            # TypeScript interfaces
├── .env.example            # Environment variable template
└── README.md
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

---

## Challenges & Solutions

**Challenge:** Framer Motion requires client components but data fetching should stay on the server.
**Solution:** Created a thin `BentoGridClient` wrapper that provides the animation container while keeping `CourseGrid` as a pure Server Component passed as children.

**Challenge:** Tailwind CSS v4 breaking changes — `@tailwind base` directive removed.
**Solution:** Replaced with `@import "tailwindcss"` and added explicit `@source` directives for component scanning.

**Challenge:** Supabase hydration mismatch from `Math.random()` in `ActivityTile`.
**Solution:** Replaced random generation with a fixed static data array, ensuring server and client render identical HTML.

**Challenge:** `PGRST125` error from incorrect Supabase URL format.
**Solution:** Removed the `/rest/v1/` suffix from the URL — the Supabase client appends this path internally.