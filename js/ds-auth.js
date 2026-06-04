/* ============================================================
   DADOSFERA DS — AUTH (gate simples client-side)
   Apenas para restringir a vitrine do design system.
   NÃO é segurança real — só evita indexação/curiosos.
   ============================================================ */
(function (w) {
  var USER = 'dadosfera';
  var PASS = 'Dadosfera@2026';
  var KEY  = 'ds-dadosfera-auth';

  var Auth = {
    login: function (u, p) {
      if (u === USER && p === PASS) {
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        return true;
      }
      return false;
    },
    isAuthed: function () {
      try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
    },
    logout: function () {
      try { sessionStorage.removeItem(KEY); } catch (e) {}
      w.location.replace(basePath() + 'login.html');
    },
    guard: function () {
      if (!this.isAuthed()) w.location.replace(basePath() + 'login.html');
    }
  };

  function basePath() {
    // resolve raiz tanto na home quanto em /pages/*
    return /\/pages\//.test(w.location.pathname) ? '../' : './';
  }

  w.DSAuth = Auth;
})(window);
