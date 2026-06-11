/* ============================================================
   DADOSFERA DS — RD STATION BUILDER (v2)
   Gera HTML+CSS+JS plug & play para colar em LPs do RD Station.
   - 9 componentes: cards, accordion, tabs, carousel, pricing,
     steps, testimonials, cta, stats
   - Namespacing .ds-dadosfera-[tipo]-[uid] + IDs únicos (Date.now)
   - Opções globais: cor, colunas, fundo, título/subtítulo de seção
   - Vanilla, autocontido, SEM ícones e SEM libs externas
   ============================================================ */
(function (w, d) {
  'use strict';

  var TYPES = {
    cards:        { label:'Cards',        cols:true,  fields:['title','text','seal','cta'] },
    pricing:      { label:'Preços',       cols:true,  fields:['title','price','period','features','cta'] },
    stats:        { label:'Números',      cols:true,  fields:['num','text'] },
    steps:        { label:'Passos',       cols:false, fields:['title','text'] },
    testimonials: { label:'Depoimentos',  cols:true,  fields:['text','name','role'] },
    accordion:    { label:'Accordion',    cols:false, fields:['title','text'] },
    tabs:         { label:'Tabs',         cols:false, fields:['title','text'] },
    carousel:     { label:'Carousel',     cols:false, fields:['title','text','img'] },
    cta:          { label:'CTA Banner',   cols:false, fields:['title','text','cta'] }
  };

  var state = {
    type: 'cards', color: '#1700A2', cols: 3, bg: 'transparent',
    secTitle: '', secSub: '', items: []
  };

  var seed = {
    cards: function(i){ return { title:'Recurso '+i, text:'Descrição breve do benefício para o usuário.', seal:String(i), cta:'Saiba mais', url:'#', target:'_self' }; },
    pricing: function(i){ return { title:['Starter','Pro','Enterprise'][i-1]||('Plano '+i), price:['49','99','—'][i-1]||'99', period:'/mês', features:'Recurso A\nRecurso B\nRecurso C', cta:'Assinar', url:'#', target:'_self' }; },
    stats: function(i){ return { num:['20+','+18%','3x'][i-1]||'10+', text:['Integrações','Eficiência','Velocidade'][i-1]||'Métrica' }; },
    steps: function(i){ return { title:'Passo '+i, text:'O que acontece nesta etapa.' }; },
    testimonials: function(i){ return { text:'Excelente plataforma, mudou nossa operação de dados.', name:'Cliente '+i, role:'Cargo · Empresa' }; },
    accordion: function(i){ return { title:'Pergunta '+i+'?', text:'Resposta clara e objetiva.' }; },
    tabs: function(i){ return { title:'Aba '+i, text:'Conteúdo da aba '+i+'.' }; },
    carousel: function(i){ return { title:'Slide '+i, text:'Texto do slide.', img:'' }; },
    cta: function(){ return { title:'Pronto para começar?', text:'Agende uma demonstração gratuita hoje.', cta:'Agende uma demo', url:'#', target:'_blank' }; }
  };

  var el = {};
  function $(s){ return d.querySelector(s); }

  function defaults(type){
    var n = type==='cta' ? 1 : (type==='pricing'?3 : type==='stats'?3 : type==='testimonials'?2 : 3);
    var arr=[]; for (var i=1;i<=n;i++) arr.push(seed[type](i)); return arr;
  }

  function reset(type){
    state.type = type;
    state.cols = (type==='stats'||type==='pricing')?3 : 3;
    state.items = defaults(type);
    if (el.colsWrap) el.colsWrap.style.display = TYPES[type].cols ? '' : 'none';
    renderItems(); render();
  }

  /* ---------- PAINEL DE EDIÇÃO ---------- */
  function field(label, f, i, val, ta){
    if (ta) return '<div class="bld__field"><label>'+label+'</label><textarea data-f="'+f+'" data-i="'+i+'">'+esc(val)+'</textarea></div>';
    return '<div class="bld__field"><label>'+label+'</label><input data-f="'+f+'" data-i="'+i+'" value="'+esc(val)+'"></div>';
  }

  function renderItems(){
    el.items.innerHTML='';
    var fs = TYPES[state.type].fields;
    state.items.forEach(function(it,i){
      var h='<div class="bld__item-head"><strong>Item '+(i+1)+'</strong><button class="bld__del" data-del="'+i+'">remover</button></div>';
      if (fs.indexOf('seal')>-1) h+= field('Selo (nº ou letra)','seal',i,it.seal);
      if (fs.indexOf('num')>-1) h+= field('Número (ex: 20+)','num',i,it.num);
      if (fs.indexOf('title')>-1) h+= field('Título','title',i,it.title);
      if (fs.indexOf('price')>-1) h+= '<div class="bld__row">'+field('Preço','price',i,it.price)+field('Período','period',i,it.period)+'</div>';
      if (fs.indexOf('text')>-1) h+= field(state.type==='testimonials'?'Depoimento':'Descrição','text',i,it.text,true);
      if (fs.indexOf('features')>-1) h+= field('Itens (um por linha)','features',i,it.features,true);
      if (fs.indexOf('name')>-1) h+= '<div class="bld__row">'+field('Nome','name',i,it.name)+field('Cargo','role',i,it.role)+'</div>';
      if (fs.indexOf('img')>-1) h+= field('URL da imagem (opcional)','img',i,it.img);
      if (fs.indexOf('cta')>-1) h+= field('Texto do CTA','cta',i,it.cta) +
        '<div class="bld__row">'+field('URL do CTA','url',i,it.url)+
        '<div class="bld__field"><label>Abrir em</label><select data-f="target" data-i="'+i+'"><option value="_self"'+(it.target==='_self'?' selected':'')+'>Mesma aba</option><option value="_blank"'+(it.target==='_blank'?' selected':'')+'>Nova aba</option></select></div></div>';
      var wrap=d.createElement('div'); wrap.className='bld__item'; wrap.innerHTML=h; el.items.appendChild(wrap);
    });
    el.add.style.display = state.type==='cta' ? 'none' : '';
  }

  /* ---------- UTIL ---------- */
  function uid(){ return Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function bgCss(bg){
    if(bg==='soft') return 'background:#F7F8FC;padding:48px 24px;border-radius:20px;';
    if(bg==='dark') return 'background:#0D003B;padding:48px 24px;border-radius:20px;';
    if(bg==='gradient') return 'background:linear-gradient(135deg,#0D003B,#1700A2 55%,#1863DC);padding:48px 24px;border-radius:20px;';
    return '';
  }
  function txtColor(bg){ return (bg==='dark'||bg==='gradient')?'#fff':'#212121'; }
  function subColor(bg){ return (bg==='dark'||bg==='gradient')?'rgba(255,255,255,.8)':'#6B7280'; }

  /* ---------- GERAÇÃO ---------- */
  function build(){
    var id=uid(), ns='ds-dadosfera-'+state.type+'-'+id, c=state.color;
    var head='';
    if (state.secTitle || state.secSub){
      head = '\n  <div class="'+ns+'-head">'+
        (state.secTitle?'<h2>'+esc(state.secTitle)+'</h2>':'')+
        (state.secSub?'<p>'+esc(state.secSub)+'</p>':'')+'</div>';
    }
    var gens={cards:genCards,pricing:genPricing,stats:genStats,steps:genSteps,testimonials:genTesti,accordion:genAcc,tabs:genTabs,carousel:genCar,cta:genCta};
    return gens[state.type](ns,id,c,state.items,head);
  }

  function shell(ns,css,inner,js,head){
    var wrapCss='.'+ns+'-wrap{'+bgCss(state.bg)+'font-family:"Nunito",system-ui,sans-serif}\n'+
      '.'+ns+'-head{text-align:center;max-width:640px;margin:0 auto 32px}\n'+
      '.'+ns+'-head h2{font-family:"menco","Nunito",sans-serif;font-weight:600;font-size:30px;margin:0 0 8px;color:'+((state.bg==='dark'||state.bg==='gradient')?'#fff':state.color)+'}\n'+
      '.'+ns+'-head p{margin:0;color:'+subColor(state.bg)+';font-size:16px}';
    return '<!-- Dadosfera Design System · componente gerado -->\n<style>\n'+wrapCss+'\n'+css+'\n</style>\n<div class="'+ns+'-wrap">'+(head||'')+'\n'+inner+'\n</div>'+(js?'\n<script>\n'+js+'\n<\/script>':'');
  }

  function gridCss(ns,c){ return '.'+ns+'{display:grid;grid-template-columns:repeat('+state.cols+',1fr);gap:20px}\n@media(max-width:760px){.'+ns+'{grid-template-columns:1fr}}'; }

  function genCards(ns,id,c,items,head){
    var css=gridCss(ns,c)+'\n'+
'.'+ns+' .card{background:#fff;border:1px solid #E1E3EF;border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(13,0,59,.08);transition:transform .25s,box-shadow .25s}\n'+
'.'+ns+' .card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(13,0,59,.14)}\n'+
'.'+ns+' .seal{width:48px;height:48px;border-radius:10px;display:grid;place-items:center;background:'+c+';color:#fff;font-family:"menco","Nunito",sans-serif;font-weight:800;font-size:20px;margin-bottom:16px}\n'+
'.'+ns+' h3{font-size:18px;margin:0 0 8px;color:#212121}\n'+
'.'+ns+' p{font-size:14px;color:#6B7280;margin:0 0 16px;line-height:1.6}\n'+
'.'+ns+' a.cta{display:inline-block;font-weight:700;font-size:14px;color:'+c+';text-decoration:none}\n'+
'.'+ns+' a.cta:hover{text-decoration:underline}';
    var inner='<div class="'+ns+'">\n'+items.map(function(it){
      var cta=it.cta&&it.url?'<a class="cta" href="'+esc(it.url)+'" target="'+esc(it.target)+'">'+esc(it.cta)+' →</a>':'';
      return '    <div class="card"><div class="seal">'+esc(it.seal||'•')+'</div><h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p>'+cta+'</div>';
    }).join('\n')+'\n  </div>';
    return shell(ns,css,inner,'',head);
  }

  function genPricing(ns,id,c,items,head){
    var css=gridCss(ns,c)+'\n'+
'.'+ns+' .pl{background:#fff;border:1px solid #E1E3EF;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;box-shadow:0 1px 3px rgba(13,0,59,.08)}\n'+
'.'+ns+' .pl .nm{font-family:"menco","Nunito",sans-serif;font-weight:700;font-size:18px;color:#212121}\n'+
'.'+ns+' .pl .vl{font-family:"menco","Nunito",sans-serif;font-weight:800;font-size:40px;color:#212121}\n'+
'.'+ns+' .pl .vl small{font-size:14px;color:#6B7280;font-weight:400}\n'+
'.'+ns+' .pl ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:14px;color:#6B7280}\n'+
'.'+ns+' .pl li::before{content:"✓";color:#4DB04F;font-weight:800;margin-right:8px}\n'+
'.'+ns+' .pl a{margin-top:auto;text-align:center;text-decoration:none;background:'+c+';color:#fff;font-weight:700;padding:12px;border-radius:999px;font-size:14px}';
    var inner='<div class="'+ns+'">\n'+items.map(function(it){
      var feats=(it.features||'').split('\n').filter(Boolean).map(function(f){return '<li>'+esc(f)+'</li>';}).join('');
      var cta=it.cta?'<a href="'+esc(it.url||'#')+'" target="'+esc(it.target||'_self')+'">'+esc(it.cta)+'</a>':'';
      return '    <div class="pl"><div class="nm">'+esc(it.title)+'</div><div class="vl">'+esc(it.price)+'<small>'+esc(it.period)+'</small></div><ul>'+feats+'</ul>'+cta+'</div>';
    }).join('\n')+'\n  </div>';
    return shell(ns,css,inner,'',head);
  }

  function genStats(ns,id,c,items,head){
    var css=gridCss(ns,c)+'\n'+
'.'+ns+' .st{text-align:center}\n'+
'.'+ns+' .st .n{font-family:"menco","Nunito",sans-serif;font-weight:800;font-size:44px;background:linear-gradient(135deg,'+c+',#3BBFF0);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1.1}\n'+
'.'+ns+' .st .l{color:'+subColor(state.bg)+';font-size:14px;margin-top:4px}';
    var inner='<div class="'+ns+'">\n'+items.map(function(it){
      return '    <div class="st"><div class="n">'+esc(it.num)+'</div><div class="l">'+esc(it.text)+'</div></div>';
    }).join('\n')+'\n  </div>';
    return shell(ns,css,inner,'',head);
  }

  function genSteps(ns,id,c,items,head){
    var css='.'+ns+'{display:flex;flex-direction:column;gap:24px;max-width:640px;margin:auto}\n'+
'.'+ns+' .stp{display:flex;gap:16px;align-items:flex-start}\n'+
'.'+ns+' .nm{flex-shrink:0;width:40px;height:40px;border-radius:50%;background:'+c+';color:#fff;display:grid;place-items:center;font-family:"menco","Nunito",sans-serif;font-weight:800}\n'+
'.'+ns+' h3{margin:0 0 4px;font-size:18px;color:'+txtColor(state.bg)+'}\n'+
'.'+ns+' p{margin:0;color:'+subColor(state.bg)+';font-size:14px;line-height:1.6}';
    var inner='<div class="'+ns+'">\n'+items.map(function(it,i){
      return '    <div class="stp"><div class="nm">'+(i+1)+'</div><div><h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p></div></div>';
    }).join('\n')+'\n  </div>';
    return shell(ns,css,inner,'',head);
  }

  function genTesti(ns,id,c,items,head){
    var css=gridCss(ns,c)+'\n'+
'.'+ns+' .tc{background:#fff;border:1px solid #E1E3EF;border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(13,0,59,.08)}\n'+
'.'+ns+' .q{font-size:16px;line-height:1.5;color:#212121;margin:0 0 16px}\n'+
'.'+ns+' .q::before{content:"\\201C";font-family:"menco","Nunito",sans-serif;font-size:40px;color:#3BBFF0;line-height:0;vertical-align:-.4em;margin-right:4px}\n'+
'.'+ns+' .pp{display:flex;align-items:center;gap:12px}\n'+
'.'+ns+' .av{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,'+c+',#3BBFF0);color:#fff;display:grid;place-items:center;font-family:"menco","Nunito",sans-serif;font-weight:800}\n'+
'.'+ns+' .nm{font-weight:700;font-size:14px;color:#212121}\n'+
'.'+ns+' .rl{color:#6B7280;font-size:12px}';
    var inner='<div class="'+ns+'">\n'+items.map(function(it){
      var ini=(it.name||'?').trim().charAt(0).toUpperCase();
      return '    <div class="tc"><p class="q">'+esc(it.text)+'</p><div class="pp"><div class="av">'+esc(ini)+'</div><div><div class="nm">'+esc(it.name)+'</div><div class="rl">'+esc(it.role)+'</div></div></div></div>';
    }).join('\n')+'\n  </div>';
    return shell(ns,css,inner,'',head);
  }

  function genAcc(ns,id,c,items,head){
    var css='.'+ns+'{border:1px solid #E1E3EF;border-radius:10px;overflow:hidden;max-width:760px;margin:auto;background:#fff}\n'+
'.'+ns+' .it+.it{border-top:1px solid #E1E3EF}\n'+
'.'+ns+' .hd{width:100%;text-align:left;background:#fff;border:0;cursor:pointer;padding:18px 20px;font-family:"menco","Nunito",sans-serif;font-weight:700;font-size:16px;color:#212121;display:flex;justify-content:space-between;gap:12px;align-items:center}\n'+
'.'+ns+' .hd:hover{background:#F7F8FC}\n'+
'.'+ns+' .sg{color:'+c+';font-weight:800;font-size:20px;transition:transform .25s}\n'+
'.'+ns+' .it.open .sg{transform:rotate(45deg)}\n'+
'.'+ns+' .pn{max-height:0;overflow:hidden;transition:max-height .28s ease}\n'+
'.'+ns+' .pn p{margin:0;padding:0 20px 18px;color:#6B7280;font-size:14px;line-height:1.6}';
    var inner='<div class="'+ns+'">\n'+items.map(function(it){
      return '    <div class="it"><button class="hd" type="button">'+esc(it.title)+'<span class="sg">+</span></button><div class="pn"><p>'+esc(it.text)+'</p></div></div>';
    }).join('\n')+'\n  </div>';
    var js='(function(){var r=document.currentScript.previousElementSibling;r.addEventListener("click",function(e){var h=e.target.closest(".hd");if(!h)return;var it=h.parentNode,p=it.querySelector(".pn"),o=it.classList.toggle("open");p.style.maxHeight=o?p.scrollHeight+"px":"0";});})();';
    return shell(ns,css,inner,js,head);
  }

  function genTabs(ns,id,c,items,head){
    var css='.'+ns+'{max-width:760px;margin:auto}\n'+
'.'+ns+' .nav{display:flex;gap:4px;border-bottom:2px solid #E1E3EF;flex-wrap:wrap}\n'+
'.'+ns+' .tb{background:0;border:0;cursor:pointer;padding:12px 16px;font-family:"Nunito",sans-serif;font-weight:700;font-size:14px;color:#6B7280;border-bottom:2px solid transparent;margin-bottom:-2px}\n'+
'.'+ns+' .tb.on{color:'+c+';border-bottom-color:'+c+'}\n'+
'.'+ns+' .pn{display:none;padding:20px 0;color:#3A3A44;font-size:15px;line-height:1.6}\n'+
'.'+ns+' .pn.on{display:block}';
    var inner='<div class="'+ns+'">\n  <div class="nav">'+items.map(function(it,i){return '<button class="tb'+(i===0?' on':'')+'" type="button" data-t="'+i+'">'+esc(it.title)+'</button>';}).join('')+'</div>\n'+
      items.map(function(it,i){return '  <div class="pn'+(i===0?' on':'')+'" data-p="'+i+'">'+esc(it.text)+'</div>';}).join('\n')+'\n  </div>';
    var js='(function(){var r=document.currentScript.previousElementSibling;r.addEventListener("click",function(e){var b=e.target.closest(".tb");if(!b)return;var t=b.getAttribute("data-t");r.querySelectorAll(".tb").forEach(function(x){x.classList.toggle("on",x===b);});r.querySelectorAll(".pn").forEach(function(p){p.classList.toggle("on",p.getAttribute("data-p")===t);});});})();';
    return shell(ns,css,inner,js,head);
  }

  function genCar(ns,id,c,items,head){
    var css='.'+ns+'{position:relative;max-width:860px;margin:auto}\n'+
'.'+ns+' .tr{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:8px;scrollbar-width:none}\n'+
'.'+ns+' .tr::-webkit-scrollbar{display:none}\n'+
'.'+ns+' .sl{flex:0 0 320px;max-width:85%;scroll-snap-align:center;background:#fff;border:1px solid #E1E3EF;border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(13,0,59,.08)}\n'+
'.'+ns+' .sl img{width:100%;height:160px;object-fit:cover;border-radius:10px;margin-bottom:14px}\n'+
'.'+ns+' .sl h3{margin:0 0 8px;font-size:17px;color:#212121}\n'+
'.'+ns+' .sl p{margin:0;color:#6B7280;font-size:14px;line-height:1.6}\n'+
'.'+ns+' .bt{position:absolute;top:42%;width:42px;height:42px;border:0;border-radius:50%;background:#fff;color:'+c+';cursor:pointer;box-shadow:0 4px 12px rgba(13,0,59,.14);font-size:22px;line-height:1}\n'+
'.'+ns+' .pv{left:-6px}.'+ns+' .nx{right:-6px}';
    var inner='<div class="'+ns+'">\n    <button class="bt pv" type="button">‹</button>\n    <div class="tr">'+items.map(function(it){
      var img=it.img?'<img src="'+esc(it.img)+'" alt="">':'';
      return '<div class="sl">'+img+'<h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p></div>';
    }).join('')+'</div>\n    <button class="bt nx" type="button">›</button>\n  </div>';
    var js='(function(){var r=document.currentScript.previousElementSibling;var t=r.querySelector(".tr");function s(d){var e=r.querySelector(".sl");t.scrollBy({left:d*(e.offsetWidth+20),behavior:"smooth"});}r.querySelector(".pv").addEventListener("click",function(){s(-1);});r.querySelector(".nx").addEventListener("click",function(){s(1);});})();';
    return shell(ns,css,inner,js,head);
  }

  function genCta(ns,id,c,items,head){
    var it=items[0]||seed.cta();
    var css='.'+ns+'{background:linear-gradient(135deg,'+c+',#1863DC);color:#fff;border-radius:24px;padding:48px;text-align:center}\n'+
'.'+ns+' h3{font-family:"menco","Nunito",sans-serif;font-size:30px;margin:0 0 10px;color:#fff}\n'+
'.'+ns+' p{margin:0 0 24px;color:rgba(255,255,255,.85);font-size:16px}\n'+
'.'+ns+' a{display:inline-block;background:#fff;color:'+c+';font-weight:700;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:15px}';
    var inner='<div class="'+ns+'"><h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p><a href="'+esc(it.url||'#')+'" target="'+esc(it.target||'_blank')+'">'+esc(it.cta)+'</a></div>';
    return shell(ns,css,inner,'',head);
  }

  /* ---------- RENDER ---------- */
  function fitFrame(){
    try {
      var doc = el.frame.contentDocument;
      if (!doc || !doc.body) return;
      var h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      el.frame.style.height = (h + 8) + 'px';
    } catch (e) {}
  }
  function render(){
    var code=build();
    el.output.textContent=code;
    var doc='<!doctype html><html><head><meta charset="utf-8">'+
      '<link rel="preconnect" href="https://fonts.googleapis.com">'+
      '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://use.typekit.net/lrl6igp.css">'+
      '<style>html,body{margin:0}body{padding:24px;background:#fff;box-sizing:border-box;overflow-x:hidden}*{box-sizing:border-box}</style></head><body>'+code+'</body></html>';
    el.frame.srcdoc=doc;
    // ajusta a altura do iframe ao conteúdo (evita corte/scroll interno)
    el.frame.onload = function(){ fitFrame(); setTimeout(fitFrame, 250); setTimeout(fitFrame, 800); };
  }

  /* ---------- EVENTOS ---------- */
  function bind(){
    el.types.addEventListener('click',function(e){
      var b=e.target.closest('.bld__type'); if(!b)return;
      el.types.querySelectorAll('.bld__type').forEach(function(x){x.classList.toggle('is-active',x===b);});
      reset(b.getAttribute('data-type'));
    });
    el.items.addEventListener('input',function(e){
      var f=e.target.getAttribute('data-f'); if(!f)return;
      state.items[+e.target.getAttribute('data-i')][f]=e.target.value; render();
    });
    el.items.addEventListener('change',function(e){
      if(e.target.getAttribute('data-f')==='target'){ state.items[+e.target.getAttribute('data-i')].target=e.target.value; render(); }
    });
    el.items.addEventListener('click',function(e){
      var del=e.target.closest('[data-del]'); if(!del)return;
      if(state.items.length<=1){ w.DSClipboard&&w.DSClipboard.toast('Mantenha ao menos 1 item','danger'); return; }
      state.items.splice(+del.getAttribute('data-del'),1); renderItems(); render();
    });
    el.add.addEventListener('click',function(){ state.items.push(seed[state.type](state.items.length+1)); renderItems(); render(); });
    el.color.addEventListener('input',function(){ state.color=el.color.value; render(); });
    if(el.cols) el.cols.addEventListener('change',function(){ state.cols=+el.cols.value; render(); });
    if(el.bg) el.bg.addEventListener('change',function(){ state.bg=el.bg.value; render(); });
    if(el.secTitle) el.secTitle.addEventListener('input',function(){ state.secTitle=el.secTitle.value; render(); });
    if(el.secSub) el.secSub.addEventListener('input',function(){ state.secSub=el.secSub.value; render(); });
    // abas Pré-visualização | Código (rolagem interna, sem esticar a página)
    var tabs = d.querySelectorAll('.bld__tab');
    [].forEach.call(tabs, function(t){
      t.addEventListener('click', function(){
        var v = t.getAttribute('data-view');
        [].forEach.call(tabs, function(x){ x.classList.toggle('is-active', x===t); });
        if(el.stage) el.stage.setAttribute('data-view', v);
      });
    });
  }

  d.addEventListener('DOMContentLoaded',function(){
    if(!d.getElementById('bld-root'))return;
    el.types=$('#bld-types'); el.items=$('#bld-items'); el.add=$('#bld-add');
    el.color=$('#bld-color'); el.cols=$('#bld-cols'); el.colsWrap=$('#bld-cols-wrap');
    el.bg=$('#bld-bg'); el.secTitle=$('#bld-sectitle'); el.secSub=$('#bld-secsub');
    el.output=$('#bld-output'); el.frame=$('#bld-frame');
    el.stage=$('#bld-stage'); el.copyBtn=d.querySelector('.bld__copy');
    bind(); reset('cards');
  });
})(window, document);
