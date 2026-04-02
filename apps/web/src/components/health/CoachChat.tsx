import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface Message {
  role: "user" | "coach";
  text: string;
  isAI?: boolean; // true if powered by Claude API
}

// Pre-built AI responses for demo mode (when API isn't available)
const coachResponses: Record<string, string> = {
  "shoulder": "Based on your session data, your right shoulder has been safe across 12 sessions. However, I noticed slight overextension during your last Smash session. I recommend:\n\n1. Warm up your rotator cuff before overhead shots (band pull-aparts, 2x15)\n2. Limit smash sessions to 3 minutes until shoulder mobility improves\n3. Focus on Bandeja technique — it achieves similar results with less shoulder stress\n\nYour shoulder impingement risk has dropped 75% since you started with CourtCare.",
  "back": "Your lower back is currently flagged as 'Watch'. Here's what the data shows:\n\n- Excessive backward lean detected during overhead shots (bandeja & smash)\n- This puts compression stress on your lumbar discs\n\nMy recommendation:\n1. Strengthen your core — planks and dead bugs, 3x/week\n2. Focus on staying more upright during overheads\n3. Limit overhead drill sessions to 2 minutes for the next 10 days\n4. Your back should be cleared to 'Healthy' within 2 weeks if you follow this plan.",
  "play": "Based on your current body status:\n\n\uD83D\uDFE2 8 out of 9 areas are healthy\n\uD83D\uDFE1 Lower back needs monitoring\n\nVerdict: You can play, but I recommend:\n- Avoid aggressive smashes for the next week\n- Focus on volleys and ready position drills\n- Warm up your lower back thoroughly before matches\n- If you feel any discomfort, stop immediately\n\nYour readiness score is 89/100 — almost fully cleared.",
  "improve": "Looking at your 14-session history, here's your personalized plan:\n\n\uD83D\uDCC8 **Getting Better:**\n- Forehand Volley: 72 \u2192 88 (+22% in 10 days)\n- Ready Position: consistently 90+ (excellent)\n\n\u26A0\uFE0F **Needs Work:**\n- Smash: score dropping when fatigued (session #3 and #10)\n- Vibora: elbow hyperextension on wrist snap\n\n\uD83C\uDFAF **This Week's Focus:**\n1. Monday: Ready Position + Forehand Volley (safe, build confidence)\n2. Wednesday: Bandeja only (controlled overhead practice)\n3. Friday: Tennis Forehand (cross-training for elbow health)\n\nAvoid Smash until your back clears. Your form score has improved 69% overall!",
  "injury": "In 14 sessions, CourtCare detected and prevented 9 potential injuries:\n\n\uD83D\uDD34 Session #10 (Smash): Knee hyperextension on landing — could have caused ACL damage\n\uD83D\uDD34 Session #3 (Smash): Shoulder impingement — rotator cuff strain risk\n\uD83D\uDFE1 Session #5 (Vibora): Elbow hyperextension — tennis elbow risk\n\uD83D\uDFE1 Session #8 (Bandeja): Shoulder overextension during fatigue\n\uD83D\uDFE1 Session #12 (Backhand): Left elbow excessive flexion\n\uD83D\uDFE1 Session #14 (Bandeja): Deep knee bend + shoulder risk\n\nWithout CourtCare, any of these could have meant 2-6 weeks off court. The data shows your injury risk has dropped from 45% to 8% over 14 days.",
  "knee": "Your knees are in great shape! Both scored 'Healthy' across all 14 sessions.\n\nHowever, I flagged knee hyperextension in session #10 (Smash) — you landed with locked knees after a jump. This is the #1 cause of ACL injuries in court sports.\n\nPrevention tips:\n1. Always land with soft, bent knees\n2. Practice the Ready Position drill to build muscle memory\n3. Strengthen your quads and hamstrings (wall sits, 3x30s)\n\nYour knee protection score: 92% (up from 58% two weeks ago).",
  "elbow": "Your elbows are currently healthy, but we flagged issues in 2 sessions:\n\n- Session #5 (Vibora): Right elbow hyperextension during wrist snap\n- Session #12 (Backhand): Left elbow excessive flexion\n\nTennis elbow (lateral epicondylitis) is the most common padel injury. To prevent it:\n1. Never fully lock your elbow on contact\n2. Use hip rotation for power, not your arm\n3. Eccentric wrist exercises: 2x15 with light dumbbell\n\nYour elbow safety trend is improving — 62% \u2192 95% in 14 days.",
  "warmup": "Based on your body map, here's your personalized warm-up for today:\n\n\uD83D\uDD25 General (2 min):\n- Light jog / high knees\n- Dynamic lunges (10 each leg)\n\n\uD83D\uDFE1 Lower Back (focus area):\n- Cat-Cow stretch (10 reps)\n- Dead Bug (2\xD710 each side)\n- Bird Dog (2\xD78 each side)\n\n\uD83D\uDFE2 Maintenance:\n- Arm circles (30s each direction)\n- Bodyweight squats (2\xD712)\n\nTotal: ~8 minutes. Do this before every session and your back should clear to 'Healthy' within a week.",
  "tennis": "Great news — we just added tennis drills! You now have 3 tennis-specific drills:\n\n\uD83C\uDFBE Tennis Serve (intermediate) — Full kinetic chain with shoulder protection\n\uD83C\uDFBE Tennis Forehand (beginner) — Hip rotation focus to protect elbow\n\uD83C\uDFBE Tennis Backhand (beginner) — Two-handed for wrist/elbow safety\n\nAll three monitor the same injury risk factors as padel. Cross-training with tennis forehand is actually great for your elbow health — it trains you to use hip rotation instead of arming the ball.\n\nI recommend adding 1 tennis session per week to your plan.",
  "default": "I'm your AI Coach. Based on Pedro's 14 sessions of training data, I can advise on:\n\n\u2022 \uD83E\uDDB4 **Joint health** — ask about shoulder, knee, elbow, or back\n\u2022 \uD83C\uDFD3 **Play readiness** — should you play today?\n\u2022 \uD83D\uDCC8 **Training plan** — what to work on next\n\u2022 \u26A0\uFE0F **Injury history** — what CourtCare has prevented\n\u2022 \uD83C\uDFBE **Tennis** — new cross-training drills\n\u2022 \uD83D\uDD25 **Warm-up** — personalized pre-session routine\n\nTry asking: \"Should I play today?\" or \"How's my shoulder?\" or \"Give me a warm-up\""
};

function getLocalResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("shoulder") || lower.includes("rotator")) return coachResponses.shoulder;
  if (lower.includes("back") || lower.includes("spine") || lower.includes("lumbar")) return coachResponses.back;
  if (lower.includes("play") || lower.includes("ready") || lower.includes("match") || lower.includes("game")) return coachResponses.play;
  if (lower.includes("improve") || lower.includes("plan") || lower.includes("focus") || lower.includes("week") || lower.includes("next") || lower.includes("better")) return coachResponses.improve;
  if (lower.includes("knee") || lower.includes("acl") || lower.includes("leg")) return coachResponses.knee;
  if (lower.includes("elbow") || lower.includes("tennis elbow") || lower.includes("arm")) return coachResponses.elbow;
  if (lower.includes("warm") || lower.includes("stretch") || lower.includes("before")) return coachResponses.warmup;
  if (lower.includes("tennis") || lower.includes("cross") || lower.includes("new drill")) return coachResponses.tennis;
  if (lower.includes("injury") || lower.includes("prevent") || lower.includes("protect") || lower.includes("hurt") || lower.includes("pain")) return coachResponses.injury;
  return coachResponses.default;
}

// Context data to send with AI requests
const coachContext = {
  userName: "Pedro",
  readinessScore: 89,
  bodyZones: [
    { area: "Right Shoulder", status: "healthy", healthScore: 96, trend: "improving" },
    { area: "Left Shoulder", status: "healthy", healthScore: 92, trend: "stable" },
    { area: "Right Elbow", status: "healthy", healthScore: 95, trend: "improving" },
    { area: "Left Elbow", status: "healthy", healthScore: 88, trend: "stable" },
    { area: "Right Knee", status: "healthy", healthScore: 92, trend: "improving" },
    { area: "Left Knee", status: "healthy", healthScore: 90, trend: "stable" },
    { area: "Lower Back", status: "watch", healthScore: 64, trend: "improving" },
    { area: "Right Hip", status: "healthy", healthScore: 91, trend: "stable" },
    { area: "Left Hip", status: "healthy", healthScore: 89, trend: "stable" },
  ],
  recentSessions: [
    { drillName: "Forehand Volley", score: 88, safe: true },
    { drillName: "Bandeja", score: 82, safe: true },
    { drillName: "Smash", score: 74, safe: false },
    { drillName: "Ready Position", score: 93, safe: true },
    { drillName: "Vibora", score: 71, safe: false },
    { drillName: "Backhand Volley", score: 85, safe: true },
  ],
};

const quickQuestions = [
  "Should I play today?",
  "How's my shoulder?",
  "What about my knees?",
  "Give me a warm-up",
  "What injuries were prevented?",
  "Create a training plan for this week",
];

export function CoachChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "coach", text: "Hey Pedro! \uD83D\uDC4B I'm your AI Coach, powered by Claude. I've analyzed all 14 of your sessions and your body map data. Ask me anything about your health, training, or when you should play.", isAI: true },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [aiMode, setAiMode] = useState<"ai" | "demo">("ai");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    // Try API first, fall back to local responses
    try {
      const result = await api.post<{ response: string; model: string }>("/ai/coach", {
        message: text,
        context: coachContext,
      });

      const isRealAI = result.model !== "demo" && result.model !== "error";
      if (!isRealAI && aiMode === "ai") setAiMode("demo");
      if (isRealAI && aiMode === "demo") setAiMode("ai");

      setMessages((prev) => [...prev, {
        role: "coach",
        text: result.response,
        isAI: isRealAI,
      }]);
    } catch {
      // API unavailable — use local responses
      if (aiMode === "ai") setAiMode("demo");

      // Simulate thinking delay for local responses
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));

      setMessages((prev) => [...prev, {
        role: "coach",
        text: getLocalResponse(text),
        isAI: false,
      }]);
    }

    setTyping(false);
  };

  return (
    <div className={cn("rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden flex flex-col", className)}>
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-sm">{"\uD83E\uDD16"}</div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Coach</h3>
            <p className="text-xs text-green-400">Online {"\u2022"} Analyzing your data</p>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
          aiMode === "ai"
            ? "bg-purple-500/15 text-purple-400 border-purple-500/20"
            : "bg-white/5 text-white/30 border-white/10"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", aiMode === "ai" ? "bg-purple-400" : "bg-white/30")} />
          {aiMode === "ai" ? "Claude AI" : "Demo Mode"}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96 min-h-48">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line",
              msg.role === "user"
                ? "bg-brand-500/20 text-white border border-brand-500/20"
                : "bg-white/5 text-white/80 border border-white/5"
            )}>
              {msg.text}
              {msg.role === "coach" && msg.isAI && (
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-xs text-purple-400/60">Powered by Claude</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-2.5 text-sm text-white/40">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={typing}
            className="text-xs px-3 py-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10 transition-colors disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask your AI Coach anything..."
          disabled={typing}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={typing || !input.trim()}
          className="px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
