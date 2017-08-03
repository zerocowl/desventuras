var re = new RegExp(/([^<]+)Informe o número do seu benefício sem pontos ou barras/i);
var test = new RegExp(/([^<]+)Erro no processamento da solicitação./i);
var html = document.getElementsByTagName('html')[0].innerHTML;
debugger;

if (html.match(re)) {
    sendMessage('nulo');
} else if (html.match(test)) {
    sendMessage('falhou');
} else {
    fillExtrato(html);
}

//Send message to background page
function sendMessage(message) {
    chrome.runtime.sendMessage({
        site: "dtpv",
        status: message
    }, function(response) {
        // alert("Sou dtpv: " + response.response);
        fillExtrato(html, response.response);
    });
}

//html => pagina do dataprev e dados => itens da consulta

function fillExtrato(html, dados = '') {
    var verificaAbertura = new RegExp(/([^<]+)<h2>Extrato de Pagamentos<\/h2>/i);
    var semCredito = new RegExp(/([^<]+)NAO EXISTE CREDITO DISPONIVEL PARA NB INFORMADO/i);
    var extratoAberto = new RegExp(/([^<]+)Mens. reajustada/i);

    if (!html.match(verificaAbertura)) {
        sendMessage("falhou");
    }
    if (dados != '' && html.match(semCredito)) {
        //  enviaExtrato("Credito Indisponivel");
        alert('Credito Insdisponivel');
    } else if (dados != '') {
        dados = JSON.parse(dados);
        var nb = dados.nb;
        var dia = dados.dia;
        var mes = dados.mes;
        var ano = dados.ano;
        var nome = dados.nome;
        var cpf = dados.cpf;
        var nbForm = document.getElementById('nb');
        var diaForm = document.getElementById('dia');
        var mesForm = document.getElementById('mes');
        var anoForm = document.getElementById('ano');
        var nomeForm = document.getElementById('nome');
        var cpfForm = document.getElementById('cpf');
        localStorage.setItem("nb", nb);
        nbForm.value = nb;
        nbForm.readOnly = false;
        diaForm.value = dia;
        mesForm.value = mes;
        anoForm.value = ano;
        nomeForm.value = nome;
        cpfForm.value = cpf;
    } else {
        sendExtrato(html);
    }
}

function sendExtrato(html) {
    enviaExtrato(html);
    //console.log(html);
    //alert(encodeURIComponent(html));
}

//post to API
function enviaExtrato(html) {
    debugger;
    var http = new XMLHttpRequest();
    var url = "https://r2d2.xxxx.com.br/extrato/insercao/";
    var params = "{\"html\":\"" + encodeURIComponent(html) + "\"}";
    http.open("POST", url, false); //modo SINCRONO
    http.setRequestHeader("content-type", "application/json");
    http.setRequestHeader("cache-control", "no-cache");
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.withCredentials = false;
    http.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (!http.responseText || !http.responseText == 'true') { //se a api der erro
                sendMessage('erro');
            } else {
                sendMessage('ok');
            }
        }
    }
    http.send(params);
}