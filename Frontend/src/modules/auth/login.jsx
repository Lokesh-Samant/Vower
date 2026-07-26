import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandPanel from './components/BrandPanel.jsx';
import useGoogleAuth from './hooks/useGoogleAuth' // <-- Import the hook

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

  const googleLogin = useGoogleAuth({
  onSuccess: (response) => {
    console.log("Google Login Success:", response);

    // TODO:
    // 1. Send the token to your backend
    // 2. Store JWT/session
    // 3. Navigate to dashboard
  },

  onError: (error) => {
    console.error("Google Login Failed:", error);
  },
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with credentials:', formData);
  };

  const handleGoogleSignIn = () => {
    googleLogin()
  };

  const handlePhoneSignIn = () => {
    console.log('Navigating to Phone OTP Verification page...');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F5F5F7]">
      <BrandPanel />

      <div className="flex w-full flex-1 items-start lg:items-center justify-center px-6 pt-[5vh] pb-6 lg:py-12 lg:w-1/2 bg-[#F5F5F7]">
        <div className="w-full max-w-md">

          {/* Desktop heading */}
          <div className="mb-7 hidden lg:block">
            <h2 className="font-display text-2xl font-semibold text-volt-deep">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-volt-deep/50">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Mobile heading */}
          <div className="mb-2 text-center lg:hidden">
            <h2 className="text-xl font-semibold text-volt-deep">Welcome back</h2>
          </div>

          {/* CREDENTIALS LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Input */}
            <div className="block">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-volt-deep/10 bg-gray-50 px-4 py-2.5 text-[15px] text-volt-deep placeholder:text-volt-deep/40 outline-none transition focus:border-volt focus:bg-white focus:ring-4 focus:ring-volt/15"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="block">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-volt-deep/50">Password</span>
                <Link to="/forgotpassword" className="text-xs font-medium text-volt-dim hover:text-volt-deep transition-colors">
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
                  className="w-full rounded-xl border border-volt-deep/10 bg-gray-50 px-4 py-2.5 pr-11 text-[15px] text-volt-deep placeholder:text-volt-deep/40 outline-none transition focus:border-volt focus:bg-white focus:ring-4 focus:ring-volt/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-volt-deep/40 hover:text-volt-deep transition"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#2A2A2E] py-3 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:bg-[#3A3A3E] active:scale-[0.97]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-volt-deep/10" />
            <span className="text-xs font-medium uppercase tracking-widest text-volt-deep/30">or continue with</span>
            <span className="h-px flex-1 bg-volt-deep/10" />
          </div>

          {/* Alternative login options */}
          <div className="space-y-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center gap-4 rounded-2xl border border-volt-deep/10 bg-white px-5 py-3.5 text-base font-medium text-volt-deep shadow-sm shadow-black/5 transition active:scale-[0.97] hover:border-volt-deep/20 hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-volt-deep/5">
                <GoogleIcon />
              </span>
              <span className="flex-1 text-left text-sm">Sign in with Google</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            {/* Phone Number / OTP Button */}
            <button
              type="button"
              onClick={handlePhoneSignIn}
              className="flex w-full items-center gap-4 rounded-2xl border border-volt-deep/10 bg-white px-5 py-3.5 text-base font-medium text-volt-deep shadow-sm shadow-black/5 transition active:scale-[0.97] hover:border-volt-deep/20 hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-volt-deep/5">
                <PhoneIcon className="w-5 h-5 text-volt-deep" />
              </span>
              <span className="flex-1 text-left text-sm">Continue with Phone Number</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Signup link */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <span className="text-sm text-volt-deep/50">Don't have an account?</span>
            <Link
              to="/signup"
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-volt-deep transition hover:bg-volt-deep/5 active:scale-95"
            >
              Sign Up →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
