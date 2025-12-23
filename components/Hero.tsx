
import React from 'react';

interface HeroProps {
  onStartStudying: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartStudying }) => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 md:p-10 rounded-xl bg-white dark:bg-[#192633] border border-[#e5e7eb] dark:border-[#324d67] shadow-sm overflow-hidden">
      <div className="flex flex-col gap-4 max-w-lg">
        <h1 className="text-[#111418] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          Master Your <span className="text-primary">Knowledge</span>
        </h1>
        <p className="text-[#637588] dark:text-[#92adc9] text-lg font-normal leading-relaxed">
          Import your data and turn raw information into powerful memory aids in seconds. Designed for serious learners.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <button 
            onClick={onStartStudying}
            className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20 transition-all transform active:scale-95"
          >
            Start Studying
          </button>
          <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-[#dce0e5] dark:border-[#324d67] text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-[#233648] text-base font-bold leading-normal tracking-[0.015em] transition-colors">
            How it works
          </button>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center p-8">
        <div className="relative w-64 h-48 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(43,140,238,0.1),transparent)]"></div>
          <div className="absolute w-40 h-28 bg-white dark:bg-[#111a22] rounded-lg shadow-xl border border-[#e5e7eb] dark:border-[#324d67] transform -rotate-6 z-10 flex items-center justify-center">
            <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="absolute w-40 h-28 bg-white dark:bg-[#111a22] rounded-lg shadow-xl border border-[#e5e7eb] dark:border-[#324d67] transform rotate-3 z-20 flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
              <span className="material-symbols-outlined text-primary text-3xl">school</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
