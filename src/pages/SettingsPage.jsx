import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Bell, Lock, User, CreditCard, Globe } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-brand-burgundy mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="bg-white border-brand-burgundy/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-brand-burgundy">
                <User className="h-5 w-5 mr-2" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+234 123 456 7890" />
              </div>
              <Button className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white border-brand-burgundy/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-brand-burgundy">
                <Lock className="h-5 w-5 mr-2" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white border-brand-burgundy/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-brand-burgundy">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-brand-burgundy/70">Receive updates about your bookings</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-brand-burgundy/70">Get text messages for important updates</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-brand-burgundy/70">Receive promotions and special offers</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="bg-white border-brand-burgundy/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-brand-burgundy">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** ****" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="***" />
                </div>
              </div>
              <Button className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card className="bg-white border-brand-burgundy/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-brand-burgundy">
                <Globe className="h-5 w-5 mr-2" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  className="w-full rounded-md border border-brand-burgundy/10 bg-white px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="yo">Yoruba</option>
                  <option value="ig">Igbo</option>
                  <option value="ha">Hausa</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  className="w-full rounded-md border border-brand-burgundy/10 bg-white px-3 py-2"
                >
                  <option value="NGN">Nigerian Naira (₦)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              <Button className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 