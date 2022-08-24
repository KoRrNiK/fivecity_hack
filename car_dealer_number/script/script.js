var min = 1000;
var max = 8999;
var stop = 36;

var arrayListNumbers = [];
var arrayRandomNumbers = [];
var levelHack = 0;
var chooseCorrect = false;

var resetStatus = 100;

var progressBarInterval;

const container = document.querySelector('.hackFunction');
const containerText = document.querySelector('.hackText');

const searchNumber = document.getElementById('searchNumber');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');

var arrayEnd = [];

function generateEndArray(id) {
	arrayEnd = [];
	arrayEnd.push(arrayRandomNumbers[id]);
	for (let i = 0; i < 4; i++) {
		var n = Math.floor(Math.random() * max) + min;
		var check = arrayEnd.includes(n);

		if (check === false) arrayEnd.push(n);
		else {
			while (check === true) {
				n = Math.floor(Math.random() * max) + min;
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
	container.innerHTML = '';

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

		container.appendChild(el);

		el.onclick = function () {
			if (el.id === searchNumber.textContent) {
				if (chooseCorrect === false) {
					if (levelHack == 2) {
						document.getElementById('searchNumber').innerHTML = '';
						document.getElementById('textGame').innerHTML =
							'Wybierz poprawny';
						levelHack = 0;
						document.getElementById('levelHack').textContent =
							levelHack + 1;
						document.getElementById(
							'changeGrid'
						).style.gridTemplateColumns =
							'repeat(5, minmax(0, 1fr))';
						document.getElementById('changeGrid').style.padding =
							'180px';
						clearInterval(progressBarInterval);
						searchNumber.style.opacity = '0';
						progressBarId.style.width = '100%';
						progressBarStart('game', 400, 100);
						chooseCorrect = true;
						generateEndArray(0);
					} else {
						createNumbers(arrayListNumbers);
						resetStatus = 100;
						searchNumber.textContent =
							arrayListNumbers[Math.floor(Math.random() * stop)];
						//console.log(searchNumber.textContent);
						levelHack++;
						document.getElementById('levelHack').textContent =
							levelHack + 1;
						arrayRandomNumbers.push(
							parseInt(searchNumber.textContent)
						);
					}
				} else {
					//console.log(arrayEnd);

					if (levelHack == 0) {
						generateEndArray(1);
					}
					if (levelHack == 1) {
						generateEndArray(2);
					}
					if (levelHack == 2) {
						hackInfo.style.display = 'block';
						textInfo.innerHTML = 'Hack Udany';
						container.style.display = 'none';
						//container.style.opacity = "0";
						containerText.style.display = 'none';

						progressBarStart('end', 20, 100);
					}

					levelHack++;
					document.getElementById('levelHack').textContent =
						levelHack + 1;
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
	container.style.display = 'none';
	//container.style.opacity = "0";
	containerText.style.display = 'none';

	progressBarStart('end', 20, 100);
};

const randomNumbers = () => {
	arrayListNumbers = [];
	for (let i = 0; i < stop; i++) {
		var n = Math.floor(Math.random() * max) + min;
		var check = arrayListNumbers.includes(n);

		if (check === false) {
			arrayListNumbers.push(n);
		} else {
			while (check === true) {
				n = Math.floor(Math.random() * max) + min;
				check = arrayListNumbers.includes(n);
				if (check === false) {
					arrayListNumbers.push(n);
				}
			}
		}
	}
};

function start() {
	arrayListNumbers = [];
	arrayRandomNumbers = [];
	arrayEnd = [];

	randomNumbers();
	createNumbers(arrayListNumbers);
	searchNumber.textContent =
		arrayListNumbers[Math.floor(Math.random() * stop)];

	//console.log(searchNumber.textContent);
	document.getElementById('levelHack').textContent = levelHack + 1;
	document.getElementById('textGame').innerHTML = 'Znajdź i zapamiętaj';
	arrayRandomNumbers.push(parseInt(searchNumber.textContent));
	chooseCorrect = false;
	levelHack = 0;
	resetStatus = 100;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	document.getElementById('changeGrid').style.gridTemplateColumns =
		'repeat(6, minmax(0, 1fr))';
	document.getElementById('changeGrid').style.padding = '140px';
	document.getElementById('levelHack').textContent = levelHack + 1;
	searchNumber.style.opacity = '1';

	progressBarStart('start', 20, 100);
}

function progressBarStart(type = 'start', time, width) {
	const process = () => {
		if (width > 0) {
			width--;

			progressBarId.style.width = width + '%';

			if (type == 'game') {
				resetStatus--;
				if (resetStatus % 20 == 1) {
					if (levelHack < 3 && chooseCorrect === false) {
						createNumbers(arrayListNumbers);
					}
				}
			}
		} else {
			if (type == 'start') {
				container.style.display = '';
				//container.style.opacity = "1";
				containerText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarId.style.width = '100%';
				progressBarStart('game', 400, 100);
				return;
			}

			if (type == 'game') {
				container.style.display = '';
				//container.style.opacity = "1";
				containerText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarId.style.width = '100%';
				gameOver();
				return;
			} else if (type == 'end') {
				container.style.display = 'none';
				//container.style.opacity = "1";
				containerText.style.display = 'none';
				hackInfo.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				progressBarId.style.width = '100%';
			}

			clearInterval(progressBarInterval);
		}
	};

	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

container.style.display = 'none';
//container.style.opacity = "0";
containerText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';
