// FIX: Implemented the missing OffersPage component to display promotional offers.
import React from 'react';
import { Offer, User, Booking } from '../types';
import { GiftIcon } from './icons/GiftIcon';

interface OffersPageProps {
    offers: Offer[];
    user: User | null;
    bookings: Booking[];
}

export const OffersPage: React.FC<OffersPageProps> = ({ offers, user, bookings }) => {
    
    // Determine if the user is new (has no past bookings)
    const isNewUser = bookings.filter(b => b.endTime <= Date.now()).length === 0;

    const filteredOffers = offers.filter(offer => {
        if (offer.userType === 'all') return true;
        if (isNewUser && offer.userType === 'newUser') return true;
        if (!isNewUser && offer.userType === 'existingUser') return true;
        return false;
    });

    return (
        <main className="container mx-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <GiftIcon className="w-10 h-10 mr-4 text-cyan-400" />
                    <div>
                        <h1 className="text-4xl font-bold">Special Offers For You</h1>
                        <p className="text-slate-400">
                            {isNewUser ? "As a new member, you get exclusive deals!" : "Here are some rewards for being a loyal member."}
                        </p>
                    </div>
                </div>

                {filteredOffers.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredOffers.map((offer) => (
                            <div key={offer.id} className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500 relative overflow-hidden">
                                {offer.userType !== 'all' && (
                                     <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${offer.userType === 'newUser' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                        {offer.userType === 'newUser' ? 'New User Exclusive' : 'Loyalty Reward'}
                                    </span>
                                )}
                                <h2 className="text-2xl font-bold text-white mb-2">{offer.title}</h2>
                                <p className="text-slate-300 mb-4">{offer.description}</p>
                                <div className="text-center bg-slate-700 p-3 rounded-lg">
                                    <span className="text-slate-400 mr-2">Use Code:</span>
                                    <span className="font-mono text-cyan-300 tracking-widest">{offer.code}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400 text-center">No special offers available for you at the moment. Please check back later!</p>
                )}
            </div>
        </main>
    );
};