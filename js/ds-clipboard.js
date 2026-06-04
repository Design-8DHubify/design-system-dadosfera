/* ============================================================
   DADOSFERA DS — CLIPBOARD
   Copia HEX (swatches) e código (blocos). Toast de feedback.
   ============================================================ */
(function (w, d) {
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (res) {
      var ta = d.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      d.body.appendChild(ta); ta.select();
      try { d.execCommand('copy'); } catch (e) {}
      d.body.removeChild(ta); res();
    });
  }

  function toast(msg, type) {
    var wrap = d.querySelector('.ds-toast-wrap');
    if (!wrap) { wrap = d.createElement('div'); wrap.className = 'ds-toast-wrap'; d.body.appendChild(wrap); }
    var t = d.createElement('div');
    t.className = 'ds-toast' + (type ? ' ds-toast--' + type : '');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; }, 1800);
    setTimeout(function () { t.remove(); }, 2200);
  }

  d.addEventListener('click', function (e) {
    // swatch de cor
    var sw = e.target.closest('[data-copy-hex]');
    if (sw) {
      var hex = sw.getAttribute('data-copy-hex');
      copy(hex).then(function () { toast('Copiado: ' + hex, 'success'); });
      return;
    }
    // botão de copiar código
    var btn = e.target.closest('[data-copy-target]');
    if (btn) {
      var sel = btn.getAttribute('data-copy-target');
      var src = d.querySelector(sel);
      if (src) {
        copy(src.textContent).then(function () {
          var old = btn.innerHTML;
          btn.classList.add('copied'); btn.textContent = '✓ Copiado';
          setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = old; }, 1600);
        });
      }
    }
  });

  w.DSClipboard = { copy: copy, toast: toast };
})(window, document);
