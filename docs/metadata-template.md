Incluye:

* Título, descripción y keywords
* Open Graph para redes
* Robots
* (Opcional) Twitter Card si algún día lo necesitas

---

```tsx
// Ejemplo de metadata para cualquier page.tsx en Next.js

import type { Metadata } from "next";

// Cambia estos valores según la página y el idioma
export const metadata: Metadata = {
  title: "Título de la Página | NovaPage",
  description: "Descripción clara y atractiva sobre el propósito de esta página.",
  keywords: [
    "palabra clave 1",
    "palabra clave 2",
    "palabra clave 3",
    "marca",
    "más palabras clave"
  ],
  openGraph: {
    title: "Título de la Página | NovaPage",
    description: "Resumen para compartir en redes (puede ser igual al description).",
    url: "https://company-new-green.vercel.app/ruta", // Cambia por la URL real de la página
    siteName: "NovaPage",
    images: [
      {
        url: "https://company-new-green.vercel.app/imagen-principal.png", // Cambia la imagen
        width: 1200,
        height: 630,
        alt: "Texto alternativo de la imagen",
      },
    ],
    locale: "es_CO", // Cambia según el idioma principal
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Twitter Card (opcional, para mejores previews en X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Título de la Página | NovaPage",
    description: "Descripción para Twitter Card.",
    images: [
      "https://company-new-green.vercel.app/imagen-principal.png",
    ],
    site: "@tuUsuarioTwitter", // Opcional: agrega si tienes cuenta oficial
  },
};
```

---

## **¿Cómo usarla?**

1. **Copia la plantilla** al principio de cualquier archivo `page.tsx`.
2. Cambia los campos por los valores específicos de la página.
3. Para imágenes, usa una ilustración relevante y de preferencia de al menos 1200x630px.
4. Cambia el locale y la URL según idioma y sección.
5. Si necesitas indexar o bloquear alguna página, ajusta el campo `robots`:

   ```ts
   robots: {
     index: false, // No indexar
     follow: false,
   },
   ```

---

## **¿Ejemplo para otro idioma?**

Solo cambia el campo `locale`, la descripción y el título:

```ts
  openGraph: {
    locale: "en_US",
    // ...
  },
  title: "Web Solutions & AI for Your Business | NovaPage",
  description: "Boost your business with web development, automation and cloud solutions by NovaPage.",
```

---
