const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const hacklpm = document.querySelector('.hacklpm');
const hackrpm = document.querySelector('.hackrpm');

var __timePlay = 22;
var progressBarInterval;
var allSquares;
var lpm = {};
var rpm = {};
var allClickSquare = 0;

const gameInit = () => {
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	allClickSquare = 0;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
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
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay);
				createNumbers();
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

function createNumbers() {
	hackFunction.innerHTML = '';

	generatePos();

	var width = 7;
	var height = 7;

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

		el.onmousedown = function (event) {
			var clickEl = event.target;
			var good = false;
			switch (event.which) {
				case 1: {
					for (let i = 0; i < 5; i++) {
						if (
							lpm[i].x == clickEl.dataset.x &&
							lpm[i].y == clickEl.dataset.y
						) {
							good = true;
						}
					}
					if (good) {
						el.classList.add('lpm');
						allClickSquare++;
						if (allClickSquare >= 10) {
							hackInfo.style.display = 'block';
							textInfo.innerHTML = 'Hack Udany';
							hackFunction.style.display = 'none';
							hackFunction2.style.display = 'none';
							hackText.style.display = 'none';
							progressBarStart('end', 2);
						}
					} else gameOver();
					break;
				}
				case 3: {
					for (let i = 5; i < 10; i++) {
						if (
							rpm[i].x == clickEl.dataset.x &&
							rpm[i].y == clickEl.dataset.y
						) {
							good = true;
						}
					}
					if (good) {
						el.classList.add('rpm');
						allClickSquare++;
						if (allClickSquare >= 10) {
							hackInfo.style.display = 'block';
							textInfo.innerHTML = 'Hack Udany';
							hackFunction.style.display = 'none';
							hackFunction2.style.display = 'none';
							hackText.style.display = 'none';
							progressBarStart('end', 2);
						}
					} else gameOver();
					break;
				}
			}
		};
	}
	for (let j = 0; j < Math.random() * (10 - 5) + 5; j++) {
		random = Math.floor(Math.random() * 47);
		if (!document.getElementById(random).classList.contains('default')) {
			document.getElementById(random).classList.add('default');
		} else {
			random = Math.floor(Math.random() * 47);
			document.getElementById(random).classList.add('default');
		}
	}
}

function* uniqIter(a) {
	let seen = new Set();
	for (let x of a) {
		if (!seen.has(x)) {
			seen.add(x);
			yield x;
		}
	}
}

function* randomPos() {
	while (1)
		yield parseInt(
			(1 + Math.floor(Math.random() * (7 - 1 + 1)))
				.toString()
				.concat(
					(1 + Math.floor(Math.random() * (7 - 1 + 1))).toString()
				)
		);
}

function generatePos() {
	let count = 10;
	let x = 0;

	hackrpm.textContent = '';
	hacklpm.textContent = '';

	for (let r of uniqIter(randomPos())) {
		if (x < 5) {
			lpm[x] = {
				x: r.toString().slice(0, -1),
				y: r.toString().substring(1),
			};
			const el = document.createElement('div');
			el.textContent = lpm[x].x + ', ' + lpm[x].y;
			hacklpm.appendChild(el);
		} else {
			rpm[x] = {
				x: r.toString().slice(0, -1),
				y: r.toString().substring(1),
			};
			const el = document.createElement('div');
			el.textContent = rpm[x].x + ', ' + rpm[x].y;
			hackrpm.appendChild(el);
		}
		x++;
		if (--count === 0) break;
	}
}
