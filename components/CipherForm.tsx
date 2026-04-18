// ============================================================
// components/CipherForm.tsx
// Componente principal del formulario de cifrado César
// ============================================================

'use client';

import { useState } from 'react';
import { CipherRequest, CipherResponse, CipherKey } from '@/types/cipher';

const VALID_KEYS: CipherKey[] = [3, 4, 5, 6, 7];

// Estilos reutilizables
const inputStyle = {
  background: 'rgba(0,212,255,0.05)',
  border: '1px solid rgba(0,212,255,0.2)',
  color: '#e8f4fd',
  outline: 'none',
};

const labelStyle = {
  color: '#8baac4',
  fontFamily: 'monospace',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
};

export default function CipherForm() {
  const [form, setForm] = useState<CipherRequest>({
    text: '',
    key: 3,
    language: 'es',
    mode: 'encrypt',
  });
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/cipher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data: CipherResponse = await res.json();
      if (data.success) setResult(data.result);
      else setError(data.error || 'Error desconocido');
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setForm({ ...form, text: '' });
    setResult('');
    setError('');
  };

  return (
    <div className="w-full space-y-5">

      {/* Selector de Modo */}
      <div className="flex rounded-xl overflow-hidden p-1 gap-1"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,255,0.15)' }}>
        {(['encrypt', 'decrypt'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setForm({ ...form, mode: m })}
            className="flex-1 py-2.5 rounded-lg font-mono text-sm font-bold tracking-widest uppercase transition-all duration-300"
            style={form.mode === m ? {
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(123,47,255,0.2))',
              border: '1px solid rgba(0,212,255,0.5)',
              color: '#00d4ff',
              boxShadow: '0 0 20px rgba(0,212,255,0.15)',
            } : {
              color: '#8baac4',
              border: '1px solid transparent',
            }}
          >
            {m === 'encrypt' ? '⬡ Cifrar' : '⬢ Descifrar'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Textarea */}
        <div>
          <label className="block mb-2" style={labelStyle}>
            {form.mode === 'encrypt' ? '▸ Plaintext Input' : '▸ Ciphertext Input'}
          </label>
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder={form.mode === 'encrypt'
              ? 'INGRESA EL MENSAJE A CIFRAR...'
              : 'INGRESA EL MENSAJE A DESCIFRAR...'}
            className="w-full h-28 p-3 rounded-xl resize-none font-mono text-sm transition-all duration-200"
            style={{
              ...inputStyle,
              '::placeholder': { color: 'rgba(139,170,196,0.4)' },
            } as React.CSSProperties}
            onFocus={(e) => {
              e.target.style.border = '1px solid rgba(0,212,255,0.6)';
              e.target.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(0,212,255,0.2)';
              e.target.style.boxShadow = 'none';
            }}
            required
          />
        </div>

        {/* Clave e Idioma */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2" style={labelStyle}>▸ Cipher Key</label>
            <select
              value={form.key}
              onChange={(e) => setForm({ ...form, key: Number(e.target.value) as CipherKey })}
              className="w-full p-2.5 rounded-xl font-mono text-sm"
              style={inputStyle}
            >
              {VALID_KEYS.map((k) => (
                <option key={k} value={k} style={{ background: '#0d1b2e' }}>
                  KEY_{k.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2" style={labelStyle}>▸ Alphabet</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value as CipherRequest['language'] })}
              className="w-full p-2.5 rounded-xl font-mono text-sm"
              style={inputStyle}
            >
              <option value="es" style={{ background: '#0d1b2e' }}>ES — 27 chars [+Ñ]</option>
              <option value="en" style={{ background: '#0d1b2e' }}>EN — 26 chars</option>
            </select>
          </div>
        </div>

        {/* Info del alfabeto */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
          style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.15)', color: '#00ff88' }}>
          <span>◈</span>
          <span>
            {form.language === 'es'
              ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ — 27 símbolos'
              : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ — 26 símbolos'}
          </span>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !form.text.trim()}
            className="flex-1 py-3 rounded-xl font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              background: loading || !form.text.trim()
                ? 'rgba(0,212,255,0.1)'
                : 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(123,47,255,0.25))',
              border: '1px solid rgba(0,212,255,0.4)',
              color: loading || !form.text.trim() ? '#8baac4' : '#00d4ff',
              boxShadow: loading || !form.text.trim() ? 'none' : '0 0 25px rgba(0,212,255,0.15)',
              cursor: loading || !form.text.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '⟳ PROCESANDO...' : form.mode === 'encrypt' ? '⬡ EJECUTAR CIFRADO' : '⬢ EJECUTAR DESCIFRADO'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-3 rounded-xl font-mono text-sm transition-all duration-200"
            style={{
              background: 'rgba(255,95,86,0.1)',
              border: '1px solid rgba(255,95,86,0.3)',
              color: '#ff8b85',
            }}
          >
            ✕
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-mono"
          style={{ background: 'rgba(255,95,86,0.1)', border: '1px solid rgba(255,95,86,0.3)', color: '#ff8b85' }}>
          ⚠ ERROR: {error}
        </div>
      )}

      {/* Resultado */}
      {result && (
        <div className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.05)' }}>
          <div className="flex items-center justify-between px-4 py-2"
            style={{ borderBottom: '1px solid rgba(0,255,136,0.15)', background: 'rgba(0,255,136,0.08)' }}>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#00ff88' }}>
              ◈ {form.mode === 'encrypt' ? 'Output — Ciphertext' : 'Output — Plaintext'}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs font-mono px-3 py-1 rounded-lg transition-all duration-200"
              style={{
                background: copied ? 'rgba(0,255,136,0.2)' : 'rgba(0,255,136,0.1)',
                border: '1px solid rgba(0,255,136,0.3)',
                color: '#00ff88',
              }}
            >
              {copied ? '✓ COPIADO' : '⎘ COPIAR'}
            </button>
          </div>
          <div className="p-4">
            <p className="font-mono text-lg font-bold break-all leading-relaxed"
              style={{ color: '#b8ffd9' }}>
              {result}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
