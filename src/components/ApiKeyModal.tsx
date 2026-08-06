import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(tempKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
              <Key className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Google AI Studio API Key</h2>
              <p className="text-xs text-slate-400">Plug in your key to enable live Gemini Vision analysis.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">Enter Gemini API Key:</label>
            <input
              type="text"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Don't have a key?</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 font-semibold text-blue-400 hover:underline"
              >
                <span>Get API Key from Google AI Studio</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
            >
              {saved ? <Check className="h-4 w-4 text-emerald-300" /> : <Sparkles className="h-4 w-4" />}
              <span>{saved ? 'Saved!' : 'Save & Activate'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
