import { useInView } from 'react-intersection-observer';

interface PipelineStep {
  label: string;
  icon: React.ReactNode;
  color: string;
  status?: 'success' | 'running' | 'pending';
}

const steps: PipelineStep[] = [
  {
    label: 'Code',
    color: 'from-slate-600 to-slate-500',
    status: 'success',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Build',
    color: 'from-blue-600 to-blue-500',
    status: 'success',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Test',
    color: 'from-cyan-600 to-cyan-500',
    status: 'success',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Docker',
    color: 'from-blue-500 to-indigo-500',
    status: 'success',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x={2} y={7} width={20} height={15} rx={2} />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" />
        <line x1={12} y1={12} x2={12} y2={16} strokeLinecap="round" />
        <line x1={8} y1={14} x2={16} y2={14} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Deploy',
    color: 'from-green-600 to-emerald-500',
    status: 'running',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Monitor',
    color: 'from-violet-600 to-violet-500',
    status: 'pending',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const statusColors = {
  success: 'text-green-400',
  running: 'text-brand-blue animate-pulse',
  pending: 'text-slate-600',
};

const statusIcons = {
  success: '✓',
  running: '◉',
  pending: '○',
};

export default function PipelineAnimation({ className = '' }: { className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className={`rounded-xl border border-white/10 bg-dark-800/60 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-dark-900/50">
        <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
        <span className="text-slate-400 text-xs font-mono">ci/cd — pipeline #247 · main</span>
        <span className="ml-auto text-brand-blue text-xs font-mono font-semibold">running</span>
      </div>

      {/* Pipeline steps */}
      <div className="p-5">
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center flex-shrink-0">
              {/* Step */}
              <div
                className={`flex flex-col items-center gap-2 transition-all duration-500 ${
                  inView ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Icon circle */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg ${
                    step.status === 'running' ? 'animate-glow-pulse' : ''
                  } ${step.status === 'pending' ? 'opacity-30' : ''}`}
                >
                  {step.icon}
                </div>
                {/* Label */}
                <span className={`text-xs font-medium ${step.status === 'pending' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {step.label}
                </span>
                {/* Status */}
                <span className={`text-xs font-mono ${statusColors[step.status ?? 'pending']}`}>
                  {statusIcons[step.status ?? 'pending']}
                </span>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex items-center mx-1 mt-[-20px] flex-shrink-0">
                  <div
                    className={`h-0.5 w-8 transition-all duration-700 ${
                      inView ? 'opacity-100' : 'opacity-0'
                    } ${
                      steps[index + 1].status === 'pending'
                        ? 'bg-white/10'
                        : 'bg-gradient-to-r from-white/30 to-white/10'
                    }`}
                    style={{ transitionDelay: `${(index + 0.5) * 120}ms` }}
                  />
                  <svg
                    className={`w-2 h-2 flex-shrink-0 -ml-0.5 ${
                      steps[index + 1].status === 'pending' ? 'text-white/10' : 'text-white/30'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <path d="M0 0l8 4-8 4z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Log preview */}
        <div className="mt-4 rounded-lg bg-dark-950/80 border border-white/5 p-3 font-mono text-xs">
          <div className="text-green-400">✓ Tests passed (47/47) in 12.4s</div>
          <div className="text-green-400">✓ Docker image built: myapp:sha-abc123</div>
          <div className="text-green-400">✓ Image pushed to registry</div>
          <div className="text-brand-blue animate-pulse">◉ Deploying to production...</div>
        </div>
      </div>
    </div>
  );
}
