# Design System Dadosfera

Design System oficial da **Dadosfera**, para **landing pages e e-mail marketing**. Desenvolvido pela
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

## CSS base (use em TODA landing page)

Arquivo **único e autossuficiente** `css/dadosfera-base.css` (reset + tokens + tipografia +
todos os componentes `.ds-*`). Cole o conteúdo dele dentro de um `<style>` no `<head>` da LP
— sem depender de arquivos externos. A home tem a seção **“CSS Base”** com botões de
copiar/baixar.

```html
<!-- no <head> da LP -->
<link rel="stylesheet" href="https://use.typekit.net/lrl6igp.css"><!-- Menco -->
<style>
  /* cole aqui TODO o conteúdo de css/dadosfera-base.css */
</style>
```

> No design system (site de doc) os estilos ficam divididos em
> `css/dadosfera-base.css` é **arquivo único, sem variáveis CSS e sem modo escuro** (valores
> em HEX direto, com `!important` onde necessário) — feito para colar nas suas landing pages.
> `showcase.css` e `builder.css` são exclusivos do site de documentação.

## Componentes (25+)

Botões (6 variações + grupo) · Inputs / select / textarea / checkbox / radio / switch /
input-group · Badges / tags / chips / breadcrumb · Alerts (4) / toasts · Cards / post cards /
feature card · Accordion · Tabs · Carousel · Preços · Passos / timeline · Depoimentos /
avatares · Stats / statcards · Progress · Tabela · Paginação · List group · Tooltip · Modal ·
CTA banner · Quote · Divider · Logo cloud.

## Construtor de Componentes

9 tipos (cards, preços, números, passos, depoimentos, accordion, tabs, carousel, CTA) com
opções de **cor, colunas, fundo e título de seção**. Gera código **autocontido e namespaced**
(`.ds-dadosfera-[tipo]-[id]`) com IDs únicos por bloco — vários componentes na mesma página
na mesma página sem conflito de CSS/JS. Sem ícones e sem dependências externas.

## Marca

- **Núcleo** `#1700A2` · **Profundo** `#0D003B` · **Ação** `#1863DC` · **Ciano** `#3BBFF0`
- Apoio: Lavanda `#A79EE8` · Laranja `#FF9800`
- Tipografia: **Menco** (display, via Adobe Typekit `lrl6igp`, família `"menco"`) · **Nunito** (corpo e fallback do menco, Google Fonts). Sem Sora.
- Regras completas do sistema em **[`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md)**.
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
