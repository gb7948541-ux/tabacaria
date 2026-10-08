/* ============================================================
   NOIR TABACARIA — configuração e catálogo em um único arquivo
   ============================================================ */
const CONFIG = {
  nome: "NOIR TABACARIA",
  whatsapp: "5500000000000", // reservado para futuras integrações
  instagram: "@sua_tabacaria",
  cidade: "Sua cidade",
  endereco: "Seu endereço aqui",
  horario: "Seg–Sáb · 09h–19h",
  idadeMinima: 18,
  idadeCookieDias: 30, // mantido para compatibilidade; o 18+ agora vale por sessão
  mapaUrl: "https://www.google.com/maps/search/?api=1&query=Sua+cidade"
};

/* Produtos: altere nome, descrição, preço, categoria e imagem aqui. */
const PRODUCTS = [
  {id:"tabaco-selba",name:"Tabaco Selba",desc:"Curadoria clássica para quem aprecia o ritual.",price:29.90,category:"Tabacos",tag:"Mais vendido",image:"imagens/tabaco-selba.png"},
  {id:"tabaco-stanley",name:"Tabaco Stanley",desc:"Perfil marcante em uma apresentação premium.",price:32.90,category:"Tabacos",tag:"Destaque",image:"imagens/tabaco-stanley.png"},
  {id:"tabaco-natural",name:"Tabaco Natural",desc:"Seleção de perfil natural e acabamento cuidadoso.",price:28.90,category:"Tabacos",tag:"Novo",image:"imagens/tabaco-natural.png"},
  {id:"tabaco-blend",name:"Tabaco Blend",desc:"Blend selecionado para uma experiência distinta.",price:34.90,category:"Tabacos",tag:"Destaque",image:"imagens/tabaco-blend.png"},
  {id:"seda-hall-black",name:"Seda Hall Black",desc:"Papel fino com visual sóbrio.",price:12.90,category:"Sedas",tag:"Mais vendido",image:"imagens/seda-hall-black.png"},
  {id:"seda-king-size",name:"Seda King Size",desc:"Formato amplo para quem prefere mais espaço.",price:14.90,category:"Sedas",tag:"Novo",image:"imagens/seda-king-size.png"},
  {id:"seda-brown",name:"Seda Brown",desc:"Textura natural e apresentação minimalista.",price:11.90,category:"Sedas",tag:"Destaque",image:"imagens/seda-brown.png"},
  {id:"piteira-vidro",name:"Piteira de Vidro",desc:"Design limpo para completar o ritual.",price:24.90,category:"Piteiras",tag:"Mais vendido",image:"imagens/piteira-vidro.png"},
  {id:"piteira-vidro-premium",name:"Piteira de Vidro Premium",desc:"Acabamento superior e estética refinada.",price:39.90,category:"Piteiras",tag:"Destaque",image:"imagens/piteira-vidro-premium.png"},
  {id:"tips-papel",name:"Tips de Papel",desc:"Formato prático e acabamento consistente.",price:8.90,category:"Piteiras",tag:"",image:"imagens/tips-papel.png"},
  {id:"silicone-3ml",name:"Pote Silicone 3ml",desc:"Compacto e discreto para organização.",price:18.90,category:"Acessórios",tag:"Novo",image:"imagens/silicone-3ml.png"},
  {id:"silicone-5ml",name:"Pote Silicone 5ml",desc:"Mais espaço sem perder a praticidade.",price:21.90,category:"Acessórios",tag:"",image:"imagens/silicone-5ml.png"},
  {id:"dichavador",name:"Dichavador",desc:"Construção funcional com acabamento urbano.",price:49.90,category:"Acessórios",tag:"Mais vendido",image:"imagens/dichavador.png"},
  {id:"bandeja",name:"Bandeja",desc:"Base elegante para organizar o ritual.",price:59.90,category:"Acessórios",tag:"Destaque",image:"imagens/bandeja.png"},
  {id:"isqueiro",name:"Isqueiro",desc:"Design compacto para acompanhar a rotina.",price:19.90,category:"Acessórios",tag:"",image:"imagens/isqueiro.png"}
];

const state = {query:"", category:"Todos", favorites:JSON.parse(localStorage.getItem("noirFavorites")||"[]")};

const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

// A confirmação de idade vale apenas durante a sessão da página.
// Assim, ao fechar a aba/janela e abrir o site novamente, o aviso 18+ volta a aparecer.
// O sessionStorage também evita depender do comportamento variável de localStorage em file://.
const AGE_SESSION_KEY = "noirAgeConfirmedSession";

function storageAvailable(type){
  try{
    const storage = window[type];
    const testKey = "__noir_storage_test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  }catch{
    return false;
  }
}

function ageValid(){
  if(!storageAvailable("sessionStorage")) return false;
  return sessionStorage.getItem(AGE_SESSION_KEY) === "true";
}

function unlock(){
  if(storageAvailable("sessionStorage")){
    sessionStorage.setItem(AGE_SESSION_KEY, "true");
  }
  $("#ageGate").remove();
  $("#siteShell").classList.remove("is-locked");
  document.body.style.overflow="";
  initReveals();
}
function lockAndLeave(){
  document.body.innerHTML = `<main style="min-height:100vh;display:grid;place-items:center;padding:30px;background:#09090b;color:#f4f1eb;font-family:DM Sans,sans-serif;text-align:center"><div><div style="font:800 60px Manrope;color:#c9a86a;margin-bottom:20px">18+</div><h1>Acesso encerrado.</h1><p style="color:#9a9893">Este espaço é destinado exclusivamente a maiores de ${CONFIG.idadeMinima} anos.</p></div></main>`;
}
function renderFilters(){
  const cats = ["Todos",...new Set(PRODUCTS.map(p=>p.category))];
  $("#categoryFilters").innerHTML = cats.map(c=>`<button class="filter ${c===state.category?"is-active":""}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{state.category=b.dataset.cat;renderFilters();renderProducts();});
}
function card(p){
  const fav = state.favorites.includes(p.id);
  return `<article class="product-card reveal">
    <div class="product-image">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      ${p.tag?`<span class="tag">${p.tag}</span>`:""}
      <button class="heart ${fav?"is-fav":""}" data-fav="${p.id}" aria-label="${fav?"Remover":"Adicionar"} ${p.name} aos favoritos">${fav?"♥":"♡"}</button>
    </div>
    <div class="product-info">
      <h4>${p.name}</h4><p>${p.desc}</p>
      <div class="product-meta"><strong class="price">${money(p.price)}</strong><span class="category">${p.category}</span></div>
      <button class="info-btn" data-info="${p.id}">Ver informações</button>
    </div>
  </article>`;
}
function filtered(){
  return PRODUCTS.filter(p => (state.category==="Todos"||p.category===state.category) && `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(state.query.toLowerCase()));
}
function renderProducts(){
  const items=filtered();
  $("#productGrid").innerHTML=items.map(card).join("");
  $("#emptyState").hidden=items.length!==0;
  bindCards(); initReveals();
}
function renderFavorites(){
  const items=PRODUCTS.filter(p=>state.favorites.includes(p.id));
  $("#favoritesGrid").innerHTML=items.map(card).join("");
  $("#favoritesEmpty").hidden=items.length!==0;
  bindCards(); initReveals();
}
function bindCards(){
  document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.fav;
    state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];
    localStorage.setItem("noirFavorites",JSON.stringify(state.favorites));
    renderProducts(); renderFavorites(); toast(state.favorites.includes(id)?"Adicionado aos favoritos":"Removido dos favoritos");
  });
  document.querySelectorAll("[data-info]").forEach(b=>b.onclick=()=>{
    const p=PRODUCTS.find(x=>x.id===b.dataset.info);
    toast(`${p.name} · ${money(p.price)} · ${p.category}`);
  });
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove("show"),2200);}
function initReveals(){
  const els=document.querySelectorAll(".reveal:not(.is-visible)");
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("is-visible"));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.08});
  els.forEach(e=>io.observe(e));
}
function setupConfig(){
  document.title=CONFIG.nome;
  $("#cityText").textContent=CONFIG.cidade;
  $("#hoursText").textContent=CONFIG.horario;
  $("#instagramText").textContent=CONFIG.instagram;
  $("#instagramLink").href=`https://instagram.com/${CONFIG.instagram.replace("@","")}`;
  $("#mapLink").href=CONFIG.mapaUrl;
  $("#year").textContent=new Date().getFullYear();
}
function init(){
  setupConfig(); renderFilters(); renderProducts(); renderFavorites();
  $("#searchInput").addEventListener("input",e=>{state.query=e.target.value;renderProducts()});
  $("#menuToggle").onclick=()=>$("#mainNav").classList.toggle("is-open");
  document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("is-open"));
  $("#confirmAge").onclick=unlock; $("#leaveSite").onclick=lockAndLeave;
  if(ageValid()){ $("#ageGate").remove(); $("#siteShell").classList.remove("is-locked"); }
  else { document.body.style.overflow="hidden"; }
  initReveals();
}
init();
