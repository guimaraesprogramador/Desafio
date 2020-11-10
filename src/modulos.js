
class modulos {
    constructor(){
        
    }
    Url(){
        this.num = 1;
        if(this.link[0] == "fácil"){
            this.n = 0; 
            this.m = 0;

            while(this.num >0){
                this.n = Math.floor(Math.random() *100);
                this.m = Math.floor(Math.random() *100);
                this.link.push(this.n.toString());
                this.link.push(this.m.toString());
                this.num = this.num - 1;
            }
    
            this.operador = Math.floor(Math.random() *4);
            this.divisores(this.operador);
            return this.link[1].toString() + this.operador.toString() +
                this.link[2].toString();
    
        }
        else if(this.link[0] == "média"){
            this.n = 0; 
            this.m = 0;
            this.p = 0;
            while(this.num >0){
                this.n = Math.floor(Math.random() *100);
                this.m = Math.floor(Math.random() *100);
                this.p = Math.floor(Math.random() *100);
                this.link.push(this.n.toString());
                this.link.push(this.m.toString());
                this.link.push(this.p.toString());
                this.num = this.num - 1;
            }
            this.divisores(Math.floor(Math.random() *4));
            var n1 = this.operador;
            this.divisores(Math.floor(Math.random() *4) )
            var n2 = this.operador;
            this.operador = [n1,n2];        
            return this.link[1].toString() + this.operador[0].toString() +
                this.link[2].toString() + this.operador[1].toString() + this.link[3].toString();
    
        }
    
    }
    artificial(musica){ 
   
        if(musica == undefined){
            if(document.querySelector(".som") != undefined)document.querySelector(".som").remove();
            this.fundo = document.createElement("audio");
            this.fundo.src = "./musicas/bensound-ukulele.mp3";
            this.fundo.loop = true;
            this.fundo.className ="fundo";
            this.fundo.play();
            document.body.append(this.fundo);
            return "permitida";
        }
        else{
            var efeito = document.createElement("audio");
            switch(musica){
                case "vencedor":
                    efeito.src = "./musicas/bensound-epic.mp3";
                    efeito.play();
                    break;
                case "derrotar":
                    efeito.src = "./musicas/bensound-funnysong.mp3";
                    efeito.play();
                    break;
            }
            efeito.className = "som";
            document.body.append(efeito);
            var tempo = window.setTimeout(function(){
                document.querySelector(".som").remove();
                document.querySelector("[name=artificial_texto]").textContent = "";
                document.querySelector("[name=jogador_texto]").value = "";
                document.querySelector(".img_resultado0").src = "";
                document.querySelector(".img_resultado1").src = "";
               modulo.artificial(undefined);
            },5000);
            console.log(tempo);
        }
    }
    temporizador(){
        var segundo = 59;
        var minutos = 4;
    
        var contagem =  window.setInterval(function(){
            if(segundo > 0){
                
                if(segundo < 10){
                    document.querySelector(".temporizador").textContent = "0"+minutos+ ":"+"0"+segundo;
                }
                else if(document.querySelector("[name=artificial_texto]").textContent != ""
                        ||
                        document.querySelector("[name=jogador_texto]").value != ""){
                    segundo = 60;
                    minutos = 4;
                    document.querySelector(".temporizador").textContent = "05:00";
                }
                else {
    
                    document.querySelector(".temporizador").textContent = "0"+minutos+ ":"+segundo;
                }
                
            }
            else if(minutos > 0){
                segundo = 59;
                minutos = minutos - 1;
                document.querySelector(".temporizador").textContent  = "0"+minutos+ ":"+segundo;
            }
            else if(minutos == 0 && segundo == 0)clearInterval(contagem);
            segundo = segundo - 1;
    
        },1000);
    }
    calculo_artificial(operador, operação, tempo_temporizador){
        this.tempo_artificial = window.setInterval(function(){
            clearInterval(this.tempo_artificial);
            var theads = [];
            var tipo;
            var pontos_atual =  Number.parseInt(document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent);
    
            if(pontos_atual - 1 > 3){
                tipo = "média"; 
                this.link = tipo;
                theads.push(new Worker("./src/rsa.js"));
                theads[0].postMessage({tipo:this.link});
                console.log(theads);
                theads[0].onmessage = function(ev){
                    document.querySelector("[name=Resposta]").disabled = false;
                    document.querySelector(".operação").textContent = ev.data.tipo[0] + "= ?";
                    modulo.calculo_artificial(ev.data.tipo[0],ev.data.tipo[1],40000);   
                    theads[0].terminate();
                    theads[0] = undefined;
                };
                
            }
            else if(pontos_atual - 1 <= 3) {
                tipo  = "fácil";
                this.link = tipo;
    
                theads.push(new Worker("./src/rsa.js"));
                theads[0].postMessage({tipo:this.link});
                console.log(theads);
    
                theads[0].onmessage = function(ev){
                    document.querySelector("[name=Resposta]").disabled = false;
                    document.querySelector(".operação").textContent = ev.data.tipo[0] + "= ?";
                    modulo.calculo_artificial(ev.data.tipo[0],ev.data.tipo[1],30000);   
                    theads[0].terminate();
                    theads[0] = undefined;
                };
                
    
            }
    
            regras_gerais.so(tipo);
    
    
        },tempo_temporizador);
    
    }
    modulos_média(){
        this.link = [];
        this.link.push("média");
        this.operação = this.Url();
        while(this.link.length > 0) this.link.pop();
    
    }
    modulos_díficil(){
    
    }
    divisores(tipo){
        switch(tipo){
            case 0:
                this.operador = "+";
                break;
            case 1:
                this.operador = "-";
                break;
            case 2:
                this.operador = "*";
                break;
            case 3:
                this.operador = "/";
                break;
        }
    }
    modulos_fácil(){
    
        this.link = [];
        this.link.push("fácil");
        this.operação = this.Url();
        while(this.link.length > 0) this.link.pop();
    }
    descriptografar(nome,sexo,chave,mod){
        var  descriptografia_sexo = [];        
        sexo.forEach((value,index,key)=>{
            descriptografia_sexo.push(PowerMod(value,chave,mod));
        })
        var i = 0;
        var sexo = "";
        while(i < descriptografia_sexo.length){
            sexo = sexo + String.fromCharCode(descriptografia_sexo[i]).toString(10); 
            i++;
        }
        switch(sexo){
            case "feminino":
                document.querySelector(".img_jogador").setAttribute("src","https://img.icons8.com/nolan/100/women-age-group-5--v2.png");
                break;
            case "masculino":
                document.querySelector(".img_jogador").setAttribute("src","https://img.icons8.com/nolan/100/men-age-group-4--v2.png");
    
                break;
        }
        document.getElementsByName("nome_jogador")[0].innerText = nome;
    }    
}
const modulo = new modulos();

self.addEventListener("message",function(ev){
    var tipo = ev.data.tipo;
   
    switch(tipo){
        case "fácil":

            modulo.modulos_fácil();

            this.postMessage({tipo:[modulo.operação, modulo.operador]});
            self.close();
            break;
        case "média":
            modulo.modulos_média();

            this.postMessage({tipo:[modulo.operação,modulo.operador]});
            self.close();
            break;
    }
},false);