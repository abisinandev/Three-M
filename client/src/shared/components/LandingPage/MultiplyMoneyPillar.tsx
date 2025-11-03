import { TrendingUp } from "lucide-react";
import { SIPGrowthChart } from "./SIPGrowthChart";
import { FeaturePoint } from "./FeaturePoint";

export const MultiplyMoneyPillar: React.FC = () => {
  return (
    <div className="mb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <SIPGrowthChart />

        {/* Right Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-green/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-green" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-cool-white">
              MULTIPLY MONEY
            </h3>
          </div>
          <h4 className="text-lg sm:text-2xl font-semibold text-teal-green">
            Effortless Investing. Set Once, Watch it Grow.
          </h4>
          <p className="text-base sm:text-lg text-cool-white/80 leading-relaxed max-w-xl">
            Our Smart SIP Engine automatically invests your money in top-performing mutual funds, leveraging the power of compound interest and dollar-cost averaging.
          </p>
          <div className="space-y-2 sm:space-y-3">
            <FeaturePoint text="Smart SIP Engine with auto-rebalancing" />
            <FeaturePoint text="Real-time Portfolio Visualization" />
            <FeaturePoint text="Immutable Blockchain Ledger for transparency" />
          </div>
        </div>
      </div>
    </div>
  );
};
