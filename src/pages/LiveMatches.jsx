// src/pages/LiveMatches.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft, Trophy } from 'lucide-react';
import { fetchMatches } from '../services/api';
import { UnifiedMatchCard } from '../components/UnifiedMatchCard.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function LiveMatches() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLiveMatches = async () => {
    try {
      const data = await fetchMatches();
      // Filter only matches that are currently LIVE
      const live = data.filter(m => m.status === 'Live' || m.is_live === true);
      setLiveMatches(live);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveMatches(); // Initial load

    // Poll every 2 seconds to keep scores updated in real-time
    const interval = setInterval(() => {
      loadLiveMatches();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-slate-50 min-h-screen pb-20">
      
      {/* 🌟 Header Banner */}
      <div className="bg-white pt-12 pb-16 border-b border-slate-200 shadow-inner shadow-black/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 shadow-inner">
                <Activity className="w-8 h-8 text-red-500 animate-pulse" />
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter drop-shadow-sm mb-4">
            Live <span className="text-red-500">Match Center</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">Real-time scores and updates directly from the pitch.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 relative z-20">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-600 transition-colors mb-10 font-medium px-4 py-2 rounded-full border border-slate-200 bg-white shadow shadow-slate-200/50">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {loading ? (
           <div className="text-center py-20 animate-pulse">
             <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
             <p className="text-xl font-bold text-slate-400">Searching for live broadcasts...</p>
           </div>
        ) : liveMatches.length > 0 ? (
          /* 🌟 The "Biggerly" Layout: 1 column, full width cards with extra spacing */
          <div className="space-y-12">
            {liveMatches.map((match, idx) => (
              <div key={match.id} className="transform transition-transform hover:scale-[1.01]">
                <UnifiedMatchCard match={match} idx={idx} />
              </div>
            ))}
          </div>
        ) : (
          /* 🌟 Empty State */
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-slate-200 mt-4">
             <Trophy className="w-20 h-20 text-slate-200 mx-auto mb-6" />
             <h2 className="text-3xl font-black text-slate-900 mb-4">No Matches Currently Live</h2>
             <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">
               There are no active games at this moment. Check the upcoming schedule to see when the next match kicks off!
             </p>
             <Link to="/tournaments" className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-xl mt-8 hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/20">
               View Tournament Schedule
             </Link>
          </div>
        )}
      </div>

    </motion.div>
  );
}
