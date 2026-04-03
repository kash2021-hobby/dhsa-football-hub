// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// 🌟 ADDED 'Camera' to the icon imports for the gallery section
import { CalendarDays, ChevronRight, ChevronLeft, Activity, Search, Users, BookOpen, Camera } from 'lucide-react';
import { fetchMatches } from '../services/api';
import { UnifiedMatchCard, SectionHeader } from '../components/UnifiedMatchCard.jsx';
import { AboutUsContent, CommitteeContent } from './About.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const heroImages = [
  "/src/hero.png",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=2000",
];

// 🌟 10 High-Quality Placeholder Images for the Gallery
const galleryImages = [
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1536122985607-4fea00b52a95?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1553152531-79ecbd592db1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1518605368461-1ee125225f46?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
];

const MatchCarousel = ({ matches }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <button 
        onClick={() => scroll('left')} 
        className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl items-center justify-center text-slate-400 hover:text-yellow-500 hover:scale-105 active:scale-95 cursor-pointer transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 -mx-4 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {matches.map((match, idx) => (
          <div key={match.id} className="min-w-full lg:min-w-[calc(50%-0.75rem)] shrink-0 snap-center lg:snap-start">
            <UnifiedMatchCard match={match} idx={idx} />
          </div>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')} 
        className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl items-center justify-center text-slate-400 hover:text-yellow-500 hover:scale-105 active:scale-95 cursor-pointer transition-all z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default function Home() {
  const [matches, setMatches] = useState({ live: [], upcoming: [], past: [] });
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadMatches = async () => {
    try {
      const data = await fetchMatches();
      setMatches({
        live: data.filter(m => m.status === 'Live' || m.is_live === true),
        upcoming: data.filter(m => 
          (m.status === 'Upcoming' || m.status === 'Scheduled' || m.status === 'Pending Setup') && 
          m.status !== 'Live' && !m.is_live
        ),
        past: data.filter(m => m.status === 'Full Time' || m.status === 'Completed'),
      });
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    loadMatches(); // Initial load

    const interval = setInterval(() => {
      loadMatches();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToMatches = () => {
    document.getElementById('matches-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pb-20 bg-slate-50">
      
      {/* 🌟 Yellow & White Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden bg-white border-b border-slate-200 shadow-inner shadow-black/5">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={heroImages[currentSlide]}
              initial={{ opacity: 1, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1 }}
              alt="Football Stadium"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/70 to-white/90" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter leading-tight drop-shadow-sm">
            Welcome to <span className="text-yellow-500">DHSA</span> Football Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
             Your destination for live scores, upcoming matches, tournaments, and everything DHSA football.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link to="/tournaments" className="w-full sm:w-auto px-5 py-3.5 md:px-8 md:py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/20">
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> Search Upcoming Tournaments
            </Link>
            <button onClick={scrollToMatches} className="w-full sm:w-auto px-5 py-3.5 md:px-8 md:py-4 bg-slate-900 hover:bg-slate-800 backdrop-blur-md text-white rounded-full text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-xl">
              <Search className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> Search Upcoming Matches
            </button>
          </div>
          
           {/* 🌟 Yellow Slider Dots */}
           <div className="flex items-center gap-3 justify-center mt-12">
               {heroImages.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-4 outline-none ${
                     currentSlide === idx 
                      ? 'bg-yellow-400 border-yellow-100 scale-125' 
                      : 'bg-slate-300 border-slate-100 hover:bg-yellow-200'
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
               ))}
           </div>
        </div>
      </section>

      <div id="matches-section" className="max-w-7xl mx-auto px-6 mt-16 relative z-20 space-y-10">
        
        {/* Committee Section */}
        <section>
          <SectionHeader icon={<Users className="text-yellow-500 w-6 h-6"/>} title="DHSA Committee" />
          <CommitteeContent />
        </section>

        {/* Live Matches */}
        {matches.live.length > 0 && (
          <section className="pt-8">
            <SectionHeader icon={<Activity className="text-red-500 animate-pulse w-6 h-6"/>} title="Live Now" />
            <MatchCarousel matches={matches.live} />
          </section>
        )}
        
        {/* Upcoming Matches */}
        <section className="pt-8">
          <SectionHeader icon={<CalendarDays className="text-yellow-500 w-6 h-6"/>} title="Upcoming Matches" />
          <MatchCarousel matches={matches.upcoming} />
        </section>
        
        {/* Past Matches */}
        {matches.past.length > 0 && (
          <section className="pt-8">
            <SectionHeader icon={<Activity className="text-slate-400 w-6 h-6"/>} title="Recent Results" />
            <MatchCarousel matches={matches.past} />
          </section>
        )}

        {/* About Us Section */}
        <section className="pt-12">
          <SectionHeader icon={<BookOpen className="text-yellow-500 w-6 h-6"/>} title="About Us" />
          <AboutUsContent isHome={true} />
        </section>

        {/* 🌟 NEW: Photo Gallery Section */}
        <section className="pt-12 pb-10">
          <SectionHeader icon={<Camera className="text-yellow-500 w-6 h-6"/>} title="DHSA Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((imgSrc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-md border border-slate-200 cursor-pointer bg-slate-200"
              >
                <img 
                  src={imgSrc} 
                  alt={`DHSA Moment ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </motion.div>
  );
}