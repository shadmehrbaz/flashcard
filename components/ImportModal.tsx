
import React, { useState } from 'react';
import { generateFlashcards } from '../services/geminiService';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (title: string, cards: { question: string; answer: string }[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (!title.trim() || !text.trim()) {
      setError("Please provide both a title and some text.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cards = await generateFlashcards(text);
      if (cards.length === 0) {
        throw new Error("No flashcards could be extracted from this text.");
      }
      onImport(title, cards);
      setTitle('');
      setText('');
    } catch (err: any) {
      setError(err.message || "Failed to process text.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#192633] w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-[#324d67] flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#324d67] flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black">Import with AI</h2>
              <p className="text-sm text-gray-500">Paste any text, and Gemini will extract flashcards for you.</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#233648] rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
           </button>
        </div>

        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Deck Title</label>
            <input 
              type="text" 
              placeholder="e.g. Physics Final Exam"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67] rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Content / Source Text</label>
            <textarea 
              rows={8}
              placeholder="Paste notes, articles, or raw data here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67] rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            ></textarea>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-sm border border-red-500/20">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#324d67] bg-gray-50 dark:bg-[#1d2d3c] flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleImport}
            disabled={isProcessing}
            className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">magic_button</span>
                Generate Deck
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
