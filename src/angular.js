var theads  = []
var valor = [];

window.onload = function(){
    document.body.style.visibility ="hidden";
    if(navigator.onLine){
        document.body.style.visibility = "visible";
        theads.push(new Worker("./src/rsa.js"));
        theads[0].postMessage("começo");
        theads[0].onmessage = function(ev){
            if(ev.data.criptografia.length == 0){
                location.reload(true);
            }
            else{
              ev.data.link =   
              window.location.origin +"/login.html"+
              
              "?p="+ev.data.primo1 +
              "&q="+ev.data.primo2;
             valor.push(ev.data.criptografia[0].chave_publica,
                ev.data.criptografia[0].chave_privada, 
                ev.data.criptografia[0].mod,
                ev.data.link);
                theads.pop();
    
            }
            
        }
    }

}
var app = angular.module('Desafio',['ngBrowser'])

app.controller('Contra-IA',['$scope','appBrowser',

function($scope,appBrowser){
    
$scope.verificar_plataforma = function(){
    
    var elementos_navagador ={
        platform:appBrowser.getBrowserInfo().platform,
        name:appBrowser.getBrowserInfo().name
    }
    return new Promise(function(resp,reject){
    if(elementos_navagador.platform == "Android"  || elementos_navagador.name == "Google Chrome"  ){

        modulos().artificial().then(r=>{
           resp(r);
        }).catch(e=>{
 
        })
    
        
        
     }else{
        resp("sem permissão");
     }
})
    
};
$scope.carregar_dados = function(){
    // index.html
if(window.location.pathname == "/index.html"){
    var iniciar = document.getElementsByTagName("button")[0];
    iniciar.addEventListener("click",function(ev){
        $scope.verificar_plataforma().then(p=>{
            if(p == "permitido"){
             window.location.assign(valor[3]);
        
            }
            else console.log(p);
        })
    })
    var pontos = document.getElementsByTagName("button")[1];
    pontos.addEventListener("click",function(ev){
    console.log(pontos.value);
    })
    var quem_somos = document.getElementsByTagName("button")[2];
    quem_somos.addEventListener("click",function(ev){
        console.log(quem_somos.value)
    })
    
}
else if(window.location.pathname == "/login.html"){

}

}
}]);