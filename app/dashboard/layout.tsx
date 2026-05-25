import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar – hidden on mobile */}
      <Sidebar />

      {/* Main scrollable area */}
      <main
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
