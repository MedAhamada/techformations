import { GitBranch } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import MetricsCard from '../components/ui/MetricsCard';
import FormationCard from '../components/ui/FormationCard';
// import TestimonialCard from '../components/ui/TestimonialCard'; // hidden
import CTASection from '../components/ui/CTASection';
import PipelineAnimation from '../components/ui/PipelineAnimation';
import TechBadge from '../components/ui/TechBadge';
import { formations } from '../data/formations';
// import { testimonials } from '../data/testimonials'; // hidden

function SectionWrapper({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'} ${className}`}
    >
      {children}
    </div>
  );
}

const technologies = [
  'Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'Nginx', 'PostgreSQL',
  'React', 'Node.js', 'Grafana', 'Terraform', 'AWS', 'Prometheus', 'Ansible', 'Redis',
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Orienté terrain',
    desc: 'Chaque concept est appliqué immédiatement sur un projet réel. Pas de théorie pour rien.',
    color: 'text-brand-blue',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Projets concrets',
    desc: 'Chaque formation inclut un projet fil rouge complet que vous pouvez mettre dans votre portfolio.',
    color: 'text-brand-cyan',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Communauté active',
    desc: 'Accès à notre Slack privé dédié avec plusieurs développeurs qui apprennent ensemble.',
    color: 'text-brand-violet',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Mises à jour incluses',
    desc: "Le monde DevOps évolue vite. Votre accès inclut toutes les futures mises à jour gratuitement.",
    color: 'text-green-400',
  },
];


export default function HomePage() {
  const featuredFormation = formations.find(f => f.featured && f.available);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-violet/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 rounded-full animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                Nouvelle formation disponible
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-slide-up">
                Des formations techniques{' '}
                <span className="gradient-text">conçues pour les développeurs</span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-slide-up animation-delay-200">
                Apprenez à construire, déployer et industrialiser vos projets avec des formations concrètes orientées terrain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-400">
                <a href="/formations" className="btn-primary text-base px-8 py-4">
                  Découvrir les formations
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="/formations/devops-pour-developpeurs" className="btn-secondary text-base px-8 py-4">
                  Voir la formation DevOps
                </a>
              </div>

              {/* Stats */}
              {/*
              <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start animate-fade-in animation-delay-600">
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-white">847+</p>
                  <p className="text-slate-500 text-xs">développeurs formés</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-white">4.9</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-white">94%</p>
                  <p className="text-slate-500 text-xs">complétion</p>
                </div>
              </div>
              */}
            </div>

            {/* Right: dashboard — hidden on mobile, decorative */}
            <div className="hidden lg:block relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-xl" />

                <div className="relative space-y-3">
                  {/* Metrics row */}
                  <div className="grid grid-cols-2 gap-3 min-w-0">
                    <MetricsCard label="Déploiements" value="24/7" change="+12% ce mois" trend="up" color="green" />
                    <MetricsCard label="Uptime" value="99.9%" change="30j sans incident" trend="up" color="cyan" />
                  </div>

                  {/* Terminal */}
                  {/*<AnimatedTerminal className="w-full" />*/}

                  {/* Pipeline */}
                  <div className="glass rounded-2xl p-4">
                    <div className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                      Pipeline CI/CD
                    </div>
                    <PipelineAnimation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why platform */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-16">
            <span className="section-badge mb-4">Notre approche</span>
            <h2 className="section-title mb-4">
              Pourquoi TechFormations ?
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des formations pensées par des praticiens, pour des praticiens. Pas d'académisme, que de la valeur concrète.
            </p>
          </SectionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <SectionWrapper key={feature.title} className="animation-delay-200" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="card h-full hover:-translate-y-1">
                  <div className={`mb-4 ${feature.color}`}>{feature.icon}</div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline section */}
      <section className="py-24 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionWrapper>
              <span className="section-badge mb-4">Pipeline CI/CD</span>
              <h2 className="section-title mb-4">
                De votre éditeur à la{' '}
                <span className="gradient-text">production automatisée</span>
              </h2>
              <p className="section-subtitle mb-6">
                Apprenez à construire des pipelines CI/CD robustes qui testent, buildent et déploient vos applications automatiquement à chaque commit.
              </p>
              <ul className="space-y-3">
                {[
                  'GitHub Actions de A à Z',
                  'Tests automatisés intégrés',
                  'Build & push d\'images Docker',
                  'Déploiement zero-downtime',
                  'Rollback automatique en cas d\'erreur',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionWrapper>
            <SectionWrapper>
              <PipelineAnimation />
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Formations section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-badge mb-4">Catalogue</span>
              <h2 className="section-title">Nos formations</h2>
            </div>
            <a href="/formations" className="btn-ghost text-brand-blue hover:text-white">
              Voir tout le catalogue →
            </a>
          </SectionWrapper>

          {/* Featured */}
          {featuredFormation && (
            <SectionWrapper className="mb-6">
              <FormationCard formation={featuredFormation} variant="featured" />
            </SectionWrapper>
          )}

          {/* Coming soon grid */}
          <SectionWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {formations.filter(f => f.comingSoon).slice(0, 4).map(f => (
                <FormationCard key={f.id} formation={f} />
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 border-y border-white/5 bg-dark-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-10">
            <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold mb-4">Technologies enseignées</p>
            <h2 className="text-2xl font-bold text-white">Le stack professionnel complet</h2>
          </SectionWrapper>
          <SectionWrapper>
            <div className="flex flex-wrap gap-3 justify-center">
              {technologies.map(tech => (
                <TechBadge key={tech} name={tech} size="md" variant="glass" />
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Testimonials — hidden, re-enable when ready */}
      {/* <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Témoignages</span>
            <h2 className="section-title mb-4">Ce que disent nos apprenants</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Des développeurs de tous niveaux qui ont transformé leur rapport à la production.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-4 glass rounded-2xl border border-white/5">
              <div>
                <p className="text-4xl font-bold text-white">4.9</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-left">
                <p className="text-white font-semibold">312 avis vérifiés</p>
                <p className="text-slate-400 text-sm">Sur la formation DevOps</p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section> */}

      {/* CTA */}
      <CTASection
        title="Prêt à maîtriser votre stack de production ?"
        subtitle="Transformez votre rapport à la production avec des formations concrètes et orientées terrain."
        primaryCta={{ label: 'Voir les formations →', href: '/formations' }}
        secondaryCta={{ label: 'En savoir plus', href: '/a-propos' }}
      />
    </div>
  );
}
