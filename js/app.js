function getUsuario() {
  const dados = localStorage.getItem("usuario");
  return dados ? JSON.parse(dados) : null;
}

function salvarUsuario(user) {
  localStorage.setItem("usuario", JSON.stringify(user));
}

function getCarrinho() {
  const dados = localStorage.getItem("carrinho");
  return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(itens) {
  localStorage.setItem("carrinho", JSON.stringify(itens));
}

function getUnidadeAtual() {
  return localStorage.getItem("unidadeId");
}

function setUnidadeAtual(id) {
  localStorage.setItem("unidadeId", id);
}

function adicionarAoCarrinho(produto) {
  const carrinho = getCarrinho();
  const existente = carrinho.find(i => i.id === produto.id);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }
  salvarCarrinho(carrinho);
}

function totalCarrinho() {
  return getCarrinho().reduce((s, i) => s + i.preco * i.qtd, 0);
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
}

function criarPedido() {
  const pedido = {
    id: Date.now(),
    itens: getCarrinho(),
    total: totalCarrinho(),
    status: "Recebido",
    data: new Date().toLocaleString("pt-BR"),
    unidadeId: getUnidadeAtual()
  };
  localStorage.setItem("pedidoAtual", JSON.stringify(pedido));
  limparCarrinho();
  return pedido;
}

function getPedidoAtual() {
  const dados = localStorage.getItem("pedidoAtual");
  return dados ? JSON.parse(dados) : null;
}

function atualizarStatusPedido(status) {
  const pedido = getPedidoAtual();
  if (pedido) {
    pedido.status = status;
    localStorage.setItem("pedidoAtual", JSON.stringify(pedido));
  }
}

function adicionarPontos(valor) {
  const user = getUsuario();
  if (user) {
    user.pontos = (user.pontos || 0) + Math.floor(valor / 10);
    salvarUsuario(user);
  }
}

function mostrarMsg(el, texto, tipo) {
  if (!el) return;
  el.textContent = texto;
  el.className = tipo === "erro" ? "msg-erro" : "msg-ok";
}
