import { useState, useEffect } from 'react';
import { Play, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-bg.jpg';

const features = [
  { icon: Zap, text: "Ultra-Low Latency" },
  { icon: Shield, text: "Enterprise Security" },
  { icon: Globe, text: "Global Infrastructure" }
];

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background with Multiple Breakpoints */}
      <div className="absolute inset-0">
        {/* Background Image with Responsive Loading */}
        <picture>
          {/* WebP format for modern browsers */}
          <source 
            media="(min-width: 1024px)" 
            srcSet={`${heroBackground} 1920w`}
            type="image/jpeg"
          />
          <source 
            media="(min-width: 768px)" 
            srcSet={`${heroBackground} 1024w`}
            type="image/jpeg"
          />
          <img 
            src={heroBackground} 
            alt="Modern technology infrastructure with fiber optic networks and digital connectivity"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            loading="eager"
            decoding="async"
            style={{
              backgroundImage: `url(${heroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
          />
        </picture>
        
        {/* Enhanced Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/85 via-accent/70 to-primary/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Optional: Animated Overlay for Dynamic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-vivid-cyan/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Main Headlines */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Next-Generation
              <br />
              <span className="bg-gradient-to-r from-vivid-cyan to-cloud-white bg-clip-text text-transparent">
                Video Infrastructure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transform your video delivery with cutting-edge 4K streaming, fiber-optic networks, 
              and scalable infrastructure solutions designed for the future.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className={`flex flex-wrap justify-center gap-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                >
                  <IconComponent className="w-5 h-5 text-vivid-cyan" />
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              className="bg-vivid-cyan hover:bg-vivid-cyan/90 text-white shadow-glow text-lg px-8 py-3 h-auto"
            >
              Get Started
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 h-auto backdrop-blur-sm"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '900ms' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-vivid-cyan mb-2">99.9%</div>
              <div className="text-white/80">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-vivid-cyan mb-2">50+</div>
              <div className="text-white/80">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-vivid-cyan mb-2">10M+</div>
              <div className="text-white/80">Hours Streamed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}