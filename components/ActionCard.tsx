
import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group flex items-start gap-4 rounded-xl border border-[#e5e7eb] dark:border-[#324d67] bg-white dark:bg-[#192633] p-6 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-[#203040] transition-all text-left"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef6ff] dark:bg-[#111a22] text-primary group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-[#637588] dark:text-[#92adc9] text-sm font-normal leading-normal">{description}</p>
      </div>
      <div className="ml-auto self-center text-[#92adc9] opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </button>
  );
};

export default ActionCard;
