class regras{
    jogador(usuario){

        var operação = document.querySelector(".operação").textContent;
        var separador = operação.split("");
        separador.pop();
        separador.pop();
        separador.pop();
        var resposta = document.querySelector("[name=Resposta]");
        var tipo;
        var i = 0;
        var operador = [];
        var pontos_joagador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[0].textContent);
        var calculo = 0;
        var Derrotar_ia = Number.parseInt(document.querySelectorAll("[name=Derrota_artificial]")[1].textContent)
        if(pontos_joagador - 1 >3){
            tipo = "média"; 
        }
        else if(pontos_joagador - 1 <= 3){
            tipo ="fácil";
        }
        if(tipo == "média"){
            operação = "";
            while(i<separador.length){
                if(!Number.isInteger(parseInt(separador[i])) && separador[i] != " "){
                    operador.push(separador[i]);
                }
                operação = operação + separador[i];
                i++;
            }
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);
            operador.pop(); 
            operador.pop();
        }
        else if(tipo == "fácil"){
            operação = "";
            while(i<separador.length){
                if(!Number.isInteger(parseInt(separador[i]))&& separador[i] != " "){
                    operador.push(separador[i]);
                }
                operação = operação + separador[i];
                i++;
            }
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);  
            operador.pop();
        }
        else 
        {
            // DIFICIL
        }
        if(calculo.toString() == usuario && calculo != NaN && calculo != "erro"){
            pontos_joagador++;
            document.querySelector(".img_resultado1").src = "./imagens/check-green-24dp.svg";
            document.querySelector(".img_resultado0").src ="./imagens/cancel-red-48dp.svg";
            document.querySelectorAll("[name=valor_jogador]")[0].textContent = pontos_joagador;
            Derrotar_ia--;
            document.querySelectorAll("[name=Derrota_artificial]")[1].textContent = Derrotar_ia;
            resposta.disabled = true;
            document.querySelector("[name=Resposta]").disabled = true;
             document.querySelector('[name=jogador_texto]').disabled = true;
            document.querySelector("[name=Resposta_artificial]").disabled = true;
            
            
        }

    }
    so(pontos_atual){
        document.querySelector("[name=Resposta_artificial]").disabled = true;
        var pontos_atual =  Number.parseInt(document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent);

        var operação = document.querySelector(".operação").textContent;
        var separador = operação.split("");
        separador.pop();
        separador.pop();
        separador.pop();
        var i = 0;
        var tipo;
        var operador = [];
        var calculo = 0;
        var Derrota_jogador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[1].textContent);

        if(pontos_atual - 1 > 3){
            tipo = "média"
            operação = "";
            while(i<separador.length){
                if(!Number.isInteger(parseInt(separador[i])) && separador[i] != " " ){
                    operador.push(separador[i]);
                }
                operação = operação + separador[i];
                i++;
            }
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);
            operador.pop(); 
            operador.pop();
        }
        else if(pontos_atual - 1 <= 3){
            tipo = "fácil"
            operação = "";
            while(i<separador.length){
                if(!Number.isInteger(parseInt(separador[i])) && separador[i] != " " ){
                    operador.push(separador[i]);
                }
                operação = operação + separador[i];
                i++;
            }

            calculo = calc.Escolhar([tipo,operação.trim(),operador]);
            operador.pop();
        }
        else 
        {
            // DIFICIL
            // futuramente.
            /*tipo = "díficil";
           var operador = [separador[2],separador[5], separador[8]];
            operação = "";
            while(i<separador.length){
                operação = operação + separador[i];
                i++;
            }
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);*/
        }
        if(calculo != NaN && calculo != "erro" &&
            document.querySelector('[name=jogador_texto]').disabled == false)
        {
           
            clearInterval(modulo.contagem);
            document.querySelector("[name=Resposta]").disabled = false;
            document.querySelector('[name=jogador_texto]').disabled = false;
            document.querySelector("[name=Resposta_artificial]").disabled = false;
            document.querySelector("[name=artificial_texto]").textContent = calculo;
            document.querySelector(".img_resultado0").src = "./imagens/check-green-24dp.svg";
            document.querySelector(".img_resultado1").src ="./imagens/cancel-red-48dp.svg";
            pontos_atual = pontos_atual + 1;
            Derrota_jogador = Derrota_jogador - 1;
            document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent = pontos_atual;
            document.querySelectorAll("[name=valor_jogador]")[1].textContent = Derrota_jogador;


            this.link = "derrotar";
            modulo.artificial(this.link);
        }
        else {
            document.querySelector('[name=jogador_texto]').disabled = false;
            clearInterval(modulo.contagem);
            modulo.artificial("vencedor");
        }
        document.querySelector("[name=Resposta_artificial]").onmouseenter = function(){
            document.querySelector("[name=Resposta_artificial]").onclick = null;
        }
    }
}
const regras_gerais = new regras();