var re = new RegExp(/([^<]+)LoL Stats, Record Replay, Database, Guide, MMR - OP.GG/i);
var html = document.getElementsByTagName('html')[0].innerHTML;

//verifica se esta na pagina correta
if (html.match(re)) {
    sendMessage('nulo');
} else {
    getStatus(html);
}

//Send message to background page
function sendMessage(message) {
    //Construct & send message
    chrome.runtime.sendMessage({
        site: "opgg",
        status: message
    }, function(response) {
        // alert("Sou dtpv.The response from the background page: " + response.response);//You have to choose which part of the response you want to display ie. response.response
        getStatus(html, response.response);
    });
}

//html pagina e dados itens da consulta

function getStatus(html, dados = '') {
    var verificaAbertura = new RegExp(/([^<]+)<div class="PastRank">/i);
    var semCredito = new RegExp(/([^<]+)Buscar Invocador no OP.GG/i);
    // var extratoAberto = new RegExp(/([^<]+)Mens. reajustada/i);

    if (!html.match(verificaAbertura)) {
        sendMessage("falhou");
    }
    if (dados != '' && html.match(semCredito)) {
        enviaDados("NAO ENCONTRADO", localStorage.getItem("rank"));
    } else if (dados != '') {
        dados = JSON.parse(dados);

        var nick = dados.nick;

        var nick = $('.Summoner[name=userName]').val("d")

        localStorage.setItem("rank", rank);
        // fill in your username and password
        nick.value = nick;

    } else {
        //console.log(html);
        enviaDados(html, localStorage.getItem("rank"));
        //localStorage.setItem("extrato",html);
    }
}

//post do resultado
function enviaDados(html, nick) {
    debugger;
    var http = new XMLHttpRequest();
    var url = "http://localhost:3000/post";
    var params = "nick=" + nick + "&html=" + encodeURIComponent(html);
    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    /* http.onreadystatechange = function() {//Call a function when the state changes.
		 if(http.readyState == 4 && http.status == 200) {
			 alert(http.responseText);
		 } 
	 }*/
    http.send(params);
}