import { Bot } from "lucide-react";
import { FeaturePoint } from "./FeaturePoint";
import { AIInterface } from "./AIInterface";

export const MakeMoneyPillar: React.FC = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-green/20 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-teal-green" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-cool-white">
              MAKE MONEY
            </h3>
          </div>
          <h4 className="text-lg sm:text-2xl font-semibold text-teal-green">
            Your Personal Financial Co-Pilot. Leveraging AI for Better Returns.
          </h4>
          <p className="text-base sm:text-lg text-cool-white/80 leading-relaxed max-w-xl">
            Our advanced AI analyzes market patterns, your risk profile, and financial goals to provide personalized investment recommendations and execute algorithmic trades.
          </p>
          <div className="space-y-2 sm:space-y-3">
            <FeaturePoint text="AI Chatbot with Natural Language Processing" />
            <FeaturePoint text="Algorithmic Trading with risk management" />
            <FeaturePoint text="Predictive market analysis and alerts" />
          </div>
        </div>

        {/* Right Content */}
        <AIInterface />
      </div>
    </div>
  );
};
