import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle2, Loader2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScanningOverlayViewProps {
  imagePreviewUrl?: string;
  onScanComplete: () => void;
}

export const ScanningOverlayView: React.FC<ScanningOverlayViewProps> = ({
  imagePreviewUrl,
  onScanComplete,
}) => {
  const [progress, setProgress] = useState(12);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Detecting Humans & Occupants...',
    'Detecting Vehicles & Structures...',
    'Analyzing Fire & Smoke Hazards...',
    'Checking Fuel Leakage & Chemical Risk...',
    'Querying Google Maps Places API...',
    'Generating Multilingual Rescue Protocol...',
    'Calculating AI Incident Timeline...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onScanComplete, 500);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 8;
        return next > 100 ? 100 : next;
      });
    }, 280);

    return () => clearInterval(timer);
  }, [onScanComplete]);

  useEffect(() => {
    const currentStepIndex = Math.min(
      Math.floor((progress / 100) * steps.length),
      steps.length - 1
    );
    setActiveStep(currentStepIndex);
  }, [progress, steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-2xl overflow-hidden">
      {/* Background Radar Grid */}
      <div className="absolute h-[600px] w-[600px] rounded-full border border-blue-500/10 animate-pulse pointer-events-none" />
      <div className="absolute h-[420px] w-[420px] rounded-full border border-blue-500/20 pointer-events-none" />
      <div className="absolute h-[240px] w-[240px] rounded-full border border-blue-500/30 pointer-events-none" />

      {/* Rotating Radar Sweep Line */}
      <div className="absolute h-[600px] w-[600px] rounded-full overflow-hidden pointer-events-none">
        <div className="h-full w-full bg-gradient-to-tr from-blue-500/20 via-transparent to-transparent animate-radar-sweep origin-center" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full space-y-6">
        {/* Glowing AI Emblem / Image Scanner Preview */}
        <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Scanning Scene" className="h-full w-full object-cover filter brightness-75" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900">
              <Shield className="h-16 w-16 text-blue-400 animate-pulse" />
            </div>
          )}

          {/* Animated Scanning Line */}
          <motion.div
            animate={{ y: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-red-500 shadow-lg shadow-blue-500"
          />

          <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-slate-950/80 py-1 text-[10px] font-bold text-blue-400 backdrop-blur-md">
            SCANNING SCENE
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center space-x-2 text-blue-400">
              <Cpu className="h-4 w-4 animate-spin-slow" />
              <span>GEMINI VISION AI PROCESSING</span>
            </span>
            <span className="text-xl font-extrabold text-blue-400">{progress}%</span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900 p-0.5 border border-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Animated HUD Steps Checklist */}
        <div className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-4 space-y-2 text-left shadow-xl">
          {steps.map((stepText, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 text-xs font-semibold transition-all ${
                  isDone
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-blue-300 scale-[1.02]'
                    : 'text-slate-600 opacity-40'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
