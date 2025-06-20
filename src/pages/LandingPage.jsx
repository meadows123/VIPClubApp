import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Music, Utensils, User, Store } from 'lucide-react';

const LandingPage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 'restaurant',
      name: 'Restaurants',
      description: 'Discover the finest dining experiences in Lagos',
      icon: Utensils,
      color: 'bg-brand-burgundy',
    },
    {
      id: 'club',
      name: 'Clubs',
      description: 'Experience the vibrant nightlife of Lagos',
      icon: Music,
      color: 'bg-brand-burgundy-light',
    },
    {
      id: 'lounge',
      name: 'Lounges',
      description: 'Relax in sophisticated lounges across the city',
      icon: Building2,
      color: 'bg-brand-burgundy',
    },
  ];

  const handleCustomerClick = () => {
    setShowCategories(true);
  };

  const handleOwnerClick = () => {
    navigate('/venue-owner/login');
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/venues?type=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <AnimatePresence>
        {!showCategories ? (
          <motion.section 
            className="relative bg-brand-burgundy flex items-center justify-center overflow-hidden min-h-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-burgundy via-brand-burgundy-light to-brand-burgundy flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/src/assets/pattern.png')] opacity-10"></div>
              <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full relative z-10">
                <div className="max-w-4xl w-full text-white text-center">
                  <motion.h1 
                    className="text-6xl md:text-7xl font-heading mb-8 font-bold tracking-tight leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="block mb-4 text-white/90">Discover</span>
                    <span className="block text-7xl md:text-8xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">Eddys'</span>
                    <span className="block text-5xl md:text-6xl text-white/95">Finest Venues</span>
                  </motion.h1>
                  <motion.p 
                    className="text-2xl md:text-2xl mb-12 text-white/80 font-medium max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Book tables, enjoy exclusive experiences, and make unforgettable memories
                  </motion.p>
                  <motion.div 
                    className="flex flex-col md:flex-row gap-8 justify-center items-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCustomerClick}
                      className="flex items-center gap-3 bg-brand-cream text-brand-burgundy text-xl px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-brand-cream/90 transition-colors min-w-[200px] justify-center"
                    >
                      <User className="w-5 h-5" />
                      I'm a Customer
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleOwnerClick}
                      className="flex items-center gap-3 bg-transparent border-2 border-brand-cream text-brand-cream text-xl px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-brand-cream/10 transition-colors min-w-[200px] justify-center"
                    >
                      <Store className="w-5 h-5" />
                      I'm a Venue Owner
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            className="bg-brand-cream py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-heading text-brand-burgundy mb-16 text-center font-bold">
                Browse by Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="group cursor-pointer"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-brand-burgundy/10 group-hover:border-brand-burgundy-light transition-all">
                      <div className={`${category.color} h-56 flex items-center justify-center`}> 
                        <category.icon className="w-20 h-20 text-brand-cream" />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-brand-burgundy mb-3">
                          {category.name}
                        </h3>
                        <p className="text-brand-burgundy/70 text-lg">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage; 