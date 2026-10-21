import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThreadsBackground from "./components/ThreadsBackground";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import { useWatchlist } from "./context/WatchlistContext";

export default function App() {
  const { watchlistCount } = useWatchlist();
  return (
    <>
      <ThreadsBackground />
      <Navbar count={watchlistCount} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<p className="empty">Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}