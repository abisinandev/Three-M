import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-black text-cool-white py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          <div>
            <h2 className="text-xl font-semibold mb-3 tracking-tight">
              three<span className="text-teal-green">M</span>
            </h2>
            <p className="text-neutral-500 mb-4">
              Make Money. Manage Money. Multiply Money.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-cool-white/60 hover:text-teal-green transition-colors duration-200"
                aria-label="Twitter"
              >
                {/* SVG Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {/* path */}
                </svg>
              </a>
              <a
                href="#"
                className="text-cool-white/60 hover:text-teal-green transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {/* path */}
                </svg>
              </a>
              <a
                href="#"
                className="text-cool-white/60 hover:text-teal-green transition-colors duration-200"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {/* path */}
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-cool-white">Products</h3>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Expense Manager</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Investment Platform</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">AI Trading Bot</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Portfolio Analytics</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-cool-white">Company</h3>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Press & Media</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-cool-white">Legal & Support</h3>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-green transition-colors duration-200">Security</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-cool-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Three M. All rights reserved. | Investing involves risk and you may lose money.
          </p>
          <div className="flex items-center space-x-4">
            <span>Secured by Blockchain</span>
            <span className="w-1 h-1 bg-teal-green rounded-full animate-pulse"></span>
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
