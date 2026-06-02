import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = 'med.ahamada@gmail.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InscriptionPayload {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  niveau: string;
  message?: string;
  formation: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload: InscriptionPayload = await req.json();
    const { prenom, nom, email, telephone, entreprise, niveau, message, formation } = payload;

    if (!prenom || !nom || !email || !formation) {
      return new Response(
        JSON.stringify({ error: 'Champs obligatoires manquants : prenom, nom, email, formation' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY non configurée dans les variables d\'environnement Supabase');
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3B82F6;">Nouvelle inscription — ${formation}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Prénom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${prenom}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${nom}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          ${telephone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${telephone}</td></tr>` : ''}
          ${entreprise ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Entreprise</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${entreprise}</td></tr>` : ''}
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Niveau actuel</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${niveau}</td></tr>
          ${message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${message}</td></tr>` : ''}
        </table>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">Reçu depuis le site TechFormations — formation : <strong>${formation}</strong></p>
      </div>
    `;

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
        subject: `[Inscription] ${formation} — ${prenom} ${nom}`,
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
    console.error('send-inscription-email error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Erreur interne' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
