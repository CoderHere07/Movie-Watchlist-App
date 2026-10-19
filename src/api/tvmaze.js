const BASE = "https://api.tvmaze.com";

function normalize(show) {
  return {
    imdbID: String(show.id), 
    Title: show.name,
    Year: show.premiered ? show.premiered.slice(0, 4) : "N/A",
    Rating: show.rating?.average ? String(show.rating.average) : "N/A",
    Poster: show.image?.medium || "N/A",
    Genre: show.genres?.join(", ") || "",
    Plot: show.summary ? show.summary.replace(/<[^>]+>/g, "") : "",
  };
}

export async function searchMovies(query, signal) {
  const res = await fetch(`${BASE}/search/shows?q=${encodeURIComponent(query)}`, { signal });
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  return data.map((item) => normalize(item.show));
}

export async function getMovieById(id, signal) {
  const res = await fetch(`${BASE}/shows/${id}`, { signal });
  if (res.status === 404) throw new Error("Movie not found");
  if (!res.ok) throw new Error("Network error");
  return normalize(await res.json());
}