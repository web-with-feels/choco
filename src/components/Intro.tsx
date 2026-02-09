import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface IntroProps {
    onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-10 w-px h-64 bg-gradient-to-b from-amber-700/50 to-transparent melt-drip" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-0 right-20 w-px h-48 bg-gradient-to-b from-amber-700/50 to-transparent melt-drip" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-0 left-1/3 w-px h-80 bg-gradient-to-b from-amber-700/50 to-transparent melt-drip" style={{ animationDelay: '0.8s' }}></div>

            <div className="z-10 bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-amber-900/30 shadow-2xl max-w-lg w-full text-center relative group">
                
                <div className="absolute -top-6 -right-6 text-amber-400 animate-pulse">
                     <Sparkles size={40} />
                </div>

                <div className="mb-8 flex justify-center">
                    <div className="relative transform hover:scale-110 transition-transform duration-700">
                        <Heart className="w-24 h-24 text-rose-600 fill-rose-600 animate-pulse" />
                        <Heart className="w-24 h-24 text-amber-600 fill-amber-600 absolute top-0 left-0 opacity-50 blur-xl" />
                    </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl mb-4 text-amber-100 gold-text leading-tight">
                    Happy Chocolate Day<br/>
                    <span className="font-serif italic text-rose-200 block mt-2">My Dearest Blossom</span>
                </h1>
                
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>

                <p className="text-amber-100/90 mb-8 font-light text-lg leading-relaxed">
                    "Distance may keep us apart today,<br/>
                    but my love for you melts every mile."
                </p>

                <p className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-10 font-bold">
                    With Love, Cherry
                </p>

                <button 
                    onClick={onStart}
                    className="w-full bg-gradient-to-r from-rose-800 to-amber-800 text-amber-50 font-serif text-xl py-5 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.4)] hover:shadow-rose-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group border border-amber-500/20"
                >
                    <span className="group-hover:tracking-wider transition-all duration-300">Create Your Gift</span>
                </button>
            </div>
        </div>
    );
};

export default Intro;