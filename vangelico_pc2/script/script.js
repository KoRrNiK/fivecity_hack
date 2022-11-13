const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const levelHack = document.getElementById('levelHack');
const hackCorrect = document.getElementById('hackCorrect');
const input = document.getElementsByClassName('input')[0];

var __timePlay = 200;
var progressBarInterval;
var check = true;
var stageLevel = 0;
var allCircles = 625;
let allSelect = 0;

const gameInit = () => {
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	stageLevel = 0;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	check = true;
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	check = true;
	progressBarStart('end', 2);
};

const gameWin = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	check = true;
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
				hackCorrect.style.display = 'none';
				check = false;
				createNumbers();
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'next') {
				check = false;
				input.value = '';
				hackCorrect.style.display = 'none';
				levelHack.textContent = stageLevel + '/5';
				createNumbers();

				if (stageLevel >= 5) {
					gameWin();
					return;
				}

				progressBarStart('game', __timePlay);
			}

			if (type == 'game') {
				input.value = '';
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				hackCorrect.style.display = 'none';
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

function createNumbers() {
	hackFunction.innerHTML = '';

	stageLevel++;

	levelHack.textContent = stageLevel + '/5';

	var currentIndex = 0;
	allSelect = 0;
	let random = getRndInteger(100, 500);

	while (currentIndex < 625) {
		const el = document.createElement('div');
		el.classList.add('el');
		el.setAttribute('id', currentIndex);

		if (allSelect <= random) {
			el.classList.add('select');
			allSelect++;
		}

		hackFunction.appendChild(el);

		currentIndex++;
	}
	console.log(allSelect);
	let percent = Math.floor((allSelect * 10) / 100);

	//console.log(percent);
	//console.log(allSelect - percent);
	//console.log(allSelect + percent);

	var frag = document.createDocumentFragment();
	while (hackFunction.children.length) {
		frag.appendChild(
			hackFunction.children[
				Math.floor(Math.random() * hackFunction.children.length)
			]
		);
	}
	hackFunction.appendChild(frag);
}

input.addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		if (!check) checkClick();
	}
});

function checkClick() {
	let percent = Math.floor(
		Math.abs(
			((allSelect - parseInt(input.value)) / parseInt(input.value)) * 100
		)
	);

	hackCorrect.style.display = '';
	document.getElementById('correct').textContent = allSelect;

	document.getElementById('percent').textContent = percent + '%';

	if (percent <= 10) {
		progressBarStart('next', 2);
	} else {
		progressBarStart('game', 2);
	}

	check = true;
}
