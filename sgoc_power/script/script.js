const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const hackLevel = document.getElementById('hackLevel');
const progressBarId = document.getElementById('progress-bar');

var __timePlay = 300;
var progressBarInterval;
var stop = 64;
var arrayListNumbers = [];
var firstClick = -1;
var firstId;
var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var level = 0;

const gameInit = () => {
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	level = 0;
	firstClick = -1;
	firstId = undefined;
	hackLevel.innerHTML = level + '/5';
	while (arrayListNumbers.length > 0) {
		arrayListNumbers.pop();
	}
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	progressBarStart('start', 2);
};

const gameWin = () => {
	hackFunction.innerHTML = '';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameOver = () => {
	hackFunction.innerHTML = '';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
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
				randomCharacter();
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

		el.setAttribute('id', currentIndex);
		el.textContent = array[currentIndex];

		hackFunction.appendChild(el);

		el.onmousedown = function (event) {
			switch (event.which) {
				case 1: {
					if (hasClass(el, 'second') || hasClass(el, 'first')) {
						return;
					}

					if (firstClick == el.innerHTML) {
						el.classList.add('second');
						el.style.cursor = 'default';
						document
							.getElementById(firstId)
							.classList.add('second');
						document
							.getElementById(firstId)
							.classList.remove('first');
						document.getElementById(firstId).style.cursor =
							'default';
						firstClick = -1;
						level++;
						hackLevel.innerHTML = level + '/5';

						if (level >= 5) {
							gameWin();
						}

						return;
					} else {
						el.classList.add('first');
						el.style.cursor = 'default';
					}

					if (firstClick != el.innerHTML && firstClick != -1) {
						gameOver();
						return;
					}

					firstId = el.id;
					firstClick = el.innerHTML;
					break;
				}
			}
		};
	}
}

function randomCharacter() {
	var n = '';

	setDuplicate(arrayListNumbers);

	for (let i = 0; i < 2; i++) {
		n += symbols.charAt(Math.floor(Math.random() * symbols.length));
	}

	if (!arrayListNumbers.includes(n)) arrayListNumbers.push(n);

	n = '';

	if (arrayListNumbers.length < 64) {
		randomCharacter();
	} else if (arrayListNumbers.length >= 64) {
		createNumbers(arrayListNumbers);
	}
}

function setDuplicate(array) {
	if (array.length > 10) {
		array[1] = array[0];
		array[2] = array[3];
		array[4] = array[5];
		array[6] = array[7];
		array[8] = array[9];
	}
	if (array.length == 10) {
		console.log(array[0]);
		console.log(array[3]);
		console.log(array[5]);
		console.log(array[7]);
		console.log(array[9]);
	}
}

function hasClass(element, className) {
	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
