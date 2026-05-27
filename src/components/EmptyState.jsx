import { BookOpen, Plus } from "lucide-react";

export default function EmptyState({ hasFilters, onAdd }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <BookOpen size={48} />
      </div>
      {hasFilters ? (
        <>
          <h3>No books match your search</h3>
          <p>Try adjusting your filters or search terms.</p>
        </>
      ) : (
        <>
          <h3>Your library is empty</h3>
          <p>Start building your collection by adding your first book.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={16} />
            Add First Book
          </button>
        </>
      )}
    </div>
  );
}
