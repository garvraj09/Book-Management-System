import { useState, useEffect } from "react";
import { X, BookOpen, Loader } from "lucide-react";
import { GENRES, CURRENT_YEAR, MIN_YEAR } from "../utils/constants";

const EMPTY_FORM = {
  title: "",
  author: "",
  genre: "",
  year: "",
  description: "",
  coverColor: "#6B7FF0",
};

export default function BookForm({ book, onSubmit, onClose, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        year: book.year || "",
        description: book.description || "",
        coverColor: book.coverColor || "#6B7FF0",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [book]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.author.trim()) errs.author = "Author is required";
    if (!form.genre) errs.genre = "Genre is required";
    if (!form.year) {
      errs.year = "Year is required";
    } else {
      const y = Number(form.year);
      if (isNaN(y) || y < MIN_YEAR || y > CURRENT_YEAR) {
        errs.year = `Year must be between ${MIN_YEAR} and ${CURRENT_YEAR}`;
      }
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const result = await onSubmit({ ...form, year: Number(form.year) });
    if (result?.success) onClose();
  };

  const isEdit = Boolean(book);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title-row">
            <BookOpen size={20} />
            <h2>{isEdit ? "Edit Book" : "Add New Book"}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="book-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Book title"
                className={errors.title ? "error" : ""}
                autoFocus
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                id="author"
                name="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
                className={errors.author ? "error" : ""}
              />
              {errors.author && <span className="field-error">{errors.author}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre">Genre *</label>
              <select
                id="genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className={errors.genre ? "error" : ""}
              >
                <option value="">Select a genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.genre && <span className="field-error">{errors.genre}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="year">Publication Year *</label>
              <input
                id="year"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder={`e.g. ${CURRENT_YEAR}`}
                min={MIN_YEAR}
                max={CURRENT_YEAR}
                className={errors.year ? "error" : ""}
              />
              {errors.year && <span className="field-error">{errors.year}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description of the book (optional)"
              rows={3}
            />
          </div>

          <div className="form-group color-group">
            <label htmlFor="coverColor">Cover Color</label>
            <div className="color-picker-row">
              <input
                id="coverColor"
                name="coverColor"
                type="color"
                value={form.coverColor}
                onChange={handleChange}
                className="color-input"
              />
              <div
                className="color-preview"
                style={{ background: form.coverColor }}
              >
                <span>Preview</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader size={16} className="spin" />
                  {isEdit ? "Saving…" : "Adding…"}
                </>
              ) : (
                isEdit ? "Save Changes" : "Add Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
