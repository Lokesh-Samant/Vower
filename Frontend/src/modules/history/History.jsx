import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const RepeatIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Mock Data
const historyData = [
  {
    id: 'CHG-001',
    stationName: 'Tesla Supercharger - Downtown',
    stationImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop',
    date: '22 Jan 2024',
    startTime: '14:30',
    endTime: '15:45',
    duration: '75 min',
    energy: '32.5 kWh',
    cost: '₹485',
    paymentMethod: 'UPI',
    connector: 'CCS2',
    vehicle: 'Tata Nexon EV'
  },
  {
    id: 'CHG-002',
    stationName: 'ChargePoint - Mall Road',
    stationImage: 'https://images.unsplash.com/photo-1565514020176-db793d8e1f8c?w=400&h=200&fit=crop',
    date: '18 Jan 2024',
    startTime: '09:00',
    endTime: '10:00',
    duration: '60 min',
    energy: '28.0 kWh',
    cost: '₹420',
    paymentMethod: 'Card',
    connector: 'CCS2',
    vehicle: 'MG ZS EV'
  },
  {
    id: 'CHG-003',
    stationName: 'EVgo - Highway Plaza',
    stationImage: 'https://images.unsplash.com/photo-1596707328770-7a895326e391?w=400&h=200&fit=crop',
    date: '15 Jan 2024',
    startTime: '18:15',
    endTime: '19:30',
    duration: '75 min',
    energy: '35.2 kWh',
    cost: '₹528',
    paymentMethod: 'Wallet',
    connector: 'Type 2',
    vehicle: 'Tata Nexon EV'
  }
];

export default function ChargingHistory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  const filteredHistory = historyData.filter(item =>
    item.stationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics
  const stats = {
    totalSessions: historyData.length,
    totalEnergy: historyData.reduce((acc, item) => acc + parseFloat(item.energy), 0).toFixed(1),
    totalAmount: historyData.reduce((acc, item) => acc + parseInt(item.cost.replace('₹', '')), 0),
    avgTime: Math.round(historyData.reduce((acc, item) => acc + parseInt(item.duration), 0) / historyData.length)
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-xl font-bold text-[#111111]">Charging History</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Search & Filters */}
      <div className="sticky top-[73px] bg-white z-30 px-4 py-3 border-b border-gray-100">
        <div className="flex gap-3 max-w-lg mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>
          <button className="p-3 bg-gray-50 border border-[#EAEAEA] rounded-xl hover:bg-gray-100 transition-colors">
            <FilterIcon />
          </button>
        </div>
      </div>

      <main className="px-4 max-w-lg mx-auto pt-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400">Total Sessions</p>
            <p className="text-2xl font-bold">{stats.totalSessions}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400">Total Energy</p>
            <p className="text-2xl font-bold">{stats.totalEnergy} <span className="text-sm font-normal">kWh</span></p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400">Total Spent</p>
            <p className="text-2xl font-bold">₹{stats.totalAmount}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400">Avg. Duration</p>
            <p className="text-2xl font-bold">{stats.avgTime} <span className="text-sm font-normal">min</span></p>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
            <BoltIcon />
            <h3 className="mt-6 text-lg font-semibold text-[#111111]">No Charging History</h3>
            <p className="mt-2 text-sm text-gray-500">Your charging sessions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((session, index) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="bg-white border border-[#EAEAEA] rounded-[18px] overflow-hidden shadow-sm active:scale-[0.98] transition-transform cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex">
                  <div className="w-28 h-28 bg-gray-100 flex-shrink-0">
                    <img src={session.stationImage} alt={session.stationName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-base font-bold text-[#111111] line-clamp-1">{session.stationName}</h3>
                    <p className="text-xs text-gray-500 mt-1">{session.date}</p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Energy</p>
                        <p className="text-sm font-semibold">{session.energy}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Cost</p>
                        <p className="text-sm font-bold text-[#111111]">{session.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSession(null)}>
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Session Details</h2>
              <button onClick={() => setSelectedSession(null)} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
            </div>

            <div className="h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <img src={selectedSession.stationImage} alt={selectedSession.stationName} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-lg font-bold mb-1">{selectedSession.stationName}</h3>
            <p className="text-sm text-gray-500 mb-4">{selectedSession.date} • {selectedSession.startTime} - {selectedSession.endTime}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Duration</p>
                <p className="text-sm font-semibold">{selectedSession.duration}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Energy</p>
                <p className="text-sm font-semibold">{selectedSession.energy}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Connector</p>
                <p className="text-sm font-semibold">{selectedSession.connector}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Vehicle</p>
                <p className="text-sm font-semibold">{selectedSession.vehicle}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold">{selectedSession.cost}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Paid via {selectedSession.paymentMethod}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 text-black font-semibold rounded-xl active:scale-95 transition-transform">
                <DownloadIcon /> Invoice
              </button>
              <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 text-black font-semibold rounded-xl active:scale-95 transition-transform">
                <ShareIcon /> Share
              </button>
              <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-xl active:scale-95 transition-transform">
                <RepeatIcon /> Book Again
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
