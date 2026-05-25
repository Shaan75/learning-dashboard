"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(247,129,102,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative flex flex-col items-center gap-4 max-w-md text-center p-8 rounded-2xl border"
        style={{
          background: "var(--bg-surface)",
          borderColor: "rgba(247,129,102,0.3)",
        }}
      >
        <div
          className="flex items-center justify-center w-14 h-14 rounded-xl"
          style={{ background: "rgba(247,129,102,0.1)" }}
        >
          <AlertTriangle
            size={24}
            style={{ color: "var(--accent-orange)" }}
          />
        </div>

        <div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Database Connection Failed
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Could not reach Supabase. Check your environment variables and try
            again.
          </p>
          {error.message && (
            <p
              className="mt-3 text-xs px-3 py-2 rounded-lg font-mono"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--accent-orange)",
              }}
            >
              {error.message}
            </p>
          )}
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{
            background: "rgba(247,129,102,0.15)",
            color: "var(--accent-orange)",
            border: "1px solid rgba(247,129,102,0.3)",
          }}
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      </div>
    </div>
  );
}
