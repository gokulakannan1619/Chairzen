import React from 'react';
import { ClockIcon } from './icons/ClockIcon';
import { Chair } from '../types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBook: (slotStartTime: number) => void;
    chair: Chair;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onBook, chair }) => {
    if (!isOpen) return null;

    const formatTime = (timestamp: number) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
                <div className="text-center">
                    <ClockIcon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                    <h2 className="text-2xl font-bold">Book <span className="text-cyan-400">{chair.name}</span></h2>
                    <p className="text-slate-400 mt-2 mb-6">Select an available time slot below.</p>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {chair.schedule.map(slot => (
                        <button
                            key={slot.startTime}
                            onClick={() => onBook(slot.startTime)}
                            disabled={slot.status === 'Booked'}
                            className="w-full text-left p-4 bg-slate-700 hover:bg-slate-600 rounded-lg flex justify-between items-center transition-colors disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                        >
                            <span className="font-bold text-lg">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </span>
                            {slot.status === 'Available' ? (
                                <span className="text-cyan-400 font-semibold">Book &rarr;</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Booked</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};