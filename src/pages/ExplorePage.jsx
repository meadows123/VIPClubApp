import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import { supabase } from '../lib/supabase';
import 'mapbox-gl/dist/mapbox-gl.css';

const ExplorePage = () => {
  const [venues, setVenues] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();

  // Fetch user location
  useEffect(() => {
    fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.loc) {
          const [lat, lng] = data.loc.split(',');
          setUserLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        } else {
          setUserLocation({ lat: 6.5244, lng: 3.3792 }); // Lagos
        }
      })
      .catch(() => {
        setUserLocation({ lat: 6.5244, lng: 3.3792 }); // Lagos
      });
  }, []);

  // Fetch venues from Supabase
  useEffect(() => {
    const fetchVenues = async () => {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('status', 'approved'); // adjust as needed

      if (error) {
        console.error('Error fetching venues:', error);
        setVenues([]);
        return;
      }

      // Transform to {lat, lng}
      const venuesWithCoords = data.map(venue => ({
        ...venue,
        lat: venue.location?.coordinates?.[1] || 0, // GeoJSON: [lng, lat]
        lng: venue.location?.coordinates?.[0] || 0,
      }));

      setVenues(venuesWithCoords);
    };

    fetchVenues();
  }, []);

  // Filtered venues
  const filteredVenues = venues.filter(v =>
    v.price >= minPrice &&
    v.rating >= minRating &&
    v.address?.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-fit map to all venues
  useEffect(() => {
    if (!mapRef.current || !filteredVenues.length) return;
    const map = mapRef.current.getMap();
    if (filteredVenues.length === 1) {
      map.flyTo({
        center: [filteredVenues[0].lng, filteredVenues[0].lat],
        zoom: 10
      });
    } else if (filteredVenues.length > 1) {
      const lats = filteredVenues.map(v => v.lat);
      const lngs = filteredVenues.map(v => v.lng);
      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)]
      ];
      map.fitBounds(bounds, { padding: 60, duration: 1000 });
    }
  }, [filteredVenues, userLocation]);

  fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`)
  .then(res => res.json())
  .then(data => {
    // ... your code ...
  }); 

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Explore Venues</h1>
      <div className="flex w-full h-[400px] rounded-lg shadow bg-gray-50">
        {/* Map */}
        <div className="flex-grow rounded-l-lg overflow-hidden">
          <Map
            ref={mapRef}
            initialViewState={{
              latitude: userLocation ? userLocation.lat : 6.5244,
              longitude: userLocation ? userLocation.lng : 3.3792,
              zoom: 5
            }}
            style={{ width: "100%", height: "100%" }}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            {filteredVenues.map(venue => (
              <Marker key={venue.id} latitude={venue.lat} longitude={venue.lng}>
                <div style={{ width: 20, height: 20, background: 'red', borderRadius: '50%' }} />
              </Marker>
            ))}
          </Map>
        </div>
        {/* Filter Bar */}
        <div className="w-64 bg-white shadow-lg p-4 flex flex-col gap-6 justify-start rounded-r-lg border-l border-gray-200">
          <div>
            <label className="block mb-1 font-semibold">Min Price: {minPrice}</label>
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={minPrice}
              onChange={e => setMinPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Min Rating: {minRating}</label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Search Address</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Address"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;