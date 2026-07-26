import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- FIX 1: Imported Link component

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

// Official Google Logo SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

// Phone / Mobile Icon SVG
const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.8} 
      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" 
    />
  </svg>
);


/**
 * ==========================================
 * MAIN AUTH / LOGIN COMPONENT
 * ==========================================
 */
export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with credentials:', formData);
  };

  const handleGoogleSignIn = () => {
    console.log('Initiating Google Sign-In...');
  };

  const handlePhoneSignIn = () => {
    console.log('Navigating to Phone OTP Verification page...');
  };

  return (
    // Clean White Outer Background
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans text-zinc-900 overflow-x-hidden">

      {/* Main Form Container */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        {/* SECTION 1: LOGO & BRANDING */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <img 
              src="/logo.jpeg" 
              alt="Vower Logo" 
              className="w-28 h-28 object-cover rounded-2xl border border-slate-200 shadow-md"
            />
          </div>

          <div className="flex justify-center my-1">
            <img 
              src="/WORDLOGON.png" 
              alt="Vower Brand" 
              style={{ height: '220px' }} 
              className="w-auto max-w-[100%] object-contain"
            />
          </div>

          <p className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-widest uppercase -mt-4">
            Powering every promise
          </p>
        </div>

        {/* SECTION 2: CREDENTIALS LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Email Address
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

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-zinc-700">
                Password
              </label>

              {/* FIX 2: Replaced <a> tag with React Router <Link> component */}
              <Link to="/forgot-password" className="text-xs text-zinc-600 hover:text-black font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
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

          {/* Solid Black Button */}
          <button
            type="submit"
            className="w-full py-3.5 sm:py-3 mt-1 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-base sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.98] shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* SECTION 3: DIVIDER & ALTERNATIVE LOGINS */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="space-y-3">
          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 sm:py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-zinc-800 font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>

          {/* Phone Number / OTP Button */}
          <button
            type="button"
            onClick={handlePhoneSignIn}
            className="w-full py-3 sm:py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-zinc-800 font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
          >
            <PhoneIcon className="w-5 h-5 text-zinc-700" />
            <span>Continue with Phone Number</span>
          </button>
        </div>

        {/* SECTION 4: ROUTING LINK */}
        <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          <p>
            Don't have an account?{' '}
            {/* FIX 3: Replaced <a> tag with <Link> component */}
            <Link
              to="/signup"
              className="text-zinc-900 hover:underline font-semibold ml-1 transition-colors"
            >
              Sign Up now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}