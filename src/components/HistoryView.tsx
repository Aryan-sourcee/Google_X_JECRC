import React, { useState } from 'react';
import { Calendar, MapPin, Search, ArrowRight } from 'lucide-react';
import type { IncidentRecord } from '../types/Emergency';

interface HistoryViewProps {
  incidents: IncidentRecord[];
  onSelectIncident: (incident: IncidentRecord) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ incidents, onSelectIncident }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredIncidents = incidents.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'ALL' || item.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Emergency Incident History</h1>
          <p className="text-xs text-slate-300">Historical telemetry log of all analyzed emergency scenes & rescue directives.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-64 rounded-xl border border-white/10 bg-slate-900 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-white focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Incident Cards Timeline */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => onSelectIncident(incident)}
            className="cursor-pointer glass-card glass-card-hover p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={incident.imageUrl}
                alt={incident.title}
                className="h-16 w-16 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-base">{incident.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
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

                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    <span>{incident.locationName}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{incident.timestamp}</span>
                  </span>
                </div>

                {/* Hazard Tags preview */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {incident.hazards.slice(0, 3).map((hazard, i) => (
                    <span key={i} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                      {hazard}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 self-end sm:self-center">
              <span>View Report</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
