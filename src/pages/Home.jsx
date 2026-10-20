import { useEffect, useMemo, useState } from "react";
import { getPopularMovies, searchMovies } from "../api/tmdb";
import { useWatchlist } from "../context/WatchListContext";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import AddMovieForm from "../components/AddMovieForm";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [popularLoading, setPopularLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const { customMovies } = useWatchlist();

  const query = search.trim();

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setPopularLoading(true);
        setError(null);
        const [p1, p2] = await Promise.all([
          getPopularMovies(controller.signal, 1),
          getPopularMovies(controller.signal, 2),
        ]);
        setPopular([...p1, ...p2]);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setPopularLoading(false);
      }
    }
    load();

    return () => controller.abort();
  }, []);

  
  useEffect(() => {
    if (!query) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    setError(null);
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query, controller.signal);
        setResults(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  
  const movies = useMemo(() => {
    const q = query.toLowerCase();
    const customMatches = q
      ? customMovies.filter((m) => m.Title.toLowerCase().includes(q))
      : customMovies;
    const apiList = q ? results : popular;
    return [...customMatches, ...apiList];
  }, [customMovies, popular, results, query]);

  const loading = query ? searching : popularLoading;

  return (
    <div>
      <AddMovieForm />
      <SearchBar value={search} onChange={setSearch} />
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">Error: {error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}