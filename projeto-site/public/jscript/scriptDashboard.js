
// Script para o header ficar fixado (Jorge e Bruno)

window.onscroll = function () { myFunction() };

// Get the header
var header = document.getElementById("headersite");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

// função para mostrar o tempo de trajeto e a temperatura ideal
function seleciona_tempo() {

    if (orgao.value == "cora") {
        msg_tempo.innerHTML = `4 a 6 horas`;
        temperatura_ideal.innerHTML = `5°C`;
    }

    else if (orgao.value == "rins") {
        msg_tempo.innerHTML = `até 48 horas`;
        temperatura_ideal.innerHTML = `4°C`;
    }

    else if (orgao.value == "pancreas") {
        msg_tempo.innerHTML = `12 a 24 horas`;
        temperatura_ideal.innerHTML = `5°C`;
    }

    else if (orgao.value == "pulmao") {
        msg_tempo.innerHTML = `4 a 6 horas`;
        temperatura_ideal.innerHTML = `5°C`;
    }

    else if (orgao.value == "figado") {
        msg_tempo.innerHTML = `12 a 24 horas`;
        temperatura_ideal.innerHTML = `4°C`;
    }

    else if (orgao.value == "corneas") {
        msg_tempo.innerHTML = `7 dias`;
        temperatura_ideal.innerHTML = `4°C`;
    }

    else {
        msg_tempo.innerHTML = `TEMPO DE TRAJETO`;
        temperatura_ideal.innerHTML = ``;
        alert("Escolha o órgão que será transportado")
    }
}

function iniciar() {
    finalizar.style = "display:block";
}




// dashboard CARAMICO fUNÇÕES DO CHART JS

let proximaAtualizacao;

window.onload = obterDadosGraficoPrimeiraVez(1);


function chamargraficos(idcaixa) {

    obterDadosGraficoPrimeiraVez(idcaixa)
    //atualizarGrafico(idcaminhao)

}


// neste JSON tem que ser 'labels', 'datasets' etc, 
// porque é o padrão do Chart.js



// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGrafico() {
    var configuracoes = {
        responsive: true,
        animation: { duration: 500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Histórico recente de temperatura'
        },
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-temperatura',
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-umidade',

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    };

    return configuracoes;
}

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGraficoPrimeiraVez(idcaixa) {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/leituras/ultimas/${idcaixa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                var dados = {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'y-temperatura',
                            label: 'Temperatura',
                            borderColor: window.chartColors.red,
                            backgroundColor: window.chartColors.red,
                            fill: false,
                            data: []
                        },
                        
                    ]
                };
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    dados.labels.push(registro.momento_grafico);
                    dados.datasets[0].data.push(registro.temperatura);

                }
                console.log(JSON.stringify(dados));
                div_aguarde.style.display = 'none';
                plotarGrafico(dados, idcaixa);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}



// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico(idcaixa, dados) {

    fetch(`/leituras/tempo-real/${idcaixa}`, { cache: 'no-store' }).then(function (response) {
        console.log("Estou tentando pegar idcaixa = ", idcaixa)
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
                dados.datasets[0].data.push(novoRegistro.temperatura); // incluir uma nova leitura de temperatura
              

                console.log("minha caixa é o " + idcaixa)

                window.grafico_linha.update();


                proximaAtualizacao = setTimeout(() => atualizarGrafico(idcaixa, dados), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idcaixa, dados), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// só altere aqui se souber o que está fazendo!
function plotarGrafico(dados, idcaixa) {
    console.log('iniciando plotagem do gráfico...');

    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: configurarGrafico()
    });

    setTimeout(() => atualizarGrafico(idcaixa, dados), 2000);
}


function sendData() {
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:9000/api/sendData', false);
    http.send(null);
}

setInterval(() => {
    sendData();
}, 2000);

// fIM DA DASHBOARD CARAMICO FUNÇÕES CHART JS


let usuario;

verificar_autenticacao();

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizacaoPeriodica() {
    obterdadosporcaixa(1);
    obterdadosporcaixa(2);
    obterdadosporcaixa(3);
    obterdadosporcaixa(4);
    setTimeout(atualizacaoPeriodica, 5000);
}



function obterdadosporcaixa(idcaixa) {
    //aguardar();
    fetch(`/leituras/tempo-real/${idcaixa}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(function (resposta) {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    // aqui, após registro. use os nomes 
                    // dos atributos que vem no JSON 
                    var dados = {
                        temperatura: resposta.temperatura,
                    }

                    alertar(resposta.temperatura, idcaixa);
                    atualizarTela(dados, idcaixa);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do caminhao p/ gráfico: ${error.message}`);
        });
}

function alertar(temperatura, idcaixa) {
    // padrão para meu alerta
    var limites = {
        max_temperatura: 40,
        min_temperatura: 20,

    };

    // zerar aviso de mensagem
    var mensagem_temperatura = '';
    var classe_temperatura = 'alerta';

    // comparando
    if (temperatura > limites.max_temperatura) {
        mensagem_temperatura += 'Temperatura alta demais! <br>';
        classe_temperatura = 'alerta alerta-alto';
    }
    if (temperatura < limites.min_temperatura) {
        mensagem_temperatura = 'Temperatura baixa demais! <br>';
        classe_temperatura = 'alerta alerta-baixo';
    }
    // escolhendo qual alterar
    var div_temperatura_alterar

    if (idcaixa == 1) {
        div_temperatura_alterar = div_alerta_temperatura

    } else if (idcaixa == 2) {
        div_temperatura_alterar = div_alerta_temperatura2

    } else if (idcaixa == 3) {
        div_temperatura_alterar = div_alerta_temperatura3

    } else if (idcaixa == 4) {
        div_temperatura_alterar = div_alerta_temperatura4

    }

    // alterando
    div_temperatura_alterar.innerHTML = mensagem_temperatura;
    div_temperatura_alterar.className = classe_temperatura;


}

// só altere aqui se souber o que está fazendo!
function atualizarTela(dados, idcaixa) {
    console.log('iniciando atualização da tela...');

    // escolhendo qual alterar
    var div_temperatura_alterar

    if (idcaixa == 1) {
        div_temperatura_alterar = div_temperatura

    } else if (idcaixa == 2) {
        div_temperatura_alterar = div_temperatura2

    } else if (idcaixa == 3) {
        div_temperatura_alterar = div_temperatura3

    } else if (idcaixa == 4) {
        div_temperatura_alterar = div_temperatura4

    }

    div_temperatura_alterar.innerHTML = `Temperatura: ${dados.temperatura}º`;

    


}


function sendData() {
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:9000/api/sendData', false);
    http.send(null);
}

setInterval(() => {
    sendData();
}, 5000);
