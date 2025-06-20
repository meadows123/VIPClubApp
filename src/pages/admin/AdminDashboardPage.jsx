import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, Ticket, TrendingUp, Gift } from 'lucide-react';

const AdminDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    avgBookingValue: 0,
    referralsUsed: 0,
  });

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('nightvibe_bookings') || '[]');
    setBookings(storedBookings);

    let totalRevenue = 0;
    let referralsUsed = 0;
    storedBookings.forEach(booking => {
      const ticketPrice = booking.ticket?.price || 0;
      const tablePrice = booking.table?.price || 0;
      let bookingTotal = ticketPrice + tablePrice + 25; // 25 service fee
      if (booking.vipPerksApplied?.includes("10% Discount Applied")) {
        bookingTotal *= 0.9;
      }
      totalRevenue += bookingTotal;
      if (booking.referralCode) referralsUsed++;
    });

    setStats({
      totalRevenue: totalRevenue,
      totalBookings: storedBookings.length,
      avgBookingValue: storedBookings.length > 0 ? totalRevenue / storedBookings.length : 0,
      referralsUsed: referralsUsed,
    });
  }, []);

  const bookingsByDay = bookings.reduce((acc, booking) => {
    const date = new Date(booking.bookingDate).toLocaleDateString('en-CA');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(bookingsByDay)
    .map(([date, count]) => ({ date, bookings: count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <motion.div variants={cardVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Card className="bg-secondary/30 border-border/50 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month (mock)</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="bg-secondary/30 border-border/50 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">+15 from last week (mock)</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="bg-secondary/30 border-border/50 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgBookingValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Up from $75.50 (mock)</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="bg-secondary/30 border-border/50 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals Used</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.referralsUsed}</div>
              <p className="text-xs text-muted-foreground">New feature (mock)</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-secondary/30 border-border/50 glass-effect">
          <CardHeader>
            <CardTitle>Bookings Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-secondary/30 border-border/50 glass-effect">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="flex justify-between items-center py-2 border-b border-border/30 last:border-b-0">
                <div>
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-muted-foreground">{booking.clubName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${((booking.ticket?.price || 0) + (booking.table?.price || 0) + 25).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {bookings.length === 0 && <p className="text-muted-foreground text-center py-4">No bookings yet.</p>}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardPage;