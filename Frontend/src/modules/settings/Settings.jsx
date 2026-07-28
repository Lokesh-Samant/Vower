import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Icons ---
const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PlugIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /> 
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// --- Components ---

const SectionTitle = ({ title }) => (
  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6 ml-2">{title}</h3>
);

const SettingItem = ({ icon: Icon, title, subtitle, onClick, isToggle, toggleValue, onToggle }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-4 bg-white border border-[#EAEAEA] rounded-[16px] mb-3 active:scale-[0.98] transition-transform duration-200 cursor-pointer shadow-sm hover:shadow-md"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-gray-50 rounded-full text-black">
        <Icon />
      </div>
      <div>
        <h4 className="text-base font-medium text-[#111111]">{title}</h4>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
    {isToggle ? (
      <div 
        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${toggleValue ? 'bg-black' : 'bg-gray-300'}`}
        onClick={(e) => { e.stopPropagation(); onToggle(!toggleValue); }}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${toggleValue ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    ) : (
      <ChevronRight />
    )}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl transform transition-all scale-100 animate-slide-up">
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
        {children}
        <button onClick={onClose} className="mt-6 w-full py-3 bg-gray-100 text-black font-semibold rounded-xl">Close</button>
      </div>
    </div>
  );
};

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    navigate('/'); // Redirect to home or login
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-xl font-bold text-[#111111]">Settings</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto pt-6">
        
        {/* Account Section */}
        <SectionTitle title="Account" />
        <SettingItem icon={LockIcon} title="Change Password" onClick={() => {}} />
        <SettingItem icon={UserIcon} title="Email Address" subtitle="rahul@example.com" onClick={() => {}} />
        <SettingItem icon={PhoneIcon} title="Phone Number" subtitle="+91 98765 43210" onClick={() => {}} />
        <SettingItem icon={ShieldIcon} title="Two-Factor Authentication" isToggle toggleValue={false} onToggle={() => {}} />

        {/* App Preferences */}
        <SectionTitle title="App Preferences" />
        <SettingItem icon={GlobeIcon} title="Language" subtitle="English" onClick={() => {}} />
        <SettingItem icon={BellIcon} title="Notifications" isToggle toggleValue={notifications} onToggle={setNotifications} />
        <SettingItem icon={LocationIcon} title="Location Permission" subtitle="Always Allow" onClick={() => {}} />

        {/* Charging Preferences */}
        <SectionTitle title="Charging Preferences" />
        <SettingItem icon={ZapIcon} title="Preferred Speed" subtitle="Fast Charging" onClick={() => {}} />
        <SettingItem icon={PlugIcon} title="Connector Type" subtitle="CCS2 (Auto)" onClick={() => {}} />
        <SettingItem icon={CreditCardIcon} title="Default Payment" subtitle="UPI" onClick={() => {}} />

        {/* Danger Zone */}
        <SectionTitle title="Danger Zone" />
        <div 
          onClick={() => setShowLogout(true)}
          className="flex items-center justify-center p-4 bg-white border border-red-200 rounded-[16px] mb-8 active:scale-[0.98] transition-transform duration-200 cursor-pointer"
        >
          <span className="text-red-500 font-semibold">Logout</span>
        </div>
      </main>

      {/* Logout Modal */}
      <Modal isOpen={showLogout} onClose={() => setShowLogout(false)} title="Logout">
        <p className="text-center text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex gap-3">
          <button onClick={() => setShowLogout(false)} className="flex-1 py-3 bg-gray-100 text-black font-semibold rounded-xl">Cancel</button>
          <button onClick={handleLogout} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl">Logout</button>
        </div>
      </Modal>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}
