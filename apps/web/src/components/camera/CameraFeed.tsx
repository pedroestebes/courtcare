import { useRef, useEffect, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface CameraFeedProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  stream: MediaStream | null;
  className?: string;
  mirrored?: boolean;
}

export function CameraFeed({
  videoRef,
  canvasRef,
  stream,
  className,
  mirrored = true,
}: CameraFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream) return;

    video.srcObject = stream;
    video.play().catch((err) => {
      console.warn("Video play failed:", err.message);
    });

    return () => {
      video.srcObject = null;
    };
  }, [stream, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;
    });

    resizeObserver.observe(video);
    return () => resizeObserver.disconnect();
  }, [videoRef, canvasRef]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full bg-black rounded-2xl overflow-hidden", className)}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          mirrored && "scale-x-[-1]"
        )}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none",
          mirrored && "scale-x-[-1]"
        )}
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center text-white/60">
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto mb-3 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <p className="text-sm">Camera not connected</p>
          </div>
        </div>
      )}
    </div>
  );
}
