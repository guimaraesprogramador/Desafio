
var calculos = {
 média(valoria, operação){
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
                    while(divisor1.length >2) divisor.shift();
                    divisor1 = valoria.split(operação[1]);
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
                  return calculo = calculo + calculo2;
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
        return calculo;
        return
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
