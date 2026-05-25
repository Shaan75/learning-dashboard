"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "analytics", label: "Stats", icon: BarChart2, href: "/dashboard/analytics" },
  { id: "achievements", label: "Trophies", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex md:hidden items-center justify-around px-2 pb-safe z-30"
      style={{
        background: "rgba(13,17,23,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border-subtle)",
        height: "64px",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link key={item.id} href={item.href} className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl">
            {isActive && (
              <motion.div
                layoutId="mobile-nav-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: "rgba(57,208,216,0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              style={{ color: isActive ? "var(--accent-cyan)" : "var(--text-muted)" }}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? "var(--accent-cyan)" : "var(--text-muted)" }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
