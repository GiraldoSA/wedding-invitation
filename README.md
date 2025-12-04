## Invitación de boda · Carlos & Camila

Invitación digital mobile-first construida con Next.js, Tailwind CSS v4 y Framer Motion para lograr una experiencia ligera, moderna, romántica e interactiva.

### Stack principal

- **Next.js 15 (App Router)** con TypeScript
- **Tailwind CSS v4** con scroll snap vertical y glassmorphism
- **Framer Motion** para animaciones suaves y micro-interacciones
- **Lucide Icons** para detalles minimalistas

### Secciones y features

- Cover con hero animado, CTA y botón “Play música” (no autoplay)
- Cuenta regresiva animada al 05·01·2026
- Historia tipo cards swipeables y galería con efecto Ken Burns
- Detalles clave, mapa embebido y botón “Ir en Uber”
- RSVP reactivo listo para conectar a Supabase/Firebase
- Sección final con descarga de evento (.ics) y easter egg por triple tap

### Scripts

```bash
npm run dev      # levanta el entorno local en http://localhost:3000
npm run build    # compila la app para producción
npm run start    # sirve la build optimizada
npm run lint     # corre ESLint
```

### Personalización rápida

- **Colores y estilos:** `src/app/globals.css`
- **Fuentes y metadatos:** `src/app/layout.tsx`
- **Contenido/animaciones:** `src/app/page.tsx`
- **Diseños PNG locales:** carpeta `public/galeria/` (usa nombres en minúsculas sin tildes)
- **Imágenes remotas permitidas:** `next.config.ts`

### Deploy recomendado

1. Crear el repositorio en GitHub.
2. Conectar el repo en [Vercel](https://vercel.com) (framework Next.js detectado automáticamente).
3. Configurar el dominio deseado (`weddingcarlos.cl`, `carlosycamila.com`, etc.).
4. Opcional: apuntar el formulario RSVP hacia tu backend o un servicio serverless.

¡Listo! Con esto tienes una invitación lista para compartirse por QR o enlace directo.
