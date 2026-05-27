import { useState, useMemo } from "react";

export function useFilteredBooks(books) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const genres = useMemo(() => {
    const set = new Set(books.map((b) => b.genre).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [books]);

  const filtered = useMemo(() => {
    let result = [...books];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q)
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter((b) => b.genre === selectedGenre);
    }

    switch (sortBy) {
      case "title":
        result.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      case "author":
        result.sort((a, b) => a.author?.localeCompare(b.author));
        break;
      case "year_asc":
        result.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "year_desc":
        result.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "newest":
      default:
        // Keep API order (newest first by default)
        break;
    }

    return result;
  }, [books, searchQuery, selectedGenre, sortBy]);

  return {
    filtered,
    genres,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
  };
}
