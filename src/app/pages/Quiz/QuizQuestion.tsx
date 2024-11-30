'use client';

import { Brain, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import QuizStart from './QuizStart';
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
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

        <div className="space-y-4">
          {question.alternatives.map((alternative, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(index)}
              className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
            >
              {alternative}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}