/* ============================================================
   DADOSFERA DS — AUTH (gate simples client-side)
   Restringe a vitrine APENAS quando publicada (GitHub Pages).
   Em preview/local/dev o gate é desativado para não atrapalhar.
   NÃO é segurança real — só evita indexação/curiosos.
   ============================================================ */
(function (w) {
  var USER = 'dadosfera';
  var PASS = 'Dadosfera@2026';
  var KEY  = 'ds-dadosfera-auth';

  // O gate só vale em hosts de produção (ex.: *.github.io ou um
  // domínio configurado). Em localhost, 127.0.0.1, file:// ou
  // qualquer ambiente de preview, libera direto.
  function isProtectedHost() {
    var h = (w.location && w.location.hostname) || '';
    if (!h) return false;                 // file:// ou about:srcdoc
    if (/^localhost$|^127\.|^0\.0\.0\.0$|^\[?::1\]?$/.test(h)) return false;
    if (/\.local$/.test(h)) return false;
    // Hosts de publicação onde o gate fica ativo:
    return /github\.io$/.test(h) || /github\.dev$/.test(h);
  }

  var Auth = {
    login: function (u, p) {
      if (u === USER && p === PASS) {
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        return true;
      }
      return false;
    },
    isAuthed: function () {
      if (!isProtectedHost()) return true; // preview/local sempre liberado
      try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
    },
    logout: function () {
      try { sessionStorage.removeItem(KEY); } catch (e) {}
      w.location.replace(basePath() + 'login.html');
    },
    guard: function () {
      if (!isProtectedHost()) return;      // não bloqueia preview/local
      if (!this.isAuthed()) w.location.replace(basePath() + 'login.html');
    }
  };

  function basePath() {
    // resolve raiz tanto na home quanto em /pages/*
    return /\/pages\//.test(w.location.pathname) ? '../' : './';
  }

  w.DSAuth = Auth;
})(window);
