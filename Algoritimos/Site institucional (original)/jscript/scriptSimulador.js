
var conta;
        var desconto;
        var contaT;
        var total;
    function calculo() {

        respostas.style="display:block;"
        
        if (qtd_caixas.value >= 10) {

            conta = qtd_caixas.value * 1000;
            desconto = conta * 0.05;
            contaT = conta - desconto;
            total = contaT + 2500;


            mensagem.innerHTML = `<br>Adicionando ${qtd_caixas.value} caixas no seu pedido mais os 5% do
            desconto o valor total será de <b>R$${contaT.toFixed(2)}</b>`

            mensagem2.innerHTML = `<br>Somando o total do pedido ficará: R$2500,00 do uso do nosso site mais 
            R$${contaT.toFixed(2)} da quantidade de caixas solicitadas.
            <br>Totalizando <b>R$${total.toFixed(2)}</b> reais mensais.`

        } else {

            conta = qtd_caixas.value * 1000;
            total = conta + 2500;

            mensagem.innerHTML = `<br>Adicionando ${qtd_caixas.value} caixas no seu pedido o valor total 
            será de <b>R$${conta.toFixed(2)}</b>`

            mensagem2.innerHTML = `<br>Somando o total do pedido ficará: R$2500,00 do uso do nosso site mais 
            R$${conta.toFixed(2)} da quantidade de caixas solicitadas.
            <br>Totalizando <b>R$${total.toFixed(2)}</b> mensais.`
        }
    }
