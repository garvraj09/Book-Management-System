import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "0 12px",
      width: "100%",
    }}>
      <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or author…"
        aria-label="Search books"
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          padding: "11px 0",
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--text-primary)",
          outline: "none",
          minWidth: 0,
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            flexShrink: 0,
            padding: 0,
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}