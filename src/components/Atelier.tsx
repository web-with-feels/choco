import React, { useState } from 'react';
import { Ingredient, IngredientType, ChocolateCreation } from '../types';
import { BASES, FILLINGS, TOPPINGS } from '../constants';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface AtelierProps {
    partnerName: string;
    senderName: string;
    onComplete: (creation: ChocolateCreation) => void;
}

const Atelier: React.FC<AtelierProps> = ({ partnerName, senderName, onComplete }) => {
    const [step, setStep] = useState<number>(0);
    const [selections, setSelections] = useState<{
        base?: Ingredient;
        filling?: Ingredient;
        topping?: Ingredient;
    }>({});

    const handleSelect = (ingredient: Ingredient) => {
        const newSelections = { ...selections };
        if (ingredient.type === IngredientType.BASE) newSelections.base = ingredient;
        if (ingredient.type === IngredientType.FILLING) newSelections.filling = ingredient;
        if (ingredient.type === IngredientType.TOPPING) newSelections.topping = ingredient;
        setSelections(newSelections);
    };

    const nextStep = () => {
        if (step < 2) setStep(step + 1);
        else if (selections.base && selections.filling && selections.topping) {
            onComplete({
                base: selections.base,
                filling: selections.filling,
                topping: selections.topping,
                partnerName,
                senderName
            });
        }
    };

    const getCurrentOptions = () => {
        switch (step) {
            case 0: return { title: "Select the Soul", subtitle: "The foundation of your love", data: BASES };
            case 1: return { title: "Choose the Heart", subtitle: "The hidden sweetness within", data: FILLINGS };
            case 2: return { title: "Add the Sparkle", subtitle: "The magic that keeps it alive", data: TOPPINGS };
            default: return { title: "", subtitle: "", data: [] };
        }
    };

    const { title, subtitle, data } = getCurrentOptions();
    const currentSelection = step === 0 ? selections.base : step === 1 ? selections.filling : selections.topping;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
            <header className="mb-8 text-center animate-fade-in">
                <p className="text-amber-400 text-sm tracking-[0.2em] uppercase mb-2">Step {step + 1} of 3</p>
                <h2 className="text-4xl md:text-5xl font-serif text-amber-50 mb-2">{title}</h2>
                <p className="text-amber-200/60 font-light italic">{subtitle}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                {data.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`
                            relative group p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center
                            ${currentSelection?.id === item.id 
                                ? 'bg-amber-900/40 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.2)] scale-105' 
                                : 'bg-white/5 border-white/10 hover:border-amber-700/50 hover:bg-white/10'}
                        `}
                    >
                        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                            {item.icon}
                        </div>
                        <h3 className={`text-xl font-serif mb-2 ${currentSelection?.id === item.id ? 'text-amber-200' : 'text-amber-100'}`}>
                            {item.name}
                        </h3>
                        <p className="text-sm text-amber-200/60 leading-relaxed">
                            {item.description}
                        </p>
                        
                        {currentSelection?.id === item.id && (
                            <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 rounded-full p-1 shadow-lg">
                                <Check size={20} />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="flex justify-center w-full">
                <button
                    onClick={nextStep}
                    disabled={!currentSelection}
                    className={`
                        flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300
                        ${currentSelection 
                            ? 'bg-amber-100 text-amber-950 hover:bg-white hover:scale-105 shadow-xl cursor-pointer' 
                            : 'bg-white/10 text-white/20 cursor-not-allowed'}
                    `}
                >
                    {step === 2 ? 'Craft Our Chocolate' : 'Next Step'}
                    {step === 2 ? <Sparkles size={20} /> : <ArrowRight size={20} />}
                </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-12 flex gap-2">
                {[0, 1, 2].map((i) => (
                    <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'w-12 bg-amber-400' : 'w-4 bg-white/10'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Atelier;
