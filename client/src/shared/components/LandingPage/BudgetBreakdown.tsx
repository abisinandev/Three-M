import { AlertTriangle } from "lucide-react";
import { BudgetBar } from "./BudgetBarProps";

export const BudgetBreakdown: React.FC = () => {
  return (
    <div className="rounded-xl p-4 border border-cool-white/20 bg-transparent animate-fade-in">
      <h5 className="text-base font-semibold mb-4 text-center">
        50/30/20 Budget Breakdown
      </h5>

      <div className="space-y-3">
        <BudgetBar
          label="Needs (50%)"
          current="₹45,000"
          total="₹50,000"
          percentage={90}
          color="bg-teal-green"
        />
        <BudgetBar
          label="Wants (30%)"
          current="₹28,500"
          total="₹30,000"
          percentage={95}
          color="bg-electric-orange"
        />
        <BudgetBar
          label="Savings (20%)"
          current="₹20,000"
          total="₹20,000"
          percentage={100}
          color="bg-teal-green"
        />
      </div>

      <div className="mt-4 p-3 bg-electric-orange/5 border border-electric-orange/20 rounded-md">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-electric-orange" />
          <span className="text-electric-orange font-medium text-xs">
            Alert: Wants category at 95% — Consider reducing discretionary spending
          </span>
        </div>
      </div>
    </div>
  );
};
