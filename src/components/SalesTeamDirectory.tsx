import { useState } from 'react';
import { Mail, Phone, MessageCircle, Globe, Users, Building2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const salesTeam = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "VP of Sales",
    email: "sarah.chen@videotechpro.com",
    phone: "+1 (555) 123-4567",
    specialties: ["Enterprise Solutions", "Strategic Partnerships"],
    region: "North America",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c8?w=150&h=150&fit=crop&crop=face&auto=format",
    description: "15+ years experience in enterprise video solutions with Fortune 500 companies."
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Senior Sales Manager",
    email: "marcus.johnson@videotechpro.com",
    phone: "+1 (555) 234-5678",
    specialties: ["Live Streaming", "Content Delivery"],
    region: "Europe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    description: "Specialized in live streaming solutions for media and entertainment companies."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Sales Manager",
    email: "emily.rodriguez@videotechpro.com",
    phone: "+1 (555) 345-6789",
    specialties: ["Video Analytics", "AI Solutions"],
    region: "Asia Pacific",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    description: "Expert in AI-powered video analytics and smart infrastructure solutions."
  },
  {
    id: 4,
    name: "David Kim",
    title: "Technical Sales Specialist",
    email: "david.kim@videotechpro.com",
    phone: "+1 (555) 456-7890",
    specialties: ["Video Conferencing", "API Integration"],
    region: "Global",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    description: "Technical specialist focusing on video conferencing and custom API integrations."
  }
];

const regionIcons = {
  "North America": Globe,
  "Europe": Building2,
  "Asia Pacific": Users,
  "Global": Zap
};

export function SalesTeamDirectory() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const handleContact = (type: 'email' | 'phone', contact: string) => {
    if (type === 'email') {
      window.location.href = `mailto:${contact}`;
    } else {
      window.location.href = `tel:${contact}`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {salesTeam.map((member, index) => {
        const RegionIcon = regionIcons[member.region as keyof typeof regionIcons];
        const isSelected = selectedMember === member.id;
        
        return (
          <div
            key={member.id}
            className={`bg-card p-6 rounded-lg border border-border/50 shadow-elegant transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer ${
              isSelected ? 'ring-2 ring-primary shadow-glow' : ''
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => setSelectedMember(isSelected ? null : member.id)}
          >
            {/* Avatar and Basic Info */}
            <div className="text-center mb-4">
              <div className="relative mx-auto mb-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <RegionIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <h3 className="font-bold text-card-foreground text-lg mb-1">{member.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{member.title}</p>
              <Badge variant="secondary" className="text-xs">
                {member.region}
              </Badge>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-card-foreground mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-1">
                {member.specialties.map((specialty, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start transition-all duration-300 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContact('email', member.email);
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start transition-all duration-300 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContact('phone', member.phone);
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>

            {/* Expanded Info */}
            {isSelected && (
              <div className="mt-4 pt-4 border-t border-border/30 animate-fade-in">
                <p className="text-sm text-muted-foreground mb-3">
                  {member.description}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}