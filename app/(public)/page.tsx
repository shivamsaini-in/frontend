import { SpaceHero } from '@/app/components/landing/SpaceHero';
import { StatsSection } from '@/app/components/landing/StatsSection';
import { FeaturesSection } from '@/app/components/landing/FeaturesSection';
import { ShowcaseSection } from '@/app/components/landing/ShowcaseSection';
import { VideoSection } from '@/app/components/landing/VideoSection';
import { TestimonialsSection } from '@/app/components/landing/TestimonialsSection';
import { CTASection } from '@/app/components/landing/CTASection';
import { Footer } from '@/app/components/landing/Footer';

export default function LandingPage() {
  return (
    <main>
      <SpaceHero />
      <StatsSection />
      <FeaturesSection />
      <ShowcaseSection />
      <VideoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
