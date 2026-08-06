import React from 'react';
import { LayoutDashboard, Sparkles, MapPin, Share2, History, BarChart3 } from 'lucide-react';

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
    { id: 'history', label: 'History', icon: History },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/90 p-2 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-1 text-[10px] font-medium transition ${
                isActive ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className={`rounded-xl p-1.5 transition ${isActive ? 'bg-blue-500/20' : ''}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
