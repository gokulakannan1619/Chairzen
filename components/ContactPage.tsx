import React, { useState } from 'react';
import { MailIcon } from './icons/MailIcon';

export const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="container mx-auto p-4 md:p-8">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <MailIcon className="w-10 h-10 mr-4 text-cyan-400"/>
                    <div>
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="text-slate-400">We'd love to hear from you. Get in touch with our team.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-slate-800 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
                        {submitted ? (
                            <div className="text-center p-8 bg-slate-700 rounded-lg">
                                <h3 className="text-xl font-bold text-green-400">Thank You!</h3>
                                <p className="text-slate-300 mt-2">Your message has been received. We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-slate-300 font-semibold mb-2">Full Name</label>
                                    <input type="text" id="name" required className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-slate-300 font-semibold mb-2">Email Address</label>
                                    <input type="email" id="email" required className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-slate-300 font-semibold mb-2">Message</label>
                                    <textarea id="message" rows={4} required className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-cyan-400">Our Location</h3>
                            <p className="text-slate-300">123 Relaxation Ave,<br />Serenity City, ST 12345</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-cyan-400">Email Us</h3>
                            <p className="text-slate-300">contact@chairzen.com</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-cyan-400">Call Us</h3>
                            <p className="text-slate-300">(555) 123-4567</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
