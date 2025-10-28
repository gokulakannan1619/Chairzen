import React from 'react';
import { ChairGrid } from './ChairGrid';
import { AiAssistant } from './AiAssistant';
import { Chair, Recommendation } from '../types';

interface HomePageProps {
  chairs: Chair[];
  onBookSlot: (chairId: number, slotStartTime: number) => void;
  onRecommendation: (recommendation: Recommendation | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ chairs, onBookSlot, onRecommendation }) => {
  const chairModels = chairs.map(({ id, schedule, ...rest }) => rest);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          Welcome to <span className="text-cyan-400">ChairZen</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Your personal oasis of relaxation. Find an available massage chair and book your time slot.
        </p>
      </div>
      <ChairGrid chairs={chairs} onBookSlot={onBookSlot} />
      <AiAssistant chairModels={chairModels} onRecommendation={onRecommendation} />
    </main>
  );
};