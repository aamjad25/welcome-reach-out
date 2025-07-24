import { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const newsItems = [
  {
    id: 1,
    date: "2024-01-15",
    headline: "Revolutionary 4K Streaming Technology Launched",
    preview: "Our latest breakthrough in video compression delivers 40% better quality while reducing bandwidth requirements by 30%.",
    category: "Product Launch"
  },
  {
    id: 2,
    date: "2024-01-10",
    headline: "Partnership with Global Fiber Network Providers",
    preview: "Strategic partnerships expand our reach to over 50 countries, enabling seamless global video distribution.",
    category: "Partnership"
  },
  {
    id: 3,
    date: "2024-01-05",
    headline: "AI-Powered Video Analytics Now Available",
    preview: "Intelligent content analysis and automated quality optimization help businesses reduce operational costs.",
    category: "Feature Update"
  },
  {
    id: 4,
    date: "2024-01-01",
    headline: "99.99% Uptime Achievement Recognition",
    preview: "Industry-leading reliability standards recognized by International Broadcasting Association.",
    category: "Achievement"
  }
];

export function NewsAnnouncements() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, index * 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-accent">
              News & Announcements
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest developments, product launches, and industry insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {newsItems.map((item, index) => {
            const isVisible = visibleItems.includes(index);
            
            return (
              <Card 
                key={item.id}
                data-index={index}
                className={`group hover:shadow-elegant transition-all duration-500 cursor-pointer border-0 bg-card/80 backdrop-blur-sm ${
                  isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-8'
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-accent group-hover:text-primary transition-colors leading-tight">
                    {item.headline}
                  </h3>
                  
                  <p className="text-foreground leading-relaxed">
                    {item.preview}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/80 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-glow"
          >
            View All News
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}