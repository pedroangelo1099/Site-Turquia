const produtos = [
    { id: 1, nome: 'Item 1', preco: 10, quantidade: 0 },
    { id: 2, nome: 'Item 2', preco: 20, quantidade: 0 },
];

let total = 0;

const atualizarCarrinho = () => {
    const carrinhoElement = document.getElementById('itensCarrinho');
    carrinhoElement.innerHTML = '';
    total = 0;

    produtos.forEach(produto => {
        if (produto.quantidade > 0) {
            carrinhoElement.innerHTML += `
                <p>${produto.nome} - ${produto.quantidade} x R$ ${produto.preco}</p>
            `;
            total += produto.quantidade * produto.preco;
        }
    });

    document.getElementById('total').textContent = total.toFixed(2);
};

const enviarPedidoDiscord = () => {
    const nome = document.getElementById('nome').value;
    const idJogo = document.getElementById('idJogo').value;
    const discord = document.getElementById('discord').value;

    let pedidoText = `Novo Pedido de Encomenda:\nNome: ${nome}\nID do Jogo: ${idJogo}\nDiscord: ${discord}\nItens:\n`;

    produtos.forEach(produto => {
        if (produto.quantidade > 0) {
            pedidoText += `${produto.nome} - ${produto.quantidade} x R$ ${produto.preco}\n`;
        }
    });

    pedidoText += `Total: R$ ${total.toFixed(2)}`;

    // Substitua a URL do seu Webhook do Discord abaixo
    const webhookUrl = 'https://discord.com/api/webhooks/SEU_WEBHOOK_URL';
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: pedidoText,
        }),
    }).then(response => {
        if (response.ok) {
            alert('Pedido enviado com sucesso!');
        } else {
            alert('Erro ao enviar o pedido.');
        }
    });
};

document.querySelectorAll('.mais').forEach(button => {
    button.addEventListener('click', (e) => {
        const produtoId = e.target.closest('.produto').getAttribute('data-id');
        const produto = produtos.find(p => p.id == produtoId);
        produto.quantidade++;
        e.target.previousElementSibling.value = produto.quantidade;
        atualizarCarrinho();
    });
});

document.querySelectorAll('.menos').forEach(button => {
    button.addEventListener('click', (e) => {
        const produtoId = e.target.closest('.produto').getAttribute('data-id');
        const produto = produtos.find(p => p.id == produtoId);
        if (produto.quantidade > 0) {
            produto.quantidade--;
            e.target.nextElementSibling.value = produto.quantidade;
            atualizarCarrinho();
        }
    });
});

document.getElementById('encomendar').addEventListener('click', enviarPedidoDiscord);
