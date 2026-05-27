export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Science",
  "Self-Help",
  "Poetry",
  "Children",
  "Graphic Novel",
  "Other",
];

export const CURRENT_YEAR = new Date().getFullYear();
export const MIN_YEAR = 1000;

export function getGenreColor(genre) {
  const map = {
    Fiction: "#6B7FF0",
    "Non-Fiction": "#F0A86B",
    "Science Fiction": "#6BE8F0",
    Fantasy: "#C46BF0",
    Mystery: "#F06B6B",
    Thriller: "#F06BA8",
    Romance: "#F06B8A",
    Horror: "#8AF06B",
    Biography: "#F0D36B",
    History: "#A8A06B",
    Science: "#6BF0C4",
    "Self-Help": "#F0C46B",
    Poetry: "#F096B0",
    Children: "#96F06B",
    "Graphic Novel": "#6B96F0",
    Other: "#A0A0A0",
  };
  return map[genre] || "#A0A0A0";
}

export function truncate(str, len = 60) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}
