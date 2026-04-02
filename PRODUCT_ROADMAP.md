# CourtCare — Product Roadmap & Backlog

**AI-Powered Injury Prevention for Court Sports**
*Last updated: March 2026*

---

## Status Legend

| Status | Meaning |
|--------|---------|
| **DONE** | Built, tested, and deployed |
| **MUST HAVE** | Critical for fundraising round — blocks investor confidence |
| **SHOULD HAVE** | Important for product-market fit — needed within 3 months |
| **NICE TO HAVE** | Enhances the product — can be deferred to post-funding |

---

## Current State

| Metric | Value |
|--------|-------|
| Sports supported | 2 (Padel, Tennis) |
| Total drills | 9 (6 padel + 3 tennis) |
| Injury risk factors tracked | 12 |
| Body zones monitored | 9 joints |
| Platform | Web (Cloudflare Workers + Pages) |
| Database | Cloudflare D1 |
| Cost to run | $0 (free tier) |

---

## Phase 1 — DONE (Current MVP)

### Core Platform
| Feature | Status | Notes |
|---------|--------|-------|
| Real-time pose detection (MediaPipe, 33 landmarks) | **DONE** | Browser-based, 30fps |
| Skeleton overlay on camera feed | **DONE** | Live visualization |
| Joint angle extraction (13 angles) | **DONE** | 3D vector math |
| Drill scoring engine | **DONE** | Weighted, phase-based |
| Feedback system (5 types) | **DONE** | correction, encouragement, info, warning, danger |

### Injury Prevention Engine
| Feature | Status | Notes |
|---------|--------|-------|
| 12 padel-specific injury thresholds | **DONE** | Shoulder, elbow, knee, spine, hip |
| Real-time injury risk assessment | **DONE** | Per-frame, 0-100 score |
| Fatigue detection (form degradation) | **DONE** | Baseline vs recent comparison |
| Danger alerts (visual + feedback) | **DONE** | Priority over form corrections |
| Safety margins on all drills | **DONE** | 7-15° from injury thresholds |

### Health Dashboard
| Feature | Status | Notes |
|---------|--------|-------|
| Body health map (interactive SVG) | **DONE** | 9 clickable joints, dark glassmorphism |
| Play readiness score (0-100) | **DONE** | Green/amber/red verdict |
| Play readiness system | **DONE** | "Play" / "Caution 10 days" / "Rest 1 month" |
| Progress tracker (before/after) | **DONE** | 14-day comparison with % changes |
| AI Coaching Chat | **DONE** | Pre-built smart responses, 5 topics |
| Form score vs injury risk chart | **DONE** | 15-day dual-line chart |

### Multi-Sport
| Feature | Status | Notes |
|---------|--------|-------|
| Padel drills (6) | **DONE** | Ready position, volleys, bandeja, vibora, smash |
| Tennis drills (3) | **DONE** | Serve, forehand, backhand |

### Auth & Infrastructure
| Feature | Status | Notes |
|---------|--------|-------|
| User registration & login (JWT) | **DONE** | PBKDF2 password hashing |
| Cloudflare Workers API | **DONE** | D1 database, edge deployment |
| Cloudflare Pages frontend | **DONE** | Vite + React + Tailwind |
| Demo mode (investor preview) | **DONE** | One-click login, 14 sessions of data |

### Design
| Feature | Status | Notes |
|---------|--------|-------|
| Dark glassmorphism UI (all pages) | **DONE** | WHOOP-inspired premium feel |
| Animated phone mockup (landing) | **DONE** | Skeleton + coaching cues |
| Custom favicon (shield + checkmark) | **DONE** | Brand icon |
| Quick start guide page | **DONE** | Journey timeline format |

---

## Phase 2 — MUST HAVE (Pre-Funding, Next 4 Weeks)

> These are the items that will make or break investor confidence. Build before fundraising meetings.

### Validation & Proof
| Feature | Priority | Notes |
|---------|----------|-------|
| Accuracy measurement system | **MUST HAVE** | Show "CourtCare detected X with Y% accuracy" — investors need proof |
| 10 real beta users with data | **MUST HAVE** | Real user testimonials, not just demo data |
| Side-by-side comparison video | **MUST HAVE** | Record a before/after of a real player using CourtCare |
| Landing page testimonials section | **MUST HAVE** | Even 3-5 quotes from beta users |
| Session recording & video replay | **MUST HAVE** | Store short clips, replay in session review |

### Product Depth
| Feature | Priority | Notes |
|---------|----------|-------|
| Pickleball drills (3-4) | **MUST HAVE** | Fastest growing sport globally — investors love TAM expansion |
| Wearable data integration (Apple Health / Google Fit) | **MUST HAVE** | Read steps, HR, sleep — combine with pose data for holistic readiness |
| AI Coach powered by Claude API | **MUST HAVE** | Replace pre-built responses with real AI using session data context |
| Push to stop (auto-pause on danger) | **MUST HAVE** | If injury risk > 70%, auto-pause session and recommend stopping |
| Personalized warm-up generator | **MUST HAVE** | Based on body map, suggest specific stretches before training |

### Business Model
| Feature | Priority | Notes |
|---------|----------|-------|
| Subscription paywall design | **MUST HAVE** | Free: 3 sessions/week. Premium: unlimited + AI coach + history |
| Stripe payment integration | **MUST HAVE** | Monthly ($9.99) and annual ($79.99) plans |
| Pricing page | **MUST HAVE** | Free vs Premium comparison |

---

## Phase 3 — SHOULD HAVE (Post-Funding, Months 2-4)

> Important for product-market fit and retention. Build once you have initial funding.

### Distribution & Growth
| Feature | Priority | Notes |
|---------|----------|-------|
| Club partnership portal | **SHOULD HAVE** | Clubs install CourtCare for their members — B2B2C model |
| Coach dashboard | **SHOULD HAVE** | Coaches see all their athletes' body maps and session data |
| Federation integration (FPB/ITF) | **SHOULD HAVE** | Partnership with padel/tennis federations for credibility |
| Referral system | **SHOULD HAVE** | "Invite a friend, get 1 month free" |
| Social sharing (session results) | **SHOULD HAVE** | Share body status and scores on Instagram/WhatsApp |

### Product Enhancement
| Feature | Priority | Notes |
|---------|----------|-------|
| Video reference overlay | **SHOULD HAVE** | Show ideal form side-by-side during training |
| Historical body map timeline | **SHOULD HAVE** | Slider showing body status evolution over weeks/months |
| Injury risk prediction (7-day) | **SHOULD HAVE** | "Based on your pattern, knee risk will increase by Thursday" |
| Custom drill creator | **SHOULD HAVE** | Coaches create their own drills with angle constraints |
| Multi-language (PT, EN, ES) | **SHOULD HAVE** | Key markets: Portugal, Spain, Latin America |
| Offline mode | **SHOULD HAVE** | Download drills, work without internet (pose detection is client-side) |
| Recovery plan generator | **SHOULD HAVE** | When body zone is amber/red, generate daily recovery exercises |

### Data & Analytics
| Feature | Priority | Notes |
|---------|----------|-------|
| Weekly health report (email) | **SHOULD HAVE** | "Your body this week" — engagement driver |
| Aggregate anonymized data dashboard | **SHOULD HAVE** | "85% of CourtCare users have safer shoulders" — marketing gold |
| Export health data (PDF) | **SHOULD HAVE** | For physiotherapists and doctors |
| Integration with PT/physio platforms | **SHOULD HAVE** | Send body map to your physiotherapist |

### Technical
| Feature | Priority | Notes |
|---------|----------|-------|
| React Native mobile app (iOS + Android) | **SHOULD HAVE** | Better camera access, push notifications, native performance |
| 3D body visualization | **SHOULD HAVE** | Three.js or Rive — premium feel, interactive rotation |
| Audio coaching cues | **SHOULD HAVE** | "Bend your knees more" spoken aloud during training |
| Haptic feedback (phone vibration) | **SHOULD HAVE** | Vibrate on danger alerts |

---

## Phase 4 — NICE TO HAVE (Months 5-12)

> Features that differentiate and delight. Build when you have traction.

### Advanced Sports
| Feature | Priority | Notes |
|---------|----------|-------|
| Golf swing analysis | **NICE TO HAVE** | Huge market, high willingness to pay |
| Basketball shooting form | **NICE TO HAVE** | HomeCourt competitor |
| Yoga pose correctness | **NICE TO HAVE** | Wellness market, injury prevention angle |
| Running gait analysis | **NICE TO HAVE** | Runner's knee, shin splints prevention |
| Boxing stance and technique | **NICE TO HAVE** | Connects to JabToJab ecosystem |

### AI & Machine Learning
| Feature | Priority | Notes |
|---------|----------|-------|
| Custom ML model (beyond MediaPipe) | **NICE TO HAVE** | Sport-specific pose refinement |
| Injury prediction from historical patterns | **NICE TO HAVE** | "Players with your profile have 3x ACL risk" |
| AI-generated training programs | **NICE TO HAVE** | Full periodization based on body data |
| Computer vision ball tracking | **NICE TO HAVE** | Track ball + body for complete analysis |
| Voice-first coaching (no screen needed) | **NICE TO HAVE** | "How was that shot?" → AI responds with audio |

### Platform
| Feature | Priority | Notes |
|---------|----------|-------|
| Wearable integration (WHOOP, Oura, Garmin) | **NICE TO HAVE** | HRV + pose = complete athlete picture |
| Apple Watch companion app | **NICE TO HAVE** | Quick glance at readiness |
| Team/club analytics dashboard | **NICE TO HAVE** | Aggregate injury risk across a whole team |
| API for third-party integrations | **NICE TO HAVE** | Let other apps read CourtCare health data |
| White-label for sports brands | **NICE TO HAVE** | License the engine to racket brands |
| Clinical validation study | **NICE TO HAVE** | Partner with university sports science dept |

### Monetization
| Feature | Priority | Notes |
|---------|----------|-------|
| Enterprise/club pricing tier | **NICE TO HAVE** | $99-499/month for clubs with unlimited athletes |
| Insurance partnership (B2B2C) | **NICE TO HAVE** | Sword Health's model — insurers pay for prevention |
| Equipment recommendations | **NICE TO HAVE** | "Based on your shoulder data, this racket reduces strain" |
| Sponsored challenges / tournaments | **NICE TO HAVE** | Brands sponsor in-app training challenges |

---

## Backlog Summary

| Phase | Items | Status |
|-------|-------|--------|
| Phase 1 — MVP | 32 features | **100% DONE** |
| Phase 2 — Must Have | 10 features | **0% — Build before funding** |
| Phase 3 — Should Have | 15 features | **0% — Build with funding** |
| Phase 4 — Nice to Have | 16 features | **0% — Build with traction** |
| **Total** | **73 features** | |

---

## Key Metrics to Track

| Metric | Current | Target (3 months) | Target (12 months) |
|--------|---------|-------------------|---------------------|
| Sports supported | 2 | 4 (+ pickleball, golf) | 8+ |
| Total drills | 9 | 20 | 50+ |
| Beta users | 0 | 100 | 10,000 |
| Monthly active users | 0 | 500 | 50,000 |
| Injuries prevented (tracked) | Demo only | 500+ real | 100,000+ |
| Revenue | $0 | $0 (free beta) | $50K MRR |
| Club partnerships | 0 | 5 | 50+ |
| App Store rating | N/A | N/A | 4.7+ |

---

## Investment Ask

| Round | Amount | Use of Funds |
|-------|--------|-------------|
| Pre-seed | €150-250K | Beta launch, 3 hires (iOS dev, sports scientist, BD), 6 months runway |
| Seed | €1-2M | Native app, clinical validation, 10 sports, 50 club partnerships |

---

*CourtCare — Preventing injuries before they happen.*
*© 2026 CourtCare*
