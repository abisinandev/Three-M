import { MakeMoneyPillar } from "./MakeMoneyPillar";
import { ManageMoneyPillar } from "./ManageMoneyPillar";
import { MultiplyMoneyPillar } from "./MultiplyMoneyPillar";

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-deep-charcoal/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cool-white mb-2">
            Master Your Financial Journey
          </h2>
          <p className="text-base sm:text-lg text-cool-white/70">
            Three pillars of wealth building, powered by cutting-edge technology
          </p>
        </div>

        <div className="space-y-16">
          <ManageMoneyPillar   />
          <MultiplyMoneyPillar   />
          <MakeMoneyPillar   />
        </div>
      </div>
    </section>
  );
};