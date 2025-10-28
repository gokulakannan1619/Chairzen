import React from 'react';
import { Booking } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';

interface MyBookingsPageProps {
    bookings: Booking[];
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({ bookings }) => {
    
    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const currentBooking = bookings.find(b => b.endTime > Date.now());
    const pastBookings = bookings.filter(b => b.endTime <= Date.now());

    return (
        <main className="container mx-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <CalendarIcon className="w-10 h-10 mr-4 text-cyan-400" />
                    <div>
                        <h1 className="text-4xl font-bold">My Bookings</h1>
                        <p className="text-slate-400">View your current and past massage sessions.</p>
                    </div>
                </div>

                {currentBooking && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 border-b border-slate-700 pb-2">Current Session</h2>
                        <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                             <h3 className="text-xl font-bold text-white">{currentBooking.chairName}</h3>
                             <p className="text-slate-400">{currentBooking.location}</p>
                             <div className="flex items-center text-green-400 font-semibold mt-4">
                                <ClockIcon className="w-5 h-5 mr-2" />
                                <span>In progress until {formatTime(currentBooking.endTime)}</span>
                             </div>
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-2xl font-semibold mb-4 border-b border-slate-700 pb-2">Booking History</h2>
                    {pastBookings.length > 0 ? (
                        <div className="space-y-4">
                            {pastBookings.map(booking => (
                                <div key={booking.id} className="bg-slate-800 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-lg">{booking.chairName}</h3>
                                            <p className="text-sm text-slate-400">{formatDate(booking.startTime)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">{booking.duration} min</p>
                                            <p className="text-sm text-slate-400">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400">You have no past bookings.</p>
                    )}
                </div>
            </div>
        </main>
    );
};
