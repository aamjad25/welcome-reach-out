import { useState, useEffect } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MapIntegration() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetDirections = () => {
    const address = "123 Tech Innovation Drive, San Francisco, CA 94107";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const handleViewOnMaps = () => {
    const address = "123 Tech Innovation Drive, San Francisco, CA 94107";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border/50 shadow-elegant">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-card-foreground mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Our Location
        </h3>
        <p className="text-muted-foreground text-sm">
          Visit us at our San Francisco headquarters
        </p>
      </div>

      {/* Map Container */}
      <div className="relative bg-muted rounded-lg overflow-hidden mb-4" style={{ height: '300px' }}>
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground text-sm">Loading map...</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center">
            {/* Interactive Map Placeholder */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-card-foreground">VideoTech Pro HQ</h4>
                <p className="text-sm text-muted-foreground">
                  123 Tech Innovation Drive<br />
                  San Francisco, CA 94107
                </p>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGetDirections}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleViewOnMaps}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Google Maps
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleGetDirections}
          className="transition-all duration-300 hover:scale-105"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Directions
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewOnMaps}
          className="transition-all duration-300 hover:scale-105"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Full Map
        </Button>
      </div>
    </div>
  );
}