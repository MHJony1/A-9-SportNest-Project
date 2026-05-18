'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBolt, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';

const RegisterPage = () => {
  const router = useRouter();

  // Controlled State for Real-Time Validation Matrix
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Accurate Password Validation Evaluation
  const passwordValidations = {
    hasMinLength: formData.password.length >= 6,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Credentials Signup Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Logic Check using the exact flags
    if (
      !passwordValidations.hasMinLength ||
      !passwordValidations.hasUppercase ||
      !passwordValidations.hasLowercase
    ) {
      setError('Password must fulfill all validation rules.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoUrl,
      });

      if (signUpError) {
        console.error('Signup Error:', signUpError);
        setError(
          signUpError.message ||
            'Registration failed! Please check your details.',
        );
        return;
      }

      if (data) {
        alert('Account created successfully!');
        router.push('/login');
      }
    } catch (err) {
      console.error('Execution Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Handler
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/', // Navigates to target route on success
      });
    } catch (err) {
      console.error('Google Sign In Error:', err);
      setError('Google authentication failed.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-white flex items-center justify-center px-4 sm:px-6 pt-30 pb-8 relative overflow-hidden">
      {/* Premium Ambient Neon Lights */}
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#a3e635]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[#a3e635]/[0.02] blur-[120px] pointer-events-none" />

      {/* ══════════════ REGISTER CARD LAYER ══════════════ */}
      <motion.div
        className="w-full max-w-md rounded-[28px] bg-gradient-to-b from-zinc-900/50 to-zinc-950/90 border border-zinc-900 p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-md relative z-10 space-y-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#a3e635]/5 border border-[#a3e635]/15 mb-1">
            <span className="w-1 h-1 rounded-full bg-[#a3e635] animate-pulse" />
            <span className="text-[#a3e635] text-[9px] font-black tracking-widest uppercase">
              Create Athlete Account
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            Join <span className="text-[#a3e635]">PlayNest</span>
          </h2>
          <p className="text-zinc-500 text-[11px] font-semibold">
            Unlock premium arenas & squad plays.
          </p>
        </div>

        {error && (
          <div className="w-full p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* ── FORM CONTAINER ── */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Input: Full Name */}
          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] font-black uppercase tracking-wider pl-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Asif Rahman"
              className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900/80 focus:border-[#a3e635]/40 text-white text-xs px-3.5 outline-none font-medium transition-all duration-200 placeholder:text-zinc-700"
            />
          </div>

          {/* Input: Email Address */}
          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] font-black uppercase tracking-wider pl-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900/80 focus:border-[#a3e635]/40 text-white text-xs px-3.5 outline-none font-medium transition-all duration-200 placeholder:text-zinc-700"
            />
          </div>

          {/* Input: Photo URL */}
          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] font-black uppercase tracking-wider pl-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photoUrl"
              required
              value={formData.photoUrl}
              onChange={handleInputChange}
              placeholder="https://images.unsplash.com/avatar.jpg"
              className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900/80 focus:border-[#a3e635]/40 text-white text-xs px-3.5 outline-none font-medium transition-all duration-200 placeholder:text-zinc-700"
            />
          </div>

          {/* Input: Password */}
          <div className="space-y-1 relative">
            <label className="text-zinc-500 text-[10px] font-black uppercase tracking-wider pl-1">
              Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full h-11 rounded-xl bg-zinc-950 border border-zinc-900/80 focus:border-[#a3e635]/40 text-white text-xs pl-3.5 pr-10 outline-none font-medium transition-all duration-200 placeholder:text-zinc-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>

            {/* Micro Validation Badges */}
            {formData.password && (
              <div className="flex gap-2 pt-1.5 px-1 justify-between select-none">
                <div
                  className={`text-[9px] font-bold flex items-center gap-1 transition-colors ${passwordValidations.hasMinLength ? 'text-[#a3e635]' : 'text-zinc-600'}`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${passwordValidations.hasMinLength ? 'bg-[#a3e635]' : 'bg-zinc-700'}`}
                  />{' '}
                  Min 6 Chars
                </div>
                <div
                  className={`text-[9px] font-bold flex items-center gap-1 transition-colors ${passwordValidations.hasUppercase ? 'text-[#a3e635]' : 'text-zinc-600'}`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${passwordValidations.hasUppercase ? 'bg-[#a3e635]' : 'bg-zinc-700'}`}
                  />{' '}
                  1 Uppercase
                </div>
                <div
                  className={`text-[9px] font-bold flex items-center gap-1 transition-colors ${passwordValidations.hasLowercase ? 'text-[#a3e635]' : 'text-zinc-600'}`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${passwordValidations.hasLowercase ? 'bg-[#a3e635]' : 'bg-zinc-700'}`}
                  />{' '}
                  1 Lowercase
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#a3e635] text-black font-black text-[11px] uppercase tracking-widest transition-all duration-200 hover:bg-[#b5f048] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(163,230,53,0.15)] cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <FaBolt size={9} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center py-0.5">
          <div className="flex-1 h-[1px] bg-zinc-900" />
          <span className="px-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
            Or Secure Login
          </span>
          <div className="flex-1 h-[1px] bg-zinc-900" />
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full h-11 rounded-xl bg-white text-black font-black text-[11px] uppercase tracking-widest transition-all duration-200 hover:bg-zinc-100 active:scale-[0.98] flex items-center justify-center gap-3 shadow-md group cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.92 1 12 1 7.35 1 3.37 3.68 1.44 7.6l3.86 3A6.98 6.98 0 0 1 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.82-.07-1.6-.2-2.36H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.62l3.71 2.88c2.17-2 3.43-4.94 3.43-8.65z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.4a6.93 6.93 0 0 1 0-4.8l-3.86-3A11.95 11.95 0 0 0 1 12c0 1.92.45 3.74 1.25 5.37l4.05-3.17z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.71-2.88c-1.1.74-2.5 1.18-4.25 1.18-3.23 0-5.97-2.18-6.95-5.11l-3.96 3.07A11.97 11.97 0 0 0 12 23z"
            />
          </svg>
          <span className="text-zinc-900">Sign Up With Google</span>
        </button>

        {/* Redirect Footer */}
        <p className="text-center text-zinc-500 text-[11px] font-semibold">
          Already have an athlete account?{' '}
          <Link
            href="/login"
            className="text-[#a3e635] hover:underline font-black uppercase tracking-wider ml-1 text-[10px]"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
