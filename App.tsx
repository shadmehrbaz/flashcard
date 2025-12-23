
import React, { useState, useEffect, useCallback } from 'react';
import { Deck, ViewState, Flashcard } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ActionCard from './components/ActionCard';
import RecentItem from './components/RecentItem';
import FlashcardStudy from './components/FlashcardStudy';
import ImportModal from './components/ImportModal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Load decks from localStorage on mount
  useEffect(() => {
    const savedDecks = localStorage.getItem('flashmaster_decks');
    if (savedDecks) {
      try {
        setDecks(JSON.parse(savedDecks));
      } catch (e) {
        console.error("Failed to load decks", e);
      }
    } else {
      // Default placeholder decks
      const initialDecks: Deck[] = [
        {
          id: '1',
          title: 'Biology 101 - Cell Structures',
          description: 'Key components of plant and animal cells.',
          category: 'Science',
          cards: [
            { id: 'c1', question: 'What is the powerhouse of the cell?', answer: 'Mitochondria' },
            { id: 'c2', question: 'What organelle is responsible for photosynthesis?', answer: 'Chloroplast' }
          ],
          mastery: 85,
          lastStudiedAt: Date.now() - 7200000,
          createdAt: Date.now()
        },
        {
          id: '2',
          title: 'Spanish Vocabulary - Week 4',
          description: 'Common verbs and household objects.',
          category: 'Language',
          cards: [
            { id: 'c3', question: 'Translate: To eat', answer: 'Comer' },
            { id: 'c4', question: 'Translate: House', answer: 'Casa' }
          ],
          mastery: 42,
          lastStudiedAt: Date.now() - 86400000,
          createdAt: Date.now()
        },
        {
          id: '3',
          title: 'European History 1900-1950',
          description: 'World wars and major geopolitical shifts.',
          category: 'History',
          cards: [
            { id: 'c5', question: 'When did WWI end?', answer: '1918' }
          ],
          mastery: 0,
          createdAt: Date.now() - 259200000
        }
      ];
      setDecks(initialDecks);
      localStorage.setItem('flashmaster_decks', JSON.stringify(initialDecks));
    }
  }, []);

  // Sync decks to localStorage
  useEffect(() => {
    if (decks.length > 0) {
      localStorage.setItem('flashmaster_decks', JSON.stringify(decks));
    }
  }, [decks]);

  const handleCreateDeck = (title: string, cards: { question: string; answer: string }[]) => {
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      title,
      description: `Imported on ${new Date().toLocaleDateString()}`,
      category: 'General',
      cards: cards.map(c => ({ ...c, id: crypto.randomUUID() })),
      mastery: 0,
      createdAt: Date.now()
    };
    setDecks(prev => [newDeck, ...prev]);
    setIsImportModalOpen(false);
  };

  const startStudying = (deckId: string) => {
    setActiveDeckId(deckId);
    setView(ViewState.STUDY);
  };

  const updateDeckMastery = (deckId: string, mastery: number) => {
    setDecks(prev => prev.map(d => 
      d.id === deckId ? { ...d, mastery, lastStudiedAt: Date.now() } : d
    ));
  };

  const activeDeck = decks.find(d => d.id === activeDeckId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogoClick={() => setView(ViewState.HOME)} />

      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-10 lg:px-40 py-8">
        <div className="w-full max-w-[960px] flex flex-col gap-8">
          
          {view === ViewState.HOME && (
            <>
              <Hero onStartStudying={() => {
                if (decks.length > 0) startStudying(decks[0].id);
                else setIsImportModalOpen(true);
              }} />

              <section>
                <div className="flex items-center justify-between pb-4 pt-2 px-1">
                  <h2 className="text-[#111418] dark:text-white text-[24px] font-bold leading-tight">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ActionCard 
                    title="Import Flashcards"
                    description="Paste text or use AI to instantly create new decks."
                    icon="table_chart"
                    onClick={() => setIsImportModalOpen(true)}
                  />
                  <ActionCard 
                    title="View Library"
                    description="Browse, manage, and edit your collection of decks."
                    icon="style"
                    onClick={() => setView(ViewState.LIBRARY)}
                  />
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between pb-4 pt-2 px-1">
                  <h2 className="text-[#111418] dark:text-white text-[24px] font-bold leading-tight">Recent Activity</h2>
                  <button onClick={() => setView(ViewState.LIBRARY)} className="text-sm font-bold text-primary hover:underline">
                    View all
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {decks.slice(0, 5).map(deck => (
                    <RecentItem 
                      key={deck.id} 
                      deck={deck} 
                      onAction={() => startStudying(deck.id)} 
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {view === ViewState.LIBRARY && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between pb-6">
                <h2 className="text-3xl font-black">Your Decks</h2>
                <button 
                  onClick={() => setIsImportModalOpen(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                  Create New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.length === 0 ? (
                   <div className="col-span-full py-20 text-center text-gray-500">
                      No decks found. Try creating one!
                   </div>
                ) : (
                  decks.map(deck => (
                    <div key={deck.id} className="bg-white dark:bg-[#192633] p-6 rounded-xl border border-gray-200 dark:border-[#324d67] shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                             {deck.category}
                           </span>
                           <span className="text-xs text-gray-400">{deck.cards.length} cards</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{deck.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{deck.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                         <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-gray-400">Mastery:</span>
                            <span className={`text-xs font-black ${deck.mastery > 70 ? 'text-green-500' : deck.mastery > 30 ? 'text-orange-500' : 'text-gray-400'}`}>
                              {deck.mastery}%
                            </span>
                         </div>
                         <button 
                           onClick={() => startStudying(deck.id)}
                           className="bg-primary/10 text-primary px-3 py-1.5 rounded font-bold text-sm hover:bg-primary/20 transition-colors"
                         >
                           Study
                         </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {view === ViewState.STUDY && activeDeck && (
            <FlashcardStudy 
              deck={activeDeck} 
              onClose={() => setView(ViewState.HOME)}
              onFinish={(mastery) => {
                updateDeckMastery(activeDeck.id, mastery);
                setView(ViewState.HOME);
              }}
            />
          )}

        </div>
      </main>

      <Footer />

      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onImport={handleCreateDeck} 
      />
    </div>
  );
};

export default App;
