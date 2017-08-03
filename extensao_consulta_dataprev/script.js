//recebe os dados e envia pro background
var s = document.createElement('script');
s.src = chrome.extension.getURL("zero.js");
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);

window.addEventListener("message", function(event) {
    //  if (event.source != window)
    //  return;
    sendMessage(event.data);
});


//testa se api esta no localStorage
function updateFicha(apistatus) {
    localStorage.setItem("api", apistatus);
    //  alert("FICHA ATUALIZADA");
}

function sendMessage(dados) {
    chrome.runtime.sendMessage({
        site: "xxxxx",
        dados: dados
    }, function(response) {
        //console.log(response.response);
        if (response.response == "ok") { //retornar response da api            
            updateFicha(response.response);
         
        } else if (response.response == 'erro') {
            updateFicha(response.response);            
        } else {
           alert(response.response);           
        }
    });
    return true;
}