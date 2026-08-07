# 🚨 CrisisMind AI — Emergency Intelligence Platform

<div align="center">

![Google Ecosystem](https://img.shields.io/badge/Google-Ecosystem_Showcase-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Gemini 2.0 Flash](https://img.shields.io/badge/Gemini-2.0_Flash-8E44AD?style=for-the-badge&logo=googlegemini&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google_Maps-Embed_API-34A853?style=for-the-badge&logo=googlemaps&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

### **"Transform any emergency photo into an actionable rescue plan in under 10 seconds."**

[Repository](https://github.com/Aryan-sourcee/Google_X_JECRC) • [Submission Showcase](AI_STUDIO_SHOWCASE.md) • [Demo Video / App](http://localhost:5173/)

---

</div>

## 🏆 Project Overview

**CrisisMind AI** is an emergency intelligence platform engineered using Google's AI and developer stack. When a citizen or field responder captures or uploads a photo of an accident, natural disaster, or fire, CrisisMind AI analyzes the scene in under 10 seconds to:

1. **Detect Hazards & Objects**: Identifies structural damage, fire/smoke risk, fluid leaks, crushed vehicles, and road blockades.
2. **Estimate Casualty Triage**: Counts occupants, identifies severe physical injuries, and recommends specialized trauma services.
3. **Generate Executive AI Incident Summaries**: Synthesizes complex scene context into concise, high-priority briefs.
4. **Forecast Predictive Risk Progression**: Computes a time-series escalation timeline (0–2m, 2–5m, 5–10m).
5. **Connect Live Response Nodes**: Locates nearby hospitals, police hubs, 108 ambulances, and relief shelters via **Google Maps**.
6. **Provide Hands-Free Voice Guidance**: Delivers real-time spoken instructions using Web Speech synthesis.
7. **Broadcast Multilingual SOS Alerts**: Translates emergency notifications into regional languages (Hindi, Marathi, Gujarati, Tamil, etc.).

---

## 👥 Development Team

- **Aryan Meena** — *Lead Developer* (`aryan.meena@crisismind.ai`)
- **Lakshaya Kumawat** — *Collaborator* (`lakshaya.kumawat@crisismind.ai`)

---

## 🛠️ Tech Stack (Google-First Architecture)

| Component | Tool / Technology | Purpose |
|-----------|-------------------|---------|
| **Vision & Multimodal AI** | **Gemini 2.0 Flash** (`@google/genai`) | Analyzes scene photos with structured JSON schema for instant triage. |
| **Mapping & Navigation** | **Google Maps Embed API** | Displays interactive maps, nearby response units, and GPS routing. |
| **UI Design System** | **Material Design 3 + Glassmorphism** | Modern Google dark theme (`#0F172A`) with Google brand accents (`#4285F4`, `#EA4335`, `#FBBC05`, `#34A853`). |
| **Frontend Framework** | **React 18 + Vite 8 + TypeScript** | High-performance SPA with instant HMR and strict type safety. |
| **Styling & Animations** | **Tailwind CSS v4 + Framer Motion** | Micro-interactions, radar sweeps, and responsive glassmorphic cards. |
| **Voice Guidance** | **Web Speech Synthesis API** | Spoken audio readouts for hands-free rescue operation. |
| **Analytics Dashboard** | **Recharts** | Telemetry charts showing incident distribution, risk levels, and response times. |

---

## ✨ Key Features

### ⚡ 1. Live Device Camera Capture & Drag-and-Drop Scanner
- Real-time webcam integration via `navigator.mediaDevices.getUserMedia` allows first responders to capture snapshot photos directly from their phone or computer camera.
- Drag-and-drop file uploader supporting PNG, JPG, and JPEG up to 15MB.

### 🧠 2. Gemini Multimodal Scene Analysis
- **Executive AI Incident Summary**: Concise 2-sentence situational briefing powered by Gemini multimodal reasoning.
- **Injury & Hazard Triage**: Identifies cervical spine trauma, limb fractures, dust inhalation, fuel leaks, and fire risks.
- **Occupant & Vehicle Detection**: Quantifies people count and vehicle involvement.

### ⏱️ 3. Predictive AI Incident Timeline
- Time-series risk progression model forecasting threats:
  - **0 – 2 Min**: Immediate threat containment & perimeter isolation.
  - **2 – 5 Min**: Secondary escalation risks & traffic bottleneck prevention.
  - **5 – 10 Min**: Medical triage window & rescue unit arrival stabilization.

### 🗺️ 4. Google Maps Live Response Nodes
- Interactive map embedding nearby emergency infrastructure:
  - 🏥 Level-1 Trauma Centers & Super Specialty Hospitals
  - 🚓 Central Control Police Hubs (112)
  - 🚑 108 Advanced Life Support Ambulances
  - ⛺ Civil Defense Relief Shelters

### 📢 5. Multilingual SOS Generator
- One-tap alert generator with single-click Copy, WhatsApp sharing, and SMS dispatch.
- Translates messages on the fly into **Hindi**, **Marathi**, **Gujarati**, **Tamil**, and **English**.

### 📊 6. Command Center Telemetry
- Real-time analytics dashboard displaying severity breakdowns, incident categories, and service dispatch metrics.

---

## 📷 Verified Emergency Demo Scenarios

### Scenario 1: Multi-Vehicle Intersection Collision
- **Input**: Red hatchback with severe side compression, white sedan, and downed motorcycle at a busy city intersection.
- **Output**: 🔴 HIGH / CRITICAL • 97% Confidence • 3 Vehicles • Cervical spine triage & traffic isolation protocol.

### Scenario 2: Severe Earthquake & Structural Collapse
- **Input**: 45° tilted residential buildings, collapsed tile roofs, downed utility lines, and debris-blocked street.
- **Output**: 🔴 CRITICAL • 98% Confidence • Urban Search & Rescue (USAR) acoustic probe directive.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aryan-sourcee/Google_X_JECRC.git
   cd Google_X_JECRC
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root:
   ```env
   VITE_GEMINI_API_KEY="your_gemini_api_key_here"
   VITE_GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
Google_X_JECRC/
├── src/
│   ├── assets/              # Emergency disaster & crash test images
│   ├── components/          # React views & UI components
│   │   ├── Header.tsx       # Google-styled main menu bar & status pills
│   │   ├── BottomNav.tsx    # Mobile navigation bar
│   │   ├── SplashView.tsx   # Hero landing screen & team credits
│   │   ├── HomeDashboardView.tsx # Responder control dashboard
│   │   ├── UploadView.tsx   # Drag & drop uploader + webcam camera modal
│   │   ├── ScanningOverlayView.tsx # 360° radar sweep & progress gauge
│   │   ├── ResultsView.tsx  # Emergency analysis & AI incident summary
│   │   ├── IncidentTimeline.tsx # Time-series forecasting cards
│   │   ├── MapServicesView.tsx  # Google Maps Live Embed
│   │   ├── SOSGeneratorView.tsx # Multilingual SOS alert box
│   │   ├── VoiceAssistantView.tsx # Web Speech audio guidance
│   │   ├── HistoryView.tsx  # Searchable emergency log history
│   │   ├── AnalyticsDashboardView.tsx # Recharts telemetry dashboard
│   │   └── LoginModal.tsx   # Team member profile switcher
│   ├── data/                # Sample incident presets & nearby services
│   ├── services/            # Gemini API & Web Speech services
│   │   ├── gemini.ts        # Gemini 2.0 Flash integration & prompt schema
│   │   └── speech.ts        # Web Speech synthesis module
│   ├── types/               # TypeScript interfaces & types
│   ├── App.tsx              # Main routing & application state
│   ├── index.css            # Design tokens & Tailwind CSS v4 setup
│   └── main.tsx             # Application entry point
├── AI_STUDIO_SHOWCASE.md   # Google AI Studio submission package & system prompt
├── README.md                # Project documentation
└── vite.config.ts           # Vite build configuration
```

---

## 📄 License & Acknowledgements

Built for the **Google Hackathon & Ecosystem Showcase**. Special thanks to Google AI Studio, the Gemini API team, and Google Maps Platform.

Developed by **Aryan Meena** and **Lakshaya Kumawat**.
