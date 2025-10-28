// FIX: Implemented the Header component to provide navigation, display user information, and handle logout. This includes a responsive design with a collapsible menu for mobile devices, resolving the module not found error in App.tsx.
import React, { useState } from 'react';
import { Page, User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';

interface HeaderProps {
    user: User | null;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'bookings', label: 'My Bookings' },
    { page: 'offers', label: 'Offers' },
    { page: 'help', label: 'Help' },
    { page: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ user, currentPage, onNavigate, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getNavLinkClass = (page: Page, isMobile: boolean = false) => {
        const baseClass = isMobile
            ? 'block px-3 py-2 rounded-md text-base font-medium w-full text-left'
            : 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
        
        const activeClass = isMobile ? 'bg-cyan-600 text-white' : 'bg-cyan-600 text-white';
        const inactiveClass = 'text-slate-300 hover:bg-slate-700 hover:text-white';

        return `${baseClass} ${currentPage === page ? activeClass : inactiveClass}`;
    };

    return (
        <header className="bg-slate-800 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
                            <h1 className="text-2xl font-bold text-white">Chair<span className="text-cyan-400">Zen</span></h1>
                        </div>
                        <nav className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map(item => (
                                    <button
                                        key={item.page}
                                        onClick={() => onNavigate(item.page)}
                                        className={getNavLinkClass(item.page)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>
                    <div className="hidden md:flex items-center">
                         <span className="text-slate-300 mr-4">Welcome, {user?.name.split(' ')[0]}</span>
                        <button
                            onClick={onLogout}
                            className="p-2 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white rounded-full transition-colors"
                            aria-label="Logout"
                        >
                            <LogoutIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <nav className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                             <button
                                key={item.page}
                                onClick={() => {
                                    onNavigate(item.page);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={getNavLinkClass(item.page, true)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-slate-700">
                        <div className="flex items-center px-5">
                             <div>
                                <div className="text-base font-medium leading-none text-white">{user?.name}</div>
                                <div className="text-sm font-medium leading-none text-slate-400 mt-1">{user?.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                             <button
                                onClick={() => {
                                    onLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};
