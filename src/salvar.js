class salvar{
    constructor(){
        this._index = [];
        window.indexedDB.open('dbdesafio',1);
        const db  = window.indexedDB.open('dbdesafio',2);
        db.onupgradeneeded = function(e){
            var minhaconnect = e.target.result;
            minhaconnect.createObjectStore('usuario',{autoIncrement:true});
            minhaconnect.createObjectStore('IA',{autoIncrement:true})
        }


    }
    get banco(){
        return new Promise((res,respo)=>{
            var  db  = window.indexedDB.open('dbdesafio',2);
            db.onsuccess = function(ev){
                res(ev.target.result);
            }
        })
    }
    get index(){
        return this._index;
    }
    set index(tipo){
        tipo = this._index;
    }
    indexedDB(caminho){
        try{
            var alasql_jogador =  window.localStorage.getItem("usuário");
            var alasql_ia =  window.localStorage.getItem("IA");
            if(alasql_jogador != null && alasql_ia != null ){
                var ultimodado_jogador = alasql_jogador.split(",");
                var ultimodado_IA = alasql_ia.split(",");
                salvando.banco.then(banco=>{
                    // criar e E INSERIR table usuário
                    var object_usuário =  banco.objectStoreNames[1];
                    var transaction = banco.transaction(object_usuário,'readwrite');

                    var usuario = [{
                        nome:ultimodado_jogador[0],
                        chave: ultimodado_jogador[1],
                        sexo:ultimodado_jogador[2],
                        positivo: Number.parseInt(ultimodado_jogador[3]),
                        negativo:Number.parseInt(ultimodado_jogador[4]),
                        data: ultimodado_jogador[5]
                    }];
                    transaction.objectStore(object_usuário).add(usuario[0]);
                    // criar e E INSERIR table IA 
                    var objectia = banco.objectStoreNames[0];
                    var transactionia = banco.transaction(objectia,'readwrite');
                    var ia = [{
                        nome:ultimodado_IA[0],
                        positivo:Number.parseInt(ultimodado_IA[1]),
                        negativo:Number.parseInt(ultimodado_IA[2])
                    }]
                    transactionia.objectStore(objectia).add(ia[0]);

                    window.localStorage.removeItem("usuário");
                    window.localStorage.removeItem("IA");
                    banco.close();
                    window.location.replace(caminho);

                })

            }
            else window.location.replace(caminho);
        }
        catch(ev){
            console.log(ev);
            // salvando.banco.deleteObjectStore('usuário');
            // salvando.banco.deleteObjectStore("IA")
        }
    }
    local(index){

        var token = window.location.href.split("token=");
        var Derrotar_ia = Number.parseInt(document.querySelectorAll("[name=Derrota_artificial]")[1].textContent);
        var pontos_atual_artifical =  Number.parseInt(document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent);
        var pontos_jogador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[0].textContent);
        var Derrota_jogador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[1].textContent);

        var mes = "";
        var horario = "";
        try{
            if (window.XMLHttpRequest != undefined)
            {
                var xml = new XMLHttpRequest();
                xml.open("GET","http://worldclockapi.com/api/json/est/now", false);

                xml.send(null);
                console.clear();

                var data =  JSON.parse(xml.responseText);
                var date = new Date(data.currentDateTime);

                switch(date.getMonth()){
                    case 0:
                        mes = "janeiro";
                        break;
                    case 1:
                        mes = "feveiro";

                        break;
                    case 2:
                        mes = "março";
                        break;
                    case 3:
                        mes = "abril";
                        break;
                    case 4:
                        mes = "maio";
                        break;
                    case 5:
                        mes = "junho";
                        break;
                    case 6:
                        mes = "julho";
                        break;
                    case 7:
                        mes = "agosto";
                        break;
                    case 8:
                        mes = "setembro";
                        break;
                    case 9:
                        mes = "outubro";
                        break;
                    case 10:
                        mes ="novembro";
                        break;
                    case 11:
                        mes = "dezembro";
                        break;
                }
                horario = date.getDate() + " de " +mes + " de " + date.getFullYear() + " as " 
                    + date.getHours() + " : " + date.getMinutes();
            }
        }
        catch(ev){

            console.clear();
            var date = new Date();

            switch(date.getMonth()){
                case 0:
                    mes = "janeiro";
                    break;
                case 1:
                    mes = "feveiro";

                    break;
                case 2:
                    mes = "março";
                    break;
                case 3:
                    mes = "abril";
                    break;
                case 4:
                    mes = "maio";
                    break;
                case 5:
                    mes = "junho";
                    break;
                case 6:
                    mes = "julho";
                    break;
                case 7:
                    mes = "agosto";
                    break;
                case 8:
                    mes = "setembro";
                    break;
                case 9:
                    mes = "outubro";
                    break;
                case 10:
                    mes ="novembro";
                    break;
                case 11:
                    mes = "dezembro";
                    break;
            }
            horario = date.getDate() + " de " +mes + " de " + date.getFullYear() + " as " 
                + date.getHours() + " : " + date.getMinutes();

        }
        finally{
            this.index.push([index[0],token[1],document.querySelector(".img_jogador").name,
                             pontos_jogador,
                             Derrota_jogador,
                             horario
                            ]);
            var i_a = [
                "IA",
                pontos_atual_artifical,
                Derrotar_ia 
            ];
            window.localStorage.setItem("usuário",this.index);
            window.localStorage.setItem("IA",i_a); 
            this.index.pop();
            while(i_a.length > 0){
                i_a.pop();
            }
            alertify.success('Salvado...');

        }
    }
}
const salvando = new salvar();
