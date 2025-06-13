import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log("Form data submitted:", formData);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
        className: "bg-primary text-primary-foreground"
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      toast({
        title: "Oops!",
        description: "Please fill out all required fields correctly.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary glow-text">Get In Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-secondary">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-center"><Mail className="h-5 w-5 mr-3 text-primary" /> support@nightvibe.app</p>
                <p className="flex items-center"><Phone className="h-5 w-5 mr-3 text-primary" /> +44 20 1234 5678</p>
                <p className="flex items-center"><MapPin className="h-5 w-5 mr-3 text-primary" /> 123 Party Lane, London, UK</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4 text-secondary">Business Hours</h2>
              <div className="space-y-1 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM (GMT)</p>
                <p>Saturday: 10:00 AM - 4:00 PM (GMT)</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
             <div className="mt-8 md:mt-0">
                <img  
                    src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d" 
                    alt="Modern office with communication theme"
                    className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[16/9] border-2 border-secondary"
                />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-card p-6 md:p-8 rounded-lg shadow-xl border border-border/70 glass-effect"
          >
            <h2 className="text-2xl font-heading font-semibold mb-6 text-secondary">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={`mt-1 ${errors.name ? 'border-destructive' : ''}`} />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" className={`mt-1 ${errors.subject ? 'border-destructive' : ''}`} />
                {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message here..." rows={5} className={`mt-1 ${errors.message ? 'border-destructive' : ''}`} />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-accent-foreground text-lg py-3">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;