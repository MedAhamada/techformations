import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricsCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'green' | 'cyan' | 'orange';
}

const colorMap = {
  blue: { dot: 'bg-blue-400', text: 'text-blue-400', glow: 'shadow-blue-400/20' },
  green: { dot: 'bg-green-400', text: 'text-green-400', glow: 'shadow-green-400/20' },
  cyan: { dot: 'bg-cyan-400', text: 'text-cyan-400', glow: 'shadow-cyan-400/20' },
  orange: { dot: 'bg-orange-400', text: 'text-orange-400', glow: 'shadow-orange-400/20' },
};

export default function MetricsCard({ label, value, change, trend = 'up', color = 'blue' }: MetricsCardProps) {
  const colors = colorMap[color];

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400';

  return (
    <div className={`rounded-xl border border-white/8 bg-slate-900/60 p-5 hover:border-white/15 transition-all duration-300 shadow-lg ${colors.glow}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse-slow`} />
      </div>
      <div className={`text-2xl font-bold mb-1 ${colors.text}`}>{value}</div>
      {change && (
        <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon className="w-3 h-3" />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
