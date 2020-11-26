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

}


const rsa_class  = new rsa();
self.addEventListener("message",function(ev){
    var tipo = ev.data.tipo;
    importScripts('modulos.js')
    var rsa = rsa_class;
    switch(tipo){
        case "começo":
            var array =  rsa.Regras();
            postMessage({criptografia:array,link:rsa.link});
            self.close();
            break;
        case "descriptografia":
            rsa.nome = ev.data.nome;
            rsa.sexo = ev.data.sexo;
            rsa.chave = ev.data.chave;
            rsa.mod = ev.data.mod;
            postMessage({nome:rsa.nome,sexo:rsa.sexo,chave:rsa.chave,
                         mod:rsa.mod});
            self.close();
            break;
        case "fácil":

            modulo.modulos_fácil();

            postMessage({tipo:[modulo.operação, modulo.operador]});
            self.close();
            break;
        case "média":
            modulo.modulos_média();

            postMessage({tipo:[modulo.operação,modulo.operador]});
            self.close();
            break;
    }
},false);