import { PricingCard } from "./PricingCard";

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-deep-charcoal/60 to-card-dark/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">
            Unlock Your <span className="text-teal-green">Full Potential</span>
          </h2>
          <p className="text-lg text-cool-white/70">
            Choose the plan that accelerates your wealth journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Free"
            price="₹0"
            description="Perfect for getting started"
            features={[
              "Basic expense tracking with 50/30/20 rule",
              "Investment in top 10 mutual funds",
              "Basic portfolio analytics",
              "Blockchain transaction security",
            ]}
            buttonText="Start Free"
            buttonStyle="bg-cool-white/10 text-cool-white hover:bg-teal-green/20"
          />

          <PricingCard
            title="Premium"
            price="₹999"
            description="For serious wealth builders"
            features={[
              "Advanced AI expense insights & predictions",
              "Access to 500+ mutual funds & ETFs",
              "AI Trading Algorithms with risk management",
              "Advanced Analytics & custom reports",
              "Priority support & financial advisor",
              "Tax optimization strategies",
            ]}
            buttonText="Go Premium"
            buttonStyle="bg-teal-green text-deep-charcoal hover:bg-teal-green/90"
            popular
          />

          <PricingCard
            title="Pro"
            price="₹1999"
            description="For professionals & investors"
            features={[
              "Full AI automation & portfolio control",
              "Unlimited asset tracking & alerts",
              "Blockchain-backed report storage",
              "Dedicated financial strategist",
              "Exclusive investment insights",
            ]}
            buttonText="Upgrade to Pro"
            buttonStyle="bg-cool-white/10 text-cool-white hover:bg-teal-green/20"
          />
        </div>
      </div>
    </section>
  );
};
