import { CheckCircle } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  popular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonStyle,
  popular,
}) => (
  <div
    className={`relative bg-card-dark/70 backdrop-blur-md rounded-2xl p-6 border ${
      popular ? "border-teal-green shadow-lg" : "border-cool-white/10"
    } hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-teal-green text-deep-charcoal px-4 py-1 rounded-full text-xs font-bold tracking-wide">
          MOST POPULAR
        </span>
      </div>
    )}

    <div className="text-center">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-cool-white/70 text-sm mb-6">{description}</p>
      <div className="text-4xl font-extrabold mb-6">
        {price}
        <span className="text-sm text-cool-white/50 font-medium"> /month</span>
      </div>
    </div>

    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="w-4 h-4 text-teal-green mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-cool-white/90 text-sm leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${buttonStyle}`}
    >
      {buttonText}
    </button>
  </div>
);
