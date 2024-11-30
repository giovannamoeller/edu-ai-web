import { Camera, Upload, Book, Brain, LineChart } from 'lucide-react';

import HomeFeatureCard from "@/app/types/HomeFeatureCard";
import { motion } from "motion/react";

export default function Home() {
  const cards: HomeFeatureCard[] = [
    {
      title: 'Submit an Essay',
      description: 'Get feedback and scoring on your writing',
      icon: <Upload className="w-8 h-8" />,
      action: '/quiz'
    },
    {
      title: 'Previous Essays',
      description: 'Review all your submitted essays',
      icon: <Book className="w-8 h-8" />,
      action: 'essays'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time',
      icon: <LineChart className="w-8 h-8" />,
      action: 'essays'
    },
    {
      title: 'Practice Quiz',
      description: 'Test your knowledge on various topics',
      icon: <Brain className="w-8 h-8" />,
      action: 'quiz'
    }
  ];
  
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Prepare for ENEM</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Start
                </button>
              </div>
              <div className="ml-4 text-blue-500">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <motion.div>
        <img src="/images/students-01.png" alt="Main picture" className="w-1/3 mx-auto my-8" />
      </motion.div>
    </div>
  );
}