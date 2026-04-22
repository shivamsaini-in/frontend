import { LandingNav } from '@/app/components/landing/LandingNav';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-white ios-scroll">
      <LandingNav />
      {children}
    </div>
  );
}
