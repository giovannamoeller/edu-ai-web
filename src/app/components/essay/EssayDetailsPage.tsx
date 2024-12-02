'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import Essay from '@/types/Essay';

interface EssayDetailsPageProps {
  essay: Essay;
  onClose: () => void;
}

export default function EssayDetailsPage({ essay, onClose }: EssayDetailsPageProps) {
  console.log(essay)
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <button 
        onClick={() => onClose()}
        className="flex items-center gap-2 text-indigo-500 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4 text-indigo-500" /> Back to essays
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-gray-800">{essay.subject}</h1>
        <p className="text-gray-600">
          Submitted on {new Date(essay.createdAt).toLocaleDateString()}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-4xl font-bold mb-2">{essay.totalScore}</h2>
        <p className="text-lg opacity-90">Total Score</p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <Card key={num}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span className='text-lg'>Competency {num}</span>
                <span className='text-indigo-500 font-bold'>{essay.feedback[`competencia_${num}_grade` as keyof typeof essay.feedback]}/200</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {essay.feedback[`competencia_${num}_feedback` as keyof typeof essay.feedback]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}