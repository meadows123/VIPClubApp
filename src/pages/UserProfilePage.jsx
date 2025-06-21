import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, Mail, Lock, User, Building2, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '/src/components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from '/src/components/ui/use-toast';
import { supabase } from '/src/lib/supabase';
import { useToast } from '../../components/ui/use-toast';

const VenueOwnerRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    // Try to load saved form data from localStorage
    const savedData = localStorage.getItem('venueRegistrationData');
    return savedData ? JSON.parse(savedData) : {
      full_name: '',
      email: '',
      phone: '',
      password: '',
      venue_name: '',
      venue_description: '',
      venue_address: '',
      venue_phone: '',
      venue_email: '',
      venue_type: 'restaurant',
      opening_hours: '',
      capacity: '',
      price_range: 'medium',
    };
  });

  const ADMIN_EMAIL = "sales@oneeddy.com"; // Replace with your admin's email

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('venueRegistrationData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Starting registration process...');
      
      // 1. Check if email already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (existingUser?.user) {
        toast({
          title: 'Email Already Registered',
          description: 'This email is already registered. Please use a different email or try logging in.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // 2. Register the user
      console.log('Attempting to sign up user...');
      const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        if (signUpError.message.includes('already registered')) {
          toast({
            title: 'Email Already Registered',
            description: 'This email is already registered. Please use a different email or try logging in.',
            variant: 'destructive',
          });
        } else {
          throw signUpError;
        }
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (!session) {
        toast({
          title: 'Email Confirmation Required',
          description: 'Please check your email for a confirmation link. Your form data has been saved.',
          variant: 'default',
        });
        setLoading(false);
        return;
      }

      // Clear saved form data after successful registration
      localStorage.removeItem('venueRegistrationData');

      console.log('User signed up successfully:', user);

      // 2. Create venue owner profile
      console.log('Creating venue owner profile...');
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          id: user.id,
          first_name: formData.full_name.split(' ')[0],
          last_name: formData.full_name.split(' ')[1],
          phone: formData.phone,
          email: formData.email,
        }]);

      if (profileError) {
        console.error('Venue owner profile creation error:', profileError);
        // If venue owner profile creation fails, delete the user account
        await supabase.auth.admin.deleteUser(user.id);
        throw profileError;
      }
      console.log('Venue owner profile created successfully');

      // 3. Create venue
      console.log('Creating venue...');
      const { data: venue, error: venueError } = await supabase
        .from('venues')
        .insert([
          {
            name: formData.venue_name,
            description: formData.venue_description,
            address: formData.venue_address,
            phone: formData.venue_phone,
            email: formData.venue_email,
            type: formData.venue_type,
            opening_hours: formData.opening_hours,
            capacity: parseInt(formData.capacity),
            price_range: formData.price_range,
            owner_id: user.id,
            status: 'pending' // Will be approved by admin
          }
        ])
        .select()
        .single();

      if (venueError) {
        console.error('Venue creation error:', venueError);
        // If venue creation fails, delete the venue owner profile and user account
        await supabase.from('user_profiles').delete().eq('id', user.id);
        await supabase.auth.admin.deleteUser(user.id);
        throw venueError;
      }
      console.log('Venue created successfully:', venue);

      // Send admin notification email after successful venue creation
      await fetch('https://agydpkzfucicraedllgl.functions.supabase.co/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ADMIN_EMAIL,
          subject: 'New Venue Submission Pending Approval',
          template: 'admin-venue-submitted',
          data: {
            venueName: venue.name,
            ownerName: formData.full_name,
            ownerEmail: formData.email,
          }
        })
      });

      toast({
        title: 'Registration Successful',
        description: 'Your venue is pending approval. We will notify you once approved.',
      });

      // Redirect to pending page
      navigate('/venue-owner/pending');

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: error.message || 'An error occurred during registration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-cream/50 min-h-screen">
      <div className="container py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto h-12 w-12 bg-brand-burgundy/10 rounded-full flex items-center justify-center"
            >
              <Store className="h-6 w-6 text-brand-burgundy" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-heading text-brand-burgundy">
              Register Your Venue
            </h2>
            <p className="mt-2 text-sm text-brand-burgundy/70">
              Create your venue profile to start managing bookings
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* User Details Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-burgundy mb-4">Your Details</h3>
              
              <div>
                <Label htmlFor="full_name" className="text-brand-burgundy">
                  Full Name
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-brand-burgundy">
                  Email Address
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-brand-burgundy">
                  Password
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-brand-burgundy">
                  Phone Number
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
            </div>

            {/* Venue Details Section */}
            <div className="space-y-4 pt-6 border-t border-brand-burgundy/10">
              <h3 className="text-xl font-semibold text-brand-burgundy mb-4">Venue Details</h3>
              
              <div>
                <Label htmlFor="venue_name" className="text-brand-burgundy">
                  Venue Name
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="venue_name"
                    name="venue_name"
                    type="text"
                    required
                    value={formData.venue_name}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter your venue name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue_description" className="text-brand-burgundy">
                  Venue Description
                </Label>
                <Textarea
                  id="venue_description"
                  name="venue_description"
                  required
                  value={formData.venue_description}
                  onChange={handleChange}
                  className="mt-1 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                  placeholder="Describe your venue..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="venue_address" className="text-brand-burgundy">
                  Address
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="venue_address"
                    name="venue_address"
                    type="text"
                    required
                    value={formData.venue_address}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter venue address"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue_phone" className="text-brand-burgundy">
                  Venue Phone
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="venue_phone"
                    name="venue_phone"
                    type="tel"
                    required
                    value={formData.venue_phone}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter venue phone"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue_email" className="text-brand-burgundy">
                  Venue Email
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="venue_email"
                    name="venue_email"
                    type="email"
                    required
                    value={formData.venue_email}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter venue email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue_type" className="text-brand-burgundy">
                  Venue Type
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <select
                    id="venue_type"
                    name="venue_type"
                    required
                    value={formData.venue_type}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-brand-burgundy/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-transparent"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="club">Club</option>
                    <option value="lounge">Lounge</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="price_range" className="text-brand-burgundy">
                  Price Range
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <select
                    id="price_range"
                    name="price_range"
                    required
                    value={formData.price_range}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-brand-burgundy/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="capacity" className="text-brand-burgundy">
                  Capacity
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter venue capacity"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="opening_hours" className="text-brand-burgundy">
                  Opening Hours
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-brand-burgundy/50" />
                  </div>
                  <Input
                    id="opening_hours"
                    name="opening_hours"
                    type="text"
                    required
                    value={formData.opening_hours}
                    onChange={handleChange}
                    className="pl-10 bg-white border-brand-burgundy/20 focus:border-brand-burgundy"
                    placeholder="Enter venue opening hours"
                  />
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-burgundy text-white hover:bg-brand-burgundy/90"
              >
                {loading ? 'Registering...' : 'Register Venue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-brand-burgundy/70">
              Already have a venue account?{' '}
              <Link to="/venue-owner/login" className="text-brand-burgundy hover:text-brand-gold font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VenueOwnerRegister; 