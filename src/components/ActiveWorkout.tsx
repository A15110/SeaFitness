import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorkoutTimer from './WorkoutTimer';
import ExerciseDemo from './ExerciseDemo';
import { useUserStore } from '../store/userStore';

interface ActiveWorkoutProps {
  exercises: Array<{
    name: string;
    duration: number;
    icon: React.ComponentType;
  }>;
  onComplete: () => void;
}

const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ exercises, onComplete }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { addWorkout } = useUserStore();
  
  const handleExerciseComplete = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      const workout = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        duration: exercises.reduce((total, ex) => total + ex.duration, 0),
        exercises: exercises.map(ex => ({
          name: ex.name,
          duration: ex.duration,
          completed: true
        })),
        caloriesBurned: Math.floor(Math.random() * 200) + 100 // Simplified calorie calculation
      };
      addWorkout(workout);
      onComplete();
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Exercise {currentExerciseIndex + 1} of {exercises.length}
        </h2>
        <div className="h-1 bg-white/20 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <WorkoutTimer
          duration={currentExercise.duration}
          onComplete={handleExerciseComplete}
          exerciseName={currentExercise.name}
        />
        <ExerciseDemo exercise={{ name: currentExercise.name }} />
      </div>
    </motion.div>
  );
};

export default ActiveWorkout;