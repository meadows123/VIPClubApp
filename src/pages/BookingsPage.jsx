import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const BookingsPage = () => {
  // Mock data - replace with actual data
  const bookings = [
    {
      id: 1,
      venueName: 'RSVP Lagos',
      date: '2024-03-20T19:00:00',
      type: 'table',
      status: 'confirmed',
      amount: 150000,
      guests: 4,
      location: 'Victoria Island'
    },
    {
      id: 2,
      venueName: 'Club Quilox',
      date: '2024-03-25T22:00:00',
      type: 'ticket',
      status: 'pending',
      amount: 25000,
      guests: 2,
      location: 'Victoria Island'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-brand-cream/50 min-h-screen">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-heading text-brand-burgundy mb-8">My Bookings</h1>

          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="bg-white border-brand-burgundy/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold text-brand-burgundy">
                    {booking.venueName}
                  </CardTitle>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-brand-burgundy/70">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-brand-burgundy/70">
                        <Clock className="h-4 w-4 mr-2" />
                        {format(new Date(booking.date), 'h:mm a')}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-brand-burgundy/70">
                        <MapPin className="h-4 w-4 mr-2" />
                        {booking.location}
                      </div>
                      <div className="flex items-center text-brand-burgundy/70">
                        <Users className="h-4 w-4 mr-2" />
                        {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-brand-burgundy/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-brand-burgundy/70">Total Amount</p>
                        <p className="text-lg font-semibold text-brand-burgundy">
                          ₦{booking.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10">
                          View Details
                        </Button>
                        {booking.status === 'pending' && (
                          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 