'use client';

import MainLayout from '@/app/components/layout/MainLayout';
import { Upload, Book, LineChart } from 'lucide-react';

import HomeFeatureCard from "@/types/HomeFeatureCard";
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  const cards: HomeFeatureCard[] = [
    {
      title: 'Submit an Essay',
      description: 'Get feedback and scoring on your writing',
      icon: <Upload className="w-12 h-12 text-white" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: 'Previous Essays',
      description: 'Review all your submitted essays',
      icon: <Book className="w-12 h-12 text-white" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time',
      icon: <LineChart className="w-12 h-12 text-white" />,
      color: "from-lime-500 to-green-500"
    },
    /*{
      title: 'Practice Quiz',
      description: 'Test your knowledge on various topics',
      icon: <Brain className="w-12 h-12 text-white" />,
      color: "from-green-500 to-yellow-500"
    }*/
  ];

  return (
    <MainLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 mt-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Prepare for success
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your writing skills with our AI-powered learning platform.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/essays')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg"
          >
            Start Practicing Now
          </motion.button>
        </motion.section>

        {/* Features Grid */}
        <section className="w-full mx-auto grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className={`h-40 bg-gradient-to-r ${card.color} flex justify-center items-center drop-shadow-xl`}>
                {card.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Stats Section */}
        {/*<motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-8 bg-white p-8 rounded-2xl shadow-lg"
        >
          {[
            { label: "Students", value: "10,000+" },
            { label: "Essays Reviewed", value: "50,000+" },
            { label: "Success Rate", value: "95%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.section>*/}
      </div>
    </MainLayout>
  );
}