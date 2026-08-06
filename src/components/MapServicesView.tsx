import React, { useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Compass } from 'lucide-react';
import { NEARBY_SERVICES_MOCK } from '../data/mockData';
import type { NearbyService } from '../types/Emergency';

interface MapServicesViewProps {
  locationName?: string;
}

export const MapServicesView: React.FC<MapServicesViewProps> = ({
  locationName = 'NH-48 Corridor, Near Exit 14, Jaipur, Rajasthan',
}) => {
  const [selectedService, setSelectedService] = useState<NearbyService>(NEARBY_SERVICES_MOCK[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'hospital' | 'police' | 'ambulance' | 'shelter'>('all');

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const filteredServices = NEARBY_SERVICES_MOCK.filter(
    (s) => activeFilter === 'all' || s.type === activeFilter
  );

  const handleNavigateGoogleMaps = (service: NearbyService) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-5 border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>Google Maps JavaScript & Places API Active</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Nearest Emergency Response Nodes</h1>
          <p className="text-xs text-slate-300 flex items-center space-x-1 mt-1">
            <MapPin className="h-3.5 w-3.5 text-red-400" />
            <span>Incident GPS: {locationName}</span>
          </p>
        </div>

        {/* Quick Distance Badges */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <div className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-200">
            🏥 Hospital: <span className="text-emerald-400 font-bold">1.2 km</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-200">
            👮 Police: <span className="text-blue-400 font-bold">850 m</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-200">
            🚑 Ambulance: <span className="text-red-400 font-bold">1.6 km</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map & Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map View Box (7 Cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative h-[440px] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-2xl">
            {mapsApiKey && mapsApiKey !== 'your_google_maps_api_key_here' ? (
              <iframe
                title="Live Google Maps Emergency View"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(selectedService.address || locationName)}`}
                className="h-full w-full rounded-3xl"
              />
            ) : (
              /* Simulated Dark Google Map Layer */
              <>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 100 Q 200 150 400 100 T 800 200" stroke="#4285F4" strokeWidth="6" fill="none" />
                  <path d="M 150 0 Q 250 200 150 400" stroke="#34A853" strokeWidth="4" fill="none" />
                  <path d="M 0 300 Q 300 250 600 350" stroke="#EA4335" strokeWidth="4" strokeDasharray="8 8" fill="none" />
                </svg>

                {/* Incident Pin Pulsing */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-600 shadow-xl shadow-red-600/50">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-1 rounded-full bg-slate-950/90 px-2.5 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/40 backdrop-blur-md">
                    EMERGENCY ACCIDENT SPOT
                  </span>
                </div>

                {/* Service Node Pins */}
                {NEARBY_SERVICES_MOCK.map((service, index) => {
                  const isSelected = selectedService.id === service.id;
                  const offsets = [
                    { top: '25%', left: '30%' },
                    { top: '65%', left: '20%' },
                    { top: '35%', left: '70%' },
                    { top: '75%', left: '60%' },
                    { top: '80%', left: '40%' },
                  ];
                  const pos = offsets[index % offsets.length];

                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      style={{ top: pos.top, left: pos.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-lg transition ${
                        isSelected
                          ? 'bg-blue-600 text-white ring-4 ring-blue-500/40 scale-110'
                          : 'bg-slate-900/90 text-slate-200 border border-white/20 hover:bg-slate-800'
                      }`}
                    >
                      <span>
                        {service.type === 'hospital' ? '🏥' : service.type === 'police' ? '👮' : service.type === 'ambulance' ? '🚑' : '🏠'}
                      </span>
                      <span className="hidden sm:inline">{service.distanceKm} km</span>
                    </button>
                  );
                })}
              </>
            )}

            {/* Floating Navigation Trigger Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/90 p-3 backdrop-blur-xl z-10">
              <div>
                <p className="text-xs font-bold text-white">{selectedService.name}</p>
                <p className="text-[10px] text-slate-400">{selectedService.address} • ETA: {selectedService.etaMinutes} mins</p>
              </div>
              <button
                onClick={() => handleNavigateGoogleMaps(selectedService)}
                className="flex items-center space-x-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-500"
              >
                <Navigation className="h-4 w-4" />
                <span>Navigate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Sidebar List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'hospital', label: '🏥 Hospitals' },
              { id: 'police', label: '👮 Police' },
              { id: 'ambulance', label: '🚑 Ambulance' },
              { id: 'shelter', label: '🏠 Shelters' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* List of Services */}
          <div className="space-y-3 max-h-[390px] overflow-y-auto pr-1">
            {filteredServices.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    isSelected
                      ? 'border-blue-500 bg-slate-900/90 shadow-lg shadow-blue-500/10'
                      : 'border-white/10 bg-slate-900/50 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base">
                          {service.type === 'hospital'
                            ? '🏥'
                            : service.type === 'police'
                            ? '👮'
                            : service.type === 'ambulance'
                            ? '🚑'
                            : '🏠'}
                        </span>
                        <h4 className="font-bold text-white text-sm">{service.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{service.address}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                      {service.distanceKm} km
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center space-x-3 text-xs text-slate-300">
                      <span>⏱ ETA ~{service.etaMinutes} mins</span>
                      {service.availableUnits && (
                        <span className="text-blue-400 font-semibold">• {service.availableUnits} units free</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${service.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl border border-white/10 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                        title="Call Emergency Service"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateGoogleMaps(service);
                        }}
                        className="flex items-center space-x-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500"
                      >
                        <span>Directions</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
