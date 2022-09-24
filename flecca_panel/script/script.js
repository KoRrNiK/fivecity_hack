const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackCount2 = document.querySelector('.hackCount2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const textInfoUp = document.getElementById('textInfoUp');
const progressBarId = document.getElementById('progress-bar');
const input = document.getElementsByClassName('input')[0];
const levelHackId = document.getElementById('levelHack');

var __timePlay = 5;
var progressBarInterval;
var stageLevel = 0;
let randomColor = 0;
let whiteCount, greenCount, purpleCount;

var colors = ['białego', 'zielonego', 'fioletowegoo'];

const start = () => {
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	stageLevel = 0;
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackCount2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameFinish = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackCount2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const nextStage = () => {
	randomColor = colors[Math.floor(Math.random() * colors.length)];
	input.value = '';
	input.placeholder = 'Ile było pól koloru ' + randomColor + '?';
	hackText.style.display = '';
	textInfoUp.innerHTML = 'ODPOWIEDZ';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = '';
	hackCount2.style.display = '';
	progressBarStart('next', 5);
};

function progressBarStart(type, time) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = 'none';
				hackCount2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay);
				createNumbers();
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = '';
				hackFunction2.style.display = 'none';
				hackCount2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				nextStage();
				return;
			}

			if (type == 'next') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackCount2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay);
				checkClick();
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackCount2.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function createNumbers() {
	hackFunction.innerHTML = '';

	var width = 10;
	var height = 10;

	var random;
	for (var i = 0; i < width * height; i++) {
		const el = document.createElement('div');
		el.classList.add('el');

		var yCoord = Math.floor(i / width) + 1;
		var xCoord = (i % width) + 1;

		el.dataset.x = xCoord;
		el.dataset.y = yCoord;

		el.setAttribute('id', i);

		hackFunction.appendChild(el);
	}

	let min = 2;
	let max = 7;

	let randomGreen = Math.floor(Math.random() * (max - min + 1) + min);
	let randomPurple = Math.floor(Math.random() * (max - min + 1) + min);
	let randomWhite = Math.floor(Math.random() * (max - min + 1) + min);

	for (let j = 0; j < randomWhite; j++) {
		random = Math.floor(Math.random() * 98);
		if (!document.getElementById(random).classList.contains('white')) {
			document.getElementById(random).classList.add('white');
		} else {
			random = Math.floor(Math.random() * 98);
			document.getElementById(random).classList.add('white');
		}
	}

	for (let j = 0; j < randomPurple; j++) {
		random = Math.floor(Math.random() * 98);
		if (!document.getElementById(random).classList.contains('purple')) {
			document.getElementById(random).classList.add('purple');
		} else {
			random = Math.floor(Math.random() * 98);
			document.getElementById(random).classList.add('purple');
		}
	}

	for (let j = 0; j < randomGreen; j++) {
		random = Math.floor(Math.random() * 98);
		if (!document.getElementById(random).classList.contains('green')) {
			document.getElementById(random).classList.add('green');
		} else {
			random = Math.floor(Math.random() * 98);
			document.getElementById(random).classList.add('green');
		}
	}

	stageLevel++;

	hackFunction.style.display = '';
	hackFunction2.style.display = 'none';
	textInfoUp.innerHTML = 'ZAPAMIĘTAJ';
	levelHackId.textContent = stageLevel;

	let hackId = document.getElementById('hackId');
	whiteCount = hackId.getElementsByClassName('white').length;
	greenCount = hackId.getElementsByClassName('green').length;
	purpleCount = hackId.getElementsByClassName('purple').length;

	console.log(whiteCount + colors[0]);
	console.log(greenCount + colors[1]);
	console.log(purpleCount + colors[2]);
}

const checkClick = () => {
	if (randomColor === colors[0]) {
		if (input.value == whiteCount) {
			if (stageLevel < 5) {
				progressBarStart('game', __timePlay);
				createNumbers();
				return;
			} else {
				gameFinish();
				return;
			}
		}
	}
	if (randomColor === colors[1]) {
		if (input.value == greenCount) {
			if (stageLevel < 5) {
				progressBarStart('game', __timePlay);
				createNumbers();
				return;
			} else {
				gameFinish();
				return;
			}
		}
	}
	if (randomColor === colors[2]) {
		if (input.value == purpleCount) {
			if (stageLevel < 5) {
				progressBarStart('game', __timePlay);
				createNumbers();
				return;
			} else {
				gameFinish();
				return;
			}
		}
	}
	gameOver();
};

input.addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		checkClick();
	}
});

hackFunction.style.display = 'none';
hackFunction2.style.display = 'none';
hackCount2.style.display = 'none';
hackText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';

document.addEventListener('contextmenu', event => event.preventDefault());
