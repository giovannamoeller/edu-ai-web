'use client';

import { useState } from "react"; 
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import Essay from "../../types/Essay";

interface EssayUploadProps {  
  onClose: () => void;
}

export default function EssayUpload({ onClose }: EssayUploadProps) {
  const [subject, setSubject] = useState<string>('');
  const [file, setFile] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  function handleEssayFileUpload() {
    
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Upload Essay</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter essay subject"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Essay File
        </label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            onChange={(e) => setFile('file.name')}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          >
            <Upload className="mx-auto mb-2" />
            <span>Click to upload or drag and drop</span>
          </label>
          {file && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {file}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleEssayFileUpload}
          disabled={!file || !subject || uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload Essay'}
        </button>
      </div>
    </div>
  );
}