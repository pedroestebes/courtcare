import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.js";
import type { Env, Variables } from "../types.js";

const aiRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

// All AI routes require authentication
aiRouter.use("*", authMiddleware);

// System prompt for the CourtCare AI Coach
const SYSTEM_PROMPT = `You are the CourtCare AI Coach — an expert sports physiotherapist and padel coach.
You have access to the user's training data provided in the context below. Use it to give personalized, data-driven advice.

Your personality:
- Warm, encouraging, but direct
- Always prioritize injury prevention over performance
- Reference specific data points (scores, risk percentages, session counts)
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for action items
- When recommending rest or caution, be firm but empathetic

Key knowledge:
- You monitor 9 joints: both shoulders, both elbows, lower back, both hips, both knees
- Risk levels: safe (0-15%), caution (15-40%), warning (40-70%), danger (70-100%)
- Form scores are 0-100 (85+ excellent, 70+ good, 50+ needs work, <50 poor)
- You track shoulder impingement, elbow strain, ACL stress, spinal compression, hip impingement
- Sessions auto-pause at 70% injury risk for 3+ seconds
- Fatigue detection triggers when form degrades 15%+ over 30 seconds`;

// POST /ai/coach — AI Coach chat
aiRouter.post("/coach", async (c) => {
  const body = await c.req.json();
  const { message, context } = body as {
    message: string;
    context?: {
      bodyZones?: Array<{ area: string; status: string; healthScore?: number; trend?: string }>;
      recentSessions?: Array<{ drillName: string; score: number; safe: boolean }>;
      readinessScore?: number;
      userName?: string;
    };
  };

  if (!message || typeof message !== "string") {
    return c.json({ error: "Message is required" }, 400);
  }

  // Build context string from user data
  let userContext = "";
  if (context) {
    if (context.userName) {
      userContext += `\nUser: ${context.userName}`;
    }
    if (context.readinessScore !== undefined) {
      userContext += `\nPlay Readiness Score: ${context.readinessScore}/100`;
    }
    if (context.bodyZones) {
      userContext += "\n\nBody Status:";
      for (const zone of context.bodyZones) {
        userContext += `\n- ${zone.area}: ${zone.status}${zone.healthScore ? ` (${zone.healthScore}/100)` : ""}${zone.trend ? `, trend: ${zone.trend}` : ""}`;
      }
    }
    if (context.recentSessions) {
      userContext += "\n\nRecent Sessions (newest first):";
      for (const s of context.recentSessions) {
        userContext += `\n- ${s.drillName}: score ${s.score}, ${s.safe ? "safe" : "risks detected"}`;
      }
    }
  }

  const apiKey = c.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Fallback: return a helpful message that API key isn't configured
    return c.json({
      response: "AI Coach is running in demo mode. To enable real AI responses, configure the ANTHROPIC_API_KEY secret in your Cloudflare Worker. For now, try the quick question buttons for pre-built advice!",
      model: "demo",
    });
  }

  try {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT + (userContext ? `\n\n--- USER DATA ---${userContext}` : ""),
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text();
      console.error("Anthropic API error:", err);
      return c.json({
        response: "I'm having trouble connecting to my AI brain right now. Try again in a moment, or use the quick question buttons for instant advice!",
        model: "error",
      });
    }

    const result = (await anthropicResponse.json()) as {
      content: Array<{ type: string; text: string }>;
      model: string;
    };
    const text = result.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";

    return c.json({
      response: text,
      model: result.model,
    });
  } catch (err) {
    console.error("AI Coach error:", err);
    return c.json({
      response: "Something went wrong with the AI Coach. Please try again.",
      model: "error",
    });
  }
});

export default aiRouter;
