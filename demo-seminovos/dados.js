/* Dados da loja e do estoque. Na versão final, este arquivo é substituído pelo banco de dados alimentado pela área do vendedor. */
const LOJA = {
  nome: "Rota 376",
  slug: "rota376",
  sub: "Carros & motos seminovos",
  whats: "5542900000000", // número fictício
  whatsTexto: "(42) 90000-0000",
  login: { usuario: "vendedor", senha: "376demo" },
  vitrine: [1, 0, 5],
  destaque: {
    indice: 2,
    angulos: [
      { nome: "Frente", texto: "<b>1.0 Turbo, 116 cv</b>, câmbio automático de 6 marchas e central multimídia com Android Auto e Apple CarPlay." },
      { nome: "Lateral", texto: "<b>41.000 km</b>, único dono, revisões feitas na concessionária e manual com carimbos." },
      { nome: "Traseira", texto: "<b>IPVA 2026 pago</b>, laudo cautelar aprovado e garantia de 3 meses de motor e câmbio." }
    ]
  },
  estoque: [
    { tipo: "carro", marca: "Toyota", modelo: "Corolla", versao: "XEi 2.0 Dynamic Force", ano: "2022/2022", km: 48000, cambio: "CVT", comb: "Flex", cor: "Prata", preco: 124900, entrada: 37500, parcelas: "48x de R$ 2.390", perks: ["IPVA pago", "Revisões em dia", "Laudo aprovado"], troca: true, fotos: ["img/corolla-1.jpg", "img/corolla-2.jpg"], badge: "Mais procurado" },
    { tipo: "carro", marca: "Fiat", modelo: "Toro", versao: "Volcano 2.0 Diesel 4x4 AT9", ano: "2023/2024", km: 22000, cambio: "Automático", comb: "Diesel", cor: "Cinza Silverstone", preco: 179900, entrada: 54000, parcelas: "60x de R$ 3.150", perks: ["Único dono", "Garantia de fábrica", "Laudo aprovado"], troca: true, fotos: ["img/toro-1.jpg", "img/toro-2.jpg"], badge: "Baixa km" },
    { tipo: "carro", marca: "Chevrolet", modelo: "Onix Plus", versao: "Premier 1.0 Turbo", ano: "2021/2022", km: 41000, cambio: "Automático", comb: "Flex", cor: "Branco Summit", preco: 89900, entrada: 27000, parcelas: "48x de R$ 1.790", perks: ["Único dono", "IPVA pago", "Garantia de 3 meses"], troca: true, fotos: ["img/onix-1.jpg", "img/onix-2.jpg", "img/onix-3.jpg"], badge: "Destaque" },
    { tipo: "carro", marca: "Volkswagen", modelo: "Nivus", versao: "Highline 200 TSI", ano: "2022/2022", km: 52000, cambio: "Automático", comb: "Flex", cor: "Prata Pyrit", preco: 112900, entrada: 34000, parcelas: "48x de R$ 2.180", perks: ["Revisões em dia", "Laudo aprovado"], troca: true, fotos: ["img/nivus-1.jpg", "img/nivus-2.jpg"] },
    { tipo: "carro", marca: "Hyundai", modelo: "Creta", versao: "Limited 1.0 Turbo", ano: "2022/2023", km: 38000, cambio: "Automático", comb: "Flex", cor: "Vermelho Fiery", preco: 109900, entrada: 33000, parcelas: "48x de R$ 2.120", perks: ["IPVA pago", "Único dono", "Laudo aprovado"], troca: false, fotos: ["img/creta-1.jpg", "img/creta-2.jpg"] },
    { tipo: "moto", marca: "BMW", modelo: "R 1250 GS", versao: "Rallye · baú e protetores", ano: "2020/2020", km: 31000, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Azul Racing", preco: 89900, entrada: 27000, parcelas: "36x de R$ 2.290", perks: ["Revisões BMW", "Laudo aprovado"], troca: true, fotos: ["img/gs-1.jpg"], badge: "Big trail" },
    { tipo: "moto", marca: "Honda", modelo: "CB 500X", versao: "ABS · com baú", ano: "2021/2021", km: 24000, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Vermelho", preco: 36900, entrada: 11000, parcelas: "36x de R$ 980", perks: ["Único dono", "IPVA pago"], troca: true, fotos: ["img/cb-1.jpg", "img/cb-2.jpg"] },
    { tipo: "moto", marca: "Yamaha", modelo: "MT-07", versao: "ABS 689 cc", ano: "2021/2021", km: 12000, cambio: "Manual 6 marchas", comb: "Gasolina", cor: "Cinza fosco", preco: 46900, entrada: 14000, parcelas: "36x de R$ 1.250", perks: ["Baixa km", "Laudo aprovado"], troca: false, fotos: ["img/mt-1.jpg"] }
  ],
  creditos: [
    ["Toyota Corolla XEi 2022", "RL GNZLZ", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Toyota_Corolla_2.0_XEi_2022.jpg"],
    ["Toyota Corolla XEi 2022 (2)", "RL GNZLZ", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Toyota_Corolla_2.0_XEi_2022_(52311011473).jpg"],
    ["Fiat Toro Volcano (frente)", "NaBUru38", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Fiat_Toro_2024_Volcano_in_Montevideo,_Uruguay_(front).jpg"],
    ["Fiat Toro Volcano (traseira)", "NaBUru38", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Fiat_Toro_2024_Volcano_in_Montevideo,_Uruguay_(rear).jpg"],
    ["Chevrolet Onix Plus Premier (frente, lateral, traseira)", "Just a Man", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:2022_Chevrolet_Onix_Plus_1.0_Premier_(front).jpg"],
    ["Volkswagen Nivus Highline (frente e traseira)", "Just a Man", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:2022_Volkswagen_Nivus_Highline_200_TSi_(front).jpg"],
    ["Hyundai Creta SEL (frente e traseira)", "Chanokchon", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:2022_Hyundai_Creta_SEL.jpg"],
    ["BMW R 1250 GS", "Cjp24", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:BMW_R_1250_GS_(1).jpg"],
    ["Honda CB500X (frente e traseira)", "Wikisympathisant", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Honda_CB500X_2024-05-23.jpg"],
    ["Yamaha MT-07 2021", "PackMecEng", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:2021_Black_Yamaha_MT-07.jpg"]
  ]
};
