import { useState } from "react";
import { useWatchlist } from "../context/WatchListContext";

const initial = { title: "", year: "", rating: "" };

export default function AddMovieForm() {
  const { addCustomMovie } = useWatchlist();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    const thisYear = new Date().getFullYear();
    if (form.title.trim().length < 2) errs.title = "Title atleast consist 2 characters";
    const y = Number(form.year);
    if (!Number.isInteger(y) || y < 1888 || y > thisYear + 1)
      errs.year = `Year must btw 1888 to ${thisYear + 1} `;
    const r = Number(form.rating);
    if (form.rating === "" || Number.isNaN(r) || r < 0 || r > 10)
      errs.rating = "Rating must btw 0 to 10";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    addCustomMovie({
      imdbID: `custom-${Date.now()}`,
      Title: form.title.trim(),
      Year: form.year,
      Rating: Number(form.rating).toFixed(1),
      Poster: "N/A",
      isCustom: true,
    });
    setForm(initial);
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3>Add Custom Movie</h3>
      <div>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        {errors.title && <small className="error">{errors.title}</small>}
      </div>
      <div>
        <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} />
        {errors.year && <small className="error">{errors.year}</small>}
      </div>
      <div>
        <input name="rating" type="number" step="0.1" placeholder="Rating (0-10)" value={form.rating} onChange={handleChange} />
        {errors.rating && <small className="error">{errors.rating}</small>}
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
}