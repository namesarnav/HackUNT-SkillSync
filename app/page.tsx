// app/page.tsx
import { getSession } from '@auth0/nextjs-auth0';
import { Header } from '@/components/home/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureSection } from '@/components/home/FeatureSection';
import { Footer } from '@/components/home/Footer';

export default async function Home() {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      <Header isAuthenticated={!!session} />
      <main>
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
