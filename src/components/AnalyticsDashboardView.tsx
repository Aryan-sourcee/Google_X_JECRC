import React from 'react';
import { BarChart3, PieChart as PieIcon, TrendingUp, Activity } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const AnalyticsDashboardView: React.FC = () => {
  const pieData = [
    { name: 'Critical', value: 4, color: '#EA4335' },
    { name: 'High', value: 5, color: '#FBBC05' },
    { name: 'Medium', value: 6, color: '#4285F4' },
    { name: 'Low / Safe', value: 7, color: '#34A853' },
  ];

  const trendData = [
    { time: '06:00 AM', incidents: 1 },
    { time: '09:00 AM', incidents: 4 },
    { time: '12:00 PM', incidents: 7 },
    { time: '03:00 PM', incidents: 14 },
    { time: '06:00 PM', incidents: 18 },
  ];

  const hazardData = [
    { hazard: 'Car Collisions', count: 8 },
    { hazard: 'Fire & Smoke', count: 6 },
    { hazard: 'Fuel Vapor Leaks', count: 5 },
    { hazard: 'Flash Flood', count: 3 },
    { hazard: 'Structural Weakness', count: 2 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Activity className="h-4 w-4 animate-pulse" />
            <span>Command Center Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Live Incident Telemetry</h1>
          <p className="text-xs text-slate-300">Real-time emergency intelligence metrics logged by Gemini AI vision stack.</p>
        </div>

        <div className="flex items-center space-x-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Live Telemetry Stream Active</span>
        </div>
      </div>

      {/* Top Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase">Today's Incidents</p>
          <p className="mt-2 text-3xl font-extrabold text-white">18</p>
          <span className="text-[11px] text-blue-400 font-medium">+24% vs yesterday</span>
        </div>

        <div className="glass-card p-5 border border-red-500/20">
          <p className="text-xs font-semibold text-slate-400 uppercase">Critical Priority</p>
          <p className="mt-2 text-3xl font-extrabold text-red-400">4</p>
          <span className="text-[11px] text-red-400 font-medium">Under active dispatch</span>
        </div>

        <div className="glass-card p-5 border border-amber-500/20">
          <p className="text-xs font-semibold text-slate-400 uppercase">Medium Severity</p>
          <p className="mt-2 text-3xl font-extrabold text-amber-400">7</p>
          <span className="text-[11px] text-amber-400 font-medium">Triage stable</span>
        </div>

        <div className="glass-card p-5 border border-emerald-500/20">
          <p className="text-xs font-semibold text-slate-400 uppercase">Safe / Resolved</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">7</p>
          <span className="text-[11px] text-emerald-400 font-medium">Perimeter cleared</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Severity Distribution Pie Chart (5 Cols) */}
        <div className="lg:col-span-5 glass-card p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <PieIcon className="h-5 w-5 text-blue-400" />
              <span>Severity Breakdown</span>
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300">{item.name}:</span>
                <span className="text-white font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Time Trend Area Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-card p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <span>Incident Cumulative Timeline</span>
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="incidents" stroke="#4285F4" fillOpacity={1} fill="url(#colorIncidents)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Hazard Categories Bar Chart */}
      <div className="glass-card p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-amber-400" />
            <span>Top Hazard Category Distribution</span>
          </h3>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hazardData}>
              <XAxis dataKey="hazard" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#4285F4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
