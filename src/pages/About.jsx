// src/pages/About.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen } from 'lucide-react';
import { SectionHeader } from '../components/UnifiedMatchCard.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export const AboutUsContent = ({ isHome = false }) => {
  const [expanded, setExpanded] = useState(!isHome);

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-200 text-slate-600 leading-relaxed font-medium">
      <p className="mb-6 text-justify">
        The Dima Hasao Sports Association then known as District Sports association is the longest functioning organisation in the district, was formed in the year 1952 under the able leadership of N.L.Daulagupu. Haflong has a long history of sports, it was home to the Khan Bahadur Gold Cup played in the Railway Field and reputed teams from Jullundur, Hyderabad and erstwhile East Bengal too participated.
      </p>
      <p className="mb-6 text-justify">
        In the year 1950, a Football Tournament Committee was formed with the SDO (C) as the ex-officio President of the Committee and the DEN (Rlys) as Secretary. Other members of the committee included N N Daulagupu, Yusuf Khan, D Hojai and others. The Committee organised football tournament but was faced with one big problem. People of Haflong had to invariably seek permission from the Railway authorities every now and then for the use of the ground and the ground too was not very big. It was that for this reason that there a growing desire among the people of Haflong to have a ground and a sports organisation.
      </p>

      {expanded && (
        <motion.div 
          initial={isHome ? { opacity: 0, height: 0 } : false} 
          animate={{ opacity: 1, height: 'auto' }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <p className="mb-6 text-justify">
            Accordingly on the 2nd of October 1952 under of N L Daulagupu, District Sports Association (DSA) was born, people came out voluntarily in great numbers to make the DSA ground also known as the Roman Field and even Nawka Field because it looked like a boat then. The SDO(C) was the ex-officio President, DEN (Rlys) ex officio Vice-President and N L Daulagupu the Secretary were selected as the office bearers of the committee. The other members of the committee were Gopesh Chandra Deb (Asst Secretary), Chunilal Mahajan (Treasurer), D Hojai, N N Daulagupu, Yusuf Khan, Sudhir Mukherjee and one representative from participating clubs like GRP, SDO(C) X1, Town Club etc.
          </p>
          <p className="mb-6 text-justify">
            The Association then and now organises big tournaments like the Kalooram Shield, Chunilal shield, Zaman shield, CEM,s Cup, N.C Kemprai Memorial, P K Daulagupu First Div Football etc. Also DSA has produced many greats sports person. Lt Abhijit Debroy (Basu), Lt Hermon Hmar, Thomson Langthasa, Baoringdao Bodo, Mathew Thangjom, Jerry Pulamte to name just a few.
          </p>
          <p className="mb-6 text-justify">
            Mention must be made of the Sub Junior Football team of the year 1990, which lifted the Sati Dev Trophy and marked the first in the history of DHSA Haflong in terms of winning an Inter District Tournament.
          </p>
          <p className="text-justify">
            The DHSA now is a body of 37 clubs and is actively organises and supports many sports like football, cricket, athletics, badminton, table tennis etc. From its birth in 1952, the DHSA now boasts of very modern facilities like floodlights, an indoor stadium to name a few. In fact it is one of the most picturesque ground in Assam with the mighty Barail Hills in the background.
          </p>
        </motion.div>
      )}

      {!expanded && (
        <button 
          onClick={() => setExpanded(true)} 
          className="text-slate-900 font-extrabold hover:text-yellow-500 transition-colors mt-2 text-sm uppercase tracking-wide"
        >
          Read More
        </button>
      )}
    </div>
  );
};

export const CommitteeContent = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
    {/* Presidents Table */}
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <div className="bg-slate-900 text-white px-6 py-4">
        <h3 className="font-black tracking-widest uppercase text-sm text-yellow-400">Presidents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-bold uppercase">Year</th>
              <th className="px-6 py-3 font-bold uppercase">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1952-1972</td><td className="px-6 py-4">SDO Civil, Ex officio</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1972-1982</td><td className="px-6 py-4">Deputy Commisioner Ex officio</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1982- 1996</td><td className="px-6 py-4">G .C Hojai</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1996- 2001</td><td className="px-6 py-4">Samarjit Haflongbar</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">2002-2007</td><td className="px-6 py-4">Purnendu Langthasa</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">2008- 2013</td><td className="px-6 py-4">Debojit Thaosen</td></tr>
            
            {/* 🌟 HIGHLIGHTED PRESENT ROW (Yellow Theme) */}
            <tr className="bg-yellow-50 border-l-4 border-yellow-400 shadow-sm relative z-10">
              <td className="px-6 py-4 font-black text-slate-900">2017 – Present</td>
              <td className="px-6 py-4 font-black text-slate-900 flex items-center">
                Debolal Gorlosa
                <span className="bg-yellow-400 text-slate-900 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider ml-3">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Secretaries Table */}
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <div className="bg-yellow-400 text-slate-900 px-6 py-4">
        <h3 className="font-black tracking-widest uppercase text-sm">Secretaries</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-bold uppercase">Year</th>
              <th className="px-6 py-3 font-bold uppercase">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1952- 1981</td><td className="px-6 py-4">N L Daulagupu</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1982- 1986</td><td className="px-6 py-4">J K Thaosen</td></tr>
            <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">1987 – 1995</td><td className="px-6 py-4">R K Daulagupu</td></tr>
            
            {/* 🌟 HIGHLIGHTED PRESENT ROW (Yellow Theme) */}
            <tr className="bg-yellow-50 border-l-4 border-yellow-400 shadow-sm relative z-10">
              <td className="px-6 py-4 font-black text-slate-900">1996- Present</td>
              <td className="px-6 py-4 font-black text-slate-900 flex items-center">
                T T Daulagupu
                <span className="bg-yellow-400 text-slate-900 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider ml-3">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pb-20 bg-slate-50 min-h-screen">
      
      {/* Header Banner - Yellow Theme */}
      <div className="bg-white pt-16 pb-24 border-b border-slate-200 text-center relative overflow-hidden shadow-inner shadow-black/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee125225f46?auto=format&fit=crop&q=80&w=2000')] opacity-5 object-cover mix-blend-overlay" />
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 relative z-10 tracking-tighter drop-shadow-sm">
          About <span className="text-yellow-500">DHSA</span>
        </h1>
      </div>

      {/* 🌟 FIXED: Removed -mt-12 and added py-12 so the text doesn't overlap the header! */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-20 space-y-16">
        <section>
          <SectionHeader icon={<Users className="text-yellow-500 w-6 h-6"/>} title="Our Committee" />
          <CommitteeContent />
        </section>

        <section>
          <SectionHeader icon={<BookOpen className="text-yellow-500 w-6 h-6"/>} title="Our History" />
          <AboutUsContent />
        </section>
      </div>

    </motion.div>
  );
}