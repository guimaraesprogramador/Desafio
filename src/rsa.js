class rsa {
    constructor(){
        this.nome;
        this.sexo;
        this.mod;
        this.chave;
        this._link;
    }
    get link(){
        return this._link;
    }
    set link(tipo){
        this._link = tipo;
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
artificial(musica){ 


    if(musica == undefined){
        this.fundo = document.createElement("audio");
        this.fundo.src = "./musicas/bensound-ukulele.mp3";
        this.fundo.loop = true;
        this.fundo.className ="fundo";
        this.fundo.play();
        document.body.append(this.fundo);
        return "permitida";
    }
    else{
        document.querySelector(".fundo").remove();
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
        var tempo = window.setInterval(function(){
            document.querySelector(".som").remove();
            clearInterval(tempo);
            document.querySelector("[name=artificial_texto]").textContent = "";
            document.querySelector("[name=jogador_texto]").textContent = "";
            document.querySelector(".img_resultado0").src = "";
            document.querySelector(".img_resultado1").src = "";
            modulos().artificial(undefined);

        },5000);

    }
}
temporizador(){
    var segundo = 59;
    var minutos = 4;

    var contagem =  window.setInterval(function(){
        if(segundo > 0){

            if(segundo <10){
                document.querySelector(".temporizador").textContent = "0"+minutos+ ":"+"0"+segundo;
            }
            else if(document.querySelector("[name=artificial_texto]").textContent != ""
                    ||
                    document.querySelector("[name=jogador_texto]").textContent != ""){
                segundo = 60;
                minutos = 4;



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
        segundo = segundo - 1;

    },1000);
}
calculo_artificial(operador, operação, tempo_temporizador){
    var tempo_artificial = window.setInterval(function(){
        var valoria  = operador;
        var calculo = 0;
        var theads = [];
        var tipo;
        var pontos_atual =  Number.parseInt(document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent);
        pontos_atual = pontos_atual + 1;
        document.querySelector(".temporizador").textContent  = "05:00";
        this.link = "derrotar";
        modulos().artificial(this.link);
        document.querySelector("[name=Resposta_artificial]").onclick = function(ev){
            calculo = calc.Escolhar([tipo,valoria,operação]);
            document.querySelector("[name=artificial_texto]").textContent = calculo;
            document.querySelector(".img_resultado0").src = "./imagens/check-green-24dp.svg";
            document.querySelector(".img_resultado1").src ="./imagens/cancel-red-48dp.svg";
        }
        document.querySelector("[name=Resposta_artificial]").onmouseenter = function(){
            document.querySelector("[name=Resposta_artificial]").onclick = null;
        }
        if(pontos_atual- 1 > 3){
            tipo = "média"; 
            this.link = tipo;
            while(theads.length >0) theads.pop();
            theads.push(new Worker("./src/rsa.js"));
            theads[0].postMessage({tipo:this.link});
            theads[0].onmessage = function(ev){
                document.querySelector(".operação").textContent = ev.data.tipo[0] + "= ?";
                modulos().calculo_artificial(ev.data.tipo[0],ev.data.tipo[1],40000);   
                modulos().temporizador();
            };

        }
        else if(pontos_atual - 1 <= 3) {
            tipo  = "fácil";
            this.link = tipo;
            theads.push(new Worker("./src/rsa.js"));
            theads[0].postMessage({tipo:this.link});
            theads[0].onmessage = function(ev){
                document.querySelector(".operação").textContent = ev.data.tipo[0] + "= ?";
                modulos().calculo_artificial(ev.data.tipo[0],ev.data.tipo[1],30000);   
                modulos().temporizador();
            };

        }

        document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent = pontos_atual;

        document.querySelector("[name=Resposta_artificial]").click();


        clearInterval(tempo_artificial);
        theads.pop();

    },tempo_temporizador);

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
    this.link = [];
    this.link.push("média");
    this.operação = this.Url();
    while(this.link.length > 0) this.link.pop();

}
modulos_díficil(){

}
modulos_fácil(){

    this.link = [];
    this.link.push("fácil");
    this.operação = this.Url();
    while(this.link.length > 0) this.link.pop();
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
        case "média":
            rsa.modulos_média();

            this.postMessage({tipo:[rsa.operação,rsa.operador]});
            this.self.close();

            break;
    }
})
