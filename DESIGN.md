# Life Sculp — Design and asset notes

Reference inspected in-browser: https://vaultx-brand.framer.website/, 29 October 2026, desktop 1440×900 and mobile 390×844.

Observed sequence: full-height cover, four-column index, centered manifesto, chapter covers, one-third sticky left rail / two-thirds scrolling content, foundation (mission/personality/voice), identity (logos/color/type/icons), design system, applications, closing navigation. Covers place the large title bottom-left, small logo top-left, ghost mark top-right. Content uses narrow gutters and large surfaces. Text progressively darkens on scroll; artwork and mockups reveal as they enter. Circular top-right menu expands into four links. Palette offers copying. Mobile removes the sticky rail and stacks the content. The four rounded personality quadrants frame a central mark.

Adaptation preserves this architecture. Foundation becomes concept/personality/verbal expression without invented mission or business claims. Identity retains logos, two official colors, honest type specimens, and mark-led visual language. Digital includes website composition, interaction details, size studies and mobile; applications uses the three supplied mockups and proposed social compositions. No claims of actual facilities or live booking are made.

Tokens: official ivory #F5ECE3 and gold #B98E4A; interface-only brown #30271F, muted brown #706053, paper #EEE2D5 and warm white #FFFAF5. Georgia is the display fallback, Arial the supporting fallback. No Eternal Spring or Made Tommy font files were found in supplied directories. Actual lettering stays outlined in original SVG. No outlines are edited, recolored or distorted.

Layout: 1:2 sticky editorial columns, 6px gutters, viewport chapter covers; headings bottom-left. Mobile at 700px uses nonsticky introductory panels. Tablet retains rail with adjusted type. Native smooth anchor scrolling, requestAnimationFrame scroll-linked ink reveal and restrained mark parallax, IntersectionObserver masking, hover surface/image transitions. Reduced motion disables spatial effects and reveals all content. Native dialog provides keyboard modal behavior. The page works with JavaScript disabled except modal, clipboard and menu enhancements; table of contents remains available.

All 12 assets are copied byte-for-byte under semantic names. Original naming is inverted relative to composition:

| Original | Semantic asset | ViewBox | Composition |
|---|---|---|---|
| Logo V1–V4.svg | logo-horizontal-{ouro,marfim,branco,preto}.svg | 0 0 793.7 258.82 | Symbol left / wordmark right |
| Logo H1–H4.svg | logo-vertical-{ouro,marfim,branco,preto}.svg | 0 0 675.08 436.82 | Symbol above wordmark |
| Ícone 01–04.svg | simbolo-{ouro,marfim,branco,preto}.svg | 0 0 667.4 637.19 | Standalone symbol |

Every mark has tight source viewBox and proportional intrinsic dimensions; horizontal and stacked artwork contains 24 paths, symbol one compound path. Variants 1 gold, 2 ivory, 3 white, 4 black (default fill). All original SVGs are included in the download ZIP. Supplied PNG mockups are encoded to WebP at 800 and 1254px for responsive delivery; source images are unchanged outside this project.

Run `npm run dev` for localhost:4173. `npm run build` checks JavaScript syntax and source integrity; the dist folder is deployable as-is with no runtime dependencies or external font requests.
