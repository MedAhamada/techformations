interface TechBadgeProps {
  name: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass' | 'outlined';
}

const techColors: Record<string, string> = {
  Docker: 'text-blue-400',
  Linux: 'text-yellow-400',
  'GitHub Actions': 'text-white',
  Nginx: 'text-green-400',
  PostgreSQL: 'text-blue-300',
  React: 'text-cyan-400',
  'Node.js': 'text-green-500',
  Grafana: 'text-orange-400',
  Sentry: 'text-violet-400',
  Kubernetes: 'text-blue-500',
  Terraform: 'text-violet-500',
  AWS: 'text-yellow-500',
  GCP: 'text-blue-400',
  Redis: 'text-red-400',
  Prometheus: 'text-orange-500',
  TypeScript: 'text-blue-400',
  Python: 'text-yellow-300',
  Ansible: 'text-red-500',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1.5',
  md: 'px-3 py-1.5 text-sm gap-2',
  lg: 'px-4 py-2 text-base gap-2',
};

export default function TechBadge({ name, size = 'md', variant = 'default' }: TechBadgeProps) {
  const colorClass = techColors[name] ?? 'text-slate-300';

  const variantClass =
    variant === 'glass'
      ? 'glass border border-white/10'
      : variant === 'outlined'
      ? 'border border-white/10 bg-transparent'
      : 'bg-white/5 border border-white/5';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${sizeClasses[size]} ${variantClass} ${colorClass}`}
    >
      <TechDot color={colorClass} />
      {name}
    </span>
  );
}

function TechDot({ color }: { color: string }) {
  return (
    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color.replace('text-', 'bg-')}`} />
  );
}
