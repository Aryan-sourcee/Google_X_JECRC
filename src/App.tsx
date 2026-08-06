import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashView } from './components/SplashView';
import { LoginModal } from './components/LoginModal';
import { HomeDashboardView } from './components/HomeDashboardView';
import { UploadView } from './components/UploadView';
import { ScanningOverlayView } from './components/ScanningOverlayView';
import { ResultsView } from './components/ResultsView';
import { MapServicesView } from './components/MapServicesView';
import { SOSGeneratorView } from './components/SOSGeneratorView';
import { VoiceAssistantView } from './components/VoiceAssistantView';
import { HistoryView } from './components/HistoryView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { SettingsView } from './components/SettingsView';
import { ApiKeyModal } from './components/ApiKeyModal';

import { INITIAL_INCIDENTS_HISTORY, PRESET_EMERGENCIES } from './data/mockData';
import type { EmergencyAnalysis, IncidentRecord } from './types/Emergency';
import { analyzeEmergencyImageWithGemini, fileToBase64 } from './services/gemini';
import { speechService } from './services/speech';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('splash');
  const [user, setUser] = useState<{ name: string; email: string; role?: string } | null>({
    name: 'Aryan Meena',
    email: 'aryan.meena@crisismind.ai',
    role: 'Lead Developer',
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(import.meta.env.VITE_GEMINI_API_KEY || '');

  // Active Emergency State
  const [currentAnalysis, setCurrentAnalysis] = useState<EmergencyAnalysis>(
    PRESET_EMERGENCIES[0].mockData
  );
  const [incidentsHistory, setIncidentsHistory] = useState<IncidentRecord[]>(INITIAL_INCIDENTS_HISTORY);
  const [scanningImagePreview, setScanningImagePreview] = useState<string | undefined>(undefined);
  const [isScanningReady, setIsScanningReady] = useState<boolean>(true);

  // Handlers
  const handleSelectPreset = async (presetId: string) => {
    const preset = PRESET_EMERGENCIES.find((p) => p.id === presetId);
    if (preset) {
      setIsScanningReady(false);
      setScanningImagePreview(preset.imageUrl);
      setActiveTab('scanning');

      await new Promise((r) => setTimeout(r, 1200));
      setCurrentAnalysis(preset.mockData);
      setIsScanningReady(true);
    }
  };

  const handleAnalyzeFile = async (file: File) => {
    try {
      const preview = URL.createObjectURL(file);
      setIsScanningReady(false);
      setScanningImagePreview(preview);
      setActiveTab('scanning');

      const base64 = await fileToBase64(file);
      const analysis = await analyzeEmergencyImageWithGemini(base64, file.type, apiKey);

      setCurrentAnalysis(analysis);

      // Add to incident history
      setIncidentsHistory((prev) => [analysis as IncidentRecord, ...prev]);
      setIsScanningReady(true);
    } catch (err) {
      console.error('File analysis error:', err);
      setIsScanningReady(true);
    }
  };

  const handleScanComplete = () => {
    setActiveTab('results');
  };

  const handleSelectIncidentFromHistory = (incident: IncidentRecord) => {
    setCurrentAnalysis(incident);
    setActiveTab('results');
  };

  const handlePlayVoiceGuidance = () => {
    setActiveTab('voice');
    const speechText = `Emergency alert for ${currentAnalysis.title}. Severity level is ${currentAnalysis.severity}. ${currentAnalysis.peopleDetected} occupants detected. Immediate action required: ${currentAnalysis.immediateActions[0]}. Nearest trauma hospital is 1.2 kilometers away.`;
    speechService.speak(speechText);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans flex flex-col selection:bg-blue-500 selection:text-white pb-20 md:pb-8">
      {/* Header Navigation */}
      {activeTab !== 'splash' && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          hasApiKey={!!apiKey}
          user={user}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'splash' && (
          <SplashView
            onStart={() => setActiveTab('home')}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'home' && (
          <HomeDashboardView
            userName={user?.name.split(' ')[0] || 'Responder'}
            onNavigateToUpload={() => setActiveTab('upload')}
            onSelectPreset={handleSelectPreset}
            recentIncidents={incidentsHistory}
            onSelectIncident={handleSelectIncidentFromHistory}
          />
        )}

        {activeTab === 'upload' && (
          <UploadView
            onAnalyzeFile={handleAnalyzeFile}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'scanning' && (
          <ScanningOverlayView
            imagePreviewUrl={scanningImagePreview}
            isReady={isScanningReady}
            onScanComplete={handleScanComplete}
          />
        )}

        {activeTab === 'results' && (
          <ResultsView
            analysis={currentAnalysis}
            onNavigateToMap={() => setActiveTab('map')}
            onNavigateToSOS={() => setActiveTab('sos')}
            onPlayVoice={handlePlayVoiceGuidance}
            onScanNew={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'map' && (
          <MapServicesView locationName={currentAnalysis.locationName} />
        )}

        {activeTab === 'sos' && (
          <SOSGeneratorView analysis={currentAnalysis} apiKey={apiKey} />
        )}

        {activeTab === 'voice' && (
          <VoiceAssistantView analysis={currentAnalysis} />
        )}

        {activeTab === 'history' && (
          <HistoryView
            incidents={incidentsHistory}
            onSelectIncident={handleSelectIncidentFromHistory}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsDashboardView />}

        {activeTab === 'settings' && (
          <SettingsView
            apiKey={apiKey}
            onSaveApiKey={(key) => setApiKey(key)}
          />
        )}
      </main>

      {/* Bottom Mobile Nav */}
      {activeTab !== 'splash' && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Login & Auth Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          setIsLoginOpen(false);
        }}
      />

      {/* API Key Modal Drawer */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(key) => setApiKey(key)}
      />
    </div>
  );
}
