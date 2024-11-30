'use client';

import { useState } from 'react';
import { Brain, ArrowRight, Book } from 'lucide-react';

import { motion } from 'motion/react';

interface QuizStartProps {
  onStart: (subject: string) => void;
}

export default function QuizStart({ onStart }: QuizStartProps) {
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8 flex items-center justify-center"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Test Your Knowledge
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Challenge yourself with personalized quizzes on any topic
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto space-y-6 mt-8"
        >
          <div className="relative">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-6 py-4 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Enter subject (e.g., World History)"
              disabled={isLoading}
            />
            <Book className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!subject.trim() || isLoading}
            className={`w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-semibold text-lg shadow-lg 
              ${(!subject.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Quiz...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Start Quiz
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}