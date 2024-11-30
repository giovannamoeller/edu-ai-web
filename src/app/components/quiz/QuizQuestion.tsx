'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizQuestionProps {
  question: {
    question: string;
    alternatives: string[];
    answer: number;
  };
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer
}: QuizQuestionProps) {
  const progress = (questionNumber / totalQuestions) * 100;
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8"
      >
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {question.question + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary to-accent"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-8">{question.question}</h2>

          {/* Alternatives */}
          <div className="space-y-4">
            {question.alternatives.map((alternative, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(index)}
                className="w-full p-4 text-left rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
              >
                <span>{alternative}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}