import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { userApi, savedVenuesApi, bookingsApi } from '../lib/userApi'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const AuthTestPage = () => {
  const { user, signIn, signUp, signOut } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({ email: '', password: '', confirm: '' })
  const [error, setError] = useState(null)
  const [signupError, setSignupError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [savedVenues, setSavedVenues] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  // Load user data when logged in
  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      setLoading(true)
      // Load profile
      const profileData = await userApi.getProfile(user.id)
      setProfile(profileData)

      // Load saved venues
      const venuesData = await savedVenuesApi.getSavedVenues(user.id)
      setSavedVenues(venuesData)

      // Load bookings
      const bookingsData = await bookingsApi.getUserBookings(user.id)
      setBookings(bookingsData)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await signIn(form)
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (signupForm.password !== signupForm.confirm) {
      setSignupError('Passwords do not match')
      return
    }
    try {
      setLoading(true)
      const { error } = await signUp({
        email: signupForm.email,
        password: signupForm.password,
      })
      if (error) throw error
    } catch (error) {
      setSignupError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container max-w-md mx-auto mt-16 p-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-brand-burgundy">
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>
          {isSignup ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signupForm.email}
                  onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signupForm.password}
                  onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={signupForm.confirm}
                  onChange={e => setSignupForm({ ...signupForm, confirm: e.target.value })}
                  required
                />
              </div>
              {signupError && <div className="text-red-500">{signupError}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="text-brand-burgundy hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="text-brand-burgundy hover:underline"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-burgundy">Test Page</h1>
          <p className="text-brand-burgundy/70">Testing authentication and API functionality</p>
        </div>
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          {loading ? (
            <p>Loading...</p>
          ) : profile ? (
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
              <p><strong>Phone:</strong> {profile.phone_number || 'Not set'}</p>
            </div>
          ) : (
            <p>No profile data found</p>
          )}
        </Card>

        {/* Saved Venues Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Venues</h2>
          {loading ? (
            <p>Loading...</p>
          ) : savedVenues.length > 0 ? (
            <div className="grid gap-4">
              {savedVenues.map((saved) => (
                <Card key={saved.id} className="p-4">
                  <h3 className="font-semibold">{saved.venues.name}</h3>
                  <p className="text-sm text-brand-burgundy/70">{saved.venues.type}</p>
                  <Button
                    onClick={() => savedVenuesApi.removeSavedVenue(user.id, saved.venue_id)}
                    variant="outline"
                    className="mt-2 text-red-500 border-red-500 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <p>No saved venues</p>
          )}
        </Card>

        {/* Bookings Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length > 0 ? (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.venues.name}</h3>
                      <p className="text-sm text-brand-burgundy/70">
                        {new Date(booking.booking_date).toLocaleDateString()} at {booking.start_time}
                      </p>
                      <p className="text-sm text-brand-burgundy/70">
                        {booking.number_of_guests} guests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-brand-burgundy">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </p>
                      {booking.status === 'confirmed' && (
                        <Button
                          onClick={() => bookingsApi.updateBookingStatus(booking.id, 'cancelled')}
                          variant="outline"
                          className="mt-2 text-red-500 border-red-500 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p>No bookings found</p>
          )}
        </Card>
      </div>
    </div>
  )
}

export default AuthTestPage 