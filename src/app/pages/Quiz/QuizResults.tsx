'use client';

import { Brain, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface QuizResultsProps {
  questions: {
    question: string;
    alternatives: string[];
    answer: number;
  }[];
  answers: number[];
  onReset: () => void;
}

export default function QuizResults({
  questions,
  answers,
  onReset
}: QuizResultsProps) {
  const score = questions.reduce((acc, question, index) => 
    question.answer === answers[index] ? acc + 1 : acc, 0
  );
  
  const percentage = (score / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <div className="text-5xl font-bold text-primary mb-2">
          {score}/{questions.length}
        </div>
        <p className="text-gray-600">
          You got {percentage}% of the questions right!
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              question.answer === answers[index]
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <h4 className="font-semibold mb-2">{question.question}</h4>
            <div className="space-y-2">
              {question.alternatives.map((alternative, altIndex) => (
                <div
                  key={altIndex}
                  className={`p-2 rounded ${
                    altIndex === question.answer
                      ? 'bg-green-100 text-green-800'
                      : altIndex === answers[index]
                      ? 'bg-red-100 text-red-800'
                      : 'bg-white'
                  }`}
                >
                  {alternative}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mx-auto flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Try Another Quiz
        <RotateCcw className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}