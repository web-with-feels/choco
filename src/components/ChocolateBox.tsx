import React, { useState } from 'react';
import { generateSweetNote } from '../../services/geminiService';
import { X, Sparkles, MapPin, Heart } from 'lucide-react';

interface ChocolateBoxProps {
    partnerName: string;
}

const TREAT_TYPES = [
    { type: 'heart', color: 'bg-rose-900', topic: 'why I love you' },
    { type: 'square', color: 'bg-amber-800', topic: 'our future together' },
    { type: 'round', color: 'bg-amber-600', topic: 'a promise for when we meet' },
    { type: 'swirl', color: 'bg-amber-950', topic: 'a sweet compliment' },
    { type: 'diamond', color: 'bg-rose-800', topic: 'a spicy thought' },
    { type: 'truffle', color: 'bg-amber-700', topic: 'a hug sent from afar' },
];

const ChocolateBox: React.FC<ChocolateBoxProps> = ({ partnerName }) => {
    const [selectedTreat, setSelectedTreat] = useState<number | null>(null);
    const [note, setNote] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSelect = async (index: number) => {
        setSelectedTreat(index);
        setLoading(true);
        const treat = TREAT_TYPES[index % TREAT_TYPES.length];
        const msg = await generateSweetNote(partnerName, treat.topic);
        setNote(msg);
        setLoading(false);
    };

    const closeModal = () => {
        setSelectedTreat(null);
        setNote('');
    };

    return (
        <div className="min-h-screen py-12 px-4 flex flex-col items-center">
            <header className="text-center mb-12">
                <h2 className="text-4xl font-serif text-amber-100 mb-2">The Infinite Box</h2>
                <p className="text-amber-200/60 max-w-md mx-auto">
                    Distance separates our bodies, but this box connects our hearts. 
                    Click a chocolate whenever you need a sweet reminder.
                </p>
            </header>

            {/* Distance Visualizer */}
            <div className="w-full max-w-md bg-white/5 rounded-full h-1 mb-16 relative flex items-center justify-between px-1">
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-rose-500 w-3 h-3 rounded-full shadow-[0_0_10px_#f43f5e]"></div>
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-rose-500 w-3 h-3 rounded-full shadow-[0_0_10px_#f43f5e]"></div>
                 <div className="absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2 bg-amber-400/20 text-xs px-3 py-1 rounded-full border border-amber-400/30 text-amber-200">
                    Connected by Love
                 </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
                {Array.from({ length: 9 }).map((_, i) => {
                    const treat = TREAT_TYPES[i % TREAT_TYPES.length];
                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            className={`
                                w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-110 hover:rotate-2 relative group
                                ${treat.color}
                                flex items-center justify-center border-b-4 border-black/20
                            `}
                        >
                            {/* Decorative icing */}
                            <div className="absolute inset-2 border border-white/10 rounded-xl opacity-50"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-md"></div>
                            
                            <Sparkles className="text-white/0 group-hover:text-amber-200 transition-colors opacity-0 group-hover:opacity-100 absolute -top-2 -right-2" size={20} />
                        </button>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedTreat !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-[#fdfbf7] w-full max-w-md p-8 rounded-sm shadow-2xl relative z-10 transform transition-all animate-float">
                        <button 
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-amber-900/50 hover:text-rose-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="fill-current" />
                            </div>
                            
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="h-4 bg-amber-900/10 rounded w-3/4 mx-auto animate-pulse"></div>
                                    <div className="h-4 bg-amber-900/10 rounded w-1/2 mx-auto animate-pulse"></div>
                                </div>
                            ) : (
                                <>
                                    <p className="font-serif text-2xl text-amber-900 mb-6 leading-relaxed">
                                        "{note}"
                                    </p>
                                    <p className="text-xs uppercase tracking-widest text-amber-900/40 font-bold">
                                        A Message from the Heart
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            <footer className="mt-20 text-center text-amber-200/20 text-sm">
                Made with love & code for {partnerName}
            </footer>
        </div>
    );
};

export default ChocolateBox;