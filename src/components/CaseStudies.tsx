import { useState, useEffect, useRef } from 'react';
import { Building2, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 1,
    title: "Global Media Network Transformation",
    client: "MediaCorp International",
    industry: "Broadcasting",
    icon: Building2,
    summary: "Complete infrastructure overhaul resulting in 60% cost reduction and 99.9% uptime across 15 countries.",
    results: [
      "60% reduction in operational costs",
      "99.9% uptime achievement",
      "50% faster content delivery"
    ],
    metrics: {
      savings: "$2.4M",
      uptime: "99.9%",
      countries: "15"
    },
    bgColor: "bg-secondary/30"
  },
  {
    id: 2,
    title: "Enterprise Video Conferencing Scale-Up",
    client: "TechFlow Solutions",
    industry: "Technology",
    icon: Users,
    summary: "Seamless scaling from 100 to 10,000 concurrent users with zero downtime during peak usage periods.",
    results: [
      "100x user capacity increase",
      "Zero downtime migrations",
      "40% improved video quality"
    ],
    metrics: {
      users: "10K+",
      quality: "+40%",
      downtime: "0min"
    },
    bgColor: "bg-background"
  },
  {
    id: 3,
    title: "Smart City Surveillance Network",
    client: "Metropolitan Authority",
    industry: "Government",
    icon: TrendingUp,
    summary: "City-wide surveillance network with AI analytics covering 500+ cameras and real-time threat detection.",
    results: [
      "500+ camera integration",
      "Real-time AI analytics",
      "30% faster response times"
    ],
    metrics: {
      cameras: "500+",
      response: "-30%",
      coverage: "100%"
    },
    bgColor: "bg-secondary/30"
  }
];

export function CaseStudies() {
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
            }, index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Case Studies & Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how our solutions have transformed businesses across industries with measurable results
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const IconComponent = study.icon;
            const isVisible = visibleItems.includes(index);
            const isEven = index % 2 === 0;
            
            return (
              <Card 
                key={study.id}
                data-index={index}
                className={`group hover:shadow-elegant transition-all duration-700 border-0 overflow-hidden ${study.bgColor} ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                    {/* Content Side */}
                    <div className={`p-8 lg:p-12 space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-primary/20 rounded-xl">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{study.industry}</p>
                            <p className="text-lg font-bold text-accent">{study.client}</p>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-accent group-hover:text-primary transition-colors">
                          {study.title}
                        </h3>
                        
                        <p className="text-foreground leading-relaxed text-lg">
                          {study.summary}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-accent">Key Results:</h4>
                        <div className="space-y-2">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-foreground">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group-hover:translate-x-1 transition-transform"
                      >
                        Read Full Case Study
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>

                    {/* Metrics Side */}
                    <div className={`bg-accent/5 p-8 lg:p-12 flex items-center ${isEven ? '' : 'lg:col-start-1'}`}>
                      <div className="w-full">
                        <h4 className="text-lg font-bold text-accent mb-6 text-center">
                          Impact Metrics
                        </h4>
                        <div className="grid grid-cols-3 gap-6">
                          {Object.entries(study.metrics).map(([key, value], metricIndex) => (
                            <div key={key} className="text-center">
                              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                {value}
                              </div>
                              <div className="text-sm text-muted-foreground capitalize">
                                {key === 'users' ? 'Users' : 
                                 key === 'quality' ? 'Quality' :
                                 key === 'downtime' ? 'Downtime' :
                                 key === 'savings' ? 'Savings' :
                                 key === 'uptime' ? 'Uptime' :
                                 key === 'countries' ? 'Countries' :
                                 key === 'cameras' ? 'Cameras' :
                                 key === 'response' ? 'Response' :
                                 key === 'coverage' ? 'Coverage' : key}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-primary rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have revolutionized their video infrastructure with our solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-accent hover:bg-white/90 shadow-lg"
            >
              Start Your Project
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}