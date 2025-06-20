import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // Assuming Switch component exists
import { Bell, Lock, Palette } from 'lucide-react';

const AdminSettingsPage = () => {
  // Mock settings state
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: true, // Assuming this would control admin panel dark mode specifically
    adminEmail: 'owner@nightvibe.com',
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // In a real app, save to backend/localStorage
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Admin Settings</h1>

      <Card className="bg-secondary/30 border-border/50 glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> Notifications</CardTitle>
          <CardDescription>Manage your notification preferences for new bookings and system alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background/30 rounded-md">
            <Label htmlFor="notifications-switch" className="flex-grow">Enable Email Notifications</Label>
            <Switch 
              id="notifications-switch" 
              checked={settings.notifications} 
              onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
            />
          </div>
          <div>
            <Label htmlFor="adminEmail">Admin Notification Email</Label>
            <Input 
              id="adminEmail" 
              type="email" 
              value={settings.adminEmail} 
              onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
              placeholder="your-email@example.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/30 border-border/50 glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5" /> Security</CardTitle>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>
      
      <Card className="bg-secondary/30 border-border/50 glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5" /> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the admin panel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-3 bg-background/30 rounded-md">
            <Label htmlFor="darkmode-switch" className="flex-grow">Enable Dark Mode</Label>
            <Switch 
              id="darkmode-switch" 
              checked={settings.darkMode} 
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-accent-foreground">Save Settings</Button>
      </div>
    </motion.div>
  );
};

export default AdminSettingsPage;