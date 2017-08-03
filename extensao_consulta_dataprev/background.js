var status_api = 'erro';

//Get message from content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.site == 'xxxxx') { //verifica  é o site do xxxxx
            if (request.dados && !request.dados.hasOwnProperty('api')) {
                console.log('xxxxx: ' + request.dados);
                localStorage.setItem("lista", request.dados); //item com dados
                sendResponse({
                    response: localStorage.getItem('falha')
                });
            } else if (request.dados = 'api') {
                console.log('api: ' + status_api);
                sendResponse({
                    response: status_api
                });

            }
        } else if (request.site == 'dtpv') { //verifica se e o site do dataprev       
            if (request.status == 'falhou') {
                localStorage.setItem('falha', 'falhou'); //erro dataprev                     
            } else if (request.status == 'erro') { //erro api
                status_api = 'erro';
            } else if (request.status == 'ok') { //erro api
                status_api = 'ok';
            } else {
                localStorage.setItem('falha', 'tudo ok');
                status_api = 'erro';
                //enviar para dtpv
                sendResponse({
                    response: localStorage.getItem("lista")
                });
            }
        }
    }
);

//Check if extension has installed
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (request) {
            if (request.message) {
                if (request.message == "version") {
                    sendResponse({ version: 1.0 });
                } else if (request.message == "extrato") {
                    //console.log('response falha');
                    if (localStorage.getItem('falha')) {
                        sendResponse({ extrato: localStorage.getItem('falha') });
                    }
                }
            }
        }
        return true;
    });


function sendDetails(sendData) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            nome: sendData
        }, function(response) {
            //alert("The response from the content script: " + response.response);
        });
    });
}