import { useState, useEffect, useRef } from 'react';
import { Building2, Users, TrendingUp, ArrowRight, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Extended case studies data with more entries for pagination
const allCaseStudies = [
  {
    id: 1,
    title: "Global Media Network Transformation",
    client: "MediaCorp International",
    industry: "Broadcasting",
    icon: Building2,
    date: "2024-01-15",
    summary: "Complete infrastructure overhaul resulting in 60% cost reduction and 99.9% uptime across 15 countries.",
    description: "MediaCorp International faced scaling challenges with their legacy video infrastructure. Our team designed and implemented a modern, cloud-native solution that transformed their global operations.",
    results: [
      "60% reduction in operational costs",
      "99.9% uptime achievement across all regions",
      "50% faster content delivery worldwide",
      "Seamless integration with existing workflows"
    ],
    metrics: {
      savings: "$2.4M",
      uptime: "99.9%",
      countries: "15"
    },
    tags: ["Infrastructure", "Cloud Migration", "Global Scale"],
    featured: true,
    image: "photo-1461749280684-dccba630e2f6"
  },
  {
    id: 2,
    title: "Enterprise Video Conferencing Scale-Up",
    client: "TechFlow Solutions",
    industry: "Technology",
    icon: Users,
    date: "2024-02-20",
    summary: "Seamless scaling from 100 to 10,000 concurrent users with zero downtime during peak usage periods.",
    description: "TechFlow Solutions needed to rapidly scale their video conferencing platform to support remote work growth. We implemented a robust, scalable architecture that handled explosive user growth.",
    results: [
      "100x user capacity increase without infrastructure changes",
      "Zero downtime during peak migration periods",
      "40% improved video quality and stability",
      "Real-time auto-scaling capabilities"
    ],
    metrics: {
      users: "10K+",
      quality: "+40%",
      downtime: "0min"
    },
    tags: ["Video Conferencing", "Scaling", "Real-time"],
    featured: true,
    image: "photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 3,
    title: "Smart City Surveillance Network",
    client: "Metropolitan Authority",
    industry: "Government",
    icon: TrendingUp,
    date: "2024-03-10",
    summary: "City-wide surveillance network with AI analytics covering 500+ cameras and real-time threat detection.",
    description: "The Metropolitan Authority required a comprehensive surveillance solution with advanced AI capabilities. We delivered a cutting-edge system that enhances public safety through intelligent monitoring.",
    results: [
      "500+ camera integration across the city",
      "Real-time AI analytics and threat detection",
      "30% faster emergency response times",
      "Advanced facial recognition and behavior analysis"
    ],
    metrics: {
      cameras: "500+",
      response: "-30%",
      coverage: "100%"
    },
    tags: ["AI Analytics", "Surveillance", "Smart City"],
    featured: false,
    image: "photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 4,
    title: "Healthcare Telemedicine Platform",
    client: "MedConnect Solutions",
    industry: "Healthcare",
    icon: Building2,
    date: "2024-04-05",
    summary: "HIPAA-compliant telemedicine platform serving 50,000+ patients with 99.8% availability.",
    description: "MedConnect needed a secure, reliable telemedicine platform to serve patients remotely. We built a HIPAA-compliant solution that ensures patient privacy while delivering exceptional care.",
    results: [
      "50,000+ patients served successfully",
      "99.8% platform availability",
      "HIPAA compliance maintained",
      "Integration with 15+ healthcare systems"
    ],
    metrics: {
      patients: "50K+",
      uptime: "99.8%",
      systems: "15+"
    },
    tags: ["Healthcare", "HIPAA", "Telemedicine"],
    featured: false,
    image: "photo-1498050108023-c5249f4df085"
  },
  {
    id: 5,
    title: "E-learning Platform Optimization",
    client: "EduTech Global",
    industry: "Education",
    icon: Users,
    date: "2024-05-12",
    summary: "Optimized video streaming for 100,000+ students with adaptive bitrate and global CDN deployment.",
    description: "EduTech Global's platform struggled with video quality issues affecting student engagement. We optimized their entire video delivery infrastructure for optimal learning experiences.",
    results: [
      "100,000+ concurrent student support",
      "75% reduction in buffering issues",
      "Global CDN deployment across 25 regions",
      "Adaptive bitrate streaming implementation"
    ],
    metrics: {
      students: "100K+",
      buffering: "-75%",
      regions: "25"
    },
    tags: ["Education", "CDN", "Adaptive Streaming"],
    featured: false,
    image: "photo-1483058712412-4245e9b90334"
  },
  {
    id: 6,
    title: "Financial Services Video Security",
    client: "SecureBank Corp",
    industry: "Financial",
    icon: TrendingUp,
    date: "2024-06-18",
    summary: "Bank-grade security implementation with encrypted video communications and audit trails.",
    description: "SecureBank required enterprise-grade security for their video communications. We implemented military-grade encryption and comprehensive audit systems for regulatory compliance.",
    results: [
      "Military-grade encryption implementation",
      "Complete audit trail system",
      "100% regulatory compliance maintained",
      "Zero security incidents in 12 months"
    ],
    metrics: {
      encryption: "AES-256",
      compliance: "100%",
      incidents: "0"
    },
    tags: ["Security", "Encryption", "Compliance"],
    featured: false,
    image: "photo-1531297484001-80022131f5a1"
  }
];

const ITEMS_PER_PAGE = 4;

export default function CaseStudiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(allCaseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStudies = allCaseStudies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleItems([]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const items = sectionRef.current?.querySelectorAll('[data-index]');
      items?.forEach((item) => observer.observe(item));
    }, 100);

    return () => observer.disconnect();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore real-world success stories and discover how our innovative video infrastructure solutions 
              have transformed businesses across industries with measurable, impactful results.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                6 Success Stories
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Multiple Industries
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Proven Results
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section ref={sectionRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12">
            {currentStudies.map((study, index) => {
              const IconComponent = study.icon;
              const isVisible = visibleItems.includes(index);
              
              return (
                <Card 
                  key={study.id}
                  data-index={index}
                  className={`group hover:shadow-elegant transition-all duration-700 border-0 overflow-hidden ${
                    study.featured ? 'bg-secondary/30' : 'bg-background'
                  } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Image Section */}
                      <div className="relative lg:col-span-1 h-64 lg:h-auto">
                        <img 
                          src={`https://images.unsplash.com/${study.image}?auto=format&fit=crop&w=600&q=80`}
                          alt={study.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center space-x-3 text-white">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium">{study.industry}</p>
                              <p className="text-sm opacity-90">{study.client}</p>
                            </div>
                          </div>
                        </div>
                        {study.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-primary text-primary-foreground">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="lg:col-span-2 p-6 lg:p-8 space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {study.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(study.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-bold text-accent group-hover:text-primary transition-colors">
                            {study.title}
                          </h2>
                          
                          <p className="text-foreground leading-relaxed">
                            {study.description}
                          </p>
                        </div>

                        {/* Results and Metrics */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Key Results */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-accent">Key Results:</h3>
                            <div className="space-y-2">
                              {study.results.slice(0, 3).map((result, resultIndex) => (
                                <div key={resultIndex} className="flex items-start space-x-3">
                                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-foreground">{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Impact Metrics */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-accent">Impact Metrics:</h3>
                            <div className="grid grid-cols-3 gap-3">
                              {Object.entries(study.metrics).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-lg font-bold text-primary">
                                    {value}
                                  </div>
                                  <div className="text-xs text-muted-foreground capitalize">
                                    {key === 'users' ? 'Users' : 
                                     key === 'quality' ? 'Quality' :
                                     key === 'downtime' ? 'Downtime' :
                                     key === 'savings' ? 'Savings' :
                                     key === 'uptime' ? 'Uptime' :
                                     key === 'countries' ? 'Countries' :
                                     key === 'cameras' ? 'Cameras' :
                                     key === 'response' ? 'Response' :
                                     key === 'coverage' ? 'Coverage' :
                                     key === 'patients' ? 'Patients' :
                                     key === 'systems' ? 'Systems' :
                                     key === 'students' ? 'Students' :
                                     key === 'buffering' ? 'Buffering' :
                                     key === 'regions' ? 'Regions' :
                                     key === 'encryption' ? 'Encryption' :
                                     key === 'compliance' ? 'Compliance' :
                                     key === 'incidents' ? 'Incidents' : key}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <Button 
                            size="lg" 
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group-hover:translate-x-1 transition-transform"
                          >
                            Read Full Case Study
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join these industry leaders who have transformed their video infrastructure with our proven solutions. 
            Let's discuss how we can achieve similar results for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-accent hover:bg-white/90 shadow-lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
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
      </section>
    </div>
  );
}