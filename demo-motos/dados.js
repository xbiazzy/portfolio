/* Dados da loja e do estoque. Na versão final, este arquivo é substituído pelo banco de dados alimentado pela área do vendedor. */
const LOJA = {
  nome: "Rota 376 Motos",
  slug: "rota376motos",
  sub: "Motos seminovas",
  whats: "5542900000000", // número fictício
  whatsTexto: "(42) 90000-0000",
  login: { usuario: "vendedor", senha: "376demo" },
  vitrine: [0, 3, 1],
  destaque: {
    indice: 2,
    angulos: [
      { nome: "Frente", texto: "<b>471 cc, bicilíndrica, 47 cv</b>, freios ABS e para-brisa ajustável. Confortável na cidade e na estrada." },
      { nome: "Traseira", texto: "<b>24.000 km</b>, único dono, baú de 45 litros incluso e revisões feitas na concessionária." }
    ]
  },
  estoque: [
    { tipo: "moto", marca: "BMW", modelo: "R 1250 GS", versao: "Rallye · baú e protetores", ano: "2020/2020", km: 31000, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Azul Racing", preco: 89900, entrada: 27000, parcelas: "36x de R$ 2.290", perks: ["Revisões BMW", "Laudo aprovado"], troca: true, fotos: ["img/gs-1.jpg"], badge: "Big trail" },
    { tipo: "moto", marca: "Triumph", modelo: "Tiger 900", versao: "GT Pro · baú e malas laterais", ano: "2021/2022", km: 18500, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Azul e branco", preco: 74900, entrada: 22500, parcelas: "36x de R$ 1.940", perks: ["Único dono", "Revisões em dia"], troca: true, fotos: ["img/tiger-1.jpg"] },
    { tipo: "moto", marca: "Honda", modelo: "CB 500X", versao: "ABS · com baú", ano: "2021/2021", km: 24000, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Vermelho", preco: 36900, entrada: 11000, parcelas: "36x de R$ 980", perks: ["Único dono", "IPVA pago"], troca: true, fotos: ["img/cb-1.jpg", "img/cb-2.jpg"], badge: "Destaque" },
    { tipo: "moto", marca: "Kawasaki", modelo: "Ninja 400", versao: "KRT Edition ABS", ano: "2022/2022", km: 8700, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Verde KRT", preco: 32900, entrada: 9900, parcelas: "36x de R$ 870", perks: ["Baixa km", "IPVA pago"], troca: true, fotos: ["img/ninja-1.jpg"], badge: "Baixa km" },
    { tipo: "moto", marca: "Yamaha", modelo: "MT-07", versao: "ABS 689 cc", ano: "2021/2021", km: 12000, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Cinza fosco", preco: 46900, entrada: 14000, parcelas: "36x de R$ 1.250", perks: ["Laudo aprovado"], troca: false, fotos: ["img/mt-1.jpg"] },
    { tipo: "moto", marca: "Honda", modelo: "XRE 300", versao: "Rally · bagageiro", ano: "2015/2015", km: 41000, cambio: "Manual 5 marchas", comb: "Flex", cor: "Dourado", preco: 17900, entrada: 5400, parcelas: "36x de R$ 480", perks: ["Pneus novos", "Revisão feita"], troca: true, fotos: ["img/xre-1.jpg"], badge: "Entrada baixa" },
    { tipo: "carro", marca: "Toyota", modelo: "Corolla", versao: "XEi 2.0 Dynamic Force", ano: "2022/2022", km: 48000, cambio: "CVT", comb: "Flex", cor: "Prata", preco: 124900, entrada: 37500, parcelas: "48x de R$ 2.390", perks: ["IPVA pago", "Revisões em dia"], troca: true, fotos: ["img/corolla-1.jpg", "img/corolla-2.jpg"] },
    { tipo: "carro", marca: "Chevrolet", modelo: "Onix Plus", versao: "Premier 1.0 Turbo", ano: "2021/2022", km: 41000, cambio: "Automático", comb: "Flex", cor: "Branco Summit", preco: 89900, entrada: 27000, parcelas: "48x de R$ 1.790", perks: ["Único dono", "IPVA pago"], troca: true, fotos: ["img/onix-1.jpg", "img/onix-2.jpg", "img/onix-3.jpg"] }
  ],
  creditos: [
    ["BMW R 1250 GS", "Cjp24", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:BMW_R_1250_GS_(1).jpg"],
    ["Triumph Tiger 900", "Corvettec6r", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Triumph_Tiger_900.jpg"],
    ["Honda CB500X (frente e traseira)", "Wikisympathisant", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Honda_CB500X_2024-05-23.jpg"],
    ["Kawasaki Ninja 400 KRT", "サフィル", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kawasaki_Ninja_400_KRT_SlantView_resized.jpg"],
    ["Yamaha MT-07 2021", "PackMecEng", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:2021_Black_Yamaha_MT-07.jpg"],
    ["Honda XRE 300", "Borowskki", "Domínio público", "https://commons.wikimedia.org/wiki/File:Honda_XRE300_ano2010.jpg"],
    ["Toyota Corolla XEi 2022", "RL GNZLZ", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Toyota_Corolla_2.0_XEi_2022.jpg"],
    ["Chevrolet Onix Plus Premier", "Just a Man", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:2022_Chevrolet_Onix_Plus_1.0_Premier_(front).jpg"]
  ]
};
