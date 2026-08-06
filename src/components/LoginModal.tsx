import React from 'react';
import { Shield, X, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
                <Shield className="h-7 w-7 text-blue-400" />
              </div>
            </div>
            <h2 className="mt-4 font-sans text-2xl font-bold text-white">Welcome to CrisisMind AI</h2>
            <p className="mt-1 text-xs text-slate-400">Sign in to access real-time emergency responder tools.</p>
          </div>

          {/* Login Options */}
          <div className="mt-6 space-y-3">
            {/* Google Sign In */}
            <button
              onClick={() => onLogin({ name: 'Aryan Sharma', email: 'aryan@example.com' })}
              className="flex w-full items-center justify-center space-x-3 rounded-2xl border border-white/10 bg-white/5 py-3.5 px-4 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-blue-500/40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>

            {/* Guest / Anonymous Sign In */}
            <button
              onClick={() => onLogin({ name: 'Emergency Responder', email: 'guest@crisismind.ai' })}
              className="flex w-full items-center justify-center space-x-2 rounded-2xl border border-white/10 bg-slate-800/80 py-3.5 px-4 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span>Continue as Anonymous Responder</span>
            </button>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-500">
            By continuing, you agree to emergency dispatch protocols & data privacy terms.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
