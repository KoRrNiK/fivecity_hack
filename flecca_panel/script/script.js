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

let numbers = [];
var __timePlay = 5 * 2;
var stageLevel = 0;
let randomColor = 0;
var colors = ['białego', 'zielonego', 'fioletowego'];
var progressBarInterval;

const gameInit = () => {
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackCount2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
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

const gameWin = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackCount2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const nextStage = () => {
	console.log('%c' + colors[0] + ' | ' + numbers[0] + '\n%c' + colors[1] + ' | ' + numbers[1] + '\n%c' + colors[2] + ' | ' + numbers[2], 'color: white', 'color: green', 'color: purple');

	randomColor = colors[Math.floor(Math.random() * colors.length)];
	input.value = '';
	input.placeholder = 'Ile było pól koloru ' + randomColor + '?';
	hackText.style.display = '';
	textInfoUp.innerHTML = 'ODPOWIEDZ';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = '';
	hackCount2.style.display = '';
	progressBarStart('next', __timePlay);
};

function hasClass(element, className) {
	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function progressBarStart(type, time) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width = width - 2;
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

	randomColors(3, Math.floor(Math.random() * (15 - 7 + 1) + 7));

	var width = 10;
	var height = 10;

	for (var i = 0; i < width * height; i++) {
		const el = document.createElement('div');
		el.classList.add('el');
		el.setAttribute('id', i);
		hackFunction.appendChild(el);
	}

	generateColors('white', numbers[0]);
	generateColors('green', numbers[1]);
	generateColors('purple', numbers[2]);

	stageLevel++;

	hackFunction.style.display = '';
	hackFunction2.style.display = 'none';
	textInfoUp.innerHTML = 'ZAPAMIĘTAJ';
	levelHackId.textContent = stageLevel;
}

function randomColors(m, n) {
	let arr = new Array(m);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = 0;
	}

	for (let i = 0; i < n; i++) {
		arr[Math.floor(Math.random() * n) % m]++;
	}

	for (let i = 0; i < m; i++) {
		numbers[i] = arr[i];
	}
}

function generateColors(color, count) {
	for (let j = 0; j < count; j++) {
		let random = Math.floor(Math.random() * 98);
		let element = document.getElementById(random);
		let good = true;

		if (hasClass(element, 'white') || hasClass(element, 'green') || hasClass(element, 'purple')) {
			generateColors(color, 1);
			good = false;
		}

		if (good) document.getElementById(random).classList.add(color);
	}
}

function checkClick() {
	for (let i = 0; i < 3; i++) {
		if (randomColor === colors[i]) {
			if (input.value == numbers[i]) {
				if (stageLevel < 5) {
					progressBarStart('game', __timePlay);
					createNumbers();
					return;
				} else {
					gameWin();
					return;
				}
			}
		}
	}
	gameOver();
}

input.addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		checkClick();
	}
});
