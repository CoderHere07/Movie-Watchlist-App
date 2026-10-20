import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p className="empty">No movies found</p>;
  }
  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}