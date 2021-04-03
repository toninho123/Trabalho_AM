/**
 * Aplicações multimédia - Trabalho Prático 1
 * (c) Cláudio Barradas, 2021
 *
 */

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

window.addEventListener('load', init, false);

function init() {
  game.stage = document.querySelector('#stage');
  setupAudio(); // configurar o audio
  getFaces(); // calcular as faces e guardar no array faces
  createCountries(); // criar países
  tempo();
  game.sounds.background.play();

  //completar
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

  let carta = document.createElement('div');

	for (var x=0 ; x<6; x++){
		for (var y=0 ; y<8; y++){
    	carta = document.createElement('div');
    	carta.classList.add('carta');
      game.stage.appendChild(carta);
      carta.style.backgroundPositionX = faces[Math.floor(Math.random() * 25)].x;
      carta.style.backgroundPositionY = faces[Math.floor(Math.random() * 25)].y;
      carta.style.left = CARDSIZE * Math.floor(Math.random() * 8) + 'px';
      carta.style.top = CARDSIZE * Math.floor(Math.random() * 6) + 'px';
      game.board[x][y] = carta;
		};
	};



  // const cartas = (carta) => {
  //   for (let i = 0; i <= 23; i++) {
  //     let l,
  //       t = 0;
  //     if (l > 7 || t > 5) {
  //       l = 0;
  //       t = 0;
  //     }
  //     let sel = i;
  //     if (i > 23) i = 0;

  //     carta = document.createElement('div');
  //     carta.classList.add('carta');
  //     game.stage.appendChild(carta);
  //     carta.style.backgroundPositionX = faces[sel].x;
  //     carta.style.backgroundPositionY = faces[sel].y;
  //     carta.style.left = CARDSIZE * Math.floor(Math.random() * 8) + 'px';
  //     carta.style.top = CARDSIZE * Math.floor(Math.random() * 6) + 'px';
  //     game.board[t][l] = carta;
  //   }

  // };

  let contador = 0;
  let maxCount = 60;
  // cartas(umaCarta);
  let timeHandler = setInterval(() => {
    contador++;

    if (contador === maxCount) {
      clearInterval(timeHandler);
    }
  }, 500);
}

// Adicionar as cartas do tabuleiro à stage
function render() {}

function tempo() {
  let contador = 0;
  let maxCount = 60;
  let timeHandler = setInterval(() => {
    contador++;
    document.getElementById('time').value = contador;
    if (contador === maxCount - 5)
      document.getElementById('time').classList.add('warning');
    if (contador === maxCount) {
      clearInterval(timeHandler);
      document.getElementById('time').classList.remove('warning');
      timer = setInterval(function () {
        render();
      }, 1000);
    }
  }, 1000);
}

// baralha as cartas no tabuleiro
function scramble() {}

/* ------------------------------------------------------------------------------------------------  
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
