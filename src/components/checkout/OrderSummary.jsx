import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const OrderSummary = ({ selection, totalAmount, vipPerks }) => {
  return (
    <div className="bg-secondary/20 border border-border/50 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      
      <div className="mb-4">
        <h4 className="font-medium text-lg">{selection.clubName}</h4>
      </div>
      
      <div className="space-y-4 mb-6">
        {selection.ticket && (
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{selection.ticket.name}</h4>
              <span className="font-bold">${selection.ticket.price}</span>
            </div>
            <p className="text-xs text-muted-foreground">{selection.ticket.description}</p>
          </div>
        )}
        
        {selection.table && (
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{selection.table.tableName} Table</h4>
              <span className="font-bold">${selection.table.price}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground gap-2 flex-wrap">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {selection.table.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {selection.table.time}
              </div>
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {selection.table.guestCount} guests
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-border pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${(selection.ticket?.price || 0) + (selection.table?.price || 0)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Service Fee</span>
          <span>$25</span>
        </div>
        {vipPerks && vipPerks.includes("10% Discount Applied") && (
          <div className="flex justify-between mb-2 text-green-400">
            <span className="text-muted-foreground">Referral Discount</span>
            <span>-10%</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;