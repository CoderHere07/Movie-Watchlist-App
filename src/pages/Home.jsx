import { useEffect, useMemo, useState } from "react";
import { getPopularMovies, searchMovies } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext";
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
    let ignore = false;

    async function load() {
      try {
        setPopularLoading(true);
        setError(null);
        const [p1, p2] = await Promise.all([getPopularMovies(1), getPopularMovies(2)]);
        if (!ignore) setPopular([...p1, ...p2]);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setPopularLoading(false);
      }
    }
    load();

    return () => {
      ignore = true;
    };
  }, []);

  
  useEffect(() => {
    if (!query) {
      setResults([]);
      setSearching(false);
      return;
    }

    let ignore = false;
    setSearching(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        if (!ignore) setResults(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setSearching(false);
      }
    }, 500);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [query]);

  
  const movies = useMemo(() => {
    const q = query.toLowerCase();
    const customMatches = q
      ? customMovies.filter((m) => m.Title.toLowerCase().includes(q))
      : customMovies;
    return [...customMatches, ...(q ? results : popular)];
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