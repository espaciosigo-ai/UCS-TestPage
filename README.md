# UCS — Boceto de página web

Boceto de la nueva landing page de la **Universidad Corporativa Sigo (UCS)**: formaciones empresariales, alquiler de aulas (Zona Rental), auditorio y catering corporativo.

**Ver en línea:** https://espaciosigo-ai.github.io/UCS-TestPage/

## Cómo usarlo

- **Ver local:** doble clic en `index.html`. Funciona sin internet (GSAP, fuentes e imágenes son locales).
- **Editar / rediseñar:** abre esta carpeta con Claude Code. El archivo `CLAUDE.md` y la guía en `.claude/skills/ucs-pagina/SKILL.md` explican la estructura, los colores oficiales de marca, el sistema de animaciones y los datos reales de los catálogos 2026.

## Qué es (y qué no es)

- Es un **boceto de diseño** para definir cómo se verá la página: solo HTML + CSS + JS estático.
- No tiene backend, formularios reales ni framework. Los botones de contacto abren WhatsApp y los catálogos se descargan en PDF.
- Enfoque **mobile-first**: las secciones con varios productos (salones) se deslizan con el dedo.

## Estructura rápida

```
index.html          página completa (una sola, secciones ancladas)
assets/css/         estilos (variables de marca en :root)
assets/js/          animaciones GSAP + interacción (vendor local)
assets/img/         fotos y logos optimizados
assets/docs/        catálogos PDF descargables
```
