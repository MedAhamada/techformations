import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as React from "react";

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'} ${className}`}>
      {children}
    </div>
  );
}

type FormType = 'question' | 'inscription';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: FormType;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  type: 'question',
};

const contactOptions: Array<{ id: FormType; label: string; icon: React.ReactNode; desc: string }> = [
  {
    id: 'question',
    label: 'Question sur une formation',
    desc: 'Vous voulez en savoir plus avant de vous inscrire',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'inscription',
    label: 'Demande d\'inscription',
    desc: 'Vous souhaitez vous inscrire à une formation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    if (!form.name.trim()) newErrors.name = 'Requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.message.trim()) newErrors.message = 'Requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const set = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Message envoyé !</h2>
          <p className="text-slate-400 mb-6">
            Merci pour votre message. Nous vous répondrons dans les 24 heures ouvrées.
          </p>
          <a
            href="https://wa.me/33756850927"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 mb-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/15 text-green-400 font-semibold text-sm transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Nous contacter sur WhatsApp
          </a>
          <div className="block">
            <button
              onClick={() => { setSubmitted(false); setForm(initialForm); }}
              className="btn-secondary text-sm"
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-badge mb-6">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            On est là pour{' '}
            <span className="gradient-text">vous aider</span>
          </h1>
          <p className="section-subtitle max-w-xl mx-auto">
            Question sur une formation ou demande d'inscription — contactez-nous, nous répondons sous 24h.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <SectionWrapper className="lg:col-span-2">
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-white font-bold mb-4">Réponse garantie sous 24h</h3>
                  <div className="space-y-3">
                    {[
                      { icon: '📧', text: 'contact@techformations.fr' },
                      { icon: '💬', text: 'Discord communautaire' },
                      { icon: '🕐', text: 'Lun–Ven, 9h–18h' },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-3 text-slate-300 text-sm">
                        <span>{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/33756850927"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl border border-green-500/20 bg-green-500/5 hover:border-green-500/40 hover:bg-green-500/10 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">Contacter via WhatsApp</p>
                    <p className="text-green-400 text-sm font-mono">+33 7 56 85 09 27</p>
                    <p className="text-slate-500 text-xs mt-0.5">Réponse rapide · Lun–Ven</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

              </div>
            </SectionWrapper>

            {/* Right: Form */}
            <SectionWrapper className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Je souhaite…
                  </label>
                  <div className="grid gap-3">
                    {contactOptions.map(opt => (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          form.type === opt.id
                            ? 'border-brand-blue/50 bg-brand-blue/5'
                            : 'border-white/5 bg-white/2 hover:border-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={opt.id}
                          checked={form.type === opt.id}
                          onChange={set('type')}
                          className="sr-only"
                        />
                        <span className={`mt-0.5 flex-shrink-0 ${form.type === opt.id ? 'text-brand-blue' : 'text-slate-400'}`}>
                          {opt.icon}
                        </span>
                        <div>
                          <p className={`font-semibold text-sm ${form.type === opt.id ? 'text-white' : 'text-slate-300'}`}>
                            {opt.label}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5">{opt.desc}</p>
                        </div>
                        <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          form.type === opt.id ? 'border-brand-blue bg-brand-blue' : 'border-white/20'
                        }`}>
                          {form.type === opt.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Prénom & Nom <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Thomas Dupont"
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 text-sm transition-all ${
                        errors.name ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20' : 'border-white/10 focus:border-brand-blue/50 focus:ring-brand-blue/20'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="thomas@exemple.fr"
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 text-sm transition-all ${
                        errors.email ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20' : 'border-white/10 focus:border-brand-blue/50 focus:ring-brand-blue/20'
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Sujet</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="Question sur la formation DevOps…"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    rows={5}
                    placeholder="Décrivez votre demande en détail…"
                    className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 text-sm transition-all resize-none ${
                      errors.message ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20' : 'border-white/10 focus:border-brand-blue/50 focus:ring-brand-blue/20'
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-4 justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-slate-500 text-xs text-center">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité. Réponse garantie sous 24h ouvrées.
                </p>
              </form>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
