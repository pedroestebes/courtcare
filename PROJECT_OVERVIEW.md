# CourtCare — Project Overview

**AI-Powered Sports Coach for Court Sports** | Real-time pose tracking and form analysis to improve technique and prevent injuries. Starting with padel.

---

## 1. What Is CourtCare?

CourtCare is a digital health and sports performance platform inspired by [Sword Health](https://swordhealth.com/) — but applied to sports. Using the phone's camera and AI-powered pose estimation, athletes get **real-time visual feedback** on their form, technique, and movement patterns to improve their game and prevent injuries.

The app uses **skeleton tracking** (MediaPipe Pose) to overlay body landmarks on the camera feed, analyze joint angles, and compare them against ideal form for each sport-specific movement. Athletes see live if they're doing the right movements — just like having a personal coach watching them.

---

## 2. How We Got Here — Decision Process

### Initial Brainstorming
We explored 6 sports app ideas before settling on the final concept:

1. **League Manager** — Create and manage amateur sports leagues (teams, fixtures, standings)
2. **Workout Planner** — Plan, track, and share workouts with analytics
3. **Live Scoring App** — Real-time scorekeeping for local events
4. **Sports Betting Tracker** — Track bets, calculate ROI
5. **Pickup Games Finder** — Connect players for casual meetups
6. **Athlete Portfolio** — Athletes showcase stats and highlights

The user chose to explore something new, inspired by **Sword Health** — applying their motion-tracking + AI feedback model to sports training rather than physical therapy.

### Why a Separate Project (Not Part of JabToJab)
JabToJab is a boxing club management SaaS (members, invoices, classes, check-ins, finances). CourtCare is fundamentally different:
- Different product (AI pose analysis vs. club management CRUD)
- Different tech needs (real-time camera + ML vs. standard SaaS)
- Different target audience (individual athletes vs. gym owners)
- Only the monorepo structure and auth patterns could be reused — not worth the coupling

**Decision:** Separate repository at https://github.com/pedroestebes/courtcare

### Feasibility Analysis — What Can Be Built

**What's achievable with current technology:**
- Using **existing pose estimation libraries** (Google's MediaPipe, TensorFlow.js) — these run directly in the browser, no special hardware needed
- **Form analysis logic** — calculating joint angles, comparing user's pose against ideal positions, detecting reps
- **Real-time feedback engine** — coaching cues based on angle thresholds
- Full **web app** — UI, exercise library, session tracking, progress dashboard
- **Skeleton overlay** on camera feed (like Sword Health's image)

**What's NOT feasible / out of scope:**
- Building underlying ML models from scratch (MediaPipe/PoseNet are built by Google with massive datasets — we use them as libraries)
- Sword Health's **proprietary wearable sensors** accuracy — we use camera-only, which is less precise but still very capable
- **Clinical-grade medical accuracy** — requires FDA certification, clinical trials
- The underlying pose detection library handles the ML heavy lifting; our value is the **sport-specific analysis layer on top** — knowing what good form looks like for each padel shot

---

## 3. Inspiration — Sword Health

Sword Health is a digital health platform that combines AI with clinical expertise for physical therapy. Key learnings:

- **What they do:** Remote physical therapy using FDA-listed motion-tracking wearable sensors + mobile app
- **Key programs:** Thrive (pain/PT), Move (injury prevention), Bloom (pelvic health), Mind (mental fitness)
- **How it works:** Motion-tracking technology captures real-time data, provides feedback on movement form
- **Results:** 67% of members with moderate-to-severe pain become pain-free
- **Scale:** 600,000+ members, 10,000+ employers/health plans, 3 continents
- **Validation:** Proved that motion tracking + AI feedback works for health outcomes

**Our angle:** Sword Health validated the model for rehab — CourtCare applies the same concept to **sports performance and injury prevention**. No one owns this space yet.

---

## 4. Why Padel First?

- **Fastest-growing sport** in Europe and Latin America
- **Technique-heavy** — proper form matters (volleys, bandeja, vibora, smash, wall play)
- **Injury-prone** — shoulder, elbow, and knee injuries common from bad mechanics
- **Underserved market** — no dominant AI coach app for padel
- **Repeatable movements** — strokes are consistent enough for pose analysis
- **Target market alignment** — Portugal/Spain are padel hotspots

### Key Padel Movements to Analyze (MVP)
1. **Ready Position** (beginner) — feet shoulder-width, knees bent, racket up
2. **Forehand Volley** (beginner) — arm position, step forward, contact point
3. **Backhand Volley** (beginner) — compact swing, wrist firm, body rotation
4. **Bandeja** (intermediate) — overhead defensive shot, controlled swing
5. **Vibora** (advanced) — overhead with spin/wrist action
6. **Smash** (intermediate) — full overhead power shot, arm extension

### Future Sports Expansion
Tennis, pickleball, squash, boxing, golf, basketball shooting form, yoga, running gait, etc.

---

## 5. Naming Research

### Requirements
- Connects to health/care/wellness domain (like Sword Health)
- Professional, brandable, international
- Available (no existing app or major company with the name)

### Names Researched & Status

| Name | Available? | Conflict Found |
|------|-----------|----------------|
| KineoHealth | No | Kineo Fitness app + Kineo USA rehab equipment |
| MoveRx | No | MoveRX Omaha physical therapy practice |
| VitalMove | No | HRV app + fitness platform + product store |
| MoveWell | No | Established app + sports medicine clinic |
| FormVita | Yes | No direct match (Fortvita exists in biotech, different) |
| BodySync | No | Existing fitness app + DNA fitness company |
| PadelCare | Yes | No matches found |
| SportsCare | No | Physical therapy chain (70+ locations) + Baylor Scott & White |
| FormCare | No | Form Health app exists |
| MoveCare | No | Existing fitness app on Google Play |
| MotionCare | No | Physical therapy clinic in Minnesota |
| ActiveCare | No | Physical therapy chains in NYC & SF |
| PlayCare | No | Existing MLM health company |
| SwingCare | No | swing.care — fibromyalgia virtual clinic |
| **CourtCare** | **Yes** | Only courthouse childcare programs (unrelated) |
| StrideCare | No | stridecare.com + stridecare.health both taken |
| CareForm | No | HealthX Technologies platform + Amazon brand |
| FlowCare | Partial | Small studio scheduling app exists |
| CourtCare | Yes | No conflicts in sports/health/tech space |

### Final Decision: **CourtCare**
- Clean, professional, memorable
- "Court" = court sports (padel, tennis, pickleball, squash) — room to grow
- "Care" = health, wellness, injury prevention — positions in health/life science domain
- No existing app or company with this name in sports/health/tech
- Domain-friendly: courtcare.com potential available

---

## 6. Core Concept

### How It Works (User Experience)
1. **Pick a drill** — choose from sport-specific exercises (e.g., padel bandeja)
2. **Set up your camera** — prop phone to capture full-body side/front view
3. **Get real-time feedback** — AI overlays skeleton on your body, scores your form, gives live coaching cues ("raise your elbow", "bend knees more")
4. **Review & improve** — see session scores, track progress over time

### What Makes It Unique
- **Camera-only** — no wearable sensors needed (unlike Sword Health), just a phone
- **Sport-specific** — not generic fitness, but tailored to court sport techniques
- **Real-time visual feedback** — skeleton overlay + live coaching cues
- **Injury prevention** — flags dangerous form patterns before they cause injury
- **Progress tracking** — form scores over time, weak area identification

---

## 7. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + TypeScript (Vite) | Fast, modern, great ecosystem |
| Pose Detection | MediaPipe Pose (in-browser) | Google's library, runs at 30fps, free, no server costs |
| Styling | Tailwind CSS | Rapid UI development |
| State (client) | Zustand | Lightweight, perfect for real-time session state |
| Server State | TanStack React Query | Data fetching, caching |
| Charts | Recharts | Progress visualization |
| Backend | Hono.js (Node.js) | Lightweight, TypeScript-native, fast |
| Database | SQLite + Drizzle ORM | Simple for MVP, upgradeable to PostgreSQL |
| Auth | JWT (jose) + Argon2 | Secure, industry standard |
| Validation | Zod | Shared schemas between frontend and backend |
| Monorepo | pnpm workspaces + Turborepo | Organized, fast builds |

### Why MediaPipe Pose in the Browser (Not Server-Side)?
- **Zero latency** — no round-trip to a server for every frame
- **Works offline** after initial model load
- **No GPU server costs** — processing happens on the user's device
- **Privacy** — video never leaves the device
- MediaPipe Pose Landmarker runs at **30fps on modern phones** via WASM + WebGL

---

## 8. Architecture

### Project Structure
```
courtcare/
├── apps/
│   ├── web/              # React + Vite frontend
│   │   └── src/
│   │       ├── pages/         # 9 pages (Landing, Auth, Dashboard, Drills, Session, History)
│   │       ├── components/    # UI primitives, layout, camera, pose feedback
│   │       ├── hooks/         # useCamera, usePoseDetection, useFormAnalysis, useAuth
│   │       ├── engine/        # Core pose analysis (pure TypeScript, no React)
│   │       │   ├── mediapipe.ts    # MediaPipe initialization
│   │       │   ├── angles.ts       # Joint angle calculations
│   │       │   ├── scoring.ts      # Score normalization & smoothing
│   │       │   ├── feedback.ts     # Human-readable coaching cues
│   │       │   └── drills/         # Sport-specific drill definitions
│   │       ├── stores/        # Zustand (auth, session state)
│   │       ├── lib/           # API client, utilities
│   │       └── types/         # TypeScript type definitions
│   │
│   └── api/              # Hono.js backend
│       └── src/
│           ├── db/            # Drizzle schema, client, seed, migrations
│           ├── routes/        # auth, drills, sessions
│           ├── middleware/     # JWT auth, CORS
│           └── lib/           # JWT helpers, password hashing
│
└── packages/
    └── shared/           # Shared types + Zod validators
```

### Pose Analysis Pipeline (Per Frame)
```
Camera frame
  → MediaPipe Pose (WASM, runs in browser)
  → 33 NormalizedLandmarks (x, y, z, visibility)
  → angles.ts: compute joint angles (elbow, shoulder, wrist, knee, hip, trunk rotation)
  → drill-specific evaluator (e.g., bandeja.ts):
       - defines "ideal" angle ranges per phase (preparation, swing, contact, follow-through)
       - compares current angles to ideal ranges
       - returns per-joint scores + aggregate score + feedback strings
  → scoring.ts: normalize to 0-100, apply temporal smoothing (rolling average)
  → feedback.ts: priority-rank feedback cues, throttle to avoid spamming
```

### Database Schema
| Table | Purpose |
|-------|---------|
| users | id, email, passwordHash, displayName, createdAt |
| drills | id, slug, name, sport, category, difficulty, description, instructions, referenceAngles |
| sessions | id, userId, drillId, startedAt, endedAt, overallScore, durationSeconds |
| sessionFrames | id, sessionId, timestampMs, landmarks, scores, feedback |

---

## 9. MVP Features (Built)

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, how it works, CTA |
| Login | `/login` | Email/password auth |
| Register | `/register` | Account creation |
| Dashboard | `/dashboard` | Stats, progress chart, recent sessions |
| Drill Library | `/drills` | Grid of 6 padel drills |
| Drill Detail | `/drills/:slug` | Drill info, instructions, start button |
| Live Session | `/session/:slug` | Camera + skeleton + scoring + feedback |
| Session History | `/history` | Past sessions list |
| Session Review | `/history/:id` | Detailed session review |

### API Endpoints
| Route | Method | Description |
|-------|--------|-------------|
| `/auth/register` | POST | Create account |
| `/auth/login` | POST | Login, get JWT |
| `/auth/me` | GET | Current user info |
| `/drills` | GET | List all drills |
| `/drills/:slug` | GET | Get drill by slug |
| `/sessions` | POST | Start a new session |
| `/sessions` | GET | List user's sessions |
| `/sessions/:id` | GET | Session detail with frames |
| `/sessions/:id/complete` | PATCH | Complete session, save results |

---

## 10. Future Roadmap

| Feature | Priority | Notes |
|---------|----------|-------|
| More padel drills | High | Wall play, lob, chiquita, serve variations |
| Video reference overlay | High | Show ideal form side-by-side |
| AI coaching chat | High | Claude-powered technique advice |
| Tennis support | Medium | Serve, forehand, backhand, volley |
| Pickleball support | Medium | Growing market |
| Social features | Medium | Share sessions, challenges, leaderboards |
| Coach portal | Medium | Coaches review athlete sessions remotely |
| Wearable integration | Low | Apple Watch, Garmin for HR/motion data |
| Mobile app (React Native) | Low | Native camera performance |
| Offline mode | Low | Architecture supports it (client-side analysis) |
| Multi-language (PT/EN/ES) | Low | Key markets are Portugal, Spain, Latin America |
| Subscription/payments | Low | Freemium model |

---

## 11. Competitive Landscape

No direct competitor combines **real-time pose tracking + sport-specific form analysis** for court sports:

| Competitor | What They Do | Gap |
|-----------|-------------|-----|
| Sword Health | PT/rehab with sensors | Not sports training |
| Onform | Video analysis (async, coach reviews) | Not real-time, no AI feedback |
| SwingVision | Tennis ball tracking | Not body pose analysis |
| Playtomic | Court booking & community | No training/coaching |
| HomeCourt | Basketball shot tracking | Limited to basketball |

**CourtCare's unique position:** Real-time, camera-based, AI-powered form coaching for court sports — starting with padel.

---

## 12. Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Pose detection | MediaPipe (browser) | Free, 30fps on phones, no server GPU costs, privacy |
| No wearable sensors | Camera-only | Lower barrier to entry, no hardware costs |
| Analysis in browser | Client-side | Zero latency, works offline, no processing costs |
| SQLite for MVP | Upgrade later | Simpler dev, Drizzle supports PostgreSQL migration |
| Monorepo | pnpm + Turborepo | Organized, shared code, fast builds |
| Frame sampling | 1-2fps stored | Full 30fps in memory, downsample for persistence |

---

## 13. Repository

- **GitHub:** https://github.com/pedroestebes/courtcare
- **Development branch:** `claude/new-sports-project-oHz1I` (in jabtojab repo, to be migrated)

---

*Last updated: March 2026*
