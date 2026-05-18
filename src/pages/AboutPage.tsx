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
    title: 'L\'expérience du terrain',
    desc: 'Ce que nous enseignons, nous l\'avons vécu : déploiements en production, incidents à 3h du matin, migrations complexes. Que du retour d\'expérience réel.',
  },
  {
    icon: '❤️',
    title: 'La passion de transmettre',
    desc: 'Après des années à apprendre sur le tas, nous voulons que d\'autres aillent plus vite. Partager ce qu\'on sait est pour nous aussi important que de le savoir.',
  },
  {
    icon: '🔄',
    title: 'Toujours à jour',
    desc: 'Le monde tech évolue vite. Nos formations sont pensées pour rester pertinentes avec les dernières pratiques du secteur.',
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
          <span className="section-badge mb-6">Notre approche</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto">
            Formés par des praticiens,{' '}
            <span className="gradient-text">pour des praticiens</span>
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            TechFormations est née d'une conviction simple : les meilleures formations sont celles créées par des gens qui ont vraiment exercé le métier, sur de vrais projets, avec de vraies contraintes.
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
                  Il y a une fracture dans le monde du développement. D'un côté, des milliers de développeurs qui savent coder, créer des interfaces, connecter des APIs. De l'autre, la production — ce territoire fait de serveurs, de déploiements qui "cassent", de Nginx incompréhensible et de Docker qui fait peur.
                </p>
                <p>
                  On a vécu ça. On a passé des années à construire et opérer des infrastructures réelles, à résoudre des incidents en production, à mettre en place des pipelines CI/CD robustes. Cette expérience, on a décidé de la mettre au service de ceux qui apprennent.
                </p>
                <p>
                  Chaque formation que nous créons suit le même principe : partir d'un problème réel, le résoudre concrètement, avec les vrais outils utilisés par les équipes d'ingénierie aujourd'hui.
                </p>
              </div>
            </SectionWrapper>

            <SectionWrapper>
              <div className="glass rounded-2xl border border-white/10 p-8 space-y-5">
                <h3 className="text-white font-bold text-xl mb-2">Ce qu'on apporte</h3>
                {[
                  {
                    icon: '⚙️',
                    title: '10+ ans d\'expérience terrain',
                    desc: 'Des projets réels à fort trafic, avec de vraies contraintes de production et de vraies deadlines.',
                  },
                  {
                    icon: '🐳',
                    title: 'Docker, Linux, CI/CD au quotidien',
                    desc: 'Des outils pratiqués professionnellement pendant des années, pas appris spécialement pour enseigner.',
                  },
                  {
                    icon: '🚀',
                    title: 'Des projets fil rouge complets',
                    desc: 'Chaque formation s\'articule autour d\'un projet réaliste, de A à Z, comme en conditions professionnelles.',
                  },
                  {
                    icon: '🎓',
                    title: 'Des formations pensées par des ingénieurs',
                    desc: 'Conçues pour aller droit au but : les bonnes pratiques, les vrais problèmes, les vraies solutions.',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
              Une méthode calquée sur ce qui fonctionne vraiment pour apprendre vite et durablement.
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

      {/* Ce qui nous différencie */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Notre différence</span>
            <h2 className="section-title mb-4">Pourquoi nos formations sont différentes</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Pas des enseignants qui ont appris à enseigner. Des ingénieurs qui ont exercé le métier, et qui transmettent ce qu'ils ont réellement pratiqué.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Des outils utilisés en production',
                  desc: 'On n\'invente pas des exercices pédagogiques. On transpose directement ce qu\'on fait dans les projets réels — les mêmes outils, les mêmes configurations, les mêmes arbitrages.',
                  icon: '🛠️',
                },
                {
                  title: 'Des problèmes qu\'on a vraiment résolus',
                  desc: 'Chaque module est issu d\'une situation concrète rencontrée en production. On enseigne les solutions parce qu\'on a d\'abord vécu les problèmes.',
                  icon: '🔍',
                },
                {
                  title: 'Un projet complet, pas des exercices isolés',
                  desc: 'Les formations s\'articulent autour d\'un projet réaliste de bout en bout. Les apprenants repartent avec quelque chose de tangible, pas juste des notes de cours.',
                  icon: '🚢',
                },
                {
                  title: 'Le vrai niveau de complexité',
                  desc: 'On ne simplifie pas à l\'excès. On prépare aux situations réelles, avec leur vraie complexité, pour que la formation reste utile une fois en poste.',
                  icon: '📈',
                },
              ].map(item => (
                <div key={item.title} className="card hover:-translate-y-1 hover:border-brand-blue/20">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      <CTASection
        title="Des formations conçues par des praticiens"
        subtitle="Apprenez avec des ingénieurs qui ont construit et opéré des infrastructures de production pendant des années."
        primaryCta={{ label: 'Voir les formations →', href: '/formations' }}
        secondaryCta={{ label: 'Nous contacter', href: '/contact' }}
      />
    </div>
  );
}
