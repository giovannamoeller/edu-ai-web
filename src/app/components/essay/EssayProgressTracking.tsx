'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { api } from '@/services/api';
import Essay  from "@/types/Essay";

const StatCard = ({ title, value, icon, trend }: { 
  title: string; 
  value: number; 
  icon: React.ReactNode; 
  trend?: 'up' | 'down' 
}) => (
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

export default function EssayProgressTracking() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEssays = async () => {
      try {
        const data = await api.fetchEssays();
        // Filter only completed essays with scores
        setEssays(data.filter(essay => 
          essay.status === 'completed' && typeof essay.score === 'number'
        ));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load essays');
      } finally {
        setIsLoading(false);
      }
    };

    loadEssays();
  }, []);

  const stats = useMemo(() => {
    if (essays.length === 0) {
      return { highest: 0, lowest: 0, average: 0, totalEssays: 0 };
    }

    const scores = essays.map(essay => essay.score || 0);
    return {
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
      average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      totalEssays: scores.length
    };
  }, [essays]);

  const chartData = useMemo(() => {
    return essays.map(essay => ({
      date: essay.createdAt,
      score: essay.score || 0,
      subject: essay.subject
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [essays]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (essays.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No completed essays found. Submit some essays to see your progress!</p>
      </div>
    );
  }

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
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date: string) => new Date(date).toLocaleDateString()}
                />
                <YAxis domain={[0, 1000]} />
                <Tooltip
                  labelFormatter={(label: string) => new Date(label).toLocaleDateString()}
                  formatter={(value: number) => [`Score: ${value}`, '']}
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
            {chartData.map((essay, index) => (
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