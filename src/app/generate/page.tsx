"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { getTopArtists } from "@/lib/spotify";
import { Button } from "@/components/ui/button";
import { MoodInputList } from "@/components/moodInputList";
import { parseAiResponse } from "@/lib/utils";
import { generateSpotifyPlaylist } from "@/lib/spotify-playlist";

export default function GeneratePage() {
  const { data: session } = useSession();
  const [moods, setMoods] = useState(["", "", ""]);
  const [loadingStep, setLoadingStep] = useState<
    null | "ai" | "tracks" | "playlist"
  >(null);
  const [response, setResponse] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!session?.accessToken) return;

    const cleanedMoods = moods
      .map((m) => m.trim().toLowerCase())
      .filter((m, i, arr) => m && arr.indexOf(m) === i);

    if (cleanedMoods.length === 0) return;

    setLoadingStep("ai");
    setResponse("");
    setPlaylistUrl(null);

    const artists = await getTopArtists(session.accessToken);
    if (artists.length === 0) {
      setLoadingStep(null);
      return;
    }

    const prompt = `
      Crie uma playlist baseada nos sentimentos: ${cleanedMoods.join(", ")}.
      Artistas favoritos do usuário: ${artists.join(", ")}.
      Retorne:
      - Um nome de playlist
      - Uma descrição de até 25 palavras
      - Uma lista com 20 músicas no formato: "Nome da música - Nome do artista"
    `;

    const aiResponse = await fetch("/api/generate-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    }).then((res) => res.json());

    setResponse(aiResponse.result);
    setLoadingStep("tracks");
    const aiData = parseAiResponse(aiResponse.result);

    const result = await generateSpotifyPlaylist({
      accessToken: session.accessToken,
      playlistName: aiData.playlistName,
      description: aiData.description,
      tracks: aiData.tracks,
    });

    setPlaylistUrl(result.success ? result.playlistUrl || null : null);
    setLoadingStep(null);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-[#F8FAFC] text-[#1E293B]">
      <h1 className="text-3xl md:text-4xl font-bold text-[#5147CF] mb-2 text-center">
        Describe your mood
      </h1>
      <p className="text-sm md:text-base text-[#2C296F] tracking-tight font-sans mt-2 mb-6">
        Enter one mood per field.
      </p>

      {!playlistUrl && !response && (
        <>
          <MoodInputList moods={moods} setMoods={setMoods} />

          <Button
            onClick={handleGenerate}
            disabled={loadingStep !== null || !moods.some((m) => m.trim())}
            className="mt-6"
          >
            {loadingStep ? "Generating..." : "Generate Playlist"}
          </Button>
        </>
      )}

      {loadingStep && (
        <div className="mt-8 max-w-xl text-center">
          <Button disabled>🎧 Criando Playlist...</Button>
        </div>
      )}

      {!loadingStep && (
        <div className="mt-8 max-w-xl text-center">
          {playlistUrl ? (
            <>
              <Button asChild>
                <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
                  🎧 Ver Playlist no Spotify
                </a>
              </Button>
              <Button
                onClick={handleReset}
                variant="ghost"
                className="mt-4 text-[#5147CF]"
              >
                🔁 Fazer outra playlist
              </Button>
            </>
          ) : response ? (
            <p className="text-sm text-red-500 font-medium">
              ❌ Não foi possível criar a playlist.
            </p>
          ) : null}
        </div>
      )}

      {response && (
        <div className="mt-10 max-w-xl text-center p-4 border border-[#CBD5E1] bg-white rounded-lg shadow">
          <h2 className="font-bold text-lg text-[#5147CF] mb-2">
            AI Suggestion:
          </h2>
          <p className="text-sm whitespace-pre-line">{response}</p>
        </div>
      )}
    </main>
  );
}
