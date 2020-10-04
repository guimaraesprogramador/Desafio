class rsa{
    constructor(){
        this.nome;
        this.sexo;
        this.mod;
        this.chave;
    }
    link = "";
    get link(){
        return this.link;
    }
    set link(tipo){
        this.link = tipo;
    }
    fatorial_primo = function(z){
        var r = 1;
        var e = 0;
                while(r<=z){
                    e = r * z;
                    if(e % z ==1){
                        break;
                    }
                    else e = 0;
                    r++;
                }
        
        return r;
    }
    primo = function(){
        var c = 0;
        var x = 0;
        var b = 0;
        // 0 até 100
        c = Math.floor(Math.random() *101);
        b = this.fatorial_primo(c);
        var i = 1;
        while(i<=b){
            if(this.Divisaoexata(b,i)){
                x++;
            }
            i++;
        }
        if(x ==2){
            return b;
        }
        else return 0;
    }
    Euler(){
    

    var anterior = this.primo(); 
      var atual = this.primo();
      var resto = anterior % atual;
        while(resto!= 0 && resto.toString() != NaN.toString() &&resto != Infinity){
            anterior = atual;
            atual = resto;
            resto = anterior % atual;
        }
        return atual;
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
    //    else if()
     
         
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
   artificial(){ 
    
        
        if(this.link == ""){
            this.fundo = document.createElement("audio");
            this.fundo.src = "./musicas/bensound-ukulele.mp3";
            this.fundo.loop = true;
            this.fundo.play();
            return "permitida";
        }
        else if(this.link != ""){
            this.fundo.pause();
            var efeito = document.createElement("audio");
            switch(this.link){
                case "vencedor":
                    efeito.src = "./musicas/bensound-epic.mp3";
                    efeito.play();
                    break;
                case "derrotar":
                    efeito.src = "./musicas/bensound-funnysong.mp3";
                    efeito.play();
                break;
            }
            var tempo = window.setInterval(function(){
                efeito.remove();
                modulos().fundo.play();
                clearInterval(tempo);
            },2000);

        }
    }
    temporizador(){
        var segundo = 60;
        var minutos = 4;
     var contagem =  window.setInterval(function(){
          if(segundo > 0){
              segundo = segundo - 1;
              if(segundo <10){
                document.querySelector(".temporizador").textContent = "0"+minutos+ ":"+"0"+segundo;
              }
              else if(document.querySelector("[name=artificial_texto]").textContent != ""
              ||
              document.querySelector("[name=jogador_texto]").textContent != ""){
                segundo = 60;
                minutos = 4;
                document.querySelector("[name=artificial_texto]").textContent, 
                document.querySelector("[name=artificial_texto]").textContent,
                document.querySelector(".img_resultado0").src,
                document.querySelector(".img_resultado1").src = "";
                clearInterval(contagem);
              }
              else {
                document.querySelector(".temporizador").textContent = "0"+minutos+ ":"+segundo;
              }
              
          }
          else if(minutos > 0 ){
              segundo = 59;
              minutos = minutos - 1;
              document.querySelector(".temporizador").textContent  = "0"+minutos+ ":"+segundo;
          }
          else if(minutos == 0 && segundo == 0)clearInterval(contagem);
          

      },1000);
    }
    calculo_artificial(operador, operação, tempo_temporizador){
        var tempo_artificial = window.setInterval(function(){
            var valoria  = operador;
            var i = 0;
            var calculo = 0;
            
            var divisor = valoria.split(operação);
            while(i<divisor.length){
                if(i == 0)calculo = Number.parseInt( divisor[i]);
                else if(operação == "+")calculo = Number.parseInt(calculo) + Number.parseInt( divisor[i]);
                else if(operação == "-")calculo = Number.parseInt(calculo) - Number.parseInt( divisor[i]);
                else if(operação == "*")calculo = (Number.parseInt(calculo) * Number.parseInt( divisor[i]));
                else if(operação == "/")calculo = (Number.parseInt(calculo) / Number.parseInt( divisor[i]));
                i++;
            }
            if(calculo != 0)
            {
                document.querySelector("[name=artificial_texto]").textContent = calculo;
                document.querySelector("[name=Resposta_artificial]").disabled = true;
                document.querySelector(".img_resultado0").src = "./imagens/check-green-24dp.svg";
                document.querySelector(".img_resultado1").src ="./imagens/cancel-red-48dp.svg";
                var pontos_atual =  Number.parseInt(document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent);
                pontos_atual = pontos_atual + 1;
                document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent = pontos_atual;
                document.querySelector(".temporizador").textContent  = "05:00";
                modulos().link = "derrotar";
                modulos().artificial();
               if(pontos_atual >3){
                modulos().link = "medio"; 
               }
               else {
                   modulos().link  = "fácil";
               }
               document.querySelector("[name=Resposta_artificial]").onclick = function(ev){

                    var I_a = document.querySelector("[name=Resposta_artificial]");
                    I_a.disabled = false;
                    var theads = [];
                    switch(modulos().link){
                        case "fácil":
                            theads.push(new Worker("./src/rsa.js"));
                            theads[0].postMessage({tipo:modulos().link});
                            theads[0].onmessage = function(ev){
                                
                                    document.querySelector(".operação").textContent = ev.data.tipo[0] + "= ?";
                                    modulos().calculo_artificial(ev.data.tipo[0],ev.data.tipo[1],40000);   
                                    theads.pop();
                            }; 
                            modulos().temporizador();
                    
                            break;
           } 
               }    
               document.querySelector("[name=Resposta_artificial]").click();
                clearInterval(tempo_artificial);
            }
            
        },tempo_temporizador)
       
    }
    Regras(){
       var valores = [];
       var valor = false;
       var d,e = 0;
       var n;
       var z;
       this.p = 0;
       this.q = 0;
       while(this.p == 0|| this.q== 0){
        this.p = this.primo();
        this.q = this.primo();
       }
       
       n = this.p * this.q;
       z = (this.p-1)*(this.q-1);
       while(valor==false || d==e){
            // chave privada
            d = this.primo();
            // chave publica 
            e = this.Euler();
            valor = (d * e)%z;
            if(valor == 1)valor = true;
            else valor = false;
   
       }  
        
    
        valores.push({chave_publica:e,chave_privada:d, mod:n});
        return valores;
        
    }
    Divisaoexata(num,i){
        return (num % i) ==0;
    }
    modulos_média(){

    }
    modulos_díficil(){

    }
    modulos_fácil(){
    
    this.link = [];
    this.link.push("fácil");
    this.operação = this.Url();
    this.link.pop();
    this.link.pop();
    this.link.pop();
    
    }
}
function modulos(){
const r = new rsa();
return r;
}

self.addEventListener("message",function(ev){
var tipo = ev.data.tipo;
var rsa = modulos();
switch(tipo){
    case "começo":
   var array =  rsa.Regras();
    this.postMessage({criptografia:array,link:rsa.link});
    this.self.close();
    break;
    case "descriptografia":
    rsa.nome = ev.data.nome;
    rsa.sexo = ev.data.sexo;
    rsa.chave = ev.data.chave;
    rsa.mod = ev.data.mod;
    this.postMessage({nome:rsa.nome,sexo:rsa.sexo,chave:rsa.chave,
        mod:rsa.mod});
        this.self.close();
        break;
    case "fácil":
    
    rsa.modulos_fácil();
    
    this.postMessage({tipo:[rsa.operação, rsa.operador]});
    this.self.close();
        break;
}
})