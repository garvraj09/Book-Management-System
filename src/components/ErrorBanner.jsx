import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <AlertTriangle size={20} />
      <div className="error-text">
        <strong>Failed to load books</strong>
        <span>{message}</span>
      </div>
      <button className="btn btn-sm btn-outline" onClick={onRetry}>
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}
