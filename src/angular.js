var theads  = []
var valor = [];

window.onload = function(){
    document.body.style.visibility ="hidden";
    if(navigator.onLine){
        document.body.style.visibility = "visible";
        if(window.location.pathname == "/login.html"){
            theads.push(new Worker("./src/rsa.js"));
            theads[0].postMessage("começo");
            theads[0].onmessage = function(ev){
                if(ev.data.criptografia.length == 0){
                    location.reload(true);
                }
                else{
                  ev.data.link =   window.location.href.replace("/login.html","/jogo.html");
                 
                 valor.push(ev.data.criptografia[0].chave_publica,
                    ev.data.criptografia[0].chave_privada, 
                    ev.data.criptografia[0].mod,
                    ev.data.link);
                    theads.pop();
        
                }
               
                
            }
        }
        
    }
    else{
        Swal.fire({
            icon:"warning",
            title: 'Oops...',
            text:"Precisa de internet !!!"
        })
    }

}
var app = angular.module('Desafio',['ngBrowser'])

app.controller('Contra-IA',['$scope','appBrowser','$location',

function($scope,appBrowser,$location){
    
$scope.verificar_plataforma = function(){
    var permitido = "";
    var elementos_navagador ={
        platform:appBrowser.getBrowserInfo().platform,
        name:appBrowser.getBrowserInfo().name
    }
   
    if(elementos_navagador.platform == "Android"  || elementos_navagador.name == "Google Chrome"  ){
      permitido = modulos().artificial()
     }else
     {
     permitido = "sem permissão";
     }
     return permitido;
    
};
$scope.carregar_dados = function(){
    // index.html
if(window.location.pathname == "/index.html"){
    var iniciar = document.getElementsByTagName("button")[0];
    iniciar.onclick = function(ev){
       var caminho =  window.location.href.replace("/index.html","/login.html");
             window.location.replace(caminho);
    }
    var pontos = document.getElementsByTagName("button")[1];
    pontos.onclick = function(ev){
    console.log(pontos.value);
    }
    var quem_somos = document.getElementsByTagName("button")[2];
    quem_somos.onclick = function(ev){
        console.log(quem_somos.value)
    }
    
}
else if(window.location.pathname == "/login.html"){
    try{
        var entrar = document.getElementsByTagName("button")[0];
       
        entrar.onclick = function(ev){
            var texto = document.querySelectorAll("input[name=usuário]")[0];
            var validar_radio = document.querySelectorAll("input[name=sexo]:checked");
            
            if(validar_radio.length != 0){
                if(texto.value != ""){
                 
                    var conversor = new StringToBinary();  
                   var  binario_texto = conversor.convert(texto.value);
                    var binario_radio = conversor.convert(validar_radio[0].value);
                    var criptografia_texto = [];
                    var criptografia_radio = [];
                    binario_texto.forEach((value,index,array)=>{
                       var decimal = parseInt(value.toString(),2);
                        criptografia_texto.push(PowerMod(decimal,valor[0],valor[2]));
                    })
                    binario_radio.forEach((value,index,array)=>{
                        var decimal = parseInt(value.toString(),2);
                        criptografia_radio.push(PowerMod(decimal,valor[0],valor[2]));
                    })
                  
                   criptografia_texto.forEach((value,index,array)=>{
                    window.localStorage.setItem("letra_nome"+index,value.toString());
                })
                criptografia_radio.forEach((value,index,array)=>{
                    window.localStorage.setItem("letra_sexo"+index,value.toString());
                });
                  
                   window.localStorage.setItem("chave",valor[1]);
                   window.localStorage.setItem("mod",valor[2]);
                
                window.location.replace(valor[3]);
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
        }
    }
    catch(ev){
        Swal.fire({
            icon:"error",
            title: 'Oops...',
            text:"error em algum lugar no código do login"
        })
    }
    
}
else if(window.location.pathname == "/jogo.html"){
    try{
      
   
    }catch(ev){
        Swal.fire({
            icon:"error",
            title: 'Oops...',
            text:"error em algum lugar no código do jogo"
        })
    }
}

}
if(window.location.pathname == "/jogo.html"){
    var permissão = $scope.verificar_plataforma();
    permissão.then(r=>{
    if(r != ""){
  
        
          
        
        // theads.push(new Worker("./src/rsa.js"));
        // theads[0].postMessage("fácil");
        // theads[0].onmessage = function(ev){
        // };
    }
})
}


}]);