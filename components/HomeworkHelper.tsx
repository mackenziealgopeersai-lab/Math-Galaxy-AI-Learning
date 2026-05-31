
import React, { useState, useRef } from 'react';
import { getHomeworkHelp } from '../services/geminiService';

const HomeworkHelper: React.FC = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!input && !image) return;
    setLoading(true);
    setResponse('');
    try {
      const base64 = image?.split(',')[1];
      const result = await getHomeworkHelp(input, base64);
      setResponse(result || 'The space signal was lost. Try again!');
    } catch (error) {
      setResponse('Error contacting the galaxy base. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in duration-500">
      <div className="bg-slate-800/40 border border-purple-500/30 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="p-6 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-purple-500/30">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>📝</span> Homework Station
          </h2>
          <p className="text-slate-300 text-sm mt-1">Stuck on a problem? Let's solve it together.</p>
        </div>

        <div className="p-6 space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your math problem here... (e.g., What is 2x + 5 = 15?)"
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <span>📷</span> {image ? 'Change Photo' : 'Upload Image'}
              </button>
              {image && (
                <button 
                  onClick={() => setImage(null)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={handleSolve}
              disabled={loading || (!input && !image)}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold shadow-lg shadow-purple-900/40 transition-all"
            >
              {loading ? 'Analyzing...' : 'Solve Problem'}
            </button>
          </div>

          {image && (
            <div className="mt-4 p-2 border border-slate-700 rounded-xl bg-slate-900/30">
              <img src={image} alt="Homework" className="max-h-48 rounded-lg mx-auto" />
            </div>
          )}

          {response && (
            <div className="mt-8 p-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl animate-in slide-in-from-bottom-4">
              <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                <span>🤖</span> Cosmic Explanation:
              </h3>
              <div className="prose prose-invert max-w-none text-slate-200 whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkHelper;
