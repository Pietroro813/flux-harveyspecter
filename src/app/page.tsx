import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import AboutSection from '@/components/AboutSection';
import FullWidthPhoto from '@/components/FullWidthPhoto';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsSection from '@/components/NewsSection';
import FooterSection from '@/components/FooterSection';
import StickyNav from '@/components/StickyNav';

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <div id="fullwidthphoto"><FullWidthPhoto /></div>
        <div id="services"><ServicesSection /></div>
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <div id="footer"><FooterSection /></div>
    </>
  );
}
