'use client';

import { RotateCcw, CheckCircle, X } from 'lucide-react';
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
  
  //const percentage = (score / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Score Summary */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent mx-auto flex items-center justify-center"
          >
            <span className="text-4xl font-bold text-white">{Math.round(score)}%</span>
          </motion.div>
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <p className="text-gray-600">
            You got {score} out of {questions.length} questions correct
          </p>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`h-2 ${
                answers[index] === question.answer
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`} />
              <div className="p-6">
                <h3 className="font-semibold mb-4">{question.question}</h3>
                <div className="space-y-2">
                  {question.alternatives.map((alternative, altIndex) => (
                    <div
                      key={altIndex}
                      className={`p-3 rounded-lg flex justify-between items-center ${
                        altIndex === question.answer
                          ? 'bg-green-100 text-green-800'
                          : altIndex === answers[index]
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-50'
                      }`}
                    >
                      <span>{alternative}</span>
                      {altIndex === question.answer ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : altIndex === answers[index] ? (
                        <X className="w-5 h-5 text-red-600" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="mx-auto flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Try Another Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}