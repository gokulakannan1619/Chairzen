import React from 'react';
import { HelpIcon } from './icons/HelpIcon';

const faqs = [
    { q: 'How do I book a massage chair?', a: 'Navigate to the home page, find an "Available" chair, and select your desired duration (15, 30, or 60 minutes). The session will start immediately.' },
    { q: 'What is the AI Massage Concierge?', a: 'Click the sparkles icon to open the AI assistant. Describe how you are feeling or what you need, and our AI will recommend the best chair and session for you.' },
    { q: 'What happens when my session ends?', a: 'When your session time runs out, the chair will enter a "Needs Cleaning" state. Our staff is automatically notified to sanitize the chair for the next user.' },
    { q: 'Can I extend my session?', a: 'Currently, sessions cannot be extended once they have started. You can book another session after your current one finishes, provided the chair is available.' },
    { q: 'Are the chairs cleaned regularly?', a: 'Yes, every chair is thoroughly sanitized after each use to ensure a clean and safe environment for all our guests.' },
];

export const HelpPage: React.FC = () => {
    return (
        <main className="container mx-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <HelpIcon className="w-10 h-10 mr-4 text-cyan-400"/>
                    <div>
                        <h1 className="text-4xl font-bold">Help Center</h1>
                        <p className="text-slate-400">Find answers to frequently asked questions.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="bg-slate-800 p-4 rounded-lg group">
                            <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                                {faq.q}
                                <span className="transform transition-transform duration-300 group-open:rotate-180">&darr;</span>
                            </summary>
                            <p className="text-slate-300 mt-4">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </main>
    );
};
