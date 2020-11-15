class regras{
    jogador(usuario){
        var operação = document.querySelector(".operação").textContent;
        var separador = operação.split("");
        separador.pop();
        separador.pop();
        separador.pop();
        var resposta = document.querySelector("[name=Resposta]");
        var placar_ia = Number.parseInt(document.querySelectorAll("[name=Vitoria_artificial]")[1].textContent);
        var tipo;
        var i = 0;
        var pontos_joagador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[0].textContent);
        var calculo = 0;
        var temporizador = 0;
        var Derrotar_ia = Number.parseInt(document.querySelectorAll("[name=Derrota_artificial]")[1].textContent)
        if(placar_ia >3){
            tipo = "média"; 
            temporizador = 40000;
        }
        else if(placar_ia <= 3){
            tipo ="fácil";
            temporizador = 30000;
        }
        if(tipo == "média"){
            var operador = [separador[2],separador[5]];
            operação = "";
            while(i<separador.length){
                operação = operação + separador[i];
                i++;
            }
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);
        }
        else if(tipo == "fácil"){
            var operador = separador[2];
            operação = "";
            while(i<separador.length){
                operação = operação + separador[i];
                i++;
            }
            console.log(operação.trim());
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);

        }
        else 
        {
            // DIFICIL
        }

        if(calculo == usuario & calculo != NaN){
            document.querySelector('[name=jogador_texto]').disabled = true;
            pontos_joagador++;
            document.querySelector(".img_resultado1").src = "./imagens/check-green-24dp.svg";
            document.querySelector(".img_resultado0").src ="./imagens/cancel-red-48dp.svg";
            document.querySelectorAll("[name=valor_jogador]")[0].textContent = pontos_joagador;
            Derrotar_ia++;
            document.querySelectorAll("[name=Derrota_artificial]")[1].textContent = Derrotar_ia;
            resposta.disabled = true;
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
        var calculo = 0;
        var Derrota_jogador = Number.parseInt(document.querySelectorAll("[name=valor_jogador]")[1].textContent);

        if(pontos_atual - 1 > 3){
            tipo == "média"
            var operador = [separador[2],separador[5]];
            operação = "";
            while(i<separador.length){
                operação = operação + separador[i];
                i++;
            }
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);
        }
        else if(pontos_atual - 1 <= 3){
            tipo == "fácil"
            var operador = separador[2];
            operação = "";
            while(i<separador.length){
                operação = operação + separador[i];
                i++;
            }
            console.log(operação.trim());
            calculo = calc.Escolhar([tipo,operação.trim(),operador]);

        }
        else 
        {
            // DIFICIL
        }
        if(calculo == calc.Escolhar([tipo,operação.trim(),operador]) && calculo != NaN){
            document.querySelector("[name=Resposta]").disabled = false;
            document.querySelector('[name=jogador_texto]').disabled = false;
            var responsta_jogador = Number.parseInt(document.querySelector("[name=jogador_texto]").value);
            if(calculo == responsta_jogador)
            {
                clearInterval(modulo.contagem);
                document.querySelector("[name=Resposta_artificial]").disabled = false;
                modulo.artificial("vencedor");
            }
            else{
                clearInterval(modulo.contagem);
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
        }



        document.querySelector("[name=Resposta_artificial]").onmouseenter = function(){
            document.querySelector("[name=Resposta_artificial]").onclick = null;
        }
    }
}
const regras_gerais = new regras();