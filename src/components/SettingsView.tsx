import React, { useState } from 'react';
import { Key, Phone, WifiOff, Check, Sparkles } from 'lucide-react';

interface SettingsViewProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ apiKey, onSaveApiKey }) => {
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const handleSave = () => {
    onSaveApiKey(tempApiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Platform Settings</h1>
        <p className="text-xs text-slate-300">Configure Google API credentials, offline caches, and emergency contacts.</p>
      </div>

      {/* Gemini API Key Card */}
      <div className="glass-card p-6 border border-blue-500/30 space-y-4">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Google AI Studio API Key</h3>
            <p className="text-xs text-slate-400">Used for live Gemini 2.5/3.6 Flash multimodal vision and translation calls.</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300">API Key Input:</label>
          <div className="flex items-center space-x-3">
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 shadow-md"
            >
              {savedSuccess ? <Check className="h-4 w-4 text-emerald-300" /> : <Sparkles className="h-4 w-4" />}
              <span>{savedSuccess ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            If left blank, CrisisMind AI runs seamlessly using built-in high-accuracy simulated Gemini vision presets.
          </p>
        </div>
      </div>

      {/* Offline Mode & Network Controls */}
      <div className="glass-card p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <WifiOff className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Offline Autonomous Cache</h3>
              <p className="text-xs text-slate-400">Enable local response cache for areas with low bandwidth or degraded cell connectivity.</p>
            </div>
          </div>

          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              offlineMode ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                offlineMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Emergency Hotline Numbers Card */}
      <div className="glass-card p-6 border border-white/10 space-y-4">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">National Emergency Dispatch Numbers</h3>
            <p className="text-xs text-slate-400">Default hotline numbers included in generated SOS dispatches.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-slate-950 p-3">
            <p className="text-slate-400 font-medium">National Emergency Helpline</p>
            <p className="text-base font-bold text-white mt-1">112</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950 p-3">
            <p className="text-slate-400 font-medium">Medical Life Support Ambulance</p>
            <p className="text-base font-bold text-white mt-1">108</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950 p-3">
            <p className="text-slate-400 font-medium">Fire & Hazmat Squad</p>
            <p className="text-base font-bold text-white mt-1">101</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-400">CrisisMind AI • Google Ecosystem Showcase Edition</p>
        <p>Built with React 18, Vite, Gemini 2.5/3.6, Google Maps, and Material 3 design system.</p>
      </div>
    </div>
  );
};
