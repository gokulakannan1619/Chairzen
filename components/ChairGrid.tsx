
import React from 'react';
import { Chair } from '../types';
import { ChairCard } from './ChairCard';

interface ChairGridProps {
  chairs: Chair[];
  onBookSlot: (chairId: number, slotStartTime: number) => void;
}

export const ChairGrid: React.FC<ChairGridProps> = ({ chairs, onBookSlot }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {chairs.map(chair => (
        <ChairCard key={chair.id} chair={chair} onBookSlot={onBookSlot} />
      ))}
    </div>
  );
};