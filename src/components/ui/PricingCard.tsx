import type { PricingPlan } from '../../types';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
        plan.highlighted
          ? 'bg-gradient-to-b from-brand-blue/10 to-brand-cyan/5 border border-brand-blue/30 shadow-glow-blue hover:shadow-lg'
          : 'glass border border-white/5 hover:border-brand-blue/20 hover:shadow-card-hover'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full shadow-glow-blue">
            Recommandé
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-slate-400 text-sm">{plan.description}</p>
      </div>

      <div className="mb-8">
        {plan.price === null ? (
          <div>
            <span className="text-4xl font-bold text-white">Sur devis</span>
          </div>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-white">{plan.price}€</span>
            <span className="text-slate-400 mb-1.5 text-sm">{plan.period}</span>
          </div>
        )}
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-start gap-3">
            <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
              plan.highlighted ? 'bg-brand-blue/20 text-brand-blue' : 'bg-white/5 text-brand-cyan'
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-slate-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#inscription"
        className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
          plan.highlighted
            ? 'bg-brand-blue hover:bg-blue-500 text-white shadow-glow-blue hover:shadow-lg hover:scale-[1.02]'
            : 'glass border border-white/10 hover:border-brand-blue/40 text-white hover:text-brand-blue'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}
