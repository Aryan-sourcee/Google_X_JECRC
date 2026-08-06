# 🏆 CrisisMind AI — Google AI Studio Submission Package

> **"Transform any emergency photo into an actionable rescue plan in under 10 seconds."**

---

## 📌 Project Overview
**CrisisMind AI** is an AI-powered Emergency Intelligence Platform built on Google's AI & Developer Stack. When a citizen or first responder uploads a single photo of an accident, fire, or natural disaster, CrisisMind AI analyzes hazards, counts occupants, estimates injury triage, maps nearby Google Maps response nodes (Hospitals, Police, Ambulances, Shelters), generates multilingual SOS alerts, and provides spoken voice guidance—all in under 10 seconds.

- **GitHub Repository**: [https://github.com/Aryan-sourcee/Google_X_JECRC](https://github.com/Aryan-sourcee/Google_X_JECRC)
- **Built for**: Google Hackathon / Google Ecosystem Showcase
- **Team Members**:
  - **Aryan Meena** — Lead Engineer (`aryan.meena@crisismind.ai`)
  - **Lakshaya Kumawat** — Collaborator (`lakshaya.kumawat@crisismind.ai`)

---

## 🛠️ Google Tech Stack Integration

| Google Tool | Integration & Usage |
|-------------|---------------------|
| **Gemini 2.0 Flash (Google AI Studio)** | Primary Multimodal Vision AI model analyzing emergency scene photos for structural collapse, crash hazards, occupant counts, physical injuries, and executive summaries. |
| **Google Maps Embed & Places API** | Renders live interactive mapping with nearest emergency medical centers, trauma hospitals, police control hubs, and turn-by-turn GPS navigation links. |
| **Google Material Design 3** | Google Ecosystem aesthetic featuring sleek dark mode (`#0F172A`), glassmorphic cards, and signature Google Brand color accents (`#4285F4`, `#EA4335`, `#FBBC05`, `#34A853`). |
| **Web Speech Voice Assistant** | Hands-free audio voice readout of critical 10-second rescue directives for field responders operating in low-visibility or high-stress environments. |
| **Gemini Multilingual SOS Engine** | One-tap emergency dispatch alert translation into regional languages (Hindi, Marathi, Gujarati, Tamil, etc.). |

---

## 🤖 Google AI Studio System Prompt & JSON Schema

### System Prompt (Copy-Paste for AI Studio Playground)
```text
You are an expert emergency response AI called CrisisMind AI.

Analyze the uploaded emergency image carefully. Identify vehicles, occupants, structural damage, fire/smoke, traffic blocks, and injured individuals.

Return ONLY valid JSON. No markdown code fences. No conversational text.

{
  "severity": "Critical | High | Medium | Low",
  "confidence": 97,
  "summary": "Comprehensive 2-sentence executive AI Incident Summary explaining scene context and immediate risk.",
  "people_detected": 4,
  "injuries": ["Possible neck trauma", "Extremity bleeding", "Motorcycle driver leg fracture"],
  "hazards": ["Multi-Vehicle Crash", "Traffic Bottleneck", "Shattered Glass Debris", "Fluid Leakage"],
  "detected_objects": ["Red Hatchback", "White Sedan", "Motorcycle", "Crosswalk", "Traffic Light", "Bystanders"],
  "recommended_services": ["108 Ambulance", "Traffic Police", "Tow Truck Squad"],
  "immediate_actions": ["Divert oncoming intersection traffic", "Do not move casualties with cervical trauma", "Disconnect car batteries to prevent ignition", "Clear pedestrian spectators from roadway"],
  "sos_message": "MAJOR ACCIDENT ALERT! Collision involving Red Hatchback, White Sedan, and Motorcycle at busy city intersection. Multiple casualties. Need immediate 108 Ambulance & Traffic Police.",
  "voice_response": "Multi-vehicle collision detected at city intersection involving red hatchback and motorcycle. 4 occupants gathered. Please clear the road for approaching 108 ambulance."
}
```

---

## 📸 Verified Demo Scenarios Tested

### Scenario 1: Multi-Vehicle City Intersection Collision
- **Input Scene**: Red hatchback with severe side crush damage, white passenger sedan, downed motorcycle, crosswalk asphalt, and gathered bystanders at St. Wilfred College intersection.
- **AI Output**:
  - **Severity**: 🔴 HIGH / CRITICAL (97% Confidence)
  - **Detected Vehicles**: 3 (Red Hatchback, White Sedan, Motorcycle)
  - **Primary Protocol**: Divert oncoming intersection traffic, immobilize motorcyclist cervical spine, disconnect battery terminals, request 108 Trauma Ambulance.

### Scenario 2: Severe Earthquake & Structural Collapse
- **Input Scene**: Residential neighborhood showing 45° tilted two-story buildings, collapsed tile roofs, downed utility lines, and debris blocking narrow access roads.
- **AI Output**:
  - **Severity**: 🔴 CRITICAL (98% Confidence)
  - **Primary Hazards**: Leaning Building Facades, Downed Electrical Lines, Rubble Blockade, Secondary Aftershocks.
  - **Primary Protocol**: 30-meter exclusion perimeter around leaning walls, isolate neighborhood electrical grid, deploy Urban Search & Rescue (USAR) acoustic probes.

---

## 🚀 How to Run Locally

```bash
# 1. Clone repository
git clone https://github.com/Aryan-sourcee/Google_X_JECRC.git
cd Google_X_JECRC

# 2. Install dependencies
npm install

# 3. Configure environment keys in .env
VITE_GEMINI_API_KEY="your_gemini_api_key"
VITE_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"

# 4. Start Vite local server
npm run dev
```

App will run live at `http://localhost:5173/`.
