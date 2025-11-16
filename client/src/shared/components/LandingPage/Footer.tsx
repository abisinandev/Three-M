import React from 'react';
import { Twitter, Linkedin, Facebook, Shield, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-deep-charcoal via-[#0a0a0a] to-[#0f0f0f] text-cool-white py-16 px-4 sm:px-6 lg:px-8 border-t border-cool-white/10 mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-1 group">
              <h2 className="text-2xl font-bold tracking-tighter">
                three
                <span className="text-teal-green relative inline-block">
                  M
                  <span className="absolute inset-0 bg-teal-green/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                </span>
              </h2>
            </div>
            <p className="text-sm text-cool-white/60 leading-relaxed max-w-xs">
              Make Money. Manage Money. Multiply Money.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-cool-white/50 hover:text-teal-green transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-green/50 rounded-full p-1"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-cool-white/50 hover:text-teal-green transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-green/50 rounded-full p-1"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-cool-white/50 hover:text-teal-green transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-green/50 rounded-full p-1"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-cool-white mb-4 text-lg">Products</h3>
            <ul className="space-y-3">
              {['Expense Manager', 'Investment Platform', 'AI Trading Bot', 'Portfolio Analytics'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-cool-white/60 hover:text-teal-green transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-cool-white mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press & Media', 'Blog'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-cool-white/60 hover:text-teal-green transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-bold text-cool-white mb-4 text-lg">Legal & Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'Security'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-cool-white/60 hover:text-teal-green transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cool-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-cool-white/50 text-center md:text-left">
            © {currentYear} Three M. All rights reserved. |{' '}
            <span className="text-cool-white/40">Investing involves risk and you may lose money.</span>
          </p>

          <div className="flex items-center gap-4 text-cool-white/60">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-teal-green" />
              <span className="text-xs">Secured by Blockchain</span>
            </div>
            <div className="w-1 h-1 bg-teal-green rounded-full animate-pulse" />
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-teal-green" />
              <span className="text-xs">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};