const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const searchNumber = document.getElementById('searchNumber');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const changeGrid = document.getElementById('changeGrid');
const levelHackId = document.getElementById('levelHack');
const textGame = document.getElementById('textGame');

var min = 0;
var max = 9999;
var stop = 36;
var arrayListNumbers = [];
var arrayRandomNumbers = [];
var levelHack = 0;
var chooseCorrect = false;
var resetStatus = 1000;
var progressBarInterval;
var arrayEnd = [];

const gameInit = () => {
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

function gameStart() {
	arrayListNumbers = [];
	arrayRandomNumbers = [];
	arrayEnd = [];
	randomNumbers();
	createNumbers(arrayListNumbers);
	searchNumber.textContent =
		arrayListNumbers[Math.floor(Math.random() * stop)];
	levelHackId.textContent = levelHack + 1;
	textGame.innerHTML = 'Znajdź i zapamiętaj';
	arrayRandomNumbers.push(parseInt(searchNumber.textContent));
	chooseCorrect = false;
	levelHack = 0;
	resetStatus = 1000;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj się...';
	changeGrid.style.gridTemplateColumns = 'repeat(6, minmax(0, 1fr))';
	changeGrid.style.padding = '140px';
	levelHackId.textContent = levelHack + 1;
	searchNumber.style.opacity = '1';
	progressBarStart('start', 2);
}

const gameWin = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack Udany';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

function generateEndArray(id) {
	arrayEnd = [];
	arrayEnd.push(arrayRandomNumbers[id]);
	for (let i = 0; i < 4; i++) {
		var n = addedZero(Math.floor(Math.random() * max) + min);
		var check = arrayEnd.includes(n);

		if (check === false) arrayEnd.push(n);
		else {
			while (check === true) {
				n = addedZero(Math.floor(Math.random() * max) + min);
				check = arrayEnd.includes(n);
				if (check === false) {
					arrayEnd.push(n);
				}
			}
		}
	}
	searchNumber.textContent = arrayRandomNumbers[id];
	createNumbers(arrayEnd);
}

function createNumbers(array) {
	hackFunction.innerHTML = '';

	let currentIndex = array.length;
	let randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];

		const el = document.createElement('div');
		el.classList.add('el');
		el.setAttribute('id', array[currentIndex]);
		const name = document.createElement('p');
		name.classList.add('name');

		name.textContent = array[currentIndex];
		el.appendChild(name);

		hackFunction.appendChild(el);

		el.onclick = function () {
			if (el.id === searchNumber.textContent) {
				if (chooseCorrect === false) {
					if (levelHack == 2) {
						searchNumber.innerHTML = '';
						textGame.innerHTML = 'Wybierz poprawny';
						levelHack = 0;
						levelHackId.textContent = levelHack + 1;
						changeGrid.style.gridTemplateColumns =
							'repeat(5, minmax(0, 1fr))';
						changeGrid.style.padding = '180px';
						clearInterval(progressBarInterval);
						searchNumber.style.opacity = '0';
						progressBarStart('game', 40);
						chooseCorrect = true;
						generateEndArray(0);
					} else {
						createNumbers(arrayListNumbers);
						resetStatus = 1000;
						searchNumber.textContent =
							arrayListNumbers[Math.floor(Math.random() * stop)];
						levelHack++;
						levelHackId.textContent = levelHack + 1;
						arrayRandomNumbers.push(
							parseInt(searchNumber.textContent)
						);
					}
				} else {
					if (levelHack == 0) generateEndArray(1);
					if (levelHack == 1) generateEndArray(2);
					if (levelHack == 2) gameWin();

					levelHack++;
					levelHackId.textContent = levelHack + 1;
				}
			} else gameOver();
		};
	}
}

function addedZero(n) {
	if (n < 10) return '000' + n.toString();
	else if (n < 100) return '00' + n.toString();
	else if (n < 1000) return '0' + n.toString();
	else return n;
}

function randomNumbers() {
	arrayListNumbers = [];
	for (let i = 0; i < stop; i++) {
		var n = addedZero(Math.floor(Math.random() * max) + min);
		var check = arrayListNumbers.includes(n);

		if (check === false) {
			arrayListNumbers.push(n);
		} else {
			while (check === true) {
				n = addedZero(Math.floor(Math.random() * max) + min);
				check = arrayListNumbers.includes(n);
				if (check === false) {
					arrayListNumbers.push(n);
				}
			}
		}
	}
}

function progressBarStart(type = 'start', time, width) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
			if (type == 'game') {
				resetStatus--;
				if (resetStatus % 200 == 1) {
					if (levelHack < 3 && chooseCorrect === false) {
						createNumbers(arrayListNumbers);
					}
				}
			}
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', 40);
				return;
			}
			if (type == 'game') {
				hackFunction.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				gameOver();
				return;
			}
			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackText.style.display = 'none';
				hackInfo.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
			}
			clearInterval(progressBarInterval);
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}
