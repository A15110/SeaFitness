import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Timer } from 'lucide-react';
import useSound from 'use-sound';

interface WorkoutTimerProps {
  duration: number;
  onComplete: () => void;
  exerciseName: string;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ duration, onComplete, exerciseName }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [playBeep] = useSound('/sounds/beep.mp3');
  const [playComplete] = useSound('/sounds/complete.mp3');

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 4 && time > 0) playBeep();
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      playComplete();
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete, playBeep, playComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const skipExercise = () => {
    setTimeLeft(0);
    onComplete();
  };

  return (
    <div className="bg-white/10 rounded-xl p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">{exerciseName}</h3>
      <div className="flex items-center justify-center space-x-6">
        <div className="text-4xl font-bold">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <button
            onClick={skipExercise}
            className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors"
          >
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default WorkoutTimer;