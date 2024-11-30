'use client';

import Image from "next/image";
import { useState } from "react";
import { Camera, Upload, Book, Home as HomeIcon, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types/Page';
import EssayList from "./pages/Essay/EssayList";
import Quiz from "./pages/Quiz/Quiz";
import Home from "./pages/Home/Home";

export default function App() {
  const [selectedTab, setSelectedTab] = useState<Page>(Page.Home);

  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} />, page: Page.Home },
    { id: 'essays', label: 'Essays', icon: <Book size={20} />, page: Page.Essays },
    //{ id: 'quiz', label: 'Quiz', icon: <Brain size={20} />, page: Page.Quiz }
  ];

  function renderPage(): JSX.Element {
    switch (selectedTab) {
      case Page.Home:
        return <Home/>;
      case Page.Essays:
        return <EssayList/>;
      case Page.Quiz:
        return <Quiz/>;
      default:
        return <Home/>;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header with floating animation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text select-none">
                EduAI
              </span>
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab(item.page)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === item.id
                      ? 'bg-blue-100 text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content with Page Transitions */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
