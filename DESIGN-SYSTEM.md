# Design System Dadosfera — Regras

Documento único com **todas as regras** do design system. Identidade extraída do
código-fonte oficial de `dadosfera.ai` (bloco `#ddf-custom-home`, formulário HubSpot e
footer). Fonte da verdade em código: `css/tokens.css`.

---

## 1. Marca

| Token | HEX | Uso |
|-------|-----|-----|
| `--ds-color-nucleo` | `#1700A2` | Primária — **títulos**, botões, links de destaque |
| `--ds-color-nucleo-hover` | `#110080` | Hover da primária |
| `--ds-color-profundo` | `#0D003B` | Texto de corpo, fundos escuros |
| `--ds-color-acao` | `#1863DC` | Azul de ação (gradientes/CTA alternativo) |
| `--ds-color-ciano` | `#3BBFF0` | Acento "aurora" — **eyebrow/overline**, destaques |
| `--ds-color-lavanda` | `#A79EE8` | Apoio suave (aurora) |
| `--ds-color-laranja` | `#FF9800` | CTA secundário / atenção |
| `--ds-color-tinta` | `#0D003B` | Alias de texto principal |
| `--ds-color-branco` | `#FFFFFF` | — |

**Neutros (oficiais):** `#4B5563` (muted) · `#6B7280` (muted-soft) · `#C0BDD4` (placeholder)
· `#C9CCEC` (chart) · `#D7D7E2` (borda hover) · `#ECECF2` (borda) · `#F2EFF4` (fundo neutro
lavanda) · `#F7F8FC` (fundo soft).

**Semânticas:** success `#1DBF73` · info `#1863DC` · warning `#FF9800` · danger `#E53E3E`.

### Regras de cor
- **Títulos sempre em indigo `#1700A2`** (`--ds-heading`), nunca preto. Em fundo escuro, branco.
- **Texto de corpo** em `#0D003B`; texto secundário em `#4B5563`.
- **Eyebrow/overline em ciano `#3BBFF0`**, maiúsculas.
- Botão primário **sólido** `#1700A2` (não gradiente), hover `#110080`.
- Clique em qualquer swatch da doc copia o HEX.

### Gradientes
- `--ds-gradient-nucleo`: `135deg, #1700A2 → #3BBFF0`
- `--ds-gradient-profundo`: `135deg, #0D003B → #1700A2`
- `--ds-gradient-hero`: `135deg, #0D003B → #1700A2 55% → #1863DC`
- `--ds-gradient-aurora` (assinatura, fundo claro): radiais ciano `.18` + lavanda `.22`
  + branco `.9` sobre `linear-gradient(180deg, #FAFAFE → #F4F1F8)`.

---

## 2. Tipografia

**Famílias**
- **Display/títulos:** `--ds-font-display: 'menco', 'Nunito', system-ui, sans-serif`
  - `menco` é a fonte da marca, carregada via **Adobe Typekit** (kit `lrl6igp`):
    `<link rel="stylesheet" href="https://use.typekit.net/lrl6igp.css">`.
  - **Fallback é Nunito** (a home oficial renderiza tudo em Nunito) — **nunca Sora**.
- **Corpo:** `--ds-font-base: 'Nunito', system-ui, sans-serif` (Google Fonts, pesos 300–900).
- **Mono:** `--ds-font-mono: 'JetBrains Mono', ui-monospace, monospace`.

**Regra de carregamento (todo HTML/LP):**
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://use.typekit.net/lrl6igp.css"><!-- Menco -->
```

**Pesos:** light 300 · regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800.

**Escala responsiva (clamp):**
| Token | Tamanho |
|-------|---------|
| `--ds-text-display` | `clamp(2.75rem, 5vw, 4.5rem)` |
| `--ds-text-h1` | `clamp(2.25rem, 4vw, 3.25rem)` |
| `--ds-text-h2` | `clamp(1.875rem, 3.2vw, 2.5rem)` |
| `--ds-text-h3` | `clamp(1.5rem, 2.4vw, 1.875rem)` |
| `--ds-text-h4` | `clamp(1.25rem, 1.8vw, 1.5rem)` |
| `--ds-text-h5` / `h6` | `1.125rem` / `1rem` |
| body lg / body / sm | `1.125rem` / `1rem` / `0.875rem` |
| caption / overline | `0.75rem` / `0.6875rem` |

**Regras tipográficas**
- `h1` peso 700; `h2` (título de seção) peso **600**; `h3–h6` 600/700.
- `line-height` títulos `1.1`; corpo `1.6`; `letter-spacing` títulos `-0.01em`.
- `text-wrap: balance` em títulos.
- `.ds-overline`: ciano, `letter-spacing:.16em`, uppercase, peso 800.
- `.ds-lead`: 18px, cor muted.

---

## 3. Espaçamento, raio, sombra

**Espaçamento (escala 4px):** `--ds-space-1..9` = 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
**Grid:** container `max-width:1200px`; 12 colunas; gap padrão 24px.

**Raio:** sm `8px` · md `12px` · lg `18px` · xl `22px` · 2xl `28px` · pill `999px`.
- Botões = pill. Cards = lg/xl. Seções/modais = xl/2xl.

**Sombra (base `#0D003B`):**
- sm `0 4px 20px rgba(13,0,59,.07)`
- md `0 10px 22px -12px rgba(13,0,59,.12)`
- lg `0 22px 44px -22px rgba(13,0,59,.22)`
- xl `0 32px 64px -24px …`
- glow (botão) `0 10px 20px -10px rgba(23,0,162,.45)`

**Transições:** `--ds-ease: cubic-bezier(.4,0,.2,1)`; rápida `.16s`; padrão `.28s`.

---

## 4. Tema

Claro é padrão (`data-theme` aplicado no `<head>` via no-FOUC script). Tema escuro disponível
via `[data-theme="dark"]` (botão `[data-theme-toggle]`). Variáveis semânticas:
`--ds-bg`, `--ds-bg-soft`, `--ds-bg-neutral`, `--ds-surface`, `--ds-heading`, `--ds-text`,
`--ds-text-soft`, `--ds-border`, `--ds-border-strong`.

---

## 5. Componentes (25+)

CSS em `css/components.css`. Prefixo de classe **`.ds-`**.

| Componente | Classe base | Variações |
|-----------|-------------|-----------|
| Botões | `.ds-btn` | `--primary --secondary --ghost --dark --light --orange --disabled`; `--sm --lg --block`; `.ds-btn-group` |
| Inputs | `.ds-field` `.ds-input` `.ds-select` `.ds-textarea` | `.is-error .is-success`; `.ds-check`; `.ds-switch`; `.ds-input-group`; `.ds-help` |
| Badges/Tags | `.ds-badge` | `--ciano --success --warning --danger --solid --dot`; `.ds-tag`; `.ds-chip` |
| Alerts/Toasts | `.ds-alert` | `--success --warning --danger`; `.ds-toast(--success/--danger)` |
| Cards | `.ds-card` | `--accent`; `.ds-card__seal(--ciano/--soft)`; `.ds-postcard`; `.ds-feature-card` |
| Accordion | `.ds-accordion` | item `.is-open`; sinal `.ds-accordion__sign` (+→×) |
| Tabs | `.ds-tabs` | `__btn.is-active`, `__panel.is-active` |
| Carousel | `.ds-carousel` | `__track __slide __btn(--prev/--next) __dots` (setas ‹ ›) |
| Hero | `.ds-hero` | **`--aurora`** (claro oficial: fundo aurora + título indigo + `.ds-hero__dark`) |
| Footer | `.ds-footer` | `__grid __col __links __bottom` |
| Stats | `.ds-stat` `.ds-statcard` | `__trend--up/--down` |
| Form CTA | `.ds-formcard` | — |
| Breadcrumb | `.ds-breadcrumb` | `.sep .current` |
| Preços | `.ds-price` | `--featured` (selo "Mais popular") |
| Passos/Timeline | `.ds-steps`/`.ds-step` · `.ds-timeline` | numeração automática |
| Depoimentos | `.ds-testimonial` | `.ds-person`, `.ds-avatar(--sm)`, `.ds-avatar-group` |
| Progress | `.ds-progress` | `__bar` |
| Tabela | `.ds-table` | `--card` |
| Paginação | `.ds-pagination` | `.is-active` |
| List group | `.ds-list` | `__item` |
| Tooltip | `.ds-tooltip` | `__bubble` |
| Modal | `.ds-modal-ov` | `.is-open`, `.ds-modal` |
| CTA banner | `.ds-cta-banner` | — |
| Divider/Quote | `.ds-divider` · `.ds-quote` | — |
| Logo cloud | `.ds-logocloud` | — |

**Regra:** nenhum componente usa biblioteca de ícones (sem Uicons/Font Awesome/Lucide).
Ícones decorativos são feitos com SVG inline, caracteres (‹ › + × ✓ ↔) ou selos/iniciais.

**Interatividade** (`js/ds-ui.js`, via delegação + `data-*`): accordion, tabs, carousel
(setas + bullets + scrollspy), toasts (`data-toast`), tema (`data-theme-toggle`),
sidebar mobile (`data-burger`), scrollspy (`data-spy`). Clipboard em `js/ds-clipboard.js`
(`data-copy-hex`, `data-copy-target`).

---

## 6. RD Station Builder

`pages` → seção `#builder` (na home) · lógica em `js/ds-builder.js`.

**Regras de geração:**
- 9 tipos: cards, preços, números, passos, depoimentos, accordion, tabs, carousel, CTA.
- Opções globais: cor de destaque, nº de colunas, fundo da seção
  (transparente/soft/escuro/gradiente), título e subtítulo de seção.
- **Namespacing obrigatório:** `.ds-dadosfera-[tipo]-[uid]`, com `uid = Date.now()+random`
  (base36). Garante múltiplos componentes na mesma página do RD Station **sem conflito**
  de CSS/JS.
- Código **autocontido**: traz `<style>` próprio + `<script>` em IIFE com
  `document.currentScript.previousElementSibling` (sem IDs globais, sem libs externas).
- Fonte do código gerado: corpo `Nunito`; títulos `"menco","Nunito"`.
- Saída copiável (botão "Copiar código"); preview isolado em `<iframe srcdoc>`.

---

## 7. Templates

`templates/` (arquivos isolados, prontos para colar) + páginas renderizadas em `pages/`.

- **E-mails** (`email-material.html`, `email-newsletter.html`): tabela `role="presentation"`,
  largura 600px, **estilos inline**, fonte `'Nunito',Arial,sans-serif` (e-mail-safe, sem
  Typekit), CTA pill `#1700A2`, header/footer profundos.
- **Pop-ups** autocontidos namespaced `.dsf-*`:
  - `popup-saida.html` — exit intent (mouse sai pelo topo) + fallback 25s; `sessionStorage`.
  - `popup-captacao.html` — overlay lateral, abre após 6s ou 40% de rolagem; `localStorage`.
- **Landing page** (`pages/05-landing-page.html`): 10 seções, hero `--aurora`.
- **Thank you** (`pages/06-thank-you.html`).

---

## 8. Convenções e publicação

- **Prefixos:** componentes `.ds-*`; código gerado para RD `.ds-dadosfera-*`; pop-ups `.dsf-*`.
- **Idioma:** pt-BR. **`<meta robots noindex,nofollow>`** em todas as páginas internas.
- **Sem dependências externas** além de: Google Fonts (Nunito), Adobe Typekit (Menco) e,
  só no login, GSAP + Three.js (3D). Nada de framework CSS.
- **Acesso:** gate client-side (`js/ds-auth.js`) — `dadosfera` / `Dadosfera@2026`
  (apenas anti-indexação, não é segurança).
- **Publicação:** GitHub Pages, repo público `Design-8DHubify/design-system-dadosfera`,
  branch `main`, raiz `/`. URL: `https://design-8dhubify.github.io/design-system-dadosfera/`.

---
© 2026 Dadosfera · Powered by **8D Hubify**
