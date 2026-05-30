import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import FormationCard from '../components/ui/FormationCard';
import CTASection from '../components/ui/CTASection';
import { formations, categories } from '../data/formations';
import type { FormationCategory } from '../types';

const levelFilters = ['tous', 'débutant', 'intermédiaire', 'avancé'] as const;

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'} ${className}`}>
      {children}
    </div>
  );
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<FormationCategory | 'all'>('all');
  const [activeLevel, setActiveLevel] = useState<string>('tous');
  const [search, setSearch] = useState('');

  const filtered = formations.filter(f => {
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    const matchLevel = activeLevel === 'tous' || f.level === activeLevel;
    const matchSearch =
      search === '' ||
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.tagline.toLowerCase().includes(search.toLowerCase()) ||
      f.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchLevel && matchSearch;
  });

  const available = filtered.filter(f => f.available);
  const comingSoon = filtered.filter(f => f.comingSoon);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="section-badge mb-6">Catalogue</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Toutes nos{' '}
              <span className="gradient-text">formations techniques</span>
            </h1>
            <p className="section-subtitle mb-10">
              Des parcours de formations complets pour maîtriser le DevOps, le cloud et l'industrialisation logicielle. 1 formation disponible, 7 en cours de création.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une formation, une technologie..."
                className="w-full pl-11 pr-4 py-3.5 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-x-auto">
            {/* Category filters */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as FormationCategory | 'all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-brand-blue text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10 hidden sm:block flex-shrink-0" />

            {/* Level filters */}
            <div className="flex items-center gap-2">
              {levelFilters.map(level => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap capitalize ${
                    activeLevel === level
                      ? 'bg-white/10 text-white'
                      : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="ml-auto text-slate-500 text-sm flex-shrink-0">
              {filtered.length} formation{filtered.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Available formations */}
      {available.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionWrapper>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <h2 className="text-xl font-bold text-white">Disponibles maintenant</h2>
                <span className="px-2 py-0.5 text-xs font-semibold text-green-400 bg-green-400/10 rounded-full">
                  {available.length}
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {available.map(f => (
                  <FormationCard key={f.id} formation={f} />
                ))}
              </div>
            </SectionWrapper>
          </div>
        </section>
      )}

      {/* Coming soon */}
      {comingSoon.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionWrapper>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <h2 className="text-xl font-bold text-white">Prochainement</h2>
                <span className="px-2 py-0.5 text-xs font-semibold text-brand-blue bg-brand-blue/10 rounded-full">
                  {comingSoon.length} en cours
                </span>
              </div>

              {/* Coming soon notice */}
              <div className="mb-8 p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm">Ces formations sont en cours de création</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Inscrivez-vous à la newsletter pour être notifié en priorité lors des lancements.{' '}
                    <a href="#newsletter" className="text-brand-blue hover:underline">Recevoir les alertes</a>
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {comingSoon.map(f => (
                  <FormationCard key={f.id} formation={f} />
                ))}
              </div>
            </SectionWrapper>
          </div>
        </section>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <section className="py-24 text-center">
          <div className="max-w-md mx-auto px-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Aucun résultat</h3>
            <p className="text-slate-400">Essayez d'autres filtres ou termes de recherche.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); setActiveLevel('tous'); }}
              className="mt-4 btn-ghost text-brand-blue"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 border-t border-white/5" id="newsletter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="max-w-2xl mx-auto text-center">
              <span className="section-badge mb-4">Newsletter</span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Soyez notifié des nouvelles formations
              </h2>
              <p className="text-slate-400 mb-8">
                Rejoignez 2,000+ développeurs qui reçoivent nos contenus tech et sont alertés en priorité lors des nouveaux lancements.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={e => { e.preventDefault(); alert('Merci pour votre inscription !'); }}
              >
                <input
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue/50 text-sm"
                />
                <button type="submit" className="btn-primary text-sm px-6 py-3 whitespace-nowrap">
                  M'alerter →
                </button>
              </form>
            </div>
          </SectionWrapper>
        </div>
      </section>

      <CTASection
        title="La formation DevOps est disponible dès maintenant"
        subtitle="Commencez votre parcours DevOps avec la formation la mieux notée de la plateforme."
        primaryCta={{ label: "Voir la formation DevOps →", href: "/formations/devops-pour-developpeurs" }}
      />
    </div>
  );
}
