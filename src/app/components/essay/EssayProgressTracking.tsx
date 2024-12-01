'use client';

import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function EssayProgressTracking() {
  const essays = [
    { date: '2024-01-15', score: 850, subject: 'The Great Gatsby' },
    { date: '2024-02-01', score: 920, subject: 'To Kill a Mockingbird' },
    { date: '2024-02-15', score: 780, subject: '1984' },
    { date: '2024-03-01', score: 640, subject: 'Pride and Prejudice' }
  ];

  const stats = useMemo(() => {
    const scores = essays.map(essay => essay.score);
    return {
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
      average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      totalEssays: scores.length
    };
  }, [essays]);

  const StatCard = ({ title, value, icon, trend }: { title: string; value: number; icon: React.ReactNode; trend?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && <p className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '+' : '-'}5% from last month
          </p>}
        </div>
        <div className={`p-3 rounded-full ${
          trend === 'up' ? 'bg-green-100 text-green-600' :
          trend === 'down' ? 'bg-red-100 text-red-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-indigo-500">
          Progress Tracking
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Monitor your essay performance and improvement over time
        </p>
      </motion.section>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard 
          title="Highest Score" 
          value={stats.highest} 
          icon={<TrendingUp className="w-6 h-6" />}
          trend="up"
        />
        <StatCard 
          title="Average Score" 
          value={stats.average} 
          icon={<BarChart2 className="w-6 h-6" />}
        />
        <StatCard 
          title="Lowest Score" 
          value={stats.lowest} 
          icon={<TrendingDown className="w-6 h-6" />}
          trend="down"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Score Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={essays}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date: string) => new Date(date).toLocaleDateString()}
                />
                <YAxis domain={[0, 1000]} />
                <Tooltip
                  labelFormatter={(label: string) => new Date(label).toLocaleDateString()}
                  formatter={(value: string, name: string) => [value, 'Score']}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{
                    stroke: '#6366f1',
                    strokeWidth: 2,
                    r: 4,
                    fill: 'white'
                  }}
                  activeDot={{
                    r: 6,
                    stroke: '#6366f1',
                    strokeWidth: 2,
                    fill: '#6366f1'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Essay History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {essays.map((essay, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{essay.subject}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(essay.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-lg font-semibold">{essay.score}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}