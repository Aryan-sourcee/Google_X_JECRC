export type EmergencySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface EmergencyTimelineItem {
  timeframe: string; // e.g. "0 - 2 min", "2 - 5 min", "5 - 10 min"
  title: string;
  riskDescription: string;
  priorityAction: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface EmergencyAnalysis {
  id: string;
  timestamp: string;
  title: string;
  imageUrl: string;
  severity: EmergencySeverity;
  confidence: number;
  peopleDetected: number;
  vehiclesDetected: number;
  estimatedInjuries: number;
  hazards: string[];
  immediateActions: string[];
  medicalAdvice: string[];
  fireRisk: boolean;
  fuelLeakage: boolean;
  roadBlocked: boolean;
  rescuePriority: 'HIGH' | 'URGENT' | 'STANDARD';
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timeline: EmergencyTimelineItem[];
  recommendedServices: string[];
}

export interface NearbyService {
  id: string;
  name: string;
  type: 'hospital' | 'police' | 'ambulance' | 'shelter';
  distanceKm: number;
  phone: string;
  address: string;
  etaMinutes: number;
  lat: number;
  lng: number;
  rating: number;
  availableUnits?: number;
}

export interface IncidentRecord extends EmergencyAnalysis {
  status: 'DISPATCHED' | 'IN_PROGRESS' | 'RESOLVED';
  responderAssigned?: string;
}

export interface PresetEmergency {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  mockData: EmergencyAnalysis;
}
