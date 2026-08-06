import React from 'react';
import { LayoutDashboard, Sparkles, MapPin, Share2, History, BarChart3, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'upload', label: 'Scanner', icon: Sparkles },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'sos', label: 'SOS', icon: Share2 },
    { id: 'history', label: 'Log', icon: History },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/95 p-1.5 backdrop-blur-2xl lg:hidden shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center space-y-1 px-2.5 py-1 text-[10px] font-bold transition-all ${
                isActive ? 'text-blue-400 scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className={`rounded-xl p-1.5 transition ${isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' : ''}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 h-1 w-4 rounded-full bg-blue-500 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
