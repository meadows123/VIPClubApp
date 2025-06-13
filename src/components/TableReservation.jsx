import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const TableReservation = ({ clubId, onReserve }) => {
  const { toast } = useToast();
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState(4);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const tables = [
    { id: 1, name: 'Standard', capacity: '1-4', price: 300 },
    { id: 2, name: 'Premium', capacity: '4-8', price: 500 },
    { id: 3, name: 'VIP', capacity: '6-10', price: 800 },
    { id: 4, name: 'Ultra VIP', capacity: '10-15', price: 1200 },
    { id: 5, name: 'Platinum', capacity: '15-20', price: 2000 },
    { id: 6, name: 'Owner\'s Booth', capacity: '20+', price: 3500 },
  ];
  
  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };
  
  const handleReserve = () => {
    if (!selectedTable || !date || !time || !guestCount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a table.",
        variant: "destructive",
      });
      return;
    }
    
    onReserve({
      tableId: selectedTable.id,
      tableName: selectedTable.name,
      price: selectedTable.price,
      date,
      time,
      guestCount
    });
    
    toast({
      title: "Table selected!",
      description: `${selectedTable.name} table has been added to your selection.`,
    });
  };
  
  return (
    <div className="bg-secondary/20 border border-border/50 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6">Reserve a Table</h3>
      
      <div className="mb-6">
        <Label htmlFor="date" className="mb-2 block">Date</Label>
        <div className="relative">
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-10"
            min={new Date().toISOString().split('T')[0]}
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="mb-6">
        <Label htmlFor="time" className="mb-2 block">Time</Label>
        <div className="relative">
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="pl-10"
          />
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="mb-6">
        <Label htmlFor="guests" className="mb-2 block">Number of Guests</Label>
        <div className="relative">
          <Input
            id="guests"
            type="number"
            min="1"
            max="30"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="pl-10"
          />
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="mb-6">
        <Label className="mb-3 block">Select a Table</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tables.map((table) => (
            <motion.div
              key={table.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTableSelect(table)}
              className={`table-item cursor-pointer p-4 rounded-lg border ${
                selectedTable?.id === table.id
                  ? 'border-primary bg-primary/20 neon-border'
                  : 'border-border/50 bg-secondary/30'
              }`}
            >
              <h4 className="font-medium text-sm">{table.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">Fits {table.capacity} people</p>
              <p className="text-sm font-bold">${table.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleReserve} 
        disabled={!selectedTable || !date || !time}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-accent-foreground"
      >
        {selectedTable ? `Reserve ${selectedTable.name} Table - $${selectedTable.price}` : 'Select a Table'}
      </Button>
    </div>
  );
};

export default TableReservation;