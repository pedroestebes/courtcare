import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface RecordedFrame {
  timestamp: number;
  imageDataUrl: string;
  score: number;
  injuryRisk: number;
}

interface SessionReplayProps {
  frames: RecordedFrame[];
  className?: string;
}

export function SessionReplay({ frames, className }: SessionReplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const frame = frames[currentIndex];
  const duration = frames.length > 0 ? (frames[frames.length - 1].timestamp - frames[0].timestamp) / 1000 : 0;
  const currentTime = frames.length > 0 ? (frame.timestamp - frames[0].timestamp) / 1000 : 0;
  const progress = frames.length > 1 ? (currentIndex / (frames.length - 1)) * 100 : 0;

  const play = useCallback(() => {
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (playing) pause();
    else {
      if (currentIndex >= frames.length - 1) setCurrentIndex(0);
      play();
    }
  }, [playing, currentIndex, frames.length, play, pause]);

  // Playback loop
  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 500); // Match capture rate (2fps)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, frames.length]);

  if (frames.length === 0) {
    return (
      <div className={cn("rounded-xl bg-white/5 border border-white/10 p-6 text-center", className)}>
        <span className="text-2xl mb-2 block">{"\uD83C\uDFA5"}</span>
        <p className="text-sm text-white/40">No recording available for this session.</p>
        <p className="text-xs text-white/25 mt-1">Session recordings are available for new sessions.</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl bg-white/5 border border-white/10 overflow-hidden", className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{"\uD83C\uDFA5"}</span>
          <h4 className="text-sm font-semibold text-white/70">Session Replay</h4>
        </div>
        <span className="text-xs text-white/30">{frames.length} frames {"\u2022"} {Math.round(duration)}s</span>
      </div>

      {/* Video frame */}
      <div className="relative aspect-video bg-black">
        {frame && (
          <img
            src={frame.imageDataUrl}
            alt={`Frame ${currentIndex}`}
            className="w-full h-full object-contain"
          />
        )}

        {/* Overlay stats */}
        {frame && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <div className={cn(
              "px-2 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm",
              frame.score >= 85 ? "bg-green-500/20 text-green-400 border-green-500/30" :
              frame.score >= 70 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
              "bg-red-500/20 text-red-400 border-red-500/30"
            )}>
              Score: {Math.round(frame.score)}
            </div>
            {frame.injuryRisk > 15 && (
              <div className={cn(
                "px-2 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm",
                frame.injuryRisk >= 40 ? "bg-red-500/20 text-red-400 border-red-500/30" :
                "bg-amber-500/20 text-amber-400 border-amber-500/30"
              )}>
                Risk: {Math.round(frame.injuryRisk)}%
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 text-xs text-white/60 font-mono backdrop-blur-sm">
          {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          {playing ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {/* Scrubber */}
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={frames.length - 1}
            value={currentIndex}
            onChange={(e) => {
              setCurrentIndex(Number(e.target.value));
              setPlaying(false);
            }}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-400"
          />
        </div>

        {/* Speed indicator */}
        <span className="text-xs text-white/30">2fps</span>
      </div>
    </div>
  );
}
