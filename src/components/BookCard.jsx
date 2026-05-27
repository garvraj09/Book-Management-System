import { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { getGenreColor, truncate } from "../utils/constants";

export default function BookCard({ book, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Remove "${book.title}" from your library?`)) return;
    setDeleting(true);
    await onDelete(book.id);
    setDeleting(false);
  };

  const genreColor = getGenreColor(book.genre);
  const hasDescription = Boolean(book.description?.trim());

  return (
    <article className={`book-card ${deleting ? "deleting" : ""}`}>
      <div
        className="book-spine"
        style={{ background: book.coverColor || "#6B7FF0" }}
        aria-hidden="true"
      >
        <span className="spine-title">{book.title}</span>
      </div>

      <div className="book-content">
        <div className="book-meta-top">
          <span
            className="genre-badge"
            style={{ background: genreColor + "22", color: genreColor }}
          >
            {book.genre || "Unknown"}
          </span>
          <span className="book-year">{book.year || "—"}</span>
        </div>

        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>

        {hasDescription && (
          <div className="book-description-wrapper">
            <p className="book-description">
              {expanded ? book.description : truncate(book.description, 80)}
            </p>
            {book.description.length > 80 && (
              <button
                className="expand-btn"
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? "Show less" : "Show more"}
              >
                {expanded ? (
                  <><ChevronUp size={14} /> Less</>
                ) : (
                  <><ChevronDown size={14} /> More</>
                )}
              </button>
            )}
          </div>
        )}

        <div className="book-actions">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => onEdit(book)}
            aria-label={`Edit ${book.title}`}
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
            disabled={deleting}
            aria-label={`Delete ${book.title}`}
          >
            <Trash2 size={14} />
            {deleting ? "Removing…" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
