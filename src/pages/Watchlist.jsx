import MovieList from "../components/MovieList";
import { useWatchlist } from "../context/WatchListContext";

export default function Watchlist() {
  const { watchlist, watchlistCount } = useWatchlist();
  return (
    <div>
      <h2>My Watchlist ({watchlistCount})</h2>
      <MovieList movies={watchlist} />
    </div>
  );
}