const hackFunction = document.querySelector('.hackFunction');
const hackAllButtons = document.querySelector('.hackAllButtons');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');

var __timePlay = 6666;
var progressBarInterval;
var buttonsInterval;
var finish = true;
var buttonsTimeout;
var clickButton = 0;
var allButtons = 50;
var clickButtons = 0;

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const gameInit = () => {
	gameReset();
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameReset = () => {
	clearTimeout(buttonsTimeout);
	clearInterval(buttonsInterval);
	clickButtons = 0;
	clickButton = 0;
	hackAllButtons.innerHTML = '';
};

const gameStart = () => {
	gameReset();
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	finish = true;
	progressBarStart('start', 2);
};

const gameOver = () => {
	gameReset();
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = '';
	finish = true;
	progressBarStart('end', 2);
};

const gameWin = () => {
	gameReset();
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = '';
	finish = true;
	progressBarStart('end', 2);
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
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBar.style.display = 'none';
				finish = false;

				createButton();
				moveButtons();

				progressBarStart('game', __timePlay);
				return;
			}
			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}
			if (type == 'end') {
				hackFunction.style.display = 'none';
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

function isColliding(a, b) {
	const rect1 = a.getBoundingClientRect();
	const rect2 = b.getBoundingClientRect();
	const isInHoriztonalBounds =
		rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
	const isInVerticalBounds =
		rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
	const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
	return isOverlapping;
}

function createButton() {
	if (clickButton >= allButtons) return;

	const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
	const hackAllButtons = document.getElementById('hackAllButtons');
	const button = document.createElement('div');
	button.classList.add('button');
	button.setAttribute('id', 'button' + clickButton);
	button.setAttribute('data-char', randomChar);
	button.textContent = randomChar;
	button.style.left = getRndInteger(0, 466) + 'px';
	button.style.top = '-40px';
	hackAllButtons.appendChild(button);
	clickButton++;

	buttonsTimeout = setTimeout(() => {
		createButton();
	}, getRndInteger(500, 1500));
}

function moveButtons() {
	buttonsInterval = setInterval(function () {
		if (!finish) {
			if (clickButtons === clickButton) {
				let allB = 0;
				const buttons = document.querySelectorAll('.button');
				buttons.forEach(but => {
					allB++;
				});
				if (!allB) gameWin();
			}
			for (let i = clickButtons; i < clickButton; i++) {
				var y = parseInt(
					document.getElementById('button' + i).style.top,
					10
				);
				y += 2;
				if (y >= 590) {
					gameOver();
					return;
				}
				document.getElementById('button' + i).style.top = y + 'px';
			}
		}
	}, 15);
}

document.addEventListener(
	'keypress',
	event => {
		var name = event.key;
		if (finish) return;

		if (
			isColliding(
				document.getElementById('button' + clickButtons),
				document.getElementById('hackClick')
			)
		) {
			if (
				document.getElementById('button' + clickButtons).dataset
					.char === name.toLocaleUpperCase()
			) {
				document.getElementById('button' + clickButtons).remove();
				document
					.getElementById('hackClickButtons')
					.classList.add('click');
				setTimeout(() => {
					document
						.getElementById('hackClickButtons')
						.classList.remove('click');
				}, 100);
			} else {
				gameOver();
			}
			clickButtons++;
		} else gameOver();
	},
	false
);
