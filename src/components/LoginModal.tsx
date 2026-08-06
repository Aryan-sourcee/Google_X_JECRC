import React from 'react';
import { Shield, X, UserCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string; role: string }) => void;
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
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl space-y-6"
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
            <h2 className="mt-4 font-sans text-2xl font-bold text-white">CrisisMind AI Command Auth</h2>
            <p className="mt-1 text-xs text-slate-400">Select active team member or emergency responder profile.</p>
          </div>

          {/* Team Login Options */}
          <div className="space-y-3">
            {/* Aryan Meena */}
            <button
              onClick={() => onLogin({ name: 'Aryan Meena', email: 'aryan.meena@crisismind.ai', role: 'Lead Developer' })}
              className="flex w-full items-center justify-between rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-left transition hover:bg-blue-500/20 hover:border-blue-500/60"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md">
                  AM
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Aryan Meena</p>
                  <p className="text-[11px] text-blue-300">Lead Engineer • Command Center</p>
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-blue-400" />
            </button>

            {/* Lakshaya Kumawat */}
            <button
              onClick={() => onLogin({ name: 'Lakshaya Kumawat', email: 'lakshaya.kumawat@crisismind.ai', role: 'Collaborator & Systems' })}
              className="flex w-full items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 text-left transition hover:bg-indigo-500/20 hover:border-indigo-500/60"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md">
                  LK
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Lakshaya Kumawat</p>
                  <p className="text-[11px] text-indigo-300">Collaborator • AI Systems Architect</p>
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-indigo-400" />
            </button>

            {/* Guest Sign In */}
            <button
              onClick={() => onLogin({ name: 'Emergency Responder', email: 'dispatch@crisismind.ai', role: 'Field Dispatcher' })}
              className="flex w-full items-center justify-center space-x-2 rounded-2xl border border-white/10 bg-slate-800/80 py-3 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span>Continue as Field Dispatcher</span>
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-500">
            Authorized access for CrisisMind AI Emergency Response Platform.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
