import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedTerminal from '../components/ui/AnimatedTerminal';
import TimelineModule from '../components/ui/TimelineModule';
import FAQAccordion from '../components/ui/FAQAccordion';
import PricingCard from '../components/ui/PricingCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import TechBadge from '../components/ui/TechBadge';
import CTASection from '../components/ui/CTASection';
import { getFormationBySlug } from '../data/formations';
import { testimonials } from '../data/testimonials';
import { faqDevops } from '../data/faq';
import type { PricingPlan } from '../types';

const formation = getFormationBySlug('devops-pour-developpeurs')!;

const pricingPlans: PricingPlan[] = [
  {
    id: 'solo',
    name: 'Individuel',
    price: 499,
    period: 'accès à vie',
    description: 'Pour les développeurs qui veulent apprendre à leur rythme',
    features: [
      'Accès à vie à tous les modules',
      '35h de contenu vidéo HD',
      'Projet fil rouge complet',
      'Accès à la communauté Discord',
      'Mises à jour incluses à vie',
      'Certificat de complétion',
      'Support par email',
    ],
    cta: 'Rejoindre la formation',
  },
  {
    id: 'pro',
    name: 'Pro + Coaching',
    price: 799,
    period: 'accès à vie',
    description: 'Pour aller plus vite avec un accompagnement personnalisé',
    highlighted: true,
    features: [
      'Tout ce qui est dans Individuel',
      '2 sessions de coaching 1:1 (60min)',
      'Code review du projet final',
      'Feedback personnalisé',
      'Support prioritaire',
      'Accès aux futures formations (-30%)',
      'Badge LinkedIn certifié',
    ],
    cta: 'Rejoindre avec coaching',
  },
  {
    id: 'team',
    name: 'Entreprise',
    price: null,
    period: 'par équipe',
    description: 'Pour former plusieurs développeurs avec un contenu personnalisé',
    features: [
      'Licences pour 5+ développeurs',
      'Contenu adapté à votre stack',
      'Sessions live pour l\'équipe',
      'Tableau de bord d\'avancement',
      'Facture et prise en charge OPCO',
      'Support dédié',
      'Formation intra-entreprise possible',
    ],
    cta: 'Demander un devis',
  },
];

const problems = [
  { icon: '🐳', text: 'Docker vous semble compliqué à configurer en production' },
  { icon: '🖥️', text: 'Les serveurs Linux vous intimident' },
  { icon: '🔒', text: 'Configurer HTTPS proprement est un mystère' },
  { icon: '⚙️', text: 'Nginx est obscur et mal compris' },
  { icon: '🚀', text: 'Vous déployez encore à la main, en FTP ou SSH' },
  { icon: '🔥', text: 'Des bugs apparaissent en production que vous n\'aviez pas en local' },
  { icon: '📊', text: 'Vous n\'avez aucune visibilité sur ce qui se passe sur vos serveurs' },
  { icon: '😰', text: 'Vous avez peur de casser la prod à chaque déploiement' },
];

const skills = [
  { icon: '🖥️', title: 'Déployer sur VPS', desc: 'Ubuntu, DigitalOcean, Hetzner, OVH — vous maîtrisez tout.' },
  { icon: '🐳', title: 'Dockeriser une app', desc: 'Images, Dockerfile, Docker Compose, optimisation.' },
  { icon: '⚡', title: 'Automatiser le déploiement', desc: 'Pipeline CI/CD complet avec GitHub Actions.' },
  { icon: '🔒', title: 'Gérer HTTPS', desc: 'Let\'s Encrypt, Nginx, certificats SSL/TLS.' },
  { icon: '📊', title: 'Superviser une app', desc: 'Grafana, Prometheus, Sentry, alertes.' },
  { icon: '🛡️', title: 'Sécuriser un serveur', desc: 'Hardening, firewall, fail2ban, secrets.' },
  { icon: '💾', title: 'Gérer les sauvegardes', desc: 'Stratégie 3-2-1, scripts automatisés, restauration.' },
  { icon: '🔄', title: 'Zéro downtime', desc: 'Rolling updates, health checks, rollback auto.' },
];

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

const architectureTerminalLines = [
  { type: 'command' as const, content: 'cat docker-compose.yml | grep services', delay: 0 },
  { type: 'output' as const, content: 'services:', delay: 500 },
  { type: 'output' as const, content: '  frontend:    # React → port 80/443 via Nginx', delay: 700 },
  { type: 'output' as const, content: '  backend:     # Node.js API → port 3000', delay: 900 },
  { type: 'output' as const, content: '  postgres:    # PostgreSQL → port 5432', delay: 1100 },
  { type: 'output' as const, content: '  redis:       # Cache → port 6379', delay: 1300 },
  { type: 'output' as const, content: '  nginx:       # Reverse proxy + HTTPS', delay: 1500 },
  { type: 'output' as const, content: '  prometheus:  # Métriques', delay: 1700 },
  { type: 'output' as const, content: '  grafana:     # Dashboards', delay: 1900 },
  { type: 'success' as const, content: '✓ Architecture complète opérationnelle', delay: 2500 },
];

export default function DevOpsFormationPage() {
  const [showAllModules, setShowAllModules] = useState(false);

  if (!formation) {
    return <div className="min-h-screen flex items-center justify-center text-white">Formation non trouvée</div>;
  }

  const displayedModules = showAllModules ? formation.modules! : formation.modules!.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="section-badge">DevOps</span>
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full">
                  Bestseller
                </span>
                <span className="px-2 py-0.5 text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
                  débutant DevOps accepté
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Formation DevOps{' '}
                <span className="gradient-text">pour développeurs</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed mb-6">
                Apprenez à déployer, sécuriser et industrialiser vos projets web de A à Z.
              </p>

              {/* Quick info */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: '⏱️', text: '35h de contenu' },
                  { icon: '🌐', text: 'En ligne' },
                  { icon: '🛠️', text: '100% pratique' },
                  { icon: '🚀', text: 'Projet réel inclus' },
                  { icon: '🏆', text: 'Certifié' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 px-3 py-2 glass rounded-lg border border-white/5 text-sm text-slate-300">
                    <span>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-white font-bold ml-1">4.9</span>
                </div>
                <span className="text-slate-400 text-sm">(312 avis) · 847 développeurs formés</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#inscription" className="btn-primary text-base px-8 py-4">
                  Réserver ma place
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#programme" className="btn-secondary text-base px-8 py-4">
                  Voir le programme
                </a>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="lg:col-span-2">
              <AnimatedTerminal title="deploy.sh" />
            </div>
          </div>
        </div>
      </section>

      {/* Problems section */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vous savez développer…{' '}
              <span className="text-slate-400">mais la production reste compliquée ?</span>
            </h2>
            <p className="text-slate-400">
              Ces problèmes sont ceux que rencontrent la plupart des développeurs avant de maîtriser le DevOps.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:border-red-500/20 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{problem.icon}</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{problem.text}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20">
              <span className="text-2xl">✅</span>
              <p className="text-white font-semibold">
                Cette formation résout ces problèmes, un par un, avec des cas concrets.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="mb-12">
            <span className="section-badge mb-4">Objectifs</span>
            <h2 className="section-title mb-4">
              Ce que vous allez apprendre
            </h2>
            <p className="section-subtitle max-w-2xl">
              À la fin de cette formation, vous serez capable de gérer une infrastructure de production complète en toute autonomie.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { topic: 'Linux & serveurs', desc: 'Navigation, gestion des processus, systèmes de fichiers, scripts shell' },
                { topic: 'Réseau & DNS', desc: 'IP, ports, firewall, SSH, résolution de noms' },
                { topic: 'Docker & containerisation', desc: 'Images, Dockerfile, Docker Compose, optimisation, volumes' },
                { topic: 'Nginx & reverse proxy', desc: 'Configuration, HTTPS, Let\'s Encrypt, load balancing' },
                { topic: 'GitHub Actions (CI/CD)', desc: 'Workflows, build, test, déploiement automatisé' },
                { topic: 'Monitoring & observabilité', desc: 'Grafana, Prometheus, Sentry, alertes' },
                { topic: 'Sécurité serveur', desc: 'Hardening, secrets, fail2ban, audit' },
                { topic: 'Sauvegardes & résilience', desc: 'Stratégies, scripts, restauration testée' },
              ].map(item => (
                <div key={item.topic} className="flex items-start gap-4 p-5 glass rounded-xl border border-white/5 hover:border-brand-blue/20 transition-colors group">
                  <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-blue/30 transition-colors">
                    <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{item.topic}</p>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Programme */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5" id="programme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="mb-10">
            <span className="section-badge mb-4">Programme</span>
            <h2 className="section-title mb-4">Le contenu complet</h2>
            <p className="section-subtitle max-w-2xl">
              {formation.modules?.length} modules, {formation.modules?.reduce((acc, m) => acc + m.lessons.length, 0)} leçons, 35h de contenu progressif.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            {formation.modules && (
              <>
                <TimelineModule modules={displayedModules} />
                {!showAllModules && formation.modules.length > 5 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowAllModules(true)}
                      className="btn-ghost text-brand-blue hover:text-white"
                    >
                      Afficher les {formation.modules.length - 5} autres modules ↓
                    </button>
                  </div>
                )}
              </>
            )}
          </SectionWrapper>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Technologies</span>
            <h2 className="section-title mb-4">Le stack professionnel</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Les outils utilisés par les équipes DevOps dans les meilleures entreprises tech.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="flex flex-wrap gap-4 justify-center">
              {formation.technologies.map(tech => (
                <TechBadge key={tech} name={tech} size="lg" variant="glass" />
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Projet fil rouge */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionWrapper>
              <span className="section-badge mb-4">Projet fil rouge</span>
              <h2 className="section-title mb-4">
                Une application fullstack en{' '}
                <span className="gradient-text">production réelle</span>
              </h2>
              <p className="section-subtitle mb-6">
                Tout au long de la formation, vous construisez et déployez une application complète : frontend React, backend Node.js, base de données PostgreSQL, cache Redis, reverse proxy Nginx avec HTTPS, pipeline CI/CD et monitoring.
              </p>
              <div className="space-y-3">
                {[
                  'Architecture microservices dockerisée',
                  'CI/CD avec GitHub Actions',
                  'HTTPS automatique via Let\'s Encrypt',
                  'Monitoring Grafana + Prometheus',
                  'Tracking d\'erreurs avec Sentry',
                  'Sauvegardes automatisées',
                  'Déploiement zero-downtime',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <AnimatedTerminal lines={architectureTerminalLines} title="docker-compose.yml" />
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Compétences</span>
            <h2 className="section-title mb-4">
              Ce que vous serez capable de faire
            </h2>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map(skill => (
                <div key={skill.title} className="card hover:-translate-y-1 hover:border-brand-blue/20 text-center">
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h3 className="text-white font-bold mb-2">{skill.title}</h3>
                  <p className="text-slate-400 text-sm">{skill.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="max-w-3xl mx-auto">
              <span className="section-badge mb-6">Votre formateur</span>
              <div className="flex items-start gap-8 flex-col md:flex-row">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white text-3xl font-bold shadow-glow-blue">
                    AM
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {formation.instructor?.name}
                  </h3>
                  <p className="text-brand-blue font-medium mb-4">{formation.instructor?.title}</p>
                  <p className="text-slate-300 leading-relaxed mb-6">{formation.instructor?.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {formation.instructor?.specialties.map(s => (
                      <span key={s} className="px-3 py-1 text-sm text-slate-300 bg-white/5 rounded-lg border border-white/5">
                        {s}
                      </span>
                    ))}
                    <span className="px-3 py-1 text-sm text-brand-blue bg-brand-blue/10 rounded-lg border border-brand-blue/20">
                      {formation.instructor?.experience} d'expérience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Témoignages</span>
            <h2 className="section-title mb-4">Ils ont suivi la formation</h2>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 6).map(t => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5" id="inscription">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Tarifs</span>
            <h2 className="section-title mb-4">Choisissez votre formule</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Tous les accès sont à vie et incluent les mises à jour. Garantie satisfait ou remboursé 14 jours.
            </p>
          </SectionWrapper>

          <SectionWrapper>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map(plan => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper className="mt-8 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-4 glass rounded-2xl border border-white/5">
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Garantie 14 jours satisfait ou remboursé
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Paiement sécurisé
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-violet" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Facture disponible
              </span>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">FAQ</span>
            <h2 className="section-title mb-4">Questions fréquentes</h2>
          </SectionWrapper>

          <SectionWrapper>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={faqDevops} />
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Passez du développement à la maîtrise complète de la production"
        subtitle="Rejoignez 847+ développeurs qui gèrent leur infrastructure avec confiance et sérénité."
        primaryCta={{ label: 'Je rejoins la formation →', href: '#inscription' }}
        secondaryCta={{ label: 'Voir le programme', href: '#programme' }}
      />
    </div>
  );
}
