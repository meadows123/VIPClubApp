import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Facebook, Instagram, Twitter } from 'lucide-react'; // Wine for brand icon
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-burgundy text-brand-cream border-t border-brand-gold/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Wine className="h-8 w-8 text-brand-gold" />
              <span className="font-heading font-bold text-3xl tracking-tight text-brand-cream">
                LagosVibe
              </span>
            </Link>
            <p className="text-sm text-brand-cream/80 max-w-md">
              Your exclusive passport to Lagos's elite nightlife. Discover premium venues, book VIP tables, and RSVP to the city's most sought-after events.
            </p>
          </div>

          <div>
            <p className="font-heading font-semibold text-xl text-brand-gold mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/venues" className="text-brand-cream/80 hover:text-brand-gold transition-colors">Venues</Link></li>
              <li><Link to="/explore" className="text-brand-cream/80 hover:text-brand-gold transition-colors">Explore Lagos</Link></li>
              <li><Link to="/events" className="text-brand-cream/80 hover:text-brand-gold transition-colors">Upcoming Events</Link></li>
              <li><Link to="/profile" className="text-brand-cream/80 hover:text-brand-gold transition-colors">My Profile</Link></li>
              <li><Link to="/loyalty" className="text-brand-cream/80 hover:text-brand-gold transition-colors">Loyalty Rewards</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-heading font-semibold text-xl text-brand-gold mb-4">Connect</p>
            <div className="flex space-x-4 mb-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-brand-cream/80 hover:text-brand-gold transition-colors"><Facebook size={22} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-brand-cream/80 hover:text-brand-gold transition-colors"><Instagram size={22} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-brand-cream/80 hover:text-brand-gold transition-colors"><Twitter size={22} /></a>
            </div>
            <p className="font-heading font-semibold text-xl text-brand-gold mb-2 mt-4">Support</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-brand-cream/80 hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-cream/20 pt-8 text-center">
          <p className="text-xs text-brand-cream/70">
            &copy; {currentYear} LagosVibe Ltd. All rights reserved. Experience the Best of Lagos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;