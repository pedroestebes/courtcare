-- Add health & injury tracking columns

ALTER TABLE `sessions` ADD COLUMN `max_injury_risk` integer;
ALTER TABLE `sessions` ADD COLUMN `avg_fatigue_level` integer;
ALTER TABLE `sessions` ADD COLUMN `injury_alerts` text;
ALTER TABLE `sessions` ADD COLUMN `session_safe` integer;

ALTER TABLE `session_frames` ADD COLUMN `injury_risk` integer;
ALTER TABLE `session_frames` ADD COLUMN `fatigue_level` integer;
