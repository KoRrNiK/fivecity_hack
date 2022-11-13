const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const circle = document.querySelector('.circle');
const body = document.querySelector('body');

var __timePlay = 20;
var progressBarInterval;
var circleInterval;
var check = false;
const defaultSetting = { x: 330, y: 320 };
var circleSettings = {
	x: defaultSetting.x,
	y: defaultSetting.y,
	dx: 1,
	dy: 1,
	speed: 1.25,
};

const gameInit = () => {
	body.onmouseover = body.onmouseout = body.onmousemove = moveMouse;
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	check = false;
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	check = false;
	progressBarStart('end', 2);
};

const gameWin = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	check = false;
	progressBarStart('end', 2);
};

function progressBarStart(type, time) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else if (type == 'game' && check) width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = false;

				circleSettings.dy = Math.random() < 0.5 ? 1 : -1;
				circleSettings.dx = Math.random() < 0.5 ? 1 : -1;
				circleSettings.x = defaultSetting.x;
				circleSettings.y = defaultSetting.y;
				circle.style.left = `${circleSettings.x}px`;
				circle.style.bottom = `${circleSettings.y}px`;

				clearInterval(circleInterval);
				setTimeout(() => {
					circleInterval = setInterval(() => {
						mover();
					}, 20);
					check = true;
				}, 1000);
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameWin();
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

function mover() {
	if (circleSettings.x > 637 || circleSettings.x < 0) circleSettings.dx *= -1;
	if (circleSettings.y > 576 || circleSettings.y < 0) circleSettings.dy *= -1;
	circleSettings.x += circleSettings.dx * circleSettings.speed;
	circleSettings.y += circleSettings.dy * circleSettings.speed;
	circle.style.left = `${circleSettings.x}px`;
	circle.style.bottom = `${circleSettings.y}px`;
}

function isColliding(a, b) {
	const rect1 = a.getBoundingClientRect();
	const rect2 = b.getBoundingClientRect();
	const isInHoriztonalBounds =
		rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
	const isInVerticalBounds =
		rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
	const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
	return isOverlapping;
}

function moveMouse(event) {
	if (!check) return;

	let id = event.target.id;

	if (id !== 'circle') gameOver();

	return false;
}
