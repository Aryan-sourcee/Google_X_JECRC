import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EmergencyTimelineItem } from '../types/Emergency';

interface IncidentTimelineProps {
  timelineItems: EmergencyTimelineItem[];
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ timelineItems }) => {
  return (
    <div className="rounded-3xl border border-blue-500/30 bg-slate-900/90 p-6 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Clock className="h-4 w-4 animate-spin-slow" />
            <span>Hero Feature • Predictive Intelligence</span>
          </div>
          <h2 className="text-xl font-extrabold text-white sm:text-2xl mt-1">AI Incident Escalation Timeline</h2>
          <p className="text-xs text-slate-300">
            Gemini multi-step predictive situational guidance forecasting risk progression over the next 10 minutes.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center space-x-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/20">
          <span>AI Forecast</span>
        </span>
      </div>

      {/* Timeline Steps */}
      <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-red-500 before:via-amber-500 before:to-blue-500">
        {timelineItems.map((item, index) => {
          const isCritical = item.severity === 'critical';
          const isWarning = item.severity === 'warning';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex items-start space-x-4 pl-12"
            >
              {/* Timeline Pin Indicator */}
              <div
                className={`absolute left-3 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-slate-950 font-extrabold text-[11px] shadow-lg ${
                  isCritical
                    ? 'border-red-500 text-red-400 shadow-red-500/30'
                    : isWarning
                    ? 'border-amber-500 text-amber-400 shadow-amber-500/30'
                    : 'border-blue-500 text-blue-400 shadow-blue-500/30'
                }`}
              >
                {index + 1}
              </div>

              {/* Card content */}
              <div className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-white/20">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${
                      isCritical
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    ⏱ {item.timeframe}
                  </span>
                  <span className="text-xs font-bold text-white flex items-center space-x-1">
                    <span>{item.title}</span>
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-200">Risk Assessment: </span>
                    {item.riskDescription}
                  </p>

                  <div className="flex items-start space-x-2 rounded-xl bg-blue-950/40 p-2.5 border border-blue-500/20 text-xs text-blue-200">
                    <ArrowUpRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-300">Priority Action: </span>
                      <span>{item.priorityAction}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
