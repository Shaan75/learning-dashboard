"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

function generateActivity() {
  const weeks = 16;
  const days: { count: number; date: string }[] = [];
  const today = new Date();
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const rand = Math.random();
    const count = rand > 0.55 ? Math.floor(Math.random() * 5) + 1 : 0;
    days.push({ count, date: d.toISOString().split("T")[0] });
  }
  return days;
}

function getColor(count: number): string {
  if (count === 0) return "var(--bg-elevated)";
  if (count === 1) return "rgba(57,208,216,0.2)";
  if (count === 2) return "rgba(57,208,216,0.4)";
  if (count === 3) return "rgba(57,208,216,0.6)";
  return "rgba(57,208,216,0.9)";
}

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export function ActivityTile() {
  const [activity, setActivity] = useState<{ count: number; date: string }[]>([]);

useEffect(() => {
  setActivity(generateActivity());
}, []);
  const totalContributions = activity.filter((d) => d.count > 0).length;
  const weeks = Array.from({ length: 16 }, (_, wi) => activity.slice(wi * 7, wi * 7 + 7));

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-5 grain"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 100% 100%, rgba(63,185,80,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-lg"
              style={{ background: "rgba(63,185,80,0.1)" }}
            >
              <Activity size={14} style={{ color: "var(--accent-green)" }} />
            </div>
            <h2
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              Learning Activity
            </h2>
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {totalContributions} active days
          </span>
        </div>

        {/* Graph */}
        <div className="flex gap-1 items-start overflow-x-auto pb-1">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-1 mt-0.5">
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="h-[10px] flex items-center"
                style={{ color: "var(--text-muted)", fontSize: "9px" }}
              >
                {label}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.3 + wi * 0.025 + di * 0.005,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  title={`${day.date}: ${day.count} lessons`}
                  className="w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-transform hover:scale-125"
                  style={{ background: getColor(day.count) }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>Less</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div
              key={v}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ background: getColor(v) }}
            />
          ))}
          <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>More</span>
        </div>
      </div>
    </motion.article>
  );
}
