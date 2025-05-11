import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type TrackSuggestion = {
  title: string;
  artist: string;
};

type ParsedAIResult = {
  playlistName: string;
  description: string;
  tracks: TrackSuggestion[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAiResponse(text: string): ParsedAIResult {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let playlistName = "";
  let description = "";
  const tracks: TrackSuggestion[] = [];

  for (const line of lines) {
    if (line.toLowerCase().startsWith("nome da playlist:")) {
      playlistName = line.split(":")[1]?.trim() || "";
    } else if (line.toLowerCase().startsWith("descrição:")) {
      description = line.split(":")[1]?.trim() || "";
    } else if (/^\d+\.\s/.test(line)) {
      // Ex: "1. Liability - Lorde"
      const trackLine = line.replace(/^\d+\.\s*/, "");
      const [titlePart, ...artistParts] = trackLine.split(" - ");
      if (titlePart && artistParts.length > 0) {
        tracks.push({
          title: titlePart.trim(),
          artist: artistParts.join(" - ").trim(), // mantém "feat." ou "&"
        });
      }
    }
  }

  return { playlistName, description, tracks };
}
