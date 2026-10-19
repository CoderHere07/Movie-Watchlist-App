import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../api/tvmaze";
import { useWatchlist } from "../context/WatchListContext";

export default function MovieDetails() {
  const { id } = useParams();
  const { customMovies, watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    if (id.startsWith("custom-")) {
      const found = customMovies.find((m) => m.imdbID === id);
      if (found) {
        setMovie(found);
        setError(null);
      } else {
        setError("Custom movie does't find (page refresh erase data)");
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getMovieById(id, controller.signal)
      .then((data) => setMovie(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id, customMovies]);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!movie) return null;

  const inList = watchlist.some((m) => m.imdbID === movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="details">
      <Link to="/">← Back</Link>
      <div className="details-body">
        {hasPoster && <img src={movie.Poster} alt={movie.Title} />}
        <div>
          <h2>{movie.Title} ({movie.Year})</h2>
          <p>⭐ {movie.Rating}</p>
          {movie.Genre && <p><b>Genre:</b> {movie.Genre}</p>}
          {movie.Plot && <p>{movie.Plot}</p>}
          {inList ? (
            <button className="danger" onClick={() => removeFromWatchlist(movie.imdbID)}>
              Remove from Watchlist
            </button>
          ) : (
            <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
          )}
        </div>
      </div>
    </div>
  );
}