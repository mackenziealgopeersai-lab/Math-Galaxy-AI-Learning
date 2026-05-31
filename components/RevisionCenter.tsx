
import React, { useState } from 'react';
import { REVISION_TOPICS } from '../constants';
import { getRevisionSummary } from '../services/geminiService';

const RevisionCenter: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRevision = async (id: string) => {
    setSelectedTopic(id);
    setLoading(true);
    setAiContent(null);
    try {
      const summary = await getRevisionSummary(id);
      setAiContent(summary || 'No data found in this sector.');
    } catch (e) {
      setAiContent('Connection lost with the cosmic library.');
    } finally {
      setLoading(false);
    }
  };

  const currentTopicData = REVISION_TOPICS.find(t => t.id === selectedTopic);

  return (
    <div className="max-w-4xl mx-auto p-4 animate-in slide-in-from-bottom-6 duration-700">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Cosmic Library
        </h2>
        <p className="text-slate-400 mt-2">Power up your brain with these core topics.</p>
      </header>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVISION_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => fetchRevision(topic.id)}
              className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700 hover:border-yellow-500/50 hover:bg-slate-800/80 transition-all text-left flex gap-6 items-start group"
            >
              <span className="text-5xl group-hover:scale-125 transition-transform">{topic.icon}</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                <p className="text-slate-400 text-sm">{topic.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-yellow-500/30 rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-b border-yellow-500/30 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{currentTopicData?.icon}</span>
              <h3 className="text-2xl font-bold">{currentTopicData?.title}</h3>
            </div>
            <button 
              onClick={() => setSelectedTopic(null)}
              className="text-slate-400 hover:text-white"
            >
              Close ✕
            </button>
          </div>

          <div className="p-8">
            <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <h4 className="text-yellow-400 font-bold mb-2">The Basics:</h4>
              <p className="text-lg text-slate-200">{currentTopicData?.content}</p>
            </div>

            {loading ? (
              <div className="flex items-center gap-4 text-yellow-200">
                <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <p>Asking the Cosmic AI for a deep dive...</p>
              </div>
            ) : aiContent ? (
              <div className="prose prose-invert max-w-none text-slate-300">
                <h4 className="text-orange-400 font-bold mb-4">AI Revision Note:</h4>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {aiContent}
                </div>
              </div>
            ) : null}
            
            <button 
              onClick={() => setSelectedTopic(null)}
              className="mt-12 w-full py-4 border border-slate-700 rounded-2xl hover:bg-slate-800 transition-colors"
            >
              Return to Library
            </button>
          </div>
        </div>
      )}

      {selectedTopic === 'placevalue' && (
        <div className="mt-12 p-8 bg-slate-800/30 border border-slate-700 rounded-3xl text-center">
          <h4 className="text-xl font-bold mb-6">Interactive Place Value Table</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-slate-600 p-3 bg-slate-900/50 text-cyan-400">Thousands</th>
                  <th className="border border-slate-600 p-3 bg-slate-900/50 text-cyan-400">Hundreds</th>
                  <th className="border border-slate-600 p-3 bg-slate-900/50 text-cyan-400">Tens</th>
                  <th className="border border-slate-600 p-3 bg-slate-900/50 text-cyan-400">Units</th>
                  <th className="border border-slate-600 p-3 bg-slate-900/50 text-red-400">Decimal</th>
                  <th className="border border-slate-600 p-3 bg-slate-900/50 text-cyan-400">Tenths</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-2xl font-bold">
                  <td className="border border-slate-600 p-4">1</td>
                  <td className="border border-slate-600 p-4">2</td>
                  <td className="border border-slate-600 p-4">3</td>
                  <td className="border border-slate-600 p-4">4</td>
                  <td className="border border-slate-600 p-4 text-red-500">.</td>
                  <td className="border border-slate-600 p-4">5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-400">Example: 1,234.5</p>
        </div>
      )}
    </div>
  );
};

export default RevisionCenter;
