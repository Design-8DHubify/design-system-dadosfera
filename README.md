# Design System Dadosfera

Design System oficial da **Dadosfera**, com foco em **RD Station**. Desenvolvido pela
**8D Hubify**. Tudo em HTML, CSS e JavaScript nativos — sem build e **sem bibliotecas
externas** (nem fontes de ícones). A tela de login usa GSAP + Three.js apenas para o 3D.

🔒 Acesso restrito · `usuário: dadosfera` · `senha: Dadosfera@2026`
(gate apenas para evitar indexação — não é segurança real).

## Estrutura

| Arquivo | Descrição |
|---------|-----------|
| `login.html` | Tela de acesso — réplica do modelo 8D Hubify (Fortics), marca Dadosfera |
| `index.html` | **Design system completo em página única**: fundamentos, 25+ componentes, builder e templates |
| `pages/05-landing-page.html` | Landing page modelo (10 seções) |
| `pages/06-thank-you.html` | Página de obrigado |
| `templates/email-material.html` | E-mail de entrega de material |
| `templates/email-newsletter.html` | E-mail newsletter |
| `templates/popup-saida.html` | Pop-up de saída (exit intent) — autocontido |
| `templates/popup-captacao.html` | Pop-up de captação (overlay lateral) — autocontido |
| `css/` | `tokens` · `base` · `components` · `showcase` · `builder` |
| `js/` | `ds-auth` · `ds-clipboard` · `ds-ui` · `ds-builder` |
| `assets/logotipos/` | Logo oficial Dadosfera (SVG, PNG colorida e branca) |

## CSS base (use em qualquer LP)

```html
<link rel="stylesheet" href="css/tokens.css">      <!-- cores, tipografia, espaçamento -->
<link rel="stylesheet" href="css/base.css">        <!-- reset + tipografia base -->
<link rel="stylesheet" href="css/components.css">  <!-- componentes .ds-* -->
```

## Componentes (25+)

Botões (6 variações + grupo) · Inputs / select / textarea / checkbox / radio / switch /
input-group · Badges / tags / chips / breadcrumb · Alerts (4) / toasts · Cards / post cards /
feature card · Accordion · Tabs · Carousel · Preços · Passos / timeline · Depoimentos /
avatares · Stats / statcards · Progress · Tabela · Paginação · List group · Tooltip · Modal ·
CTA banner · Quote · Divider · Logo cloud.

## RD Station Builder

9 tipos (cards, preços, números, passos, depoimentos, accordion, tabs, carousel, CTA) com
opções de **cor, colunas, fundo e título de seção**. Gera código **autocontido e namespaced**
(`.ds-dadosfera-[tipo]-[id]`) com IDs únicos por bloco — vários componentes na mesma página
do RD Station sem conflito de CSS/JS. Sem ícones e sem dependências externas.

## Marca

- **Núcleo** `#1700A2` · **Profundo** `#0D003B` · **Ação** `#1863DC` · **Ciano** `#3BBFF0`
- Apoio: Lavanda `#A79EE8` · Laranja `#FF9800`
- Tipografia: **Menco** (display, proprietária — fallback Sora) · **Nunito** (corpo)
- Logo oficial baixada de dadosfera.ai em `assets/logotipos/`.

## Publicação (GitHub Pages)

```bash
git remote add origin https://github.com/Design-8DHubify/design-system-dadosfera.git
git branch -M main
git push -u origin main
```

Depois: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
URL pública: `https://design-8dhubify.github.io/design-system-dadosfera/`

---
© 2026 Dadosfera · Powered by **8D Hubify**
