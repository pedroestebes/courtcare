-- CourtCare Demo User & Sessions
-- Password: demo123 (PBKDF2 hash)
-- Use this to demonstrate the app to investors

INSERT OR REPLACE INTO users (id, email, password_hash, display_name, created_at) VALUES
(
  'demo-user-001',
  'pedro@courtcare.com',
  'a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  'Pedro',
  '2026-03-15T08:00:00Z'
);

-- Demo sessions (matching the frontend mock data IDs)
INSERT OR REPLACE INTO sessions (id, user_id, drill_id, started_at, ended_at, overall_score, duration_seconds, max_injury_risk, avg_fatigue_level, session_safe) VALUES
('demo-session-01', 'demo-user-001', 'cc-drill-forehand-volley', '2026-03-29T09:15:00Z', '2026-03-29T09:18:00Z', 88, 180, 8, 10, 1),
('demo-session-02', 'demo-user-001', 'cc-drill-bandeja', '2026-03-28T17:30:00Z', '2026-03-28T17:34:00Z', 82, 240, 15, 18, 1),
('demo-session-03', 'demo-user-001', 'cc-drill-smash', '2026-03-27T10:00:00Z', '2026-03-27T10:05:00Z', 74, 300, 62, 42, 0),
('demo-session-04', 'demo-user-001', 'cc-drill-ready-position', '2026-03-26T08:45:00Z', '2026-03-26T08:47:00Z', 93, 120, 5, 8, 1),
('demo-session-05', 'demo-user-001', 'cc-drill-vibora', '2026-03-25T16:00:00Z', '2026-03-25T16:04:20Z', 71, 260, 48, 35, 0),
('demo-session-06', 'demo-user-001', 'cc-drill-backhand-volley', '2026-03-24T11:20:00Z', '2026-03-24T11:23:20Z', 85, 200, 12, 15, 1),
('demo-session-07', 'demo-user-001', 'cc-drill-forehand-volley', '2026-03-23T09:00:00Z', '2026-03-23T09:03:10Z', 79, 190, 18, 20, 1),
('demo-session-08', 'demo-user-001', 'cc-drill-bandeja', '2026-03-22T18:15:00Z', '2026-03-22T18:18:40Z', 75, 220, 55, 30, 0),
('demo-session-09', 'demo-user-001', 'cc-drill-ready-position', '2026-03-21T08:30:00Z', '2026-03-21T08:31:40Z', 90, 100, 3, 5, 1),
('demo-session-10', 'demo-user-001', 'cc-drill-smash', '2026-03-20T15:00:00Z', '2026-03-20T15:04:40Z', 67, 280, 72, 55, 0),
('demo-session-11', 'demo-user-001', 'cc-drill-forehand-volley', '2026-03-19T10:30:00Z', '2026-03-19T10:33:40Z', 72, 160, 20, 22, 1),
('demo-session-12', 'demo-user-001', 'cc-drill-backhand-volley', '2026-03-18T17:00:00Z', '2026-03-18T17:03:00Z', 68, 180, 45, 28, 0),
('demo-session-13', 'demo-user-001', 'cc-drill-ready-position', '2026-03-17T09:00:00Z', '2026-03-17T09:01:30Z', 81, 90, 8, 10, 1),
('demo-session-14', 'demo-user-001', 'cc-drill-bandeja', '2026-03-16T16:30:00Z', '2026-03-16T16:33:20Z', 62, 200, 58, 40, 0);
