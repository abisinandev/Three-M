import React from "react";
import { StatCard } from "./StatCard";

export const DashboardPreview: React.FC = () => {
  return (
    <div className="relative animate-fade-in">
      {/* Main Dashboard Card */}
      <div className="bg rounded-3xl p-6 sm:p-8 border border-cool-white/10 shadow-xl">
        
        {/* Top Dashboard Panel */}
        <div className="bg-deep-charcoal rounded-2xl p-4 sm:p-6 mb-6 border border-cool-white/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-cool-white">
              Portfolio Dashboard
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-teal-green text-sm sm:text-base font-medium">+24.8%</span>
              <div className="w-2 h-2 bg-teal-green rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Graph / Chart */}
          <div className="relative h-36 sm:h-40 mb-6 rounded-lg overflow-hidden bg-gradient-to-t from-teal-green/10 to-transparent">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160">
              <path
                d="M20 140 Q80 120 120 100 T200 60 T280 40"
                stroke="#38A169"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M20 140 Q80 120 120 100 T200 60 T280 40 L280 160 L20 160 Z"
                fill="url(#gradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#38A169', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#38A169', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-3 right-3 bg-teal-green/20 px-3 py-1 rounded-full">
              <span className="text-teal-green text-sm sm:text-base font-medium">
                ₹4,67,890
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard label="Today's Gain" value="+₹8,240" color="text-teal-green" />
            <StatCard label="SIP Active" value="12" color="text-electric-orange" />
            <StatCard label="AI Score" value="9.2/10" color="text-teal-green" />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="bg-deep-charcoal rounded-xl p-3 sm:p-4 border border-cool-white/10">
          {/* Top Bar (like terminal dots) */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-green rounded-full"></div>
            </div>
            <span className="text-cool-white/50 text-xs sm:text-sm">threemapp.com</span>
          </div>

          {/* Dashboard Preview Content */}
          <div className="h-20 sm:h-24 border border-gray-700 rounded flex items-center justify-center">
            <span className="text-white text-sm sm:text-base font-medium">
              Advanced Analytics Dashboard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
