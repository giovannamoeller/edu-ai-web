'use client';

import Image from "next/image";
import { useState } from "react";
import { Camera, Upload, Book, Home as HomeIcon, Brain } from 'lucide-react';
import { Page } from './types/Page';
import Essay from "./pages/Essay/Essay";
import Quiz from "./pages/Quiz/Quiz";
import Home from "./pages/Home/Home";

export default function App() {
  const [selectedTab, setSelectedTab] = useState<Page>(Page.Home);

  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} />, page: Page.Home },
    { id: 'essays', label: 'Essays', icon: <Book size={20} />, page: Page.Essays },
    { id: 'quiz', label: 'Quiz', icon: <Brain size={20} />, page: Page.Quiz }
  ];

  function renderPage(): JSX.Element {
    switch (selectedTab) {
      case Page.Home:
        return <Home/>;
      case Page.Essays:
        return <Essay/>;
      case Page.Quiz:
        return <Quiz/>;
      default:
        return <Home/>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">EduAI</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setSelectedTab(item.page)}
                    className={`${selectedTab === item.id
                                  ? 'border-blue-500 text-gray-900'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium gap-2`}>
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>        
    </div>
  );
};
