CREATE TABLE `drills` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`sport` text DEFAULT 'padel' NOT NULL,
	`category` text NOT NULL,
	`difficulty` text NOT NULL,
	`description` text NOT NULL,
	`instructions` text NOT NULL,
	`reference_angles` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drills_slug_unique` ON `drills` (`slug`);--> statement-breakpoint
CREATE TABLE `session_frames` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`timestamp_ms` integer NOT NULL,
	`landmarks` text NOT NULL,
	`scores` text NOT NULL,
	`feedback` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`drill_id` text NOT NULL,
	`started_at` text NOT NULL,
	`ended_at` text,
	`overall_score` integer,
	`duration_seconds` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`drill_id`) REFERENCES `drills`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`display_name` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);