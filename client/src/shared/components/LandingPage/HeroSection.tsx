import type React from "react";
import { DashboardPreview } from "./DashboardPreview";
 
export const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-cool-white">
              Achieve <span className="text-teal-green">Financial Freedom</span>:<br className="hidden lg:inline" />
              Make, Manage, and <span className="text-teal-green">Multiply</span> Your Money
            </h1>

            <p className="text-lg sm:text-xl text-cool-white/80 leading-relaxed max-w-xl">
              The all-in-one FinTech platform powered by AI and Blockchain to simplify budgeting, track expenses, and automate investments.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-teal-green text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-base hover:bg-teal-green/90 transition-all duration-200 transform hover:scale-105">
                Sign Up Free in 30 Seconds
              </button>
              <button className="border border-[#393939] text-cool-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base hover:border-teal-green hover:text-teal-green transition-colors duration-200">
                Watch Demo
              </button>
            </div>

          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="w-full animate-fade-in">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
