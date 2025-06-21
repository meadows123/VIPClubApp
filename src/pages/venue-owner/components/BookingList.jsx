import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Eye, Check, X } from 'lucide-react';

const BookingList = ({ bookings = [], loading = false }) => {
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

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (!bookings.length) {
    return <div>No bookings found.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-brand-burgundy">Recent Bookings</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10">
            Export
          </Button>
          <Button size="sm" className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
            New Booking
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.customerName || booking.customer_name}</TableCell>
              <TableCell>
                {format(new Date(booking.date || booking.created_at), 'MMM d, yyyy h:mm a')}
              </TableCell>
              <TableCell>{booking.tableNumber || booking.table_number}</TableCell>
              <TableCell>₦{(booking.amount || booking.price || 0).toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {booking.status === 'pending' && (
                    <>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList; 