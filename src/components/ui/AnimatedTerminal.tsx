import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'info' | 'warning';
  content: string;
  delay?: number;
}

interface AnimatedTerminalProps {
  lines?: TerminalLine[];
  className?: string;
  title?: string;
}

const defaultLines: TerminalLine[] = [
  { type: 'command', content: 'docker-compose up -d', delay: 0 },
  { type: 'output', content: 'Creating network "app_default" with the default driver', delay: 600 },
  { type: 'output', content: 'Creating volume "app_postgres_data" with default driver', delay: 900 },
  { type: 'output', content: 'Creating app_postgres_1 ... done', delay: 1200 },
  { type: 'output', content: 'Creating app_redis_1 ... done', delay: 1400 },
  { type: 'output', content: 'Creating app_backend_1 ... done', delay: 1600 },
  { type: 'output', content: 'Creating app_nginx_1 ... done', delay: 1800 },
  { type: 'success', content: '✓ All services started successfully', delay: 2200 },
  { type: 'command', content: 'git push origin main', delay: 3000 },
  { type: 'info', content: '→ Triggering CI/CD pipeline...', delay: 3600 },
  { type: 'output', content: '✓ Tests passed (47/47)', delay: 4200 },
  { type: 'output', content: '✓ Docker image built & pushed', delay: 4600 },
  { type: 'output', content: '✓ Deployed to production', delay: 5000 },
  { type: 'success', content: '🚀 Deployment complete — zero downtime', delay: 5400 },
];

const colorMap: Record<TerminalLine['type'], string> = {
  command: 'text-brand-cyan',
  output: 'text-slate-400',
  success: 'text-green-400',
  info: 'text-brand-blue',
  warning: 'text-yellow-400',
};

export default function AnimatedTerminal({ lines = defaultLines, className = '', title = 'terminal' }: AnimatedTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;

    lines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay ?? index * 400);
    });
  }, [inView, lines]);

  return (
    <div ref={ref} className={`rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 ${className}`}>
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-dark-800/80 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-slate-500 text-xs font-mono">{title}</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="bg-dark-950/90 p-5 min-h-[280px] font-mono text-sm overflow-hidden">
        {lines.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="flex items-start gap-2 mb-1.5 animate-fade-in">
            {line.type === 'command' && (
              <span className="text-brand-violet select-none mt-0.5">$</span>
            )}
            {line.type !== 'command' && (
              <span className="text-dark-600 select-none mt-0.5 w-3"> </span>
            )}
            <span className={colorMap[line.type]}>{line.content}</span>
          </div>
        ))}
        {inView && visibleLines < lines.length && (
          <div className="flex items-center gap-2">
            <span className="text-brand-violet">$</span>
            <span className="w-2 h-4 bg-brand-cyan animate-blink inline-block" />
          </div>
        )}
        {visibleLines >= lines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-brand-violet">$</span>
            <span className="w-2 h-4 bg-brand-cyan animate-blink inline-block" />
          </div>
        )}
      </div>
    </div>
  );
}
