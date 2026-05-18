import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedTerminal from '../components/ui/AnimatedTerminal';
import TimelineModule from '../components/ui/TimelineModule';
import FAQAccordion from '../components/ui/FAQAccordion';
// import TestimonialCard from '../components/ui/TestimonialCard'; // hidden
import TechBadge from '../components/ui/TechBadge';
import CTASection from '../components/ui/CTASection';
import InscriptionForm from '../components/ui/InscriptionForm';
import { getFormationBySlug } from '../data/formations';
// import { testimonials } from '../data/testimonials'; // hidden
import { faqDevops } from '../data/faq';

const formation = getFormationBySlug('devops-pour-developpeurs')!;

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
  { type: 'command' as const, text: 'cat docker-compose.yml | grep services', delay: 0 },
  { type: 'output' as const, text: 'services:', delay: 500 },
  { type: 'output' as const, text: '  frontend:    # React → port 80/443 via Nginx', delay: 700 },
  { type: 'output' as const, text: '  backend:     # Node.js API → port 3000', delay: 900 },
  { type: 'output' as const, text: '  postgres:    # PostgreSQL → port 5432', delay: 1100 },
  { type: 'output' as const, text: '  redis:       # Cache → port 6379', delay: 1300 },
  { type: 'output' as const, text: '  nginx:       # Reverse proxy + HTTPS', delay: 1500 },
  { type: 'output' as const, text: '  prometheus:  # Métriques', delay: 1700 },
  { type: 'output' as const, text: '  grafana:     # Dashboards', delay: 1900 },
  { type: 'success' as const, text: '✓ Architecture complète opérationnelle', delay: 2500 },
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
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="section-badge">DevOps</span>
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full">
                  Nouveauté
                </span>
                <span className="px-2 py-0.5 text-xs font-medium text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 rounded-full">
                  Formation en direct
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Formation DevOps{' '}
                <span className="gradient-text">pour développeurs</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed mb-6">
                Apprenez à déployer, sécuriser et industrialiser vos projets web de A à Z — en sessions live avec le formateur sur Google Meet ou Zoom.
              </p>

              {/* Quick info */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: '⏱️', text: '35h de formation' },
                  { icon: '📹', text: 'Google Meet / Zoom' },
                  { icon: '👥', text: 'Groupes restreints' },
                  { icon: '🖥️', text: 'VPS fourni' },
                  { icon: '🛠️', text: 'Exercices en direct' },
                  { icon: '🚀', text: 'Projet réel inclus' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 px-3 py-2 glass rounded-lg border border-white/5 text-sm text-slate-300">
                    <span>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
                {formation.nextSession && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-green-400/30 bg-green-400/10 text-sm text-green-400 font-medium">
                    <span>📅</span>
                    Prochaine session : {formation.nextSession}
                  </div>
                )}
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
              <AnimatedTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Format section — live online */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Sessions en direct',
                  desc: 'Chaque module est une session live sur Google Meet ou Zoom. Vous pratiquez en temps réel avec le formateur et posez vos questions immédiatement.',
                  color: 'text-brand-cyan',
                  bg: 'bg-brand-cyan/10',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Groupes restreints',
                  desc: 'Les sessions sont limitées à un petit nombre de participants pour garantir un suivi personnalisé et des échanges de qualité avec le formateur.',
                  color: 'text-brand-blue',
                  bg: 'bg-brand-blue/10',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'VPS fourni & pratique immédiate',
                  desc: 'Un VPS Linux dédié vous est fourni pendant toute la formation. Chaque concept est appliqué en direct sur votre serveur, pendant la session, avec le formateur.',
                  color: 'text-brand-violet',
                  bg: 'bg-brand-violet/10',
                },
              ].map(card => (
                <div key={card.title} className="card hover:-translate-y-1 hover:border-brand-blue/20">
                  <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
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
                Cette formation résout ces problèmes, un par un, avec des cas concrets en direct.
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
            <h2 className="section-title mb-4">Ce que vous allez apprendre</h2>
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
            <h2 className="section-title mb-4">Le programme complet</h2>
            <p className="section-subtitle max-w-2xl">
             {/* {formation.modules?.length} modules, {formation.modules?.reduce((acc, m) => acc + m.lessons.length, 0)} séances, 35h de formation en direct avec le formateur.*/}
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
                Tout au long de la formation, vous construisez et déployez une application complète en direct avec le formateur : frontend React, backend Node.js, base de données PostgreSQL, reverse proxy Nginx avec HTTPS, pipeline CI/CD et monitoring.
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
              <AnimatedTerminal lines={architectureTerminalLines} />
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper className="text-center mb-12">
            <span className="section-badge mb-4">Compétences</span>
            <h2 className="section-title mb-4">Ce que vous serez capable de faire</h2>
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
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white text-3xl font-bold shadow-glow-blue">
                    AM
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{formation.instructor?.name}</h3>
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

      {/* Testimonials — hidden, re-enable when ready */}
      {/* <section className="py-20">
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
      </section> */}

      {/* Inscription form */}
      <section className="py-20 bg-dark-800/30 border-y border-white/5" id="inscription">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: info */}
            <SectionWrapper className="lg:col-span-2">
              <span className="section-badge mb-4">Inscription</span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Réservez votre place
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Les sessions sont en groupes restreints. Remplissez le formulaire et notre équipe vous recontacte sous 24h avec les dates disponibles et les détails pratiques.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    title: `Prochaine session : ${formation.nextSession ?? 'à venir'}`,
                    desc: 'Les places sont limitées — inscrivez-vous pour réserver la vôtre.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    title: 'Google Meet ou Zoom',
                    desc: 'Lien de connexion envoyé avant chaque session',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    title: 'Paiement sécurisé',
                    desc: 'Facturation après confirmation de votre place',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-slate-500 text-sm mb-3">Vous préférez échanger directement ?</p>
                <a
                  href="https://wa.me/33756850927"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 text-green-400 text-sm font-medium transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp — +33 7 56 85 09 27
                </a>
              </div>
            </SectionWrapper>

            {/* Right: form */}
            <SectionWrapper className="lg:col-span-3">
              <div className="glass rounded-2xl border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">Formulaire d'inscription</h3>
                <InscriptionForm formation="Formation DevOps pour développeurs" />
              </div>
            </SectionWrapper>
          </div>
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
        subtitle="Gérez votre infrastructure de production avec confiance et sérénité."
        primaryCta={{ label: 'Réserver ma place →', href: '#inscription' }}
        secondaryCta={{ label: 'Voir le programme', href: '#programme' }}
      />
    </div>
  );
}
