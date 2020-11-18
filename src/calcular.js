 var removervirgura = "";
class calculos{
    média(valoria, operação){
        if(operação.length == 2){
            var calculo = 0;
            var calculo2  = 0;
            var calculo3 = 0;
            var i = 0;
            var n = valoria.split(operação[0]);
            var m = valoria.split(operação[1]);
            if(n.length == 3 && m.length == 3){
                m = undefined
                calculo = n[0];
                calculo2 = n[1];
                calculo3 = n[2];
            }
            else {
                calculo = n[0];
                var divisor = n[1];
                m.shift();
                calculo3 = m[0];
                var o = divisor.split(operação[1]);
                calculo2 = o[0];

            }

            var total = 0;
            while(i < operação.length){
                if(i == 0){
                    if(operação[i] == "+"){
                        total = Number.parseInt(calculo) + Number.parseInt(calculo2);
                    }
                    else if(operação[i] == "-"){
                        total = Number.parseInt(calculo) - Number.parseInt(calculo2);
                    }
                    else if(operação[i] == "*"){
                        total = Number.parseInt(calculo) * Number.parseInt(calculo2);
                    }
                    else if(operação[i] == "/"){
                        total = (Number.parseInt(calculo) / Number.parseInt(calculo2)).toString();
                        removervirgura = total.indexOf(".");
                        if(removervirgura != -1){
                            removervirgura = calculo.replace(".",",");
                            total =  Number.parseFloat(removervirgura).toPrecision(1);
                        }
                    }
                }
                else{
                    if(operação[i] == "+"){
                        total = total + Number.parseInt(calculo3)
                    }
                    else if(operação[i] == "-"){
                        total = total - Number.parseInt(calculo3);
                    }
                    else if(operação[i] == "*"){
                        total = total * Number.parseInt(calculo3);
                    }
                    else if(operação[i] == "/"){
                        total = (total / Number.parseInt(calculo3)).toString();
                        removervirgura = total.indexOf(".");
                        if(removervirgura != -1){
                            removervirgura = calculo.replace(".",",");
                            total =  Number.parseFloat(removervirgura).toPrecision(1);
                        }
                    }
                }
                i++;
            }

            return total;
        }
        else this.fácil(valoria,operação);
    }
    fácil(valoria, operação){
        var calculo = 0;
        var  i = 0;
        var divisor = valoria.split(operação);
        while(i<divisor.length){
            if(i == 0)calculo = Number.parseInt( divisor[i]);
            else if(operação == "+"){

                calculo = Number.parseInt(calculo) + Number.parseInt( divisor[i])

            }
            else if(operação == "-"){
                calculo = Number.parseInt(calculo) - Number.parseInt( divisor[i]);

            }
            else if(operação == "*"){
                calculo = (Number.parseInt(calculo) * Number.parseInt( divisor[i]))

            }
            else if(operação == "/"){
                calculo = (Number.parseInt(calculo) / Number.parseInt( divisor[i])).toString();
                removervirgura = calculo.indexOf(".");
                if(removervirgura != -1){
                    removervirgura = calculo.replace(".",",");
                    calculo = Number.parseInt(removervirgura).toPrecision(1);

                }


            }
            i++;
        }
        return calculo;
    }
    difícil(valoria, operação){

    }
    Escolhar(tipo){

        if(tipo[0] == "fácil"){
            return    this.fácil(tipo[1], tipo[2]);
        }
        else if(tipo[0] == "difícil"){

        }
        else if(tipo[0] == "média"){
            return    this.média(tipo[1],tipo[2]);
        }
    }
}

const calc = new calculos(); 