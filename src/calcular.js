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
            while(i <operação.length){
                // multiplicação
                if(operação[i] == "*"){
                    if(i == 0){
                        total = (Number.parseInt(calculo) * Number.parseInt(calculo2));
                    }
                    else {
                        total = (Number.parseInt(total) * Number.parseInt(calculo3));
                    }

                }
                // divisão
                else if(operação[i] == "/"){
                    if(i == 0){
                        total = (Number.parseFloat(calculo) / Number.parseFloat(calculo2));
                        total =  Math.trunc(total);
                    }
                    else {
                        total = (Number.parseFloat(calculo2) / Number.parseFloat(calculo3));
                        total =  Math.trunc(total);
                    }
                }
                // soma
                else if(operação[i] == "+"){
                    if(operação[1] == "*"){
                            total = (Number.parseInt(calculo2) * Number.parseInt(calculo3)) 
                    }
                    else if(operação[1] == "/"){
                        total = (Number.parseFloat(calculo2) / Number.parseFloat(calculo3));
                        total =  Math.trunc(total);
                    }
                    else if(operação[1] == "-"){
                            total = (Number.parseInt(calculo2) - Number.parseInt(calculo3));
                    }
                    else {
                        if(i == 0){
                            total = (Number.parseInt(calculo) + Number.parseInt(calculo2));
                        }
                        else {
                            total = (Number.parseInt(total) + Number.parseInt(calculo3));
                        }
                    }

                }
                // subtração
                else if(operação[i] == "-"){
                    if(operação[1] == "*"){
                            total = (Number.parseInt(calculo2) * Number.parseInt(calculo2))                         
                    }
                    else if(operação[1]=="/"){
                            total = (Number.parseFloat(calculo2) / Number.parseFloat(calculo3));
                            total =  Math.trunc(total);
                    }
                    else if(operação[1] == "+"){
                            total =  (Number.parseInt(calculo2) + Number.parseInt(calculo3));
                    }
                    else {
                        if(i == 0){
                            total =  (Number.parseInt(calculo) - Number.parseInt(calculo2));
                        }
                        else {
                            total =  ( Number.parseInt(total) - Number.parseInt(calculo3) )
                        }
                    }
                }
                i++;
            }
            // true and true se não for número
            if(!(Number.isInteger(Number.parseInt(operação[0])))
               && !(Number.isInteger(Number.parseInt(operação[1]))
                    && total != "Infinity")
              ){
                return total;
            }
            else {
                return "erro";
            }

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

                calculo = (Number.parseInt(calculo) + Number.parseInt( divisor[i]));

            }
            else if(operação == "-"){
                calculo = (Number.parseInt(calculo) - Number.parseInt( divisor[i]));

            }
            else if(operação == "*"){
                calculo = (Number.parseInt(calculo) * Number.parseInt( divisor[i]))

            }
            else if(operação == "/"){
                calculo = (Number.parseFloat(calculo) / Number.parseFloat( divisor[i])).toString();
                removervirgura = calculo.indexOf(".");
                if(removervirgura != -1){
                    calculo = Math.trunc(calculo);
                }


            }
            i++;
        }
        if(!(Number.isInteger(Number.parseInt(operação)))
           && calculo != "Infinity")
        {
            return calculo;
        }
        else {
            return "erro";
        }

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