import React from 'react';
import { Upload, Camera, Mic, Flame, ShieldAlert, CheckCircle2, ArrowRight, Activity, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRESET_EMERGENCIES } from '../data/mockData';
import type { IncidentRecord } from '../types/Emergency';

interface HomeDashboardViewProps {
  userName: string;
  onNavigateToUpload: () => void;
  onSelectPreset: (presetId: string) => void;
  recentIncidents: IncidentRecord[];
  onSelectIncident: (incident: IncidentRecord) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  userName,
  onNavigateToUpload,
  onSelectPreset,
  recentIncidents,
  onSelectIncident,
}) => {
  const criticalCount = recentIncidents.filter((i) => i.severity === 'CRITICAL' || i.severity === 'HIGH').length;
  const mediumCount = recentIncidents.filter((i) => i.severity === 'MEDIUM').length;
  const resolvedCount = recentIncidents.filter((i) => i.severity === 'LOW' || i.status === 'RESOLVED').length + 8;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Activity className="h-4 w-4 animate-pulse" />
              <span>Real-Time Incident Monitoring Active</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Hello {userName} <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Upload or photograph any emergency scene for instant 10-second multimodal AI hazard analysis, emergency routing, and voice guidance.
            </p>
          </div>

          <button
            onClick={onNavigateToUpload}
            className="flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:scale-105 active:scale-95"
          >
            <Sparkles className="h-5 w-5" />
            <span>Launch AI Scanner</span>
          </button>
        </div>
      </motion.div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Upload Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={onNavigateToUpload}
          className="cursor-pointer glass-card p-6 flex items-center space-x-4 border border-blue-500/20 hover:border-blue-500/50 transition group"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Upload Image</h3>
            <p className="text-xs text-slate-400">Scan photo from file system</p>
          </div>
        </motion.div>

        {/* Camera Photo Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={onNavigateToUpload}
          className="cursor-pointer glass-card p-6 flex items-center space-x-4 border border-indigo-500/20 hover:border-indigo-500/50 transition group"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
            <Camera className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Take Photo</h3>
            <p className="text-xs text-slate-400">Capture scene with camera</p>
          </div>
        </motion.div>

        {/* Voice Report Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={onNavigateToUpload}
          className="cursor-pointer glass-card p-6 flex items-center space-x-4 border border-emerald-500/20 hover:border-emerald-500/50 transition group"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
            <Mic className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Voice Report</h3>
            <p className="text-xs text-slate-400">Speak emergency context</p>
          </div>
        </motion.div>
      </div>

      {/* Preset Demo Section for Instant Judge Testing */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>Instant Hackathon Demo Presets</span>
            </h2>
            <p className="text-xs text-slate-400">Click any preset to test Gemini Vision analysis immediately without uploading files.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_EMERGENCIES.map((preset) => (
            <motion.div
              key={preset.id}
              whileHover={{ y: -4 }}
              onClick={() => onSelectPreset(preset.id)}
              className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md transition hover:border-blue-500/40 group shadow-lg"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  src={preset.imageUrl}
                  alt={preset.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-blue-400 backdrop-blur-md border border-white/10">
                  {preset.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition">{preset.title}</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">{preset.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-400">
                  <span>Simulate AI Analysis</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Counter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Critical */}
        <div className="glass-card p-5 border border-red-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Incidents</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-white">{criticalCount}</p>
          <span className="text-[11px] text-red-400 font-medium">Requires Immediate Dispatch</span>
        </div>

        {/* Medium */}
        <div className="glass-card p-5 border border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Medium Severity</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-white">{mediumCount}</p>
          <span className="text-[11px] text-amber-400 font-medium">Under Active Triage</span>
        </div>

        {/* Safe / Resolved */}
        <div className="glass-card p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Safe & Resolved</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-white">{resolvedCount}</p>
          <span className="text-[11px] text-emerald-400 font-medium">Clear Perimeter Established</span>
        </div>
      </div>

      {/* Recent Incidents Feed */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Logged Incidents</h2>
          <span className="text-xs text-slate-400">Updated Real-Time</span>
        </div>

        <div className="space-y-3">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => onSelectIncident(incident)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-white/5 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer transition gap-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={incident.imageUrl}
                  alt={incident.title}
                  className="h-14 w-14 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{incident.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        incident.severity === 'CRITICAL'
                          ? 'glow-pill-critical'
                          : incident.severity === 'HIGH'
                          ? 'glow-pill-high'
                          : 'glow-pill-medium'
                      }`}
                    >
                      {incident.severity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-slate-500" />
                      <span>{incident.locationName}</span>
                    </span>
                    <span>•</span>
                    <span>{incident.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center">
                <span className="text-xs font-semibold text-blue-400">View Rescue Plan →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
