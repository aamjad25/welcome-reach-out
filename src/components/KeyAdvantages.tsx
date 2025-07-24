import { useState, useEffect, useRef } from 'react';
import { Scale, Video, Network, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const advantages = [
  {
    icon: Scale,
    title: "Scalability",
    description: "Seamlessly scale your infrastructure from small deployments to enterprise-wide networks with our flexible architecture.",
    features: ["Auto-scaling", "Load balancing", "Distributed processing"]
  },
  {
    icon: Video,
    title: "4K Video Support",
    description: "Experience crystal-clear video quality with full 4K HDR support and advanced compression technologies.",
    features: ["4K HDR", "Real-time encoding", "Adaptive bitrate"]
  },
  {
    icon: Network,
    title: "Fiber/IP Infrastructure",
    description: "Leverage high-speed fiber optic and IP networks for ultra-low latency video transmission and management.",
    features: ["Fiber connectivity", "IP protocols", "Low latency"]
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for maximum performance with intelligent resource management and real-time processing capabilities.",
    features: ["Real-time processing", "Smart routing", "99.9% uptime"]
  }
];

export function KeyAdvantages() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Key Advantages
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform delivers unmatched performance, scalability, and reliability for modern video infrastructure needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <Card 
                key={index}
                data-index={index}
                className={`group hover:shadow-elegant transition-all duration-500 border-0 bg-secondary/50 backdrop-blur-sm ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-center w-full h-full">
                      <IconComponent className="w-8 h-8 text-primary group-hover:animate-float" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-accent group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-foreground leading-relaxed">
                    {advantage.description}
                  </p>

                  <div className="space-y-2">
                    {advantage.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-center justify-center"
                      >
                        <span className="text-sm text-muted-foreground bg-background/60 px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}