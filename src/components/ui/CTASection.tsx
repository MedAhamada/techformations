import { useInView } from 'react-intersection-observer';

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'default' | 'gradient' | 'minimal';
}

export default function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = 'gradient',
}: CTASectionProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className={`py-24 transition-all duration-700 ${inView ? 'translate-y-0' : 'translate-y-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-3xl p-12 text-center ${
            variant === 'gradient'
              ? 'bg-gradient-to-br from-brand-blue/10 via-dark-800 to-brand-violet/10 border border-brand-blue/20'
              : variant === 'minimal'
              ? 'bg-dark-800/50 border border-white/5'
              : 'bg-dark-800 border border-white/5'
          }`}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-violet/10 blur-3xl rounded-full" />
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">{subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={primaryCta.href} className="btn-primary text-base px-8 py-3.5">
                {primaryCta.label}
              </a>
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn-secondary text-base px-8 py-3.5">
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
