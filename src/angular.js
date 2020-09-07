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
              ev.data.link =   window.location.href.replace("/index.htm","/login.html");
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
        // $scope.verificar_plataforma().then(p=>{
        //     if(p == "permitido"){
             window.location.replace(valor[3]);
        
        //     }
        //     else console.log(p);
        // })
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
    try{
        var entrar = document.getElementsByTagName("button")[0];
       
        entrar.addEventListener("click",function(ev){
            var texto = document.querySelectorAll("input[name=usuário]")[0];
            var validar_radio = document.querySelectorAll("input[name=sexo]:checked")[0];
            if(validar_radio.checked){
                if(texto.value != ""){
                    
                    var conversor = new StringToBinary();  
                   var  binario_texto = conversor.convert(texto.value);
                    var binario_radio = conversor.convert(validar_radio.value);
                    var criptografia_texto = [];
                    var criptografia_radio = [];
                    binario_texto.forEach((value,index,array)=>{
                        criptografia_texto.push(PowerMod(value.toString(),valor[0],valor[2]));
                    })
                    binario_radio.forEach((value,index,array)=>{
                        criptografia_radio.push(PowerMod(value.toString(),valor[0],valor[2]));
                    })
                    console.log(criptografia_texto);
                   window.localStorage.setItem("nome",criptografia_texto);
                   window.localStorage.setItem("sexo",criptografia_radio);
                   window.localStorage.setItem("chave",valor[1]);
                   window.localStorage.setItem("mod",valor[2]);
                 var caminho =  window.location.href.replace("/index.htm","/jogo.html");
                 window.location.replace(caminho);
                }
                else {
                    Swal.fire({
                        icon:"warning",
                        title: 'Oops...',
                        text:"campo nome não foi preenchido!"
                    })
                }
            }
            else{
                Swal.fire({
                    icon:"warning",
                    title: 'Oops...',
                    text:"campo sexo não foi preenchido!"
                })
            }
        })
    }
    catch(ev){
        console.error("error em algum lugar no código do login");
    }
    
}
else if(window.location.pathname == "/jogo.html"){
    try{

    }catch(ev){
        console.error("error em algum lugar no código do jogo");
    }
}

}
}]);