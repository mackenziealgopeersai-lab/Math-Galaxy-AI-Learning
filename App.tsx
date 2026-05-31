
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import HomeworkHelper from './components/HomeworkHelper';
import QuizBot from './components/QuizBot';
import RevisionCenter from './components/RevisionCenter';
import Navigation from './components/Navigation';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WELCOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.WELCOME:
        return <WelcomeScreen onStart={setCurrentView} />;
      case AppView.HOMEWORK:
        return <HomeworkHelper />;
      case AppView.QUIZ:
        return <QuizBot />;
      case AppView.REVISION:
        return <RevisionCenter />;
      default:
        return <WelcomeScreen onStart={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-20">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Galaxy themed decorative elements */}
        <div className="fixed top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {renderView()}
      </main>

      {/* Persistent Call-to-Action / Status */}
      <div className="fixed bottom-24 right-6 md:bottom-8 z-40">
        <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-slate-300">GALAXY ONLINE</span>
        </div>
      </div>
    </div>
  );
};

export default App;
