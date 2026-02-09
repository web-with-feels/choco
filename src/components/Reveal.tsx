import React from 'react';
import { ChocolateCreation, GeneratedContent } from '../types';
import { Gift, Heart, Share2 } from 'lucide-react';

interface RevealProps {
    data: GeneratedContent;
    creation: ChocolateCreation;
    onContinue: () => void;
}

const Reveal: React.FC<RevealProps> = ({ data, creation, onContinue }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 py-12">
            <div className="max-w-2xl w-full bg-white text-amber-950 rounded-sm shadow-2xl overflow-hidden relative transform transition-all hover:scale-[1.01] duration-500">
                {/* Decorative Ribbon */}
                <div className="absolute top-0 right-10 w-16 h-full bg-rose-700/10 z-0"></div>
                
                <div className="relative z-10 p-8 md:p-12 border-8 border-double border-amber-900/10 h-full flex flex-col items-center text-center">
                    
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-800 shadow-inner">
                        <Gift size={32} />
                    </div>

                    <h3 className="text-amber-800/60 uppercase tracking-widest text-xs font-bold mb-4">
                        Specially Crafted For {creation.partnerName}
                    </h3>
                    
                    <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-6 leading-tight">
                        {data.name}
                    </h1>

                    <div className="w-24 h-1 bg-amber-900/20 mb-8 mx-auto"></div>

                    <p className="text-lg md:text-xl text-amber-800/80 font-light leading-relaxed mb-8 italic">
                        "{data.description}"
                    </p>

                    <div className="bg-amber-50 p-8 rounded-xl border border-amber-100 mb-8 w-full">
                        <p className="font-serif text-2xl text-rose-900 leading-relaxed whitespace-pre-line">
                            {data.poem}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <button 
                            onClick={onContinue}
                            className="flex-1 bg-amber-900 text-amber-50 py-4 px-6 rounded-lg font-bold hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Gift size={18} />
                            Open Gift Box
                        </button>
                    </div>
                </div>
            </div>
            
            <p className="mt-8 text-amber-200/40 text-sm">
                Ingredients: {creation.base.name}, {creation.filling.name}, {creation.topping.name}
            </p>
        </div>
    );
};

export default Reveal;
