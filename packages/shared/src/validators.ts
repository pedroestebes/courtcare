import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Display name must be at least 2 characters")
      .max(50, "Display name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createSessionSchema = z.object({
  drillId: z.string().uuid("Invalid drill ID"),
});

export const completeSessionSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  durationSeconds: z.number().int().positive(),
  frames: z.array(
    z.object({
      timestampMs: z.number().int().nonnegative(),
      landmarks: z.record(
        z.object({
          x: z.number(),
          y: z.number(),
          z: z.number(),
        })
      ),
      scores: z.record(z.number()),
      feedback: z.array(z.string()),
    })
  ),
  summary: z.object({
    avgScore: z.number().min(0).max(100),
    bestScore: z.number().min(0).max(100),
    weakAreas: z.array(z.string()),
    tips: z.array(z.string()),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type CompleteSessionInput = z.infer<typeof completeSessionSchema>;
