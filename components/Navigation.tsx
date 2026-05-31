
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.WELCOME, label: 'Orbit', icon: '🏠' },
    { id: AppView.HOMEWORK, label: 'Homework Help', icon: '📝' },
    { id: AppView.QUIZ, label: 'Quiz Bot', icon: '🤖' },
    { id: AppView.REVISION, label: 'Revision Hub', icon: '📚' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-t border-purple-500/30 p-4 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-2 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs md:text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
