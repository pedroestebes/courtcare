import { useState, useEffect, useRef, useCallback } from "react";
import type { PoseLandmarker } from "@mediapipe/tasks-vision";
import { initPoseLandmarker, detectPose, destroyPoseLandmarker } from "@/engine/mediapipe";
import type { Landmark, PoseResult } from "@/types/pose";

interface UsePoseDetectionOptions {
  enabled: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

interface UsePoseDetectionReturn {
  landmarks: Landmark[] | null;
  worldLandmarks: Landmark[] | null;
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  fps: number;
}

export function usePoseDetection({
  enabled,
  videoRef,
}: UsePoseDetectionOptions): UsePoseDetectionReturn {
  const [landmarks, setLandmarks] = useState<Landmark[] | null>(null);
  const [worldLandmarks, setWorldLandmarks] = useState<Landmark[] | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fps, setFps] = useState(0);

  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const fpsTimerRef = useRef(0);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (!video || !landmarker || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const now = performance.now();
    if (now - lastTimeRef.current < 33) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    try {
      const result = detectPose(landmarker, video, now);

      if (result.landmarks && result.landmarks.length > 0) {
        const normalizedLandmarks: Landmark[] = result.landmarks[0].map((lm) => ({
          x: lm.x,
          y: lm.y,
          z: lm.z,
          visibility: lm.visibility ?? 0,
        }));
        setLandmarks(normalizedLandmarks);
      } else {
        setLandmarks(null);
      }

      if (result.worldLandmarks && result.worldLandmarks.length > 0) {
        const world: Landmark[] = result.worldLandmarks[0].map((lm) => ({
          x: lm.x,
          y: lm.y,
          z: lm.z,
          visibility: lm.visibility ?? 0,
        }));
        setWorldLandmarks(world);
      } else {
        setWorldLandmarks(null);
      }

      frameCountRef.current++;
      if (now - fpsTimerRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        fpsTimerRef.current = now;
      }

      lastTimeRef.current = now;
    } catch {
      // Frame processing error -- skip silently
    }

    rafRef.current = requestAnimationFrame(processFrame);
  }, [videoRef]);

  useEffect(() => {
    if (!enabled) {
      setLandmarks(null);
      setWorldLandmarks(null);
      setIsReady(false);
      return;
    }

    let cancelled = false;

    async function init() {
      setIsLoading(true);
      setError(null);
      try {
        const landmarker = await initPoseLandmarker();
        if (cancelled) return;
        landmarkerRef.current = landmarker;
        setIsReady(true);
        fpsTimerRef.current = performance.now();
        rafRef.current = requestAnimationFrame(processFrame);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to initialize pose detection"
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, processFrame]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      destroyPoseLandmarker();
    };
  }, []);

  return {
    landmarks,
    worldLandmarks,
    isReady,
    isLoading,
    error,
    fps,
  };
}
