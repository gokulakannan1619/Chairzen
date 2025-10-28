import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';

export const LocationSelector: React.FC = () => {
    return (
        <div className="bg-slate-800 p-4 rounded-lg flex items-center">
            <MapPinIcon className="w-6 h-6 mr-3 text-cyan-400" />
            <div>
                <p className="text-sm text-slate-400">Location</p>
                <h3 className="font-bold text-lg">Corporate Lounge A</h3>
            </div>
            {/* A dropdown could be added here later */}
        </div>
    );
};
