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

//const characters = 'ΩωΘθΞξΓγΖζΛλΦφΧχμΨψΣσςΠπ';
const characters = 'ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω';

var stop = 36;

var arrayListNumbers = [];
var arrayRandomCharacter = [];
var levelHack = 0;
var chooseCorrect = false;

var resetStatus = 1000;

var progressBarInterval;

function createNumbers(array) {
	hackFunction.innerHTML = '';

	let currentIndex = array.length,
		randomIndex;

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

						hackInfo.style.display = 'block';
						textInfo.innerHTML = 'Hack Udany';
						hackFunction.style.display = 'none';
						hackText.style.display = 'none';

						progressBarStart('end', 2);
					} else {
						createNumbers(arrayListNumbers);
						resetStatus = 1000;
						searchNumber.textContent =
							arrayListNumbers[Math.floor(Math.random() * stop)];
						levelHack++;
						levelHackId.textContent = levelHack + 1;
						arrayRandomCharacter.push(searchNumber.textContent);
					}
				}
			} else {
				gameOver();
			}
		};
	}
}

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';

	progressBarStart('end', 2);
};

const randomCharacter = () => {
	arrayListNumbers = [];

	var n = '';
	var check;
	for (let i = 0; i < stop; i++) {
		for (let i = 0; i < 4; i++) {
			n.slice(9);
			n += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}

		check = arrayListNumbers.includes(n);

		if (check === false) {
			arrayListNumbers.push(n);
		} else {
			while (check === true) {
				for (let i = 0; i < 4; i++) {
					n += characters.charAt(
						Math.floor(Math.random() * characters.length)
					);
				}
				check = arrayListNumbers.includes(n);
				if (check === false) {
					arrayListNumbers.push(n);
				}
			}
		}

		n = '';
	}
};

function start() {
	arrayListNumbers = [];
	arrayRandomCharacter = [];

	randomCharacter();
	createNumbers(arrayListNumbers);
	searchNumber.textContent =
		arrayListNumbers[Math.floor(Math.random() * stop)];

	levelHackId.textContent = levelHack + 1;
	textGame.innerHTML = 'Znajdź i zapamiętaj';
	arrayRandomCharacter.push(searchNumber.textContent);
	chooseCorrect = false;
	levelHack = 0;
	resetStatus = 1000;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	changeGrid.style.gridTemplateColumns = 'repeat(6, minmax(0, 1fr))';
	changeGrid.style.padding = '140px';
	levelHackId.textContent = levelHack + 1;
	searchNumber.style.opacity = '1';

	progressBarStart('start', 2);
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
				if (resetStatus % 125 == 1) {
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
			} else if (type == 'end') {
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

hackFunction.style.display = 'none';
hackText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';

document.addEventListener('contextmenu', event => event.preventDefault());
