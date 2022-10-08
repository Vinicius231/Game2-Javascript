var root = document.documentElement;
var tiro = document.querySelector(".tiro");
var olho = document.querySelector(".olho");
var limite = document.querySelector(".limite");
var inimigo = document.querySelector(".inimigo");
var recomecar = document.querySelector(".recomecar");
var personagem = document.querySelector(".personagem");
var inimigoCosta = document.querySelector(".inimigoCosta");
var inimigoSpeed = document.querySelector(".inimigoSpeed");
var jogoTerminado = document.querySelector(".jogoTerminado");

document.addEventListener("keydown", mover);

var px = 0;
var dx = 0;
var py = 0;
var vel = 0;
var lado = 0;
var tecla = "";
var pydano = 0;
var pxdoTiro = 0;
var pontuacao = 0;
var verificacao = 0;
var positionTiro = 0;
var positionInimigo = 0;
var positionInimigoCosta;
var verificacaoInimigo = 0;
var positionPersonagem = 0;
var positionInimigoSpeed = 0;

inimigoCosta.style.display = "none";
inimigoCosta.style.animation = "none";

inimigoSpeed.style.display = "none";
inimigoSpeed.style.animation = "none";

function atualizar() {
  personagem.style.left = px + "px";
  tiro.style.left = pxdoTiro + "px";
  olho.style.left = px + lado + "px";
}

function mover() {
  tecla = event.keyCode;

  positionTiro = tiro.offsetLeft;
  positionInimigo = inimigo.offsetLeft;
  positionPersonagem = personagem.offsetLeft;
  positionInimigoCosta = inimigoCosta.offsetLeft;
  positionInimigoSpeed = inimigoSpeed.offsetLeft;

  if (pontuacao >= 3) {
    inimigoCosta.style.animation = "animeInimigoCosta 7s linear infinite";
    inimigoCosta.style.display = "block";
    verificacaoInimigo = 1;
  }
  if (pontuacao >= 10) {
    inimigoSpeed.style.animation = "animeInimigoSpeed 1.5s linear infinite";
    inimigoSpeed.style.display = "block";
    verificacaoInimigo = 1;
  }

  //tecla pressionada
  if (tecla == 68) {
    dx = 1;
    lado = 50;
    verificacao = 0;
    vel = 10;
  } else if (tecla == 65) {
    dx = -1;
    lado = 10;
    verificacao = 1;
    vel = 10;
  } else {
    //Para quando clicar em tecla errada não andar e add vel nos ifs
    dx = 0;
  }

  // velocidade do personagem
  px += dx * vel;
  pxdoTiro += dx * vel;

  if (tecla == 32) {
    if (positionInimigo > positionPersonagem && verificacao == 0) {
      inimigo.style.animation = "none";
      inimigo.style.right = "-80px";

      pontuacao++;
      setTimeout(renascer, 2000);
      function renascer() {
        inimigo.style.animation = "animeInimigo 7s linear infinite";
      }
    }

    if (positionInimigoCosta >= positionPersonagem && verificacao == 0) {
      inimigoCosta.style.display = "none";

      pontuacao++;

      setTimeout(renascer2, 1000);

      function renascer2() {
        inimigoCosta.style.display = "block";
      }
    }
    if (positionInimigoSpeed >= positionPersonagem && verificacao == 0) {
      inimigoSpeed.style.display = "none";

      pontuacao++;

      setTimeout(renascer5, 3000);

      function renascer5() {
        inimigoSpeed.style.display = "block";
      }
    }

    if (verificacao == 0) {
      root.style.setProperty("--px-tiro", px + "px");
      tiro.style.animation = "animeTiroDireita 0.2s linear";
      setTimeout(remover, 1000);
      function remover() {
        tiro.style.animation = "none";
      }
    }
  }
  if (tecla == 32) {
    if (positionInimigo < positionPersonagem && verificacao == 1) {
      inimigo.style.display = "none";

      pontuacao++;

      setTimeout(renascer3, 2000);
      function renascer3() {
        inimigo.style.display = "block";
      }
    }
    if (verificacao == 1) {
      root.style.setProperty("--px-tiro", px + "px");
      tiro.style.animation = "animeTiroEsquerda 0.2s linear";
      setTimeout(remover2, 1000);
      function remover2() {
        tiro.style.animation = "none";
      }
      console.log("deu merda");
    }

    if (positionInimigoCosta < positionPersonagem && verificacao == 1) {
      inimigoCosta.style.display = "none";

      pontuacao++;

      setTimeout(renascer4, 1000);
      function renascer4() {
        inimigoCosta.style.display = "block";
      }
    }
    if (positionInimigoSpeed < positionPersonagem && verificacao == 1) {
      inimigoSpeed.style.display = "none";

      pontuacao++;

      setTimeout(renascer6, 3000);

      function renascer6() {
        inimigoSpeed.style.display = "block";
      }
    }
  }
  //68 = d
  // 65 = a
  // 32 = space

  console.log(pontuacao);
  atualizar();
}

setInterval(death, 20);

function death() {
  positionInimigo = inimigo.offsetLeft;
  positionInimigoCosta = inimigoCosta.offsetLeft;
  positionInimigoSpeed = inimigoSpeed.offsetLeft;
  positionPersonagem = personagem.offsetLeft;
  positionTiro = tiro.offsetLeft;

  if (positionInimigo <= positionPersonagem) {
    limite.style.display = "none";
    jogoTerminado.style.display = "block";
  }

  if (verificacaoInimigo == 1) {
    if (positionInimigoCosta >= positionPersonagem) {
      limite.style.display = "none";
      jogoTerminado.style.display = "block";
    }
    if (positionInimigoSpeed >= positionPersonagem) {
      limite.style.display = "none";
      jogoTerminado.style.display = "block";
    }
  }
}

recomecar.addEventListener("click", recomeçar);

function recomeçar() {
  window.location.reload();
}
