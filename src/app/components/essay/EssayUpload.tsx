'use client';

import { useState } from "react"; 
import { Upload, CheckCircle } from 'lucide-react';
import { motion } from "motion/react";
import { api } from "@/services/api";

interface EssayUploadProps {  
  onClose: () => void;
}

export default function EssayUpload({ onClose }: EssayUploadProps) {
  const [subject, setSubject] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEssayFileUpload() {
    if (!file || !subject) return;
    
    setIsLoading(true);
    setError(null);

    try {
      await api.uploadEssay(file, subject);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload essay');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Submit Your Essay
        </h1>
        <p className="text-xl text-gray-600">
          Get instant feedback and improve your writing
        </p>
      </motion.section>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="space-y-6">
          {/* Subject Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Essay Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Enter the main topic of your essay"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Essay
            </label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {file ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="text-green-600 font-medium">{file.name}</p>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile) setFile(droppedFile);
                  }}
                  className="space-y-4"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-600">
                    Drag and drop your file here, or{' '}
                    <button
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="text-indigo-400 font-semibold hover:text-accent"
                    >
                      browse
                    </button>
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!subject || !file || isLoading}
            onClick={handleEssayFileUpload}
            className={`w-full py-3 rounded-lg font-semibold text-white
              ${!subject || !file
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              'Submit Essay'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}