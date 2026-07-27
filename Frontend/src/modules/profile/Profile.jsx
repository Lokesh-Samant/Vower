import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Back Arrow Icon
const BackArrowIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

// Camera/Edit Icon for Profile Picture
const CameraIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path fillRule="evenodd" d="M1.323 7.145A4.65 4.65 0 015.999 4h12a4.65 4.65 0 014.676 3.145l.834 3.335A2 2 0 0121.57 12v6a2 2 0 01-2 2h-13a2 2 0 01-2-2v-6a2 2 0 01-.06-1.519l.834-3.335zM5.999 6a2.65 2.65 0 00-2.676 1.855L2.49 11.19A4 4 0 012.5 12v6a4 4 0 004 4h13a4 4 0 004-4v-6a4 4 0 01-.01-.81l-.834-3.335A2.65 2.65 0 0017.999 6H5.999z" clipRule="evenodd" />
  </svg>
);

// Settings/Gear Icon
const SettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Calendar/Reservation Icon
const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Vehicle/Car Icon
const VehicleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

// Charging Bolt Icon
const BoltIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Help Circle Icon
const HelpIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Privacy/Lock Icon
const LockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Chevron Right Icon
const ChevronRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Bottom Navigation Icons
const HomeIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const MapIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ReservationsIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const NotificationIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ProfileIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Menu Item Component
const MenuItem = ({ icon: Icon, title, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`
        flex items-center justify-between 
        w-full px-4 py-3.5 
        bg-white border border-[#EAEAEA] 
        rounded-[14px]
        cursor-pointer
        transition-all duration-200 ease-out
        ${isPressed ? 'scale-[0.98] bg-slate-50' : 'hover:bg-slate-50'}
      `}
      style={{ height: '60px', marginBottom: '8px' }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-zinc-800">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-[#111111] text-base font-medium">
          {title}
        </span>
      </div>
      <div className={`text-zinc-400 transition-transform duration-200 ${isPressed ? 'translate-x-1' : ''}`}>
        <ChevronRightIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'reservations', icon: ReservationsIcon, label: 'Reservations' },
    { id: 'notifications', icon: NotificationIcon, label: 'Notifications' },
    { id: 'profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-[#111111] rounded-t-[20px] pb-6 pt-3 px-2 z-50"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center justify-center 
                w-14 h-14 rounded-full
                transition-all duration-200 ease-out
                ${isActive ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-80'}
              `}
            >
              <item.icon 
                className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white'}`} 
                filled={isActive}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Main Profile Page Component
export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditPressed, setIsEditPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'settings', icon: SettingsIcon, title: 'Settings' },
    { id: 'reservations', icon: CalendarIcon, title: 'My Reservations' },
    { id: 'vehicle', icon: VehicleIcon, title: 'My Vehicle' },
    { id: 'history', icon: BoltIcon, title: 'Charging History' },
    { id: 'help', icon: HelpIcon, title: 'Help' },
    { id: 'privacy', icon: LockIcon, title: 'Privacy Policy' },
  ];

  const handleMenuItemClick = (itemId) => {
    console.log(`Navigating to: ${itemId}`);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] font-sans text-[#111111] overflow-x-hidden">
      <div className="animate-fade-in">
        
        {/* HEADER */}
        <header className="sticky top-0 bg-[#FFFFFF] z-40 px-4 pt-4 pb-2">
          <div className="flex items-center justify-between max-w-lg mx-auto" style={{ height: '56px' }}>
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all duration-200"
              aria-label="Go back"
            >
              <BackArrowIcon className="w-6 h-6 text-[#111111]" />
            </button>
            
            <h1 className="text-xl font-semibold text-[#111111]">
              Profile
            </h1>
            
            <div className="w-8" />
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="px-4 pb-32 max-w-lg mx-auto">
          
          {/* PROFILE SECTION */}
          <section className="py-6 text-center">
            <div className="relative inline-block mb-4">
              <div 
                className={`
                  w-[96px] h-[96px] rounded-full 
                  border-2 border-[#EAEAEA] 
                  overflow-hidden
                  bg-slate-100
                  transition-opacity duration-300
                  ${isLoading ? 'opacity-50' : 'opacity-100'}
                `}
              >
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-slate-300 border-t-zinc-800 rounded-full animate-spin" />
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <button
                className="
                  absolute -bottom-1 -right-1 
                  w-8 h-8 rounded-full 
                  bg-[#111111] 
                  border-2 border-[#FFFFFF]
                  flex items-center justify-center
                  active:scale-95 transition-transform duration-200
                  shadow-md
                "
                aria-label="Edit profile picture"
              >
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            <h2 className="text-[22px] font-bold text-[#111111] mb-1">
              Rahul Sharma
            </h2>

            <p className="text-sm font-light text-[#8A8A8A] mb-5">
              @rahulsharma
            </p>

            <button
              onClick={handleEditProfile}
              onMouseDown={() => setIsEditPressed(true)}
              onMouseUp={() => setIsEditPressed(false)}
              onMouseLeave={() => setIsEditPressed(false)}
              onTouchStart={() => setIsEditPressed(true)}
              onTouchEnd={() => setIsEditPressed(false)}
              className={`
                px-8 py-3 
                bg-[#111111] text-white 
                font-semibold text-sm tracking-wide
                rounded-full
                transition-all duration-200 ease-out
                shadow-md
                ${isEditPressed ? 'scale-[0.97]' : 'hover:bg-black'}
              `}
              style={{ width: '170px', height: '48px' }}
            >
              Edit Profile
            </button>
          </section>

          {/* DIVIDER */}
          <div className="h-px bg-[#EAEAEA] my-4" />

          {/* MENU OPTIONS */}
          <section className="py-2">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                onClick={() => handleMenuItemClick(item.id)}
              />
            ))}
          </section>

        </main>

        {/* BOTTOM NAVIGATION */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
