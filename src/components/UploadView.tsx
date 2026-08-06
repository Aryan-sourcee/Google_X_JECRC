import React, { useState, useRef } from 'react';
import { Upload, Camera, FileImage, Sparkles, AlertCircle, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRESET_EMERGENCIES } from '../data/mockData';

interface UploadViewProps {
  onAnalyzeFile: (file: File) => void;
  onSelectPreset: (presetId: string) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onAnalyzeFile, onSelectPreset }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

  // Live Camera WebCam Trigger
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('Unable to access device camera. Please allow camera permissions or upload an image file.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], `camera-emergency-${Date.now()}.jpg`, { type: 'image/jpeg' });
            setSelectedFile(capturedFile);
            setPreviewUrl(URL.createObjectURL(capturedFile));
            stopCamera();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header text */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Upload Emergency Scene</h1>
        <p className="mt-2 text-sm text-slate-300">
          Provide a real photo from your device or camera. Gemini Vision AI will analyze hazards and compute a 10-second rescue directive.
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
              <p className="text-xs text-slate-400 mt-1">or click below to browse files or use camera</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500"
              >
                Browse Files
              </button>
              <button
                onClick={startCamera}
                className="flex items-center space-x-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-4 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white"
              >
                <Camera className="h-4 w-4" />
                <span>Take Real Photo with Camera</span>
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
            <span>Analyze Real Image with Gemini API</span>
          </button>
        </motion.div>
      )}

      {/* Live Camera Snapshot Modal */}
      <AnimatePresence>
        {isCameraActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={stopCamera}
                className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Camera className="h-4 w-4 animate-pulse" />
                <span>Live Device Camera Capture</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 h-80 flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover rounded-2xl" />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={stopCamera}
                  className="rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500"
                >
                  <Check className="h-4 w-4" />
                  <span>Capture Snapshot</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Presets Fallback Box */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5 mb-3">
          <AlertCircle className="h-4 w-4 text-blue-400" />
          <span>Or test with pre-crafted real emergency scenario photos:</span>
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
