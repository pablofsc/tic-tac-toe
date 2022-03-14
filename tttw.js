var tabuleiro = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var botoes = [];
var jogadorAtual = 'x';
var tabaux = [];

window.onload = function () {
    for (let i = 0; i <= 8; i++) {
        console.log(i);
        botoes.push(document.getElementById(i));
        botoes[i].addEventListener("click", () => checarValidez(i));
    }
}

function checarValidez(casa) {
    console.log("Checando validez de " + casa);
    if (tabuleiro[casa] !== ' ') {
        return;
    }

    registrarJogada(casa, "x");
    checarVencedorReal(tabuleiro);
}

function registrarJogada(casa, jogador) {
    console.log("Registrando: " + casa + " por " + jogador);
    tabuleiro[casa] = jogador;

    atualizarBotoes();
}

function checarVencedorReal(tabuleiro) {
    if (checarVencedor(tabuleiro) !== ' ') {
        anunciarVencedor(checarVencedor(tabuleiro));
    }
}

function checarVencedor(tabuleiro) {
    /*console.log("Checando se há vencedor");*/
    if (tabuleiro[0] == tabuleiro[1] && tabuleiro[0] == tabuleiro[2] && tabuleiro[0] !== ' ') return (tabuleiro[0]);
    if (tabuleiro[3] == tabuleiro[4] && tabuleiro[3] == tabuleiro[5] && tabuleiro[3] !== ' ') return (tabuleiro[3]);
    if (tabuleiro[6] == tabuleiro[7] && tabuleiro[6] == tabuleiro[8] && tabuleiro[6] !== ' ') return (tabuleiro[6]);

    if (tabuleiro[0] == tabuleiro[3] && tabuleiro[0] == tabuleiro[6] && tabuleiro[0] !== ' ') return (tabuleiro[0]);
    if (tabuleiro[1] == tabuleiro[4] && tabuleiro[1] == tabuleiro[7] && tabuleiro[1] !== ' ') return (tabuleiro[1]);
    if (tabuleiro[2] == tabuleiro[5] && tabuleiro[2] == tabuleiro[8] && tabuleiro[2] !== ' ') return (tabuleiro[2]);

    if (tabuleiro[0] == tabuleiro[4] && tabuleiro[0] == tabuleiro[8] && tabuleiro[0] !== ' ') return (tabuleiro[0]);
    if (tabuleiro[2] == tabuleiro[4] && tabuleiro[2] == tabuleiro[6] && tabuleiro[2] !== ' ') return (tabuleiro[2]);

    return (' ');
}

function anunciarVencedor(vencedor) {
    console.log("Anunciando vencedor: " + vencedor);

    if (vencedor == 'x') {
        alert("Você venceu!");
    }
    else {
        alert("A máquina venceu!");
    }
}

function atualizarBotoes() {
    console.log("Atualizando conteúdo dos botões");
    for (let i = 0; i <= 8; i++) {
        document.getElementById(i).value = tabuleiro[i];
        console.log(document.getElementById(i));
    }

    if (jogadorAtual == 'x') {
        jogadorAtual = 'o';
        iaIniciar('o');
        jogadorAtual = 'x'
    }
}

function darNota(jogadorHipotetico) {
    let nota = 0;

    for (let casa = 0; casa < 9; casa++) {
        if (tabaux[casa] == ' ') {
            tabaux[casa] = jogadorHipotetico;

            if (checarVencedor(tabaux) == jogadorHipotetico) {
                nota += 1;
            }
            else if (checarVencedor(tabaux) == trocarjogador(jogadorHipotetico)) {
                nota -= 1;
            }
            else {
                nota += (-1) * darNota(trocarjogador(jogadorHipotetico));
            }

            tabaux[casa] = ' ';
        }
    }

    console.log(nota);
    return (nota);
}

function iaIniciar(simboloMaquina) {
    let nota = null;
    let notaMaior = -999999;
    let retorno = -1;

    tabaux = [...tabuleiro]

    for (let casa = 0; casa < 9; casa++) {
        if (tabaux[casa] == ' ') {
            nota = 0;
            tabaux[casa] = simboloMaquina;

            if (checarVencedor(tabaux, simboloMaquina) == simboloMaquina) { // checa se jogar nessa casa se vence o jogo imediatamente
                return (casa);
            }
            else {
                nota = darNota(simboloMaquina); // chama a função recursiva para gerar uma nota para essa casa
            }

            if (nota > notaMaior) {
                notaMaior = nota;
                retorno = casa;
            }
            else if (nota === notaMaior) { // caso haja duas casas com a mesma nota...
                if (Math.floor(Math.random() * 100) % 2 == 1) { // ...escolhe uma delas aleatoriamente
                    retorno = casa;
                }
            }

            tabaux[casa] = ' '; // esvazia a casa

            tabaux[casa] = trocarjogador(simboloMaquina);

            if (checarVencedor(tabaux, trocarjogador(simboloMaquina)) == trocarjogador(simboloMaquina)) { // verifica se o humano ganharia na próxima rodada
                return (casa); // impede-o
            }

            tabaux[casa] = ' '; // esvazia a casa para checar a próxima
            //printf("%i: %i\n", casa, nota);
        }
    }

    console.log("IA: " + retorno);

    registrarJogada(retorno, 'o');
}


function trocarjogador(atual) {
    if (atual == 'x') {
        return ('o');
    }
    else {
        return ('x');
    }
}