
class calculos = {
 média(valoria, operação){
     if(operação.length == 2){
         var calculo = 0;
                    var i = 0;
                   var divisor1 = valoria.split(operação[0]);
                    while(i<2){
                        if(i == 0)calculo = Number.parseInt( divisor1[i]);
                        else if(operação == "+")calculo = Number.parseInt(calculo) + Number.parseInt( divisor1[i]);
                        else if(operação == "-")calculo = Number.parseInt(calculo) - Number.parseInt( divisor1[i]);
                        else if(operação == "*")calculo = (Number.parseInt(calculo) * Number.parseInt( divisor1[i]));
                        else if(operação == "/")calculo = (Number.parseInt(calculo) / Number.parseInt( divisor1[i]));
                        i++;
                    }
                    operação.shift();
                    divisor1 = valoria.split(operação[0]);
                    i  = 0;
                   var calculo2  = 0;
                   while(i<divisor1.length){
                        if(i == 0)calculo2 = Number.parseInt( divisor1[i])
                        else if(operação == "+")calculo2 = Number.parseInt(calculo2) + Number.parseInt( divisor1[i]);
                        else if(operação == "-")calculo2 = Number.parseInt(calculo2) - Number.parseInt( divisor1[i]);
                        else if(operação == "*")calculo2 = (Number.parseInt(calculo2) * Number.parseInt( divisor1[i]));
                        else if(operação == "/")calculo2 = (Number.parseInt(calculo2) / Number.parseInt( divisor1[i]));
                        i++;
                    }
                  var total = calculo + calculo2;
         if(total > 0 ){
             return total;
         }
         if(total < 0){
             return  "-" + total;
         }
                    
     }
     else this.fácil(valoria,operação);
     
    },
    fácil(valoria, operação){
        var calculo = 0;
        var  i = 0;
        var divisor = valoria.split(operação);
                   while(i<divisor.length){
                        if(i == 0)calculo = Number.parseInt( divisor[i]);
                        else if(operação == "+")calculo = Number.parseInt(calculo) + Number.parseInt( divisor[i]);
                        else if(operação == "-")calculo = Number.parseInt(calculo) - Number.parseInt( divisor[i]);
                        else if(operação == "*")calculo = (Number.parseInt(calculo) * Number.parseInt( divisor[i]));
                        else if(operação == "/")calculo = (Number.parseInt(calculo) / Number.parseInt( divisor[i]));
                        i++;
                    }
        if(calculo > 0 ){
             return calculo;
         }
         if(calculo < 0){
             return  "-" + calculo;
         }
    },
    difícil(valoria, operação){
        
    },
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