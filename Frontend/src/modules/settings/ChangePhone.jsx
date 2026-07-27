import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField, Snackbar, SelectDropdown } from '../../components/common/CommonComponents';

export default function ChangePhonePage() {
  const navigate = useNavigate();
  const [currentPhone, setCurrentPhone] = useState('+91 98765 43210');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [showResendTimer, setShowResendTimer] = useState(false);

  const countryOptions = [
    { value: '+91', label: '🇮🇳 +91' },
    { value: '+1', label: '🇺🇸 +1' },
    { value: '+44', label: '🇬🇧 +44' },
    { value: '+61', label: '🇦🇺 +61' },
    { value: '+49', label: '🇩🇪 +49' },
    { value: '+33', label: '🇫🇷 +33' },
  ];

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10) {
      setErrors({ phoneNumber: 'Please enter a valid phone number' });
      return;
    }
    setIsSendingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSendingOtp(false);
    setStep(2);
    setShowResendTimer(true);
    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); setShowResendTimer(false); return 30; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    setIsSendingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSendingOtp(false);
    setShowResendTimer(true);
    setResendCountdown(30);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter the 6-digit OTP' });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => navigate('/settings'), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] pb-24">
      <header className="sticky top-0 bg-[#FFFFFF] z-40 px-4 pt-4 pb-2 border-b border-[#EAEAEA]">
        <div className="flex items-center justify-between max-w-lg mx-auto" style={{ height: '56px' }}>
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all">
            <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-[#111111]">Change Phone</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        <p className="text-[#7A7A7A] mb-6">
          {step === 1 ? 'Enter your new phone number. We will send a verification code.' : 'Enter the 6-digit code sent to your phone.'}
        </p>

        {step === 1 ? (
          <>
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-[#7A7A7A] mb-1">Current Phone</p>
              <p className="text-[#111111] font-medium">{currentPhone}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#111111] mb-2">New Phone Number</label>
              <div className={`flex gap-2 ${errors.phoneNumber ? 'border-[#E74C3C]' : ''}`}>
                <SelectDropdown
                  value={countryCode}
                  onChange={setCountryCode}
                  options={countryOptions}
                  placeholder="+91"
                />
                <div className="flex-1">
                  <InputField
                    type="tel"
                    value={phoneNumber}
                    onChange={(val) => setPhoneNumber(val.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    error={errors.phoneNumber}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={handleSendOtp} disabled={isSendingOtp || !phoneNumber}
                className="w-full h-[54px] bg-[#111111] text-white rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2">
                {isSendingOtp ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></>) : ('Send Verification Code')}
              </button>
              <button onClick={() => navigate(-1)} className="w-full h-[54px] bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-semibold active:scale-95 transition-transform">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-[#7A7A7A] mb-1">Verification code sent to</p>
              <p className="text-[#111111] font-medium">{countryCode} {phoneNumber}</p>
            </div>
            
            <InputField label="Enter OTP" type="text" value={otp} onChange={(val) => setOtp(val.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000" error={errors.otp} maxLength={6} required />

            <div className="mt-4 text-center">
              {!showResendTimer ? (<button onClick={handleResendOtp} className="text-[#111111] font-medium underline">Resend Code</button>) : (<p className="text-[#7A7A7A]">Resend code in {resendCountdown}s</p>)}
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={handleVerifyOtp} disabled={isLoading || otp.length !== 6}
                className="w-full h-[54px] bg-[#111111] text-white rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Verifying...</span></>) : ('Verify & Save')}
              </button>
              <button onClick={() => setStep(1)} className="w-full h-[54px] bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-semibold active:scale-95 transition-transform">Back</button>
            </div>
          </>
        )}
      </main>
      <Snackbar message="Phone number updated successfully!" type="success" isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
