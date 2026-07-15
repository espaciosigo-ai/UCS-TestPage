---
name: ucs-pagina
description: Trabajar sobre el boceto web de la Universidad Corporativa Sigo (UCS) — estructura del proyecto, marca, cómo editar secciones, animaciones GSAP y verificación local. Usar cuando se pida modificar, rediseñar o extender la página UCS.
---

# Página UCS — Guía de trabajo

Boceto de landing page para la **Universidad Corporativa Sigo (UCS)**: formaciones empresariales, alquiler de aulas (Zona Rental), auditorio y catering corporativo, en Porlamar, Isla de Margarita. **Solo diseño/presentación** — no hay backend, formularios ni stack: es HTML + CSS + JS estático que se abre con doble clic en `index.html`.

## Estructura

```
UCS Pagina/
├── index.html              ← toda la página (una sola, secciones ancladas)
├── assets/
│   ├── css/styles.css      ← estilos completos, variables de marca en :root
│   ├── js/main.js          ← animaciones GSAP + nav + contadores (comentado por bloques)
│   ├── js/vendor/          ← gsap.min.js + ScrollTrigger.min.js (v3.15, LOCALES — no CDN)
│   ├── fonts/              ← Poppins woff2 local (400–800) + poppins-local.css
│   ├── img/                ← fotos optimizadas (JPEG ≤1600px) con nombres descriptivos
│   └── docs/               ← los 4 PDF descargables (catálogos oficiales)
├── _insumos/               ← MATERIAL FUENTE, no se publica
│   ├── correo_johana_body.txt      ← correo original con el pedido (14-jul-2026)
│   ├── *.pdf                        ← catálogos originales de Johana Gil
│   ├── Linea Grafica UCS.jpeg       ← manual de marca (colores, tipografía, logos)
│   ├── _paginas_pdf/                ← cada página de los PDF como PNG (para consulta)
│   ├── _imgs_pdfs/                  ← fotos extraídas de los PDF en alta
│   ├── web_actual/                  ← scrape del sitio Google Sites actual (texto + 21 imgs)
│   └── _qa/                         ← screenshots de verificación
└── .claude/skills/ucs-pagina/SKILL.md   ← este archivo
```

## Marca (de `_insumos/Linea Grafica UCS.jpeg` — NO inventar colores)

| Token CSS | Valor | Uso |
|---|---|---|
| `--celeste` | `#2DABE3` | acentos, kickers, `<em>` de títulos |
| `--azul` | `#114C85` | color primario, fondos de bloques |
| `--navy` / `--navy-2` | `#0A2A4A` / `#0D3560` | secciones oscuras (Auditorio, CTA final) |
| `--lima` | `#C6D92E` | acento puntual (viñetas, descuento) — usar poco |

- Tipografía oficial: **Avenir**. En web se usa **Poppins local** como sustituta (geométrica redondeada, igual que el logo). No cambiar a otra sin decisión de marca.
- Logos en `assets/img/`: `logo-ucs.png` (color, fondos claros) y `logo-ucs-blanco.png` (fondos oscuros).
- Sub-marcas y variantes de color del logo: ver la línea gráfica (verde/morado, naranja, ucsigo).

## Secciones de `index.html` (en orden)

`#hero` → marquee → `#lineas` (bento 4 tiles) → `#formaciones` (4 formatos + 5 líneas + modalidades) → `#espacios` (aulas horizontales + descuentos) → `#auditorio` (bloque oscuro) → `#catering` (5 opciones) → `#cifras` (contadores) → `#proceso` (4 pasos) → `#faq` → `#contacto` (CTA final + datos) → footer.

Cada sección es un `<section>` autocontenido: se puede reordenar, quitar o duplicar sin romper las demás. El nav y el scroll-spy leen los `id`.

## Animaciones (assets/js/main.js)

Convención por atributos `data-*` — para animar algo nuevo basta ponerle el atributo:

| Atributo | Efecto |
|---|---|
| `data-split` | título se revela por líneas (máscara + stagger) |
| `data-reveal` | fade-up al entrar al viewport |
| `data-stagger` | los HIJOS del elemento entran escalonados |
| `data-count="N"` | contador anima de 0 a N |
| `data-bento` / `data-line` | entradas específicas de tiles/cards |
| `data-zoom` | imagen con zoom scrubbed al scroll |

Reglas que ya respeta el código y hay que mantener:
- **GSAP es local** (`assets/js/vendor/`). No agregar CDNs: la página debe funcionar sin internet.
- `prefers-reduced-motion` desactiva todo (accesibilidad) — probar cualquier animación nueva en ambos modos.
- La galería de aulas/precios es un **carrusel deslizable con el dedo** (scroll nativo + snap) en todos los dispositivos; en desktop además tiene flechas y drag con mouse. **Decisión de Christian 15-jul: NO usar scroll-jacking (pin/scrub) — el enfoque es mobile-first y las secciones con muchos productos deben deslizarse con el dedo, no con el scroll vertical.** Aplicar el mismo patrón si se agregan más carruseles (más salones, testimonios, etc.).
- Animar solo `transform` y `opacity` (rendimiento).

## Datos reales usados (fuente: catálogos oficiales 2026)

- **Formaciones**: 5 líneas (Colaboración, Liderazgo, Servicio, Productividad, Ofimática), ~35 cursos, formatos Cápsula 1h / Micro-taller 2h / Taller 4-8h / Plan 2-6 módulos. Modalidad Incompany o en aulas.
- **Aulas**: Aula 12 (60 pers., $200→$120/día), Aula 13 (30 pers., $160→$96), Aula 23 (48 pers., tipo U, $220→$132). Descuentos: 3 días -15%, 4-5 días -25%, 6+ -40%. Jornadas de 8h, no aplica findes/feriados.
- **Auditorio**: 328 butacas (150 con distanciamiento), sonido con operador, video beam HD.
- **Catering**: 5 opciones (líquido express, líquido, dulce, desayunos, brunch). Calidad Sigo.
- **Contacto**: WhatsApp 0412-2512619 y 0412-3040451 · (0295) 265 22 36 / 265 23 04 · ucsigo@gmail.com · @ucssigo · Av. Juan Bautista Arismendi, Edif. CPA, Porlamar. L-V 8am-5pm.

Si un dato cambia (precio, curso, capacidad), corregirlo en `index.html` buscando el texto — no hay base de datos.

## Verificar cambios

Abrir `index.html` en el navegador (doble clic) y revisar desktop + móvil (DevTools). Para screenshots automáticos hay un patrón con Playwright Python (ver `_insumos/_qa/`): contexto con `reduced_motion="reduce"` para capturar todo el contenido sin esperar animaciones, y un contexto normal para validar que las animaciones corren sin errores de consola.

## Pendientes conocidos / decisiones abiertas

- Fotos del catering y algunas de formaciones son stock de los PDF — reemplazar por fotos propias cuando existan.
- No hay testimonios ni logos de empresas cliente (la investigación de mercado los recomienda) — pedir a UCS 2-3 quotes con nombre/cargo/empresa.
- El sitio actual (Google Sites) lista más espacios (sala de exposiciones 150p, usos múltiples 200p, aula digital/creativa) — el boceto usa solo los 3 del PDF oficial de Zona Rental; decidir si se amplía.
- Botón "Descarga el catálogo 2026" descarga el PDF; en producción podría ser formulario o WhatsApp Flow.
- Falta definir dominio/hosting (fuera del alcance del boceto).
