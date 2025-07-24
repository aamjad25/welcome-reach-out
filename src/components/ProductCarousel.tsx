import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';

const products = [
  {
    id: 1,
    name: "4K Pro Streaming Device",
    description: "Ultra-high definition video streaming with advanced codec support and seamless connectivity.",
    image: product1,
    features: ["4K HDR Support", "Low Latency", "Multi-Protocol"]
  },
  {
    id: 2,
    name: "Fiber Infrastructure Hub",
    description: "Enterprise-grade fiber optic network infrastructure with scalable bandwidth management.",
    image: product2,
    features: ["Fiber Optic", "Scalable", "Enterprise Ready"]
  },
  {
    id: 3,
    name: "IP Video Management System",
    description: "Comprehensive video management platform with intelligent monitoring and control capabilities.",
    image: product3,
    features: ["Real-time Monitoring", "Cloud Integration", "AI Analytics"]
  }
];

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our cutting-edge solutions designed to transform your video infrastructure
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-elegant">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-accent">
                          {product.name}
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-accent">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                          Learn More
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg animate-scale-in"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-card transition-all duration-200 group"
          >
            <ChevronLeft className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-card transition-all duration-200 group"
          >
            <ChevronRight className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary shadow-glow' 
                    : 'bg-border hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}