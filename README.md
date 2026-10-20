# 🎬 Movie Watchlist

A React app to browse popular movies, search the full TMDB catalog, add your own custom movies, and manage a global watchlist that persists across sessions.

## Features

- Popular movies loaded on app start, with loading and error states
- Debounced search across the full TMDB catalog
- Movie details page with poster, rating, genres and plot
- Global watchlist (add/remove from any page) saved in localStorage
- "Add Custom Movie" form with validation (title, year, rating)
- Empty state ("No movies found") and 404 page
- Search input auto-focus on page load

## Tech Stack

- React + Vite
- React Router
- Context API
- TMDB API

## React Concepts Used

| Concept | Where |
|---|---|
| Components + props | `Navbar`, `SearchBar`, `MovieCard`, `MovieList` |
| `useState` | Movies, search text, form state, watchlist |
| `useEffect` (fetch, loading/error, cleanup) | `Home`, `MovieDetails` |
| `map()` with keys + conditional rendering | `MovieList` |
| Controlled form + validation | `AddMovieForm` |
| React Router (3 pages) | `/`, `/movie/:id`, `/watchlist` |
| Context API | `WatchlistContext` |
| `useRef` | Auto-focus in `SearchBar` |
| `useMemo` | Merged/filtered movie list, watchlist count |
| `useCallback` | `addToWatchlist`, `removeFromWatchlist` |

## Project Structure

```
src/
├── api/tmdb.js
├── context/WatchlistContext.jsx
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── MovieCard.jsx
│   ├── MovieList.jsx
│   └── AddMovieForm.jsx
├── pages/
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   └── Watchlist.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

1. Clone the repo
```bash
   git clone https://github.com/CoderHere07/movie-watchlist.git
   cd movie-watchlist
```

2. Install dependencies
```bash
   npm install
```

3. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api) and create a `.env` file in the project root:
```
   VITE_TMDB_KEY=your_api_key_here
```

4. Start the dev server
```bash
   npm run dev
```

## Known Limitations

- Custom movies are stored in memory only and are cleared on page refresh (the watchlist itself is saved in localStorage).

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.