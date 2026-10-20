import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext.jsx";

export default function MovieCard({ movie }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inList = watchlist.some((m) => m.imdbID === movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";
  const hasRating = movie.Rating && movie.Rating !== "N/A";

  return (
    <div className="card">
      {hasPoster ? (
        <img src={movie.Poster} alt={movie.Title} />
      ) : (
        <div className="no-poster">No Poster</div>
      )}
      <h3>{movie.Title}</h3>
      <p>
        {movie.Year}
        {hasRating ? ` • ⭐ ${movie.Rating}` : ""}
      </p>
      <div className="card-actions">
        <Link to={`/movie/${movie.imdbID}`}>Details</Link>
        {inList ? (
          <button className="danger" onClick={() => removeFromWatchlist(movie.imdbID)}>
            Remove
          </button>
        ) : (
          <button onClick={() => addToWatchlist(movie)}>+ Watchlist</button>
        )}
      </div>
    </div>
  );
}