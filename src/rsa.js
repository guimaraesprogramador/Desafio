class rsa{
    constructor(){
       
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
                for(var i = 1;i<=b;i++){
                    if(this.Divisaoexata(b,i)){
                        x++;
                    }
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
       document.getElementsByName("nome_jogador")[0].value = nome;
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
        switch(this.operador){
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
        return this.link[1].toString() + this.operador.toString() +
        this.link[2].toString();
        
       }
     
         
    }
   artificial(){ 

        if(this.link == ""){
            this.fundo = document.createElement("audio");
            this.fundo.src = "./musicas/bensound-ukulele.mp3";
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
    this.nome;
    this.sexo;
    this.mod;
    this.chave;
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
    case "fácil":
    rsa.nome = ev.data.nome;
    rsa.sexo = ev.data.sexo;
    rsa.chave = ev.data.chave;
    rsa.mod = ev.data.mod;
    rsa.modulos_fácil();
    
    this.postMessage({tipo:rsa.operação,
        nome:rsa.nome,sexo:rsa.sexo,chave:rsa.chave,
        mod:rsa.mod});
    this.self.close();
        break;
}
})