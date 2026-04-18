// ============================================================
// app/api/cipher/route.ts
// API Route: POST /api/cipher
// Recibe texto + configuración, retorna texto cifrado/descifrado
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { caesarCipher, isValidKey } from '@/lib/caesar';
import { CipherRequest, CipherResponse } from '@/types/cipher';

/**
 * POST /api/cipher
 * Procesa una solicitud de cifrado o descifrado César.
 *
 * Body esperado:
 * {
 *   text: string,
 *   key: 3 | 4 | 5 | 6 | 7,
 *   language: 'en' | 'es',
 *   mode: 'encrypt' | 'decrypt'
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body: CipherRequest = await request.json();
    const { text, key, language, mode } = body;

    // — Validación de campos requeridos —
    if (!text || !key || !language || !mode) {
      return NextResponse.json<CipherResponse>(
        {
          result: '',
          success: false,
          error: 'Faltan parámetros requeridos: text, key, language, mode',
        },
        { status: 400 }
      );
    }

    // — Validación de clave —
    if (!isValidKey(key)) {
      return NextResponse.json<CipherResponse>(
        {
          result: '',
          success: false,
          error: 'Clave inválida. Valores permitidos: 3, 4, 5, 6 o 7',
        },
        { status: 400 }
      );
    }

    // — Validación de idioma —
    if (!['en', 'es'].includes(language)) {
      return NextResponse.json<CipherResponse>(
        {
          result: '',
          success: false,
          error: "Idioma inválido. Use 'en' para inglés o 'es' para español",
        },
        { status: 400 }
      );
    }

    // — Procesamiento —
    const result = caesarCipher(text, key, language, mode);

    return NextResponse.json<CipherResponse>({
      result,
      success: true,
    });

  } catch {
    return NextResponse.json<CipherResponse>(
      {
        result: '',
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
