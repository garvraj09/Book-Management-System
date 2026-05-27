import { SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest", label: "Recently Added" },
  { value: "title", label: "Title A–Z" },
  { value: "author", label: "Author A–Z" },
  { value: "year_desc", label: "Newest Year" },
  { value: "year_asc", label: "Oldest Year" },
];

export default function FilterBar({
  genres,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-left">
        <SlidersHorizontal size={15} className="filter-icon" />
        <div className="genre-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-chip ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => onGenreChange(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-right">
        <span className="result-count">
          {filteredCount === totalCount
            ? `${totalCount} book${totalCount !== 1 ? "s" : ""}`
            : `${filteredCount} of ${totalCount}`}
        </span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort books"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
