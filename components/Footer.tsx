// FIX: Implemented the missing Footer component to provide a consistent page layout.
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-12">
      <div className="container mx-auto py-6 px-4 md:px-8 text-center">
        <p>&copy; {currentYear} ChairZen. All rights reserved.</p>
        <p className="text-sm mt-1">Your personal oasis of relaxation.</p>
      </div>
    </footer>
  );
};
