const container = document.querySelector('.hackFunction');
const containerText = document.querySelector('.hackText');

const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');

var progressBarInterval;
var squaresInterval;
var allSquares;

const start = () => {
	allSquares = 0;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	clearInterval(squaresInterval);
	progressBarStart('start', 20, 100);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	container.style.display = 'none';
	containerText.style.display = 'none';
	document.getElementById('hackFunction2').style.display = 'none';
	clearInterval(squaresInterval);
	progressBarStart('end', 20, 100);
};

function progressBarStart(type, time, width) {
	const process = () => {
		if (width > 0) {
			width--;
			progressBarId.style.width = width + '%';
		} else {
			if (type == 'start') {
				container.style.display = '';
				containerText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarId.style.width = '100%';
				progressBarStart('game', 400, 100);
				createNumbers();
				return;
			}

			if (type == 'game') {
				container.style.display = 'none';
				containerText.style.display = '';
				progressBarId.style.width = '100%';

				hackInfo.style.display = 'block';
				textInfo.innerHTML = 'Hack Udany';
				//container.style.opacity = "0";
				containerText.style.display = 'none';

				document.getElementById('hackFunction2').style.display = 'none';
				clearInterval(squaresInterval);
				progressBarStart('end', 20, 100);
				return;
			} else if (type == 'end') {
				container.style.display = 'none';
				containerText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
				progressBarId.style.width = '100%';
			}

			clearInterval(progressBarInterval);
		}
	};

	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function createNumbers() {
	container.innerHTML = '';

	let currentIndex = 0;

	while (currentIndex <= 48) {
		const el = document.createElement('div');
		el.classList.add('el');
		el.setAttribute('id', currentIndex);

		container.appendChild(el);

		el.onclick = function () {
			if (el.classList.contains('select')) {
				el.classList.remove('select');
				allSquares--;
			} else gameOver();
		};

		currentIndex++;
	}

	var random;
	squaresInterval = setInterval(() => {
		random = Math.floor(Math.random() * 47);
		if (!document.getElementById(random).classList.contains('select')) {
			document.getElementById(random).classList.add('select');
			allSquares++;
		} else {
			random = Math.floor(Math.random() * 47);
			document.getElementById(random).classList.add('select');
			allSquares++;
		}

		if (allSquares > 10) gameOver();
	}, 350);

	document.getElementById('hackFunction2').style.display = '';
}

container.style.display = 'none';
containerText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';
document.getElementById('hackFunction2').style.display = 'none';

document.getElementById('hackFunction2').onclick = function () {
	gameOver();
};
