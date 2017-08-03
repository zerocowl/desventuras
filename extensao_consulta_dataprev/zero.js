/*
window.onload = function() {
    var dados;
    try {
        dados = localStorage.getItem("dados_extensao");
    } catch (e) {
        dados = '';
    }
    //Send a message
    if (dados != '') {
        sendMessage(dados);
    }
};
*/
function teste() {
    GetFicha();
}

//validar se api nao deu erro

var api = { api: "api" };
//envia pra script.js os dados
function ext() {
    var dados;
    try {
        dados = localStorage.getItem("dados_extensao"); //pega os itens ja salvo pela pagina dos campos
    } catch (e) {
        dados = '';
    }
    if (dados != '') {
        window.postMessage(dados, "*");
        var rf = setInterval(function attFicha() {
            window.postMessage(api, "*");
            if (localStorage.getItem('api') == 'ok') {
                localStorage.setItem('api', 'erro');
                clearInterval(rf);
                GetFicha();
                console.log(localStorage.getItem('api'));
            }
        }, 1000);
    }
}