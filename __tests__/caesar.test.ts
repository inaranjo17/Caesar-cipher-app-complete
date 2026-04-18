// ============================================================
// __tests__/caesar.test.ts
// Tests unitarios del algoritmo Caesar Cipher
// Autor: [Tu Nombre] — Abril 2026
// ============================================================

import { caesarCipher, isValidKey } from '../lib/caesar';

// ─────────────────────────────────────────
// SUITE 1: Cifrado en inglés
// ─────────────────────────────────────────
describe('Cifrado en inglés (26 letras)', () => {

  test('cifra HELLO con clave 3 → KHOOR', () => {
    expect(caesarCipher('HELLO', 3, 'en', 'encrypt')).toBe('KHOOR');
  });

  test('cifra HELLO con clave 7 → OLSSV', () => {
    expect(caesarCipher('HELLO', 7, 'en', 'encrypt')).toBe('OLSSV');
  });

  test('descifra KHOOR con clave 3 → HELLO', () => {
    expect(caesarCipher('KHOOR', 3, 'en', 'decrypt')).toBe('HELLO');
  });

  test('cifrar y descifrar devuelve el texto original', () => {
    const original = 'HELLO WORLD';
    const cifrado = caesarCipher(original, 5, 'en', 'encrypt');
    const resultado = caesarCipher(cifrado, 5, 'en', 'decrypt');
    expect(resultado).toBe(original);
  });

});

// ─────────────────────────────────────────
// SUITE 2: Cifrado en español
// ─────────────────────────────────────────
describe('Cifrado en español (27 letras con Ñ)', () => {

  test('cifra HOLA con clave 3 → resultado válido', () => {
    const resultado = caesarCipher('HOLA', 3, 'es', 'encrypt');
    expect(resultado).toBeTruthy();
    expect(resultado.length).toBe(4);
  });

  test('cifrar y descifrar en español devuelve el original', () => {
    const original = 'HOLA MUNDO';
    const cifrado = caesarCipher(original, 4, 'es', 'encrypt');
    const resultado = caesarCipher(cifrado, 4, 'es', 'decrypt');
    expect(resultado).toBe(original);
  });

  test('maneja la letra Ñ correctamente', () => {
    const original = 'NIÑO';
    const cifrado = caesarCipher(original, 3, 'es', 'encrypt');
    const descifrado = caesarCipher(cifrado, 3, 'es', 'decrypt');
    expect(descifrado).toBe(original);
  });

});

// ─────────────────────────────────────────
// SUITE 3: Preservación de caracteres especiales
// ─────────────────────────────────────────
describe('Preservación de caracteres especiales', () => {

  test('preserva espacios', () => {
    const resultado = caesarCipher('HOLA MUNDO', 3, 'es', 'encrypt');
    expect(resultado).toContain(' ');
  });

  test('preserva comas y puntos', () => {
    const resultado = caesarCipher('HOLA, MUNDO.', 3, 'en', 'encrypt');
    expect(resultado).toContain(',');
    expect(resultado).toContain('.');
  });

  test('preserva números', () => {
    const resultado = caesarCipher('CLAVE123', 3, 'en', 'encrypt');
    expect(resultado).toContain('1');
    expect(resultado).toContain('2');
    expect(resultado).toContain('3');
  });

  test('preserva signos de exclamación e interrogación', () => {
    const resultado = caesarCipher('HOLA! QUE TAL?', 3, 'es', 'encrypt');
    expect(resultado).toContain('!');
    expect(resultado).toContain('?');
  });

});

// ─────────────────────────────────────────
// SUITE 4: Validación de claves
// ─────────────────────────────────────────
describe('Validación de claves', () => {

  test('claves válidas: 3, 4, 5, 6, 7 → true', () => {
    [3, 4, 5, 6, 7].forEach((k) => {
      expect(isValidKey(k)).toBe(true);
    });
  });

  test('claves inválidas: 0, 1, 2, 8, 100 → false', () => {
    [0, 1, 2, 8, 100].forEach((k) => {
      expect(isValidKey(k)).toBe(false);
    });
  });

});

// ─────────────────────────────────────────
// SUITE 5: Todas las claves (3-7) en ambos idiomas
// ─────────────────────────────────────────
describe('Consistencia con todas las claves', () => {

  const texto = 'PROGRAMACION';

  [3, 4, 5, 6, 7].forEach((key) => {
    ['en', 'es'].forEach((lang) => {
      test(`clave ${key} en ${lang}: cifrar+descifrar = original`, () => {
        const cifrado = caesarCipher(texto, key, lang as 'en' | 'es', 'encrypt');
        const descifrado = caesarCipher(cifrado, key, lang as 'en' | 'es', 'decrypt');
        expect(descifrado).toBe(texto);
      });
    });
  });

});