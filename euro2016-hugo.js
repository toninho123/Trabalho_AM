/**
 * Aplicações multimédia - Trabalho Prático 1
 * (c) Cláudio Barradas, 2021
 *
 */
var isProcessing = false;
var restartGame = false;
const game = {}; // encapsula a informação de jogo. Está vazio mas vai-se preenchendo com definições adicionais.

// sons do jogo
const sounds = {
  background: null,
  flip: null,
  success: null,
  hide: null,
};

// numero de linhas e colunas do tabuleiro;
const ROWS = 6;
const COLS = 8;

game.sounds = sounds; // Adicionar os sons sons do jogo ao objeto game.
game.board = Array(COLS)
  .fill()
  .map(() => Array(ROWS)); // criação do tabuleiro como um array de 6 linhas x 8 colunas

// Representa a imagem de uma carta de um país. Esta definição é apenas um modelo para outros objectos que sejam criados
// com esta base através de let umaFace = Object.create(face).
const face = {
  country: -1,
  x: -1,
  y: -1,
};

const CARDSIZE = 100; // tamanho da carta (altura e largura)
let faces = []; // Array que armazena objectos face que contêm posicionamentos da imagem e códigos dos paises

let cartas = [];
let crdSelect;
let cntSelect = 0;
let fst = true;

window.addEventListener('load', init, false);
var rest = document.addEventListener('keydown', restart);

function init() {
  game.stage = document.querySelector('#stage');
  //setupAudio(); // configurar o audio
  getFaces(); // calcular as faces e guardar no array faces
  createCountries(); // criar países
  // scramble();
  tempo();
  // hideCards();

  // game.sounds.background.play();

  //completar
}

function restart(e) {
  if (e.key == 'r' || e.key == 'R') {
    restartGame = true;
    init();
  }
}

function virarCarta() {
  // carta.style.backgroundPositionX = faces[y].x;
  // carta.style.backgroundPositionY = faces[y].y;
  console.log(isProcessing);
  if (isProcessing === true) {
    return;
  }
  if (this === crdSelect) return;
  this.classList.remove('escondida');
  if (cntSelect === 0) {
    crdSelect = this;
    cntSelect++;
  } else {
    if (
      crdSelect.style.backgroundPositionX === this.style.backgroundPositionX &&
      crdSelect.style.backgroundPositionY === this.style.backgroundPositionY
    ) {
      console.log('YUP');
      this.removeEventListener('click', virarCarta);
      crdSelect.removeEventListener('click', virarCarta);
      this.classList.add('matched');
      crdSelect.classList.add('matched');
      cntSelect = 0;
      crdSelect = null;
    } else {
      isProcessing = true;
      let timeHandler = setInterval(() => {
        crdSelect.classList.add('escondida');
        this.classList.add('escondida');
        console.log('NOPE');
        cntSelect = 0;
        crdSelect = null;
        clearInterval(timeHandler);
        isProcessing = false;
      }, 1000);
    }
  }
}
// Cria os paises e coloca-os no tabuleiro de jogo(array board[][])
function createCountries() {
  /* DICA:
      Seja umaCarta um elemento DIV, a imagem de carta pode ser obtida nos objetos armazenados no array faces[]; o verso da capa 
      está armazenado na ultima posicao do array faces[]. Pode também ser obtido através do seletor de classe .escondida do CSS.
        umaCarta.classList.add("carta"); 	
        umaCarta.style.backgroundPositionX=faces[0].x;
        umaCarta.style.backgroundPositionX=faces[0].y;
    
        Colocar uma carta escondida:
          umaCarta.classList.add("escondida");
          
        virar a carta:
          umaCarta.classList.remove("escondida");
        */
  for (var x = 0; x < 2; x++) {
    for (var y = 0; y < 24; y++) {
      carta = document.createElement('div');
      carta.classList.add('carta');
      // carta.classList.add('escondida');
      carta.style.backgroundPositionX = faces[y].x;
      carta.style.backgroundPositionY = faces[y].y;
      carta.addEventListener('click', virarCarta);
      cartas.push(carta);
    }
  }

  for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 8; y++) {
      let rndm = Math.floor(Math.random() * cartas.length);
      game.stage.appendChild(cartas[rndm]);
      cartas[rndm].style.left = CARDSIZE * y + 'px';
      cartas[rndm].style.top = CARDSIZE * x + 'px';
      game.board[x][y] = cartas[rndm];
      cartas.splice(rndm, 1);
    }
  }
}

// Adicionar as cartas do tabuleiro à stage
function render() {}

function tempo() {
  let contador = 0;
  let maxCount = 60;
  if (restartGame === true) {
    contador = null;
    restartGame = false;
  }
  let timeHandler = setInterval(() => {
    contador++;
    console.log(contador);
    document.getElementById('time').value = contador;

    if (contador === 5 && fst === true) {
      fst = false;
      hideCards();
    }
    if (contador === maxCount - 5) {
      document.getElementById('time').classList.add('warning');
      console.log('WTF');
    }
    if (contador >= maxCount) {
      clearInterval(timeHandler);
      console.log('BOOM');
      contador = 0;
      document.getElementById('time').classList.remove('warning');
      tempo();
      // scramble();
    }
  }, 1000);
}

// baralha as cartas no tabuleiro
function scramble() {
  let rndm;
  let crds = cartas;
  for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 8; y++) {
      rndm = Math.floor(Math.random() * crds.length);
      game.stage.appendChild(crds[rndm]);
      crds[rndm].style.left = CARDSIZE * y + 'px';
      crds[rndm].style.top = CARDSIZE * x + 'px';
      game.board[x][y] = crds[rndm];
      crds.splice(rndm, 1);
    }
  }
}

function hideCards() {
  let hide = document.querySelectorAll('.carta');
  hide.forEach((carta) => carta.classList.add('escondida'));
}
/* 
    ------------------------------------------------------------------------------------------------  
     ** /!\ NÃO MODIFICAR ESTAS FUNÇÕES /!\
    -------------------------------------------------------------------------------------------------- */

// configuração do audio
function setupAudio() {
  game.sounds.background = document.querySelector('#backgroundSnd');
  game.sounds.success = document.querySelector('#successSnd');
  game.sounds.flip = document.querySelector('#flipSnd');
  game.sounds.hide = document.querySelector('#hideSnd');
  game.sounds.win = document.querySelector('#goalSnd');

  // definições de volume;
  game.sounds.background.volume = 0.05; // o volume varia entre 0 e 1

  // nesta pode-se mexer se for necessário acrescentar ou configurar mais sons
}

// calcula as coordenadas das imagens da selecao de cada país e atribui um código único
function getFaces() {
  /* NÂO MOFIFICAR ESTA FUNCAO */
  let offsetX = 1;
  let offsetY = 1;
  for (let i = 0; i < 5; i++) {
    offsetX = 1;
    for (let j = 0; j < 5; j++) {
      let countryFace = Object.create(face); // criar um objeto com base no objeto face
      countryFace.x = -(j * CARDSIZE + offsetX) + 'px'; // calculo da coordenada x na imagem
      countryFace.y = -(i * CARDSIZE + offsetY) + 'px'; // calculo da coordenada y na imagem
      countryFace.country = '' + i + '' + j; // criação do código do país
      faces.push(countryFace); // guardar o objeto no array de faces
      offsetX += 2;
    }
    offsetY += 2;
  }
}

/* ------------------------------------------------------------------------------------------------  
     ** /!\ NÃO MODIFICAR ESTAS FUNÇÕES /!\
    -------------------------------------------------------------------------------------------------- */
