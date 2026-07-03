import { SidebarNav } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-border bg-card lg:block">
        <SidebarNav />
      </aside>
      <div className="flex min-h-screen w-full flex-col lg:pl-64">{children}</div>
    </div>
  );
}
