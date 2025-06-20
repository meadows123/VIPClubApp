import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import TableManagement from './components/TableManagement';
import { Button } from '../../components/ui/button';

const VenueOwnerTables = () => {
  return (
    <div className="bg-brand-cream/50 min-h-screen">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading text-brand-burgundy mb-2">Table Management</h1>
            <p className="text-brand-burgundy/70">Manage your venue's tables and seating arrangements</p>
          </div>
          <Button className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
            Add New Table
          </Button>
        </div>

        <Card className="bg-white border-brand-burgundy/10">
          <CardContent className="pt-6">
            <TableManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VenueOwnerTables; 