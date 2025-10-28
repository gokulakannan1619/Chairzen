
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { getMassageRecommendation } from '../services/geminiService';
import { Chair, Recommendation } from '../types';

interface AiAssistantProps {
  chairModels: Omit<Chair, 'status' | 'sessionEndTime' | 'id'>[];
  onRecommendation: (recommendation: Recommendation | null) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ chairModels, onRecommendation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    onRecommendation(null);

    try {
      const result = await getMassageRecommendation(prompt, chairModels);
      setRecommendation(result);
      onRecommendation(result);
    } catch (err) {
      setError('Sorry, I couldn\'t get a recommendation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const closeModal = () => {
    setIsOpen(false);
    //
    setTimeout(() => {
        setPrompt('');
        setRecommendation(null);
        setError(null);
        onRecommendation(null);
    }, 300);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-transform transform hover:scale-110"
        aria-label="Open AI Assistant"
      >
        <SparklesIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300" onClick={closeModal}>
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
            <div className="flex items-center mb-4">
              <SparklesIcon className="w-6 h-6 mr-3 text-cyan-400" />
              <h2 className="text-xl font-bold">AI Massage Concierge</h2>
            </div>
            <p className="text-slate-400 mb-4">Describe how you're feeling or what you need, and I'll recommend the perfect massage session.</p>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'I have a sore lower back from sitting all day' or 'I feel stressed and need to relax'"
              className="w-full h-24 p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none mb-4"
              disabled={isLoading}
            />
            <button
              onClick={handleGetRecommendation}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-slate-600"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </>
              ) : (
                'Get Recommendation'
              )}
            </button>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            {recommendation && (
                <div className="mt-6 p-4 bg-slate-700/50 border-l-4 border-cyan-400 rounded-lg">
                    <h3 className="font-bold text-lg text-cyan-300">My Recommendation for You:</h3>
                    <p className="mt-2 text-white">
                        For you, I suggest the <strong className="font-semibold">{recommendation.chairName}</strong> chair for a <strong className="font-semibold">{recommendation.duration} minute</strong> session.
                    </p>
                    <p className="mt-2 text-slate-300 italic">"{recommendation.reasoning}"</p>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
