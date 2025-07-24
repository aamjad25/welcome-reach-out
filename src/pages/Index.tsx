import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductCarousel } from '@/components/ProductCarousel';
import { KeyAdvantages } from '@/components/KeyAdvantages';
import { NewsAnnouncements } from '@/components/NewsAnnouncements';
import { CaseStudies } from '@/components/CaseStudies';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <section id="products">
        <ProductCarousel />
      </section>
      <section id="advantages">
        <KeyAdvantages />
      </section>
      <section id="news">
        <NewsAnnouncements />
      </section>
      <section id="case-studies">
        <CaseStudies />
      </section>
    </div>
  );
};

export default Index;
