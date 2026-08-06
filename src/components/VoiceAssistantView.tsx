import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square, Radio, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EmergencyAnalysis } from '../types/Emergency';
import { speechService } from '../services/speech';

interface VoiceAssistantViewProps {
  analysis: EmergencyAnalysis;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({ analysis }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-US');

  const voiceSummaryText = `Emergency alert for ${analysis.title}. Severity is ${analysis.severity}. ${analysis.peopleDetected} occupants detected with estimated ${analysis.estimatedInjuries} injuries. Primary hazard: ${analysis.hazards.join(', ')}. Immediate action required: ${analysis.immediateActions[0]}. Nearest hospital is Apex Trauma Center 1.2 kilometers away.`;

  const handlePlayToggle = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      const success = speechService.speak(
        voiceSummaryText,
        selectedLang,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      if (success) setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-bold text-blue-400">
          <Radio className="h-4 w-4 animate-pulse" />
          <span>Hands-Free Emergency Audio Directive</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Voice Assistant Guidance</h1>
        <p className="text-xs text-slate-300">
          Spoken audio instructions for first responders in high-stress or low-visibility scenarios.
        </p>
      </div>

      {/* Main Glass Audio Card */}
      <div className="glass-card p-8 border border-white/15 shadow-2xl flex flex-col items-center text-center space-y-8">
        {/* Animated Waveform & Central Speaker Emblem */}
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-red-600 p-1 shadow-2xl shadow-blue-500/30">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
            {isPlaying ? (
              <Volume2 className="h-16 w-16 text-blue-400 animate-pulse" />
            ) : (
              <VolumeX className="h-16 w-16 text-slate-500" />
            )}
          </div>

          {/* Equalizer Pulsing Ring */}
          {isPlaying && (
            <span className="absolute -inset-3 rounded-full border-2 border-blue-500/40 animate-ping pointer-events-none" />
          )}
        </div>

        {/* Audio Equalizer Visualizer Bars */}
        <div className="flex items-end justify-center space-x-1.5 h-12 w-full max-w-xs">
          {[40, 70, 35, 90, 60, 100, 50, 80, 45, 65, 30, 85, 55].map((height, i) => (
            <motion.div
              key={i}
              animate={{
                height: isPlaying ? [`${height * 0.2}%`, `${height}%`, `${height * 0.4}%`] : '8px',
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + (i % 5) * 0.1,
                ease: 'easeInOut',
              }}
              className={`w-2 rounded-full ${
                isPlaying ? 'bg-gradient-to-t from-blue-500 to-indigo-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Spoken Text Box */}
        <div className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs font-mono text-slate-200 leading-relaxed text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">AUDIO TRANSCRIPT</p>
          "{voiceSummaryText}"
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
          <Globe className="h-4 w-4 text-blue-400" />
          <span>Voice Language:</span>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="en-US">English (US)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="mr-IN">Marathi (India)</option>
            <option value="ta-IN">Tamil (India)</option>
          </select>
        </div>

        {/* Play/Pause Control Button */}
        <button
          onClick={handlePlayToggle}
          className={`flex items-center space-x-3 rounded-2xl px-8 py-4 text-base font-bold text-white shadow-xl transition hover:scale-105 ${
            isPlaying
              ? 'bg-red-600 shadow-red-600/30 hover:bg-red-500'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="h-5 w-5 fill-current" />
              <span>Stop Voice Guidance</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5 fill-current" />
              <span>Play Spoken Voice Directive</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
