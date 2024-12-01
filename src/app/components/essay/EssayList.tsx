'use client';

import { Upload, ArrowRight, CheckCircle, Clock, ChartArea } from 'lucide-react';
import { motion } from "motion/react";
import Essay from "../../../types/Essay";
import { useRouter } from 'next/navigation';

export default function EssayList() {
  const router = useRouter();

  const essays:Essay[] = [
    {
      id: '1',
      subject: 'The Great Gatsby',
      status: 'completed',
      createdAt: new Date(),
      score: 850
    },
    {
      id: '2',
      subject: 'The Catcher in the Rye',
      status: 'processing',
      createdAt: new Date(),
    },
    {
      id: '3',
      subject: 'To Kill a Mockingbird',
      status: 'completed',
      createdAt: new Date(),
      score: 920
    },
    {
      id: '4',
      subject: '1984',
      status: 'completed',
      createdAt: new Date(),
      score: 780
    },
    {
      id: '5',
      subject: 'Pride and Prejudice',
      status: 'completed',
      createdAt: new Date(),
      score: 640
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          My Essays
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your progress and review your submissions
        </p>
        <div className=''>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/essays/upload')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2 mx-auto my-4"
          >
            <Upload className="w-5 h-5" />
            Submit new essay
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/essays/evolution')}
            className="bg-white text-indigo-500 px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2 mx-auto"
          >
            <ChartArea className="w-5 h-5" />
            View my progress
          </motion.button>
        </div>
      </motion.section>

      {/* Essays Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        {essays.map((essay, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className={`h-2 ${essay.status === 'completed' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500'
            }`} />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{essay.subject}</h3>
                  <p className="text-gray-500 text-sm">
                    Submitted on {new Date(essay.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {essay.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-2xl font-bold">{essay.score}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-500">
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>Processing</span>
                  </div>
                )}
              </div>
              
              {essay.status === 'completed' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {} }
                  className="w-full mt-4 px-4 py-2 bg-background rounded-lg hover:bg-background/80 transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}