import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Anchor, Ship, Wind, Timer, Dumbbell } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { useUserStore } from '../store/userStore';
import ActiveWorkout from '../components/ActiveWorkout';

const WorkoutGenerator = () => {
  const { level, goal, duration, setLevel, setGoal, setDuration } = useWorkoutStore();
  const { currentUser } = useUserStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [generatedExercises, setGeneratedExercises] = useState<any[]>([]);
  
  const exercises = {
    beginner: [
      { name: 'Bow-to-Stern Walks', duration: 30, icon: Ship },
      { name: 'Port-Side Planks', duration: 20, icon: Anchor },
      { name: 'Starboard Stretches', duration: 30, icon: Wind },
      { name: 'Deck Chair Dips', duration: 25, icon: Anchor },
      { name: 'Hull Balance Walk', duration: 35, icon: Ship },
      { name: 'Anchor Line Pulls', duration: 30, icon: Anchor }
    ],
    intermediate: [
      { name: 'Mast Climber Squats', duration: 40, icon: Ship },
      { name: 'Deck Push-Ups', duration: 30, icon: Anchor },
      { name: 'Hull-Side Lunges', duration: 40, icon: Wind },
      { name: 'Winch Rotations', duration: 35, icon: Anchor },
      { name: 'Boom Step-Ups', duration: 45, icon: Ship },
      { name: 'Sailing Burpees', duration: 40, icon: Wind }
    ],
    advanced: [
      { name: 'Sea Unt Burpees', duration: 45, icon: Ship },
      { name: 'Anchor Line Climbs', duration: 40, icon: Anchor },
      { name: 'Storm-Ready Jumps', duration: 45, icon: Wind },
      { name: 'Mast Pull-Ups', duration: 40, icon: Ship },
      { name: 'Wave Rider Planks', duration: 50, icon: Anchor },
      { name: 'Captain\'s Deck Sprint', duration: 45, icon: Wind }
    ],
  };

  const generateWorkout = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Select 4 random exercises from the level
      const levelExercises = exercises[level];
      const shuffled = [...levelExercises].sort(() => 0.5 - Math.random());
      setGeneratedExercises(shuffled.slice(0, 4));
      setIsGenerating(false);
    }, 1500);
  };

  const startWorkout = () => {
    setWorkoutStarted(true);
  };

  const handleWorkoutComplete = () => {
    setWorkoutStarted(false);
    setGeneratedExercises([]);
  };

  if (!currentUser) {
    return (
      <div className="text-white text-center py-12">
        Please log in to generate workouts.
      </div>
    );
  }

  if (workoutStarted) {
    return (
      <ActiveWorkout
        exercises={generatedExercises}
        onComplete={handleWorkoutComplete}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Sea Unt Workout Generator</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Fitness Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              <option value="beginner">Beginner Sailor</option>
              <option value="intermediate">Seasoned Mariner</option>
              <option value="advanced">Captain's Level</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Workout Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              <option value="weightLoss">Weight Loss</option>
              <option value="strength">Strength Building</option>
              <option value="endurance">Sea Legs Endurance</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Duration (minutes)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              <option value={10}>10 minutes</option>
              <option value={20}>20 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateWorkout}
          disabled={isGenerating}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <Timer className="animate-spin mr-2" />
              Charting Your Course...
            </span>
          ) : (
            'Generate Workout'
          )}
        </button>
      </motion.div>

      {generatedExercises.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Sea Unt Workout</h2>
          <div className="space-y-6">
            {generatedExercises.map((exercise, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 text-white bg-white/5 p-4 rounded-lg"
              >
                <exercise.icon className="h-6 w-6" />
                <span className="flex-1">{exercise.name}</span>
                <span>{exercise.duration}s</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={startWorkout}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Start Workout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WorkoutGenerator;