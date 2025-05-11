type TrackSuggestion = {
  title: string;
  artist: string;
};

type GeneratePlaylistOptions = {
  accessToken: string;
  playlistName: string;
  description: string;
  tracks: TrackSuggestion[];
};

export async function generateSpotifyPlaylist({
  accessToken,
  playlistName,
  description,
  tracks,
}: GeneratePlaylistOptions): Promise<{
  success: boolean;
  playlistUrl?: string;
}> {
  const userRes = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!userRes.ok) return { success: false };
  const user = await userRes.json();

  const createRes = await fetch(
    `https://api.spotify.com/v1/users/${user.id}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName,
        description,
        public: false,
      }),
    }
  );

  if (!createRes.ok) return { success: false };
  const playlist = await createRes.json();

  const uris: string[] = [];

  for (const { title, artist } of tracks) {
    const query = encodeURIComponent(`${title} ${artist}`);
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!searchRes.ok) continue;

    const data = await searchRes.json();
    const item = data.tracks.items[0];
    if (item?.uri) uris.push(item.uri);
  }

  if (uris.length > 0) {
    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris }),
    });
  }

  return { success: true, playlistUrl: playlist.external_urls.spotify };
}
