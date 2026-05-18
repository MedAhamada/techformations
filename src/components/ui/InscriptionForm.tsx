import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface InscriptionFormProps {
  formation: string;
}

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  niveau: string;
  message: string;
}

const initialForm: FormState = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  entreprise: '',
  niveau: '',
  message: '',
};

const niveaux = [
  'Développeur débutant (< 1 an)',
  'Développeur junior (1–3 ans)',
  'Développeur confirmé (3–5 ans)',
  'Développeur senior (5+ ans)',
];

export default function InscriptionForm({ formation }: InscriptionFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.prenom.trim()) next.prenom = 'Requis';
    if (!form.nom.trim()) next.nom = 'Requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Email invalide';
    if (!form.niveau) next.niveau = 'Requis';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase.functions.invoke('send-inscription-email', {
        body: { ...form, formation },
      });

      if (error) throw error;

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.',
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Demande envoyée !</h3>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Nous avons bien reçu votre demande d'inscription. Notre équipe vous contactera dans les 24 heures pour confirmer votre place et vous communiquer les détails de la session.
        </p>
        <a
          href="https://wa.me/33756850927"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 font-medium text-sm transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Nous contacter sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Prénom"
          required
          error={errors.prenom}
          input={
            <input
              type="text"
              value={form.prenom}
              onChange={set('prenom')}
              placeholder="Thomas"
              className={inputClass(!!errors.prenom)}
            />
          }
        />
        <Field
          label="Nom"
          required
          error={errors.nom}
          input={
            <input
              type="text"
              value={form.nom}
              onChange={set('nom')}
              placeholder="Dupont"
              className={inputClass(!!errors.nom)}
            />
          }
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Email professionnel"
          required
          error={errors.email}
          input={
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="thomas@exemple.fr"
              className={inputClass(!!errors.email)}
            />
          }
        />
        <Field
          label="Téléphone"
          input={
            <input
              type="tel"
              value={form.telephone}
              onChange={set('telephone')}
              placeholder="+33 6 00 00 00 00"
              className={inputClass(false)}
            />
          }
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Entreprise"
          input={
            <input
              type="text"
              value={form.entreprise}
              onChange={set('entreprise')}
              placeholder="Ma Startup SAS (optionnel)"
              className={inputClass(false)}
            />
          }
        />
        <Field
          label="Votre niveau actuel"
          required
          error={errors.niveau}
          input={
            <select
              value={form.niveau}
              onChange={set('niveau')}
              className={inputClass(!!errors.niveau)}
            >
              <option value="">Sélectionner…</option>
              {niveaux.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          }
        />
      </div>

      <Field
        label="Message ou question (optionnel)"
        input={
          <textarea
            value={form.message}
            onChange={set('message')}
            rows={3}
            placeholder="Décrivez votre contexte, vos objectifs, ou posez une question…"
            className={`${inputClass(false)} resize-none`}
          />
        }
      />

      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full btn-primary py-4 justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {status === 'submitting' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer ma demande d'inscription
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="text-slate-500 text-xs text-center">
        Votre demande est transmise directement à notre équipe. Réponse garantie sous 24h ouvrées.
      </p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 text-sm transition-all ${
    hasError
      ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20'
      : 'border-white/10 focus:border-brand-blue/50 focus:ring-brand-blue/20'
  }`;
}

function Field({
  label,
  required,
  error,
  input,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {input}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
