'use client';

import { useState } from 'react';
import { Brain, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizStartProps {
  onStart: (subject: string) => void;
}

export default function QuizStart({ onStart }: QuizStartProps) {
  const [subject, setSubject] = useState('');

  return (
    <div className="max-w-2xl mx-auto text-center">
      <Brain className="w-16 h-16 mx-auto mb-6 text-blue-500" />
      <h2 className="text-2xl font-bold mb-4">Test Your Knowledge</h2>
      <p className="text-gray-600 mb-8">
        Practice with questions on your chosen subject
      </p>
      
      <div className="mb-6">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Enter subject (e.g., World History, Mathematics)"
        />
      </div>

      <button
        onClick={() => onStart(subject)}
        disabled={!subject.trim()}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 flex items-center gap-2 mx-auto"
      >
        Start Quiz
        <ArrowRight size={20} />
      </button>
    </div>
  );
}