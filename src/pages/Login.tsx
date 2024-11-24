import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, LogIn } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setCurrentUser, users } = useUserStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(email);
      navigate('/workout-generator');
    } else {
      setError('User not found');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Ship className="h-16 w-16 mx-auto text-white mb-4" />
          <h1 className="text-3xl font-bold text-white">Welcome Aboard</h1>
          <p className="text-blue-100 mt-2">Select your profile to continue</p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-100 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {users.map((user) => (
            <button
              key={user.email}
              onClick={() => handleLogin(user.email)}
              className="w-full bg-white/5 hover:bg-white/10 text-white p-4 rounded-xl transition-colors flex items-center justify-between group"
            >
              <span className="font-medium">{user.name}</span>
              <LogIn className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;