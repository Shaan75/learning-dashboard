"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col flex-shrink-0 h-full overflow-hidden z-20"
      style={{
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 h-16 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
          }}
        >
          <Zap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="font-bold text-base tracking-tight whitespace-nowrap overflow-hidden"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link key={item.id} href={item.href} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(57,208,216,0.12), rgba(163,113,247,0.08))",
                    border: "1px solid rgba(57,208,216,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150"
                style={{
                  color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                }}
              >
                <Icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        className="p-2 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2.5 rounded-lg transition-colors hover:bg-white/5"
          style={{ color: "var(--text-muted)" }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.nav>
  );
}
