import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = Deno.env.get('CONTACT_EMAIL');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: 'question' | 'inscription';
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload: ContactPayload = await req.json();
    const { name, email, subject, message, type } = payload;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Champs obligatoires manquants : name, email, message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY non configurée dans les variables d\'environnement Supabase');
    }

    const typeLabel = type === 'inscription' ? 'Demande d\'inscription' : 'Question sur une formation';

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3B82F6;">Nouveau message — ${typeLabel}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Nom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Type</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${typeLabel}</td></tr>
          ${subject ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Sujet</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${subject}</td></tr>` : ''}
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">Reçu depuis le formulaire de contact TechFormations.</p>
      </div>
    `;

    const emailSubject = subject
      ? `[Contact] ${subject} — ${name}`
      : `[Contact] ${typeLabel} — ${name}`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'TechFormations <noreply@kandorlab.com>',
        to: [TO_EMAIL],
        reply_to: email,
        subject: emailSubject,
        html,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Erreur Resend (${res.status}): ${errorBody}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Erreur interne' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
