'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Home as HomeIcon, Book } from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} />, href: '/' },
    { id: 'essays', label: 'Essays', icon: <Book size={20} />, href: '/essays' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center">
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text select-none">
                  EduAI
                </span>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <Link 
                  key={item.id} 
                  href={item.href}
                  className="flex items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'font-semibold text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}