import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, CreditCard, Gift } from 'lucide-react';

const CheckoutForm = ({ formData, errors, handleInputChange, handleSubmit, isSubmitting, totalAmount }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="bg-secondary/20 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className={errors.fullName ? 'border-destructive' : ''} />
              {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'border-destructive' : ''} />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'border-destructive' : ''} />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Gift className="mr-2 h-5 w-5" />
            Referral Code (Optional)
          </h2>
          <div>
            <Label htmlFor="referralCode">Referral Code</Label>
            <Input id="referralCode" name="referralCode" value={formData.referralCode} onChange={handleInputChange} placeholder="Enter code for perks" />
          </div>
        </div>
        
        <div className="bg-secondary/20 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Payment Information
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} className={errors.cardNumber ? 'border-destructive' : ''} />
              {errors.cardNumber && <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className={errors.expiryDate ? 'border-destructive' : ''} />
                {errors.expiryDate && <p className="text-destructive text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} className={errors.cvv ? 'border-destructive' : ''} />
                {errors.cvv && <p className="text-destructive text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} className="mt-1" />
          <div>
            <Label htmlFor="agreeToTerms" className="text-sm">I agree to the Terms of Service and Privacy Policy</Label>
            {errors.agreeToTerms && <p className="text-destructive text-sm">{errors.agreeToTerms}</p>}
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-accent-foreground" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : `Pay $${totalAmount}`}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;