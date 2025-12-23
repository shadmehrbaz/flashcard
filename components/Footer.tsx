
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 border-t border-[#e5e7eb] dark:border-[#233648] bg-white dark:bg-[#111a22] mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 lg:px-40 max-w-[960px] mx-auto text-sm text-[#637588] dark:text-[#92adc9]">
        <div className="flex items-center gap-2">
          <div className="size-5 text-primary opacity-50">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336" fill="currentColor" />
            </svg>
          </div>
          <p>© 2024 FlashMaster. Empowering learners everywhere.</p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-colors" href="#">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
