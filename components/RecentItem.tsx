
import React from 'react';
import { Deck } from '../types';

interface RecentItemProps {
  deck: Deck;
  onAction: () => void;
}

const RecentItem: React.FC<RecentItemProps> = ({ deck, onAction }) => {
  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getIcon = () => {
    switch(deck.category) {
      case 'Science': return 'science';
      case 'Language': return 'language';
      case 'History': return 'history';
      default: return 'menu_book';
    }
  };

  const getColorClass = () => {
    switch(deck.category) {
      case 'Science': return 'bg-blue-100 text-blue-600 dark:bg-[#233648] dark:text-blue-400';
      case 'Language': return 'bg-orange-100 text-orange-600 dark:bg-[#233648] dark:text-orange-400';
      case 'History': return 'bg-purple-100 text-purple-600 dark:bg-[#233648] dark:text-purple-400';
      default: return 'bg-green-100 text-green-600 dark:bg-[#233648] dark:text-green-400';
    }
  };

  return (
    <div 
      onClick={onAction}
      className="flex items-center gap-4 rounded-lg border border-[#e5e7eb] dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getColorClass()}`}>
        <span className="material-symbols-outlined text-[20px]">{getIcon()}</span>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <h4 className="text-[#111418] dark:text-white text-base font-bold truncate group-hover:text-primary transition-colors">{deck.title}</h4>
        <p className="text-[#637588] dark:text-[#92adc9] text-xs">
          {deck.lastStudiedAt ? `Last studied ${getTimeAgo(deck.lastStudiedAt)}` : 'Not started'} • {deck.mastery}% Mastery
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex h-1.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${deck.mastery > 60 ? 'bg-green-500' : 'bg-orange-500'}`} 
            style={{ width: `${deck.mastery}%` }}
          ></div>
        </div>
        <button className="flex items-center justify-center h-8 px-3 rounded bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all">
          {deck.lastStudiedAt ? 'Resume' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default RecentItem;
