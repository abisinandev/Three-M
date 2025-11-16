import { PricingCard } from "./PricingCard";

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-deep-charcoal to-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-teal-green/5 blur-3xl -z-10" />

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-cool-white">
            Unlock Your <span className="text-teal-green">Full Potential</span>
          </h2>
          <p className="text-lg sm:text-xl text-cool-white/70 max-w-2xl mx-auto">
            Choose the plan that accelerates your wealth journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            price="₹0"
            period="/forever"
            description="Perfect for getting started"
            features={[
              "Basic expense tracking with 50/30/20 rule",
              "Investment in top 10 mutual funds",
              "Basic portfolio analytics",
              "Blockchain transaction security",
            ]}
            buttonText="Start Free"
            buttonStyle="bg-cool-white/10 border border-cool-white/20 text-cool-white hover:bg-teal-green/20 hover:border-teal-green/40 hover:text-teal-green transition-all duration-300"
          />

          {/* Premium Plan - Popular */}
          <div className="relative group">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-teal-green text-deep-charcoal px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                MOST POPULAR
              </div>
            </div>

            {/* Glow on hover */}
            <div className="absolute -inset-1 bg-teal-green/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <PricingCard
              title="Premium"
              price="₹999"
              period="/month"
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
              buttonStyle="bg-teal-green text-deep-charcoal font-bold hover:bg-teal-green/90 hover:shadow-xl hover:shadow-teal-green/30 transform hover:scale-105 transition-all duration-300"
              popular
            />
          </div>

          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            price="₹1,999"
            period="/month"
            description="For professionals & investors"
            features={[
              "Full AI automation & portfolio control",
              "Unlimited asset tracking & alerts",
              "Blockchain-backed report storage",
              "Dedicated financial strategist",
              "Exclusive investment insights",
            ]}
            buttonText="Upgrade to Pro"
            buttonStyle="bg-cool-white/10 border border-cool-white/20 text-cool-white hover:bg-teal-green/20 hover:border-teal-green/40 hover:text-teal-green transition-all duration-300"
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-cool-white/50">
            <span className="text-teal-green font-semibold">30-day money-back guarantee</span> • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
};