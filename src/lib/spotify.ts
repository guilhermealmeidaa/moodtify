export async function getTopArtists(accessToken: string): Promise<string[]> {
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.statusText}`);
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((artist: any) => artist.name);
  } catch (error) {
    console.error("❌ Error fetching top artists:", error);
    return [];
  }
}
