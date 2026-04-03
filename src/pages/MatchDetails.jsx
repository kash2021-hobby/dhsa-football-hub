// src/pages/MatchDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, UserCheck, Shield, ChevronRight, Trophy, Activity } from 'lucide-react';
import { fetchMatchById } from '../services/api';
import { UnifiedMatchCard } from '../components/UnifiedMatchCard.jsx'; 

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 }
};

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [simulatedMinute, setSimulatedMinute] = useState(0);

  // 🌟 FAST POLLING FOR REAL-TIME UPDATES
  useEffect(() => {
    let isMounted = true;
    let pollInterval;
    let minuteInterval;

    const loadMatchData = async () => {
      try {
        const data = await fetchMatchById(id);
        
        if (isMounted) {
          setMatch(data);
          
          // Auto-sync the simulated clock with the latest event minute
          if (data?.is_live && data.match_events?.length > 0) {
            const highestMin = Math.max(...data.match_events.map(e => e.minute));
            setSimulatedMinute(prev => (highestMin > prev ? highestMin : prev));
          }

          // Stop fetching every 2 seconds if the match is completely finished
          if (data?.status === 'Completed' || data?.status === 'Full Time') {
            clearInterval(pollInterval);
            clearInterval(minuteInterval);
          }
        }
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    // 1. Initial Load
    loadMatchData();

    // 2. Poll every 2 seconds (2000ms) for instant score/event updates
    pollInterval = setInterval(() => {
      loadMatchData();
    }, 2000);

    // 3. Simulate the clock ticking up every 1 minute (60000ms) while the page is open
    minuteInterval = setInterval(() => {
      setSimulatedMinute(prev => (prev < 90 ? prev + 1 : prev));
    }, 60000); 

    // Cleanup intervals when component unmounts
    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      clearInterval(minuteInterval);
    };
  }, [id]); 

  if (!match) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 animate-pulse">Loading Match Data...</div>;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header / Scoreboard Banner - White Theme */}
      <div className="bg-white pt-10 pb-16 border-b border-slate-200 shadow-inner shadow-black/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee125225f46?auto=format&fit=crop&q=80&w=2000')] opacity-5 object-cover mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* 🌟 Yellow Hover State */}
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-600 transition-colors mb-12 font-medium text-sm px-4 py-2 rounded-full border border-slate-200 bg-white shadow shadow-slate-200/50">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center mb-10">
            <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200 shadow-inner">
              {match.tournament_name} • {match.match_date}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Card will automatically re-render the score when 'match' state updates */}
              <UnifiedMatchCard match={match} idx={0}/>
              
              {/* Detailed Real-time Banner (Conditional) */}
               {match.is_live ? (
                    <div className="bg-slate-900 text-white rounded-3xl p-10 border border-slate-800 shadow-2xl shadow-black/20 flex flex-col justify-between overflow-hidden relative">
                         <div className="absolute -top-10 -right-10 opacity-5 group"><Trophy className="w-60 h-60 text-slate-400"/></div>
                         <div className="relative z-10">
                             <div className="text-red-500 font-bold flex items-center gap-2 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 shadow-xl mb-4 text-sm w-fit">
                               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> MATCH LIVE - {simulatedMinute}' MIN
                             </div>
                             <p className="text-slate-400 text-sm font-semibold mb-8">Scores and events update automatically from the official pitch-side referee feed.</p>
                         </div>
                         <div className="flex items-end justify-between gap-10">
                             <h2 className="text-4xl font-black tracking-tighter drop-shadow-md text-slate-300">Live <span className="text-white">Updates</span></h2>
                             {/* 🌟 Yellow Pulse Activity Icon */}
                             <Activity className="w-12 h-12 text-yellow-400 animate-pulse shrink-0"/>
                         </div>
                    </div>
                ) : (
                    /* 🌟 Yellow Theme for Stadium Entry Banner */
                    <div className="bg-yellow-400 text-slate-900 rounded-3xl p-10 border border-yellow-500 shadow-2xl shadow-yellow-500/20 flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute -top-10 -right-10 opacity-20 group"><MapPin className="w-60 h-60 text-yellow-600"/></div>
                        <div className="relative z-10">
                            <div className="text-slate-900 font-bold flex items-center gap-2 bg-yellow-300/50 px-4 py-1.5 rounded-full border border-yellow-300 shadow-sm mb-4 text-sm w-fit uppercase tracking-widest">
                              <Shield className="w-4 h-4"/> Stadium Entry
                            </div>
                            <p className="text-slate-800 text-sm font-semibold mb-8 max-w-sm">Entry tickets are now available for purchase at the DHSA club counter for all upcoming tournament matches.</p>
                        </div>
                        <div className="flex items-end justify-between gap-10 relative z-10">
                            <h2 className="text-4xl font-black tracking-tighter drop-shadow-sm text-slate-800">Attend The <span className="text-slate-900">Match</span></h2>
                            <ChevronRight className="w-12 h-12 text-yellow-600 shrink-0"/>
                        </div>
                    </div>
                )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Match Info Grid */}
        <div className="md:col-span-1 space-y-5">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
            {/* 🌟 Yellow Icon */}
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2 drop-shadow"><Shield className="w-5 h-5 text-yellow-500"/> Match Venue Info</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                  {/* 🌟 Yellow Info Backgrounds */}
                  <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100 shadow-inner"><MapPin className="w-5 h-5 shrink-0" /></div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Stadium</p>
                  <p className="font-semibold text-slate-700">{match.venue || "TBD"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100 shadow-inner"><Clock className="w-5 h-5 shrink-0" /></div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Date & Kickoff</p>
                  <p className="font-semibold text-slate-700">{match.match_date || "TBD"} • {match.match_time || "TBD"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100 shadow-inner"><UserCheck className="w-5 h-5 shrink-0" /></div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Official Referee</p>
                  <p className="font-semibold text-slate-700">{match.referee_name || "TBD"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl shadow-slate-200/40">
            <h3 className="font-black text-slate-900 mb-10 text-xl drop-shadow">Match Timeline (Events)</h3>
            
            {!match.match_events || match.match_events.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-medium whitespace-nowrap overflow-ellipsis">
                {match.status === 'Scheduled' || match.status === 'Upcoming' ? 'Match has not started yet.' : 'Waiting for events to be recorded...'}
              </div>
            ) : (
              <div className="relative border-l-2 border-slate-100 ml-4 space-y-10 pb-4">
                {match.match_events.sort((a,b) => b.minute - a.minute).map((event, idx) => {
                  
                  // Dynamically figure out the team name based on the ID saved by the referee
                  const teamName = event.teamId === match.team1_id ? match.team1_name : match.team2_name;

                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                      key={event.id || idx} className="relative pl-10"
                    >
                      {/* Note: Kept semantic colors here (Goal=Green, Sub=Blue) so users don't confuse Goal with Yellow Card */}
                      <div className={`absolute -left-3 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow ${
                        event.type === 'Goal' ? 'bg-emerald-500' : event.type === 'Yellow Card' ? 'bg-yellow-400' : event.type === 'Substitution' ? 'bg-blue-500' : 'bg-red-500'
                      }`}></div>
                      
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex justify-between items-center shadow shadow-black/5">
                        <div className="flex-1 overflow-hidden pr-4">
                          <p className="font-bold text-slate-800 text-lg truncate">
                             {/* Handle Substitutions VS Standard Events */}
                             {event.type === 'Substitution' ? (
                                <span><span className="text-emerald-600">↑ {event.playerOnName}</span> <span className="text-slate-300 mx-2">|</span> <span className="text-red-500">↓ {event.playerOffName}</span></span>
                             ) : (
                                event.playerName
                             )}
                          </p>
                          <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{teamName}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-black text-slate-900 text-3xl tracking-tighter drop-shadow">{event.minute} MIN'</span>
                          <p className={`text-xs font-bold uppercase mt-1 tracking-widest ${
                             event.type === 'Goal' ? 'text-emerald-600' : event.type === 'Yellow Card' ? 'text-yellow-600' : event.type === 'Substitution' ? 'text-blue-600' : 'text-red-600'
                          }`}>{event.type}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}