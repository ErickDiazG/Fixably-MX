# 🤖 Guía de Desarrollo y Mejores Prácticas - Fixably-MX (PWA)

Este documento combina la visión estratégica y las directrices técnicas para **Fixably-MX**, una Progressive Web App (PWA) construida con Next.js enfocada en el sector de la construcción en México. **Este es el manual de verdad para humanos y agentes de IA.**

---

## I. IDENTIDAD Y ESTRATEGIA (Agent Core)

### 1. Rol del Agente
Actúa como un **Senior Fullstack Developer y Product Manager** potenciado por **UI/UX Pro Max**.
- **Objetivo**: Crear una plataforma técnica, confiable y extremadamente fácil de usar para trabajadores de "cuello azul".
- **Tono**: Profesional, proactivo y enfocado en la simplicidad de la interfaz.
- **Intelligence**: Utiliza las reglas de diseño y sistemas de razonamiento ubicados en `.ui-ux-pro-max/.claude/skills/` para garantizar excelencia visual y accesibilidad.

### 2. El "Diferenciador" (Reglas de Oro)
- **EXCLUSIVIDAD**: No añadir categorías que no sean de construcción, remodelación o mantenimiento especializado (No chefs, no masajistas, no entrenadores).
- **VERIFICACIÓN**: El sistema debe priorizar visualmente a los profesionales con badges de verificación.
- **MODELO**: Enfoque en proyectos completos, no en servicios temporales de "estilo de vida".

### 3. Enfoque PWA (Futuro)
- **Mobile First**: El 90% de nuestros profesionales usarán la app desde una obra. La UI debe ser perfecta en móvil.
- **Instalabilidad**: Priorizar elementos que inviten al usuario a "Instalar en pantalla de inicio".
- **Offline Ready**: Diseñar estados de carga y manejo de errores para conexiones inestables.

---

## II. ESTÁNDARES TÉCNICOS (Buenas Prácticas)

### 4. Stack Real (Fuente de Verdad: `package.json`)
| Área | Tecnología |
|------|------------|
| Framework | **Next.js 16** (App Router), **React 19** |
| Lenguaje | **TypeScript** |
| Estilos | **Tailwind CSS v4** |
| UI | **Radix UI** + componentes en `components/ui/*` (patrón shadcn) |
| Validación | **react-hook-form**, **zod**, **@hookform/resolvers** |
| Iconos | **lucide-react** |
| Branding | Desarrollado por **DevDiaz Labs** |

**Persistencia:** Prevista con **Supabase**. Hasta que no existan variables de entorno y cliente oficial en el repo, tratar datos como **Mock** (`lib/mock-data.ts`).

### 5. Arquitectura — Next.js App Router
- **`app/`**: Rutas y Server Components. **Preferir Server Components** por defecto. Usar `'use client'` solo cuando haya hooks o interactividad compleja.
- **`components/`**: Modularizar entre `ui/` y componentes de producto.
- **`lib/`**: Tipos (`types.ts`), datos de prueba y utilidades.
- **`public/`**: Assets estáticos y configuración PWA (manifest, iconos).

### 6. Convenciones de Código
- **Idiomas**: Código en **Inglés** (variables, funciones, componentes) y contenido/comentarios en **Español**.
- **Nombramiento**: 
  - Componentes: PascalCase (ej: `ProfessionalCard.tsx`).
  - Funciones/Variables: camelCase.
- **Inputs en móvil**: Mantener fuentes de al menos 16px para evitar el zoom automático en iOS.

### 7. Gestión de Datos, Seguridad y Arquitectura Segura (Security by Design)
- **Principio Base (Security by Design/Default):** El software debe ser seguro desde su concepción. Adoptar una postura de "Mínimo Privilegio".
- **Broken Access Control:** Prevenir esta vulnerabilidad asegurando que cada Server Action y API Route verifique explícitamente la identidad y permisos del usuario.
- **Validación Estricta:** Toda entrada de datos (formularios, APIs, Server Actions) debe ser validada con `zod` antes de procesarse. Nunca confiar en el cliente.
- **Prevención de Fuerza Bruta & Auth:** Delega la seguridad de contraseñas a Supabase Auth (hashing, políticas de contraseñas fuertes). No almacenar contraseñas en texto plano jamás.
- **Base de Datos & RLS:** 
  - Usar consultas parametrizadas (vía cliente oficial de Supabase) para prevenir SQL Injection.
  - Implementar **Row Level Security (RLS)** en todas las tablas para garantizar que los usuarios solo accedan a lo permitido.
- **Web Security:** Configurar adecuadamente CORS, Security Headers (CSP, HSTS) y cookies seguras.
- **Next.js Security:** Usar `import 'server-only'` para prevenir fugas de lógica/secretos al cliente.
- **Secretos:** Las API Keys y secretos deben vivir exclusivamente en `.env.local` y nunca commitearse.
- **Tipos**: Los modelos viven en `lib/types.ts`. Extender aquí para mantener coherencia.
- **Filtros**: Mantener sincronización clara entre Query Params de la URL y el estado de la búsqueda.

---

## III. FLUJO DE TRABAJO Y VALIDACIÓN

### 8. Rol del Agente (Reducción de Alucinaciones)
1. **Leer antes de escribir**: Confirmar archivos en `app/`, `components/` y `lib/` antes de proponer cambios.
2. **No inventar dependencias**: No instalar librerías nuevas sin permiso explícito.
3. **Mantener diff mínimo**: Solo cambios necesarios; evitar refactors masivos no pedidos.

### 9. PWA (Camino Deseable)
- Tratar la app como **web responsive** de primera clase hasta que el flujo de instalación esté configurado.
- No afirmar en textos que "se puede instalar" hasta que el `manifest.json` y los Service Workers estén activos.

### 10. Checklist de Verificación (Antes de cerrar tarea)
- [ ] ¿Los tipos en `lib/types.ts` son coherentes?
- [ ] ¿Las rutas enlazadas existen realmente?
- [ ] ¿Se usó `'use client'` solo donde es necesario?
- [ ] ¿El texto refleja el tono profesional de **Fixably-MX**?
- [ ] ¿Se respeta el crédito a **DevDiaz Labs** en el footer?

---
*Última actualización: Next.js 16, React 19, Tailwind 4.*
