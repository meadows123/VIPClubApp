import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, List, Search, Filter, Aperture, X } from 'lucide-react'; // Added more icons
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VenueCard from '@/components/VenueCard';
import { allVenuesData, getLagosLocations, getVenueTypes, getCuisineTypes } from '@/data/clubData';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '60vh'
};

const center = {
  lat: 6.5244, // Lagos center latitude
  lng: 3.3792  // Lagos center longitude
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyAPFBY4iFT_9N-O8yBdJpydgj3zxIxojfM'; // Replace with your real API key

const ExplorePage = () => {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(allVenuesData);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    location: 'all',
    venueType: 'all',
    openNow: 'all', // 'yes', 'no', 'all'
    vipOnly: 'all', // 'yes', 'no', 'all'
    outdoorSeating: 'all', // 'yes', 'no', 'all'
    cuisineType: 'all',
  });

  const lagosLocations = getLagosLocations();
  const venueTypes = getVenueTypes();
  const cuisineTypes = getCuisineTypes();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    let results = allVenuesData;
    if (searchTerm) {
      results = results.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply filters
    if (filters.location !== 'all') results = results.filter(v => v.location === filters.location);
    if (filters.venueType !== 'all') results = results.filter(v => v.venueType === filters.venueType);
    if (filters.cuisineType !== 'all') results = results.filter(v => Array.isArray(v.cuisine) && v.cuisine.includes(filters.cuisineType));
    // Placeholder for 'Open Now', 'VIP Only', 'Outdoor Seating' as data model needs expansion
    // For now, these filters won't do anything until data model supports them
    if (filters.openNow === 'yes') console.log("Filtering for 'Open Now' venues - data model needs update");
    if (filters.vipOnly === 'yes') console.log("Filtering for 'VIP Only' venues - data model needs update");
    if (filters.outdoorSeating === 'yes') console.log("Filtering for 'Outdoor Seating' - data model needs update");

    setFilteredVenues(results);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-burgundy font-body">
      <div className="container py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-heading mb-3 text-brand-burgundy">Explore Lagos Nightlife</h1>
          <p className="text-lg text-brand-burgundy/80 max-w-2xl mx-auto">
            Discover the vibrant pulse of Lagos. Find hidden gems, iconic hotspots, and your next favorite venue.
          </p>
        </motion.div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Input
              type="text"
              placeholder="Search venues, areas, or vibes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-brand-burgundy/20 focus:border-brand-gold focus:ring-brand-gold text-brand-burgundy rounded-full shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-burgundy/50" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold/10 ${showFilters ? 'bg-brand-gold text-brand-burgundy' : ''}`}
            >
              <Filter className="h-4 w-4 mr-2" /> Filters {showFilters ? <X className="h-4 w-4 ml-2" /> : null}
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
              className={`rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold/10 ${viewMode === 'map' ? 'bg-brand-gold text-brand-burgundy' : ''}`}
            >
              <MapPin className="h-4 w-4 mr-2" /> Map
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className={`rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold/10 ${viewMode === 'list' ? 'bg-brand-gold text-brand-burgundy' : ''}`}
            >
              <List className="h-4 w-4 mr-2" /> List
            </Button>
          </div>
        </div>

        {/* Filters Drawer/Section */}
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-brand-burgundy/10 overflow-hidden"
          >
            <h3 className="text-xl font-heading text-brand-burgundy mb-4">Filter Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="location" className="text-sm text-brand-burgundy/80">Location</Label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                  <SelectTrigger id="location" className="bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy"><SelectValue placeholder="All Lagos Areas" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Lagos Areas</SelectItem>{lagosLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="venueType" className="text-sm text-brand-burgundy/80">Venue Type</Label>
                <Select value={filters.venueType} onValueChange={(value) => handleFilterChange('venueType', value)}>
                  <SelectTrigger id="venueType" className="bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy"><SelectValue placeholder="Any Type" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">Any Type</SelectItem>{venueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cuisineType" className="text-sm text-brand-burgundy/80">Cuisine</Label>
                <Select value={filters.cuisineType} onValueChange={(value) => handleFilterChange('cuisineType', value)}>
                  <SelectTrigger id="cuisineType" className="bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy"><SelectValue placeholder="Any Cuisine" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">Any Cuisine</SelectItem>{cuisineTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {/* Quick Filters - Data model expansion needed for functionality */}
              <div>
                <Label htmlFor="openNow" className="text-sm text-brand-burgundy/80">Availability</Label>
                <Select value={filters.openNow} onValueChange={(value) => handleFilterChange('openNow', value)} disabled>
                  <SelectTrigger id="openNow" className="bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy"><SelectValue placeholder="Open Now (Soon)" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">Any Time</SelectItem><SelectItem value="yes">Open Now</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vipOnly" className="text-sm text-brand-burgundy/80">Exclusivity</Label>
                <Select value={filters.vipOnly} onValueChange={(value) => handleFilterChange('vipOnly', value)} disabled>
                  <SelectTrigger id="vipOnly" className="bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy"><SelectValue placeholder="VIP Only (Soon)" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Access</SelectItem><SelectItem value="yes">VIP Only</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="outdoorSeating" className="text-sm text-brand-burgundy/80">Features</Label>
                <Select value={filters.outdoorSeating} onValueChange={(value) => handleFilterChange('outdoorSeating', value)} disabled>
                  <SelectTrigger id="outdoorSeating" className="bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy"><SelectValue placeholder="Outdoor (Soon)" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">Any Features</SelectItem><SelectItem value="yes">Outdoor Seating</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Area */}
        {viewMode === 'map' && (
          <motion.div
            key="mapView"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white h-[60vh] rounded-xl shadow-lg border border-brand-burgundy/10 flex flex-col items-center justify-center p-8"
          >
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
              >
                {filteredVenues.map(venue => (
                  <Marker
                    key={venue.id}
                    position={{ lat: venue.latitude, lng: venue.longitude }}
                    title={venue.name}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div>Loading Map...</div>
            )}
            <Button onClick={() => setViewMode('list')} className="mt-8 bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
              Switch to List View
            </Button>
          </motion.div>
        )}

        {viewMode === 'list' && (
          <motion.div
            key="listView"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVenues.map((venue, index) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  >
                    <VenueCard venue={venue} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Aperture className="h-20 w-20 mx-auto text-brand-burgundy/30 mb-6" />
                <h3 className="text-2xl font-heading text-brand-burgundy mb-3">No Venues Found</h3>
                <p className="text-brand-burgundy/70 font-body mb-6 max-w-md mx-auto">
                  We couldn't find any venues matching your current filters. Try adjusting them or broadening your search.
                </p>
                <Button onClick={() => setShowFilters(true)} className="bg-brand-gold text-brand-burgundy hover:bg-brand-gold/90">
                  Adjust Filters
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;