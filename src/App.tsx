import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import WorkoutGenerator from './pages/WorkoutGenerator';
import Progress from './pages/Progress';
import { useUserStore } from './store/userStore';

function App() {
  const { currentUser } = useUserStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/workout-generator"
              element={currentUser ? <WorkoutGenerator /> : <Navigate to="/login" />}
            />
            <Route
              path="/progress"
              element={currentUser ? <Progress /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;