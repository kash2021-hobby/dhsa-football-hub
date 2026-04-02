// src/pages/Tournaments.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// FIXED: Added ChevronRight to the import list!
import { MapPin, Trophy, Users, ArrowLeft, ChevronRight, Clock, Shield } from 'lucide-react';
import { fetchTournaments } from '../services/api';
import { StatusBadge } from '../components/UnifiedMatchCard.jsx'; 

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
};

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments().then(setTournaments);
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-7xl mx-auto px-6 py-12 bg-slate-50 min-h-screen">
      
      <Link to="/" className="inline-flex items-center gap-2.5 text-slate-500 hover:text-emerald-600 transition-colors mb-10 font-medium px-4 py-2 rounded-full border border-slate-200 bg-white shadow shadow-slate-200/50">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 drop-shadow-md">Official Tournaments</h1>
        <p className="text-slate-600 max-w-2xl text-lg font-medium">Browse and register your club for the upcoming DHSA sanctioned tournaments. Secure your spot before the deadlines close.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {tournaments.map((tournament, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            key={tournament.id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 group"
          >
            <div className="h-52 relative overflow-hidden bg-slate-900 border-b border-slate-200">
              <img src={tournament.banner_url} alt={tournament.name} className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute top-5 left-5">
                <StatusBadge status={tournament.status === 'Ongoing' ? 'Live' : 'Upcoming'} />
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-black text-slate-900 mb-6 drop-shadow">{tournament.name}</h3>
              
              <div className="grid grid-cols-2 gap-y-5 gap-x-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner"><Shield className="w-5 h-5 shrink-0" /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Format</p>
                    <p className="font-semibold text-slate-700">{tournament.format}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner"><MapPin className="w-5 h-5 shrink-0" /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Venue</p>
                    <p className="font-semibold text-slate-700 text-sm whitespace-nowrap overflow-ellipsis">{tournament.venue}</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-colors shadow-emerald-500/10 group-hover:shadow-lg">
                Apply / Register Team <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}