"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

// Map icon_name from DB to Lucide component
function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  const iconKey = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;

  const Icon = (LucideIcons[iconKey] as React.ElementType) ?? LucideIcons.BookOpen;
  return <Icon size={size} />;
}

const ACCENT_COLORS: Record<number, { bg: string; glow: string; bar: string }> = {
  0: {
    bg: "rgba(57,208,216,0.08)",
    glow: "rgba(57,208,216,0.25)",
    bar: "linear-gradient(90deg, #39D0D8, #58A6FF)",
  },
  1: {
    bg: "rgba(163,113,247,0.08)",
    glow: "rgba(163,113,247,0.25)",
    bar: "linear-gradient(90deg, #A371F7, #39D0D8)",
  },
  2: {
    bg: "rgba(63,185,80,0.08)",
    glow: "rgba(63,185,80,0.25)",
    bar: "linear-gradient(90deg, #3FB950, #58A6FF)",
  },
  3: {
    bg: "rgba(247,129,102,0.08)",
    glow: "rgba(247,129,102,0.25)",
    bar: "linear-gradient(90deg, #F78166, #A371F7)",
  },
};

export function CourseCard({ course }: CourseCardProps) {
  const colorIdx = Math.abs(course.title.charCodeAt(0)) % 4;
  const colors = ACCENT_COLORS[colorIdx];

  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress bar from 0 to course.progress
    const bar = progressBarRef.current;
    if (!bar) return;
    const timeout = setTimeout(() => {
      bar.style.width = `${course.progress}%`;
    }, 100);
    return () => clearTimeout(timeout);
  }, [course.progress]);

  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 24px ${colors.glow}, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-5 h-44 flex flex-col justify-between grain group cursor-pointer"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 0% 0%, ${colors.bg} 0%, transparent 70%)`,
        }}
      />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          boxShadow: `inset 0 0 0 1px ${colors.glow}`,
        }}
      />

      {/* Icon */}
      <div
        className="relative flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
        style={{ background: colors.bg, color: colors.glow.replace("0.25", "1") }}
      >
        <DynamicIcon name={course.icon_name} size={18} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-2">
        <h3
          className="text-sm font-semibold leading-tight line-clamp-2"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          {course.title}
        </h3>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Progress
            </span>
            <span
              className="text-[10px] font-bold font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              {course.progress}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--bg-elevated)" }}
          >
            <div
              ref={progressBarRef}
              className="h-full rounded-full transition-[width] duration-1000 ease-out"
              style={{ background: colors.bar, width: "0%" }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
