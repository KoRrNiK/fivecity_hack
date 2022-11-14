const body = document.querySelector('body');
const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const levelHack = document.getElementById('levelHack');
const input = document.getElementById('resultChangeInput');
const valueInput = document.getElementById('resultChangeId');
const upF1 = document.getElementById('upF1');
const dnF1 = document.getElementById('dnF1');
const upF2 = document.getElementById('upF2');
const dnF2 = document.getElementById('dnF2');
const resault = document.getElementById('resault');
const symbol = document.getElementById('symbol');

var __timePlay = 20;
var progressBarInterval;
var stageLevel = 0;
var check = false;

const gameInit = () => {
	body.addEventListener('keypress', function (event) {
		if (event.key === 'Enter' && check) {
			if (input.value == resaultQuestion) {
				generateQuestion();
				levelHack.textContent = stageLevel + '/5';
				if (stageLevel > 5) {
					gameWin();
					return;
				}
				progressBarStart('game', __timePlay);
			} else gameOver();
		}
	});
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	stageLevel = 0;
	check = false;
	levelHack.textContent = '1/5';
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
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = true;
				generateQuestion();
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

let resaultQuestion = 0;

function generateQuestion() {
	let a1 = getRndInteger(1, 10);
	let a2 = getRndInteger(1, 10);

	dnF1.textContent = a1;
	dnF2.textContent = a2;
	upF1.textContent = getRndInteger(1, a1);
	upF2.textContent = getRndInteger(1, a2);

	let a3 = Math.random() < 0.5 ? true : false;
	symbol.textContent = a3 ? '+' : '-';

	let a4 = a3
		? addition(
				parseInt(upF1.textContent),
				parseInt(upF2.textContent),
				parseInt(dnF1.textContent),
				parseInt(dnF2.textContent)
		  )
		: subtraction(
				parseInt(upF1.textContent),
				parseInt(upF2.textContent),
				parseInt(dnF1.textContent),
				parseInt(dnF2.textContent)
		  );

	resault.textContent = a4[1];

	if (a4[0] < 0) {
		generateQuestion();
	} else {
		console.log(a4);
		stageLevel++;
		input.value = 0;
		input.max = a4[0] + getRndInteger(0, 50);
		resaultQuestion = a4[0];
		valueInput.innerHTML = 0;
	}
}

function addition(u1, u2, d1, d2) {
	var a1 = u1 * d2 + u2 * d1;
	var a2 = d1 * d2;
	return [a1, a2];
}
function subtraction(u1, u2, d1, d2) {
	var a1 = u1 * d2 - u2 * d1;
	var a2 = d1 * d2;
	return [a1, a2];
}

function resultChangeFunction() {
	valueInput.innerHTML = input.value;
}
