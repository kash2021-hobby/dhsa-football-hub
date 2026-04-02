// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// Add Menu and X to the lucide-react imports!
import { Trophy, Calendar, Home as HomeIcon, Globe, MessageSquare, Mail, Menu, X } from 'lucide-react';

import Home from './pages/Home.jsx';
import Tournaments from './pages/Tournaments.jsx';
import MatchDetails from './pages/MatchDetails.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-500">
              <span className="text-xl font-bold text-emerald-600">D</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">DHSA<span className="text-emerald-500">.</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3 font-semibold">
          <Link to="/" className="px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-2"><HomeIcon className="w-4 h-4" /> Home</Link>
          <Link to="/tournaments" className="px-5 py-2.5 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-2 text-slate-700"><Calendar className="w-4 h-4" /> Tournaments</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-emerald-600 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 flex items-center gap-3 font-semibold"><HomeIcon className="w-5 h-5" /> Home</Link>
              <Link to="/tournaments" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors flex items-center gap-3 font-semibold"><Calendar className="w-5 h-5" /> Tournaments</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

// ... keep Footer, AnimatedRoutes, and App exactly the same as before ...
const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-500">
              <span className="text-xl font-bold text-emerald-600">D</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DHSA<span className="text-emerald-500">.</span></span>
        </div>
        <p className="text-sm leading-relaxed max-w-sm">The DHSA Football Organization is dedicated to promoting excellence in football through competitive leagues, tournaments, and community programs.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
        <ul className="space-y-3 text-sm">
          <li>123 Football Avenue, Sports City</li>
          <li>+1 (555) 123-4567</li>
          <li>info@dhsa-football.org</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-sm">Follow Us</h4>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all text-emerald-500"><Globe className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-emerald-400 hover:text-white transition-all text-emerald-500"><MessageSquare className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-emerald-500"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-10 border-t border-slate-800 text-center text-xs">
        <p>&copy; 2026 DHSA Football Organization. All rights reserved.</p>
    </div>
  </footer>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/match/:id" element={<MatchDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col font-sans overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}