
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  category: string;
  cards: Flashcard[];
  lastStudiedAt?: number;
  mastery: number; // 0-100
  createdAt: number;
}

export enum ViewState {
  HOME = 'home',
  LIBRARY = 'library',
  STUDY = 'study',
  IMPORT = 'import'
}
