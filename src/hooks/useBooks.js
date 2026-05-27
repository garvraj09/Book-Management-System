import { useState, useEffect, useCallback } from "react";
import { booksApi } from "../services/api";
import toast from "react-hot-toast";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await booksApi.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = useCallback(async (bookData) => {
    try {
      setSubmitting(true);
      const { data } = await booksApi.create(bookData);
      setBooks((prev) => [data, ...prev]);
      toast.success("Book added successfully!");
      return { success: true };
    } catch (err) {
      toast.error(`Failed to add book: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setSubmitting(false);
    }
  }, []);

  const updateBook = useCallback(async (id, bookData) => {
    try {
      setSubmitting(true);
      const { data } = await booksApi.update(id, bookData);
      setBooks((prev) => prev.map((b) => (b.id === id ? data : b)));
      toast.success("Book updated successfully!");
      return { success: true };
    } catch (err) {
      toast.error(`Failed to update book: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setSubmitting(false);
    }
  }, []);

  const deleteBook = useCallback(async (id) => {
    try {
      await booksApi.delete(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Book removed from library.");
      return { success: true };
    } catch (err) {
      toast.error(`Failed to delete book: ${err.message}`);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    books,
    loading,
    error,
    submitting,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  };
}
