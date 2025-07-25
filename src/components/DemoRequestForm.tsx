import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, User, Mail, Building, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const demoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  companySize: z.string().min(1, 'Please select company size'),
  useCase: z.string().min(1, 'Please select a use case'),
  preferredTime: z.string().min(1, 'Please select preferred time'),
  message: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoSchema>;

export function DemoRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Demo request submitted!",
        description: "Our team will contact you within 24 hours to schedule your personalized demo.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card p-8 rounded-lg border border-border/50 shadow-elegant">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-card-foreground mb-2 flex items-center gap-2">
          <Video className="w-6 h-6 text-primary" />
          Request a Demo
        </h3>
        <p className="text-muted-foreground">
          Get a personalized demonstration of our video infrastructure solutions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="demo-firstName" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              First Name
            </Label>
            <Input
              id="demo-firstName"
              type="text"
              placeholder="John"
              className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-destructive text-sm animate-fade-in">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-lastName">Last Name</Label>
            <Input
              id="demo-lastName"
              type="text"
              placeholder="Doe"
              className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-destructive text-sm animate-fade-in">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email and Job Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="demo-email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="john@company.com"
              className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive text-sm animate-fade-in">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-jobTitle">Job Title</Label>
            <Input
              id="demo-jobTitle"
              type="text"
              placeholder="CTO, IT Manager, etc."
              className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
              {...register('jobTitle')}
            />
            {errors.jobTitle && (
              <p className="text-destructive text-sm animate-fade-in">{errors.jobTitle.message}</p>
            )}
          </div>
        </div>

        {/* Company and Company Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="demo-company" className="flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              Company
            </Label>
            <Input
              id="demo-company"
              type="text"
              placeholder="Your Company"
              className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
              {...register('company')}
            />
            {errors.company && (
              <p className="text-destructive text-sm animate-fade-in">{errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-companySize" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Company Size
            </Label>
            <Select onValueChange={(value) => setValue('companySize', value)}>
              <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-glow">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-1000">201-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-destructive text-sm animate-fade-in">{errors.companySize.message}</p>
            )}
          </div>
        </div>

        {/* Use Case */}
        <div className="space-y-2">
          <Label htmlFor="demo-useCase">Primary Use Case</Label>
          <Select onValueChange={(value) => setValue('useCase', value)}>
            <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-glow">
              <SelectValue placeholder="What's your main video infrastructure need?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live-streaming">Live Streaming</SelectItem>
              <SelectItem value="video-on-demand">Video on Demand</SelectItem>
              <SelectItem value="video-conferencing">Video Conferencing</SelectItem>
              <SelectItem value="content-delivery">Content Delivery Network</SelectItem>
              <SelectItem value="video-analytics">Video Analytics</SelectItem>
              <SelectItem value="enterprise-solution">Enterprise Video Solution</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.useCase && (
            <p className="text-destructive text-sm animate-fade-in">{errors.useCase.message}</p>
          )}
        </div>

        {/* Preferred Time */}
        <div className="space-y-2">
          <Label htmlFor="demo-preferredTime" className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Preferred Demo Time
          </Label>
          <Select onValueChange={(value) => setValue('preferredTime', value)}>
            <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-glow">
              <SelectValue placeholder="When would you like to schedule the demo?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="next-week">Next Week</SelectItem>
              <SelectItem value="within-month">Within This Month</SelectItem>
              <SelectItem value="flexible">I'm Flexible</SelectItem>
            </SelectContent>
          </Select>
          {errors.preferredTime && (
            <p className="text-destructive text-sm animate-fade-in">{errors.preferredTime.message}</p>
          )}
        </div>

        {/* Additional Message */}
        <div className="space-y-2">
          <Label htmlFor="demo-message">Additional Information (Optional)</Label>
          <Textarea
            id="demo-message"
            placeholder="Tell us about your specific requirements or any questions you have..."
            rows={4}
            className="transition-all duration-300 focus:scale-105 focus:shadow-glow resize-none"
            {...register('message')}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Submitting Request...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Request Demo
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}