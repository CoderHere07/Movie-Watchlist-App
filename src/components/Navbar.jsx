import { NavLink } from "react-router-dom";

export default function Navbar({ count }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" end>
        <span className="logo-icon">🎬</span>
        <span className="logo-pink">Movie</span>
        <span className="logo-lime">Watch</span>
      </NavLink>
      <div className="links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/watchlist">Watchlist ({count})</NavLink>
      </div>
    </nav>
  );
}