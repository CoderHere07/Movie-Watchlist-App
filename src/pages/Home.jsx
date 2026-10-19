import { useEffect, useMemo, useState } from "react";
import { getPopularMovies } from "../api/tmdb";
import { useWatchlist } from "../context/WatchListContext";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import AddMovieForm from "../components/AddMovieForm";

export default function Home() {
  const [apiMovies, setApiMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customMovies } = useWatchlist();

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
    try {
        setLoading(true);
        setError(null);
        const [p1, p2] = await Promise.all([
        getPopularMovies(controller.signal, 1),
        getPopularMovies(controller.signal, 2),
        ]);
        setApiMovies([...p1, ...p2]);
    } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
    } finally {
        if (!controller.signal.aborted) setLoading(false);
    }
    }
    load();

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const all = [...customMovies, ...apiMovies];
    const q = search.trim().toLowerCase();
    return q ? all.filter((m) => m.Title.toLowerCase().includes(q)) : all;
  }, [apiMovies, customMovies, search]);

  return (
    <div>
      <AddMovieForm />
      <SearchBar value={search} onChange={setSearch} />
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">Error: {error}</p>}
      {!loading && !error && <MovieList movies={filtered} />}
    </div>
  );
}