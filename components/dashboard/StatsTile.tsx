"use client";

import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";

interface StatsTileProps {
  label: string;
  value: string;
  unit: string;
  accent: "cyan" | "purple" | "green" | "orange";
  icon: "flame" | "star";
}

const ACCENT_MAP = {
  cyan: { color: "var(--accent-cyan)", bg: "rgba(57,208,216,0.1)", glow: "rgba(57,208,216,0.2)" },
  purple: { color: "var(--accent-purple)", bg: "rgba(163,113,247,0.1)", glow: "rgba(163,113,247,0.2)" },
  green: { color: "var(--accent-green)", bg: "rgba(63,185,80,0.1)", glow: "rgba(63,185,80,0.2)" },
  orange: { color: "var(--accent-orange)", bg: "rgba(247,129,102,0.1)", glow: "rgba(247,129,102,0.2)" },
};

export function StatsTile({ label, value, unit, accent, icon }: StatsTileProps) {
  const colors = ACCENT_MAP[accent];
  const Icon = icon === "flame" ? Flame : Star;

  return (
    <motion.article
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 20px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-5 h-32 flex flex-col justify-between grain"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 110% 110%, ${colors.bg} 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative flex items-center justify-center w-9 h-9 rounded-xl"
        style={{ background: colors.bg }}
      >
        <Icon size={18} style={{ color: colors.color }} />
      </div>

      <div className="relative">
        <div
          className="text-2xl font-bold leading-none"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          {value}
          <span className="text-xs font-normal ml-1" style={{ color: "var(--text-muted)" }}>
            {unit}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
          {label}
        </p>
      </div>
    </motion.article>
  );
}
