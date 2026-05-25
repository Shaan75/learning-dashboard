"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { HeroTile } from "./HeroTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";
import { StatsTile } from "./StatsTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {/* Hero tile – spans full width on mobile, 2 cols on md, 2 cols on lg */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2">
        <HeroTile />
      </motion.div>

      {/* Activity tile */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <ActivityTile />
      </motion.div>

      {/* Stats tiles */}
      <motion.div variants={itemVariants} className="col-span-1">
        <StatsTile label="Streak" value="14" unit="days" accent="cyan" icon="flame" />
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1">
        <StatsTile label="Total XP" value="4,820" unit="pts" accent="purple" icon="star" />
      </motion.div>

      {/* Course cards */}
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants} className="col-span-1">
          <CourseCard course={course} />
        </motion.div>
      ))}

      {/* Fallback if no courses */}
      {courses.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 flex items-center justify-center p-8 rounded-2xl"
          style={{
            background: "var(--bg-surface)",
            border: "1px dashed var(--border-default)",
            color: "var(--text-secondary)",
          }}
        >
          <p className="text-sm">No courses found. Add some rows to your Supabase table.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
