import { wedding } from "@/config/wedding";
import { asset } from "./utils";

let audio: HTMLAudioElement | null = null;
let pausedByVideo = false;
const listeners = new Set<(playing: boolean) => void>();
const START = Math.max(0, wedding.music.startAt ?? 0);

function getAudio(): HTMLAudioElement | null {
  if (!wedding.music.src || typeof window === "undefined") return null;
  if (!audio) {
    const a = new Audio(asset(wedding.music.src));
    a.volume = 0.6;
    a.preload = "auto";
    a.addEventListener("loadedmetadata", () => {
      if (START && a.currentTime < START) a.currentTime = START;
    });
    a.addEventListener("ended", () => {
      a.currentTime = START;
      void a.play().catch(() => undefined);
    });
    a.addEventListener("play", () => listeners.forEach((l) => l(true)));
    a.addEventListener("pause", () => listeners.forEach((l) => l(false)));
    audio = a;
  }
  return audio;
}

export function playMusic(): void {
  const a = getAudio();
  if (!a) return;
  if (START && a.readyState >= 1 && a.currentTime < START) a.currentTime = START;
  void a.play().catch(() => undefined);
}

export function toggleMusic(): void {
  const a = getAudio();
  if (!a) return;
  pausedByVideo = false;
  if (a.paused) void a.play().catch(() => undefined);
  else a.pause();
}

export function isMusicPlaying(): boolean {
  return !!audio && !audio.paused;
}

export function pauseForVideo(): void {
  if (audio && !audio.paused) {
    pausedByVideo = true;
    audio.pause();
  }
}

export function resumeAfterVideo(): void {
  window.setTimeout(() => {
    const anyPlaying = Array.from(document.querySelectorAll("video")).some((v) => !v.paused && !v.ended);
    if (pausedByVideo && !anyPlaying && audio) {
      pausedByVideo = false;
      void audio.play().catch(() => undefined);
    }
  }, 150);
}

export function onMusicChange(listener: (playing: boolean) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
