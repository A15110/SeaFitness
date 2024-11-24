import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, subDays } from 'date-fns';

export interface User {
  email: string;
  name: string;
  workouts: Workout[];
  measurements: Measurement[];
}

export interface Workout {
  id: string;
  date: string;
  duration: number;
  exercises: Exercise[];
  caloriesBurned: number;
}

export interface Exercise {
  name: string;
  duration: number;
  completed: boolean;
}

export interface Measurement {
  date: string;
  weight: number;
  chest?: number;
  waist?: number;
  hips?: number;
}

const generatePastWorkouts = (daysBack: number, intensity: 'high' | 'medium' | 'low'): Workout[] => {
  return Array.from({ length: daysBack }, (_, i) => ({
    id: `past-${i}`,
    date: subDays(new Date(), i).toISOString(),
    duration: intensity === 'high' ? 45 : intensity === 'medium' ? 30 : 20,
    exercises: [
      { name: 'Bow-to-Stern Walks', duration: 30, completed: true },
      { name: 'Port-Side Planks', duration: 30, completed: true },
      { name: 'Mast Climber Squats', duration: 40, completed: true }
    ],
    caloriesBurned: intensity === 'high' ? 300 : intensity === 'medium' ? 200 : 150
  }));
};

const defaultUsers: User[] = [
  {
    email: 'dixonjd1982@gmail.com',
    name: 'Josh',
    workouts: generatePastWorkouts(14, 'high'),
    measurements: [
      { date: subDays(new Date(), 14).toISOString(), weight: 185 },
      { date: subDays(new Date(), 7).toISOString(), weight: 183 },
      { date: new Date().toISOString(), weight: 181 }
    ]
  },
  {
    email: 'KBZ916@gmail.com',
    name: 'Keely',
    workouts: generatePastWorkouts(14, 'medium'),
    measurements: [
      { date: subDays(new Date(), 14).toISOString(), weight: 145 },
      { date: subDays(new Date(), 7).toISOString(), weight: 144 },
      { date: new Date().toISOString(), weight: 143 }
    ]
  }
];

interface UserState {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (email: string) => void;
  addWorkout: (workout: Workout) => void;
  addMeasurement: (measurement: Measurement) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: defaultUsers,
      setCurrentUser: (email) => set((state) => ({
        currentUser: state.users.find(user => user.email === email) || null
      })),
      addWorkout: (workout) => set((state) => {
        if (!state.currentUser) return state;
        const updatedUsers = state.users.map(user => 
          user.email === state.currentUser?.email
            ? { ...user, workouts: [...user.workouts, workout] }
            : user
        );
        return {
          users: updatedUsers,
          currentUser: updatedUsers.find(user => user.email === state.currentUser?.email) || null
        };
      }),
      addMeasurement: (measurement) => set((state) => {
        if (!state.currentUser) return state;
        const updatedUsers = state.users.map(user => 
          user.email === state.currentUser?.email
            ? { ...user, measurements: [...user.measurements, measurement] }
            : user
        );
        return {
          users: updatedUsers,
          currentUser: updatedUsers.find(user => user.email === state.currentUser?.email) || null
        };
      })
    }),
    {
      name: 'user-storage'
    }
  )
);