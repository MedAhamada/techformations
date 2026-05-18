import { useState } from 'react';
import type { FormationModule } from '../../types';

interface TimelineModuleProps {
  modules: FormationModule[];
}

const lessonTypeIcons = {
  video: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  practice: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  quiz: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  project: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const lessonTypeColors = {
  video: 'text-brand-blue bg-brand-blue/10',
  practice: 'text-brand-cyan bg-brand-cyan/10',
  quiz: 'text-yellow-400 bg-yellow-400/10',
  project: 'text-brand-violet bg-brand-violet/10',
};

const lessonTypeLabels = {
  video: 'Vidéo',
  practice: 'Pratique',
  quiz: 'Quiz',
  project: 'Projet',
};

export default function TimelineModule({ modules }: TimelineModuleProps) {
  const [openModules, setOpenModules] = useState<Set<string>>(new Set([modules[0]?.id]));

  const toggle = (id: string) => {
    setOpenModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
        <span>{modules.length} modules</span>
        <span>{totalLessons} leçons</span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx={12} cy={12} r={10} />
            <path d="M12 6v6l4 2" strokeLinecap="round" />
          </svg>
          {modules.reduce((acc, m) => acc + parseInt(m.duration), 0)}h de contenu
        </span>
      </div>

      {/* Modules */}
      <div className="space-y-2">
        {modules.map((module, moduleIndex) => {
          const isOpen = openModules.has(module.id);
          return (
            <div
              key={module.id}
              className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                isOpen ? 'border-brand-blue/20 bg-brand-blue/3' : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <button
                onClick={() => toggle(module.id)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/3 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 text-xs font-bold flex-shrink-0">
                  {String(moduleIndex + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-white font-semibold text-sm">{module.title}</span>
                  <span className="text-slate-500 text-xs ml-3">
                    {module.lessons.length} leçons · {module.duration}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[800px]' : 'max-h-0'
                }`}
              >
                <ul className="px-6 pb-4 space-y-1 border-t border-white/5">
                  {module.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-center gap-3 py-2.5 border-b border-white/3 last:border-0">
                      <span className={`flex-shrink-0 p-1.5 rounded-lg ${lessonTypeColors[lesson.type]}`}>
                        {lessonTypeIcons[lesson.type]}
                      </span>
                      <span className="text-slate-300 text-sm flex-1">{lesson.title}</span>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lessonTypeColors[lesson.type]}`}>
                          {lessonTypeLabels[lesson.type]}
                        </span>
                        {lesson.duration && (
                          <span className="text-slate-500 text-xs font-mono">{lesson.duration}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
