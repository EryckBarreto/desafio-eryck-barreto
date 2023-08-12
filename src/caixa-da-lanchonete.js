import dadosCardapio from './dados-cardapio'

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        // Validações para verificar método de pagamento e se há item no pedido
        if (!["dinheiro", "debito", "credito"].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        };

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        };
        // Se precisar alterar valores ou acrescentar método de pagamento, fazer nessa constante
        const porcentagemDescontoOuAcrescimo = {
            dinheiro: 0.95,
            debito: 1,
            credito: 1.03
        };

        let valorEmCentavos = 0;
        for (let itensCliente of itens) {

            // O input é recebido como string, desse modo o método split transforma em um array separando na vírgula
            const itemSeparadoDaQuantidade = itensCliente.split(',');
            const itemDoPedido = itemSeparadoDaQuantidade[0];
            const quantidadeDoItem = itemSeparadoDaQuantidade[1];

            if (quantidadeDoItem === "0") {
                return "Quantidade inválida!";
            };

            const itemEncontrado = dadosCardapio.cardapio.find((item) => item.codigo === itemDoPedido);

            if (!itemEncontrado) {
                return "Item inválido!";
            };
        
            if (itemEncontrado.itemPrincipal) {
                const itemPrincipalEncontrado = itens.find(item => item.split(',')[0] === itemEncontrado.itemPrincipal);
                if (!itemPrincipalEncontrado) {
                    return "Item extra não pode ser pedido sem o principal";
                };
            };
            
            const valorDoItemEmCentavos = itemEncontrado.valor * 100;
            const acrescismoOuDesconto = porcentagemDescontoOuAcrescimo[metodoDePagamento];

            valorEmCentavos += quantidadeDoItem * (valorDoItemEmCentavos * acrescismoOuDesconto);
        };

        // Formatação dos valores para atender ao padrão "R$ XX,XX".
        const valorFinalToFixed = (valorEmCentavos / 100).toFixed(2);
        const valorFinalString = valorFinalToFixed.toString().replace('.', ',');
        return `R$ ${valorFinalString}`;
    };
};

export { CaixaDaLanchonete }