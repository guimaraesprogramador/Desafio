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
    Url(){
       
       // 0 até 100;
         
    }
    artificial(){
        return new Promise(function(response,rejec){
            navigator.mediaDevices.getUserMedia({audio:true}).then(r=>{
                response("permitido")
             })
        })
       
        
        
    }
    Regras(){
       var valores = [];
       var valor = false;
       var d,e = 0;
       var n;
       var z;
       do{  
        this.p = Math.floor(Math.random() *100);
        this.q = Math.floor(Math.random() *100);    
        n = this.p * this.q;
        z = (this.p-1)*(this.q-1);
       // chave privada
       d = this.primo();
       // chave publica 
       e = this.Euler();
       valor = (d * e)%z;
       if(valor == 1)valor = true;
       else valor = false;
       
        }while( valor==false|| d==e);
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

    }
}
function modulos(){
const r = new rsa();
return r;
}

self.addEventListener("message",function(ev){
var tipo = ev.data;
var rsa = modulos();
switch(tipo){
    case "começo":
   var array =  rsa.Regras();
    this.postMessage({criptografia:array,link:rsa.link});
    this.self.close();
    break;
}
})