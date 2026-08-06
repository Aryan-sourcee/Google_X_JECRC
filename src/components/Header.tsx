import React from 'react';
import { Shield, Key, Sparkles, LayoutDashboard, MapPin, Share2, History, BarChart3, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  user: { name: string; email: string } | null;
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
    { id: 'upload', label: 'Scanner', icon: Sparkles },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'sos', label: 'SOS', icon: Share2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex cursor-pointer items-center space-x-3 transition hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-red-500 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Shield className="h-5 w-5 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-sans text-xl font-bold tracking-tight text-white">
                CrisisMind<span className="text-blue-500">.AI</span>
              </span>
              <span className="hidden rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-blue-400 border border-blue-500/20 sm:inline-block">
                GOOGLE ECOSYSTEM
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Emergency Intelligence Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 rounded-2xl border border-white/10 bg-slate-950/60 p-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
              hasApiKey
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            }`}
            title="Configure Google AI Studio API Key"
          >
            <Key className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini Active' : 'Set API Key'}</span>
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div className="flex items-center space-x-2 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs font-medium text-slate-200 hidden sm:inline">{user.name}</span>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
