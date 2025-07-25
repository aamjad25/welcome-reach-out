import { Mail, Phone, MessageSquare, Clock, Users, Headphones, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "24/7 support available",
    action: "tel:+15551234567"
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "contact@videotechpro.com",
    description: "Response within 1 hour",
    action: "mailto:contact@videotechpro.com"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Chat with our team",
    description: "Available Mon-Fri 9AM-6PM PST",
    action: "#"
  }
];

const quickActions = [
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a time that works for you",
    action: "#"
  },
  {
    icon: FileText,
    title: "Download Brochure",
    description: "Learn more about our solutions",
    action: "#"
  },
  {
    icon: Users,
    title: "Join Webinar",
    description: "Attend our next demo session",
    action: "#"
  },
  {
    icon: Headphones,
    title: "Support Center",
    description: "Access documentation & guides",
    action: "#"
  }
];

export function GetInTouchInfo() {
  const handleAction = (action: string) => {
    if (action.startsWith('tel:') || action.startsWith('mailto:')) {
      window.location.href = action;
    } else {
      // Handle other actions
      console.log('Action:', action);
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="bg-card p-6 rounded-lg border border-border/50 shadow-elegant">
        <h3 className="text-xl font-bold text-card-foreground mb-4">
          Get in Touch
        </h3>
        
        <div className="space-y-4">
          {contactInfo.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer group"
                onClick={() => handleAction(item.action)}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-card-foreground text-sm">{item.title}</h4>
                  <p className="text-primary text-sm font-medium">{item.value}</p>
                  <p className="text-muted-foreground text-xs">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-card p-6 rounded-lg border border-border/50 shadow-elegant">
        <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Business Hours
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span className="text-card-foreground font-medium">9:00 AM - 6:00 PM PST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturday</span>
            <span className="text-card-foreground font-medium">10:00 AM - 4:00 PM PST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sunday</span>
            <span className="text-card-foreground font-medium">Emergency Support Only</span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="flex items-center gap-2 text-primary text-sm">
              <Headphones className="w-4 h-4" />
              <span>24/7 Emergency Support Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card p-6 rounded-lg border border-border/50 shadow-elegant">
        <h3 className="text-xl font-bold text-card-foreground mb-4">
          Quick Actions
        </h3>
        
        <div className="space-y-3">
          {quickActions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-3 h-auto transition-all duration-300 hover:scale-105"
                onClick={() => handleAction(item.action)}
              >
                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}