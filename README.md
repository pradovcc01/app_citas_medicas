# MediCitas — Portal del Paciente

A patient-facing medical appointment portal built with React, TypeScript, and Tailwind CSS. All authentication and appointment data is served from in-memory mocks — no backend server is required to run the app locally.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Main Features](#2-main-features)
3. [Project Structure](#3-project-structure)
4. [Prerequisites](#4-prerequisites)
5. [Installation](#5-installation)
6. [Environment Configuration](#6-environment-configuration)
7. [How to Run the Project](#7-how-to-run-the-project)
8. [How to Run Tests](#8-how-to-run-tests)
9. [Build / Production](#9-build--production)
10. [Troubleshooting](#10-troubleshooting)
11. [Development Workflow](#11-development-workflow)
12. [Important Notes](#12-important-notes)

---

## 1. Project Overview

**MediCitas** is a frontend application that lets patients log in, view their medical appointments, and schedule new ones. It is designed as a single-page application (SPA) with a responsive layout suitable for desktop and mobile screens.

### What it does

- Provides a login screen for patient authentication
- Shows a dashboard with appointment statistics and status breakdown
- Lists existing appointments with visual status badges
- Allows patients to create new appointments by selecting a doctor, date, time, and reason

### Problem it solves

The project demonstrates a complete patient portal flow — authentication, protected routes, data fetching, and form submission — without requiring a real backend. It is useful for prototyping UI/UX, validating frontend architecture (feature-based folders, reusable hooks, TanStack Query), and onboarding developers to the codebase before connecting a real API.

### Data source

All data is mock-based:

- Users, doctors, and seed appointments live in `src/mocks/data/`
- Reads and writes are handled by `src/mocks/db/mockDb.ts`
- Sessions are stored in the browser's `sessionStorage` under the key `medicitas_session`

There is **no external database or REST API** in this repository.

---

## 2. Main Features

| Feature | Description |
|---------|-------------|
| **Patient login** | Email/password authentication against mock users |
| **Protected routes** | Unauthenticated users are redirected to `/login` |
| **Session persistence** | Login session stored in `sessionStorage` for the browser tab |
| **Dashboard summary** | KPI cards for total, pending, confirmed, and completed appointments |
| **Next appointment** | Highlights the nearest upcoming appointment |
| **Appointment list** | Displays all patient appointments with doctor, date, time, reason, and location |
| **Status badges** | Visual states: `pendiente`, `confirmada`, `cancelada`, `completada` |
| **Create appointment** | Form to book a new appointment with a selected doctor |
| **Responsive UI** | Layout adapts from mobile to desktop using Tailwind CSS |
| **Demo credentials** | Built-in test user and a one-click “fill credentials” button on the login screen |

### Application routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Redirects to `/dashboard` | Public (redirects based on auth) |
| `/login` | Login page | Public |
| `/dashboard` | Patient dashboard | Requires login |
| `*` (any other path) | Redirects to `/dashboard` | Public (redirects based on auth) |

---

## 3. Project Structure

```
app_citas_medicas/
├── docs/
│   └── ARCHITECTURE.md      # Wireframes, mock API map, and data models
├── public/
│   └── favicon.svg
├── src/
│   ├── app/                 # Application shell
│   │   ├── providers.tsx    # QueryClient + React Router providers
│   │   └── routes.tsx       # Route definitions
│   ├── features/            # Feature-based modules
│   │   ├── auth/            # Login, session, auth API
│   │   ├── appointments/    # Appointments list, create form, hooks, API
│   │   └── dashboard/       # Patient dashboard layout and stats
│   ├── shared/              # Cross-feature reusable code
│   │   ├── components/ui/   # Button, Input, Card, Spinner, EmptyState
│   │   └── lib/             # queryClient, cn utility
│   ├── mocks/
│   │   ├── data/            # Seed users, doctors, appointments
│   │   └── db/              # mockDb — in-memory store + mock API logic
│   ├── types/               # Shared TypeScript interfaces
│   ├── test/                # Vitest setup and tests
│   ├── App.tsx              # Root component
│   ├── main.tsx             # React entry point
│   └── index.css            # Tailwind CSS entry
├── index.html               # HTML shell
├── vite.config.ts           # Vite, Vitest, Tailwind, path alias (@/)
├── tsconfig.json            # TypeScript project references
├── tsconfig.app.json        # App TypeScript config
├── tsconfig.node.json       # Node/build tool TypeScript config
└── package.json             # Scripts and dependencies
```

### Major components and responsibilities

| Area | Responsibility |
|------|----------------|
| `src/app/providers.tsx` | Wraps the app with TanStack Query and React Router |
| `src/app/routes.tsx` | Defines `/login`, `/dashboard`, and redirects |
| `src/features/auth/` | Login form, `useAuth`, `useLogin`, `useLogout`, `authApi` |
| `src/features/appointments/` | Appointment UI, queries/mutations, `appointmentsApi` |
| `src/features/dashboard/` | Dashboard layout, stats cards, next appointment panel |
| `src/shared/components/ui/` | Reusable presentational UI components |
| `src/mocks/db/mockDb.ts` | Central mock database (login, CRUD, stats, delays) |
| `src/types/index.ts` | Shared types: `User`, `Appointment`, `Doctor`, `AuthSession`, etc. |
| `docs/ARCHITECTURE.md` | Extended architecture reference (wireframes, API table, models) |

### Path alias

Imports use the `@/` alias, mapped to `src/` in `vite.config.ts` and `tsconfig.app.json`.

Example: `import { useAuth } from '@/features/auth/hooks/useAuth'`

---

## 4. Prerequisites

The following tools are required. Versions below come from `package.json` and the project lockfile; **no `engines` field is defined in `package.json`**, so use a current LTS release of Node.js compatible with Vite 8.

| Tool | Required | Notes |
|------|----------|-------|
| **Node.js** | Yes | Needed to run Vite, TypeScript, and Vitest |
| **npm** | Yes | Used by all scripts in `package.json` |
| **Modern browser** | Yes | For local development and testing the UI |

### Key dependency versions (from `package.json`)

| Package | Version |
|---------|---------|
| react | ^19.2.8 |
| react-dom | ^19.2.8 |
| react-router-dom | ^7.18.2 |
| @tanstack/react-query | ^5.101.4 |
| tailwindcss | ^4.3.3 |
| typescript | ~6.0.2 |
| vite | ^8.2.0 |
| vitest | ^4.1.10 |

### Not required

- Docker (no `Dockerfile` in the repository)
- Python / `requirements.txt` (not used)
- External database
- `.env` file (see [Environment Configuration](#6-environment-configuration))

---

## 5. Installation

### 1. Clone or download the repository

```bash
git clone <repository-url>
cd app_citas_medicas
```

If you already have the project folder locally, navigate into it:

```bash
cd app_citas_medicas
```

### 2. Install dependencies

```bash
npm install
```

This installs all dependencies and devDependencies listed in `package.json` and resolves versions from `package-lock.json`.

### 3. Verify installation (optional)

```bash
npm run build
```

A successful run produces a `dist/` folder with production assets.

---

## 6. Environment Configuration

**No environment variables are required** to run this project.

Verified facts from the codebase:

- There are **no `.env`, `.env.local`, or similar files** in the repository
- Source code does **not** reference `process.env` or `import.meta.env`
- Authentication and data are fully mock-driven via `src/mocks/`

You do **not** need to create a `.env` file to start development or run tests.

### Demo login credentials (mock data only)

These credentials exist in `src/mocks/data/index.ts` for local development and testing. They are **not** production secrets — they only work against the in-memory mock.

| Field | Value |
|-------|-------|
| Email | `paciente@test.com` |
| Password | `Test123!` |
| Display name | María González |

The login page also includes a **“Usar credenciales de prueba”** button that auto-fills these values.

---

## 7. How to Run the Project

### Start the development server

```bash
npm run dev
```

This runs `vite` (see `package.json` → `"dev": "vite"`).

### What to expect

1. Vite compiles the app and prints a local URL in the terminal, for example:

   ```
   VITE v8.2.1  ready in XXX ms

   ➜  Local:   http://localhost:5173/
   ```

2. Open the printed URL in your browser.

3. **Default port:** Vite uses port **5173** by default. If that port is already in use, Vite automatically tries the next available port (e.g. `5174`). Always use the URL shown in your terminal.

4. Visiting `/` redirects to `/dashboard`. If you are not logged in, you will be sent to `/login`.

5. Log in with the demo credentials above (or click the demo button on the login form).

6. After login, you should see the patient dashboard with appointment stats, the appointment list, and the option to create a new appointment.

### Preview the production build locally

After running `npm run build`:

```bash
npm run preview
```

This serves the contents of `dist/` using Vite's preview server. Check the terminal output for the exact URL and port.

---

## 8. How to Run Tests

### Testing framework

| Tool | Role |
|------|------|
| **Vitest** (^4.1.10) | Test runner |
| **jsdom** (^29.1.1) | Browser-like environment for tests |
| **Setup file** | `src/test/setup.ts` — mocks `sessionStorage` for each test |

Configuration lives in `vite.config.ts` under the `test` block.

### Run all tests once

```bash
npm run test
```

This executes `vitest run` and exits when finished.

### Run tests in watch mode

```bash
npm run test:watch
```

This executes `vitest` and re-runs tests when files change.

### Run a specific test file

```bash
npx vitest run src/test/mockApi.test.ts
```

### What is tested

All tests are in `src/test/mockApi.test.ts` and cover the mock API layer (`mockDb`):

| Suite | Tests |
|-------|-------|
| Mock API — Autenticación | Successful login, failed login, logout |
| Mock API — Citas | List appointments, create appointment, dashboard stats |
| Flujo integrado | Login followed by appointment creation |

### Interpreting results

**Success** — terminal output similar to:

```
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

**Failure** — Vitest prints the failing test name, file, and assertion details. Fix the issue in the corresponding source or test file and re-run `npm run test`.

> **Note:** Tests simulate API delays (400–600 ms), so the full suite may take several seconds to complete.

---

## 9. Build / Production

### Create a production build

```bash
npm run build
```

This runs:

1. `tsc -b` — TypeScript type-checking across project references
2. `vite build` — bundles the app into `dist/`

### Output

| Path | Description |
|------|-------------|
| `dist/index.html` | Entry HTML file |
| `dist/assets/*.js` | Bundled JavaScript |
| `dist/assets/*.css` | Compiled Tailwind/CSS assets |

### Serve the build locally

```bash
npm run preview
```

Use this to verify the production bundle before deployment.

### Lint (optional)

```bash
npm run lint
```

Runs **oxlint** (^1.75.0) as defined in `package.json`. No separate oxlint config file is present in the repository.

---

## 10. Troubleshooting

### `npm install` fails

- Confirm Node.js and npm are installed: `node -v` and `npm -v`
- Delete `node_modules` and reinstall:

  ```bash
  rm -rf node_modules
  npm install
  ```

  On Windows PowerShell:

  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  ```

### Port already in use

If you see `Port 5173 is in use, trying another one...`, Vite will pick another port automatically. Open the URL printed in the terminal — do not assume it is always `5173`.

To free port 5173, stop the other process using it, or configure a fixed port in `vite.config.ts` (not currently set in this project).

### Login fails with valid-looking credentials

- Use the exact demo email and password from [Environment Configuration](#6-environment-configuration)
- Credentials are case-sensitive for the password (`Test123!`)
- The mock only accepts users defined in `src/mocks/data/index.ts`

### Dashboard shows no data after login

- Ensure you logged in as the patient test user (`paciente@test.com`), not the doctor mock user
- Seed appointments in `src/mocks/data/index.ts` are linked to patient id `usr-001`

### Session lost after refreshing

- Sessions are stored in `sessionStorage`, which persists for the browser tab but is cleared when the tab is closed
- Logging out removes the session explicitly

### `npm run build` TypeScript errors

- Run the build command and read the reported file/line
- Common issues: unused imports/variables (`noUnusedLocals` is enabled in `tsconfig.app.json`)

### Tests fail with session-related errors

- Tests rely on `src/test/setup.ts` to mock `sessionStorage`
- Run the full suite with `npm run test`, not isolated imports outside Vitest

### Path alias `@/` not resolving in the editor

- The alias is configured in `vite.config.ts` and `tsconfig.app.json`
- Restart the TypeScript language service or your IDE if imports show false errors

---

## 11. Development Workflow

Recommended flow for making changes:

1. **Start the dev server**

   ```bash
   npm run dev
   ```

2. **Make changes** in the appropriate feature folder under `src/features/` or shared UI under `src/shared/`

3. **Update mock data** (if needed) in `src/mocks/data/` or logic in `src/mocks/db/mockDb.ts`

4. **Run tests**

   ```bash
   npm run test
   ```

5. **Lint** (optional)

   ```bash
   npm run lint
   ```

6. **Verify production build**

   ```bash
   npm run build
   npm run preview
   ```

### Where to add new functionality

| Change type | Location |
|-------------|----------|
| New page/route | `src/app/routes.tsx` + feature `pages/` |
| New API call (mock) | `src/mocks/db/mockDb.ts` + feature `api/` |
| New UI in a feature | `src/features/<feature>/components/` |
| Reusable UI | `src/shared/components/ui/` |
| Shared types | `src/types/index.ts` |
| Query/mutation hooks | `src/features/<feature>/hooks/` |

For wireframes, mock API endpoints, and data model details, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 12. Important Notes

- **Mock-only backend:** This is a frontend prototype. Replacing mocks with a real API will require changes to `src/features/*/api/` and removing or bypassing `mockDb`.
- **No real security:** Passwords are stored in plain text in mock data for demonstration. Do not use this auth approach in production.
- **In-memory appointment writes:** New appointments created during a session are kept in memory inside `mockDb`. Reloading the page resets appointment data to the seed in `src/mocks/data/index.ts`, except the auth session which lives in `sessionStorage`.
- **Spanish UI:** User-facing labels and messages are in Spanish.
- **State management:** Server/async state uses **TanStack Query** (`@tanstack/react-query`). Local form state uses React `useState`.
- **Module type:** The project uses ES modules (`"type": "module"` in `package.json`).
- **Git:** The repository includes a `.gitignore` that excludes `node_modules`, `dist`, log files, and `*.local` env files.

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run oxlint |

| Demo login | Value |
|------------|-------|
| Email | `paciente@test.com` |
| Password | `Test123!` |
