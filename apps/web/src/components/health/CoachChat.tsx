import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "coach";
  text: string;
}

// Pre-built AI responses based on common questions (no API needed for demo)
const coachResponses: Record<string, string> = {
  "shoulder": "Based on your session data, your right shoulder has been safe across 12 sessions. However, I noticed slight overextension during your last Smash session. I recommend:\n\n1. Warm up your rotator cuff before overhead shots (band pull-aparts, 2x15)\n2. Limit smash sessions to 3 minutes until shoulder mobility improves\n3. Focus on Bandeja technique — it achieves similar results with less shoulder stress\n\nYour shoulder impingement risk has dropped 75% since you started with CourtCare.",
  "back": "Your lower back is currently flagged as 'Watch'. Here's what the data shows:\n\n- Excessive backward lean detected during overhead shots (bandeja & smash)\n- This puts compression stress on your lumbar discs\n\nMy recommendation:\n1. Strengthen your core — planks and dead bugs, 3x/week\n2. Focus on staying more upright during overheads\n3. Limit overhead drill sessions to 2 minutes for the next 10 days\n4. Your back should be cleared to 'Healthy' within 2 weeks if you follow this plan.",
  "play": "Based on your current body status:\n\n🟢 8 out of 9 areas are healthy\n🟡 Lower back needs monitoring\n\nVerdict: You can play, but I recommend:\n- Avoid aggressive smashes for the next week\n- Focus on volleys and ready position drills\n- Warm up your lower back thoroughly before matches\n- If you feel any discomfort, stop immediately\n\nYour readiness score is 89/100 — almost fully cleared.",
  "improve": "Looking at your 14-session history, here's your personalized plan:\n\n📈 **Getting Better:**\n- Forehand Volley: 72 → 88 (+22% in 10 days)\n- Ready Position: consistently 90+ (excellent)\n\n⚠️ **Needs Work:**\n- Smash: score dropping when fatigued (session #3 and #10)\n- Vibora: elbow hyperextension on wrist snap\n\n🎯 **This Week's Focus:**\n1. Monday: Ready Position + Forehand Volley (safe, build confidence)\n2. Wednesday: Bandeja only (controlled overhead practice)\n3. Friday: Tennis Forehand (cross-training for elbow health)\n\nAvoid Smash until your back clears. Your form score has improved 69% overall!",
  "injury": "In 14 sessions, CourtCare detected and prevented 9 potential injuries:\n\n🔴 Session #10 (Smash): Knee hyperextension on landing — could have caused ACL damage\n🔴 Session #3 (Smash): Shoulder impingement — rotator cuff strain risk\n🟡 Session #5 (Vibora): Elbow hyperextension — tennis elbow risk\n🟡 Session #8 (Bandeja): Shoulder overextension during fatigue\n🟡 Session #12 (Backhand): Left elbow excessive flexion\n🟡 Session #14 (Bandeja): Deep knee bend + shoulder risk\n\nWithout CourtCare, any of these could have meant 2-6 weeks off court. The data shows your injury risk has dropped from 45% to 8% over 14 days.",
  "knee": "Your knees are in great shape! Both scored 'Healthy' across all 14 sessions.\n\nHowever, I flagged knee hyperextension in session #10 (Smash) — you landed with locked knees after a jump. This is the #1 cause of ACL injuries in court sports.\n\nPrevention tips:\n1. Always land with soft, bent knees\n2. Practice the Ready Position drill to build muscle memory\n3. Strengthen your quads and hamstrings (wall sits, 3x30s)\n\nYour knee protection score: 92% (up from 58% two weeks ago).",
  "elbow": "Your elbows are currently healthy, but we flagged issues in 2 sessions:\n\n- Session #5 (Vibora): Right elbow hyperextension during wrist snap\n- Session #12 (Backhand): Left elbow excessive flexion\n\nTennis elbow (lateral epicondylitis) is the most common padel injury. To prevent it:\n1. Never fully lock your elbow on contact\n2. Use hip rotation for power, not your arm\n3. Eccentric wrist exercises: 2x15 with light dumbbell\n\nYour elbow safety trend is improving — 62% → 95% in 14 days.",
  "warmup": "Based on your body map, here's your personalized warm-up for today:\n\n🔥 General (2 min):\n- Light jog / high knees\n- Dynamic lunges (10 each leg)\n\n🟡 Lower Back (focus area):\n- Cat-Cow stretch (10 reps)\n- Dead Bug (2×10 each side)\n- Bird Dog (2×8 each side)\n\n🟢 Maintenance:\n- Arm circles (30s each direction)\n- Bodyweight squats (2×12)\n\nTotal: ~8 minutes. Do this before every session and your back should clear to 'Healthy' within a week.",
  "tennis": "Great news — we just added tennis drills! You now have 3 tennis-specific drills:\n\n🎾 Tennis Serve (intermediate) — Full kinetic chain with shoulder protection\n🎾 Tennis Forehand (beginner) — Hip rotation focus to protect elbow\n🎾 Tennis Backhand (beginner) — Two-handed for wrist/elbow safety\n\nAll three monitor the same injury risk factors as padel. Cross-training with tennis forehand is actually great for your elbow health — it trains you to use hip rotation instead of arming the ball.\n\nI recommend adding 1 tennis session per week to your plan.",
  "default": "I'm your AI Coach. Based on Pedro's 14 sessions of training data, I can advise on:\n\n• 🦴 **Joint health** — ask about shoulder, knee, elbow, or back\n• 🏓 **Play readiness** — should you play today?\n• 📈 **Training plan** — what to work on next\n• ⚠️ **Injury history** — what CourtCare has prevented\n• 🎾 **Tennis** — new cross-training drills\n• 🔥 **Warm-up** — personalized pre-session routine\n\nTry asking: \"Should I play today?\" or \"How's my shoulder?\" or \"Give me a warm-up\""
};

function getCoachResponse(input: string): string {
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

const quickQuestions = [
  "Should I play today?",
  "How's my shoulder?",
  "What about my knees?",
  "Give me a warm-up",
  "What injuries were prevented?",
  "Tennis drills?",
];

export function CoachChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "coach", text: "Hey Pedro! 👋 I'm your AI Coach. I've analyzed all 14 of your sessions. Ask me anything about your body, training plan, or when you should play." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getCoachResponse(text);
      setMessages((prev) => [...prev, { role: "coach", text: response }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className={cn("rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden flex flex-col", className)}>
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-sm">🤖</div>
        <div>
          <h3 className="text-sm font-semibold text-white">AI Coach</h3>
          <p className="text-xs text-green-400">Online • Analyzing your data</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 min-h-48">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line",
              msg.role === "user"
                ? "bg-brand-500/20 text-white border border-brand-500/20"
                : "bg-white/5 text-white/80 border border-white/5"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-2.5 text-sm text-white/40">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick questions */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="text-xs px-3 py-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10 transition-colors"
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
          placeholder="Ask your AI Coach..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50"
        />
        <button
          onClick={() => sendMessage(input)}
          className="px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  );
}
