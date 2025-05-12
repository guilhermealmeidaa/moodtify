import Fuse from "fuse.js";

type SpotifyTrack = {
  uri: string;
  name: string;
  artists: { name: string }[];
};

/**
 * Tenta encontrar o URI de uma faixa usando fuzzy matching se a busca direta falhar
 */
export async function fuzzySearchTrack(
  accessToken: string,
  trackName: string,
  artistName: string
): Promise<string | null> {
  const query = encodeURIComponent(`${trackName} ${artistName}`);

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();

  const results = data?.tracks?.items;
  if (!results || results.length === 0) return null;

  const fuse = new Fuse<SpotifyTrack>(results, {
    keys: ["name", "artists.name"],
    threshold: 0.3,
    includeScore: true,
  });

  const best = fuse.search(`${trackName} ${artistName}`)[0];

  return best?.item?.uri || null;
}

/**
 * Busca uma música por nome/artista com fallback para fuzzy search se não encontrar diretamente
 */
export async function findTrackUri(
  accessToken: string,
  title: string,
  artist: string
): Promise<string | null> {
  const query = encodeURIComponent(`${title} ${artist}`);

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  const item = data?.tracks?.items?.[0];

  if (item?.uri) return item.uri;

  // fallback para fuzzy
  return fuzzySearchTrack(accessToken, title, artist);
}

/**
 * Cria playlist no Spotify com validação de músicas via busca + fuzzy fallback
 */
export async function generateSpotifyPlaylist({
  accessToken,
  playlistName,
  description,
  tracks,
}: {
  accessToken: string;
  playlistName: string;
  description: string;
  tracks: { title: string; artist: string }[];
}): Promise<{ success: boolean; playlistUrl?: string }> {
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
    const uri = await findTrackUri(accessToken, title, artist);
    if (uri) uris.push(uri);
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
