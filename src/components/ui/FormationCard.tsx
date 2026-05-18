import { Link } from 'react-router-dom';
import type { Formation } from '../../types';

interface FormationCardProps {
  formation: Formation;
  variant?: 'default' | 'compact' | 'featured';
}

const levelColors = {
  débutant: 'text-green-400 bg-green-400/10 border-green-400/20',
  intermédiaire: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  avancé: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const categoryLabels: Record<string, string> = {
  devops: 'DevOps',
  cloud: 'Cloud',
  containers: 'Containers',
  cicd: 'CI/CD',
  monitoring: 'Monitoring',
  security: 'Sécurité',
  linux: 'Linux',
  architecture: 'Architecture',
};

export default function FormationCard({ formation, variant = 'default' }: FormationCardProps) {
  if (!formation.available || formation.comingSoon) {
    return <ComingSoonCard formation={formation} />;
  }

  if (variant === 'featured') {
    return <FeaturedCard formation={formation} />;
  }

  return (
    <Link
      to={`/formations/${formation.slug}`}
      className="group block card hover:border-brand-blue/30 transition-all duration-300"
    >
      {/* Top */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="section-badge text-xs">{categoryLabels[formation.category]}</span>
          {formation.badge && (
            <span className="px-2 py-0.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full">
              {formation.badge}
            </span>
          )}
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${levelColors[formation.level]}`}>
          {formation.level}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors mb-2">
        {formation.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {formation.tagline}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {formation.technologies.slice(0, 5).map(tech => (
          <span key={tech} className="px-2 py-0.5 text-xs text-slate-400 bg-white/5 rounded border border-white/5">
            {tech}
          </span>
        ))}
        {formation.technologies.length > 5 && (
          <span className="px-2 py-0.5 text-xs text-slate-500 bg-white/5 rounded border border-white/5">
            +{formation.technologies.length - 5}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={10} />
              <path d="M12 6v6l4 2" strokeLinecap="round" />
            </svg>
            {formation.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ formation }: { formation: Formation }) {
  return (
    <Link
      to={`/formations/${formation.slug}`}
      className="group block relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5 p-8 hover:border-brand-blue/40 transition-all duration-300 hover:shadow-glow-blue"
    >
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl group-hover:bg-brand-blue/20 transition-all duration-500" />

      {/* Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="section-badge">Featured</span>
        {formation.badge && (
          <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full">
            {formation.badge}
          </span>
        )}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
        {formation.title}
      </h3>
      <p className="text-slate-300 leading-relaxed mb-6">{formation.tagline}</p>

      {/* Outcomes */}
      <ul className="space-y-2 mb-6">
        {formation.outcomes.slice(0, 4).map(o => (
          <li key={o} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
            {o}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6 mb-6 text-sm">
        <span className="text-slate-400">{formation.duration}</span>
      </div>

      <div className="flex items-center justify-end">
        <span className="btn-primary text-sm">
          Voir la formation →
        </span>
      </div>
    </Link>
  );
}

function ComingSoonCard({ formation }: { formation: Formation }) {
  return (
    <div className="block card opacity-60 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <span className="section-badge text-xs">{categoryLabels[formation.category]}</span>
        <span className="px-2 py-0.5 text-xs font-semibold text-slate-400 bg-white/5 rounded-full border border-white/10">
          Prochainement
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-300 mb-2">{formation.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{formation.tagline}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {formation.technologies.slice(0, 4).map(tech => (
          <span key={tech} className="px-2 py-0.5 text-xs text-slate-600 bg-white/3 rounded border border-white/5">
            {tech}
          </span>
        ))}
      </div>
      <div className="pt-4 border-t border-white/5">
        <span className="text-sm text-slate-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx={12} cy={12} r={10} />
            <path d="M12 6v6l4 2" strokeLinecap="round" />
          </svg>
          {formation.duration}
        </span>
      </div>
    </div>
  );
}
