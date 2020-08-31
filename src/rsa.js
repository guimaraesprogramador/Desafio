class rsa{
    constructor(){
        this.resposta_link;    
    }
    link;
    get link(){
        return this.resposta_link;
    }
    set link(tipo){
        this.resposta_link = tipo;
    }
    mmc(){
        return 0;
    }
    Url(){
        
        return null;
    }
    artificial(){
        navigator.mediaDevices.getUserMedia({audio:true}).then(r=>{
            var m = new SpeechSynthesisUtterance("oi");
            m.lang = "pt-br";
            var ia = window.speechSynthesis.speak(m);
        })
    }
    Regras(){
        return [];
    }
    modulos_média(){

    }
    modulos_díficil(){

    }
    modulos_fácil(){

    }
}
function modulos(){

}
self.addEventListener("message",function(ev){

})