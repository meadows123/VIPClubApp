import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart3 } from 'lucide-react';

const VenueOwnerAnalytics = () => {
  return (
    <div className="bg-brand-cream/50 min-h-screen">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading text-brand-burgundy mb-2">Analytics</h1>
            <p className="text-brand-burgundy/70">View your venue's performance metrics</p>
          </div>
        </div>

        <Card className="bg-white border-brand-burgundy/10">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-brand-burgundy/50 mx-auto mb-4" />
                <p className="text-brand-burgundy/70">Analytics coming soon...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VenueOwnerAnalytics; 