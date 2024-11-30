'use client';

import { useState } from "react"; 
import { Check } from 'lucide-react';

export default function EssayHistory() {
  const [essays, setEssays] = useState([
    {
      id: 1,
      subject: 'Climate Change',
      totalScore: 950,
      status: 'completed',
      feedback: {
        competencia1Grade: 180,
        competencia2Grade: 200,
        competencia3Grade: 180,
        competencia4Grade: 190,
        competencia5Grade: 200,
      }
    },
    {
      id: 2,
      subject: 'Technology Impact',
      status: 'processing'
    }
  ]);

  return (
    <div className="space-y-4">
      {essays.map((essay) => (
        <div
          key={essay.id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {essay.id} - {essay.subject}
              </h3>
              {essay.status === 'completed' ? (
                <div className="text-green-600 flex items-center gap-2">
                  <Check size={16} />
                  <span>Score: {essay.totalScore}</span>
                </div>
              ) : (
                <div className="text-blue-500 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
            
            {essay.status === 'completed' && (
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors">
                View Details
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}