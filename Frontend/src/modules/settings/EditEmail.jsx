import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField, Snackbar, ConfirmationDialog } from '../../components/common/CommonComponents';

export default function EditEmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Enter email, 2: Verify OTP
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showResendTimer, setShowResendTimer] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(newEmail)) {
      setErrors({ newEmail: 'Please enter a valid email address' });
      return;
    }
    
    setIsSendingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSendingOtp(false);
    setStep(2);
    setShowResendTimer(true);
    
    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResendTimer(false);
          return 30;
        }
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
    
    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResendTimer(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
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
    
    setTimeout(() => {
      navigate('/settings');
    }, 2000);
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
          <h1 className="text-xl font-semibold text-[#111111]">Edit Email</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        <p className="text-[#7A7A7A] mb-6">
          {step === 1 ? 'Enter your new email address. We will send a verification code.' : 'Enter the 6-digit code sent to your email.'}
        </p>

        {step === 1 ? (
          <>
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-[#7A7A7A] mb-1">Current Email</p>
              <p className="text-[#111111] font-medium">{email}</p>
            </div>
            
            <InputField
              label="New Email Address"
              type="email"
              value={newEmail}
              onChange={setNewEmail}
              placeholder="example@email.com"
              error={errors.newEmail}
              required
            />

            <div className="mt-8 space-y-3">
              <button
                onClick={handleSendOtp}
                disabled={isSendingOtp || !newEmail}
                className="w-full h-[54px] bg-[#111111] text-white rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSendingOtp ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
              
              <button
                onClick={() => navigate(-1)}
                className="w-full h-[54px] bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-semibold active:scale-95 transition-transform"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-[#7A7A7A] mb-1">Verification code sent to</p>
              <p className="text-[#111111] font-medium">{newEmail}</p>
            </div>
            
            <InputField
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(val) => setOtp(val.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              error={errors.otp}
              maxLength={6}
              required
              leftElement={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <div className="mt-4 text-center">
              {!showResendTimer ? (
                <button onClick={handleResendOtp} className="text-[#111111] font-medium underline">
                  Resend Code
                </button>
              ) : (
                <p className="text-[#7A7A7A]">Resend code in {resendCountdown}s</p>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
                className="w-full h-[54px] bg-[#111111] text-white rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  'Verify & Save'
                )}
              </button>
              
              <button
                onClick={() => setStep(1)}
                className="w-full h-[54px] bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-semibold active:scale-95 transition-transform"
              >
                Back
              </button>
            </div>
          </>
        )}
      </main>

      <Snackbar message="Email updated successfully!" type="success" isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
