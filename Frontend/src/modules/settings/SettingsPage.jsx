import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToggleSwitch, ConfirmationDialog, Snackbar, BottomSheet } from '../../components/common/CommonComponents';

export default function SettingsPage() {
  const navigate = useNavigate();
  
  // App Preferences State
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationPermission, setLocationPermission] = useState('whileUsing');
  
  // Charging Preferences State
  const [chargingSpeed, setChargingSpeed] = useState('fast');
  const [connector, setConnector] = useState('ccs2');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // 2FA State
  const [twoFactor, setTwoFactor] = useState(false);
  const [show2FAMethod, setShow2FAMethod] = useState(false);
  
  // Dialogs
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [showSpeedSheet, setShowSpeedSheet] = useState(false);
  const [showConnectorSheet, setShowConnectorSheet] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  
  // Snackbar
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

  const languageOptions = ['English', 'Hindi', 'Spanish', 'French', 'German'];
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const speedOptions = [
    { value: 'slow', label: 'Slow (AC)' },
    { value: 'fast', label: 'Fast (DC)' },
    { value: 'ultra', label: 'Ultra Fast' }
  ];

  const connectorOptions = [
    { value: 'ccs2', label: 'CCS2' },
    { value: 'type2', label: 'Type 2' },
    { value: 'chademo', label: 'CHAdeMO' },
    { value: 'auto', label: 'Auto Detect' }
  ];

  const paymentOptions = [
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'netbanking', label: 'Net Banking' }
  ];

  const locationOptions = [
    { value: 'always', label: 'Always Allow' },
    { value: 'whileUsing', label: 'While Using App' },
    { value: 'ask', label: 'Ask Every Time' },
    { value: 'never', label: 'Never' }
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setSnackbar({ show: true, message: 'Logged out successfully', type: 'success' });
    setTimeout(() => navigate('/'), 1500);
  };

  const handle2FAToggle = (enabled) => {
    if (enabled) {
      setShow2FAMethod(true);
    } else {
      setTwoFactor(false);
      setSnackbar({ show: true, message: 'Two-factor authentication disabled', type: 'success' });
    }
  };

  const select2FAMethod = (method) => {
    setTwoFactor(true);
    setShow2FAMethod(false);
    setSnackbar({ show: true, message: `2FA enabled via ${method}`, type: 'success' });
  };

  const MenuItem = ({ icon, title, subtitle, onClick, rightElement, danger = false }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white border border-[#EAEAEA] rounded-xl mb-2 active:scale-[0.98] transition-transform ${danger ? 'border-red-200 bg-red-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className={danger ? 'text-red-500' : 'text-[#111111]'}>{icon}</div>
        <div className="text-left">
          <p className={`font-medium ${danger ? 'text-red-600' : 'text-[#111111]'}`}>{title}</p>
          {subtitle && <p className="text-sm text-[#7A7A7A]">{subtitle}</p>}
        </div>
      </div>
      {rightElement || <svg className="w-5 h-5 text-[#7A7A7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
    </button>
  );

  const SectionTitle = ({ title }) => (
    <h3 className="text-sm font-semibold text-[#7A7A7A] uppercase tracking-wide mt-6 mb-3 px-1">{title}</h3>
  );

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 bg-[#FFFFFF] z-40 px-4 pt-4 pb-2 border-b border-[#EAEAEA]">
        <div className="flex items-center justify-between max-w-lg mx-auto" style={{ height: '56px' }}>
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all">
            <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-semibold text-[#111111]">Settings</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Account Section */}
        <SectionTitle title="Account" />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          title="Change Password"
          onClick={() => navigate('/settings/change-password')}
        />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          title="Email Address"
          subtitle="rahul.sharma@example.com"
          onClick={() => navigate('/settings/edit-email')}
        />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
          title="Phone Number"
          subtitle="+91 98765 43210"
          onClick={() => navigate('/settings/change-phone')}
        />
        <div className="w-full p-4 bg-white border border-[#EAEAEA] rounded-xl mb-2">
          <ToggleSwitch enabled={twoFactor} onChange={handle2FAToggle} label="Two-Factor Authentication" description="Add an extra layer of security" />
        </div>

        {/* App Preferences */}
        <SectionTitle title="App Preferences" />
        <div className="w-full p-4 bg-white border border-[#EAEAEA] rounded-xl mb-2">
          <ToggleSwitch enabled={darkMode} onChange={setDarkMode} label="Dark Mode" description="Coming soon" disabled />
        </div>
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>}
          title="Language"
          subtitle={selectedLanguage}
          onClick={() => setShowLanguageSheet(true)}
          rightElement={<svg className="w-5 h-5 text-[#7A7A7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
        />
        <div className="w-full p-4 bg-white border border-[#EAEAEA] rounded-xl mb-2">
          <ToggleSwitch enabled={notifications} onChange={setNotifications} label="Notifications" description="Receive app notifications" />
        </div>
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          title="Location Permission"
          subtitle={locationOptions.find(o => o.value === locationPermission)?.label}
          onClick={() => setShowLocationSheet(true)}
        />

        {/* Charging Preferences */}
        <SectionTitle title="Charging Preferences" />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          title="Preferred Charging Speed"
          subtitle={speedOptions.find(o => o.value === chargingSpeed)?.label}
          onClick={() => setShowSpeedSheet(true)}
        />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          title="Preferred Connector"
          subtitle={connectorOptions.find(o => o.value === connector)?.label}
          onClick={() => setShowConnectorSheet(true)}
        />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
          title="Default Payment Method"
          subtitle={paymentOptions.find(o => o.value === paymentMethod)?.label}
          onClick={() => setShowPaymentSheet(true)}
        />

        {/* Danger Zone */}
        <SectionTitle title="Danger Zone" />
        <MenuItem
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>}
          title="Logout"
          danger
          onClick={() => setShowLogoutConfirm(true)}
        />
      </main>

      {/* Bottom Sheets */}
      <BottomSheet isOpen={showLanguageSheet} onClose={() => setShowLanguageSheet(false)} title="Select Language">
        <div className="space-y-2">
          {languageOptions.map(lang => (
            <button key={lang} onClick={() => { setSelectedLanguage(lang); setShowLanguageSheet(false); setSnackbar({ show: true, message: `Language set to ${lang}`, type: 'success' }); }}
              className={`w-full p-4 text-left rounded-xl transition-colors ${selectedLanguage === lang ? 'bg-[#111111] text-white' : 'hover:bg-slate-50'}`}>
              {lang}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={showSpeedSheet} onClose={() => setShowSpeedSheet(false)} title="Charging Speed">
        <div className="space-y-2">
          {speedOptions.map(opt => (
            <button key={opt.value} onClick={() => { setChargingSpeed(opt.value); setShowSpeedSheet(false); setSnackbar({ show: true, message: `Charging speed set to ${opt.label}`, type: 'success' }); }}
              className={`w-full p-4 text-left rounded-xl transition-colors ${chargingSpeed === opt.value ? 'bg-[#111111] text-white' : 'hover:bg-slate-50'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={showConnectorSheet} onClose={() => setShowConnectorSheet(false)} title="Connector Type">
        <div className="space-y-2">
          {connectorOptions.map(opt => (
            <button key={opt.value} onClick={() => { setConnector(opt.value); setShowConnectorSheet(false); setSnackbar({ show: true, message: `Connector set to ${opt.label}`, type: 'success' }); }}
              className={`w-full p-4 text-left rounded-xl transition-colors ${connector === opt.value ? 'bg-[#111111] text-white' : 'hover:bg-slate-50'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={showPaymentSheet} onClose={() => setShowPaymentSheet(false)} title="Payment Method">
        <div className="space-y-2">
          {paymentOptions.map(opt => (
            <button key={opt.value} onClick={() => { setPaymentMethod(opt.value); setShowPaymentSheet(false); setSnackbar({ show: true, message: `Payment method set to ${opt.label}`, type: 'success' }); }}
              className={`w-full p-4 text-left rounded-xl transition-colors ${paymentMethod === opt.value ? 'bg-[#111111] text-white' : 'hover:bg-slate-50'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={showLocationSheet} onClose={() => setShowLocationSheet(false)} title="Location Permission">
        <div className="space-y-2">
          {locationOptions.map(opt => (
            <button key={opt.value} onClick={() => { setLocationPermission(opt.value); setShowLocationSheet(false); setSnackbar({ show: true, message: `Location: ${opt.label}`, type: 'success' }); }}
              className={`w-full p-4 text-left rounded-xl transition-colors ${locationPermission === opt.value ? 'bg-[#111111] text-white' : 'hover:bg-slate-50'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={show2FAMethod} onClose={() => setShow2FAMethod(false)} title="Choose 2FA Method">
        <div className="space-y-2">
          <button onClick={() => select2FAMethod('SMS')} className="w-full p-4 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <span>SMS</span>
          </button>
          <button onClick={() => select2FAMethod('Email')} className="w-full p-4 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span>Email</span>
          </button>
          <button onClick={() => select2FAMethod('Authenticator App')} className="w-full p-4 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <span>Authenticator App</span>
          </button>
        </div>
      </BottomSheet>

      <ConfirmationDialog
        isOpen={showLogoutConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        isDestructive
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />

      <Snackbar message={snackbar.message} type={snackbar.type} isOpen={snackbar.show} onClose={() => setSnackbar({ ...snackbar, show: false })} />
    </div>
  );
}
