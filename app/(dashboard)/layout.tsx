import { Sidebar } from '@/app/components/layout/Sidebar';
import { Navbar } from '@/app/components/layout/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto ios-scroll p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}