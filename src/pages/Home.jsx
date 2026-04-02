// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, ChevronLeft, Activity, Search } from 'lucide-react';
import { fetchMatches } from '../services/api';
import { UnifiedMatchCard, SectionHeader } from '../components/UnifiedMatchCard.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const heroImages = [
  "https://images.unsplash.com/photo-1518605368461-1ee125225f46?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=2000",
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
        className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl items-center justify-center text-slate-400 hover:text-emerald-600 hover:scale-105 active:scale-95 cursor-pointer transition-all z-20"
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
        className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl items-center justify-center text-slate-400 hover:text-emerald-600 hover:scale-105 active:scale-95 cursor-pointer transition-all z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default function Home() {
  const [matches, setMatches] = useState({ live: [], upcoming: [], past: [] });
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🌟 Logic to fetch and categorize match data
  const loadMatches = async () => {
    try {
      const data = await fetchMatches();
      setMatches({
        // 1. LIVE: Include 'Live' status OR the is_live boolean
        live: data.filter(m => m.status === 'Live' || m.is_live === true),

        // 2. UPCOMING: Include 'Upcoming', 'Scheduled', or 'Pending Setup' 
        // BUT ONLY if they aren't currently Live
        upcoming: data.filter(m => 
          (m.status === 'Upcoming' || m.status === 'Scheduled' || m.status === 'Pending Setup') && 
          m.status !== 'Live' && !m.is_live
        ),

        // 3. PAST: Include 'Full Time' or 'Completed'
        past: data.filter(m => m.status === 'Full Time' || m.status === 'Completed'),
      });
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  // 🌟 Auto-Refresh (Polling) Effect
  useEffect(() => {
    loadMatches(); // Initial load

    // Fetch new data every 10 seconds to detect when a referee starts a match
    const interval = setInterval(() => {
      loadMatches();
    }, 0);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Hero Slider Effect
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
      
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden bg-slate-900 border-b border-slate-200 shadow-inner shadow-black/5">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={heroImages[currentSlide]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              alt="Football Stadium"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/70 to-slate-900/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter leading-tight drop-shadow-md">
            Welcome to <span className="text-emerald-500">DHSA</span> Football Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl mx-auto font-medium">
             Your destination for live scores, upcoming matches, tournaments, and everything DHSA football.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link to="/tournaments" className="w-full sm:w-auto px-5 py-3.5 md:px-8 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30">
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> Search Upcoming Tournaments
            </Link>
            <button onClick={scrollToMatches} className="w-full sm:w-auto px-5 py-3.5 md:px-8 md:py-4 bg-slate-900 hover:bg-slate-700 backdrop-blur-md text-white rounded-full text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all border border-slate-800 shadow-xl">
              <Search className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> Search Upcoming Matches
            </button>
          </div>
          
           <div className="flex items-center gap-3 justify-center mt-12">
               {heroImages.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-4 outline-none ${
                     currentSlide === idx 
                      ? 'bg-emerald-500 border-emerald-200 scale-125' 
                      : 'bg-slate-300 border-slate-100 hover:bg-emerald-300'
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
               ))}
           </div>
        </div>
      </section>

      <div id="matches-section" className="max-w-7xl mx-auto px-6 mt-16 relative z-20 space-y-10">
        
        {/* Live Matches */}
        {matches.live.length > 0 && (
          <section>
            <SectionHeader icon={<Activity className="text-red-500 animate-pulse w-6 h-6"/>} title="Live Now" />
            <MatchCarousel matches={matches.live} />
          </section>
        )}

        {/* Upcoming Matches */}
        <section>
          <SectionHeader icon={<CalendarDays className="text-amber-500 w-6 h-6"/>} title="Upcoming Matches" />
          <MatchCarousel matches={matches.upcoming} />
        </section>

        {/* Past Matches */}
        {matches.past.length > 0 && (
          <section>
            <SectionHeader icon={<Activity className="text-slate-400 w-6 h-6"/>} title="Recent Results" />
            <MatchCarousel matches={matches.past} />
          </section>
        )}

      </div>
    </motion.div>
  );
}