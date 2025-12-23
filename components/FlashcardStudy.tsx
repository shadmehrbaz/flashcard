
import React, { useState } from 'react';
import { Deck } from '../types';

interface FlashcardStudyProps {
  deck: Deck;
  onClose: () => void;
  onFinish: (mastery: number) => void;
}

const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ deck, onClose, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentCard = deck.cards[currentIndex];
  const progress = ((currentIndex + 1) / deck.cards.length) * 100;

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);
    
    if (currentIndex < deck.cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      const finalMastery = Math.round(((correctCount + (isCorrect ? 1 : 0)) / deck.cards.length) * 100);
      onFinish(finalMastery);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Dashboard
        </button>
        <span className="text-sm font-bold text-gray-400">Card {currentIndex + 1} of {deck.cards.length}</span>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-[#233648] rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex flex-col items-center gap-10 mt-4">
        <div 
          className="relative w-full max-w-[500px] h-[350px] cursor-pointer perspective-1000 group"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 bg-white dark:bg-[#192633] rounded-2xl border-2 border-gray-100 dark:border-[#324d67] shadow-xl flex flex-col items-center justify-center p-8 backface-hidden">
               <span className="absolute top-4 left-4 text-xs font-bold uppercase text-gray-400 tracking-widest">Question</span>
               <p className="text-2xl md:text-3xl font-bold text-center leading-relaxed">{currentCard.question}</p>
               <span className="absolute bottom-6 text-xs text-gray-400 animate-pulse">Click to reveal answer</span>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bg-primary/5 dark:bg-[#111a22] rounded-2xl border-2 border-primary/50 shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180">
               <span className="absolute top-4 left-4 text-xs font-bold uppercase text-primary tracking-widest">Answer</span>
               <p className="text-2xl md:text-3xl font-bold text-center leading-relaxed text-primary">{currentCard.answer}</p>
            </div>
          </div>
        </div>

        <div className={`flex gap-4 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
            className="px-8 py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white font-bold transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">close</span>
            Still Learning
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
            className="px-8 py-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white font-bold transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">check</span>
            Mastered
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudy;
