'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { api } from '@/services/mock-api';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock, Award, BookOpen, Brain, Lightbulb } from 'lucide-react';

interface EssayDetailsPageProps {
  id: string;
}

export default function EssayDetailsPage({ id }: EssayDetailsPageProps) {
  const [essay, setEssay] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEssay = async () => {
      try {
        console.log(id)
        const data = await api.getEssayWithFeedback(id);
        setEssay(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load essay');
      } finally {
        setIsLoading(false);
      }
    };

    loadEssay();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
      </div>
    );
  }

  if (!essay) return null;

  if (essay.status === 'processing') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Essay is still being processed
          </h1>
          <p className="text-gray-600">
            Please check back in a few moments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {essay.subject}
        </h1>
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
        <Award className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-2">{essay.score}</h2>
        <p className="text-lg opacity-90">Total Score</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            General Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {essay.feedback?.generalFeedback}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(essay.feedback?.competencies || {}).map(([name, data]: [string, any], index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="h-[180px]"> {/* Set fixed height */}
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    {index % 2 === 0 ? <Brain className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                    {name}
                  </span>
                  <span className="text-xl font-bold">{data.score}/200</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-2"> {/* Limit to 2 lines of text */}
                  {data.feedback}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}