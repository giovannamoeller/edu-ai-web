'use client';

import { useState } from "react"; 
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import EssayUpload from "./EssayUpload";
import EssayHistory from "./EssayHistory";

export default function Essay() {
  const [activeView, setActiveView] = useState('history');

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Essays</h2>
        <button
          onClick={() => setActiveView('upload')}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Upload size={20} />
          New Essay
        </button>
      </div>

      {activeView === 'history' ? (
        <EssayHistory />
      ) : (
        <EssayUpload onClose={() => setActiveView('history')} />
      )}
    </div>
  );
}