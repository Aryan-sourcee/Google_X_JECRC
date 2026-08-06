import React from 'react';
import { Users, Car, Flame, Droplet, AlertOctagon, CheckCircle, Volume2, MapPin, Share2, Sparkles, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EmergencyAnalysis } from '../types/Emergency';
import { IncidentTimeline } from './IncidentTimeline';

interface ResultsViewProps {
  analysis: EmergencyAnalysis;
  onNavigateToMap: () => void;
  onNavigateToSOS: () => void;
  onPlayVoice: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  analysis,
  onNavigateToMap,
  onNavigateToSOS,
  onPlayVoice,
}) => {
  const isCritical = analysis.severity === 'CRITICAL' || analysis.severity === 'HIGH';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
      {/* Top Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-2xl ${
          isCritical ? 'border-red-500/40 bg-slate-900/90' : 'border-amber-500/40 bg-slate-900/90'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-5">
            <img
              src={analysis.imageUrl}
              alt="Analyzed Emergency Scene"
              className="h-24 w-24 rounded-2xl object-cover border-2 border-white/10 shadow-lg"
            />
            <div>
              <div className="flex items-center space-x-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold tracking-wider uppercase shadow-lg ${
                    analysis.severity === 'CRITICAL'
                      ? 'bg-red-600 text-white shadow-red-500/40'
                      : 'bg-amber-500 text-slate-950 shadow-amber-500/40'
                  }`}
                >
                  🔴 {analysis.severity} SEVERITY
                </span>
                <span className="flex items-center space-x-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{analysis.confidence}% CONFIDENCE</span>
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{analysis.title}</h1>
              <p className="mt-1 text-xs text-slate-400 flex items-center space-x-1">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                <span>{analysis.locationName} • Scanned at {analysis.timestamp}</span>
              </p>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onPlayVoice}
              className="flex items-center space-x-2 rounded-2xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              <Volume2 className="h-4 w-4" />
              <span>🔊 Voice Guidance</span>
            </button>

            <button
              onClick={onNavigateToMap}
              className="flex items-center space-x-2 rounded-2xl border border-white/15 bg-slate-800 px-4 py-3 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white"
            >
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>View Emergency Map</span>
            </button>

            <button
              onClick={onNavigateToSOS}
              className="flex items-center space-x-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-300 hover:bg-red-500/20"
            >
              <Share2 className="h-4 w-4 text-red-400" />
              <span>Generate SOS</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detected Hazards & Objects Chips Row */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Detected Scene Parameters</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* People */}
          <div className="glass-card p-4 flex items-center space-x-3 border border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Humans</p>
              <p className="text-base font-bold text-white">{analysis.peopleDetected} Detected</p>
            </div>
          </div>

          {/* Vehicles */}
          <div className="glass-card p-4 flex items-center space-x-3 border border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Vehicles</p>
              <p className="text-base font-bold text-white">{analysis.vehiclesDetected} Involved</p>
            </div>
          </div>

          {/* Fire Risk */}
          <div className={`glass-card p-4 flex items-center space-x-3 ${analysis.fireRisk ? 'border-red-500/40 bg-red-500/10' : 'border-white/10'}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Fire Hazard</p>
              <p className="text-base font-bold text-white">{analysis.fireRisk ? 'Active Fire Risk' : 'None Detected'}</p>
            </div>
          </div>

          {/* Fuel Leak */}
          <div className={`glass-card p-4 flex items-center space-x-3 ${analysis.fuelLeakage ? 'border-amber-500/40 bg-amber-500/10' : 'border-white/10'}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Droplet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Fuel Vapor</p>
              <p className="text-base font-bold text-white">{analysis.fuelLeakage ? 'Leak Detected' : 'Clear'}</p>
            </div>
          </div>

          {/* Road Blocked */}
          <div className="glass-card p-4 flex items-center space-x-3 border border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Traffic Block</p>
              <p className="text-base font-bold text-white">{analysis.roadBlocked ? 'Blocked' : 'Passable'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Rescue Directive & Medical Advice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Immediate Rescue Protocol */}
        <div className="glass-card p-6 border border-emerald-500/30 space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Immediate Rescue Protocol</h3>
          </div>
          <div className="space-y-3">
            {analysis.immediateActions.map((action, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs text-slate-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid & Medical Guidelines */}
        <div className="glass-card p-6 border border-blue-500/30 space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
            <HeartPulse className="h-5 w-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Medical Triage Guidelines</h3>
          </div>
          <div className="space-y-3">
            {analysis.medicalAdvice.map((advice, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs text-slate-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400">
                  +
                </span>
                <p className="leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Predictive Incident Timeline Hero Component */}
      <IncidentTimeline timelineItems={analysis.timeline} />
    </div>
  );
};
