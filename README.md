# ⬡ Caesar Cipher App

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![Jest](https://img.shields.io/badge/Tests-23_passed-22c55e?style=flat-square&logo=jest)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

Aplicación web que implementa el **cifrado César** — una de las técnicas criptográficas más antiguas de la historia. Desarrollada como proyecto de seguridad integral TI, esta herramienta permite cifrar y descifrar mensajes usando dos alfabetos: inglés (26 letras) y español (27 letras, incluye la Ñ).

El proyecto integra conceptos de **criptografía clásica** con desarrollo de software moderno, aplicando arquitectura limpia, tipado estricto con TypeScript y testing automatizado con Jest.

---

## 🔗 Demo en vivo

**[https://caesar-cipher-app-complete.vercel.app](https://caesar-cipher-app-complete.vercel.app)**

---

## ✨ Funcionalidades

- 🔒 **Cifrado y descifrado** en tiempo real mediante API REST
- 🔑 **5 claves disponibles:** 3, 4, 5, 6 y 7
- 🌎 **Soporte bilingüe:** Español (27 letras + Ñ) e Inglés (26 letras)
- ✍️ **Preservación de caracteres:** espacios, números y puntuación intactos
- 📋 **Copiar al portapapeles** con un clic
- 💻 **Interfaz temática** de ciberseguridad con estética terminal
- 📱 **Diseño responsive** — funciona en móvil y escritorio

---

## 🛠️ Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js | 16 |
| Librería UI | React | 19 |
| Lenguaje | TypeScript | 5 |
| Estilos | Tailwind CSS | 4 |
| Backend | Next.js API Routes | — |
| Testing | Jest + ts-jest | 30 |
| Deploy | Vercel | — |
| Repositorio | GitHub | — |

---

## 📁 Arquitectura del proyecto
caesar-cipher-app/
├── app/
│ ├── api/
│ │ └── cipher/
│ │ └── route.ts → Endpoint REST: POST /api/cipher
│ ├── page.tsx → Página principal
│ ├── layout.tsx → Layout global
│ └── globals.css → Estilos base y variables CSS
│
├── components/
│ └── CipherForm.tsx → Componente principal del formulario
│
├── lib/
│ └── caesar.ts → Algoritmo puro de cifrado César
│
├── types/
│ └── cipher.ts → Interfaces y tipos TypeScript
│
└── _tests_/
└── caesar.test.ts → 23 tests unitarios con Jest

text

> La lógica de cifrado está completamente desacoplada de la interfaz gráfica. El archivo `lib/caesar.ts` puede usarse de forma independiente sin ninguna dependencia de React o Next.js.

---

## ⚙️ Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/inaranjo17/Caesar-cipher-app-complete.git

# 2. Entra al directorio
cd Caesar-cipher-app-complete

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🧪 Tests

El proyecto cuenta con **23 tests unitarios** organizados en 5 suites:

```bash
npm test
```
✓ Cifrado en inglés (26 letras) 4 tests
✓ Cifrado en español (27 letras con Ñ) 3 tests
✓ Preservación de caracteres especiales 4 tests
✓ Validación de claves 2 tests
✓ Consistencia con todas las claves 10 tests

Test Suites: 1 passed
Tests: 23 passed

text

---

## 🔐 ¿Cómo funciona el cifrado César?

El cifrado César desplaza cada letra del alfabeto un número fijo de posiciones. Con clave **3** en inglés:
Texto original: H E L L O
Posición: 7 4 11 11 14

clave (3): 10 7 14 14 17
Texto cifrado: K H O O R

text

El proceso inverso (descifrado) resta el mismo número de posiciones. Los caracteres que no pertenecen al alfabeto se preservan sin modificación.

---

## 👤 Autora

**Isabella Naranjo**  
Ingeniería de Sistemas

[![GitHub](https://img.shields.io/badge/GitHub-inaranjo17-181717?style=flat-square&logo=github)](https://github.com/inaranjo17)
[![Vercel](https://img.shields.io/badge/Deploy-caesar--cipher--app--complete.vercel.app-black?style=flat-square&logo=vercel)](https://caesar-cipher-app-complete.vercel.app)