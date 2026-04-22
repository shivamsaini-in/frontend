# Discipline App — Admin Dashboard Documentation

## Overview

The Discipline Admin Dashboard is a web-based management panel for the Discipline iOS app. It gives admins visibility into user accounts, discipline scores, screen time analytics, and platform health. Built with Next.js App Router and deployed on Netlify; communicates with the Node.js backend on Render.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn (Base UI) | 4.2.0 |
| Icons | Lucide React | 1.8.0 |
| Animations | Framer Motion | 12.38.0 |
| HTTP Client | Axios | 1.15.0 |
| Server State | TanStack React Query | 5.99.0 |
| Client State | Zustand | 5.0.12 |
| Forms | React Hook Form + Zod | 7.72.1 / 4.3.6 |
| Toasts | Sonner | 2.0.7 |
| Deployment | Netlify + @netlify/plugin-nextjs | — |

---

## Project Structure

```
admin-dashboard/
├── app/
│   ├── (auth)/login/              # Public login page
│   ├── (public)/                  # Landing page (public)
│   ├── dashboard/
│   │   ├── page.tsx               # Overview — stat cards + recent signups
│   │   ├── users/
│   │   │   ├── page.tsx           # User list with search + pagination
│   │   │   └── [id]/page.tsx      # User detail — KPIs + daily usage history
│   │   └── analytics/
│   │       └── page.tsx           # Platform-wide analytics
│   ├── components/
│   │   ├── layout/                # Sidebar, Navbar
│   │   ├── users/                 # UserTable, UserModal
│   │   ├── landing/               # Public landing sections
│   │   └── ui/                    # Shared UI primitives
│   ├── hooks/                     # React Query + Zustand hooks
│   ├── services/                  # Axios API calls
│   ├── store/                     # Zustand stores (auth, theme)
│   ├── types/                     # TypeScript interfaces
│   └── utils/                     # formatDate, errorParser
├── components/                    # Shared shadcn base components
├── lib/                           # Utility libraries
├── config/                        # App config + theme tokens
├── proxy.ts                       # Next.js middleware — route guard
├── .env.local                     # Environment variables
└── package.json
```

---

## Environment Variables

| Variable | Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://app-backend-60dd.onrender.com/api` | Backend API base URL |

Create `.env.local` at the project root with the above variable before running locally.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

---

## Authentication

### Login Flow

1. User submits email + password on `/login`
2. Zod schema validates inputs client-side
3. `POST /api/admin/login` — response returns `{ accessToken, refreshToken, admin }`
4. Token + admin stored in **Zustand** (persisted to `localStorage` key `auth-storage`)
5. Cookie `auth-token` set (SameSite=Lax) for server-side middleware access
6. Redirect to `/dashboard`

### Route Protection (`proxy.ts`)

Next.js middleware runs on every request:

- Public routes (`/`, `/login`) — accessible without auth
- `/dashboard/*` — requires valid `auth-token` cookie; redirects to `/login?from=[path]` if missing
- Visiting `/login` while authenticated redirects to `/dashboard`

### Token Injection

Every Axios request gets the JWT via a request interceptor in `app/services/api.ts`:

```
Authorization: Bearer <token from Zustand store>
```

On a `401` response the interceptor clears auth state and redirects to `/login`.

---

## Screens

### 1. Landing Page `/`
Public marketing page. Sections: Hero → Stats → Features → Showcase → Testimonials → CTA → Footer.

---

### 2. Login `/login`
Branded two-panel layout.
- Left panel: Ember-themed feature highlights and branding
- Right panel: email + password form, Zod validation, inline errors, loading state on submit

---

### 3. Dashboard Overview `/dashboard`
Default screen after login.

**Stat cards:** Total Users · Active Users · Inactive Users
**Recent Signups:** latest registrations with name, email, join date

**Data source:** `GET /api/admin/analytics`

---

### 4. Users `/dashboard/users`
Full user management. Visible to `SUPER_ADMIN` and `ADMIN`.

| Feature | Detail |
|---|---|
| Search | Debounced (400ms) by name or email |
| Pagination | 20 users per page |
| Row actions | Edit, Suspend/Activate, View Detail |
| Add User | Modal — creates account via `POST /api/admin/users` stub |
| Status badge | ACTIVE (green) · SUSPENDED (red) · DELETED (gray) |

**API calls:**
- `GET /api/admin/users?page=&limit=&search=&status=`
- `PATCH /api/admin/users/:id/status`

---

### 5. User Detail `/dashboard/users/:id`
Deep-dive view for a specific user.

**Header:** Name, email, plan badge (FREE / PRO / ELITE), status indicator

**KPI cards:**
| Card | Value |
|---|---|
| Discipline Score | Today's score (0–100) with level badge |
| Streak | Current daily streak |
| Avg Screen Time | 7-day rolling average |
| Last Active | Last usage log date |

**Score breakdown:** per-rule delta rows (+/−) with color pills

**Usage history:** paginated day cards — date, total minutes, top apps bar chart

**Data sources:**
- `GET /api/admin/users/:id`
- `GET /api/usage` (admin proxy)
- `GET /api/score/history`

---

### 6. Analytics `/dashboard/analytics`
Platform-wide statistics.

**Sections:**
- **Active Rate** — progress bar (active / total)
- **User Distribution** — total / active / new last 7 days
- **Mobile Usage** — total records, unique synced users, avg daily screen time
- **Score Distribution** — count of users at each level (ELITE / STRONG / RECOVER / RESET)
- **Top Apps** — ranked bar list of most-used apps across all users
- **Recent Signups** — latest registrations

**Data source:** `GET /api/admin/analytics`

---

## API Services

All calls go through the shared Axios client at `app/services/api.ts`.

| Service file | Endpoints used |
|---|---|
| `authService.ts` | `POST /admin/login` |
| `userService.ts` | `GET/PATCH /admin/users`, `GET /admin/users/:id` |
| `analyticsService.ts` | `GET /admin/analytics` |
| `scoreService.ts` | `GET /score/history` |
| `usageService.ts` | `GET /usage/weekly` |

---

## State Management

### Zustand Stores

| Store | Persisted key | Contents |
|---|---|---|
| `authStore` | `auth-storage` (localStorage) | `token`, `admin`, `isAuthenticated` |
| `themeStore` | `theme-preference` (localStorage) | `theme` — `light` / `dark` / `system` |

### React Query

| Hook | Cache key | Stale time |
|---|---|---|
| `useAdminAnalytics` | `admin-analytics` | 60s |
| `useUsers` | `admin-users, params` | 30s |
| `useUserDetail` | `admin-user, id` | 60s |
| `useScoreHistory` | `score-history, id` | 30s |

Config: 1 retry, no refetch on window focus.

---

## Role-Based Access

| Role | Dashboard | Users | Analytics |
|---|---|---|---|
| `SUPER_ADMIN` | Yes | Yes (full CRUD) | Yes |
| `ADMIN` | Yes | Yes (view + status) | Yes |

The sidebar conditionally renders nav items based on `admin.role` from the auth store. The backend enforces role checks independently — client-side hiding is UX only.

---

## Theme

The dashboard uses the **Ember design system** — tokens sourced from `config/theme.config.json`:

| Token | Value |
|---|---|
| Primary | `#FF4D1C` |
| Accent | `#FFAD0D` |
| Background | `#0D0D0F` |
| Card | `#141416` |
| Text Primary | `#F5F5F7` |
| Text Secondary | `#A0A0AB` |

Dark mode is the default. Users can toggle via the navbar theme switcher (stored in `themeStore`).

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Glassmorphism cards | Consistent with mobile app Ember theme |
| Dark mode default | Target users are power users; dark first |
| Skeleton loading | Preferred over spinners — layout stable during fetch |
| Debounced search | 400ms — avoids excessive API calls on keystroke |
| Cookie + localStorage dual auth | Cookie for server-side middleware, localStorage for Axios interceptor |
| React Query stale times | Analytics are soft-realtime — 30–60s stale is acceptable |

---

## Deployment

### Netlify
- Connect repo, set build command: `npm run build`, publish dir: `.next`
- Add `NEXT_PUBLIC_API_URL` in Netlify environment settings
- `@netlify/plugin-nextjs` handles SSR + edge middleware

### Local
```bash
npm run dev    # http://localhost:3000
```
