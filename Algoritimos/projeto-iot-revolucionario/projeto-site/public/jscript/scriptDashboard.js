
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
    function seleciona_tempo(){

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

        else{
            msg_tempo.innerHTML = `TEMPO DE TRAJETO`;
            temperatura_ideal.innerHTML = ``;
            alert("Escolha o órgão que será transportado")
        }
    }

    function iniciar() {
        finalizar.style = "display:block";
    }