/* Catálogo público: mosaico do herói, destaque com abas, grade filtrável e créditos das fotos. */
preencherMarca();

// Mosaico do herói (3 primeiros veículos com foto)
const mosaico = document.getElementById("mosaico");
mosaico.innerHTML = LOJA.vitrine.map(i => {
  const v = LOJA.estoque[i];
  return `<a href="#estoque"><img src="${esc(v.fotos[0])}" alt="${esc(v.marca + " " + v.modelo)}"><span><b>${esc(v.marca + " " + v.modelo)}</b><small class="num">${esc(v.ano.split("/").pop())} · ${kmf(v.km)} · ${brl(v.preco)}</small></span></a>`;
}).join("");

// Destaque com abas (toque para trocar o ângulo; troca sozinho a cada 4 s até a pessoa interagir)
const d = LOJA.destaque, dv = LOJA.estoque[d.indice];
document.getElementById("dest-title").textContent = `${dv.marca} ${dv.modelo}`;
document.getElementById("dest-price").innerHTML = `${brl(dv.preco)}<small>ou entrada de ${brl(dv.entrada)} + ${esc(dv.parcelas)} (simulação)</small>`;
document.getElementById("dest-wa").href = waLink(dv);
const stage = document.getElementById("dest-stage"), tabs = document.getElementById("dest-tabs"), txt = document.getElementById("dest-text");
stage.innerHTML = d.angulos.map((a, k) => `<img class="${k ? "" : "on"}" src="${esc(dv.fotos[k])}" alt="${esc(dv.marca + " " + dv.modelo)}, ${esc(a.nome.toLowerCase())}">`).join("");
tabs.innerHTML = d.angulos.map((a, k) => `<button class="tab" role="tab" aria-selected="${k ? "false" : "true"}" data-k="${k}">${esc(a.nome)}</button>`).join("");
let atual = 0, auto = null;
function mostrar(k) {
  atual = k;
  stage.querySelectorAll("img").forEach((im, j) => im.classList.toggle("on", j === k));
  tabs.querySelectorAll(".tab").forEach((t, j) => t.setAttribute("aria-selected", j === k ? "true" : "false"));
  txt.innerHTML = d.angulos[k].texto;
}
mostrar(0);
tabs.addEventListener("click", e => { const b = e.target.closest(".tab"); if (!b) return; clearInterval(auto); mostrar(+b.dataset.k); });
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && d.angulos.length > 1) {
  auto = setInterval(() => mostrar((atual + 1) % d.angulos.length), 4000);
}

// Grade do estoque
const grid = document.getElementById("grid");
let filtro = "todos";
function render() {
  const lista = estoqueCompleto();
  grid.innerHTML = lista.map(cardHTML).join("");
  ligarGalerias(grid);
  aplicarFiltro();
  document.querySelectorAll("[data-total]").forEach(el => el.textContent = lista.length);
}
function aplicarFiltro() {
  let n = 0;
  grid.querySelectorAll(".card").forEach(c => { const ok = filtro === "todos" || c.dataset.tipo === filtro; c.hidden = !ok; if (ok) n++; });
  document.getElementById("empty").hidden = n > 0;
}
document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
  filtro = b.dataset.f;
  document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
  aplicarFiltro();
}));
render();
addEventListener("storage", e => { if (e.key === CHAVE_EXTRA()) render(); });

// Créditos
document.getElementById("credits").innerHTML = LOJA.creditos.map(([t, a, l, u]) =>
  `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>, por ${esc(a)} (${esc(l)}), recortada</li>`).join("");
