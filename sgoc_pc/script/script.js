const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const textInfo2 = document.getElementById('textInfo2');
const progressBarId = document.getElementById('progress-bar');
const keyboard = document.getElementById('hackKeyboard');

var __timePlay = 240;

var progressBarInterval;

let guessesRemaining = 6;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = '';

const gameInit = () => {
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	keyboard.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
	createKeyboard();
};

const gameStart = () => {
	randomString();
	createKeyboard();
	nextLetter = 0;
	currentGuess = [];
	textInfo2.textContent = 'Złam hasło';
	guessesRemaining = 6;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	progressBarStart('start', 2);
};

const gameWin = () => {
	hackInfo.style.display = 'none';
	textInfo2.textContent = 'Hack Udany!';
	progressBarStart('end', 8);
};

const gameOver = () => {
	hackInfo.style.display = 'none';
	textInfo2.textContent = 'Hack nieudany! (Hasło: ' + rightGuessString + ')';
	progressBarStart('end', 7);
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
				keyboard.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay);
				createBox();
				return;
			}
			if (type == 'game') {
				gameOver();
				return;
			}
			if (type == 'end') {
				hackFunction.style.display = 'none';
				keyboard.style.display = 'none';
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

	var width = 5;
	var height = 6;

	for (var i = 0; i < height; i++) {
		const box = document.createElement('div');
		box.classList.add('row');

		for (var x = 0; x < width; x++) {
			const el = document.createElement('div');
			el.classList.add('el');
			box.appendChild(el);
		}

		hackFunction.appendChild(box);
	}
}

function hasClass(element, className) {
	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function randomString() {
	rightGuessString =
		COLLECTION[Math.floor(Math.random() * COLLECTION.length)];

	let POLISHSYMBOLS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż', 'ł'];
	for (let x = 0; x < POLISHSYMBOLS.length; x++) {
		if (rightGuessString.includes(POLISHSYMBOLS[x])) {
			randomString();
			continue;
		}
	}

	console.log(rightGuessString);
}

function shadeKeyBoard(letter, color) {
	for (const elem of document.getElementsByClassName('hackKeyboardButton')) {
		if (elem.textContent === letter) {
			let oldColor = elem.style.backgroundColor;
			if (oldColor === 'rgba(40 86 78)') return;

			if (oldColor === 'rgba(64 54 86)' && color !== 'rgba(40 86 78)')
				return;

			elem.style.backgroundColor = color;
			break;
		}
	}
}

function deleteLetter() {
	let row = document.getElementsByClassName('row')[6 - guessesRemaining];
	let box = row.children[nextLetter - 1];
	box.textContent = '';
	box.classList.remove('filled-box');
	currentGuess.pop();
	nextLetter -= 1;
}

function checkGuess() {
	let row = document.getElementsByClassName('row')[6 - guessesRemaining];
	let guessString = '';
	let rightGuess = Array.from(rightGuessString);

	for (const val of currentGuess) guessString += val;
	if (guessString.length != 5) return;
	if (!COLLECTION.includes(guessString)) return;

	for (let i = 0; i < 5; i++) {
		let letterColor = '';
		let box = row.children[i];
		let letter = currentGuess[i];

		let letterPosition = rightGuess.indexOf(currentGuess[i]);
		let none = false;
		if (letterPosition === -1) {
			letterColor = 'rgba(14 14 14)';
			none = true;
		} else {
			if (currentGuess[i] === rightGuess[i])
				letterColor = 'rgba(40 86 78)';
			else letterColor = 'rgba(64 54 86)';
			rightGuess[letterPosition] = '#';
		}

		if (!none) box.style.backgroundColor = letterColor;
		shadeKeyBoard(letter, letterColor);
	}

	if (guessString === rightGuessString) {
		guessesRemaining = 0;
		gameWin();
		return;
	} else {
		guessesRemaining -= 1;
		currentGuess = [];
		nextLetter = 0;

		if (guessesRemaining === 0) gameOver();
	}
}

function insertLetter(pressedKey) {
	if (nextLetter === 5) return;

	pressedKey = pressedKey.toLowerCase();

	let row = document.getElementsByClassName('row')[6 - guessesRemaining];
	let box = row.children[nextLetter];
	box.textContent = pressedKey;
	box.classList.add('filled-box');
	currentGuess.push(pressedKey);
	nextLetter += 1;
}

document.addEventListener('keyup', e => {
	if (guessesRemaining === 0) return;

	let pressedKey = String(e.key);
	for (let i = 1; i <= 12; i++) {
		if (pressedKey === 'F' + i) return;
	}

	if (pressedKey === 'Backspace' && nextLetter !== 0) {
		deleteLetter();
		return;
	}

	if (pressedKey === 'Enter') {
		checkGuess();
		return;
	}

	let found = pressedKey.match(/[a-z]/gi);
	if (!found || found.length > 1) return;
	else insertLetter(pressedKey);
});

keyboard.addEventListener('click', e => {
	const target = e.target;

	if (!target.classList.contains('hackKeyboardButton')) return;

	let key = target.textContent;

	if (key === 'Del') key = 'Backspace';

	document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
});

function createKeyboard() {
	keyboard.innerHTML = `
		<div>
			<div class="hackKeyboardButton">q</div>
			<div class="hackKeyboardButton">w</div>
			<div class="hackKeyboardButton">e</div>
			<div class="hackKeyboardButton">r</div>
			<div class="hackKeyboardButton">t</div>
			<div class="hackKeyboardButton">y</div>
			<div class="hackKeyboardButton">u</div>
			<div class="hackKeyboardButton">i</div>
			<div class="hackKeyboardButton">o</div>
			<div class="hackKeyboardButton">p</div>
		</div>
		<div style="margin: 15px 0;">
			<div class="hackKeyboardButton">a</div>
			<div class="hackKeyboardButton">s</div>
			<div class="hackKeyboardButton">d</div>
			<div class="hackKeyboardButton">f</div>
			<div class="hackKeyboardButton">g</div>
			<div class="hackKeyboardButton">h</div>
			<div class="hackKeyboardButton">j</div>
			<div class="hackKeyboardButton">k</div>
			<div class="hackKeyboardButton">l</div>
		</div>
		<div>
			<div class="hackKeyboardButton">z</div>
			<div class="hackKeyboardButton">x</div>
			<div class="hackKeyboardButton">c</div>
			<div class="hackKeyboardButton">v</div>
			<div class="hackKeyboardButton">b</div>
			<div class="hackKeyboardButton">n</div>
			<div class="hackKeyboardButton">m</div>
		</div>`;
}
