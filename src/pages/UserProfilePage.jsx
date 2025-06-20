import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { getVenueById } from '@/data/clubData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [savedVenues, setSavedVenues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    // Load data from localStorage
    const storedPoints = localStorage.getItem('lagosvibe_loyalty_points');
    if (storedPoints) setLoyaltyPoints(parseInt(storedPoints));

    const storedBookings = JSON.parse(localStorage.getItem('lagosvibe_user_bookings') || '[]');
    setBookings(storedBookings.sort((a,b) => new Date(b.bookingTimestamp) - new Date(a.bookingTimestamp)));

    const favoriteIds = JSON.parse(localStorage.getItem('lagosvibe_favorites') || '[]');
    const favoriteVenues = favoriteIds.map(id => getVenueById(id)).filter(Boolean);
    setSavedVenues(favoriteVenues);
    
    // Load user details if any (mock, in real app this is from auth)
    const storedUser = JSON.parse(localStorage.getItem('lagosvibe_user_details'));
    if(storedUser) {
      setUser(prev => ({...prev, ...storedUser}));
      setEditForm(prev => ({...prev, ...storedUser}));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[form.email] && users[form.email] === form.password) {
      setUser({ email: form.email });
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupForm.email || !signupForm.password) {
      setSignupError('All fields are required');
      return;
    }
    if (signupForm.password !== signupForm.confirm) {
      setSignupError('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[signupForm.email]) {
      setSignupError('User already exists');
      return;
    }
    users[signupForm.email] = signupForm.password;
    localStorage.setItem('users', JSON.stringify(users));
    setUser({ email: signupForm.email });
    setSignupError('');
    setIsSignup(false);
  };

  const handleLogout = () => {
    setUser(null);
    setForm({ email: '', password: '' });
    localStorage.removeItem('lagosvibe_user_details');
    localStorage.removeItem('lagosvibe_loyalty_points');
    toast({ title: "Logged Out", description: "You have been successfully logged out.", className: "bg-brand-burgundy text-brand-cream"});
    navigate('/');
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setUser({ ...user, ...editForm });
    localStorage.setItem('lagosvibe_user_details', JSON.stringify({ ...user, ...editForm }));
    setIsEditing(false);
    toast({ title: "Profile Updated", description: "Your details have been saved.", className: "bg-brand-gold text-brand-burgundy" });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    toast({ title: "Referral Code Copied!", description: "Share it with friends to earn rewards.", className: "bg-brand-gold text-brand-burgundy" });
  };
  
  const getLoyaltyTier = () => {
    if (loyaltyPoints >= 3000) return { name: 'Platinum Pulse', color: 'text-purple-500'};
    if (loyaltyPoints >= 1500) return { name: 'Gold Glow', color: 'text-yellow-400'};
    if (loyaltyPoints >= 500) return { name: 'Silver Spark', color: 'text-gray-400'};
    return { name: 'Bronze Vibe', color: 'text-yellow-600'};
  };
  const loyaltyTier = getLoyaltyTier();

  if (!user) {
    return (
      <div className="bg-brand-cream/50 min-h-screen">
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow mb-20">
          <h2 className="text-2xl font-bold mb-4 text-brand-burgundy">{isSignup ? 'Sign Up' : 'Login to your profile'}</h2>
          {isSignup ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                className="w-full border p-2 rounded bg-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                className="w-full border p-2 rounded bg-white"
                required
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={signupForm.confirm}
                onChange={e => setSignupForm({ ...signupForm, confirm: e.target.value })}
                className="w-full border p-2 rounded bg-white"
                required
              />
              {signupError && <div className="text-red-500">{signupError}</div>}
              <Button type="submit" className="w-full bg-brand-burgundy text-white">Sign Up</Button>
              <div className="text-center mt-4">
                <span className="text-brand-burgundy/70">Already have an account? </span>
                <button 
                  type="button" 
                  onClick={() => setIsSignup(false)}
                  className="font-bold text-brand-burgundy hover:text-brand-burgundy/80 transition-colors"
                >
                  Log In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full border p-2 rounded bg-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full border p-2 rounded bg-white"
                required
              />
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit" className="w-full bg-brand-burgundy text-white">Login</Button>
              <div className="text-center mt-4">
                <span className="text-brand-burgundy/70">Don't have an account? </span>
                <button 
                  type="button" 
                  onClick={() => setIsSignup(true)}
                  className="font-bold text-brand-burgundy hover:text-brand-burgundy/80 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Show profile if logged in
  return (
    <div className="bg-brand-cream/50 min-h-screen py-10 md:py-16 font-body">
      <Card className="max-w-md mx-auto mt-16">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Welcome, {user.email}!</CardTitle>
              <CardDescription>Manage your profile and preferences</CardDescription>
              <Badge variant="secondary" className="mt-2">{loyaltyTier.name}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="email">Email</Label>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  name="name"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
                <Input
                  name="phone"
                  placeholder="Phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                />
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            ) : (
              <Input id="email" value={user.email} disabled />
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Recent Bookings</Label>
            {bookings.length > 0 ? (
              <div className="space-y-2">
                {bookings.slice(0, 3).map((booking, index) => (
                  <div key={index} className="p-2 border rounded">
                    <div className="font-medium">{booking.venueName}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No bookings yet</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Saved Venues</Label>
            {savedVenues.length > 0 ? (
              <div className="space-y-2">
                {savedVenues.map((venue) => (
                  <div key={venue.id} className="p-2 border rounded">
                    <div className="font-medium">{venue.name}</div>
                    <div className="text-sm text-muted-foreground">{venue.location}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No saved venues yet</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Referral Code</Label>
            <div className="flex gap-2">
              <Input value={user.referralCode || 'VIP123'} disabled />
              <Button onClick={copyReferralCode} variant="outline">
                Copy
              </Button>
            </div>
          </div>
          
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;