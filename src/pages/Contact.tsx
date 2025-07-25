import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ContactForm } from '@/components/ContactForm';
import { DemoRequestForm } from '@/components/DemoRequestForm';
import { SalesTeamDirectory } from '@/components/SalesTeamDirectory';
import { MapIntegration } from '@/components/MapIntegration';
import { GetInTouchInfo } from '@/components/GetInTouchInfo';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your video infrastructure? Let's discuss how VideoTech Pro can help you achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>Response within 1 Hour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger 
                    value="contact"
                    className="transition-all duration-300 hover:scale-105"
                  >
                    Contact Us
                  </TabsTrigger>
                  <TabsTrigger 
                    value="demo"
                    className="transition-all duration-300 hover:scale-105"
                  >
                    Request Demo
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent 
                  value="contact" 
                  className="animate-fade-in"
                >
                  <ContactForm />
                </TabsContent>
                
                <TabsContent 
                  value="demo"
                  className="animate-fade-in"
                >
                  <DemoRequestForm />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-8">
              <GetInTouchInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Sales Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Meet Our Sales Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with our experts who understand your unique requirements
            </p>
          </div>
          <SalesTeamDirectory />
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-accent">
                Our Location
              </h2>
              <p className="text-xl text-muted-foreground">
                Visit our headquarters or connect with us virtually. We're here to help you succeed.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border/50 hover:shadow-elegant transition-all duration-300">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Headquarters</h3>
                    <p className="text-muted-foreground">
                      123 Tech Innovation Drive<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border/50 hover:shadow-elegant transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border/50 hover:shadow-elegant transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      contact@videotechpro.com
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105">
                Get Directions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="order-first lg:order-last">
              <MapIntegration />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}