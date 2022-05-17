let numSquares = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector(".color-display");
const messageDisplay = document.querySelector(".message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector(".reset");
const modeButtons = document.querySelectorAll(".mode");
const easyButton = document.querySelector(".mode");
const hardButton = document.querySelector(".mode-hard");

//Iniciar:

(() => {
	colorDisplay.textContent = pickedColor;
	setupSquares();
	setupMode();
	reset();
})()

//Resetar o jogo:

resetButton.addEventListener("click", () => {
	reset();
});

function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function () {
			let clickedColor = this.style.backgroundColor;
            //Acerto:
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correto!";
				resetButton.textContent = "Jogar de novo";
				changeColors(pickedColor);
				//Fazer o jogo resetar apos certo tempo:
                const resetTimeout = setTimeout(() => {
					reset();
				}, 10000);
				resetButton.addEventListener('click', function () {
					clearTimeout(resetTimeout);
				});
			}
            //Erro:
			else {
                //Troca o background da cor aleatoria para preto:
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Tente novamente!";
			}
		});
	}
}

//Modo de jogo:

function setupMode() {
	for(let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			for (let i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
            //EASY:
			if (this.textContent === "Fácil") {
				numSquares = 3;
			}
			else if (this.textContent === "Médio") {
				numSquares = 6;
			}
            //HARD:
			else {
				numSquares = 9;
			}
            //Resetar apos trocar de modo:
			reset();
		});
	}
}

//Funcao que reseta:

function reset() {
	colors = genRandomColors(numSquares);
    //Cor certa:
	pickedColor = chooseColor();
    //Coloca o nome da cor no titulo:
	colorDisplay.textContent = pickedColor;
    //Background padrao:
	h1.style.backgroundColor = "#2C8E99";
    //Reseta o jogo, sem ganhar:    
	resetButton.textContent = "Novas cores";
	messageDisplay.textContent = "";
	for (let i = 0; i < squares.length; i++) {
		if(colors[i]) { 
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
}

//Troca as cores apos o acerto:

function changeColors(color) {
	for(let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}

//Seleciona a cor certa:

function chooseColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//Escolhe a cor dos 6 quadrados:

function genRandomColors(num) {
	let arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(makeColor());
	}
	return arr;
}

//Gera cor:

function makeColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}
