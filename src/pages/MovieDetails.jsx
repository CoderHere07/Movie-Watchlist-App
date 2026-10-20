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