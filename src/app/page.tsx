import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import AboutSection from '@/components/AboutSection';
import FullWidthPhoto from '@/components/FullWidthPhoto';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsSection from '@/components/NewsSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <FullWidthPhoto />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <FooterSection />
    </>
  );
}
