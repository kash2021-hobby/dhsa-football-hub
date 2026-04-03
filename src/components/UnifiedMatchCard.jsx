// src/components/UnifiedMatchCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// 🌟 EXACT SAME HELPER FROM COACH MANAGEMENT
// 🌟 THE ACTUAL FIX (With the $ sign included!)
// 🌟 Google Drive Image Helper
const getDriveImageUrl = (url) => { if (!url) return "https://placehold.co/150x150?text=No+Photo"; const match = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/); const fileId = match ? match[1] : null; if (!fileId) return url; return `https://lh3.googleusercontent.com/d/${fileId}`; };

// 🌟 Exported StatusBadge 
export const StatusBadge = ({ status }) => {
  if (status === 'Live') return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Live</span>;
  if (status === 'Upcoming' || status === 'Scheduled' || status === 'Pending Setup') return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit">Upcoming</span>;
  return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit">{status}</span>;
};

// 🌟 Exported SectionHeader 
export const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-2 mb-6">
    {icon}
    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
  </div>
);

// 🌟 Exported UnifiedMatchCard
export const UnifiedMatchCard = ({ match, idx = 0 }) => {
  const isLive = match.status === 'Live' || match.is_live;
  const isCompleted = match.status === 'Full Time' || match.status === 'Completed';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ delay: idx * 0.05 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-200 flex flex-col relative group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          {match.tournament_name || "Tournament"} • {match.round_name || "Match"}
        </span>
        <StatusBadge status={isLive ? 'Live' : match.status} />
      </div>

      <div className="flex items-center justify-between mb-8">
        {/* ================= TEAM 1 SECTION ================= */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden shrink-0">
            {/* 🌟 LOGO DISPLAY LOGIC */}
            {match.team1_logo ? (
              <img 
                src={getDriveImageUrl(match.team1_logo)} 
                alt={match.team1_name} 
                className="w-full h-full object-cover" 
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/150x150/f8fafc/94a3b8?text=Logo"; 
                }} 
              />
            ) : (
              <Shield className="w-8 h-8 text-slate-300" />
            )}
          </div>
          <h3 className="font-black text-slate-800 text-center text-sm md:text-base leading-tight line-clamp-2">{match.team1_name}</h3>
        </div>

        {/* ================= SCORE SECTION ================= */}
        <div className="px-4 flex flex-col items-center justify-center shrink-0 min-w-[100px]">
          {(isLive || isCompleted) ? (
            <div className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter tabular-nums flex items-center gap-2">
              <span>{match.team1_score}</span><span className="text-slate-300 text-xl md:text-3xl font-light">-</span><span>{match.team2_score}</span>
            </div>
          ) : (
            <div className="text-xl md:text-2xl font-black text-slate-300 italic">VS</div>
          )}
        </div>

        {/* ================= TEAM 2 SECTION ================= */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden shrink-0">
             {/* 🌟 LOGO DISPLAY LOGIC */}
            {match.team2_logo ? (
              <img 
                src={getDriveImageUrl(match.team2_logo)} 
                alt={match.team2_name} 
                className="w-full h-full object-cover" 
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/150x150/f8fafc/94a3b8?text=Logo"; 
                }} 
              />
            ) : (
              <Shield className="w-8 h-8 text-slate-300" />
            )}
          </div>
          <h3 className="font-black text-slate-800 text-center text-sm md:text-base leading-tight line-clamp-2">{match.team2_name}</h3>
        </div>
      </div>

      {/* ================= FOOTER & MATCH INFO ================= */}
      <div className="mt-auto bg-slate-50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-100">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-100"><Calendar className="w-3.5 h-3.5 text-emerald-500"/> {match.match_date || "TBD"}</span>
          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-100"><Clock className="w-3.5 h-3.5 text-blue-500"/> {match.match_time || "TBD"}</span>
          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-100 truncate max-w-[120px]"><MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0"/> <span className="truncate">{match.venue || "TBD"}</span></span>
        </div>
        
        <Link to={`/match/${match.id}`} className="w-full sm:w-auto bg-slate-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shrink-0 shadow-md">
          {isLive ? 'Live Hub' : 'Match Details'} <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};