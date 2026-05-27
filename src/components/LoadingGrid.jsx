export default function LoadingGrid() {
  return (
    <div className="books-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="book-card skeleton">
          <div className="book-spine skeleton-block" />
          <div className="book-content">
            <div className="skeleton-line short" />
            <div className="skeleton-line long" style={{ marginTop: 12 }} />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" style={{ marginTop: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
