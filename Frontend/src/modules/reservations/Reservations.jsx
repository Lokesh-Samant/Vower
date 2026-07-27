import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-black fill-black' : 'text-gray-300'}`} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-slide-up">
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// Mock Data
const upcomingReservations = [
  {
    id: 'RSV-2024-001',
    stationName: 'Tesla Supercharger - Downtown',
    distance: '2.4 km',
    connector: 'CCS2',
    speed: '150 kW',
    vehicle: 'Tata Nexon EV',
    date: '25 Jan 2024',
    time: '14:00 - 15:30',
    duration: '90 min',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop'
  }
];

const completedReservations = [
  {
    id: 'RSV-2024-002',
    stationName: 'ChargePoint - Mall Road',
    energy: '32.5 kWh',
    cost: '₹485',
    duration: '75 min',
    date: '20 Jan 2024',
    image: 'https://images.unsplash.com/photo-1565514020176-db793d8e1f8c?w=400&h=200&fit=crop'
  }
];

const cancelledReservations = [
  {
    id: 'RSV-2024-003',
    stationName: 'EVgo - Highway Plaza',
    reason: 'Vehicle unavailable',
    cancelledAt: '18 Jan 2024, 10:30 AM',
    image: 'https://images.unsplash.com/photo-1596707328770-7a895326e391?w=400&h=200&fit=crop'
  }
];

export default function Reservations() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleCancel = () => {
    setShowCancelModal(false);
    setSelectedReservation(null);
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
      <CalendarIcon />
      <h3 className="mt-6 text-lg font-semibold text-[#111111]">No Reservations Yet</h3>
      <p className="mt-2 text-sm text-gray-500">Book your first charging session to see it here.</p>
      <button 
        onClick={() => navigate('/map')}
        className="mt-6 px-8 py-3 bg-[#111111] text-white font-semibold rounded-full active:scale-95 transition-transform"
      >
        Find Charging Stations
      </button>
    </div>
  );

  const renderUpcomingCard = (reservation) => (
    <div key={reservation.id} className="bg-white border border-[#EAEAEA] rounded-[18px] overflow-hidden mb-4 shadow-sm animate-slide-up">
      <div className="h-32 bg-gray-100 relative">
        <img src={reservation.image} alt={reservation.stationName} className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
          {reservation.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#111111]">{reservation.stationName}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <LocationIcon />
          <span>{reservation.distance}</span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Booking ID</p>
            <p className="text-sm font-semibold">{reservation.id}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Connector</p>
            <p className="text-sm font-semibold">{reservation.connector}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Speed</p>
            <p className="text-sm font-semibold">{reservation.speed}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Vehicle</p>
            <p className="text-sm font-semibold">{reservation.vehicle}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <ClockIcon />
            <span>{reservation.date}, {reservation.time}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 py-3 bg-gray-100 text-black font-semibold rounded-xl active:scale-95 transition-transform">
            Navigate
          </button>
          <button 
            onClick={() => { setSelectedReservation(reservation); setShowCancelModal(true); }}
            className="flex-1 py-3 bg-red-50 text-red-500 font-semibold rounded-xl active:scale-95 transition-transform"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompletedCard = (reservation) => (
    <div key={reservation.id} className="bg-white border border-[#EAEAEA] rounded-[18px] overflow-hidden mb-4 shadow-sm animate-slide-up">
      <div className="h-32 bg-gray-100">
        <img src={reservation.image} alt={reservation.stationName} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#111111]">{reservation.stationName}</h3>
        <p className="text-sm text-gray-500 mt-1">{reservation.date}</p>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Energy</p>
            <p className="text-sm font-semibold">{reservation.energy}</p>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Cost</p>
            <p className="text-sm font-semibold">{reservation.cost}</p>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Duration</p>
            <p className="text-sm font-semibold">{reservation.duration}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 text-black font-semibold rounded-xl active:scale-95 transition-transform">
            <DownloadIcon />
            Invoice
          </button>
          <button className="flex-1 py-3 bg-black text-white font-semibold rounded-xl active:scale-95 transition-transform">
            Rate Station
          </button>
        </div>
      </div>
    </div>
  );

  const renderCancelledCard = (reservation) => (
    <div key={reservation.id} className="bg-white border border-[#EAEAEA] rounded-[18px] overflow-hidden mb-4 shadow-sm opacity-75 animate-slide-up">
      <div className="h-32 bg-gray-100 grayscale">
        <img src={reservation.image} alt={reservation.stationName} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#111111]">{reservation.stationName}</h3>
        <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
          Cancelled
        </span>
        
        <div className="mt-4 bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-400">Reason</p>
          <p className="text-sm font-medium text-[#111111]">{reservation.reason}</p>
          <p className="text-xs text-gray-400 mt-2">Cancelled at</p>
          <p className="text-sm text-gray-600">{reservation.cancelledAt}</p>
        </div>

        <button className="mt-4 w-full py-3 bg-black text-white font-semibold rounded-xl active:scale-95 transition-transform">
          Book Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-xl font-bold text-[#111111]">My Reservations</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[73px] bg-white z-30 px-4 py-3">
        <div className="flex bg-gray-100 rounded-full p-1 max-w-lg mx-auto">
          {['upcoming', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
                activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-4 max-w-lg mx-auto pt-4">
        {activeTab === 'upcoming' && (
          upcomingReservations.length > 0 
            ? upcomingReservations.map(renderUpcomingCard)
            : renderEmptyState()
        )}
        {activeTab === 'completed' && (
          completedReservations.length > 0 
            ? completedReservations.map(renderCompletedCard)
            : renderEmptyState()
        )}
        {activeTab === 'cancelled' && (
          cancelledReservations.length > 0 
            ? cancelledReservations.map(renderCancelledCard)
            : renderEmptyState()
        )}
      </main>

      {/* Cancel Modal */}
      <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} title="Cancel Reservation">
        <p className="text-center text-gray-600 mb-6">Are you sure you want to cancel this reservation?</p>
        <div className="flex gap-3">
          <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 bg-gray-100 text-black font-semibold rounded-xl">Keep</button>
          <button onClick={handleCancel} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl">Cancel</button>
        </div>
      </Modal>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
