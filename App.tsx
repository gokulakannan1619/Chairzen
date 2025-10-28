// FIX: Implemented the main App component, managing state and routing, to resolve the module error in index.tsx and provide core application logic.
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { MyBookingsPage } from './components/MyBookingsPage';
import { OffersPage } from './components/OffersPage';
import { HelpPage } from './components/HelpPage';
import { ContactPage } from './components/ContactPage';
import { Chair, Page, User, Booking, Offer, Recommendation, TimeSlot } from './types';

// Helper to generate a daily schedule for a chair
const generateDailySchedule = (slotDurationMinutes: number): TimeSlot[] => {
    const schedule: TimeSlot[] = [];
    const now = new Date();
    // Start schedule from the next clean hour
    const startHour = now.getHours() + 1;
    now.setHours(startHour, 0, 0, 0);

    for (let i = 0; i < 10; i++) { // Generate 10 slots for the day
        const startTime = now.getTime() + (i * slotDurationMinutes * 60 * 1000);
        const endTime = startTime + (slotDurationMinutes * 60 * 1000);
        schedule.push({
            startTime,
            endTime,
            // Randomly mark some slots as already booked for realism
            status: Math.random() > 0.7 ? 'Booked' : 'Available',
        });
    }
    return schedule;
};


// Data is now inside App.tsx to avoid creating new files.
const initialChairsData: Chair[] = [
  { id: 1, name: 'The Voyager', model: 'Synca Kagra 4D', features: ['4D Massage', 'Zero Gravity', 'Heated Rollers', 'Body Scan'], schedule: generateDailySchedule(30) },
  { id: 2, name: 'The Dreamweaver', model: 'Osaki OS-Highpointe', features: ['SL-Track', 'Foot & Calf Rollers', 'Bluetooth Speakers', 'Space Saving'], schedule: generateDailySchedule(30) },
  { id: 3, name: 'The Titan', model: 'Titan Pro Jupiter LE', features: ['L-Track', 'Dual Action Foot Rollers', 'Zero Gravity', 'Full Body Air Massage'], schedule: generateDailySchedule(60) },
  { id: 4, name: 'The Serenity', model: 'Daiwa Supreme Hybrid', features: ['HybriFlex Track', 'Full Body Scan', 'Heated Knee Massage', 'Zero Gravity'], schedule: generateDailySchedule(30) },
  { id: 5, name: 'The Oasis', model: 'Infinity Aura', features: ['L-Track', 'Spinal Correction', 'Decompression Stretch', 'Foot Rollers'], schedule: generateDailySchedule(15) },
  { id: 6, name: 'The Apex', model: 'Human Touch Super Novo', features: ['SL-Track', 'Cloud Touch Acupressure', 'Dual-Lumbar Heat', 'Virtual Therapist'], schedule: generateDailySchedule(60) },
];

const initialBookingsData: Booking[] = [
    { id: 1, chairName: 'The Titan', location: 'Corporate Lounge A', startTime: Date.now() - 2 * 60 * 60 * 1000, endTime: Date.now() - (2 * 60 - 30) * 60 * 1000, duration: 30 },
];

const initialOffersData: Offer[] = [
    { id: 1, title: 'Mid-Week Relaxation', description: 'Get 20% off any session on Wednesdays.', code: 'RELAXWED20', userType: 'all' },
    { id: 2, title: 'First Timer Special', description: 'Welcome to ChairZen! Get 50% off your very first booking.', code: 'ZENFIRST50', userType: 'newUser' },
    { id: 3, title: 'Loyalty Bonus', description: 'Thanks for being a regular! Enjoy 15% off your next session.', code: 'ZENLOYAL15', userType: 'existingUser' },
];


const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [chairs, setChairs] = useState<Chair[]>(initialChairsData);
    const [bookings, setBookings] = useState<Booking[]>(initialBookingsData);
    const [offers, setOffers] = useState<Offer[]>(initialOffersData);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
    };

    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        setCurrentPage('home');
    };

    const handleLogout = () => {
        setUser(null);
    };
    
    const handleBookSlot = (chairId: number, slotStartTime: number) => {
        if (!user) {
            // This is a safeguard, but this function should not be callable by a non-logged-in user.
            return;
        }

        let newBooking: Booking | null = null;

        const updatedChairs = chairs.map(chair => {
            if (chair.id === chairId) {
                const updatedSchedule = chair.schedule.map(slot => {
                    if (slot.startTime === slotStartTime && slot.status === 'Available') {
                        
                        const duration = (slot.endTime - slot.startTime) / (60 * 1000);
                        newBooking = {
                            id: Date.now(),
                            chairName: chair.name,
                            location: 'Corporate Lounge A',
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                            duration: duration,
                        };

                        return { ...slot, status: 'Booked' as 'Booked' };
                    }
                    return slot;
                });
                return { ...chair, schedule: updatedSchedule };
            }
            return chair;
        });

        setChairs(updatedChairs);

        if (newBooking) {
            setBookings(prev => [newBooking!, ...prev]);
        }
    };

    
    const handleRecommendation = (recommendation: Recommendation | null) => {
        alert("AI Recommendation is not integrated with the new slot booking system yet.");
    };

    const renderPage = () => {
        // This function is only called when a user is logged in.
        switch (currentPage) {
            case 'home':
                return <HomePage chairs={chairs} onBookSlot={handleBookSlot} onRecommendation={handleRecommendation} />;
            case 'bookings':
                return <MyBookingsPage bookings={bookings} />;
            case 'offers':
                // user is guaranteed to be non-null here, so we use the non-null assertion `!`.
                return <OffersPage offers={offers} user={user!} bookings={bookings} />;
            case 'help':
                return <HelpPage />;
            case 'contact':
                return <ContactPage />;
            default:
                return <HomePage chairs={chairs} onBookSlot={handleBookSlot} onRecommendation={handleRecommendation} />;
        }
    };

    // If no user is logged in, render only the LoginPage as a standalone page.
    if (!user) {
        return (
            <div className="bg-slate-900 text-white min-h-screen">
                <LoginPage onLogin={handleLogin} />
            </div>
        );
    }

    // If a user is logged in, render the full application UI with Header and Footer.
    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col">
            <Header
                user={user}
                currentPage={currentPage}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
            />
            <div className="flex-grow">
                {renderPage()}
            </div>
            <Footer />
        </div>
    );
};

export default App;