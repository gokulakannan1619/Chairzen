import React, { useState } from 'react';
import { Chair, TimeSlot } from '../types';
import { BookingModal } from './BookingModal';

interface ChairCardProps {
  chair: Chair;
  onBookSlot: (chairId: number, slotStartTime: number) => void;
}

const getAvailabilityStatus = (schedule: TimeSlot[]) => {
    const hasAvailableSlots = schedule.some(slot => slot.status === 'Available');
    if (hasAvailableSlots) {
        return { color: 'border-green-500', text: 'Slots Available' };
    }
    return { color: 'border-red-500', text: 'Fully Booked' };
};

export const ChairCard: React.FC<ChairCardProps> = ({ chair, onBookSlot }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const availability = getAvailabilityStatus(chair.schedule);
  const isAvailable = availability.text === 'Slots Available';

  const handleBook = (slotStartTime: number) => {
    onBookSlot(chair.id, slotStartTime);
    setIsBookingModalOpen(false);
  }

  return (
    <>
      <div className={`bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between border-l-4 ${availability.color} transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-[1.02]`}>
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white">{chair.name}</h3>
            <div className={`text-sm font-semibold px-3 py-1 rounded-full flex items-center ${
              isAvailable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {availability.text}
            </div>
          </div>
          <p className="text-slate-400 mb-4">{chair.model}</p>
          <div className="space-y-2 mb-6">
            {chair.features.map(feature => (
              <span key={feature} className="inline-block bg-slate-700 rounded-full px-3 py-1 text-sm font-semibold text-slate-300 mr-2 mb-2">
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            disabled={!isAvailable}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500"
          >
            View & Book Slots
          </button>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBook={handleBook}
        chair={chair}
      />
    </>
  );
};