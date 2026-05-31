
import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import { ChatbotPersonality, QuizQuestion } from '../types';
import { PERSONALITIES } from '../constants';

const QuizBot: React.FC = () => {
  const [step, setStep] = useState<'pick' | 'loading' | 'quiz' | 'result'>('pick');
  const [personality, setPersonality] = useState<ChatbotPersonality>('Star Kid');
  const [topic, setTopic] = useState('Algebra');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const startQuiz = async (p: ChatbotPersonality) => {
    setPersonality(p);
    setStep('loading');
    try {
      const data = await generateQuiz(p, topic);
      setQuestions(data);
      setCurrentIndex(0);
      setScore(0);
      setStep('quiz');
    } catch (e) {
      alert("Failed to reach base. Try again!");
      setStep('pick');
    }
  };

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setStep('result');
    }
  };

  if (step === 'pick') {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Choose Your Quiz Commander</h2>
        <p className="text-slate-400 mb-8">Select a bot to challenge you in a math battle.</p>
        
        <div className="mb-8 max-w-sm mx-auto">
          <label className="block text-left text-sm text-slate-400 mb-2">Battle Topic:</label>
          <select 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-cyan-500"
          >
            <option>Algebra</option>
            <option>Fractions</option>
            <option>Trigonometry</option>
            <option>Geometry</option>
            <option>Decimals</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(PERSONALITIES) as ChatbotPersonality[]).map((name) => (
            <button
              key={name}
              onClick={() => startQuiz(name)}
              className="p-8 rounded-3xl bg-slate-800/40 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800/60 transition-all flex flex-col items-center group"
            >
              <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {PERSONALITIES[name].avatar}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              <p className="text-slate-400 text-sm">{PERSONALITIES[name].description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-cyan-200 animate-pulse">Scanning the cosmos for questions...</p>
      </div>
    );
  }

  if (step === 'quiz' && questions.length > 0) {
    const q = questions[currentIndex];
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{PERSONALITIES[personality].avatar}</span>
          <div>
            <h3 className="text-lg font-bold text-cyan-400">{personality} is testing you!</h3>
            <div className="flex gap-1 mt-1">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 w-8 rounded-full ${i <= currentIndex ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 backdrop-blur-md">
          <p className="text-2xl font-medium mb-8 leading-relaxed">{q.question}</p>
          
          <div className="space-y-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                  selectedOption === i 
                    ? i === q.correctAnswer ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'
                    : selectedOption !== null && i === q.correctAnswer 
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-cyan-500 hover:bg-slate-700/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-600 text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-lg">{opt}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-8 p-6 bg-slate-900/50 border-l-4 border-cyan-500 rounded-r-xl animate-in slide-in-from-left-2">
              <p className="text-slate-300 italic mb-4">{q.explanation}</p>
              <button
                onClick={nextQuestion}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold shadow-lg"
              >
                {currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <div className="text-8xl mb-6">🏆</div>
        <h2 className="text-4xl font-bold mb-2">Mission Complete!</h2>
        <p className="text-xl text-cyan-400 mb-8">You scored {score} out of {questions.length}</p>
        
        <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700 mb-8">
          <p className="text-slate-300">
            {score === questions.length ? 'Perfect flight! You are a Math Galaxy legend.' : 
             score >= 1 ? 'Great job, cadet! Keep practicing to reach the next orbit.' : 
             'Back to training! Even great explorers start somewhere.'}
          </p>
        </div>

        <button
          onClick={() => setStep('pick')}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold text-xl shadow-xl transition-all"
        >
          Back to Command Hub
        </button>
      </div>
    );
  }

  return null;
};

export default QuizBot;
