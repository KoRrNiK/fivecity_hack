const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const body = document.querySelector('body');
const cursor = document.getElementById('cursor');
const boxLetters = document.getElementById('boxLetters');
const input = i => {
	return document.getElementById('input' + i);
};

var __timePlay = 20;
var progressBarInterval;
var check = false;

var mouseX = 0,
	mouseY = 0;
var xp = 0,
	yp = 0;
var arraySymbols = [];
var symbols = 'abcdefghijklmnopqrstuvwxyz';

const gameInit = () => {
	document.addEventListener('keyup', function (event) {
		if (event.key === 'Enter' && check) {
			checkClick();
		}
	});

	boxLetters.addEventListener('mousemove', function (e) {
		var rect = e.target.getBoundingClientRect();

		mouseX = e.clientX - rect.left - 30;
		mouseY = e.clientY - rect.top - 30;
	});

	setInterval(function () {
		xp += (mouseX - xp) / 10;
		yp += (mouseY - yp) / 10;

		cursor.style.left = xp + 'px';
		cursor.style.top = yp + 'px';
	}, 20);

	check = false;
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	for (let i = 0; i < 8; i++) {
		input(i).value = '';
	}

	check = false;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	progressBarStart('start', 2);
};

const gameOver = () => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameWin = () => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

function progressBarStart(type, time) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else if (type == 'game') width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';

				createLetters();
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
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

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function createLetters() {
	check = true;

	boxLetters.innerHTML = '';
	for (let i = 0; i < 8; i++) {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		const randomChar = symbols[Math.floor(Math.random() * symbols.length)];
		const boxLetters = document.getElementById('boxLetters');
		const button = document.createElement('div');
		button.classList.add('letters');
		button.setAttribute('id', 'button');
		button.setAttribute('data-char', 1);
		button.textContent = randomChar;
		button.style.left = getRndInteger(60, 600) + 'px';
		button.style.top = getRndInteger(60, 450) + 'px';
		button.style.color = '#' + randomColor;
		button.style.fontSize = getRndInteger(30, 70) + 'px';
		button.style.margin = '30px';
		button.style.transform = 'rotate(' + getRndInteger(0, 360) + 'deg)';
		arraySymbols[i] = randomChar;
		boxLetters.appendChild(button);
	}
}

function checkClick() {
	let x = 0;
	for (let i = 0; i < 8; i++) {
		if (arraySymbols.includes(input(i).value.toLocaleLowerCase())) {
			x++;
			if (x == 8) gameWin();
		} else {
			gameOver();
			return;
		}
	}
}

function validate(input) {
	input.value = input.value.replace(/\W|\d/g, '').substr(0, 1);
}
