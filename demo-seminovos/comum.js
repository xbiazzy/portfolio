/* Funções compartilhadas entre o catálogo (index.html) e a área do vendedor (vendedor.html). */
const brl = n => Number(n || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const kmf = n => Number(n || 0).toLocaleString("pt-BR") + " km";
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const CHAVE_EXTRA = () => LOJA.slug + "-anuncios";
function lerExtras() {
  try { return JSON.parse(localStorage.getItem(CHAVE_EXTRA()) || "[]"); } catch (_) { return []; }
}
function salvarExtras(lista) {
  try { localStorage.setItem(CHAVE_EXTRA(), JSON.stringify(lista)); return true; } catch (_) { return false; }
}
function estoqueCompleto() { return [...lerExtras(), ...LOJA.estoque]; }

function waLink(v) {
  const msg = v
    ? `Olá! Vi no site da ${LOJA.nome} e tenho interesse no ${v.marca} ${v.modelo} ${v.versao} ${v.ano}, anunciado por ${brl(v.preco)}. Ainda está disponível?`
    : `Olá! Vi o site da ${LOJA.nome} e quero saber mais sobre o estoque.`;
  return `https://wa.me/${LOJA.whats}?text=${encodeURIComponent(msg)}`;
}

const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.1 5.1 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>';

function cardHTML(v) {
  const fotos = v.fotos && v.fotos.length
    ? v.fotos.map((f, k) => `<img src="${esc(f)}" alt="${esc(v.marca + " " + v.modelo)}, foto ${k + 1}" loading="lazy">`).join("")
    : `<div class="noimg">Sem fotos ainda</div>`;
  const n = (v.fotos || []).length;
  const dots = n > 1 ? `<div class="dots">${v.fotos.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div>` : "";
  const arrows = n > 1 ? `<button class="arrow prev" type="button" aria-label="Foto anterior">‹</button><button class="arrow next" type="button" aria-label="Próxima foto">›</button>` : "";
  const perks = [...(v.perks || []), ...(v.troca ? ["Aceita troca"] : [])];
  return `<article class="card${v.novo ? " new" : ""}" data-tipo="${esc(v.tipo)}">
    <div class="gallery">
      <div class="track">${fotos}</div>${dots}${arrows}
      ${v.badge ? `<span class="badge">${esc(v.badge)}</span>` : ""}
      ${n > 1 ? `<span class="count num">${n} fotos</span>` : ""}
    </div>
    <div class="body">
      <div><div class="brandline">${esc(v.marca)} · ${v.tipo === "moto" ? "Moto" : "Carro"}</div>
        <h3>${esc(v.modelo)}</h3><div class="ver">${esc(v.versao)}</div></div>
      <div class="specs num">
        <div><small>Ano</small><b>${esc(v.ano)}</b></div>
        <div><small>Km</small><b>${kmf(v.km)}</b></div>
        <div><small>Câmbio</small><b>${esc(v.cambio)}</b></div>
        <div><small>Combust.</small><b>${esc(v.comb)}</b></div>
        <div style="grid-column:span 2"><small>Cor</small><b>${esc(v.cor)}</b></div>
      </div>
      ${perks.length ? `<div class="perks">${perks.map(p => `<span>${esc(p)}</span>`).join("")}</div>` : ""}
      <div class="priceline"><div class="p num"><small>À vista</small>${brl(v.preco)}</div></div>
      <div class="cond num">Entrada de <strong>${brl(v.entrada)}</strong> + <strong>${esc(v.parcelas || "a combinar")}</strong><br><span style="font-size:11.5px">Simulação ilustrativa, sujeita à aprovação de crédito.</span>${v.obs ? `<br>${esc(v.obs)}` : ""}</div>
      <a class="btn btn-wa" href="${waLink(v)}" target="_blank" rel="noopener">${WA_ICON} Tenho interesse</a>
    </div>
  </article>`;
}

function ligarGalerias(root) {
  root.querySelectorAll(".gallery").forEach(g => {
    const track = g.querySelector(".track"), dots = g.querySelectorAll(".dots i");
    const idx = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    track.addEventListener("scroll", () => { const k = idx(); dots.forEach((d, j) => d.classList.toggle("on", j === k)); }, { passive: true });
    g.querySelector(".prev")?.addEventListener("click", () => track.scrollTo({ left: (idx() - 1) * track.clientWidth, behavior: "smooth" }));
    g.querySelector(".next")?.addEventListener("click", () => { const n = track.children.length; track.scrollTo({ left: ((idx() + 1) % n) * track.clientWidth, behavior: "smooth" }); });
  });
}

function toast(msg) {
  const t = document.getElementById("toast"); if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2800);
}

function preencherMarca() {
  document.querySelectorAll("[data-loja]").forEach(el => { el.textContent = LOJA[el.dataset.loja]; });
  document.querySelectorAll(".wa-general").forEach(a => a.href = waLink());
}
