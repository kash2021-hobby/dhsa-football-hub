// src/components/UnifiedMatchCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Activity, CalendarDays, CheckCircle, Clock } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  // Shrunk badge size for mobile viewing
  const baseClasses = "px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 border shadow-inner shadow-black/10";
  if (status === 'Live') {
    return <span className={`${baseClasses} bg-red-500 text-white border-red-500`}><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> {status}</span>;
  }
  if (status === 'Upcoming') {
    return <span className={`${baseClasses} bg-amber-400 text-slate-800 border-amber-400`}> <Clock className="w-3 h-3"/> {status}</span>;
  }
  return <span className={`${baseClasses} bg-slate-100 text-slate-600 border-slate-200`}><CheckCircle className="w-3 h-3" /> {status}</span>;
};

export const UnifiedMatchCard = ({ match, idx = 0 }) => (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -4 }}
      // Reduced padding for mobile (p-5 instead of p-8)
      className={`relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 group w-full`}
    >
      {/* Top Row: Flex-col on mobile, row on PC */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 md:mb-6 gap-2 md:gap-0">
          <StatusBadge status={match.status} />
          <div className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {match.tournament_name} • {match.match_date}
          </div>
      </div>

      <div className="flex justify-between items-center mb-6 md:mb-8">
        
        {/* Team 1 */}
        <div className="flex-1 text-center w-1/3">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl mx-auto mb-2 md:mb-3 flex items-center justify-center text-slate-400 font-bold border border-slate-100 shadow text-sm md:text-base">
            {match.team1_name.substring(0, 3).toUpperCase()}
          </div>
          <h4 className="font-bold text-slate-800 text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis px-1">{match.team1_name}</h4>
        </div>

        {/* Score Block */}
        <div className="px-1 md:px-4 flex flex-col items-center justify-center w-1/3">
          {match.status === 'Upcoming' ? (
            <div className="text-sm md:text-lg font-bold text-slate-400 bg-slate-100 px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl backdrop-blur-md border border-slate-200 shadow-inner whitespace-nowrap">
              {match.match_time}
            </div>
          ) : (
            <div className="flex items-center justify-center relative bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl px-3 py-1.5 md:px-6 md:py-2 shadow-inner">
                {/* Fixed the stacking issue by ensuring flex row and smaller mobile text */}
                <div className="flex flex-row items-center text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tighter drop-shadow-sm relative z-10">
                    <span>{match.team1_score}</span>
                    <span className="text-slate-300 mx-1.5 md:mx-2">-</span>
                    <span>{match.team2_score}</span>
                </div>
            </div>
          )}
          {match.status === 'Live' && <span className="text-slate-500 text-[10px] md:text-xs font-bold mt-2 uppercase tracking-widest">{match.match_time}' MIN</span>}
        </div>

        {/* Team 2 */}
        <div className="flex-1 text-center w-1/3">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl mx-auto mb-2 md:mb-3 flex items-center justify-center text-slate-400 font-bold border border-slate-100 shadow text-sm md:text-base">
            {match.team2_name.substring(0, 3).toUpperCase()}
          </div>
          <h4 className="font-bold text-slate-800 text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis px-1">{match.team2_name}</h4>
        </div>

      </div>

      <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm mb-6 md:mb-8">
          <MapPin className="w-4 h-4 shrink-0"/>
          <span className="font-medium text-slate-700 truncate">{match.venue}</span>
      </div>

      <Link to={`/match/${match.id}`} className="block w-full text-center bg-slate-900 hover:bg-emerald-600 text-white text-sm md:text-base font-bold py-3 md:py-4 rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg shadow-emerald-500/20">
        View Match Details <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
);

export const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center gap-3 mb-6 md:mb-8 pl-1 md:pl-2">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/40 border border-slate-200">
            {icon}
        </div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
    </div>
);