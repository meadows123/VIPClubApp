import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import VenuesPage from './pages/VenuesPage';
import VenueDetailPage from './pages/VenueDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import VenueOwnerDashboard from './pages/venue-owner/VenueOwnerDashboard';
import VenueOwnerLogin from './pages/venue-owner/VenueOwnerLogin';
import VenueOwnerRegister from './pages/venue-owner/VenueOwnerRegister';
import VenueOwnerPending from './pages/venue-owner/VenueOwnerPending';
import VenueOwnerBookings from './pages/venue-owner/VenueOwnerBookings';
import VenueOwnerTables from './pages/venue-owner/VenueOwnerTables';
import VenueOwnerAnalytics from './pages/venue-owner/VenueOwnerAnalytics';
import VenueApprovalsPage from './pages/admin/VenueApprovalsPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import SettingsPage from './pages/SettingsPage';
import ExplorePage from './pages/ExplorePage';
import SupabaseTest from './components/SupabaseTest';
import AuthTestPage from './pages/AuthTestPage';
import EmailTest from './components/EmailTest';
import MapTest from './components/MapTest';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/venues/:id" element={<VenueDetailPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/explore" element={<ExplorePage />} />

            {/* Customer Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Venue Owner Routes */}
            <Route path="/venue-owner/login" element={<VenueOwnerLogin />} />
            <Route path="/venue-owner/register" element={<VenueOwnerRegister />} />
            <Route path="/venue-owner/pending" element={<VenueOwnerPending />} />
            <Route path="/venue-owner/dashboard" element={<VenueOwnerDashboard />} />
            <Route path="/venue-owner/bookings" element={<VenueOwnerBookings />} />
            <Route path="/venue-owner/tables" element={<VenueOwnerTables />} />
            <Route path="/venue-owner/analytics" element={<VenueOwnerAnalytics />} />

            {/* Admin Routes */}
            <Route path="/admin/venue-approvals" element={<VenueApprovalsPage />} />

            {/* Test Routes */}
            <Route path="/test" element={<SupabaseTest />} />
            <Route path="/auth-test" element={<AuthTestPage />} />
            <Route path="/email-test" element={<EmailTest />} />
            <Route path="/map-test" element={<MapTest />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
};

export default App;