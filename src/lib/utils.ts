import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAiResponse(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const playlistName = lines[0] || "";
  const description = lines[1] || "";
  const tracks: { title: string; artist: string }[] = [];

  for (let i = 2; i < lines.length; i++) {
    const match = lines[i].match(/(.+?)\s+-\s+(.+)/);
    if (match) {
      tracks.push({
        title: match[1].trim(),
        artist: match[2].trim(),
      });
    }
  }

  return { playlistName, description, tracks };
}
