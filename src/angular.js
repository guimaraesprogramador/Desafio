var theads  = []
var valor = [];
var banco,pontos;
var app = angular.module('Regras_Operador',['ngBrowser'])
app.run( function() {
    document.body.style.visibility ="hidden";
    if(navigator.onLine){

        document.body.style.visibility = "visible";
        if(window.location.pathname == "/" || window.location.pathname == "/index.html"
           ||
           window.location.pathname == "/Regras_Operador/"){
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
        else if(window.location.pathname == "/login.html"  
                ||
                window.location.pathname == "/Regras_Operador/login.html")
        {
            modulo.pontos_geometricos().then(geo=>{
                pontos = geo;
            })
        }
        else if (window.location.pathname == "/continuar.html"
                 ||
                 window.location.pathname == "/Regras_Operador/continuar.html")
        {
            salvando.banco.then(dados=>{
                banco = dados;
            },error=>{
                banco = "erro";
            })
        }
    }
    else
    {


        window.location.replace(window.location.href.toString()+"404.html");
    }    
});

app.controller('Contra-IA',['$scope','appBrowser','$location',

                            function($scope,appBrowser,$location){

                                $scope.verificar_plataforma = function(){
                                    var elementos_navagador ={
                                        platform:appBrowser.getBrowserInfo().platform,
                                        name:appBrowser.getBrowserInfo().name
                                    }

                                    if(elementos_navagador.platform == "Android"  || elementos_navagador.name == "Google Chrome"  ){

                                        modulo.artificial(undefined);


                                    }

                                    else
                                    {
                                        navigator.mediaDevices.getUserMedia({audio:true}).then(r=>{

                                            modulo.artificial(undefined);


                                        });
                                    }


                                };
                                $scope.carregar_dados = function(){
                                    // index.html
                                    if(window.location.pathname == "/" || window.location.pathname == "/index.html"
                                       ||
                                       window.location.pathname == "/Regras_Operador/")
                                    {
                                        var continuar = document.getElementsByTagName("button")[0];
                                        continuar.onclick =  function(e){
                                            const db = window.indexedDB.open('dbRegras_Operador',2);
                                            db.onsuccess = function(e){

                                                var dados = e.target.result;
                                                if(dados){
                                                   var object_usuário =  dados.objectStoreNames[1];
                                                   var transaction = dados.transaction(object_usuário,'readwrite')
                                                   var curso = transaction.objectStore(object_usuário).openCursor();
                                                   curso.onsuccess = function(event2){
                                                    var dados_usuario = event2.target.result.value;
                                                    console.log(dados_usuario)
                                                    if(dados_usuario){
                
                                                        window.localStorage.setItem("positivo_ia",parseInt(dados_usuario.positivo));
                                                        window.localStorage.setItem("negativo_ai",parseInt(dados_usuario.negativo));
                                                        
                                                        var separar =  window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/continuar.html"  ? "/Regras_Operador/jogo.html"  : "/jogo.html";
                                                        var anterior = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/continuar.html"  ? "/Regras_Operador/" : "/";
                                                        var caminho =  window.location.origin.toString() +separar+"?token="+dados_usuario.chave;
                                                        window.localStorage.setItem("nome-usuário",dados_usuario.nome);
                                                        window.localStorage.setItem("chave-publica",dados_usuario.chave);
                                                        window.localStorage.setItem("positivo", parseInt(dados_usuario.positivo));
                                                        window.localStorage.setItem("negativo",parseInt(dados_usuario.negativo));
                                                        window.localStorage.setItem("sexo",dados_usuario.sexo);
                                                        //window.location.replace(caminho);
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon:"error",
                                                            title: 'Oops...',
                                                            text:"Não tem salve"
                                                        })
                                                    }
                                                    
                                                   }
                                                }
                                            }
                                            }
                                        var novo_jogo = document.getElementsByTagName("button")[1];

                                        novo_jogo.onclick = function(ev){


                                            if(valor.length != 0){
                                                var caminho = '';
                                                if(valor[3].indexOf("index.html") != -1){
                                                    caminho =  valor[3].split("index.html")[0] +"login.html?token="+valor[1]
                                                }
                                                else caminho = valor[3] +"?token="+valor[1];
                                                window.localStorage.setItem("chave-publica",valor[0]);
                                                window.localStorage.setItem("mod",valor[2]);
                                                window.location.assign(caminho);
                                            }
                                            else {
                                                window.location.reload();
                                            }

                                        }

                                        var carregar = document.getElementsByTagName("button")[2];
                                        carregar.onclick = function(ev){
                                            var caminho = window.location.href.toString() 
                                            +"continuar.html";
                                            window.location.assign(caminho);
                                        }
                                        var quem_somos = document.getElementsByTagName("button")[3];
                                        quem_somos.onclick = function(ev){
                                            var caminho =  window.location.href.toString() 
                                            +"quem_somos.html";
                                            window.location.assign(caminho);
                                        }

                                    }
                                    else if(window.location.pathname == "/login.html"  
                                            ||
                                            window.location.pathname == "/Regras_Operador/login.html"){
                                        try{
                                            var entrar = document.getElementsByTagName("button")[0];

                                            entrar.onclick = function(ev){
                                                var texto = document.querySelectorAll("input[name=usuário]")[0];
                                                var validar_radio = document.querySelectorAll("input[name=sexo]:checked");

                                                if(validar_radio.length != 0){
                                                    if(texto.value != ""){

                                                        valor = [window.localStorage.getItem("chave-publica"),
                                                                 window.localStorage.getItem("mod")];
                                                        var conversor = new StringToBinary();  
                                                        var binario_lantuide = conversor.convert(pontos[0].toString());
                                                        var binario_longitude = conversor.convert(pontos[1].toString());
                                                        var criptografia_lantitude = [];
                                                        var criptografia_longitude = [];
                                                        binario_lantuide.forEach((value,index,array)=>{
                                                            var decimal = parseInt(value,2)
                                                            //                               numero,  chave, mod
                                                            criptografia_lantitude.push(PowerMod(decimal,valor[0],valor[1]));
                                                        })
                                                        binario_longitude.forEach((value,index,array)=>{
                                                            var decimal = parseInt(value,2)
                                                            //                               numero,  chave, mod
                                                            criptografia_longitude.push(PowerMod(decimal,valor[0],valor[1]));
                                                        })
                                                        window.localStorage.setItem("letra_nome",texto.value);
                                                        window.localStorage.setItem("letra_sexo",validar_radio[0].value);
                                                        window.localStorage.setItem("lantitude",criptografia_lantitude);
                                                        window.localStorage.setItem("longitude", criptografia_lantitude);
                                                        var caminho = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/login.html" ?  window.location.protocol +"//"+  window.location.host.toString()+ "/Regras_Operador/jogo.html" : window.location.protocol +"//"+  window.location.host.toString() +"/jogo.html";
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
                                            entrar.click();
                                        }
                                        catch(ev){
                                            window.location.reload();
                                        }

                                    }
                                    else if(window.location.pathname == "/jogo.html" || window.location.pathname == "/Regras_Operador/jogo.html")
                                    {
                                        try{
                                            var jogador = document.querySelector("[name=jogador_texto]");


                                            var resposta = document.querySelector("[name=Resposta]");
                                            resposta.onclick = function(ev){

                                                if(jogador.value != undefined &&
                                                   jogador.value.indexOf(".") == -1 && jogador.value.indexOf(",") == -1 && Number.isInteger(Number.parseInt(jogador.value)))
                                                {
                                                    regras_gerais.jogador(jogador.value);
                                                }
                                                else {
                                                    Swal.fire({
                                                        icon:"warning",
                                                        title: 'Oops...',
                                                        text:"Só é permitido numeros."
                                                    })
                                                }
                                            }
                                            document.querySelector('[name=jogador_texto]').addEventListener('keyup', function(e){
                                              var key = e.which || e.keyCode;
                                              if (key == 13) { // codigo da tecla enter
                                                // colocas aqui a tua função a rodar
                                               if(jogador.value != undefined &&
                                                   jogador.value.indexOf(".") == -1 && jogador.value.indexOf(",") == -1&& Number.isInteger(Number.parseInt(jogador.value)))
                                                {
                                                    regras_gerais.jogador(jogador.value);
                                                }
                                                else {
                                                    Swal.fire({
                                                        icon:"warning",
                                                        title: 'Oops...',
                                                        text:"Só é permitido numeros."
                                                    })
                                                }
                                              }
                                            });
                                            var input_salvar = document.querySelector("[name=salvar]");
                                            input_salvar.onclick = function(ev)
                                            {
                                                salvando.local([document.getElementsByName("nome_jogador")[0].innerText]);
                                            }

                                            var Exceção = document.querySelector(".interrogação");
                                            Exceção.onclick = function(ev){
                                                var messagem = "<h2> Dica </h2> </br> 1º Na divisão considere somente a parte inteira." + "</br>"+ "2º Ordem das operações: * , / , + , - ." + "</br>" + "3º Para fechar só atualizar a tela.";
                                                alertify.success(messagem);
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
                                    else if(window.location.pathname == "/continuar.html"
                                            ||
                                            window.location.pathname == "/Regras_Operador/continuar.html")
                                    {

                                        var sair = document.querySelector("[name=sair]");
                                        sair.onclick = function(ev){
                                            var separar =  window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/continuar.html"  ? "/Regras_Operador/continuar.html"  : "/continuar.html";
                                            var anterior = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/continuar.html"  ? "/Regras_Operador/" : "/";
                                            var caminho = window.location.href.replace(separar,anterior);
                                            window.location.replace(caminho);
                                        }
                                        var selecionar = document.querySelector("[name=selecionar]");

                                        selecionar.onclick = function(ev){
                                            try{
                                                var radio = document.querySelector("input[name=item]:checked");
                                                if(radio.checked){
                                                    if(banco != "erro" )
                                                    {
                                                        var key = Number.parseInt(radio.value);
                                                        var ia = banco.objectStoreNames[0];
                                                        var usuario = banco.objectStoreNames[1];
                                                        var transactionusuario = banco.transaction(usuario,'readwrite');
                                                        var transactionia = banco.transaction(ia,'readwrite');
                                                        var getia = transactionia.objectStore(ia).get(key);
                                                        var getusuario = transactionusuario.objectStore(usuario).get(key);
                                                        getia.onsuccess = function(event){
                                                            var dadosia = event.target.result;
                                                            window.localStorage.setItem("positivo_ia",parseInt(dadosia.positivo));
                                                            window.localStorage.setItem("negativo_ai",parseInt(dadosia.negativo));
                                                        }
                                                        getusuario.onsuccess = function(event2){
                                                                var dados_usuario = event2.target.result;
                                                                var separar =  window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/continuar.html"  ? "/Regras_Operador/jogo.html"  : "/jogo.html";
                                                                var anterior = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/continuar.html"  ? "/Regras_Operador/" : "/";
                                                                var caminho =  window.location.origin.toString() +separar+"?token="+dados_usuario.chave;
                                                                window.localStorage.setItem("nome-usuário",dados_usuario.nome);
                                                                window.localStorage.setItem("chave-publica",dados_usuario.chave);
                                                                window.localStorage.setItem("positivo", parseInt(dados_usuario.positivo));
                                                                window.localStorage.setItem("negativo",parseInt(dados_usuario.negativo));
                                                                window.localStorage.setItem("sexo",dados_usuario.sexo);
                                                                window.location.replace(caminho);
                                                      }
                                                    }

                                                }
                                            }
                                            catch(ev){
                                                Swal.fire({
                                                    icon:"warning",
                                                    title: 'Oops...',
                                                    text:"não tem opções na tela."
                                                })
                                            }
                                        }
                                        var deletar = document.querySelector("[name=deletar]");
                                        deletar.onclick = function(ev){
                                            var radio = document.querySelector("input[name=item]:checked");
                                            try{
                                                if(radio.checked)
                                                {
                                                    var key = Number.parseInt(radio.value);
                                                    var usuario = banco.objectStoreNames[1];
                                                    var transactionusuario = banco.transaction(usuario,'readwrite');
                                                    var deletesuario = transactionusuario.objectStore(usuario).delete(key);
                                                    deletesuario.onsuccess = function(event){
                                                        var ia = banco.objectStoreNames[0];
                                                        var transactionia = banco.transaction(ia,'readwrite');
                                                        var deletesia = transactionia.objectStore(ia).delete(key);
                                                        deletesia.onsuccess = function(event){
                                                            window.location.reload();
                                                        }

                                                    }
                                                }
                                            }catch(ev){
                                                Swal.fire({
                                                    icon:"warning",
                                                    title: 'Oops...',
                                                    text:"não tem opções na tela."
                                                })
                                            }
                                        }
                                        var deletar_tudo = document.querySelector("[name=deletar_tudo]");
                                        deletar_tudo.onclick = function(ev){
                                            try{
                                                if(banco.name != undefined){
                                                    var deletar_banco = window.indexedDB.deleteDatabase(banco.name);
                                                    window.location.reload();

                                                }

                                            }
                                            catch(ev)
                                            {
                                                console.log(ev);
                                            }

                                        }
                                    }
                                    else if(window.location.pathname == "/quem_somos.html"
                                            ||
                                            window.location.pathname == "/Regras_Operador/quem_somos.html"){
                                        var sair = document.querySelector("[name=sair]");
                                        sair.onclick = function(ev){
                                            var separar =  window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/quem_somos.html"  ? "/Regras_Operador/quem_somos.html"  : "/quem_somos.html";
                                            var anterior = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/quem_somos.html"  ? "/Regras_Operador/" : "/";
                                            var caminho = window.location.href.replace(separar,anterior);
                                            window.location.replace(caminho);
                                        }
                                    }
                                }


                                $scope.resposta_artificial = "";
                                $scope.temporizador = "00:30";

                                if(window.location.pathname == "/jogo.html"
                                   ||
                                   window.location.pathname == "/Regras_Operador/jogo.html"){
                                    try{


                                        $scope.verificar_plataforma();


                                        var token =  window.location.href.split("token=");
                                        var verificar = window.localStorage.getItem("chave-publica");

                                        if(verificar != null)
                                        {
                                            var mod =  window.localStorage.getItem("mod");
                                            var letra_nomes = window.localStorage.getItem("letra_nome");
                                            var letra_sexo = window.localStorage.getItem("letra_sexo");
                                            if(letra_nomes != null && letra_sexo != null)
                                            {
                                                $scope.Vitoria_artificial = 0;
                                                $scope.Derrota_artificial = 0;
                                                var lantitude_array = window.localStorage.getItem("lantitude").split(",");
                                                var longitude_array = window.localStorage.getItem("longitude").split(",");
                                                modulo.descriptografar(letra_nomes,[letra_sexo,lantitude_array,longitude_array],token[1],mod);
                                                window.localStorage.removeItem("chave-publica");
                                                window.localStorage.removeItem("mod");
                                                window.localStorage.removeItem("letra_nome");
                                                window.localStorage.removeItem("letra_sexo");
                                                window.localStorage.removeItem("lantitude");
                                                window.localStorage.removeItem("longitude");
                                                theads.push(new Worker("./src/modulos.js"));

                                                theads[0].onmessage = function(ev) {
                                                    document.querySelector(".operação").textContent = ev.data.tipo[0]+ "= ?";
                                                    modulo.calculo_artificial(30000);   
                                                    modulo.temporizador();
                                                    theads[0].terminate();
                                                    theads[0] = undefined;
                                                    theads.pop();
                                                };
                                                theads[0].postMessage({tipo:"fácil"});
                                            }
                                            else
                                            {
                                                //usuário
                                                var dados_usuario = [window.localStorage.getItem("nome-usuário"),
                                                                     window.localStorage.getItem("chave-publica"),
                                                                     Number.parseInt(window.localStorage.getItem("positivo")),
                                                                     Number.parseInt( window.localStorage.getItem("negativo")),
                                                                     window.localStorage.getItem("sexo")]
                                                // ia
                                                var dadosia = [
                                                    Number.parseInt(window.localStorage.getItem("positivo_ia")),
                                                    Number.parseInt(window.localStorage.getItem("negativo_ai"))
                                                ];


                                                document.getElementsByName("nome_jogador")[0].innerText = dados_usuario[0];
                                                // usuário vitoria
                                                document.querySelectorAll("[name=valor_jogador]")[0].textContent = dados_usuario[2];
                                                // usuário derrota 
                                                document.querySelectorAll("[name=valor_jogador]")[1].textContent = dados_usuario[3];


                                                // ia derrota 
                                                $scope.Derrota_artificial = dadosia[1];

                                                // ia vitoria
                                                $scope.Vitoria_artificial  = dadosia[0];

                                                // gênero usuario
                                                switch(dados_usuario[4]){
                                                    case "feminino":
                                                        document.querySelector(".img_jogador").setAttribute("src","https://img.icons8.com/nolan/100/women-age-group-5--v2.png");
                                                        document.querySelector(".img_jogador").name = dados_usuario[4];
                                                        break;
                                                    case "masculino":
                                                        document.querySelector(".img_jogador").setAttribute("src","https://img.icons8.com/nolan/100/men-age-group-4--v2.png");
                                                        document.querySelector(".img_jogador").name = dados_usuario[4];
                                                        break;

                                                }
                                                var tipo;
                                                if(dados_usuario[2] - 1 > 3 || dadosia[0] - 1 > 3) tipo = "média";
                                                else if(dados_usuario[2] - 1 <= 3 || dadosia[0] - 1 <= 3) tipo = "fácil";
                                                modulo.temporizador();
                                                modulo.juiz(tipo);
                                                window.localStorage.removeItem("nome-usuário");
                                                window.localStorage.removeItem("chave-publica");
                                                window.localStorage.removeItem("positivo");
                                                window.localStorage.removeItem("negativo");
                                                window.localStorage.removeItem("sexo");
                                                window.localStorage.removeItem("positivo_ia");
                                                window.localStorage.removeItem("negativo_ai");
                                            }

                                        }
                                        else{

                                            var separar =  window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/jogo.html"  ? "/Regras_Operador/jogo.html"  : "/jogo.html";
                                            var anterior = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/jogo.html"  ? "/Regras_Operador/" : "/";
                                            var caminho;
                                            if(token[1] == undefined){
                                                caminho =   window.location.href.replace(separar,anterior);  
                                            }
                                            else {

                                                caminho = window.location.href.replace(separar+"?token="+token[1],anterior);
                                            }

                                            salvando.indexedDB(caminho);
                                        }
                                    }
                                    catch(erro){
                                        var separar =  window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/jogo.html"  ? "/Regras_Operador/jogo.html"  : "/jogo.html";
                                        var anterior = window.location.pathname != "/"  && window.location.pathname == "/Regras_Operador/jogo.html"  ? "/Regras_Operador/" : "/";
                                        var caminho;
                                        if(token[1] == undefined){
                                            caminho =   window.location.href.replace(separar,anterior);
                                        }
                                        else {
                                            caminho = window.location.href.replace(separar+"?token="+token[1],anterior);
                                        }

                                        window.location.replace(caminho);
                                    }
                                }
                                else if(window.location.pathname == "/continuar.html"
                                        ||
                                        window.location.pathname == "/Regras_Operador/continuar.html")
                                {
                                    try{
                                        salvando.banco.then(banco=>{


                                            var usuario = banco.objectStoreNames[1];
                                            var transaction = banco.transaction(usuario,'readwrite');
                                            var curso = transaction.objectStore(usuario).openCursor()

                                            curso.onsuccess = function(ev){

                                                var dados = ev.target.result;
                                                var nome,vitoria,derrota,data,tr;
                                                if(dados)
                                                {
                                                    var radio = document.createElement("input");
                                                    radio.type = "radio";
                                                    radio.name = "item";
                                                    radio.value = dados.key;
                                                    nome = document.createElement("td");
                                                    nome.textContent = "|"+dados.value.nome+"| ";
                                                    vitoria = document.createElement("td");
                                                    vitoria.textContent = dados.value.positivo+"| "
                                                    derrota = document.createElement("td");
                                                    derrota.textContent = dados.value.negativo+"| ";
                                                    data = document.createElement("td");
                                                    data.textContent = dados.value.data + "|";
                                                    tr = document.querySelector("tr");
                                                    tr.className = "coluna_nova";
                                                    tr.innerHTML = tr.innerHTML + "&nbsp;&nbsp;" + "<input type='" +radio.type +"' name='"
                                                        + radio.name + "'" + "value = '" +
                                                        radio.value + "'>" +
                                                        nome.innerHTML +vitoria.innerHTML + derrota.innerHTML +
                                                        data.innerHTML + "<br>";

                                                    dados.continue();                                                   

                                                }
                                            }
                                        })
                                    }catch(ev){
                                        console.error(ev);
                                    }
                                }
                            }]);
