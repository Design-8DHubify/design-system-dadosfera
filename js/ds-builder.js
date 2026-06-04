/* ============================================================
   DADOSFERA DS — RD STATION BUILDER
   Gera HTML+CSS+JS plug & play para colar em LPs do RD Station.
   - Namespacing: .ds-dadosfera-[tipo]-[uid]  (sem conflito)
   - IDs únicos por bloco via Date.now() + closures
   - Vanilla, autocontido, sem libs externas (exceto Uicons p/ ícones)
   ============================================================ */
(function (w, d) {
  'use strict';

  var BRAND = { nucleo:'#1700A2', acao:'#1863DC', ciano:'#3BBFF0', profundo:'#0D003B' };

  var state = {
    type: 'cards',
    color: BRAND.nucleo,
    items: []
  };

  var seed = {
    cards: function () { return { title:'Título do card', text:'Descrição breve do benefício ou recurso.', icon:'fi fi-rr-rocket-lab', img:'', cta:'Saiba mais', url:'#', target:'_self' }; },
    accordion: function () { return { title:'Pergunta frequente?', text:'Resposta clara e objetiva para o usuário.', icon:'', img:'', cta:'', url:'', target:'_self' }; },
    tabs: function () { return { title:'Aba', text:'Conteúdo desta aba.', icon:'', img:'', cta:'', url:'', target:'_self' }; },
    carousel: function () { return { title:'Depoimento', text:'"Texto do depoimento ou destaque."', icon:'', img:'', cta:'', url:'', target:'_self' }; }
  };

  /* refs DOM */
  var el = {};

  function $(s, ctx) { return (ctx || d).querySelector(s); }

  function reset(type) {
    state.type = type;
    state.items = [seed[type](), seed[type]()];
    if (type === 'cards') state.items.push(seed.cards());
    renderItems(); render();
  }

  /* ---------- PAINEL DE EDIÇÃO ---------- */
  function renderItems() {
    el.items.innerHTML = '';
    state.items.forEach(function (it, i) {
      var wrap = d.createElement('div');
      wrap.className = 'bld__item';
      var showIcon = state.type === 'cards';
      var showImg = state.type === 'cards' || state.type === 'carousel';
      var showCta = state.type === 'cards';
      wrap.innerHTML =
        '<div class="bld__item-head"><strong>Item ' + (i + 1) + '</strong>' +
        '<button class="bld__del" data-del="' + i + '">remover</button></div>' +
        '<div class="bld__field"><label>Título</label><input data-f="title" data-i="' + i + '" value="' + esc(it.title) + '"></div>' +
        '<div class="bld__field"><label>Descrição</label><textarea data-f="text" data-i="' + i + '">' + esc(it.text) + '</textarea></div>' +
        (showIcon ? '<div class="bld__field"><label>Ícone (classe Uicons)</label><input data-f="icon" data-i="' + i + '" value="' + esc(it.icon) + '" placeholder="fi fi-rr-rocket-lab"></div>' : '') +
        (showImg ? '<div class="bld__field"><label>URL da imagem (opcional)</label><input data-f="img" data-i="' + i + '" value="' + esc(it.img) + '" placeholder="https://..."></div>' : '') +
        (showCta ? '<div class="bld__row"><div class="bld__field"><label>Texto CTA</label><input data-f="cta" data-i="' + i + '" value="' + esc(it.cta) + '"></div>' +
          '<div class="bld__field"><label>Abrir em</label><select data-f="target" data-i="' + i + '"><option value="_self"' + (it.target === '_self' ? ' selected' : '') + '>Mesma aba</option><option value="_blank"' + (it.target === '_blank' ? ' selected' : '') + '>Nova aba</option></select></div></div>' +
          '<div class="bld__field"><label>URL do CTA</label><input data-f="url" data-i="' + i + '" value="' + esc(it.url) + '" placeholder="#"></div>' : '');
      el.items.appendChild(wrap);
    });
  }

  /* ---------- GERAÇÃO DE CÓDIGO ---------- */
  function uid() { return Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function build() {
    var id = uid();
    var ns = 'ds-dadosfera-' + state.type + '-' + id;
    var c = state.color;
    var gens = { cards: genCards, accordion: genAccordion, tabs: genTabs, carousel: genCarousel };
    return gens[state.type](ns, id, c, state.items);
  }

  function wrapper(css, html, js) {
    return '<!-- Dadosfera Design System · componente gerado -->\n<style>\n' + css + '\n</style>\n' + html + (js ? '\n<script>\n' + js + '\n<\/script>' : '');
  }

  function genCards(ns, id, c, items) {
    var css =
'.' + ns + '{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;font-family:"Nunito",system-ui,sans-serif}\n' +
'.' + ns + ' .card{background:#fff;border:1px solid #E1E3EF;border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(13,0,59,.08);transition:transform .25s,box-shadow .25s}\n' +
'.' + ns + ' .card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(13,0,59,.14)}\n' +
'.' + ns + ' .ic{width:52px;height:52px;border-radius:10px;display:grid;place-items:center;background:' + c + ';color:#fff;font-size:22px;margin-bottom:16px}\n' +
'.' + ns + ' img.ic-img{width:52px;height:52px;border-radius:10px;object-fit:cover;margin-bottom:16px}\n' +
'.' + ns + ' h3{font-size:18px;margin:0 0 8px;color:#212121}\n' +
'.' + ns + ' p{font-size:14px;color:#6B7280;margin:0 0 16px;line-height:1.6}\n' +
'.' + ns + ' a.cta{display:inline-block;font-weight:700;font-size:14px;color:' + c + ';text-decoration:none}\n' +
'.' + ns + ' a.cta:hover{text-decoration:underline}';
    var html = '<div class="' + ns + '">\n' + items.map(function (it) {
      var media = it.img ? '<img class="ic-img" src="' + esc(it.img) + '" alt="">' : (it.icon ? '<div class="ic"><i class="' + esc(it.icon) + '"></i></div>' : '');
      var cta = it.cta && it.url ? '<a class="cta" href="' + esc(it.url) + '" target="' + esc(it.target) + '">' + esc(it.cta) + ' →</a>' : '';
      return '  <div class="card">' + media + '<h3>' + esc(it.title) + '</h3><p>' + esc(it.text) + '</p>' + cta + '</div>';
    }).join('\n') + '\n</div>';
    return wrapper(css, html, '');
  }

  function genAccordion(ns, id, c, items) {
    var css =
'.' + ns + '{font-family:"Nunito",system-ui,sans-serif;border:1px solid #E1E3EF;border-radius:10px;overflow:hidden;max-width:760px}\n' +
'.' + ns + ' .it+.it{border-top:1px solid #E1E3EF}\n' +
'.' + ns + ' .hd{width:100%;text-align:left;background:#fff;border:0;cursor:pointer;padding:18px 20px;font-weight:700;font-size:16px;color:#212121;display:flex;justify-content:space-between;gap:12px;align-items:center}\n' +
'.' + ns + ' .hd:hover{background:#F7F8FC}\n' +
'.' + ns + ' .ch{transition:transform .25s;color:' + c + ';font-weight:800}\n' +
'.' + ns + ' .it.open .ch{transform:rotate(45deg)}\n' +
'.' + ns + ' .pn{max-height:0;overflow:hidden;transition:max-height .28s ease}\n' +
'.' + ns + ' .pn p{margin:0;padding:0 20px 18px;color:#6B7280;font-size:14px;line-height:1.6}';
    var html = '<div class="' + ns + '">\n' + items.map(function (it) {
      return '  <div class="it"><button class="hd" type="button">' + esc(it.title) + '<span class="ch">+</span></button><div class="pn"><p>' + esc(it.text) + '</p></div></div>';
    }).join('\n') + '\n</div>';
    var js =
'(function(){var root=document.currentScript.previousElementSibling;' +
'root.addEventListener("click",function(e){var h=e.target.closest(".hd");if(!h)return;' +
'var it=h.parentNode,pn=it.querySelector(".pn"),op=it.classList.toggle("open");' +
'pn.style.maxHeight=op?pn.scrollHeight+"px":"0";});})();';
    return wrapper(css, html, js);
  }

  function genTabs(ns, id, c, items) {
    var css =
'.' + ns + '{font-family:"Nunito",system-ui,sans-serif;max-width:760px}\n' +
'.' + ns + ' .nav{display:flex;gap:4px;border-bottom:2px solid #E1E3EF;flex-wrap:wrap}\n' +
'.' + ns + ' .tb{background:0;border:0;cursor:pointer;padding:12px 16px;font-weight:700;font-size:14px;color:#6B7280;border-bottom:2px solid transparent;margin-bottom:-2px}\n' +
'.' + ns + ' .tb.on{color:' + c + ';border-bottom-color:' + c + '}\n' +
'.' + ns + ' .pn{display:none;padding:20px 0;color:#3A3A44;font-size:15px;line-height:1.6}\n' +
'.' + ns + ' .pn.on{display:block}';
    var html = '<div class="' + ns + '">\n  <div class="nav">' +
      items.map(function (it, i) { return '<button class="tb' + (i === 0 ? ' on' : '') + '" type="button" data-t="' + i + '">' + esc(it.title) + '</button>'; }).join('') +
      '</div>\n' +
      items.map(function (it, i) { return '  <div class="pn' + (i === 0 ? ' on' : '') + '" data-p="' + i + '">' + esc(it.text) + '</div>'; }).join('\n') +
      '\n</div>';
    var js =
'(function(){var root=document.currentScript.previousElementSibling;' +
'root.addEventListener("click",function(e){var b=e.target.closest(".tb");if(!b)return;var t=b.getAttribute("data-t");' +
'root.querySelectorAll(".tb").forEach(function(x){x.classList.toggle("on",x===b);});' +
'root.querySelectorAll(".pn").forEach(function(p){p.classList.toggle("on",p.getAttribute("data-p")===t);});});})();';
    return wrapper(css, html, js);
  }

  function genCarousel(ns, id, c, items) {
    var css =
'.' + ns + '{font-family:"Nunito",system-ui,sans-serif;position:relative;max-width:860px;margin:auto}\n' +
'.' + ns + ' .tr{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:8px;-ms-overflow-style:none;scrollbar-width:none}\n' +
'.' + ns + ' .tr::-webkit-scrollbar{display:none}\n' +
'.' + ns + ' .sl{flex:0 0 320px;max-width:85%;scroll-snap-align:center;background:#fff;border:1px solid #E1E3EF;border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(13,0,59,.08)}\n' +
'.' + ns + ' .sl img{width:100%;height:160px;object-fit:cover;border-radius:10px;margin-bottom:14px}\n' +
'.' + ns + ' .sl h3{margin:0 0 8px;font-size:17px;color:#212121}\n' +
'.' + ns + ' .sl p{margin:0;color:#6B7280;font-size:14px;line-height:1.6}\n' +
'.' + ns + ' .bt{position:absolute;top:42%;width:42px;height:42px;border:0;border-radius:50%;background:#fff;color:' + c + ';cursor:pointer;box-shadow:0 4px 12px rgba(13,0,59,.14);font-size:20px}\n' +
'.' + ns + ' .pv{left:-6px}.' + ns + ' .nx{right:-6px}';
    var html = '<div class="' + ns + '">\n  <button class="bt pv" type="button">‹</button>\n  <div class="tr">' +
      items.map(function (it) {
        var img = it.img ? '<img src="' + esc(it.img) + '" alt="">' : '';
        return '<div class="sl">' + img + '<h3>' + esc(it.title) + '</h3><p>' + esc(it.text) + '</p></div>';
      }).join('') +
      '</div>\n  <button class="bt nx" type="button">›</button>\n</div>';
    var js =
'(function(){var root=document.currentScript.previousElementSibling;var tr=root.querySelector(".tr");' +
'function step(dir){var s=root.querySelector(".sl");tr.scrollBy({left:dir*(s.offsetWidth+20),behavior:"smooth"});}' +
'root.querySelector(".pv").addEventListener("click",function(){step(-1);});' +
'root.querySelector(".nx").addEventListener("click",function(){step(1);});})();';
    return wrapper(css, html, js);
  }

  /* ---------- RENDER PREVIEW + OUTPUT ---------- */
  function render() {
    var code = build();
    el.output.textContent = code;
    // preview: usa iframe srcdoc para isolar (sem conflito com a doc)
    var doc = '<!doctype html><html><head><meta charset="utf-8">' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">' +
      '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">' +
      '<link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css">' +
      '<style>body{margin:0;padding:24px;background:#F7F8FC;font-family:"Nunito",sans-serif}</style></head><body>' +
      code + '</body></html>';
    el.frame.srcdoc = doc;
  }

  /* ---------- EVENTOS ---------- */
  function bind() {
    // tipo de componente
    el.types.addEventListener('click', function (e) {
      var b = e.target.closest('.bld__type'); if (!b) return;
      el.types.querySelectorAll('.bld__type').forEach(function (x) { x.classList.toggle('is-active', x === b); });
      reset(b.getAttribute('data-type'));
    });
    // edição de itens (input/textarea/select)
    el.items.addEventListener('input', function (e) {
      var f = e.target.getAttribute('data-f'); if (!f) return;
      var i = +e.target.getAttribute('data-i');
      state.items[i][f] = e.target.value;
      render();
    });
    el.items.addEventListener('change', function (e) {
      if (e.target.getAttribute('data-f') === 'target') {
        state.items[+e.target.getAttribute('data-i')].target = e.target.value; render();
      }
    });
    // remover item
    el.items.addEventListener('click', function (e) {
      var del = e.target.closest('[data-del]'); if (!del) return;
      if (state.items.length <= 1) { w.DSClipboard && w.DSClipboard.toast('Mantenha ao menos 1 item', 'danger'); return; }
      state.items.splice(+del.getAttribute('data-del'), 1);
      renderItems(); render();
    });
    // adicionar item
    el.add.addEventListener('click', function () { state.items.push(seed[state.type]()); renderItems(); render(); });
    // cor de destaque
    el.color.addEventListener('input', function () { state.color = el.color.value; render(); });
  }

  d.addEventListener('DOMContentLoaded', function () {
    if (!d.getElementById('bld-root')) return;
    el.types  = $('#bld-types');
    el.items  = $('#bld-items');
    el.add    = $('#bld-add');
    el.color  = $('#bld-color');
    el.output = $('#bld-output');
    el.frame  = $('#bld-frame');
    bind();
    reset('cards');
  });

})(window, document);
