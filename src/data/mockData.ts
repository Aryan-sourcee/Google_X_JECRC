import type { PresetEmergency, IncidentRecord, NearbyService } from '../types/Emergency';

export const PRESET_EMERGENCIES: PresetEmergency[] = [
  {
    id: 'preset-car-crash',
    title: 'Highway Multi-Vehicle Crash',
    category: 'Traffic Collision',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    description: 'High-speed two-car collision with visible structural compression and fuel vapor trail.',
    mockData: {
      id: 'INC-2026-8921',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Highway Collision & Fuel Vapor Risk',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
      severity: 'HIGH',
      confidence: 97,
      summary: 'This appears to be a high-severity road accident involving two passenger vehicles and 3 occupants. Visible fuel leakage and smoke increase the risk of ignition. Immediate medical triage and traffic control recommended.',
      peopleDetected: 3,
      vehiclesDetected: 2,
      estimatedInjuries: 2,
      injuries: ['Possible leg trauma', 'Scalp laceration & bleeding'],
      hazards: [
        'Car Collision',
        'Active Fuel Leakage',
        'Fire Risk',
        'High Speed Road Blocked',
        'Glass Debris'
      ],
      detectedObjects: ['Sedan Car', 'SUV Vehicle', 'Shattered Windshield', 'Poured Fuel Vapor', 'Highway Guardrail'],
      immediateActions: [
        'Safely extract conscious victims away from leaking fuel vapors.',
        'Do not start engines or ignite any open fires nearby.',
        'Apply firm pressure with clean fabric to control extremity bleeding.',
        'Alert oncoming traffic using hazard flare/reflective vest.'
      ],
      medicalAdvice: [
        'Suspected cervical spine trauma for driver of primary vehicle.',
        'Monitor for signs of acute shock and respiratory distress.'
      ],
      fireRisk: true,
      fuelLeakage: true,
      roadBlocked: true,
      rescuePriority: 'URGENT',
      sosMessage: 'EMERGENCY! Road collision near NH-48 Corridor. 2 occupants injured with active fuel leakage. Immediate ambulance and fire squad required.',
      voiceResponse: 'Two injured persons detected. Please move away from the vehicle immediately due to possible fuel leakage and fire hazard.',
      locationName: 'NH-48 Corridor, Near Exit 14, Jaipur, Rajasthan',
      coordinates: { lat: 26.9124, lng: 75.7873 },
      recommendedServices: ['Level-1 Trauma Center', 'Heavy Extrication Fire Engine', 'Traffic Patrol Unit'],
      timeline: [
        {
          timeframe: '0 - 2 Min',
          title: 'Fuel Leakage & Ignition Risk',
          riskDescription: 'Flammable fuel pooling around battery terminal electrical leads.',
          priorityAction: 'Disconnect vehicle battery if safely accessible, evacuate 15m radius.',
          severity: 'critical'
        },
        {
          timeframe: '2 - 5 Min',
          title: 'Traffic Bottleneck & Secondary Impact',
          riskDescription: 'High-speed oncoming highway traffic approaching blocked lane.',
          priorityAction: 'Deploy warning signs 100 meters upstream to prevent pileup.',
          severity: 'warning'
        },
        {
          timeframe: '5 - 10 Min',
          title: 'Hypovolemic Shock Risk',
          riskDescription: 'Victim 2 exhibiting signs of severe internal or extremity hemorrhage.',
          priorityAction: 'Maintain compression dressings, keep patient warm, await Advanced Life Support.',
          severity: 'critical'
        }
      ]
    }
  },
  {
    id: 'preset-building-fire',
    title: 'Industrial Structure Fire',
    category: 'Fire Incident',
    imageUrl: 'https://images.unsplash.com/photo-1589824783837-6169889fa20f?auto=format&fit=crop&w=1000&q=80',
    description: 'Heavy smoke plume emanating from commercial warehouse facility with active structural flames.',
    mockData: {
      id: 'INC-2026-4412',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Commercial Warehouse Structural Blaze',
      imageUrl: 'https://images.unsplash.com/photo-1589824783837-6169889fa20f?auto=format&fit=crop&w=1000&q=80',
      severity: 'CRITICAL',
      confidence: 99,
      summary: 'Active commercial structure fire generating dense carbon monoxide smoke. Roof trusses show signs of thermal strain. Evacuate all personnel upwind immediately.',
      peopleDetected: 4,
      vehiclesDetected: 1,
      estimatedInjuries: 3,
      injuries: ['Second-degree thermal burns', 'Severe smoke inhalation airway distress'],
      hazards: [
        'Active Structural Flames',
        'Toxic Dense Smoke Plume',
        'Structural Collapse Hazard',
        'Electrical Transformer Proximity'
      ],
      detectedObjects: ['Warehouse Building', 'Dense Smoke Cloud', 'Structural Roof Beam', 'Fire Engine'],
      immediateActions: [
        'Evacuate upwind of smoke plume immediately to prevent toxic inhalation.',
        'Establish 50-meter perimeter around perimeter walls.',
        'Notify Fire Hazmat Response team for chemical storage verification.'
      ],
      medicalAdvice: [
        'Administer 100% humidified oxygen for smoke inhalation victims.',
        'Treat second-degree thermal burns with cold water compress.'
      ],
      fireRisk: true,
      fuelLeakage: false,
      roadBlocked: true,
      rescuePriority: 'URGENT',
      sosMessage: 'FIRE EMERGENCY! Commercial warehouse fire in Tonk Road Industrial Zone. 3 workers injured from smoke inhalation. Urgent fire ladder tender and burn ICU required.',
      voiceResponse: 'Critical structural fire detected. Evacuate upwind immediately to avoid toxic smoke inhalation. 3 casualties require emergency oxygen.',
      locationName: 'Industrial Area Zone 3, Tonk Road, Jaipur',
      coordinates: { lat: 26.8524, lng: 75.8173 },
      recommendedServices: ['Hazmat Fire Ladder Tender', 'Burn Intensive Care Unit', 'Disaster Relief Squad'],
      timeline: [
        {
          timeframe: '0 - 2 Min',
          title: 'Smoke Evacuation & Airway Hazards',
          riskDescription: 'Carbon monoxide and synthetic gas accumulation indoors.',
          priorityAction: 'Cover face with wet cloth, crawl low below smoke level.',
          severity: 'critical'
        },
        {
          timeframe: '2 - 5 Min',
          title: 'Roof Truss Structural Weakening',
          riskDescription: 'Steel support beams reaching thermal yield threshold.',
          priorityAction: 'Order complete evacuation of interior zones.',
          severity: 'critical'
        },
        {
          timeframe: '5 - 10 Min',
          title: 'Flame Spread to Adjacent Storage',
          riskDescription: 'Thermal radiation threatening secondary solvent drums.',
          priorityAction: 'Establish exterior foam suppression barrier.',
          severity: 'warning'
        }
      ]
    }
  },
  {
    id: 'preset-urban-flood',
    title: 'Flash Flood Submersion',
    category: 'Natural Disaster',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
    description: 'Submerged passenger vehicle in rapid urban floodwaters with stranded occupants.',
    mockData: {
      id: 'INC-2026-7819',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Submerged Vehicle & Rapid Water Current',
      imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
      severity: 'HIGH',
      confidence: 94,
      summary: 'Passenger sedan trapped in fast-flowing urban underpass floodwaters. Occupants elevated on roof. Aquatic rescue and flotation lines required.',
      peopleDetected: 2,
      vehiclesDetected: 1,
      estimatedInjuries: 1,
      injuries: ['Hypothermia & exhaustion', 'Minor contusions'],
      hazards: [
        'Fast-Moving Water Current',
        'Vehicle Inundation',
        'Submerged Debris Hazard',
        'Powerline Electrical Risk'
      ],
      detectedObjects: ['Submerged Sedan', 'Urban Underpass Water', 'Stranded Occupants', 'Floating Trash Debris'],
      immediateActions: [
        'Advise occupants to remain on vehicle roof if interior is filling.',
        'Do not attempt wading through water exceeding knee depth.',
        'Throw flotation device attached to safety line.'
      ],
      medicalAdvice: [
        'Check for signs of hypothermia and accidental aspiration.',
        'Keep patient elevated and warm.'
      ],
      fireRisk: false,
      fuelLeakage: false,
      roadBlocked: true,
      rescuePriority: 'HIGH',
      sosMessage: 'FLOOD EMERGENCY! Vehicle submerged in MI Road Underpass. 2 people stranded on vehicle roof in swift current. Dispatch Aquatic Rescue Boat immediately.',
      voiceResponse: 'Flash flood submergence detected. Occupants should stay on vehicle roof and avoid wading into swift water currents.',
      locationName: 'Underpass Crossing, MI Road, Jaipur',
      coordinates: { lat: 26.9180, lng: 75.8050 },
      recommendedServices: ['Aquatic Rescue Team', 'Amphibious Vehicle Unit', 'Emergency Medical Service'],
      timeline: [
        {
          timeframe: '0 - 2 Min',
          title: 'Vehicle Hydrostatic Buoyancy Loss',
          riskDescription: 'Water entering engine compartment causing vehicle displacement downstream.',
          priorityAction: 'Anchor rescue ropes to solid fixed structures upstream.',
          severity: 'critical'
        },
        {
          timeframe: '2 - 5 Min',
          title: 'Hypothermia & Muscle Exhaustion',
          riskDescription: 'Prolonged exposure to cold swift water draining victim stamina.',
          priorityAction: 'Deploy inflatable rescue raft to extract occupants.',
          severity: 'warning'
        },
        {
          timeframe: '5 - 10 Min',
          title: 'Downstream Debris Accumulation',
          riskDescription: 'Floating logs and urban trash accumulating against vehicle chassis.',
          priorityAction: 'Clear downstream drainage grid under emergency supervisor oversight.',
          severity: 'info'
        }
      ]
    }
  }
];

export const NEARBY_SERVICES_MOCK: NearbyService[] = [
  {
    id: 'serv-1',
    name: 'Apex Super Specialty Hospital & Trauma Center',
    type: 'hospital',
    distanceKm: 1.2,
    phone: '+91 141 276 0000',
    address: 'VT Road, Mansarovar, Jaipur',
    etaMinutes: 4,
    lat: 26.8724,
    lng: 75.7673,
    rating: 4.8,
    availableUnits: 6
  },
  {
    id: 'serv-2',
    name: 'SMS Govt Emergency Medical Department',
    type: 'hospital',
    distanceKm: 2.8,
    phone: '+91 141 256 0291',
    address: 'Jawahar Lal Nehru Marg, Jaipur',
    etaMinutes: 8,
    lat: 26.8924,
    lng: 75.8173,
    rating: 4.6,
    availableUnits: 14
  },
  {
    id: 'serv-3',
    name: 'Central Control Police Response Hub (112)',
    type: 'police',
    distanceKm: 0.85,
    phone: '112 / +91 141 220 4444',
    address: 'MI Road Police Station, Jaipur',
    etaMinutes: 3,
    lat: 26.9150,
    lng: 75.7950,
    rating: 4.9,
    availableUnits: 4
  },
  {
    id: 'serv-4',
    name: '108 National Advanced Life Support Ambulance',
    type: 'ambulance',
    distanceKm: 1.6,
    phone: '108',
    address: 'Stationed at Malviya Nagar Sector 4, Jaipur',
    etaMinutes: 5,
    lat: 26.8550,
    lng: 75.8250,
    rating: 4.9,
    availableUnits: 2
  },
  {
    id: 'serv-5',
    name: 'Civil Defense Emergency Relief Shelter Hub',
    type: 'shelter',
    distanceKm: 2.0,
    phone: '+91 141 230 1122',
    address: 'Community Center Grounds, Bajaj Nagar, Jaipur',
    etaMinutes: 7,
    lat: 26.8650,
    lng: 75.7990,
    rating: 4.7,
    availableUnits: 150
  }
];

export const INITIAL_INCIDENTS_HISTORY: IncidentRecord[] = [
  PRESET_EMERGENCIES[0].mockData as IncidentRecord,
  PRESET_EMERGENCIES[1].mockData as IncidentRecord,
  PRESET_EMERGENCIES[2].mockData as IncidentRecord,
  {
    id: 'INC-2026-1022',
    timestamp: '09:15 AM',
    title: 'Gas Cylinder Leak in Residential Block',
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    severity: 'MEDIUM',
    confidence: 92,
    summary: 'LPG cylinder leak detected in apartment kitchen. Odor threshold reached. Shut off main valve immediately.',
    peopleDetected: 5,
    vehiclesDetected: 0,
    estimatedInjuries: 0,
    injuries: [],
    hazards: ['LPG Gas Odor', 'Explosion Hazard'],
    detectedObjects: ['Gas Cylinder', 'Kitchen Counter'],
    immediateActions: ['Shut main valve', 'Open windows', 'Do not flip light switches'],
    medicalAdvice: ['Evacuate to open air'],
    fireRisk: true,
    fuelLeakage: true,
    roadBlocked: false,
    rescuePriority: 'STANDARD',
    sosMessage: 'GAS LEAK ALERT! Residential gas cylinder leak in Vaishali Nagar. Windows opened, valve shut. Need gas safety squad check.',
    voiceResponse: 'Residential LPG gas leak detected. Please shut main valve and open all windows. Avoid creating sparks or flipping switches.',
    locationName: 'Vaishali Nagar, Sector 3, Jaipur',
    coordinates: { lat: 26.9000, lng: 75.7400 },
    timeline: [],
    recommendedServices: ['Gas Emergency Squad'],
    status: 'RESOLVED'
  }
];
