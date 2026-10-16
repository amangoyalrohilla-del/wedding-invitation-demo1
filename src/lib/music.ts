import { wedding } from "@/config/wedding";
import { asset } from "./utils";

let audio: HTMLAudioElement | null = null;
const listeners = new Set<(playing: boolean) => void>();

function getAudio(): HTMLAudioElement | null {
  if (!wedding.music.src || typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(asset(wedding.music.src));
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";
    audio.addEventListener("play", () => listeners.forEach((l) => l(true)));
    audio.addEventListener("pause", () => listeners.forEach((l) => l(false)));
  }
  return audio;
}

export function playMusic(): void {
  getAudio()?.play().catch(() => undefined);
}

export function toggleMusic(): void {
  const a = getAudio();
  if (!a) return;
  if (a.paused) void a.play().catch(() => undefined);
  else a.pause();
}

export function isMusicPlaying(): boolean {
  return !!audio && !audio.paused;
}

export function onMusicChange(listener: (playing: boolean) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
