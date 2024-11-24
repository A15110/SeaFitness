import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, Dumbbell, Heart, LogOut, Menu, X } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import LOGO_URL from './logo.png'; 

const Navigation = () => {
  const { currentUser, setCurrentUser } = useUserStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser('');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-950/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Anchor className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Sea Fitness</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-blue-200 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                <NavLink
                  to="/workout-generator"
                  icon={<Dumbbell className="h-5 w-5" />}
                  text="Generate Workout"
                />
                <NavLink
                  to="/progress"
                  icon={<Heart className="h-5 w-5" />}
                  text="Progress"
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout ({currentUser.name})</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                icon={<LogOut className="h-5 w-5" />}
                text="Login"
              />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {currentUser ? (
              <>
                <MobileNavLink
                  to="/workout-generator"
                  icon={<Dumbbell className="h-5 w-5" />}
                  text="Generate Workout"
                  onClick={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  to="/progress"
                  icon={<Heart className="h-5 w-5" />}
                  text="Progress"
                  onClick={() => setIsMenuOpen(false)}
                />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 text-white/80 hover:text-white transition-colors px-4 py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout ({currentUser.name})</span>
                </button>
              </>
            ) : (
              <MobileNavLink
                to="/login"
                icon={<LogOut className="h-5 w-5" />}
                text="Login"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({
  to,
  icon,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
}) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLink = ({
  to,
  icon,
  text,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors px-4 py-2"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navigation;
