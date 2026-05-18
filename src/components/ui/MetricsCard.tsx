import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface Metric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  color: 'blue' | 'green' | 'violet' | 'cyan' | 'red';
  icon: React.ReactNode;
}

interface MetricsCardProps {
  className?: string;
}

const metrics: Metric[] = [
  {
    label: 'Uptime',
    value: '99.98%',
    change: '+0.02%',
    positive: true,
    color: 'green',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Déploiements',
    value: '1,247',
    change: '+32 cette semaine',
    positive: true,
    color: 'blue',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Latence P95',
    value: '42ms',
    change: '-8ms',
    positive: true,
    color: 'cyan',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx={12} cy={12} r={10} />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Erreurs',
    value: '0.01%',
    change: '-0.04%',
    positive: true,
    color: 'violet',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const colorClasses = {
  blue: 'text-brand-blue bg-brand-blue/10',
  green: 'text-green-400 bg-green-400/10',
  violet: 'text-brand-violet bg-brand-violet/10',
  cyan: 'text-brand-cyan bg-brand-cyan/10',
  red: 'text-red-400 bg-red-400/10',
};

function SparkLine({ color }: { color: string }) {
  const points = [20, 35, 28, 45, 38, 52, 48, 60, 55, 68, 72, 65, 78, 82];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const normalize = (v: number) => 30 - ((v - min) / (max - min)) * 25;
  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * 80} ${normalize(p)}`)
    .join(' ');

  return (
    <svg viewBox="0 0 80 35" className="w-16 h-8 opacity-70" preserveAspectRatio="none">
      <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MetricsCard({ className = '' }: MetricsCardProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 200);
  }, [inView]);

  return (
    <div ref={ref} className={`rounded-xl border border-white/10 bg-dark-800/60 backdrop-blur-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-dark-900/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-slate-400 text-xs font-mono">monitoring.dashboard</span>
        </div>
        <span className="text-slate-600 text-xs font-mono">live</span>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-px bg-white/5">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={`bg-dark-800/80 p-4 transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`p-1.5 rounded-lg ${colorClasses[metric.color]}`}>
                {metric.icon}
              </span>
              <SparkLine
                color={
                  metric.color === 'blue' ? '#3B82F6' :
                  metric.color === 'green' ? '#4ade80' :
                  metric.color === 'cyan' ? '#06B6D4' : '#8B5CF6'
                }
              />
            </div>
            <div className="text-xl font-bold text-white font-mono mb-0.5">{metric.value}</div>
            <div className="text-slate-500 text-xs">{metric.label}</div>
            {metric.change && (
              <div className={`text-xs mt-1 ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pipeline status */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-slate-500 text-xs">Last deployment</span>
          <span className="ml-auto text-green-400 text-xs font-mono">✓ success</span>
        </div>
        <div className="flex items-center gap-1">
          {['build', 'test', 'docker', 'deploy', 'smoke'].map((step, i) => (
            <div key={step} className="flex items-center gap-1 flex-1">
              <div className="h-1 flex-1 rounded-full bg-green-400/80" />
              {i < 4 && <div className="w-1 h-1 rounded-full bg-white/10 flex-shrink-0" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {['build', 'test', 'docker', 'deploy', 'smoke'].map(step => (
            <span key={step} className="text-slate-600 text-[9px] font-mono">{step}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
