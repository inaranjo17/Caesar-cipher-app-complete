// ============================================================
// types/cipher.ts
// Definición de tipos e interfaces del proyecto
// ============================================================

/** Idiomas soportados por la aplicación */
export type Language = 'en' | 'es';

/** Modos de operación del cifrado */
export type Mode = 'encrypt' | 'decrypt';

/** Claves numéricas válidas */
export type CipherKey = 3 | 4 | 5 | 6 | 7;

/** Estructura de la petición al API */
export interface CipherRequest {
  text: string;
  key: CipherKey;
  language: Language;
  mode: Mode;
}

/** Estructura de la respuesta del API */
export interface CipherResponse {
  result: string;
  success: boolean;
  error?: string;
}

/** Información del alfabeto según idioma */
export interface AlphabetInfo {
  language: Language;
  label: string;
  letters: string;
  size: number;
}