const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const circle = document.getElementById('circle');

var progressBarInterval;
var finish = true;

var __timePlay = 30;

var keyCodes = { left: 65, up: 87, right: 68, down: 83 },
	keys = [];

const start = () => {
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj się...';
	circle.style.top = 270 + 'px';
	circle.style.left = 10 + 'px';
	finish = true;
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	finish = true;
	progressBarStart('end', 2);
};

const gameFinish = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	finish = true;
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
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				finish = false;
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackInfo.style.display = 'block';
				textInfo.innerHTML = 'Hack nieudany';
				hackText.style.display = 'none';
				gameOver();
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

hackFunction.style.display = 'none';
hackText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';

document.addEventListener('contextmenu', event => event.preventDefault());

window.addEventListener('keydown', function (evt) {
	keys[evt.keyCode] = true;
});

window.addEventListener('keyup', function (evt) {
	keys[evt.keyCode] = false;
});

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

for (let i = 1; i < 16; i++) {
	document.getElementById('line' + i).style.top =
		getRndInteger(-40, -450) + 'px';
}

let lineMove = [];

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

setInterval(function () {
	if (!finish) {
		for (let i = 0; i < 30; i++) {
			if (isColliding(circle, document.getElementById(i))) {
				gameOver();
				break;
			}
		}

		for (let i = 1; i < 16; i++) {
			var y = parseInt(document.getElementById('line' + i).style.top, 10);

			let randomY = getRndInteger(-400, -450);

			if (y < randomY) {
				lineMove[i] = true;
			}

			if (y > randomY && !lineMove[i]) {
				y--;
			} else if (y < getRndInteger(-40, -60) && lineMove[i]) {
				y++;
			} else lineMove[i] = false;

			document.getElementById('line' + i).style.top = y + 'px';
		}

		var x = parseInt(circle.style.left, 10),
			y = parseInt(circle.style.top, 10);

		if (keys[keyCodes.left]) {
			if (x > 0) x -= 1;
		} else if (keys[keyCodes.right]) {
			if (x < 700) x += 1;
		}

		if (keys[keyCodes.up]) {
			if (y > 0) y -= 1;
		} else if (keys[keyCodes.down]) {
			if (y < 590) y += 1;
		}

		circle.style.left = x + 'px';
		circle.style.top = y + 'px';

		if (x >= 650) {
			gameFinish();
		}
	}
}, 15);
