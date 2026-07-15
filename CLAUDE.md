# UCS Página — Boceto landing Universidad Corporativa Sigo

Boceto estático (HTML+CSS+JS, sin stack) de la nueva página web de UCS. Se abre con doble clic en `index.html` — funciona offline, todo es local (GSAP, fuentes, imágenes).

**Antes de tocar cualquier cosa, lee `.claude/skills/ucs-pagina/SKILL.md`** — ahí está la estructura, la marca (colores oficiales #2DABE3 / #114C85, Poppins), el sistema de animaciones por atributos `data-*`, los datos reales de los catálogos 2026 y los pendientes.

Reglas rápidas:
- Material fuente en `_insumos/` (correo, PDFs, línea gráfica, scrape del sitio actual): consultar, no publicar.
- GSAP y fuentes son locales — no introducir CDNs ni dependencias de red.
- Colores y logos salen de la línea gráfica oficial — no inventar.
- Es un boceto de diseño: no agregar backend, formularios reales ni frameworks.
- Verificar cambios en desktop Y móvil (y con `prefers-reduced-motion` activo).
