import React, { useState, useRef, useEffect } from 'react';
import Intro from './components/Intro';
import Atelier from './components/Atelier';
import Mixing from './components/Mixing';
import Reveal from './components/Reveal';
import ChocolateBox from './components/ChocolateBox';
import { ChocolateCreation, GeneratedContent, AppState } from './types';
import { generateChocolateProfile } from '../services/geminiService';
import { Volume2, VolumeX, Music } from 'lucide-react';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>(AppState.INTRO);
    // Hardcoded names for the personalized experience
    const [partnerName] = useState('Blossom');
    const [senderName] = useState('Cherry');
    
    const [creation, setCreation] = useState<ChocolateCreation | null>(null);
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    
    // Audio State
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    // Attempt to play music immediately on load, and setup interaction fallback
    useEffect(() => {
        const attemptPlay = async () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.4;
                try {
                    await audioRef.current.play();
                    setIsMusicPlaying(true);
                } catch (e) {
                    console.log("Autoplay blocked by browser policy. Waiting for user interaction.");
                }
            }
        };

        attemptPlay();

        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play()
                    .then(() => setIsMusicPlaying(true))
                    .catch(e => console.error("Audio playback failed:", e));
            }
        };

        // Listen for any click to start music if autoplay failed
        document.addEventListener('click', handleInteraction, { once: true });
        return () => document.removeEventListener('click', handleInteraction);
    }, []);

    const handleIntroStart = () => {
        setState(AppState.ATELIER);
        // Ensure music is playing if the global listener didn't catch it
        if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play()
                .then(() => setIsMusicPlaying(true))
                .catch(e => console.log("Audio play failed:", e));
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsMusicPlaying(!isMusicPlaying);
        }
    };

    const handleAtelierComplete = async (newCreation: ChocolateCreation) => {
        setCreation(newCreation);
        setState(AppState.MIXING);
        
        try {
            const content = await generateChocolateProfile(newCreation);
            setGeneratedContent(content);
            setState(AppState.REVEAL);
        } catch (error) {
            console.error("Failed to generate content", error);
            // Fallback content handled in service, but just in case:
            setState(AppState.REVEAL); 
        }
    };

    const handleContinueToBox = () => {
        setState(AppState.GIFT_BOX);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-rose-500 selection:text-white relative">
            {/* Background Audio Player */}
            <audio ref={audioRef} loop autoPlay>
                {/* 
                   INSTRUCTIONS: 
                   1. Rename your custom song to 'song.mp3' and put it in the public folder.
                   2. If 'song.mp3' is missing, it will fallback to the online URL below.
                */}
                <source src="/audio/song.mp3" type="audio/mpeg" />
                <source src="https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3" type="audio/mpeg" />
            </audio>

            {/* Floating Music Control */}
            <button 
                onClick={toggleMusic}
                className="fixed top-5 right-5 z-50 p-3 bg-black/30 backdrop-blur-md border border-amber-500/20 rounded-full text-amber-100 hover:bg-amber-900/40 hover:scale-110 transition-all shadow-lg group"
                title={isMusicPlaying ? "Pause Music" : "Play Music"}
            >
                {isMusicPlaying ? (
                    <div className="relative">
                         <Volume2 size={24} />
                         <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                         </span>
                    </div>
                ) : (
                    <VolumeX size={24} className="text-amber-100/50" />
                )}
            </button>

            {state === AppState.INTRO && <Intro onStart={handleIntroStart} />}
            {state === AppState.ATELIER && <Atelier partnerName={partnerName} senderName={senderName} onComplete={handleAtelierComplete} />}
            {state === AppState.MIXING && <Mixing />}
            {state === AppState.REVEAL && creation && generatedContent && (
                <Reveal 
                    data={generatedContent} 
                    creation={creation} 
                    onContinue={handleContinueToBox} 
                />
            )}
            {state === AppState.GIFT_BOX && <ChocolateBox partnerName={partnerName} />}
        </div>
    );
};

export default App;
