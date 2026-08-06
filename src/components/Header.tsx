import React from 'react';
import { Shield, Key, Sparkles, LayoutDashboard, MapPin, Share2, History, BarChart3, Settings, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  user: { name: string; email: string; role?: string } | null;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiKeyModal,
  hasApiKey,
  user,
  onOpenLogin,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'upload', label: 'AI Scanner', icon: Sparkles, badge: 'LIVE' },
    { id: 'map', label: 'Maps', icon: MapPin },
    { id: 'sos', label: 'SOS Broadcast', icon: Share2 },
    { id: 'history', label: 'Incident Log', icon: History },
    { id: 'analytics', label: 'Command Center', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl transition-all">
      {/* Top Google Brand Accent Gradient Bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex cursor-pointer items-center space-x-3 transition group"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-red-500 p-0.5 shadow-lg shadow-blue-500/25 transition group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
              <Shield className="h-6 w-6 text-blue-400 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-sans text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition">
                CrisisMind<span className="text-blue-500">.AI</span>
              </span>
              <span className="hidden rounded-full bg-gradient-to-r from-blue-500/15 to-indigo-500/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-300 border border-blue-500/30 sm:inline-block">
                GOOGLE ECOSYSTEM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Emergency Intelligence Platform</p>
          </div>
        </div>

        {/* Desktop Central Navigation Menu Bar */}
        <nav className="hidden lg:flex items-center space-x-1.5 rounded-2xl border border-white/10 bg-slate-900/80 p-1.5 backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-blue-600/35 scale-[1.02]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                }`}
              >
                <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>

                {item.badge && !isActive && (
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-400 border border-emerald-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Profile */}
        <div className="flex items-center space-x-3">
          {/* Quick Scanner Launch Button */}
          <button
            onClick={() => setActiveTab('upload')}
            className="hidden sm:flex items-center space-x-1.5 rounded-xl border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-300 transition hover:bg-blue-500/20 hover:border-blue-500/70"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
            <span>Scan Scene</span>
          </button>

          {/* Gemini API Key Status Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
              hasApiKey
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            }`}
            title="Configure Google AI Studio API Key"
          >
            <Key className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini Active' : 'Set API Key'}</span>
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-2.5 rounded-xl border border-white/15 bg-slate-900/90 px-3 py-1.5 transition hover:border-blue-500/40 hover:bg-slate-800"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-extrabold text-white shadow-md">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-100">{user.name}</span>
                <span className="text-[10px] text-blue-400 font-medium">{user.role || 'Lead Engineer'}</span>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-indigo-500"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
