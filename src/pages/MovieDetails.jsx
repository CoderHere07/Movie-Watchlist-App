import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieDetails() {
  const { id } = useParams();
  const { customMovies, watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id.startsWith("custom-")) {
      const found = customMovies.find((m) => m.imdbID === id);
      if (found) {
        setMovie(found);
        setError(null);
      } else {
        setError("Custom movie not found (page refresh clear data )");
      }
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    getMovieById(id)
      .then((data) => {
        if (!ignore) setMovie(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true; 
    };
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