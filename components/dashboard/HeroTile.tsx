"use client";

import { motion } from "framer-motion";
import { Flame, Star, GraduationCap } from "lucide-react";

const STREAK = 14;

export function HeroTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-6 h-48 flex flex-col justify-between grain"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at -10% 50%, rgba(57,208,216,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 110% 50%, rgba(163,113,247,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,208,216,1) 1px, transparent 1px), linear-gradient(90deg, rgba(57,208,216,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <div>
          <p
            className="text-xs font-medium mb-1 tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Good morning
          </p>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            Welcome back, Shaunak
          </h1>
        </div>

        <div
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ background: "rgba(57,208,216,0.1)", border: "1px solid rgba(57,208,216,0.2)" }}
        >
          <GraduationCap size={20} style={{ color: "var(--accent-cyan)" }} />
        </div>
      </div>

      {/* Bottom row – streak */}
      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
            Keep it up! You&apos;re on a learning roll.
          </p>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const active = i < Math.min(STREAK, 7);
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, rgba(57,208,216,0.3), rgba(163,113,247,0.2))"
                      : "var(--bg-elevated)",
                    border: `1px solid ${active ? "rgba(57,208,216,0.4)" : "var(--border-subtle)"}`,
                  }}
                >
                  {active && (
                    <Flame size={12} style={{ color: "var(--accent-cyan)" }} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(57,208,216,0.1)",
            border: "1px solid rgba(57,208,216,0.25)",
          }}
        >
          <Flame size={14} style={{ color: "var(--accent-cyan)" }} />
          <span
            className="text-sm font-bold"
            style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-display)" }}
          >
            {STREAK} day streak
          </span>
        </div>
      </div>
    </motion.article>
  );
}
