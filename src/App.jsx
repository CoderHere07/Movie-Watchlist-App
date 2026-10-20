import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import { useWatchlist } from "./context/WatchlistContext.jsx";

export default function App() {
  const { watchlistCount } = useWatchlist();
  return (
    <>
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
