/* Área do vendedor: login de demonstração, ficha de cadastro com prévia, lista de anúncios publicados. */
preencherMarca();
const $ = id => document.getElementById(id);
const SESSAO = LOJA.slug + "-sessao";

/* ---------- Login (demonstração) ----------
   Este login roda só no navegador e serve para mostrar o fluxo.
   Na versão final ele é trocado por um login de verdade (ex.: Firebase Auth ou Supabase),
   com usuário e senha guardados no servidor. */
function logado() { try { return sessionStorage.getItem(SESSAO) === "1"; } catch (_) { return false; } }
function mostrarPainel(sim) {
  $("tela-login").hidden = sim;
  $("tela-painel").hidden = !sim;
  $("sair").hidden = !sim;
  if (sim) { atualizarPrevia(); listarMeus(); }
}
$("form-login").addEventListener("submit", e => {
  e.preventDefault();
  const u = $("l-usuario").value.trim().toLowerCase(), s = $("l-senha").value;
  if (u === LOJA.login.usuario && s === LOJA.login.senha) {
    try { sessionStorage.setItem(SESSAO, "1"); } catch (_) {}
    $("l-erro").textContent = "";
    mostrarPainel(true);
  } else {
    $("l-erro").textContent = "Usuário ou senha incorretos. Confira os dados de acesso acima.";
  }
});
$("sair").addEventListener("click", () => { try { sessionStorage.removeItem(SESSAO); } catch (_) {} mostrarPainel(false); });
$("hint-user").textContent = LOJA.login.usuario;
$("hint-pass").textContent = LOJA.login.senha;

/* ---------- Ficha ---------- */
let fotosUpload = [];
const num = s => Number(String(s).replace(/\D/g, "")) || 0;
function lerFicha() {
  const perks = [];
  if ($("c-ipva").checked) perks.push("IPVA pago");
  if ($("c-dono").checked) perks.push("Único dono");
  if ($("c-rev").checked) perks.push("Revisões em dia");
  if ($("c-laudo").checked) perks.push("Laudo aprovado");
  if ($("c-garantia").checked) perks.push("Garantia de 3 meses");
  return {
    tipo: $("f-tipo").value, marca: $("f-marca").value.trim() || "Marca", modelo: $("f-modelo").value.trim() || "Modelo",
    versao: $("f-versao").value.trim(), ano: $("f-ano").value.trim(), km: num($("f-km").value),
    cambio: $("f-cambio").value, comb: $("f-comb").value, cor: $("f-cor").value.trim(), placa: $("f-placa").value.trim(),
    preco: num($("f-preco").value), entrada: num($("f-entrada").value), parcelas: $("f-parcelas").value.trim(),
    perks, troca: $("c-troca").checked, obs: $("f-obs").value.trim(),
    fotos: fotosUpload.slice(), badge: "Novo no estoque"
  };
}
function textoFicha(v) {
  return [
    `*FICHA DE CADASTRO · ${LOJA.nome.toUpperCase()}*`, "",
    `Tipo: ${v.tipo === "moto" ? "Moto" : "Carro"}`, `Marca: ${v.marca}`, `Modelo: ${v.modelo}`,
    `Versão/motor: ${v.versao}`, `Ano fab./modelo: ${v.ano}`, `Km: ${kmf(v.km)}`, `Câmbio: ${v.cambio}`,
    `Combustível: ${v.comb}`, `Cor: ${v.cor}`, `Final da placa: ${v.placa || "-"}`, "",
    `Preço à vista: ${brl(v.preco)}`, `Entrada mínima: ${brl(v.entrada)}`, `Parcelas: ${v.parcelas || "a combinar"}`,
    `Aceita troca: ${v.troca ? "Sim" : "Não"}`, `Diferenciais: ${v.perks.join(", ") || "-"}`, `Observações: ${v.obs || "-"}`, "",
    `Fotos: ${v.fotos.length ? v.fotos.length + " anexadas" : "enviar de 4 a 8 fotos na horizontal (frente, lateral, traseira, interior, painel, motor)"}`
  ].join("\n");
}
function atualizarPrevia() {
  const v = lerFicha();
  $("preview").innerHTML = cardHTML(v);
  ligarGalerias($("preview"));
  $("preview").querySelector(".btn-wa").removeAttribute("href");
  $("tpl").textContent = textoFicha(v);
}
$("ficha").addEventListener("input", atualizarPrevia);
$("ficha").addEventListener("change", atualizarPrevia);

// Fotos: reduz para 1000 px de largura antes de guardar, para caber no navegador
function reduzir(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, 1000 / img.width), c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = () => res(null);
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}
async function carregarFotos(files) {
  const lista = [...files].filter(f => f.type.startsWith("image/")).slice(0, 8);
  if (!lista.length) return;
  fotosUpload = (await Promise.all(lista.map(reduzir))).filter(Boolean);
  $("thumbs").innerHTML = fotosUpload.map((u, i) => `<img src="${u}" alt="Foto ${i + 1} enviada">`).join("");
  $("drop").classList.add("has");
  atualizarPrevia();
}
$("f-fotos").addEventListener("change", e => carregarFotos(e.target.files));
$("drop").addEventListener("dragover", e => e.preventDefault());
$("drop").addEventListener("drop", e => { e.preventDefault(); carregarFotos(e.dataTransfer.files); });

$("ficha").addEventListener("submit", e => {
  e.preventDefault();
  const v = lerFicha();
  if (!v.preco) { toast("Informe o preço à vista para publicar."); $("f-preco").focus(); return; }
  v.id = Date.now(); v.novo = true;
  const extras = lerExtras(); extras.unshift(v);
  if (!salvarExtras(extras)) { toast("Fotos grandes demais para a demonstração. Tente com menos fotos."); return; }
  listarMeus();
  toast(`${v.marca} ${v.modelo} publicado. Abra o catálogo para ver.`);
});

$("copy-btn").addEventListener("click", () => {
  const txt = $("tpl").textContent;
  const fallback = () => { const r = document.createRange(); r.selectNodeContents($("tpl")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Texto selecionado. Use Ctrl+C para copiar."); };
  try { navigator.clipboard.writeText(txt).then(() => toast("Ficha copiada. Cole no WhatsApp."), fallback); } catch (_) { fallback(); }
});

/* ---------- Meus anúncios ---------- */
function listarMeus() {
  const extras = lerExtras();
  $("mine-empty").hidden = extras.length > 0;
  $("mine-list").innerHTML = extras.map(v => `<div class="mine-item">
      ${v.fotos && v.fotos[0] ? `<img src="${v.fotos[0]}" alt="">` : `<span class="ph"></span>`}
      <div><b>${esc(v.marca + " " + v.modelo + " " + v.versao)}</b><small class="num">${esc(v.ano)} · ${kmf(v.km)} · ${brl(v.preco)}</small></div>
      <button class="btn btn-danger" type="button" data-id="${v.id}">Remover</button>
    </div>`).join("");
}
$("mine-list").addEventListener("click", e => {
  const b = e.target.closest("[data-id]"); if (!b) return;
  salvarExtras(lerExtras().filter(v => String(v.id) !== b.dataset.id));
  listarMeus(); toast("Anúncio removido do catálogo.");
});

mostrarPainel(logado());
