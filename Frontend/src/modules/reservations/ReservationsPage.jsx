import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog, Snackbar, BottomSheet } from '../../components/common/CommonComponents';

export default function ReservationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
  const [showRateSheet, setShowRateSheet] = useState(false);
  const [rating, setRating] = useState(0);

  const upcomingReservations = [
    { id: 1, stationName: 'ChargePoint Station A', distance: '2.3 km', bookingId: '#BK789456', connector: 'CCS2', speed: 'Fast DC 50kW', vehicle: 'Tata Nexon EV', date: '2024-01-15', time: '10:00 AM - 11:30 AM', duration: '1.5 hrs', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400' },
    { id: 2, stationName: 'Tesla Supercharger', distance: '5.1 km', bookingId: '#BK789457', connector: 'Type 2', speed: 'Ultra Fast 150kW', vehicle: 'MG ZS EV', date: '2024-01-16', time: '2:00 PM - 3:00 PM', duration: '1 hr', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1565514020176-db931d10e4e3?w=400' },
  ];

  const completedReservations = [
    { id: 3, stationName: 'Fortum Charge & Drive', distance: '3.8 km', bookingId: '#BK789450', energy: '35.5 kWh', cost: '₹890', duration: '1 hr 20 min', date: '2024-01-10', rating: 4, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400' },
    { id: 4, stationName: 'Statiq Charging Point', distance: '1.2 km', bookingId: '#BK789451', energy: '28.2 kWh', cost: '₹650', duration: '55 min', date: '2024-01-08', rating: 5, image: 'https://images.unsplash.com/photo-1565514020176-db931d10e4e3?w=400' },
  ];

  const cancelledReservations = [
    { id: 5, stationName: 'ChargePoint Station B', distance: '4.5 km', bookingId: '#BK789452', reason: 'Changed plans', cancelledAt: '2024-01-12 9:30 AM', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400' },
  ];

  const handleCancelReservation = () => {
    setShowCancelConfirm(false);
    setSnackbar({ show: true, message: 'Reservation cancelled successfully', type: 'success' });
    setSelectedReservation(null);
  };

  const handleBookAgain = (station) => {
    setSnackbar({ show: true, message: `Booking ${station.stationName}...`, type: 'success' });
    setTimeout(() => navigate('/reservations'), 1500);
  };

  const handleNavigate = (station) => {
    setSnackbar({ show: true, message: `Opening maps to ${station.stationName}`, type: 'success' });
  };

  const handleDownloadInvoice = (booking) => {
    setSnackbar({ show: true, message: 'Invoice downloaded', type: 'success' });
  };

  const handleRateStation = (reservation) => {
    setSelectedReservation(reservation);
    setShowRateSheet(true);
  };

  const submitRating = () => {
    setShowRateSheet(false);
    setSnackbar({ show: true, message: `Rated ${rating} stars! Thank you for your feedback.`, type: 'success' });
    setRating(0);
  };

  const ReservationCard = ({ reservation, type }) => (
    <div className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden mb-3">
      <img src={reservation.image} alt={reservation.stationName} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#111111]">{reservation.stationName}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${type === 'upcoming' ? 'bg-green-100 text-green-700' : type === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
            {reservation.status || (type === 'completed' ? 'Completed' : 'Cancelled')}
          </span>
        </div>
        
        <p className="text-sm text-[#7A7A7A] mb-3">{reservation.distance} • {reservation.bookingId}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {type === 'upcoming' && (
            <>
              <div><p className="text-xs text-[#7A7A7A]">Connector</p><p className="font-medium">{reservation.connector}</p></div>
              <div><p className="text-xs text-[#7A7A7A]">Speed</p><p className="font-medium">{reservation.speed}</p></div>
              <div><p className="text-xs text-[#7A7A7A]">Vehicle</p><p className="font-medium">{reservation.vehicle}</p></div>
              <div><p className="text-xs text-[#7A7A7A]">Date</p><p className="font-medium">{reservation.date}</p></div>
              <div className="col-span-2"><p className="text-xs text-[#7A7A7A]">Time Slot</p><p className="font-medium">{reservation.time} ({reservation.duration})</p></div>
            </>
          )}
          {type === 'completed' && (
            <>
              <div><p className="text-xs text-[#7A7A7A]">Energy</p><p className="font-medium">{reservation.energy}</p></div>
              <div><p className="text-xs text-[#7A7A7A]">Cost</p><p className="font-medium">{reservation.cost}</p></div>
              <div><p className="text-xs text-[#7A7A7A]">Duration</p><p className="font-medium">{reservation.duration}</p></div>
              <div><p className="text-xs text-[#7A7A7A]">Date</p><p className="font-medium">{reservation.date}</p></div>
            </>
          )}
          {type === 'cancelled' && (
            <>
              <div className="col-span-2"><p className="text-xs text-[#7A7A7A]">Reason</p><p className="font-medium">{reservation.reason}</p></div>
              <div className="col-span-2"><p className="text-xs text-[#7A7A7A]">Cancelled At</p><p className="font-medium">{reservation.cancelledAt}</p></div>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {type === 'upcoming' && (
            <>
              <button onClick={() => handleNavigate(reservation)} className="flex-1 px-4 py-2.5 bg-[#111111] text-white rounded-xl font-medium active:scale-95 transition-transform">Navigate</button>
              <button onClick={() => { setSelectedReservation(reservation); setShowCancelConfirm(true); }} className="flex-1 px-4 py-2.5 bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-medium active:scale-95 transition-transform">Cancel</button>
            </>
          )}
          {type === 'completed' && (
            <>
              <button onClick={() => handleDownloadInvoice(reservation)} className="flex-1 px-4 py-2.5 bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-medium active:scale-95 transition-transform flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Invoice
              </button>
              <button onClick={() => handleRateStation(reservation)} className="flex-1 px-4 py-2.5 bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-medium active:scale-95 transition-transform">Rate</button>
              <button onClick={() => handleBookAgain(reservation)} className="flex-1 px-4 py-2.5 bg-[#111111] text-white rounded-xl font-medium active:scale-95 transition-transform">Book Again</button>
            </>
          )}
          {type === 'cancelled' && (
            <button onClick={() => handleBookAgain(reservation)} className="w-full px-4 py-2.5 bg-[#111111] text-white rounded-xl font-medium active:scale-95 transition-transform">Book Again</button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] pb-24 animate-fade-in">
      <header className="sticky top-0 bg-[#FFFFFF] z-40 px-4 pt-4 pb-2 border-b border-[#EAEAEA]">
        <div className="flex items-center justify-between max-w-lg mx-auto" style={{ height: '56px' }}>
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all">
            <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-semibold text-[#111111]">My Reservations</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[73px] bg-[#FFFFFF] z-30 px-4 py-3 border-b border-[#EAEAEA]">
        <div className="flex gap-2 max-w-lg mx-auto">
          {['upcoming', 'completed', 'cancelled'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-xl font-medium capitalize transition-colors ${activeTab === tab ? 'bg-[#111111] text-white' : 'bg-slate-50 text-[#7A7A7A] hover:bg-slate-100'}`}>{tab}</button>
          ))}
        </div>
      </div>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {activeTab === 'upcoming' && upcomingReservations.length > 0 && upcomingReservations.map(r => <ReservationCard key={r.id} reservation={r} type="upcoming" />)}
        {activeTab === 'completed' && completedReservations.length > 0 && completedReservations.map(r => <ReservationCard key={r.id} reservation={r} type="completed" />)}
        {activeTab === 'cancelled' && cancelledReservations.length > 0 && cancelledReservations.map(r => <ReservationCard key={r.id} reservation={r} type="cancelled" />)}
        
        {((activeTab === 'upcoming' && upcomingReservations.length === 0) || (activeTab === 'completed' && completedReservations.length === 0) || (activeTab === 'cancelled' && cancelledReservations.length === 0)) && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-zinc-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-[#111111] font-semibold mb-2">No {activeTab} reservations</p>
            <p className="text-[#7A7A7A] mb-4">Your {activeTab} bookings will appear here</p>
            {activeTab === 'upcoming' && <button onClick={() => navigate('/')} className="px-6 py-3 bg-[#111111] text-white rounded-xl font-medium active:scale-95 transition-transform">Find Charging Stations</button>}
          </div>
        )}
      </main>

      <ConfirmationDialog isOpen={showCancelConfirm} title="Cancel Reservation" message="Are you sure you want to cancel this reservation?" confirmText="Cancel" isDestructive onConfirm={handleCancelReservation} onCancel={() => { setShowCancelConfirm(false); setSelectedReservation(null); }} />
      
      <BottomSheet isOpen={showRateSheet} onClose={() => setShowRateSheet(false)} title="Rate Station">
        <div className="text-center py-4">
          <p className="text-[#7A7A7A] mb-6">How was your experience at {selectedReservation?.stationName}?</p>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setRating(star)} className="text-4xl transition-transform hover:scale-110">{star <= rating ? '⭐' : '☆'}</button>
            ))}
          </div>
          <button onClick={submitRating} disabled={rating === 0} className="w-full h-[54px] bg-[#111111] text-white rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50">Submit Rating</button>
        </div>
      </BottomSheet>

      <Snackbar message={snackbar.message} type={snackbar.type} isOpen={snackbar.show} onClose={() => setSnackbar({ ...snackbar, show: false })} />
    </div>
  );
}
