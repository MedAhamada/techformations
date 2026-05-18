'use client';

import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'error' | 'info';
  text: string;
  delay: number;
}

const defaultLines: TerminalLine[] = [
  { type: 'info', text: '# Déploiement en production...', delay: 0 },
  { type: 'command', text: 'git push origin main', delay: 600 },
  { type: 'output', text: '→ Pushing to github.com/user/app.git', delay: 1000 },
  { type: 'success', text: '✓ Build triggered on GitHub Actions', delay: 1600 },
  { type: 'command', text: 'docker build -t app:latest .', delay: 2400 },
  { type: 'output', text: '→ Building image... [12/12]', delay: 3200 },
  { type: 'success', text: '✓ Image built in 18.3s', delay: 3800 },
  { type: 'command', text: 'docker-compose up -d --pull always', delay: 4600 },
  { type: 'output', text: '→ Pulling nginx:alpine...', delay: 5200 },
  { type: 'output', text: '→ Starting containers...', delay: 5800 },
  { type: 'success', text: '✓ All services healthy', delay: 6400 },
  { type: 'command', text: 'certbot renew --nginx', delay: 7200 },
  { type: 'success', text: '✓ Certificate renewed (Let\'s Encrypt)', delay: 7800 },
  { type: 'info', text: '→ Deployment complete in 23.4s 🚀', delay: 8400 },
];

interface AnimatedTerminalProps {
  lines?: TerminalLine[];
  className?: string;
  autoPlay?: boolean;
}

export default function AnimatedTerminal({ lines = defaultLines, className = '', autoPlay = true }: AnimatedTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(t);
    });

    const reset = setTimeout(() => {
      setVisibleLines([]);
    }, lines[lines.length - 1].delay + 3000);
    timers.push(reset);

    return () => timers.forEach(clearTimeout);
  }, [autoPlay, lines]);

  const getLineStyle = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-white font-mono';
      case 'success': return 'text-green-400 font-mono';
      case 'error': return 'text-red-400 font-mono';
      case 'info': return 'text-slate-400 font-mono';
      case 'output': return 'text-slate-300 font-mono';
      default: return 'text-slate-300 font-mono';
    }
  };

  const getPrompt = (type: TerminalLine['type']) => {
    if (type === 'command') return <span className="text-cyan-400 mr-2">$</span>;
    return null;
  };

  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur shadow-2xl ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-white/8">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-slate-500 font-mono">deploy@production ~</span>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        className="p-5 space-y-1.5 min-h-[240px] max-h-[320px] overflow-y-auto font-mono text-sm"
      >
        {visibleLines.map((line, i) => (
          <div key={i} className={`flex items-start gap-0 animate-fade-in leading-relaxed ${getLineStyle(line.type)}`}>
            {getPrompt(line.type)}
            <span>{line.text}</span>
          </div>
        ))}
        {visibleLines.length < lines.length && (
          <div className="flex items-center">
            <span className="text-cyan-400 mr-2">$</span>
            <span className="terminal-cursor text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
}
