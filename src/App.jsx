import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ClubsPage from '@/pages/ClubsPage';
import ClubDetailPage from '@/pages/ClubDetailPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminBookingsPage from '@/pages/admin/AdminBookingsPage';
import AdminReferralsPage from '@/pages/admin/AdminReferralsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminTableLayoutPage from '@/pages/admin/AdminTableLayoutPage';
import AdminQRCodePage from '@/pages/admin/AdminQRCodePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import JoinVenuePage from '@/pages/JoinVenuePage';
import UserProfilePage from '@/pages/UserProfilePage';
import LoyaltyPage from '@/pages/LoyaltyPage';
import ExplorePage from '@/pages/ExplorePage';
import VenuesPage from '@/pages/VenuesPage';
import EventsPage from '@/pages/EventsPage';
import VenueDetailPage from '@/pages/VenueDetailPage';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:id" element={<ClubDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join-venue" element={<JoinVenuePage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="referrals" element={<AdminReferralsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="table-layout" element={<AdminTableLayoutPage />} />
            <Route path="qr-code" element={<AdminQRCodePage />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;