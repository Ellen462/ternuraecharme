// Variáveis globais
let carrinho = [];
const numeroWhatsApp = "5591984351031"; // Substitua pelo número real

// Função para abrir as abas de produtos
function abrirAba(evt, categoria) {
  // Esconder todos os conteúdos de abas
  const conteudoAbas = document.getElementsByClassName("aba-conteudo");
  for (let i = 0; i < conteudoAbas.length; i++) {
    conteudoAbas[i].classList.remove("ativo");
  }
  
  // Desativar todos os botões de abas
  const botoesAbas = document.getElementsByClassName("aba-link");
  for (let i = 0; i < botoesAbas.length; i++) {
    botoesAbas[i].classList.remove("ativo");
  }
  
  // Mostrar a aba específica e ativar o botão
  document.getElementById(categoria).classList.add("ativo");
  evt.currentTarget.classList.add("ativo");
}

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
  // Verificar se o item já está no carrinho
  const itemExistente = carrinho.find(item => item.nome === nome);
  
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      nome: nome,
      preco: preco,
      quantidade: 1
    });
  }
  
  // Atualizar contador do carrinho
  atualizarContadorCarrinho();
  
  // Feedback visual
  alert(`${nome} foi adicionado ao carrinho!`);
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  document.getElementById("carrinhoContador").textContent = totalItens;
}

// Função para abrir o modal do carrinho
function abrirCarrinho() {
  const modal = document.getElementById("carrinhoModal");
  const carrinhoItens = document.getElementById("carrinhoItens");
  const carrinhoTotal = document.getElementById("carrinhoTotal");
  
  // Limpar conteúdo anterior
  carrinhoItens.innerHTML = "";
  
  if (carrinho.length === 0) {
    carrinhoItens.innerHTML = "<p>Seu carrinho está vazio.</p>";
    carrinhoTotal.textContent = "0,00";
  } else {
    // Calcular total e listar itens
    let total = 0;
    
    carrinho.forEach((item, index) => {
      const itemTotal = item.preco * item.quantidade;
      total += itemTotal;
      
      const itemElemento = document.createElement("div");
      itemElemento.classList.add("item-carrinho");
      itemElemento.innerHTML = `
        <div>
          <span>${item.nome} x${item.quantidade}</span>
        </div>
        <div>
          <span>R$ ${itemTotal.toFixed(2)}</span>
          <button onclick="removerDoCarrinho(${index})" style="margin-left: 10px; color: red; border: none; background: none; cursor: pointer;">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      
      carrinhoItens.appendChild(itemElemento);
    });
    
    carrinhoTotal.textContent = total.toFixed(2);
  }
  
  // Mostrar modal
  modal.style.display = "block";
}

// Função para remover itens do carrinho
function removerDoCarrinho(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
  } else {
    carrinho.splice(index, 1);
  }
  
  // Atualizar exibição do carrinho
  abrirCarrinho();
  atualizarContadorCarrinho();
}

// Função para finalizar pedido via WhatsApp
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
    return;
  }
  
  // Montar mensagem para WhatsApp
  let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";
  let total = 0;
  
  carrinho.forEach(item => {
    const itemTotal = item.preco * item.quantidade;
    total += itemTotal;
    mensagem += `- ${item.nome} x${item.quantidade}: R$ ${itemTotal.toFixed(2)}\n`;
  });
  
  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;
  mensagem += "\n\nAguardo informações para pagamento e entrega.";
  
  // Codificar mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem);
  
  // Redirecionar para WhatsApp
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, '_blank');
  
  // Limpar carrinho após pedido
  carrinho = [];
  atualizarContadorCarrinho();
  
  // Fechar modal
  document.getElementById("carrinhoModal").style.display = "none";
  
  // Agradecer
  alert("Obrigada pelo pedido! Em breve entraremos em contato.");
}

// Fechar modal ao clicar no X
document.querySelector(".fechar").addEventListener("click", function() {
  document.getElementById("carrinhoModal").style.display = "none";
});

// Fechar modal ao clicar fora dele
window.addEventListener("click", function(event) {
  const modal = document.getElementById("carrinhoModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Abrir carrinho ao clicar no ícone
document.getElementById("carrinhoBtn").addEventListener("click", abrirCarrinho);

// Inicializar contador do carrinho
atualizarContadorCarrinho();