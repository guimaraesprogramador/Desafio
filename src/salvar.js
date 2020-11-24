class salvar{
    constructor(){
        this._index = [];
    }
    get index(){
        return this._index;
    }
    set index(tipo){
        tipo = this._indexs;
    }
    update(index){
        
    }
    inserir(index){
        this.random = window.localStorage.getItem("token");
        var token = window.location.href.split("token=");
        var pontos_joagador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[0].textContent);
        var Derrota_jogador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[1].textContent);
        if(this.random == token[1]){
            this.random = this.random + 1; 
        }
        
        if (window.XMLHttpRequest != undefined)
        {
            var xml = new XMLHttpRequest();
            xml.open("GET","https://worldtimeapi.org/api/timezone/America/Sao_Paulo", false);

            xml.send(null);
            console.clear();
            var mes = "";
            var horario = "";
            if(xml.status == 200){
                var data =  JSON.parse(xml.responseText);
                var date = new Date(data.datetime);
              
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
            else
            {
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
        //     this.index = [index[0],index[1],
        //             pontos_joagador,
        //         Derrota_jogador,
        //         horario
        // ]
        //     console.log(this.index);
          // window.localStorage.setItem("token",this.index);
        }
    }
}
const salvando = new salvar();