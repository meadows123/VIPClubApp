import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Target, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary glow-text">About NightVibe</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your passport to the UK's most exclusive nightlife experiences. We connect you with legendary venues and unforgettable nights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img  
              src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b" 
              alt="Crowd enjoying a concert at a nightclub"
              className="rounded-lg shadow-2xl object-cover w-full h-auto aspect-[4/3] border-4 border-secondary" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-heading font-bold text-secondary">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              NightVibe was born from a passion for electrifying nights and seamless experiences. We saw a gap between discerning party-goers and the UK's best-kept nightlife secrets. Our mission is to bridge that gap, offering curated access to top-tier clubs, VIP tables, and exclusive events.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that a great night out should be effortless from start to finish. That's why we've built a platform that's intuitive, reliable, and packed with insider knowledge to help you craft your perfect evening.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-heading font-bold text-center mb-10 text-primary">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Gem className="h-10 w-10 text-secondary" />, title: 'Exclusive Access', description: 'Unlock doors to the most sought-after VIP areas and private events across the UK.' },
              { icon: <Target className="h-10 w-10 text-secondary" />, title: 'Curated Venues', description: 'Handpicked selection of premium nightclubs, known for their atmosphere, music, and service.' },
              { icon: <Zap className="h-10 w-10 text-secondary" />, title: 'Seamless Booking', description: 'Effortless table reservations and ticket purchases through our user-friendly platform.' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                className="bg-card p-6 rounded-lg shadow-lg border border-border/70 text-center glass-effect"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-heading font-bold mb-6 text-primary">Meet the Team (Coming Soon!)</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We're a dedicated team of nightlife enthusiasts, tech wizards, and customer service heroes. We're working hard to bring you the best. More about us soon!
          </p>
          <div className="flex justify-center">
              <img  
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296" 
                alt="Diverse team working collaboratively in a modern office"
                className="rounded-lg shadow-2xl object-cover w-full max-w-2xl h-auto aspect-video border-4 border-secondary" 
              />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;