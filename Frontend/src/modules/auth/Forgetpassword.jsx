import React, { useState } from 'react';

/**
 * ==========================================
 * SVG ICON COMPONENTS
 * ==========================================
 */

// Toggle Password Eye Icons
const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.12 10.12 0 015.122-1.063c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9m0 0L3 3" />
  </svg>
);

// Back Arrow Icon
const ArrowLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);


/**
 * ==========================================
 * FORGOT PASSWORD COMPONENT
 * ==========================================
 */
export default function ForgotPasswordPage() {
  // Step 1: Request OTP via Email | Step 2: Verify OTP & Reset Password
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 Submission: Request OTP to Email
  const handleRequestOTP = (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', formData.email);
    // Move to step 2 after requesting OTP
    setStep(2);
  };

  // Step 2 Submission: Verify OTP & Change Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Resetting password with:', formData);
    // API logic for resetting password goes here
  };

  return (
    // Clean Light Background matching Login Theme
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans text-zinc-900 overflow-x-hidden">

      {/* Card Container */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        {/* ------------------------------------------------------------------ */}
        {/* LOGO & HEADING SECTION                                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="text-center mb-6">
          
          {/* Main Photo Logo */}
          <div className="flex justify-center mb-2">
            <img 
              src="/logo.jpeg" 
              alt="Vower Logo" 
              className="w-28 h-28 object-cover rounded-2xl border border-slate-200 shadow-md"
            />
          </div>

          {/* Wordmark Logo */}
          <div className="flex justify-center my-1">
            <img 
              src="/WORDLOGON.png" 
              alt="Vower Brand" 
              style={{ height: '220px' }} 
              className="w-auto max-w-[100%] object-contain"
            />
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-zinc-900 -mt-4">
            {step === 1 ? 'Reset Password' : 'Verify Email OTP'}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {step === 1 
              ? 'Enter your registered email to receive a password reset verification code.' 
              : `Enter the 6-digit OTP code sent to ${formData.email}`}
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FORMS (STEP 1 & STEP 2)                                           */}
        {/* ------------------------------------------------------------------ */}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Registered Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-zinc-900 text-base sm:text-sm outline-none focus:border-zinc-900 transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-3 mt-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-base sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.98] shadow-md"
            >
              Send OTP Code
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            
            {/* OTP Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-zinc-700">
                  6-Digit Email OTP
                </label>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="text-xs text-zinc-600 hover:text-black font-medium transition-colors"
                >
                  Change Email?
                </button>
              </div>
              <input
                type="text"
                name="otp"
                maxLength="6"
                required
                value={formData.otp}
                onChange={handleChange}
                placeholder="123456"
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-zinc-900 text-center tracking-widest font-bold text-lg outline-none focus:border-zinc-900 transition-all placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm placeholder:tracking-normal"
              />
            </div>

            {/* New Password Input */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 sm:py-2.5 pr-11 rounded-xl bg-slate-50 border border-slate-300 text-zinc-900 text-base sm:text-sm outline-none focus:border-zinc-900 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-zinc-700 transition-colors"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-3 mt-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-base sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.98] shadow-md"
            >
              Verify OTP & Save Password
            </button>
          </form>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* BACK TO LOGIN LINK                                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-6 text-center text-xs border-t border-slate-100 pt-4">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-zinc-800 hover:text-black font-semibold transition-colors"
          >
            <ArrowLeftIcon />
            <span>Back to Sign In</span>
          </a>
        </div>

      </div>
    </div>
  );
}