const hackFunction = document.querySelector('.hackFunction');
const hacButtons = document.querySelector('.hacButtons');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');

var progressBarInterval;
var allSquares;

var __timePlay = 240;

var symbols = ['+', '-', 'x'];
var random = {};

const start = () => {
	allSquares = 0;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	resetAllInputs();
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hacButtons.style.display = 'none';
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
				hacButtons.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay);
				createSymbols();
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hacButtons.style.display = 'none';
				hackInfo.style.display = 'block';
				textInfo.innerHTML = 'Hack Udany';
				hackText.style.display = 'none';
				progressBarStart('end', 2);
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hacButtons.style.display = 'none';
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

function createSymbols() {
	for (let i = 0; i < 6; i++) {
		random[i] = Math.floor(Math.random() * 11);
	}

	for (let i = 0; i < 12; i++) {
		document.getElementById('symbol' + i).innerHTML =
			symbols[Math.floor(Math.random() * symbols.length)];

		document.getElementById('number' + i).innerHTML = random[i % 6];
	}
}

function checkValue1() {
	let a = document.getElementById('input0').value;
	let b = document.getElementById('input1').value;
	let c = document.getElementById('input2').value;

	let d = document.getElementById('symbol2').textContent;
	let e = document.getElementById('symbol7').textContent;

	var val1 = 0;
	var val2 = 0;

	if (e === 'x') val1 = Number(b) * Number(c);
	else if (e === '+') val1 = Number(b) + Number(c);
	else if (e === '-') val1 = Number(b) - Number(c);

	if (d === 'x') val2 = Number(val1) * Number(a);
	else if (d === '+') val2 = Number(val1) + Number(a);
	else if (d === '-') val2 = Number(val1) - Number(a);

	if (val2 === random[0]) {
		console.log('CHECK1 ' + val2);
		return true;
	} else return false;
}

function checkValue2() {
	let a = document.getElementById('input3').value;
	let b = document.getElementById('input4').value;
	let c = document.getElementById('input5').value;

	let d = document.getElementById('symbol3').textContent;
	let e = document.getElementById('symbol8').textContent;

	var val1 = 0;
	var val2 = 0;

	if (e === 'x') val1 = Number(b) * Number(c);
	else if (e === '+') val1 = Number(b) + Number(c);
	else if (e === '-') val1 = Number(b) - Number(c);

	if (d === 'x') val2 = Number(val1) * Number(a);
	else if (d === '+') val2 = Number(val1) + Number(a);
	else if (d === '-') val2 = Number(val1) - Number(a);

	if (val2 === random[1]) {
		console.log('CHECK2 ' + val2);
		return true;
	} else return false;
}

function checkValue3() {
	let a = document.getElementById('input6').value;
	let b = document.getElementById('input7').value;
	let c = document.getElementById('input8').value;

	let d = document.getElementById('symbol4').textContent;
	let e = document.getElementById('symbol9').textContent;

	var val1 = 0;
	var val2 = 0;

	if (e === 'x') val1 = Number(b) * Number(c);
	else if (e === '+') val1 = Number(b) + Number(c);
	else if (e === '-') val1 = Number(b) - Number(c);

	if (d === 'x') val2 = Number(val1) * Number(a);
	else if (d === '+') val2 = Number(val1) + Number(a);
	else if (d === '-') val2 = Number(val1) - Number(a);

	if (val2 === random[2]) {
		console.log('CHECK3 ' + val2);
		return true;
	} else return false;
}

function checkValue4() {
	let a = document.getElementById('input0').value;
	let b = document.getElementById('input3').value;
	let c = document.getElementById('input6').value;

	let d = document.getElementById('symbol0').textContent;
	let e = document.getElementById('symbol1').textContent;

	var val1 = 0;
	var val2 = 0;

	if (e === 'x') val1 = Number(b) * Number(c);
	else if (e === '+') val1 = Number(b) + Number(c);
	else if (e === '-') val1 = Number(b) - Number(c);

	if (d === 'x') val2 = Number(val1) * Number(a);
	else if (d === '+') val2 = Number(val1) + Number(a);
	else if (d === '-') val2 = Number(val1) - Number(a);

	if (val2 === random[3]) {
		console.log('CHECK4 ' + val2);
		return true;
	} else {
		console.log('NOP ' + val2);
		return false;
	}
}

function checkValue5() {
	let a = document.getElementById('input1').value;
	let b = document.getElementById('input4').value;
	let c = document.getElementById('input7').value;

	let d = document.getElementById('symbol5').textContent;
	let e = document.getElementById('symbol6').textContent;

	var val1 = 0;
	var val2 = 0;

	if (e === 'x') val1 = Number(b) * Number(c);
	else if (e === '+') val1 = Number(b) + Number(c);
	else if (e === '-') val1 = Number(b) - Number(c);

	if (d === 'x') val2 = Number(val1) * Number(a);
	else if (d === '+') val2 = Number(val1) + Number(a);
	else if (d === '-') val2 = Number(val1) - Number(a);

	if (val2 === random[4]) {
		console.log('CHECK5 ' + val2);
		return true;
	} else return false;
}

function checkValue6() {
	let a = document.getElementById('input2').value;
	let b = document.getElementById('input5').value;
	let c = document.getElementById('input8').value;

	let d = document.getElementById('symbol10').textContent;
	let e = document.getElementById('symbol11').textContent;

	var val1 = 0;
	var val2 = 0;

	if (e === 'x') val1 = Number(b) * Number(c);
	else if (e === '+') val1 = Number(b) + Number(c);
	else if (e === '-') val1 = Number(b) - Number(c);

	if (d === 'x') val2 = Number(val1) * Number(a);
	else if (d === '+') val2 = Number(val1) + Number(a);
	else if (d === '-') val2 = Number(val1) - Number(a);

	if (val2 === random[5]) {
		console.log('CHECK6 ' + val2);
		return true;
	} else return false;
}

function checkValueAll() {
	if (
		checkValue1() &&
		checkValue2() &&
		checkValue3() &&
		checkValue4() &&
		checkValue5() &&
		checkValue6()
	) {
		hackInfo.style.display = 'block';
		textInfo.innerHTML = 'Hack Udany';
		hackFunction.style.display = 'none';
		hacButtons.style.display = 'none';
		hackText.style.display = 'none';
		progressBarStart('end', 2);
		return true;
	} else {
		gameOver();
		return false;
	}
}

function resetAllInputs() {
	for (let i = 0; i < 9; i++) {
		document.getElementById('input' + i).value = '';
	}
}

hackFunction.style.display = 'none';
hacButtons.style.display = 'none';
hackText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';

document.addEventListener('contextmenu', event => event.preventDefault());
