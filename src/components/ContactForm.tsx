import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, User, Mail, MessageSquare, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  department: z.string().min(1, 'Please select a department'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error sending message",
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
        <h3 className="text-2xl font-bold text-card-foreground mb-2">Send us a Message</h3>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              First Name
            </Label>
            <Input
              id="firstName"
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
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
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

        {/* Email and Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </Label>
            <Input
              id="email"
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
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              Company
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Your Company"
              className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
              {...register('company')}
            />
            {errors.company && (
              <p className="text-destructive text-sm animate-fade-in">{errors.company.message}</p>
            )}
          </div>
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={(value) => setValue('department', value)}>
            <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-glow">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="partnerships">Partnerships</SelectItem>
              <SelectItem value="general">General Inquiry</SelectItem>
            </SelectContent>
          </Select>
          {errors.department && (
            <p className="text-destructive text-sm animate-fade-in">{errors.department.message}</p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            Subject
          </Label>
          <Input
            id="subject"
            type="text"
            placeholder="How can we help you?"
            className="transition-all duration-300 focus:scale-105 focus:shadow-glow"
            {...register('subject')}
          />
          {errors.subject && (
            <p className="text-destructive text-sm animate-fade-in">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us more about your requirements..."
            rows={5}
            className="transition-all duration-300 focus:scale-105 focus:shadow-glow resize-none"
            {...register('message')}
          />
          {errors.message && (
            <p className="text-destructive text-sm animate-fade-in">{errors.message.message}</p>
          )}
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
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}