const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const textInfo2 = document.getElementById('textInfo2');
const progressBarId = document.getElementById('progress-bar');
const squareList = document.querySelector('.squareList');

var __timePlay1 = 5;
var __timePlay2 = 45;
var progressBarInterval;
var allClickSquare = 0;
var allClickSquareGood = 0;

let colorSelect = 0;
const numbers = [];

const gameInit = () => {
	hackFunction.style.display = 'none';
	squareList.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());

	for (let i = 1; i <= 6; i++) {
		document.getElementById('color' + i).onclick = function () {
			for (let i = 1; i <= 6; i++) {
				document.getElementById('color' + i).classList.remove('click');
			}
			this.classList.add('click');
			colorSelect = this.id;
		};
	}
};

const gameStart = () => {
	allClickSquareGood = 0;
	allClickSquare = 0;
	colorSelect = 0;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	for (let i = 1; i <= 6; i++) {
		document.getElementById('color' + i).classList.remove('click');
	}
	progressBarStart('start', 2);
};

const gameWin = () => {
	hackFunction.innerHTML = '';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	squareList.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameOver = () => {
	hackFunction.innerHTML = '';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	squareList.style.display = 'none';
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
				squareList.style.display = '';
				textInfo2.textContent = 'Zapamiętaj';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				randomColors(6, 49);
				progressBarStart('game', __timePlay1);
				return;
			}
			if (type == 'game') {
				textInfo2.textContent = 'Uzupełnij Przewód';
				squareList.style.display = 'none';
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				createBox();
				progressBarStart('next', __timePlay2);
				return;
			}
			if (type == 'next') {
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

function createBox() {
	hackFunction.innerHTML = '';

	var width = 7;
	var height = 7;

	for (var i = 0; i < width * height; i++) {
		const el = document.createElement('div');
		el.classList.add('el');

		if (i < numbers[0]) {
			el.setAttribute('id', 'blue');
		}
		if (i >= numbers[0] && i <= numbers[0] + numbers[1]) {
			el.setAttribute('id', 'green');
		}
		if (i >= numbers[0] + numbers[1] && i < numbers[0] + numbers[1] + numbers[2]) {
			el.setAttribute('id', 'red');
		}
		if (i >= numbers[0] + numbers[1] + numbers[2] && i < numbers[0] + numbers[1] + numbers[2] + numbers[3]) {
			el.setAttribute('id', 'orange');
		}
		if (i >= numbers[0] + numbers[1] + numbers[2] + numbers[3] && i < numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4]) {
			el.setAttribute('id', 'pink');
		}

		if (i >= numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4] && i < numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4] + numbers[5]) {
			el.setAttribute('id', 'yellow');
		}

		hackFunction.appendChild(el);

		el.onclick = function () {
			let color;
			if (colorSelect == 'color1') color = 'blue';
			if (colorSelect == 'color2') color = 'green';
			if (colorSelect == 'color3') color = 'red';
			if (colorSelect == 'color4') color = 'orange';
			if (colorSelect == 'color5') color = 'pink';
			if (colorSelect == 'color6') color = 'yellow';

			if (colorSelect != 0) {
				if (hasClass(this, 'blue') || hasClass(this, 'green') || hasClass(this, 'red') || hasClass(this, 'orange') || hasClass(this, 'pink') || hasClass(this, 'yellow')) return;
				this.classList.add(color);
				allClickSquare++;
			}

			for (var i = 0; i < width * height; i++) {
				if (this.classList[1] === this.id) {
					this.classList.add('good');
					allClickSquareGood++;
					break;
				}
			}

			if (allClickSquareGood >= width * height && allClickSquareGood >= width * height) gameWin();
			else if (allClickSquare >= width * height && allClickSquareGood < width * height) gameOver();
		};
	}
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

	for (let i = 1; i <= 6; i++) {
		document.getElementById('count' + i).textContent = numbers[i - 1];
	}
}

function hasClass(element, className) {
	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
