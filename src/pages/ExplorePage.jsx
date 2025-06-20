import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'
import Map from '../components/Map';

export default function ExplorePage() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('status', 'approved');

      if (error) throw error;

      // Transform venue data to include coordinates
      const venuesWithCoords = data.map(venue => ({
        ...venue,
        longitude: venue.location?.coordinates?.[0] || 0,
        latitude: venue.location?.coordinates?.[1] || 0
      }));

      setVenues(venuesWithCoords);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Venues</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden shadow-lg">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-500">
              {error}
            </div>
          ) : (
            <Map venues={venues} onVenueSelect={handleVenueSelect} />
          )}
        </div>

        {/* Venue Details Section */}
        <div className="lg:col-span-1">
          {selectedVenue ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedVenue.name}</h2>
              <img 
                src={selectedVenue.image_url} 
                alt={selectedVenue.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{selectedVenue.description}</p>
              <div className="space-y-2">
                <p><strong>Address:</strong> {selectedVenue.address}</p>
                <p><strong>Phone:</strong> {selectedVenue.phone}</p>
                <p><strong>Email:</strong> {selectedVenue.email}</p>
              </div>
              <button
                onClick={() => window.location.href = `/venues/${selectedVenue.id}`}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
              Select a venue on the map to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}