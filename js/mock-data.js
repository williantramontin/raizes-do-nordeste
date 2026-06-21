const unidades = [
  { id: 1, nome: "Recife - Boa Viagem", tipo: "completa", cidade: "Recife - PE" },
  { id: 2, nome: "Recife - Casa Amarela", tipo: "reduzida", cidade: "Recife - PE" },
  { id: 3, nome: "Fortaleza - Aldeota", tipo: "completa", cidade: "Fortaleza - CE" },
  { id: 4, nome: "Salvador - Pituba", tipo: "reduzida", cidade: "Salvador - BA" }
];

const cardapioBase = [
  { id: 1, nome: "Tapioca de Carne de Sol", preco: 18.90, cat: "Tapiocas", icon: "🫓", unidades: [1,2,3,4] },
  { id: 2, nome: "Cuscuz Recheado", preco: 14.50, cat: "Cuscuz", icon: "🌽", unidades: [1,2,3,4] },
  { id: 3, nome: "Bolo de Macaxeira", preco: 8.00, cat: "Doces", icon: "🍰", unidades: [1,3] },
  { id: 4, nome: "Suco de Caju", preco: 9.00, cat: "Bebidas", icon: "🥤", unidades: [1,2,3,4] },
  { id: 5, nome: "Café da Manhã Completo", preco: 22.00, cat: "Café", icon: "☕", unidades: [1,3] },
  { id: 6, nome: "Pé de Moleque (Junino)", preco: 6.00, cat: "Sazonal", icon: "🥜", unidades: [1,2,3,4], sazonal: true }
];

const promocoes = [
  { titulo: "10% off na 3ª compra", desc: "Acumule pontos e ganhe desconto na próxima visita" },
  { titulo: "Combo Café + Suco", desc: "Por R$ 28,00 em unidades selecionadas" }
];

function getCardapioUnidade(unidadeId) {
  return cardapioBase.filter(p => p.unidades.includes(unidadeId));
}

function formatPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}
