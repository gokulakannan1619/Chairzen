import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { Page } from '../types';

interface LoginPageProps {
    onLogin: (user: { name: string; email: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        // Simulate API call
        setTimeout(() => {
            if (email === 'user@chairzen.com' && password === 'password123') {
                onLogin({ name: 'Alex Doe', email });
            } else {
                setError('Invalid credentials. Use user@chairzen.com and password123.');
                setIsLoggingIn(false);
            }
        }, 1000);
    };

    return (
        <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <UserIcon className="w-16 h-16 mx-auto text-cyan-400 mb-4" />
                    <h1 className="text-3xl font-bold text-white">Account Login</h1>
                    <p className="text-slate-400">Welcome to ChairZen. Please log in to continue.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@chairzen.com"
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password123"
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-slate-600"
                            disabled={isLoggingIn}
                        >
                             {isLoggingIn ? 'Logging In...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};