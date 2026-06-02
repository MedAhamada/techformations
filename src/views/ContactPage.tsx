import { useInView } from 'react-intersection-observer';
import * as React from "react";
// Form and supabase imports kept for when email service is restored
// import { useState } from 'react';
// import { supabase } from '@/lib/supabase.ts';

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'} ${className}`}>
      {children}
    </div>
  );
}

type FormType = 'question' | 'inscription';

// Kept for when the form is restored
// interface ContactForm {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
//   type: FormType;
// }
// const initialForm: ContactForm = { name: '', email: '', subject: '', message: '', type: 'question' };

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
            Question sur une formation ou demande d'inscription — contactez-nous directement sur WhatsApp.
          </p>
        </div>
      </section>

      {/* WhatsApp contact */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {contactOptions.map(opt => (
              <SectionWrapper key={opt.id}>
                <a
                  href={opt.id === 'inscription'
                    ? "https://wa.me/33756850927?text=Bonjour%2C%20je%20souhaite%20m'inscrire%20%C3%A0%20une%20formation."
                    : "https://wa.me/33756850927?text=Bonjour%2C%20j'ai%20une%20question%20sur%20vos%20formations."}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/2 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-200 group h-full"
                >
                  <span className="text-brand-blue group-hover:text-green-400 transition-colors">
                    {opt.icon}
                  </span>
                  <div>
                    <p className="text-white font-semibold mb-1">{opt.label}</p>
                    <p className="text-slate-500 text-sm">{opt.desc}</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 text-green-400 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Écrire sur WhatsApp
                  </span>
                </a>
              </SectionWrapper>
            ))}
          </div>

          <SectionWrapper>
            <a
              href="https://wa.me/33756850927"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl border border-green-500/20 bg-green-500/5 hover:border-green-500/40 hover:bg-green-500/10 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-lg">+33 7 56 85 09 27</p>
                <p className="text-slate-400 text-sm">Réponse garantie sous 24h ouvrées · Lun–Ven, 9h–18h</p>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </SectionWrapper>
        </div>
      </section>

      {/*
        FORMULAIRE DE CONTACT — caché temporairement, service d'envoi d'email non opérationnel.
        Pour le réactiver :
        1. Décommenter les imports useState/supabase en haut du fichier
        2. Restaurer le state (form, submitted, submitting, errors, errorMessage)
        3. Restaurer les handlers (validate, handleSubmit, set)
        4. Réintégrer le JSX du formulaire dans la section "Contact form"
      */}
    </div>
  );
}
