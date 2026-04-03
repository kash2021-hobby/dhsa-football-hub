// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy, Calendar, Home as HomeIcon, Globe, MessageSquare, Mail, Menu, X, Info, LogIn } from 'lucide-react';

import Home from './pages/Home.jsx';
import Tournaments from './pages/Tournaments.jsx';
import MatchDetails from './pages/MatchDetails.jsx';
import About from './pages/About.jsx';
import dhsaLogo from './dhsa_logo.jpeg';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo updated to Image */}
        <Link to="/" className="flex items-center gap-2 group">
          
          {/* 🌟 Increased height to h-14 (you can change it to h-16 if you want it even bigger) */}
          <img 
            src={dhsaLogo}
            alt="DHSA Logo" 
            className="h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform" 
          />

          {/* If your logo image already has the word "DHSA" in it, you can delete this span below! */}
          <span className="text-2xl font-black tracking-tight text-slate-900">
            DHSA<span className="text-yellow-500"></span>
          </span>
          
        </Link>

        {/* Desktop Nav - Yellow Hover States */}
        <nav className="hidden md:flex items-center gap-3 font-semibold">
          <Link to="/" className="px-5 py-2.5 rounded-full hover:bg-yellow-50 hover:text-yellow-700 transition-colors flex items-center gap-2 text-slate-700"><HomeIcon className="w-4 h-4" /> Home</Link>
          <Link to="/tournaments" className="px-5 py-2.5 rounded-full hover:bg-yellow-50 hover:text-yellow-700 transition-colors flex items-center gap-2 text-slate-700"><Calendar className="w-4 h-4" /> Tournaments</Link>
          <Link to="/about" className="px-5 py-2.5 rounded-full hover:bg-yellow-50 hover:text-yellow-700 transition-colors flex items-center gap-2 text-slate-700"><Info className="w-4 h-4" /> About Us</Link>
          
          <div className="h-6 w-px bg-slate-300 mx-2"></div> {/* Divider */}
          
          {/* Login button Yellow */}
          <a href="https://version2.dhsa.co.in/login" className="px-6 py-2.5 rounded-full bg-yellow-400 text-slate-900 hover:bg-yellow-500 transition-colors flex items-center gap-2 font-bold shadow-md"><LogIn className="w-4 h-4" /> Login</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-yellow-600 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown - Yellow Theme */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-yellow-50 hover:text-yellow-700 text-slate-700 flex items-center gap-3 font-semibold transition-colors"><HomeIcon className="w-5 h-5" /> Home</Link>
              <Link to="/tournaments" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-yellow-50 hover:text-yellow-700 text-slate-700 transition-colors flex items-center gap-3 font-semibold"><Calendar className="w-5 h-5" /> Tournaments</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-yellow-50 hover:text-yellow-700 text-slate-700 transition-colors flex items-center gap-3 font-semibold"><Info className="w-5 h-5" /> About Us</Link>
              <div className="h-px w-full bg-slate-100 my-2"></div>
              <a href="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center gap-3 font-bold shadow-md"><LogIn className="w-5 h-5" /> Login / Portal</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-black text-slate-900">D</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DHSA<span className="text-yellow-500">.</span></span>
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
          <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all text-yellow-500"><Globe className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all text-yellow-500"><MessageSquare className="w-4 h-4" /></a>
          <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all text-yellow-500"><Mail className="w-4 h-4" /></a>
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
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
