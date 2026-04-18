// ============================================================
// app/page.tsx
// Página principal de la aplicación Caesar Cipher
// ============================================================

import CipherForm from '@/components/CipherForm';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1b2e 50%, #0f3460 100%)' }}>

      {/* Grid de fondo estilo cyber */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

      {/* Glows decorativos */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7b2fff, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00ff88, transparent)' }} />

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">

        {/* Badge superior */}
        <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase"
          style={{
            borderColor: 'rgba(0,212,255,0.3)',
            background: 'rgba(0,212,255,0.05)',
            color: '#00d4ff'
          }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
          Sistema de Cifrado Activo
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black tracking-tight mb-2"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #b8f0ff 40%, #7b2fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'monospace'
            }}>
            ⬡ CAESAR CIPHER
          </h1>
          <p className="text-sm font-mono tracking-widest"
            style={{ color: '#8baac4' }}>
            CRYPTOGRAPHIC ENGINE v1.0 — ES/EN SUPPORT
          </p>
        </div>

        {/* Tarjeta principal */}
        <div className="w-full max-w-xl rounded-2xl p-px"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.4), rgba(123,47,255,0.2), rgba(0,255,136,0.2))'
          }}>
          <div className="rounded-2xl p-8"
            style={{ background: 'rgba(13,27,46,0.95)', backdropFilter: 'blur(20px)' }}>

            {/* Header de la tarjeta */}
            <div className="flex items-center gap-3 mb-6 pb-4"
              style={{ borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
              </div>
              <span className="text-xs font-mono" style={{ color: '#8baac4' }}>
                caesar_cipher.exe
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
                <span className="text-xs font-mono" style={{ color: '#00ff88' }}>ONLINE</span>
              </div>
            </div>

            <CipherForm />

          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs font-mono tracking-wider"
          style={{ color: 'rgba(139,170,196,0.5)' }}>
          CLASSICAL CRYPTOGRAPHY · INFORMATION SECURITY
        </p>
      </div>
    </main>
  );
}
