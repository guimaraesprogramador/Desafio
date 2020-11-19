class salvar{
    constructor(){
        this.indexs = [];
    }
    get index(){
        return indexs;
    }
    set index(tipo){
        tipo = this.indexs;
    }
    update(index){
        
    }
    inserir(index){
        this.this.random = window.localStorage.getItem("token");
        var token = window.location.href.split("token=");
        if(this.random == ""){
            this.this.random = 0;
        }
        else {
            this.this.random = this.random + 1; 
        }
        window.localStorage.setItem("token"+this.this.random,token[1]);
            switch(index){
                case "letra_nome":
                    window.localStorage.setItem("letra_nome"+this.random,index);
                    break;
                case "letra_sexo":
                    window.localStorage.setItem("letra_sexo"+this.random,index);
                    break;
                case "mod":
                    window.localStorage.setItem("mod"+this.random,index);
                break;
                case "chave-publica":
                    window.localStorage.setItem("chave-publica"+this.random,index);
                    break;
            }
        window.localStorage.removeItem("chave-publica");
        window.localStorage.removeItem("mod");
        window.localStorage.removeItem("letra_nome");
        window.localStorage.removeItem("letra_sexo");
        
        

    }
}