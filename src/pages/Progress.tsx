import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useUserStore } from '../store/userStore';
import { Trophy, TrendingUp, Scale, Calendar } from 'lucide-react';

const Progress = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="text-white text-center py-12">
        Please log in to view your progress.
      </div>
    );
  }

  const recentWorkouts = currentUser.workouts.slice(-7).map(workout => ({
    date: format(new Date(workout.date), 'MMM d'),
    calories: workout.caloriesBurned
  }));

  const recentMeasurements = currentUser.measurements.slice(-7).map(measurement => ({
    date: format(new Date(measurement.date), 'MMM d'),
    weight: measurement.weight
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          {currentUser.name}'s Fitness Journey
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Workout Stats */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              Workout Progress
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentWorkouts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weight Progress */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Scale className="h-6 w-6 mr-2" />
              Weight Progress
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentMeasurements}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {currentUser.workouts.slice(-5).reverse().map((workout, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-medium">
                  {format(new Date(workout.date), 'MMMM d, yyyy')}
                </div>
                <div className="text-blue-200">
                  {workout.exercises.length} exercises • {workout.duration} minutes
                </div>
              </div>
              <div className="text-green-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {workout.caloriesBurned} cal
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Progress;