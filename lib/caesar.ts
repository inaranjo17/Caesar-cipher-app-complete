// ============================================================
// lib/caesar.ts
// Lógica pura del Cifrado César
// Autor: Isabella Naranjo
// Fecha: Abril 2026
// Descripción: Implementación del algoritmo de cifrado César
//              con soporte para alfabeto inglés (26 letras)
//              y español (27 letras, incluye Ñ).
// ============================================================

export type Language = 'en' | 'es';
export type Mode = 'encrypt' | 'decrypt';

/** Alfabetos soportados */
const ALPHABETS: Record<Language, string> = {
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',        // 26 letras
  es: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',       // 27 letras (incluye Ñ)
};

/**
 * Aplica el cifrado César a un texto.
 *
 * @param text     - Texto de entrada (plaintext o ciphertext)
 * @param key      - Desplazamiento numérico (3, 4, 5, 6 o 7)
 * @param language - Idioma del alfabeto: 'en' (inglés) | 'es' (español)
 * @param mode     - Modo de operación: 'encrypt' | 'decrypt'
 * @returns        - Texto resultante con caracteres no alfabéticos preservados
 *
 * @example
 * caesarCipher('HOLA', 3, 'es', 'encrypt') // → 'KROD'
 * caesarCipher('KROD', 3, 'es', 'decrypt') // → 'HOLA'
 */
export function caesarCipher(
  text: string,
  key: number,
  language: Language,
  mode: Mode
): string {
  const alphabet = ALPHABETS[language];
  const size = alphabet.length;
  const shift = mode === 'encrypt' ? key : size - key;

  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      const index = alphabet.indexOf(char);
      // Si el carácter no está en el alfabeto, se preserva tal cual
      if (index === -1) return char;
      return alphabet[(index + shift) % size];
    })
    .join('');
}

/**
 * Valida que la clave esté dentro del rango permitido (3-7).
 *
 * @param key - Clave a validar
 * @returns   - true si la clave es válida
 */
export function isValidKey(key: number): boolean {
  return [3, 4, 5, 6, 7].includes(key);
}