import { useInView } from 'react-intersection-observer';
import CTASection from '../components/ui/CTASection';

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

const values = [
  {
    icon: '🎯',
    title: 'La pratique avant tout',
    desc: 'Chaque concept est immédiatement appliqué sur un cas concret. Nous n\'enseignons pas pour la théorie, nous enseignons pour la production.',
  },
  {
    icon: '🏗️',
    title: 'Terrain avant académisme',
    desc: 'Nos formateurs ont tous travaillé sur des projets réels à fort trafic. Pas de cours magistraux, que des retours d\'expérience terrain.',
  },
  {
    icon: '🔄',
    title: 'Toujours à jour',
    desc: 'Le monde tech évolue vite. Nos formations sont mises à jour régulièrement pour rester pertinentes avec les dernières pratiques.',
  },
  {
    icon: '🤝',
    title: 'Communauté d\'abord',
    desc: 'L\'apprentissage est plus efficace en communauté. Nos apprenants partagent, s\'entraident et progressent ensemble.',
  },
];

const timeline = [
  {
    year: '2022',
    title: 'Première formation',
    desc: 'Lancement de la première formation DevOps pour développeurs, après des mois de retours terrain et de tests avec des développeurs.',
  },
  {
    year: '2023',
    title: 'Communauté',
    desc: 'Création de notre Discord et accueil des premiers 500 membres. La communauté devient le cœur de la plateforme.',
  },
  {
    year: '2024',
    title: 'Croissance',
    desc: 'Plus de 800 développeurs formés, note de 4.9/5 maintenue. Développement du catalogue de formations.',
  },
  {
    year: '2025',
    title: 'Expansion',
    desc: 'Lancement de nouvelles formations : Docker avancé, Kubernetes, Architecture Cloud. La plateforme s\'étend.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-badge mb-6">Notre histoire</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto">
            Formés par des praticiens,{' '}
            <span className="gradient-text">pour des praticiens</span>
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            TechFormations est née d'une frustration simple : les formations tech existantes sont trop théoriques et trop éloignées de la réalité du terrain.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionWrapper>
              <span className="section-badge mb-4">Notre mission</span>
              <h2 className="section-title mb-6">
                Former des développeurs{' '}
                <span className="gradient-text">vraiment autonomes</span>
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Il y a une fracture dans le monde du développement. D'un côté, des milliers de développeurs qui savent coder, créer des interfaces, connecter des APIs. De l'autre, la production — ce territoire mystérieux fait de serveurs, de déploiements qui "cassent", de Nginx incompréhensible et de Docker qui fait peur.
                </p>
                <p>
                  TechFormations est née pour combler ce fossé. Notre mission est simple : former des développeurs capables de gérer leur infrastructure de A à Z, sans dépendre d'une autre équipe, sans peur de la prod, avec les outils et méthodes des meilleurs ingénieurs.
                </p>
                <p>
                  Chaque formation que nous créons suit le même principe : partir d'un problème réel, le résoudre concrètement, avec les vrais outils utilisés en production.
                </p>
              </div>
            </SectionWrapper>

            {/* Stats card */}
            <SectionWrapper>
              <div className="glass rounded-2xl border border-white/10 p-8">
                <h3 className="text-white font-bold text-xl mb-6">En chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '847+', label: 'Développeurs formés' },
                    { value: '4.9/5', label: 'Note moyenne' },
                    { value: '94%', label: 'Taux de complétion' },
                    { value: '14j', label: 'Garantie remboursement' },
                    { value: '35h+', label: 'Contenu par formation' },
                    { value: '8', label: 'Formations en cours' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-white/3">
                      <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                      <p className="text-slate-400 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Nos valeurs</span>
            <h2 className="section-title mb-4">Ce en quoi nous croyons</h2>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(v => (
                <div key={v.title} className="card hover:-translate-y-1">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-white font-bold mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Approche pédagogique */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Pédagogie</span>
            <h2 className="section-title mb-4">Notre approche pédagogique</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une méthode éprouvée pour apprendre vite et durablement.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Comprendre le pourquoi',
                  desc: 'Avant chaque outil, on comprend le problème qu\'il résout. Docker n\'est pas présenté comme "un outil à apprendre" mais comme "la solution au problème des environnements différents".',
                  color: 'text-brand-blue',
                },
                {
                  step: '02',
                  title: 'Pratiquer immédiatement',
                  desc: 'Chaque concept est mis en pratique dans les minutes qui suivent l\'explication. Pas de slides pendant des heures — on code, on configure, on déploie.',
                  color: 'text-brand-cyan',
                },
                {
                  step: '03',
                  title: 'Consolider par le projet',
                  desc: 'Le projet fil rouge permet de consolider tous les apprentissages dans un contexte cohérent et réaliste, celui d\'une vraie application en production.',
                  color: 'text-brand-violet',
                },
              ].map(item => (
                <div key={item.step} className="card hover:-translate-y-1 hover:border-brand-blue/20">
                  <div className={`text-5xl font-black mb-4 opacity-30 ${item.color}`}>{item.step}</div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Histoire</span>
            <h2 className="section-title mb-4">Notre parcours</h2>
          </SectionWrapper>

          <SectionWrapper>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue via-brand-cyan to-transparent" />
                <div className="space-y-8">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-6 items-start pl-4">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-glow-blue relative z-10">
                        {item.year.slice(-2)}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-brand-blue font-mono text-sm">{item.year}</span>
                          <h3 className="text-white font-bold">{item.title}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      <CTASection
        title="Rejoignez la communauté TechFormations"
        subtitle="Apprenez aux côtés de centaines de développeurs qui ont fait le même chemin."
        primaryCta={{ label: 'Voir les formations →', href: '/formations' }}
        secondaryCta={{ label: 'Nous contacter', href: '/contact' }}
      />
    </div>
  );
}
