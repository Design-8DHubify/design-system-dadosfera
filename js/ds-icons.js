/* ============================================================
   DADOSFERA DS — GALERIA DE ÍCONES (Uicons / Flaticon)
   Busca, color picker em tempo real, tamanho, copiar HTML e
   download PNG (glifo → canvas). Único recurso externo: Uicons.
   ============================================================ */
(function (w, d) {
  'use strict';

  var PREFIX = 'fi fi-rr-'; // Uicons Regular Rounded
  // Curadoria de ícones úteis para LPs/RD Station
  var ICONS = ['rocket-lab','chart-line-up','bulb','shield-check','users','settings-sliders',
    'cloud','database','brain','target','rocket','dashboard','bell','envelope','phone-call',
    'comment','heart','star','bookmark','search','filter','calendar','clock','globe','lock',
    'key','credit-card','shopping-cart','gift','tags','badge-check','thumbs-up','share',
    'download','upload','link','paper-plane','megaphone','flag','map-marker','headset',
    'life-ring','graduation-cap','book-alt','file-invoice','chart-pie','stats','apps',
    'layers','box','cube','code','plug','workflow-alt','sparkles','magic-wand','diamond',
    'crown','trophy','flame','leaf','sun','moon','eye','play','pause','check','cross',
    'arrow-right','arrow-up-right','plus','minus','menu-burger','grid','list','user-add',
    'building','briefcase','handshake','coins','wallet','calculator','pulse','heart-rate'];

  var state = { color: '#1700A2', size: 48, q: '' };
  var el = {};

  function render() {
    var q = state.q.toLowerCase();
    var list = ICONS.filter(function (n) { return n.indexOf(q) !== -1; });
    el.grid.innerHTML = list.map(function (n) {
      return '<button class="ico" data-name="' + n + '" title="' + n + '">' +
        '<i class="' + PREFIX + n + '" style="font-size:' + state.size + 'px;color:' + state.color + '"></i>' +
        '<span>' + n + '</span></button>';
    }).join('') || '<p class="ds-text-soft">Nenhum ícone encontrado.</p>';
    el.count.textContent = list.length + ' ícones';
  }

  function snippet(name) {
    return '<i class="' + PREFIX + name + '" style="font-size:' + state.size + 'px;color:' + state.color + '"></i>';
  }

  function downloadPng(name) {
    var px = Math.max(64, state.size * 4);
    var cv = d.createElement('canvas'); cv.width = px; cv.height = px;
    var ctx = cv.getContext('2d');
    // espelha o glifo: pega o conteúdo ::before do ícone renderizado
    var probe = d.createElement('i'); probe.className = PREFIX + name;
    probe.style.cssText = 'position:absolute;left:-9999px;font-size:' + px + 'px';
    d.body.appendChild(probe);
    var cs = getComputedStyle(probe, '::before');
    var glyph = (cs.content || '').replace(/["']/g, '');
    var family = cs.fontFamily || 'uicons-regular-rounded';
    d.body.removeChild(probe);

    function paint() {
      ctx.clearRect(0, 0, px, px);
      ctx.fillStyle = state.color;
      ctx.font = (px * 0.8) + 'px "' + family.replace(/["']/g, '') + '"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(glyph, px / 2, px / 2);
      var a = d.createElement('a');
      a.download = 'dadosfera-' + name + '.png';
      a.href = cv.toDataURL('image/png'); a.click();
    }
    if (d.fonts && d.fonts.load) {
      d.fonts.load((px * 0.8) + 'px "' + family.replace(/["']/g, '') + '"').then(paint, paint);
    } else { paint(); }
  }

  function bind() {
    el.search.addEventListener('input', function () { state.q = el.search.value; render(); });
    el.color.addEventListener('input', function () { state.color = el.color.value; render(); });
    el.size.addEventListener('input', function () { state.size = +el.size.value; el.sizeval.textContent = state.size + 'px'; render(); });
    el.grid.addEventListener('click', function (e) {
      var b = e.target.closest('.ico'); if (!b) return;
      var name = b.getAttribute('data-name');
      // copia HTML por padrão; Alt+clique baixa PNG
      if (e.altKey) { downloadPng(name); return; }
      w.DSClipboard.copy(snippet(name)).then(function () { w.DSClipboard.toast('HTML copiado · ' + name + ' (Alt+clique = PNG)', 'success'); });
    });
  }

  d.addEventListener('DOMContentLoaded', function () {
    if (!d.getElementById('ico-grid')) return;
    el.grid = d.getElementById('ico-grid');
    el.search = d.getElementById('ico-search');
    el.color = d.getElementById('ico-color');
    el.size = d.getElementById('ico-size');
    el.sizeval = d.getElementById('ico-sizeval');
    el.count = d.getElementById('ico-count');
    bind(); render();
  });
})(window, document);
