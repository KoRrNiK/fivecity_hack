const body = document.querySelector('body');
const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const textInfo1 = document.getElementById('textInfo1');
const progressBarId = document.getElementById('progress-bar');
const hackValue = document.getElementById('hackValue');
const hackMemoryValue = document.getElementById('hackMemoryValue');

var __timePlay = 10;
var progressBarInterval;
var passwordValue = '';
var check_passwoord = false;

const gameInit = () => {
	body.addEventListener('keypress', function (event) {
		if (!check_passwoord) return;

		if (event.key === 'Enter') {
			if (checkResult(hackMemoryValue.value)) {
				gameWin();
			} else {
				gameOver();
			}
		}
	});
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	hackMemoryValue.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	check_passwoord = false;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	hackMemoryValue.value = '';
	progressBarStart('start', 2);
};

const gameOver = () => {
	check_passwoord = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameWin = () => {
	check_passwoord = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
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
				hackValue.style.display = '';
				hackText.style.display = '';
				hackMemoryValue.style.display = 'none';
				hackInfo.style.display = 'none';
				textInfo1.innerHTML = 'Zapamiętaj ciąg znaków';
				passwordValue = randomString(12);
				hackValue.innerHTML = passwordValue.toUpperCase();
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackValue.style.display = 'none';
				hackMemoryValue.style.display = '';
				hackText.style.display = '';
				textInfo1.innerHTML = 'Wpisz ciąg znaków';
				check_passwoord = true;
				progressBarStart('result', __timePlay);
				return;
			}

			if (type == 'result') {
				hackValue.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = '';
				gameOver();
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

function randomString(length) {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

function checkResult(result) {
	return result.toUpperCase() == passwordValue.toUpperCase();
}

function resultChangeFunction() {
	valueInput.innerHTML = input.value;
}
