import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";
import { getDrill } from "@/engine/drills/index";
import { useCamera } from "@/hooks/useCamera";
import { usePoseDetection } from "@/hooks/usePoseDetection";
import { useFormAnalysis } from "@/hooks/useFormAnalysis";
import { useSessionStore } from "@/stores/sessionStore";
import { CameraFeed } from "@/components/camera/CameraFeed";
import { SkeletonOverlay } from "@/components/camera/SkeletonOverlay";
import { ScoreGauge } from "@/components/pose/ScoreGauge";
import { FeedbackPanel } from "@/components/pose/FeedbackPanel";
import { Button } from "@/components/ui/Button";
import { formatDuration, cn } from "@/lib/utils";

export function Session() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const drill = slug ? getDrill(slug) : undefined;

  const {
    status,
    elapsedSeconds,
    countdownValue,
    totalReps,
    startSession,
    setCountdown,
    activate,
    pause,
    resume,
    complete,
    reset,
    addFrame,
    tick,
  } = useSessionStore();

  const camera = useCamera();
  const poseDetection = usePoseDetection({
    enabled: status === "active" && camera.isActive,
    videoRef: camera.videoRef,
  });

  const formAnalysis = useFormAnalysis({
    drill: drill ?? null,
    landmarks: poseDetection.landmarks,
    enabled: status === "active",
  });

  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  // Start the session on mount
  useEffect(() => {
    if (!drill) return;

    camera.start().then(() => {
      startSession(drill.slug);
    });

    return () => {
      camera.stop();
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drill?.slug]);

  // Countdown logic
  useEffect(() => {
    if (status !== "countdown") return;

    if (countdownValue <= 0) {
      activate();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdownValue - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, countdownValue, setCountdown, activate]);

  // Timer tick
  useEffect(() => {
    if (status === "active") {
      timerRef.current = setInterval(() => tick(), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, tick]);

  // Record frames
  useEffect(() => {
    if (status !== "active") return;

    const frameInterval = setInterval(() => {
      addFrame({
        timestamp: Date.now(),
        score: formAnalysis.smoothedScore,
        feedback: formAnalysis.feedback,
      });
    }, 1000);

    return () => clearInterval(frameInterval);
  }, [status, formAnalysis.smoothedScore, formAnalysis.feedback, addFrame]);

  const handlePause = useCallback(() => {
    if (status === "active") pause();
    else if (status === "paused") resume();
  }, [status, pause, resume]);

  const handleStop = useCallback(() => {
    complete();
    camera.stop();
  }, [complete, camera]);

  const handleFinish = useCallback(() => {
    reset();
    navigate("/drills");
  }, [reset, navigate]);

  if (!drill) {
    return <Navigate to="/drills" replace />;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { reset(); navigate("/drills"); }}
            className="text-white/60 hover:text-white p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-semibold text-white">{drill.name}</h2>
            <p className="text-xs text-white/50">{drill.difficulty}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className="text-center">
            <p className="text-xl font-mono font-bold text-white">
              {formatDuration(elapsedSeconds)}
            </p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Time</p>
          </div>

          {/* Reps */}
          <div className="text-center">
            <p className="text-xl font-bold text-white">{totalReps}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Reps</p>
          </div>

          {/* FPS */}
          {poseDetection.isReady && (
            <div className="text-center">
              <p className="text-sm font-mono text-white/50">{poseDetection.fps} fps</p>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 relative">
        {/* Camera feed */}
        <CameraFeed
          videoRef={camera.videoRef}
          canvasRef={camera.canvasRef}
          stream={camera.stream}
          className="absolute inset-0 rounded-none"
        />

        {/* Skeleton overlay */}
        <SkeletonOverlay
          canvas={camera.canvasRef.current}
          landmarks={poseDetection.landmarks}
          score={formAnalysis.smoothedScore}
        />

        {/* Score gauge - top right */}
        {status === "active" && (
          <div className="absolute top-4 right-4 z-10">
            <ScoreGauge score={formAnalysis.smoothedScore} size={110} />
          </div>
        )}

        {/* Feedback panel - right side */}
        {status === "active" && (
          <div className="absolute top-36 right-4 z-10 w-72">
            <FeedbackPanel messages={formAnalysis.feedback} />
          </div>
        )}

        {/* Score breakdown - bottom left */}
        {status === "active" && Object.keys(formAnalysis.scores).length > 0 && (
          <div className="absolute bottom-20 left-4 z-10 glass rounded-xl p-3 max-w-xs">
            <div className="space-y-1.5">
              {Object.entries(formAnalysis.scores).slice(0, 5).map(([label, score]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-[10px] text-white/60 w-24 truncate">{label}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        score >= 85 ? "bg-green-400" :
                        score >= 70 ? "bg-yellow-400" :
                        score >= 50 ? "bg-orange-400" :
                        "bg-red-400"
                      )}
                      style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/80 w-8 text-right font-mono">
                    {Math.round(score)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Countdown overlay */}
        {status === "countdown" && countdownValue > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <div className="text-center">
              <p className="text-8xl font-bold text-white animate-pulse">
                {countdownValue}
              </p>
              <p className="text-lg text-white/60 mt-4">Get ready...</p>
            </div>
          </div>
        )}

        {/* Paused overlay */}
        {status === "paused" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-2">Paused</p>
              <p className="text-white/60 mb-6">Take a break, then continue when ready.</p>
              <div className="flex gap-4">
                <Button onClick={handlePause} size="lg">
                  Resume
                </Button>
                <Button variant="outline" onClick={handleStop} size="lg" className="border-white/20 text-white hover:bg-white/10">
                  End Session
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Completed overlay */}
        {status === "completed" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <ScoreGauge score={formAnalysis.bestScore} size={140} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Session Complete</h2>
              <div className="grid grid-cols-3 gap-4 my-8">
                <div>
                  <p className="text-2xl font-bold text-white">{formatDuration(elapsedSeconds)}</p>
                  <p className="text-xs text-white/50">Duration</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalReps}</p>
                  <p className="text-xs text-white/50">Reps</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{Math.round(formAnalysis.bestScore)}</p>
                  <p className="text-xs text-white/50">Best Score</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleFinish} size="lg">
                  Back to Drills
                </Button>
                <Link to="/history">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    View History
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Loading pose detection */}
        {poseDetection.isLoading && status === "active" && (
          <div className="absolute top-4 left-4 z-10 glass rounded-lg px-3 py-2">
            <p className="text-xs text-white/70">Loading pose detection...</p>
          </div>
        )}

        {/* Camera error */}
        {camera.error && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-sm">
              <p className="text-lg text-red-400 mb-4">{camera.error}</p>
              <Button onClick={() => camera.start()}>Retry Camera</Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      {(status === "active") && (
        <div className="relative z-10 flex items-center justify-center gap-4 px-4 py-4 bg-black/40 backdrop-blur-sm">
          <Button
            variant="outline"
            onClick={handlePause}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
            Pause
          </Button>
          <Button
            variant="ghost"
            onClick={handleStop}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
            </svg>
            Stop
          </Button>
        </div>
      )}
    </div>
  );
}

