import type React from "react";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  popular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = "",
  description,
  features,
  buttonText,
  buttonStyle,
  popular,
}) => {
  return (
    <div
      className={`
        relative backdrop-blur-xl bg-deep-charcoal/40 border border-cool-white/10 
        rounded-3xl p-8 transition-all duration-500 group
        ${popular ? "ring-2 ring-teal-green/50 shadow-2xl shadow-teal-green/10 scale-105" : "hover:shadow-xl hover:shadow-teal-green/5"}
        hover:-translate-y-2 hover:border-teal-green/30
      `}
    >
      {/* Optional Glow */}
      {popular && (
        <div className="absolute inset-0 bg-teal-green/10 rounded-3xl blur-3xl -z-10 animate-pulse" />
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-cool-white mb-2">{title}</h3>
          <p className="text-cool-white/60 text-sm">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-bold text-cool-white">{price}</span>
          <span className="text-cool-white/60">{period}</span>
        </div>

        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-cool-white/80 text-sm">
              <svg className="w-5 h-5 text-teal-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`
            w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300
            ${buttonStyle}
          `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};