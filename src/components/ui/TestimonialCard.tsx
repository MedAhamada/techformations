import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card flex flex-col gap-4 h-full hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-300">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
        "{testimonial.content}"
      </blockquote>

      {/* Formation tag */}
      <div className="px-2 py-1 text-xs text-brand-blue bg-brand-blue/10 rounded-lg border border-brand-blue/20 self-start">
        {testimonial.formation}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-slate-500 text-xs">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
