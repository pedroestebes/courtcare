import {
  PoseLandmarker,
  FilesetResolver,
  type PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

let landmarkerInstance: PoseLandmarker | null = null;
let initPromise: Promise<PoseLandmarker> | null = null;

export async function initPoseLandmarker(): Promise<PoseLandmarker> {
  if (landmarkerInstance) return landmarkerInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    const landmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numPoses: 1,
      minPoseDetectionConfidence: 0.5,
      minPosePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    landmarkerInstance = landmarker;
    return landmarker;
  })();

  return initPromise;
}

export function detectPose(
  landmarker: PoseLandmarker,
  video: HTMLVideoElement,
  timestampMs: number
): PoseLandmarkerResult {
  return landmarker.detectForVideo(video, timestampMs);
}

export function destroyPoseLandmarker(): void {
  if (landmarkerInstance) {
    landmarkerInstance.close();
    landmarkerInstance = null;
    initPromise = null;
  }
}
