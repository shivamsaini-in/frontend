'use client';
import { useState } from 'react';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { Navbar } from '@/app/components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto ios-scroll p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
