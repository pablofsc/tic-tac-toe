const corBackgroundEscuro = '#1D3E53';
const corFonteEscuro = '#F5F5F5';
const corDivEscuro = '#254B62';
const corCasaEscuro = '#476D7C';
const corCasaDestaqueEscuro = '#77ABB7';

const corCasaDestaqueClaro = '#495464';

var tabuleiroReal = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

var botoes = [];

var jogadorAtual = 'x';
var primeiroJogador = 'x';

var partidasVencidasX = 0;
var partidasVencidasO = 0;
var empates = 0;
var modoEscuroCheckbox = false;
var travarBotoes = false;

window.onload = function () {
    //document.getElementById("modoEscuro").addEventListener("change", alternarModoEscuro());

    for (let i = 0; i <= 8; i++) {
        botoes.push(document.getElementById(i));
        botoes[i].addEventListener("click", () => checarValidez(i));
    }

    atualizarPlacares();
}

function alternarModoEscuro() {
    modoEscuroCheckbox = !modoEscuroCheckbox;

    if (modoEscuroCheckbox) {
        document.getElementById("corpo").style.backgroundColor = corBackgroundEscuro;
        document.getElementById("corpo").style.color = corFonteEscuro;
        document.getElementById("modoEscuro").value = "MODO CLARO";

        for (i = 0; i < document.getElementsByClassName("div").length; i++) {
            document.getElementsByClassName("div")[i].style.backgroundColor = corDivEscuro;
        }

        for (i = 0; i <= 8; i++) {
            alterarCorBotao(botoes[i], corCasaEscuro, corFonteEscuro);
        }

        alterarCorBotao(document.getElementById("modoEscuro"), corCasaEscuro, corFonteEscuro);
    }
    else {
        document.getElementById("corpo").style.backgroundColor = "";
        document.getElementById("corpo").style.color = "";
        document.getElementById("modoEscuro").value = "MODO ESCURO";

        for (i = 0; i < document.getElementsByClassName("div").length; i++) {
            document.getElementsByClassName("div")[i].style.backgroundColor = '';
        }

        for (i = 0; i <= 8; i++) {
            alterarCorBotao(botoes[i], '', '')
        }

        alterarCorBotao(document.getElementById("modoEscuro"), '', '');
    }
}

function alterarCorBotao(botao, backgroundColor, color) {
    botao.style.backgroundColor = backgroundColor;
    botao.style.color = color;
}

function novaPartida() {
    console.log("Iniciando nova partida...");
    for (i = 0; i <= 8; i++) { // limpa o tabuleiro
        tabuleiroReal[i] = ' ';
        botoes[i].classList.remove('inativo');
        if (modoEscuroCheckbox) {
            alterarCorBotao(botoes[i], corCasaEscuro, corFonteEscuro);
        }
        else {
            alterarCorBotao(botoes[i], '', '');
        }
    }

    primeiroJogador = trocarJogador(primeiroJogador)
    jogadorAtual = primeiroJogador;

    atualizarBotoes();
    travarBotoes = false;

    if (primeiroJogador === 'o') {
        iaIniciar('o');
    }
}

function atualizarPlacares() {
    document.getElementById("partidasVencidasJogador").innerHTML = partidasVencidasX;
    document.getElementById("partidasVencidasJogadorH1").innerHTML = partidasVencidasX;
    document.getElementById("partidasVencidasMaquina").innerHTML = partidasVencidasO;
    document.getElementById("partidasVencidasMaquinaH1").innerHTML = partidasVencidasO;
    document.getElementById("partidasEmpatadas").innerHTML = empates;
}

function checarValidez(casa) {
    if (travarBotoes) {
        return;
    }

    travarBotoes = true;
    /*console.log("Checando validez de " + casa);*/
    if (tabuleiroReal[casa] !== ' ') {
        console.log("Seleção inválida: " + casa + " por " + jogadorAtual);
        travarBotoes = false;
        return;
    }

    registrarJogada(casa, jogadorAtual);
}

function registrarJogada(casa) {
    console.log("Registrando: " + casa + " por " + jogadorAtual);
    tabuleiroReal[casa] = jogadorAtual;
    setTimeout(() => {
        botoes[casa].classList.add('inativo');
    }, 150);

    atualizarBotoes();

    setTimeout(() => { checarVencedorReal(); }, 100);

    jogadorAtual = trocarJogador(jogadorAtual);
    console.log("Próximo jogador: " + jogadorAtual);

    if (jogadorAtual === 'o' && checarVencedor(tabuleiroReal, false) == ' ') setTimeout(() => {
        iaIniciar('o');
    }, 500);
    else if (jogadorAtual === 'x' && checarVencedor(tabuleiroReal, false) == ' ') {
        travarBotoes = false;
    }
}

function checarVencedorReal() {
    vencedor = checarVencedor(tabuleiroReal, true)

    if (vencedor !== ' ') {
        travarBotoes = true;
        console.log("---------------- Anunciando vencedor: " + vencedor);

        switch (vencedor) {
            case 'x':
                partidasVencidasX++;
                break;

            case 'o':
                partidasVencidasO++;
                break;

            case '!':
                empates++;
                break;
        }

        atualizarPlacares();
        setTimeout(() => {
            novaPartida();
        }, 1000);
    }
}

function indicarVitoria(a, b, c) {
    if (modoEscuroCheckbox) {
        alterarCorBotao(a, corCasaDestaqueEscuro, "black");
        alterarCorBotao(b, corCasaDestaqueEscuro, "black");
        alterarCorBotao(c, corCasaDestaqueEscuro, "black");
    }
    else {
        alterarCorBotao(a, corCasaDestaqueClaro, "white");
        alterarCorBotao(b, corCasaDestaqueClaro, "white");
        alterarCorBotao(c, corCasaDestaqueClaro, "white");
    }
}

function checarVencedor(tabuleiro, real) {
    /*console.log("Checando se há vencedor");*/
    for (let i = 0; i <= 6; i += 3) {
        if (tabuleiro[i] == tabuleiro[i + 1] && tabuleiro[i] == tabuleiro[i + 2] && tabuleiro[i] !== ' ') {
            if (real === true) {
                indicarVitoria(botoes[i], botoes[i + 1], botoes[i + 2]);
            }

            return (tabuleiro[i]);
        }
    }

    for (let i = 0; i <= 3; i++) {
        if (tabuleiro[i] == tabuleiro[i + 3] && tabuleiro[i] == tabuleiro[i + 6] && tabuleiro[i] !== ' ') {
            if (real) {
                indicarVitoria(botoes[i], botoes[i + 3], botoes[i + 6]);
            }

            return (tabuleiro[i]);
        }
    }

    if (tabuleiro[0] == tabuleiro[4] && tabuleiro[0] == tabuleiro[8] && tabuleiro[0] !== ' ') {
        if (real) {
            indicarVitoria(botoes[0], botoes[4], botoes[8]);
        }

        return (tabuleiro[0]);
    }
    if (tabuleiro[2] == tabuleiro[4] && tabuleiro[2] == tabuleiro[6] && tabuleiro[2] !== ' ') {
        if (real) {
            indicarVitoria(botoes[2], botoes[4], botoes[6]);
        }

        return (tabuleiro[2]);
    }

    for (i = 0; i <= 8; i++) {
        if (tabuleiro[i] === ' ') {
            return (' '); // nenhum vencedor ainda
        }
    }

    return ('!'); // empate
}

function atualizarBotoes() {
    for (let i = 0; i <= 8; i++) {
        botoes[i].value = tabuleiroReal[i];
        /*console.log(document.getElementById(i));*/
    }
}

function trocarJogador(atual) {
    if (atual == 'x') {
        return ('o');
    }
    else {
        return ('x');
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function tabuleiroVazio() {
    for (i = 0; i <= 8; i++) {
        if (tabuleiroReal[i] !== ' ') {
            return false;
        }
    }

    return true;
}

/* FUNÇÕES RELACIONADAS À IA */

function iaIniciar(simboloMaquina) {
    if (tabuleiroVazio()) {
        registrarJogada(Math.round(Math.random() * (8 - 0)), simboloMaquina);
        return;
    }

    sleep(100);
    console.log("IA iniciada...");

    let maiorNota = -999999;
    let casaEscolhida = -1;

    let tabuleiroAuxiliar = [...tabuleiroReal]

    for (let casa = 0; casa <= 8; casa++) {
        if (tabuleiroAuxiliar[casa] == ' ') {
            let notaCasa = 0;
            tabuleiroAuxiliar[casa] = simboloMaquina; // supoe a hipotese de jogar nesta casa

            if (checarVencedor(tabuleiroAuxiliar, false) === simboloMaquina) { // checa se ao jogar nessa casa vence-se o jogo imediatamente
                registrarJogada(casa, simboloMaquina);
                return;
            }

            notaCasa = avaliarJogadaHipotetica(tabuleiroAuxiliar, simboloMaquina); // chama a função recursiva para gerar uma nota para essa casa

            if (notaCasa > maiorNota) {
                maiorNota = notaCasa;
                casaEscolhida = casa;
            }
            else if (notaCasa === maiorNota) { // caso haja duas casas com a mesma nota...
                if (Math.floor(Math.random() * 100) % 2 == 1) { // ...escolhe uma delas aleatoriamente
                    casaEscolhida = casa;
                }
            }

            tabuleiroAuxiliar[casa] = trocarJogador(simboloMaquina); // supoe a hipotese de o jogador jogar nessa casa em seguida

            if (checarVencedor(tabuleiroAuxiliar, false) === trocarJogador(simboloMaquina)) { // verifica se o humano ganharia na próxima rodada
                maiorNota = 999999; // prioridade máxima para impedir
                casaEscolhida = casa; // só não impedirá caso seja possível vencer na mesma jogada
            }

            tabuleiroAuxiliar[casa] = ' '; // esvazia a casa para checar a próxima
        }
    }

    /*console.log("IA: " + retorno);*/

    registrarJogada(casaEscolhida, simboloMaquina);
}

function avaliarJogadaHipotetica(tabuleiroHipotetico, jogadorHipotetico) {
    let nota = 0;

    for (let casa = 0; casa <= 8; casa++) {
        if (tabuleiroHipotetico[casa] === ' ') {
            tabuleiroHipotetico[casa] = jogadorHipotetico;

            if (checarVencedor(tabuleiroHipotetico, false) === jogadorHipotetico) {
                nota += 1;
            }
            else if (checarVencedor(tabuleiroHipotetico, false) === trocarJogador(jogadorHipotetico)) {
                nota -= 1;
            }
            else {
                nota += (-1) * avaliarJogadaHipotetica(trocarJogador(jogadorHipotetico));
            }

            tabuleiroHipotetico[casa] = ' ';
        }
    }

    return (nota);
}
