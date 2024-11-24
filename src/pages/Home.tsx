import React from 'react';
import { Anchor, Ship, Wind, Compass, Heart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-12">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-white py-16"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Ship className="h-24 w-24 mx-auto text-white" />
        </motion.div>
        <h1 className="text-5xl font-bold mb-4">Welcome Aboard Sea Fitness!</h1>
        <p className="text-xl text-blue-100 mb-4">Your fitness companion aboard the Sea Unt</p>
        <p className="text-lg text-blue-200 mb-8">Stay fit while sailing the seven seas</p>
        <div className="flex justify-center space-x-4">
          <Link to="/workout-generator">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors">
              Generate Workout
            </button>
          </Link>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
            View Progress
          </button>
        </div>
      </motion.section>

      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Wind className="h-8 w-8" />}
          title="Boat-Friendly Workouts"
          description="Space-conscious exercises perfect for life aboard the Sea Unt"
        />
        <FeatureCard 
          icon={<Heart className="h-8 w-8" />}
          title="Personalized Plans"
          description="Tailored workouts for Josh & Keely's fitness goals"
        />
        <FeatureCard 
          icon={<Trophy className="h-8 w-8" />}
          title="Achievement System"
          description="Earn nautical-themed badges and rewards"
        />
      </section>

      <section className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6">Today's Sea Unt Deck Workout</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Morning Deck Routine</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-center space-x-2">
                <Compass className="h-5 w-5" />
                <span>10 Bow-to-Stern Lunges</span>
              </li>
              <li className="flex items-center space-x-2">
                <Anchor className="h-5 w-5" />
                <span>15 Mast Climber Squats</span>
              </li>
              <li className="flex items-center space-x-2">
                <Ship className="h-5 w-5" />
                <span>20 Port-to-Starboard Twists</span>
              </li>
            </ul>
            <Link to="/workout-generator">
              <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Start Now
              </button>
            </Link>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&q=80"
              alt="Peaceful ocean view"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-blue-100">{description}</p>
  </motion.div>
);

export default Home;