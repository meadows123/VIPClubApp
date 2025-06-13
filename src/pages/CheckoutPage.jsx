import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Calendar, Clock, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { validateCheckoutForm } from '@/lib/validation';

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selection, setSelection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false,
    referralCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vipPerks, setVipPerks] = useState([]);
  
  useEffect(() => {
    const savedSelection = localStorage.getItem('nightvibe_selection');
    if (savedSelection) {
      const parsedSelection = JSON.parse(savedSelection);
      if (parsedSelection.clubId === parseInt(id)) {
        setSelection(parsedSelection);
      } else {
        navigate(`/clubs/${id}`); // Redirect if club ID doesn't match
      }
    } else {
      navigate(`/clubs/${id}`); // Redirect if no selection
    }
    setLoading(false);
  }, [id, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const applyReferralCode = (code) => {
    if (code === "VIP2025") {
      toast({ title: "Referral code applied!", description: "You've unlocked 10% off!" });
      // This is a mock, in a real app this would adjust price or add perks
      setVipPerks(prev => [...prev, "10% Discount Applied"]);
      return true;
    }
    toast({ title: "Invalid referral code", variant: "destructive" });
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateCheckoutForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      if (formData.referralCode) {
        applyReferralCode(formData.referralCode);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        setShowConfirmation(true);
        
        const bookings = JSON.parse(localStorage.getItem('nightvibe_bookings') || '[]');
        const newBooking = {
          id: Date.now(),
          ...selection,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          bookingDate: new Date().toISOString(),
          status: 'confirmed',
          referralCode: formData.referralCode,
          vipPerksApplied: vipPerks
        };
        bookings.push(newBooking);
        localStorage.setItem('nightvibe_bookings', JSON.stringify(bookings));
        localStorage.removeItem('nightvibe_selection');

        // Unlock VIP perks (mock)
        const unlockedPerks = ["Free Welcome Drink", "Priority Queue"];
        localStorage.setItem('nightvibe_vip_perks', JSON.stringify(unlockedPerks));
        toast({ title: "VIP Perks Unlocked!", description: unlockedPerks.join(', ') });

      }, 2000);
    } else {
      toast({
        title: "Form validation failed",
        description: "Please check the form and fix the errors.",
        variant: "destructive",
      });
    }
  };
  
  const calculateTotal = () => {
    if (!selection) return 0;
    let total = (selection.ticket?.price || 0) + (selection.table?.price || 0) + 25; // 25 is service fee
    if (vipPerks.includes("10% Discount Applied")) {
      total *= 0.9; // Apply 10% discount
    }
    return total.toFixed(2);
  };
  
  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-secondary rounded mb-4"></div>
          <div className="h-4 w-48 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!selection) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No Selection Found</h2>
        <p className="text-muted-foreground mb-6">Please go back and select a ticket or table first.</p>
        <Link to={`/clubs/${id}`}>
          <Button>Back to Club</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <Link to={`/clubs/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Club
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6 flex items-center">
              <CreditCard className="h-8 w-8 mr-2" />
              Checkout
            </h1>
            <CheckoutForm 
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              totalAmount={calculateTotal()}
              icons={{
                user: <User className="h-5 w-5 mr-2" />
              }}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy/90 py-3.5 text-lg rounded-md"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-cream mr-2"></div>
                  Processing...
                </div>
              ) : `Pay ₦${calculateTotal().toLocaleString()}`}
            </Button>
          </motion.div>
        </div>
        
        <div>
          <div className="sticky top-20">
            <OrderSummary 
              selection={selection} 
              totalAmount={calculateTotal()} 
              vipPerks={vipPerks}
              icons={{
                calendar: <Calendar className="h-5 w-5 mr-2" />,
                clock: <Clock className="h-5 w-5 mr-2" />
              }}
            />
          </div>
        </div>
      </div>
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex justify-center my-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary" />
                </div>
              </div>
              <p className="mb-2">
                Your booking at <span className="font-bold">{selection.clubName}</span> has been confirmed.
              </p>
              {vipPerks.length > 0 && (
                <div className="my-2 text-sm text-green-400">
                  <p className="font-semibold">VIP Perks Applied:</p>
                  <ul className="list-disc list-inside">
                    {vipPerks.map(perk => <li key={perk}>{perk}</li>)}
                  </ul>
                </div>
              )}
              <p className="text-sm">
                A confirmation email has been sent to {formData.email}. You can show this email or your ID at the entrance.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-accent-foreground">
                Back to Home
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;