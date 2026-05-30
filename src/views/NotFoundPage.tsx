export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Terminal-style 404 */}
        <div className="rounded-xl overflow-hidden border border-white/10 mb-10 text-left">
          <div className="flex items-center gap-1.5 px-4 py-2 bg-dark-800 border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="mx-auto text-slate-500 text-xs font-mono">terminal</span>
          </div>
          <div className="bg-dark-950 p-6 font-mono text-sm space-y-2">
            <div className="flex gap-2">
              <span className="text-brand-violet">$</span>
              <span className="text-brand-cyan">curl</span>
              <span className="text-slate-400">https://techformations.kandorlab.com/...</span>
            </div>
            <div className="text-red-400">Error: 404 Not Found</div>
            <div className="text-slate-500">{"→ Page introuvable"}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-brand-violet">$</span>
              <span className="w-2 h-4 bg-brand-cyan animate-blink inline-block" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page introuvable</h2>
        <p className="text-slate-400 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" className="btn-primary">
            Retour à l'accueil
          </a>
          <a href="/formations" className="btn-secondary">
            Voir les formations
          </a>
        </div>
      </div>
    </div>
  );
}
