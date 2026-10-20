const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

function normalize(m) {
  return {
    imdbID: String(m.id),
    Title: m.title,
    Year: m.release_date ? m.release_date.slice(0, 4) : "N/A",
    Rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
    Poster: m.poster_path ? `${IMG_URL}${m.poster_path}` : "N/A",
    Genre: m.genres ? m.genres.map((g) => g.name).join(", ") : "",
    Plot: m.overview || "",
  };
}

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}`);
  if (res.status === 401) throw new Error("Invalid API key");
  if (res.status === 404) throw new Error("Movie not found");
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

export async function getPopularMovies(page = 1) {
  const data = await request(`/movie/popular?page=${page}`);
  return data.results.map(normalize);
}

export async function searchMovies(query) {
  const data = await request(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results.map(normalize);
}

export async function getMovieById(id) {
  const data = await request(`/movie/${id}`);
  return normalize(data);
}