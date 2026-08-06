import React, { useState, useRef } from 'react';
import { Upload, Camera, FileImage, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRESET_EMERGENCIES } from '../data/mockData';

interface UploadViewProps {
  onAnalyzeFile: (file: File) => void;
  onSelectPreset: (presetId: string) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onAnalyzeFile, onSelectPreset }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onAnalyzeFile(selectedFile);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header text */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Upload Emergency Scene</h1>
        <p className="mt-2 text-sm text-slate-300">
          Provide a photo from your device or camera. Gemini Vision AI will analyze hazards and compute a 10-second rescue directive.
        </p>
      </div>

      {/* Main Upload Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : selectedFile
            ? 'border-emerald-500/50 bg-slate-900/80'
            : 'border-white/15 bg-slate-900/50 hover:border-blue-500/40 hover:bg-slate-900/80'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
        />

        {previewUrl ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative max-h-72 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img src={previewUrl} alt="Selected Emergency Scene" className="max-h-72 object-contain rounded-2xl" />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-slate-300 backdrop-blur-md hover:bg-red-600 hover:text-white"
              >
                Change Photo
              </button>
            </div>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <FileImage className="h-4 w-4" />
              <span>{selectedFile?.name} ({Math.round((selectedFile?.size || 0) / 1024)} KB)</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Upload className="h-10 w-10 animate-pulse" />
            </div>

            <div>
              <p className="text-base font-bold text-white">Drag & drop emergency photo here</p>
              <p className="text-xs text-slate-400 mt-1">or click below to browse files from your computer</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500"
              >
                Browse Files
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                <Camera className="h-4 w-4 text-indigo-400" />
                <span>Use Camera</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500">Supported Formats: JPG, PNG, JPEG (Max 15MB)</p>
          </div>
        )}
      </motion.div>

      {/* Action Button */}
      {selectedFile && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
          <button
            onClick={handleAnalyzeClick}
            className="flex items-center space-x-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            <span>Analyze Emergency Scene with Gemini</span>
          </button>
        </motion.div>
      )}

      {/* Presets Fallback Box */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5 mb-3">
          <AlertCircle className="h-4 w-4 text-blue-400" />
          <span>Don't have a photo? Select a sample emergency scenario:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_EMERGENCIES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className="flex items-center space-x-3 rounded-xl border border-white/5 bg-slate-950/60 p-2.5 text-left transition hover:border-blue-500/30 hover:bg-slate-800/80"
            >
              <img src={preset.imageUrl} alt={preset.title} className="h-10 w-10 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-bold text-white line-clamp-1">{preset.title}</p>
                <p className="text-[10px] text-slate-400">{preset.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
