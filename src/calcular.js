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
            var total;
            if(operação[0] == "*")
            {
                total = parseInt(calculo) *  parseInt(calculo2);
            }
            if(operação[1] == "*")
            {
                if(total != undefined)
                {
                    var começo = valoria.lastIndexOf(operação[1]);
                    if(começo != -1){
                        total = parseInt(total) * parseInt(calculo3);
                    }
                }
                else {
                    total = parseInt(calculo2) * parseInt(calculo3)    
                }  
            }
            if(operação[0] == "/")
            {
                total = Math.trunc(parseFloat(calculo) / parseFloat(calculo2));
            }
            if(operação[1] == "/")
            {
                if(total != undefined)
                {
                    var começo = valoria.lastIndexOf(operação[1]);
                    if(começo != -1){
                        total = Math.trunc(parseFloat(total) / parseFloat(calculo3)) 
                    }
                }
                else {
                    total = Math.trunc(parseFloat(calculo2) / parseFloat(calculo3))     
                }    

            }
            if(operação[0] == "+")
            {
                total = parseInt(calculo) + parseInt(calculo2)  
            }
            if(operação[1] == "+")
            {
                if(total != undefined)
                {
                    total = parseInt(total) + parseInt(calculo3)
                }
                else 
                {
                    total = parseInt(calculo2) + parseInt(calculo3)
                }
            }
            if(operação[0] == "-")
            {
                if(total != undefined)
                {
                    var começo = valoria.indexOf(operação[0]);
                    if(começo != -1){
                        total = parseInt(calculo) - parseInt(total); 
                    }


                }
                else {
                    total = parseInt(calculo) - parseInt(calculo2)   
                }  
            }
            if(operação[1] == "-")
            {
                if(total != undefined)
                {
                    var começo = valoria.lastIndexOf(operação[1]);
                    if(começo != -1){
                        total = parseInt(total) - parseInt(calculo3);
                    }
                }
                else {
                    total = parseInt(calculo2) - parseInt(calculo3)  
                }
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