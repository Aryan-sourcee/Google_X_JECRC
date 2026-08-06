import React from 'react';
import { Shield, Sparkles, ArrowRight, MapPin, Flame, Cpu, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

interface SplashViewProps {
  onStart: () => void;
  onSelectPreset: (presetId: string) => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-between px-4 py-12 overflow-hidden">
      {/* Background Animated Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 my-auto flex max-w-4xl flex-col items-center text-center">
        {/* Google Tech Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-blue-400 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
            Google Ecosystem Showcase Demo
          </span>
        </motion.div>

        {/* Brand Icon Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="my-8 relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-red-500 p-1 shadow-2xl shadow-blue-500/30"
        >
          <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-slate-950/90 backdrop-blur-xl">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 animate-ping" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          CRISISMIND <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 bg-clip-text text-transparent">AI</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl font-light leading-relaxed"
        >
          Transform any emergency scene photo into an actionable, life-saving rescue plan in under <span className="font-semibold text-white underline decoration-blue-500 decoration-2">10 seconds</span>.
        </motion.p>

        {/* Feature Pill Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span>Gemini Multimodal Vision</span>
          </span>
          <span className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            <span>Google Maps Services</span>
          </span>
          <span className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300">
            <Radio className="h-3.5 w-3.5 text-amber-400" />
            <span>Voice Speech Guidance</span>
          </span>
          <span className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300">
            <Flame className="h-3.5 w-3.5 text-red-400" />
            <span>AI Incident Timeline</span>
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center space-x-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-500/40 active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Powered By Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 mt-12 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Powered by</p>
        <div className="flex items-center justify-center space-x-6 text-xs text-slate-400">
          <span className="flex items-center space-x-1 font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Google Gemini 2.5/3.6
          </span>
          <span className="flex items-center space-x-1 font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Firebase Telemetry
          </span>
          <span className="flex items-center space-x-1 font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Google Maps API
          </span>
        </div>
      </motion.div>
    </div>
  );
};
