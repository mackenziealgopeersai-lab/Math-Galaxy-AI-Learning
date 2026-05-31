
import React from 'react';
import { AppView } from '../types';

interface WelcomeScreenProps {
  onStart: (view: AppView) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          Math Galaxy
        </h1>
        <p className="mt-2 text-xl md:text-2xl text-cyan-200">AI Learning Adventure</p>
      </div>

      <p className="max-w-lg text-slate-300 text-lg mb-12">
        Welcome, Young Explorer! Ready to master the universe of mathematics? 
        Solve homework, challenge AI bots, and explore the stars of logic.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => onStart(AppView.HOMEWORK)}
          className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-purple-500 transition-all text-left"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
          <h3 className="text-xl font-bold mb-2">Homework Station</h3>
          <p className="text-slate-400 text-sm">Scan or type your math problems for cosmic help.</p>
        </button>

        <button
          onClick={() => onStart(AppView.QUIZ)}
          className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500 transition-all text-left"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
          <h3 className="text-xl font-bold mb-2">Quiz Command</h3>
          <p className="text-slate-400 text-sm">Battle our 3 AI personalities in a math quiz.</p>
        </button>

        <button
          onClick={() => onStart(AppView.REVISION)}
          className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-yellow-500 transition-all text-left"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✨</div>
          <h3 className="text-xl font-bold mb-2">Revision Hub</h3>
          <p className="text-slate-400 text-sm">Review Algebra, Trigonometry, and more.</p>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
