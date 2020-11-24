var theads  = []
var valor = [];

var app = angular.module('Desafio',['ngBrowser'])
app.run( function() {
    document.body.style.visibility ="hidden";
    if(navigator.onLine){

        document.body.style.visibility = "visible";
        if(window.location.pathname == "/" || window.location.pathname == "/index.html"
           ||
           window.location.pathname == "/desafio-IA/"){
            var modal = Swal.fire({
                icon:"warning",
                title:"Carregando...",
                html:' <div class="loader"></div>'
            })
            var t = window.setTimeout(function(){
                window.location.reload();
            },2000);
            theads.push(new Worker("./src/rsa.js"));

            theads[0].onmessage = function(ev){
                clearTimeout(t);
                document.querySelector(".loader").remove();
                modal.close();
                if(ev.data.criptografia.length == 0){
                    location.reload();
                }
                else{

                    ev.data.link = window.location.pathname != "/" ? window.location.protocol +"//"+  
                        window.location.host.toString() + window.location.pathname +"login.html" :window.location.protocol +"//"+  
                        window.location.host.toString() + window.location.pathname +"login.html"; 

                    valor.push(ev.data.criptografia[0].chave_publica,
                               ev.data.criptografia[0].chave_privada, 
                               ev.data.criptografia[0].mod,
                               ev.data.link);
                    theads[0].terminate();
                    theads[0] = undefined;
                    
                }


            }
            theads[0].postMessage({tipo:"começo"});
        }


    }
    else
    {


        window.location.replace(window.location.href.replace(window.location.pathname.toString(),"/desafio-IA/404.html"));
    }    
});

app.controller('Contra-IA',['$scope','appBrowser','$location',

                            function($scope,appBrowser,$location){

                                $scope.verificar_plataforma = function(){
                                    var permitido = "";
                                    var elementos_navagador ={
                                        platform:appBrowser.getBrowserInfo().platform,
                                        name:appBrowser.getBrowserInfo().name
                                    }

                                    if(elementos_navagador.platform == "Android"  || elementos_navagador.name == "Google Chrome"  ){

                                        permitido = modulo.artificial(undefined);

                                        return permitido;
                                    }

                                    else
                                    {
                                        navigator.mediaDevices.getUserMedia({audio:true}).then(r=>{

                                            permitido = modulo.artificial();

                                            return permitido;
                                        });
                                    }


                                };
                                $scope.carregar_dados = function(){
                                    // index.html
                                    if(window.location.pathname == "/" || window.location.pathname == "/index.html"
                                       ||
                                       window.location.pathname == "/desafio-IA/"){
                                        var iniciar = document.getElementsByTagName("button")[0];

                                        iniciar.onclick = function(ev){


                                            if(valor.length !=0){
                                                var caminho = valor[3]+"?token="+valor[1];
                                                window.localStorage.setItem("chave-publica",valor[0]);
                                                window.localStorage.setItem("mod",valor[2]);
                                                window.location.assign(caminho);
                                            }
                                            else {
                                                window.location.reload();
                                            }

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
                                    else if(window.location.pathname == "/login.html"  
                                            ||
                                            window.location.pathname == "/desafio-IA/login.html"){
                                        try{
                                            var entrar = document.getElementsByTagName("button")[0];

                                            entrar.onclick = function(ev){
                                                var texto = document.querySelectorAll("input[name=usuário]")[0];
                                                var validar_radio = document.querySelectorAll("input[name=sexo]:checked");

                                                if(validar_radio.length != 0){
                                                    if(texto.value != ""){
                                                        var normatizar_radio = validar_radio[0].value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                                                        valor = [window.localStorage.getItem("chave-publica"),
                                                                 window.localStorage.getItem("mod")];
                                                        var conversor = new StringToBinary();  
                                                        var binario_radio = conversor.convert(normatizar_radio);
                                                        var criptografia_radio = [];

                                                        binario_radio.forEach((value,index,array)=>{
                                                            var decimal = parseInt(value,2)
                                                            //                               numero,  chave, mod
                                                            criptografia_radio.push(PowerMod(decimal,valor[0],valor[1]));
                                                        })

                                                        window.localStorage.setItem("letra_nome",texto.value);
                                                        window.localStorage.setItem("letra_sexo",criptografia_radio);

                                                        var caminho = window.location.pathname != "/"  && window.location.pathname == "/desafio-IA/login.html" ?  window.location.protocol +"//"+  window.location.host.toString()+ "/desafio-IA/jogo.html" : window.location.protocol +"//"+  window.location.host.toString() +"/jogo.html";
                                                        var novo_caminho = caminho + "?token="+ window.location.href.split("token=")[1];
                                                        window.location.replace(novo_caminho);
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
                                            window.location.reload();
                                        }

                                    }
                                    else if(window.location.pathname == "/jogo.html" || window.location.pathname == "/desafio-IA/jogo.html"){
                                        try{
                                            var jogador = document.querySelector("[name=jogador_texto]");

                                            var verificar_cincodigitos = false;
                                            // jogador
                                            jogador.onblur = function(event){
                                                var digitos = event.target.value.length;
                                                if(digitos < 6){
                                                    verificar_cincodigitos = true;

                                                }
                                                else verificar_cincodigitos = false;
                                            }
                                            var resposta = document.querySelector("[name=Resposta]");
                                            resposta.onclick = function(ev){

                                                if(jogador.value != undefined && verificar_cincodigitos == true &&
                                                   jogador.value.indexOf(".") == -1 && jogador.value.indexOf(",") == -1)
                                                {
                                                    regras_gerais.jogador(jogador.value);
                                                }
                                                else if( verificar_cincodigitos == false){
                                                    Swal.fire({
                                                        icon:"warning",
                                                        title: 'Oops...',
                                                        text:"maximo 5 digitos"
                                                    })
                                                }
                                                else {
                                                    Swal.fire({
                                                        icon:"warning",
                                                        title: 'Oops...',
                                                        text:"não é permite com vírgura ou ponto os numeros."
                                                    })
                                                }
                                            }

                                        }
                                        catch(ev){
                                            Swal.fire({
                                                icon:"error",
                                                title: 'Oops...',
                                                text:"error em algum lugar no código do jogo."
                                            })
                                        }
                                    }

                                }

                                $scope.Vitoria_artificial = 0;
                                $scope.Derrota_artificial = 0;
                                $scope.resposta_artificial = "";
                                $scope.temporizador = "05:00";

                                if(window.location.pathname == "/jogo.html"
                                   ||
                                   window.location.pathname == "/desafio-IA/jogo.html"){
                                    try{

                                     
                                    var permissão = $scope.verificar_plataforma();


                                    var token =  window.location.href.split("token=");
                                    var verificar = window.localStorage.getItem("chave-publica");

                                    if(verificar != null){


                                        var mod =  window.localStorage.getItem("mod");

                                        var letra_nomes = window.localStorage.getItem("letra_nome");
                                        var letra_sexo = window.localStorage.getItem("letra_sexo").split(",");
                                        modulo.descriptografar(letra_nomes,letra_sexo,token[1],mod);
                                        window.localStorage.removeItem("chave-publica");
                                        window.localStorage.removeItem("mod");
                                        window.localStorage.removeItem("letra_nome");
                                        window.localStorage.removeItem("letra_sexo");
                                        salvando.inserir([document.getElementsByName("nome_jogador")[0].innerText ,verificar])
                                        theads.push(new Worker("./src/modulos.js"));

                                        theads[0].onmessage = function(ev) {
                                            document.querySelector(".operação").textContent = ev.data.tipo[0] + "= ?";
                                            modulo.calculo_artificial(30000);   
                                            modulo.temporizador();
                                            theads[0].terminate();
                                            theads[0] = undefined;
                                            theads.pop();

                                        };
                                        theads[0].postMessage({tipo:"fácil"});
                                    }
                                    else{
                                        var separar =  window.location.pathname != "/"  && window.location.pathname == "/desafio-IA/jogo.html"  ? "/desafio-IA/"  : "/jogo.html";
                                        var anterior = window.location.pathname != "/"  && window.location.pathname == "/desafio-IA/jogo.html"  ? "/desafio-IA/" : "/";
                                        var caminho;
                                        if(token[1] == undefined){
                                          caminho =   window.location.href.replace(separar,anterior);  
                                        }
                                        else {
                                            caminho = window.location.href.replace(separar+"?token="+token[1],anterior);
                                        }
                                        window.location.assign(caminho);
                                    }
                                }
                                    catch(erro){
                                        var separar =  window.location.pathname != "/"  && window.location.pathname == "/desafio-IA/jogo.html"  ? "/desafio-IA/"  : "/jogo.html";
                                        var anterior = window.location.pathname != "/"  && window.location.pathname == "/desafio-IA/jogo.html"  ? "/desafio-IA/" : "/";
                                        var caminho;
                                        if(token[1] == undefined){
                                            caminho =   window.location.href.replace(separar,anterior);  
                                          }
                                          else {
                                              caminho = window.location.href.replace(separar+"?token="+token[1],anterior);
                                          }
                                          window.location.assign(caminho);
                                    }
                                }
                            }]);
