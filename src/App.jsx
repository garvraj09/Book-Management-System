import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Plus, BookOpen, RefreshCw, Library } from "lucide-react";
import { useBooks } from "./hooks/useBooks";
import { useFilteredBooks } from "./hooks/useFilteredBooks";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";
import LoadingGrid from "./components/LoadingGrid";
import ErrorBanner from "./components/ErrorBanner";
import "./App.css";

export default function App() {
  const { books, loading, error, submitting, fetchBooks, addBook, updateBook, deleteBook } = useBooks();
  const {
    filtered, genres, searchQuery, setSearchQuery,
    selectedGenre, setSelectedGenre, sortBy, setSortBy,
  } = useFilteredBooks(books);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const handleSubmit = async (data) => {
    if (editingBook) {
      return await updateBook(editingBook.id, data);
    }
    return await addBook(data);
  };

  const hasFilters = Boolean(searchQuery) || selectedGenre !== "All";

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <Library size={28} className="brand-icon" />
            <div>
              <h1 className="brand-name">Bibliostack</h1>
              <p className="brand-tagline">Your personal book library</p>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="btn btn-ghost btn-sm"
              onClick={fetchBooks}
              disabled={loading}
              aria-label="Refresh"
            >
              <RefreshCw size={15} className={loading ? "spin" : ""} />
              Refresh
            </button>
            <button
              className="btn btn-primary"
              onClick={() => { setEditingBook(null); setShowForm(true); }}
            >
              <Plus size={16} />
              Add Book
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="controls">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {!loading && !error && (
            <FilterBar
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalCount={books.length}
              filteredCount={filtered.length}
            />
          )}
        </div>

        {error && <ErrorBanner message={error} onRetry={fetchBooks} />}

        {loading ? (
          <LoadingGrid />
        ) : filtered.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onAdd={() => { setEditingBook(null); setShowForm(true); }}
          />
        ) : (
          <div className="books-grid">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={deleteBook}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onClose={handleClose}
          submitting={submitting}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
          },
          success: { iconTheme: { primary: "var(--accent)", secondary: "var(--bg)" } },
        }}
      />
    </div>
  );
}
