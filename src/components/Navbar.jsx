import { NavLink } from "react-router-dom";

export default function Navbar({ count }) {
  return (
    <nav className="navbar">
      <h2>🎬 MovieWatch</h2>
      <div className="links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/watchlist">Watchlist ({count})</NavLink>
      </div>
    </nav>
  );
}