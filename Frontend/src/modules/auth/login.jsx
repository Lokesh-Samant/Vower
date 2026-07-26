import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === "error@vower.internal") {
        throw new Error("Invalid email or password.");
      }

      console.log("Logged in:", { email, password, rememberMe });
      alert("Login Successful!");
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row font-sans selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Mobile Branding Header (Visible only on Mobile/Tablet) */}
      <div className="lg:hidden px-6 pt-8 pb-4 flex items-center justify-between border-b border-zinc-900/80 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-zinc-950 text-sm shadow-lg shadow-emerald-500/20">
            V
          </div>
          <span className="font-bold text-xl tracking-wider text-zinc-100">VOWER</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
          v1.0
        </span>
      </div>

      {/* Desktop Branding Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900/60 border-r border-zinc-800/60 p-12 flex-col justify-between relative overflow-hidden">
        <div className="flex items-center gap-3 z-10">
          <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-zinc-950 text-lg shadow-lg shadow-emerald-500/20">
            V
          </div>
          <span className="font-bold text-2xl tracking-wider text-zinc-100">VOWER</span>
        </div>

        <div className="space-y-4 max-w-md z-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 leading-tight">
           Powering Every Promises
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Manage your local environments, stream system diagnostics, and coordinate team deployments in one unified dashboard.
          </p>
        </div>

        <div className="text-xs text-zinc-500 z-10">
          &copy; {new Date().getFullYear()} Vower Inc. All rights reserved.
        </div>
        
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Form Container: Fully Mobile Optimized */}
      <div className="flex-1 flex items-center justify-center px-5 py-8 sm:px-8 lg:p-12">
        <div className="w-full max-w-sm space-y-6 sm:space-y-7">
          
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Sign in
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Enter your account credentials to continue
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            
            {/* Email Field (44px+ height for touch target, 16px text to prevent auto-zoom) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="dev@vower.internal"
                className="w-full h-12 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Reset password API flow")}
                  className="text-xs text-emerald-400 hover:underline active:text-emerald-300 font-medium"
                >
                  Forgot?
                </button>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full h-12 pl-4 pr-14 rounded-lg bg-zinc-900 border border-zinc-800 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 px-4 flex items-center justify-center text-xs font-medium text-zinc-400 hover:text-zinc-200 active:text-white select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me Box */}
            <div className="pt-1">
              <label className="flex items-center gap-3 py-1 cursor-pointer text-zinc-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5 w-5 rounded bg-zinc-900 border-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-950 accent-emerald-500"
                />
                <span className="text-xs sm:text-sm font-medium">Remember this device</span>
              </label>
            </div>

            {/* Mobile Touch-Optimized Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-emerald-500/50 text-zinc-950 font-bold text-sm tracking-wide transition duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-[11px] sm:text-xs text-center text-zinc-500 leading-relaxed pt-2">
            By signing in, you agree to Vower's <br className="sm:hidden" />
            <a href="#terms" className="underline hover:text-zinc-400">Terms</a> and <a href="#privacy" className="underline hover:text-zinc-400">Privacy Policy</a>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;