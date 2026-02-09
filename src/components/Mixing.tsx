import React, { useEffect, useState } from 'react';

const Mixing: React.FC = () => {
    const [text, setText] = useState("Melting the chocolate...");
    
    useEffect(() => {
        const texts = [
            "Melting the chocolate...",
            "Infusing with sweet memories...",
            "Sprinkling love dust...",
            "Cooling with patience...",
            "Wrapping with kisses..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % texts.length;
            setText(texts[i]);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="relative w-48 h-48 mb-8">
                {/* Outer mixing bowl effect */}
                <div className="absolute inset-0 border-4 border-amber-700/30 rounded-full animate-spin duration-[3000ms]"></div>
                <div className="absolute inset-4 border-4 border-t-amber-500 border-r-transparent border-b-amber-500 border-l-transparent rounded-full animate-spin"></div>
                
                {/* Center liquid */}
                <div className="absolute inset-10 bg-gradient-to-br from-amber-600 to-amber-900 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-amber-500/20 animate-pulse"></div>
                    <div className="absolute bottom-0 w-full h-1/2 bg-amber-950/40 blur-xl animate-bounce"></div>
                </div>
            </div>
            
            <h2 className="text-2xl font-serif text-amber-100 animate-pulse">{text}</h2>
        </div>
    );
};

export default Mixing;
