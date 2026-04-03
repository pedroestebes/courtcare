# CourtCare — Product Roadmap

**AI-Powered Injury Prevention for Padel**
*Last updated: April 2026*

---

## Vision

CourtCare uses real-time pose detection to help padel players prevent injuries, improve technique, and recover properly — all through a phone camera, no wearables needed. Our protocols are informed by peer-reviewed sports medicine research.

---

## Status Legend

| Status | Meaning |
|--------|---------|
| **DONE** | Built, tested, and deployed |
| **IN PROGRESS** | Currently being built |
| **NEXT** | Planned for next sprint |
| **FUTURE** | Post-funding roadmap |

---

## Current Product (v1.0) — DONE

### 3-Pillar Architecture
| Pillar | Activities | Description |
|--------|-----------|-------------|
| Prevention | 4 warm-ups | Dynamic warm-ups based on RAMP protocol (Jeffreys 2007) and FIFA 11+ |
| Performance | 4 padel drills | Ready position, forehand volley, backhand volley, bandeja |
| Recovery | 4 cool-down stretches | Static stretches per ACSM guidelines (15-30s holds, 2-4 reps) |

### Core Technology
| Feature | Status | Details |
|---------|--------|---------|
| Real-time pose detection | **DONE** | MediaPipe Tasks Vision, 33 landmarks, 30fps, browser-based |
| Joint angle extraction | **DONE** | 15 angles: shoulders, elbows, knees, hips, ankles, torso, wrists |
| Drill scoring engine | **DONE** | Weighted, phase-based, constraint matching |
| Live instruction guidance | **DONE** | 8-second instruction cycling with phase detection during sessions |
| Countdown overlay | **DONE** | Shows drill type, name, and first instructions before session starts |

### Injury Prevention Engine
| Feature | Status | Scientific Basis |
|---------|--------|-----------------|
| 12 injury thresholds (shoulder, elbow, knee, ankle) | **DONE** | Elliott 2006 (BJSM), Bern Consensus 2022, NATA 2018, Rivera 2017 |
| Real-time injury risk scoring (0-100 per frame) | **DONE** | Per-threshold ramp functions with sport-specific limits |
| Fatigue detection (form degradation tracking) | **DONE** | Baseline vs. recent score comparison |
| Auto-pause on danger (>70% risk) | **DONE** | Pauses session, flags as unsafe |
| Ankle sprain detection | **DONE** | Inversion angle <70° and dorsiflexion >160° (Rivera 2017, PMC5737043) |

### "I Just Played" Recovery Wizard
| Feature | Status | Details |
|---------|--------|---------|
| 4-step adaptive flow | **DONE** | Intensity → Duration → Pain areas → Personalized plan |
| Evidence-based recommendations | **DONE** | Maps pain + intensity to ACSM-guided stretches |
| Skip option for pain-free users | **DONE** | "Skip — I feel fine" advances to recovery plan |

### Science & Transparency Page
| Feature | Status | Details |
|---------|--------|---------|
| /science page | **DONE** | Full research backing with 15 peer-reviewed citations |
| "What we say vs. don't claim" | **DONE** | Transparent honesty section (unique differentiator) |
| Medical disclaimer | **DONE** | "Not a medical device" — clear and prominent |
| Evidence badges in UI | **DONE** | DrillLibrary, Recovery, Landing all cite research |
| Hero credibility signal | **DONE** | "Informed by 15+ peer-reviewed studies" above the fold |

### Session Persistence
| Feature | Status | Details |
|---------|--------|---------|
| localStorage session history | **DONE** | Saves drill, score, duration, reps, safety status |
| Real data on Dashboard | **DONE** | Stats computed from actual sessions, demo fallback |
| Real data on SessionHistory | **DONE** | Empty state when no sessions; refreshes on navigation |

### Pages & UX
| Feature | Status | Details |
|---------|--------|---------|
| Landing page (dark glassmorphism) | **DONE** | Hero, features, injury cards, science stats, testimonials, CTA |
| Drill Library (3-pillar tabs) | **DONE** | Prevention / Performance / Recovery with evidence badge |
| Drill Detail page | **DONE** | Instructions, joint monitoring, constraints |
| Live Session page | **DONE** | Camera feed, skeleton overlay, scoring, danger alerts, instructions |
| Session Review | **DONE** | Score summary, form analysis, AI insights |
| Dashboard (health overview) | **DONE** | Body map, readiness score, stats, progress chart, coach chat |
| Session History | **DONE** | All past sessions with safe/risk status |
| Pricing page | **DONE** | Free / Premium / Club tiers |
| Science page | **DONE** | Full research transparency |
| Recovery wizard | **DONE** | Post-match adaptive cool-down |
| Demo mode | **DONE** | One-click "Try Demo" login for investors |

### Infrastructure
| Feature | Status | Details |
|---------|--------|---------|
| Cloudflare Pages (frontend) | **DONE** | courtcare-web.pages.dev |
| Cloudflare Workers (API) | **DONE** | D1 database, edge deployment |
| Vite 6 + React 19 + TypeScript 5.7 | **DONE** | Modern stack, fast builds |
| Tailwind CSS 4 | **DONE** | Dark theme throughout |
| Cost to run | **$0** | Cloudflare free tier |

---

## Phase 2 — NEXT (Pre-Funding, Weeks 1-4)

> Items that will make or break investor confidence. Build before fundraising meetings.

### Validation & Proof
| Feature | Priority | Notes |
|---------|----------|-------|
| 10 real beta users with data | **NEXT** | Real testimonials replace demo data |
| Session recording & video replay | **NEXT** | Store short clips for session review |
| Accuracy measurement system | **NEXT** | "CourtCare detected X with Y% accuracy" |
| Before/after comparison video | **NEXT** | Real player improvement showcased |

### Product Depth
| Feature | Priority | Notes |
|---------|----------|-------|
| AI Coach powered by Claude API | **NEXT** | Replace pre-built chat responses with real AI using session context |
| Audio coaching cues | **NEXT** | Spoken instructions during sessions ("Bend your knees more") |
| Personalized warm-up generator | **NEXT** | Based on body map data, suggest pre-session exercises |
| Proprioceptive balance drill | **NEXT** | Single-leg stance exercise (Rivera 2017: 43% ankle sprain reduction) |

### Business Model
| Feature | Priority | Notes |
|---------|----------|-------|
| Stripe payment integration | **NEXT** | Monthly ($9.99) and annual ($79.99) plans |
| Free tier enforcement | **NEXT** | 3 sessions/week free, paywall for more |

---

## Phase 3 — Post-Funding (Months 2-4)

### Distribution & Growth
| Feature | Priority | Notes |
|---------|----------|-------|
| React Native mobile app (iOS + Android) | **FUTURE** | Better camera, push notifications, native performance |
| Club partnership portal | **FUTURE** | B2B2C: clubs install CourtCare for members |
| Coach dashboard | **FUTURE** | Coaches see all athletes' body maps and sessions |
| Multi-language (PT, EN, ES) | **FUTURE** | Key markets: Portugal, Spain, Latin America |
| Referral system | **FUTURE** | "Invite a friend, get 1 month free" |

### Product Enhancement
| Feature | Priority | Notes |
|---------|----------|-------|
| Video reference overlay | **FUTURE** | Show ideal form side-by-side during training |
| Historical body map timeline | **FUTURE** | Slider showing body status evolution over weeks |
| Injury risk prediction (7-day) | **FUTURE** | "Based on your pattern, knee risk will increase by Thursday" |
| Custom drill creator | **FUTURE** | Coaches create drills with custom angle constraints |
| Offline mode | **FUTURE** | Download drills, work without internet (pose detection is client-side) |
| Wearable integration (Apple Health/Google Fit) | **FUTURE** | HR, sleep, steps → combine with pose data for holistic readiness |

### Data & Analytics
| Feature | Priority | Notes |
|---------|----------|-------|
| Weekly health report (email) | **FUTURE** | "Your body this week" engagement driver |
| Export health data (PDF) | **FUTURE** | For physiotherapists and doctors |
| Aggregate anonymized analytics | **FUTURE** | "85% of CourtCare users have safer shoulders" — marketing |

---

## Phase 4 — Scale (Months 5-12)

### Sports Expansion
| Feature | Notes |
|---------|-------|
| Pickleball drills | Fastest growing sport globally — TAM expansion |
| Golf swing analysis | Huge market, high willingness to pay |
| Running gait analysis | Runner's knee, shin splints prevention |

### AI & Machine Learning
| Feature | Notes |
|---------|-------|
| Custom ML model (beyond MediaPipe) | Sport-specific pose refinement |
| AI-generated training programs | Full periodization based on body data |
| Voice-first coaching | "How was that shot?" → AI responds with audio |

### Platform & Partnerships
| Feature | Notes |
|---------|-------|
| Federation integration (FPP/FIP) | Partnership with padel federations |
| Insurance B2B2C (Sword Health model) | Insurers pay for injury prevention |
| Clinical validation study | Partner with university sports science department |
| White-label for sports brands | License the engine to racket manufacturers |
| API for third-party integrations | Let other apps read CourtCare health data |

---

## Key Metrics

| Metric | Current | Target (3 months) | Target (12 months) |
|--------|---------|-------------------|---------------------|
| Sports supported | 1 (Padel) | 1 (focused) | 3 (+ pickleball, golf) |
| Total activities | 12 | 16 | 40+ |
| Beta users | 0 | 100 | 10,000 |
| Monthly active users | 0 | 500 | 50,000 |
| Revenue | $0 | $0 (free beta) | $50K MRR |
| Club partnerships | 0 | 5 | 50+ |
| Scientific citations backing | 15 | 20+ | 30+ (with own clinical study) |

---

## Investment Ask

| Round | Amount | Use of Funds |
|-------|--------|-------------|
| Pre-seed | €150-250K | Beta launch, 3 hires (iOS dev, sports scientist, BD), 6 months runway |
| Seed | €1-2M | Native app, clinical validation, sport expansion, 50 club partnerships |

---

## Competitive Advantage

1. **Evidence-based**: 15+ peer-reviewed citations backing our protocols (FIFA 11+, ACSM, Bern Consensus)
2. **Transparent**: Public "What we say vs. what we don't claim" page — builds trust
3. **Zero hardware**: Camera-only, no wearables needed (MediaPipe validated at r=0.91 vs. gold-standard)
4. **Padel-first**: Purpose-built for the fastest-growing racket sport (85% injury prevalence, Jansen 2023)
5. **Free to run**: Cloudflare free tier — $0 infrastructure cost during beta

---

*CourtCare — Preventing injuries before they happen.*
*© 2026 CourtCare*
