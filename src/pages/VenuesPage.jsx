import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Tag, Star, FilterX, Users, Utensils, GlassWater, Music2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VenueCard from '@/components/VenueCard';
import { allVenuesData, getLagosLocations, getVenueTypes, getVenueRatings, getCuisineTypes, getMusicGenresList, getVenueById } from '@/data/clubData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';
import VenueDetailPage from '@/pages/VenueDetailPage';

const VenuesPage = () => {
  const { id } = useParams();
  
  if (id) {
    return <VenueDetailPage />;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(allVenuesData);
  
  const [filters, setFilters] = useState({
    location: 'all',
    venueType: 'all',
    rating: 'all',
    cuisineType: 'all',
    musicGenre: 'all',
  });

  const lagosLocations = getLagosLocations();
  const venueTypes = getVenueTypes();
  const ratings = getVenueRatings();
  const cuisineTypes = getCuisineTypes();
  const musicGenres = getMusicGenresList();

  useEffect(() => {
    let results = allVenuesData;
    
    if (searchTerm) {
      results = results.filter(venue => 
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venue.ambiance && venue.ambiance.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (venue.cuisine && venue.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (venue.music && venue.music.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    if (filters.location !== 'all') {
      results = results.filter(venue => venue.location === filters.location);
    }
    if (filters.venueType !== 'all') {
      results = results.filter(venue => venue.venueType === filters.venueType);
    }
    if (filters.rating !== 'all') {
      results = results.filter(venue => venue.rating >= parseFloat(filters.rating));
    }
    if (filters.cuisineType !== 'all') {
        results = results.filter(venue => venue.cuisine && venue.cuisine.includes(filters.cuisineType));
    }
    if (filters.musicGenre !== 'all') {
        results = results.filter(venue => Array.isArray(venue.musicGenres) && venue.musicGenres.includes(filters.musicGenre));
    }
    
    setFilteredVenues(results);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      location: 'all',
      venueType: 'all',
      rating: 'all',
      cuisineType: 'all',
      musicGenre: 'all',
    });
  };

  // Top picks for tonight (example logic, can be more dynamic)
  const topPicks = allVenuesData.filter(v => v.rating >= 4.7).slice(0, 3);
  
  return (
    <div className="py-12 bg-brand-cream text-brand-burgundy">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-5xl font-heading mb-4 text-brand-burgundy">Explore Lagos' Premier Venues</h1>
          <p className="text-lg text-brand-burgundy/80 font-body max-w-3xl mx-auto">
            Discover an curated collection of Lagos' most exclusive clubs, sophisticated restaurants, and chic lounges.
          </p>
        </motion.div>

        {/* Top Picks for Tonight Section */}
        {topPicks.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-heading mb-8 text-center text-brand-burgundy">Top Picks for Tonight</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topPicks.map(venue => (
                 <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)"}}
                  >
                    <Card className="overflow-hidden h-full flex flex-col bg-white border-brand-burgundy/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          alt={`${venue.name} venue image`}
                         src="https://images.unsplash.com/photo-1699990320295-ecd2664079ab" />
                        <div className="absolute top-3 right-3">
                           <span className="bg-brand-gold text-brand-burgundy px-3 py-1 text-xs font-semibold rounded-full shadow">Top Pick</span>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-2xl font-heading text-brand-burgundy">{venue.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow pt-0">
                        <p className="text-sm text-brand-burgundy/70 mb-3 line-clamp-2">{venue.description}</p>
                        <div className="flex items-center text-sm text-brand-gold">
                          <Star className="h-4 w-4 fill-current mr-1" /> {venue.rating}
                        </div>
                      </CardContent>
                       <CardFooter className="pt-2">
                        <Button asChild className="w-full bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy/90 transition-opacity rounded-md">
                          <Link to={`/venues/${venue.id}`}>View Details & Book</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
        
        <div className="mb-10 p-6 md:p-8 bg-white border border-brand-burgundy/10 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-4 items-end">
            <div className="relative sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <Label htmlFor="search" className="text-sm font-body font-medium mb-1 block text-brand-burgundy/80">Search Venues</Label>
              <div className="relative">
                <Input 
                  id="search"
                  type="text" 
                  placeholder="Name, vibe, e.g., 'Rooftop Bar'" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-brand-cream/50 border-brand-burgundy/30 focus:border-brand-gold focus:ring-brand-gold text-brand-burgundy placeholder:text-brand-burgundy/60 rounded-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-burgundy/60" />
              </div>
            </div>

            <div>
              <Label htmlFor="location-filter" className="text-sm font-body font-medium mb-1 block text-brand-burgundy/80 flex items-center"><MapPin className="h-4 w-4 mr-1 text-brand-gold" />Location</Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger id="location-filter" className="h-12 bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy rounded-md"><SelectValue placeholder="All Lagos" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Lagos</SelectItem>{lagosLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type-filter" className="text-sm font-body font-medium mb-1 block text-brand-burgundy/80 flex items-center"><Tag className="h-4 w-4 mr-1 text-brand-gold" />Venue Type</Label>
              <Select value={filters.venueType} onValueChange={(value) => handleFilterChange('venueType', value)}>
                <SelectTrigger id="type-filter" className="h-12 bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy rounded-md"><SelectValue placeholder="Any Type" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Any Type</SelectItem>{venueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="rating-filter" className="text-sm font-body font-medium mb-1 block text-brand-burgundy/80 flex items-center"><Star className="h-4 w-4 mr-1 text-brand-gold" />Min. Rating</Label>
              <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                <SelectTrigger id="rating-filter" className="h-12 bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy rounded-md"><SelectValue placeholder="Any Rating" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Any Rating</SelectItem>{ratings.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="cuisine-filter" className="text-sm font-body font-medium mb-1 block text-brand-burgundy/80 flex items-center"><Utensils className="h-4 w-4 mr-1 text-brand-gold" />Cuisine Type</Label>
              <Select value={filters.cuisineType} onValueChange={(value) => handleFilterChange('cuisineType', value)}>
                <SelectTrigger id="cuisine-filter" className="h-12 bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy rounded-md"><SelectValue placeholder="Any Cuisine" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Any Cuisine</SelectItem>{cuisineTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="music-filter" className="text-sm font-body font-medium mb-1 block text-brand-burgundy/80 flex items-center"><Music2 className="h-4 w-4 mr-1 text-brand-gold" />Music Genre</Label>
              <Select value={filters.musicGenre} onValueChange={(value) => handleFilterChange('musicGenre', value)}>
                <SelectTrigger id="music-filter" className="h-12 bg-brand-cream/50 border-brand-burgundy/30 text-brand-burgundy rounded-md"><SelectValue placeholder="Any Genre" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Any Genre</SelectItem>{musicGenres.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
              </Select>
            </div>

          </div>
          <Button onClick={resetFilters} variant="ghost" className="mt-6 text-sm text-brand-burgundy/70 hover:text-brand-gold">
            <FilterX className="h-4 w-4 mr-1" /> Reset All Filters
          </Button>
        </div>
        
        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              >
                <VenueCard venue={venue} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Users className="h-16 w-16 mx-auto text-brand-burgundy/30 mb-6" />
              <h3 className="text-2xl font-heading mb-3 text-brand-burgundy">No Venues Match Your Criteria</h3>
              <p className="text-brand-burgundy/70 font-body mb-6 max-w-md mx-auto">
                Please try adjusting your search terms or filters. Lagos has many hidden gems waiting to be discovered!
              </p>
              <Button 
                variant="outline"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold/10"
                onClick={resetFilters}
              >
                Clear Filters & Search Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage;