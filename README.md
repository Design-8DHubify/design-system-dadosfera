# Design System Dadosfera

Design System oficial da **Dadosfera**, com foco em **RD Station**. Desenvolvido pela
**8D Hubify**. Tudo em HTML, CSS e JavaScript nativos — sem build, sem dependências
pesadas (único recurso externo: [Uicons/Flaticon](https://www.flaticon.com/uicons)).

🔒 Acesso restrito · `usuário: dadosfera` · `senha: Dadosfera@2026`
(gate apenas para evitar indexação — não é segurança real).

## O que tem aqui

| Página | Descrição |
|--------|-----------|
| `login.html` | Tela de acesso (modelo 8D Hubify) |
| `index.html` | Home do design system |
| `pages/01-fundamentos.html` | Cores (copy de HEX) + tipografia |
| `pages/02-componentes.html` | +10 componentes documentados com código |
| `pages/03-rd-builder.html` | **Construtor plug & play para RD Station** |
| `pages/04-icones.html` | Galeria Uicons (busca, cor, tamanho, copy, PNG) |
| `pages/05-landing-page.html` | LP modelo de 10 seções |
| `pages/06-thank-you.html` | Página de obrigado |
| `pages/07-emails.html` | Templates de e-mail (material + newsletter) |
| `pages/08-popups.html` | Pop-up de saída + pop-up de captação |
| `templates/` | Arquivos isolados (e-mails e pop-ups) |
| `css/` · `js/` | Base do sistema (tokens, base, componentes, builder…) |

## CSS base (use em qualquer LP)

```html
<link rel="stylesheet" href="css/tokens.css">      <!-- cores, tipografia, espaçamento -->
<link rel="stylesheet" href="css/base.css">        <!-- reset + tipografia base -->
<link rel="stylesheet" href="css/components.css">  <!-- componentes .ds-* -->
<link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css">
```

## Marca

- **Núcleo** `#1700A2` · **Profundo** `#0D003B` · **Ação** `#1863DC` · **Ciano** `#3BBFF0`
- Apoio: Lavanda `#A79EE8` · Laranja `#FF9800`
- Tipografia: **Menco** (display, proprietária — fallback Sora) · **Nunito** (corpo)

> Logo: substitua o placeholder SVG por `assets/logotipos/` (versões colorida e branca).

## RD Station Builder

O construtor gera código **autocontido e namespaced** (`.ds-dadosfera-[tipo]-[id]`) com
IDs únicos por bloco. Isso permite colar vários componentes na mesma página do RD Station
sem conflito de CSS/JS. Para ícones nos cards, inclua o CSS Uicons no `<head>` da LP.

## Publicação (GitHub Pages)

> Repositório público sugerido: `Design-8DHubify/design-system-dadosfera`

```bash
# já versionado localmente; conecte o remoto e envie
git remote add origin https://github.com/Design-8DHubify/design-system-dadosfera.git
git branch -M main
git push -u origin main
```

Depois, no GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
A URL pública fica disponível em 1–3 minutos:
`https://design-8dhubify.github.io/design-system-dadosfera/`

---
© 2026 Dadosfera · Powered by **8D Hubify**
