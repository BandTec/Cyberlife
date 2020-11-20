function entrar() {
    if (email.value == 'admin' && senha.value == 'cyberlife') {
        window.location.href = "dashboard.html"
        //window.location.href faz trocar de tela
    }
    else if (email.value == 'usuario' && senha.value == '123') {
        window.location.href = "dashboard_usuario.html"
    }
    else {
        alert("ID ou senha incorretos")
        email.value = "";
        senha.value = "";
        //caso o id ou senha estejam errados, um alert vai ser lançado e vai limpar ambos os campos
    }


    //esqueci a senha
}
function esqueceu() {
    alert("Uma mensagem de confirmação foi enviada para o email informado")
}
