import { useEffect, useState } from "react";
import type { FeedbackMessage } from "@/types/session";
import { cn } from "@/lib/utils";

interface FeedbackPanelProps {
  messages: FeedbackMessage[];
  maxVisible?: number;
  className?: string;
}

const typeStyles: Record<FeedbackMessage["type"], { bg: string; border: string; icon: string }> = {
  correction: {
    bg: "bg-red-500/20",
    border: "border-red-400/30",
    icon: "!",
  },
  encouragement: {
    bg: "bg-green-500/20",
    border: "border-green-400/30",
    icon: "\u2713",
  },
  info: {
    bg: "bg-blue-500/20",
    border: "border-blue-400/30",
    icon: "i",
  },
};

interface AnimatedMessage {
  message: FeedbackMessage;
  visible: boolean;
}

export function FeedbackPanel({
  messages,
  maxVisible = 3,
  className,
}: FeedbackPanelProps) {
  const [displayMessages, setDisplayMessages] = useState<AnimatedMessage[]>([]);

  useEffect(() => {
    const incoming = messages.slice(0, maxVisible);

    setDisplayMessages((prev) => {
      const existingIds = new Set(prev.map((m) => m.message.text));
      const newMessages = incoming
        .filter((m) => !existingIds.has(m.text))
        .map((m) => ({ message: m, visible: false }));

      const combined = [...prev, ...newMessages].slice(-maxVisible);

      requestAnimationFrame(() => {
        setDisplayMessages((current) =>
          current.map((m) => ({ ...m, visible: true }))
        );
      });

      return combined;
    });
  }, [messages, maxVisible]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayMessages((prev) => {
        const now = Date.now();
        return prev.filter((m) => now - m.message.timestamp < 5000);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("flex flex-col gap-2 overflow-hidden", className)}>
      {displayMessages.map(({ message, visible }) => {
        const style = typeStyles[message.type];
        return (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300",
              style.bg,
              style.border,
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            )}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
              {style.icon}
            </span>
            <p className="text-sm text-white/90 leading-snug">{message.text}</p>
          </div>
        );
      })}
      {displayMessages.length === 0 && (
        <div className="text-sm text-white/40 text-center py-4">
          Feedback will appear here...
        </div>
      )}
    </div>
  );
}
