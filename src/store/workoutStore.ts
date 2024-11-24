import { create } from 'zustand';

type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';
type WorkoutGoal = 'weightLoss' | 'strength' | 'endurance';

interface WorkoutState {
  level: WorkoutLevel;
  goal: WorkoutGoal;
  duration: number;
  setLevel: (level: WorkoutLevel) => void;
  setGoal: (goal: WorkoutGoal) => void;
  setDuration: (duration: number) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  level: 'beginner',
  goal: 'strength',
  duration: 20,
  setLevel: (level) => set({ level }),
  setGoal: (goal) => set({ goal }),
  setDuration: (duration) => set({ duration }),
}));