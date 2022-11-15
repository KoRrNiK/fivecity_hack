const hackFunction = document.querySelector('.hackFunction');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');

var __timePlay = 6666;
var progressBarInterval;
var circleInterval;
var finish = true;

var allCircles = 8;

var redTimeout, yellowTimeout, pinkTimeout, greenTimeout;

var allRed = 0,
	allYellow = 0,
	allPink = 0,
	allGreen = 0;

var clickRed = 0,
	clickYellow = 0,
	clickPink = 0,
	clickGreen = 0;

const gameInit = () => {
	gameReset();
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameReset = () => {
	const circles = document.querySelectorAll('.circle');

	circles.forEach(cir => {
		cir.remove();
	});
	allRed = 0;
	allYellow = 0;
	allPink = 0;
	allGreen = 0;

	clickRed = 0;
	clickYellow = 0;
	clickPink = 0;
	clickGreen = 0;
	clearTimeout(redTimeout);
	clearTimeout(yellowTimeout);
	clearTimeout(pinkTimeout);
	clearTimeout(greenTimeout);
	clearInterval(circleInterval);
};

const gameStart = () => {
	gameReset();
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	finish = true;
	progressBarStart('start', 2);
};

const gameOver = () => {
	gameReset();
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = '';
	finish = true;
	progressBarStart('end', 2);
};

const gameWin = () => {
	gameReset();
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack udany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = '';
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
				progressBar.style.display = 'none';
				finish = false;

				if (getRndInteger(1, 100) > 50)
					createRed(1, 1, getRndInteger(30, 120));
				if (getRndInteger(1, 100) > 50)
					createYellow(1, 1, getRndInteger(30, 120));
				if (getRndInteger(1, 100) > 50)
					createPink(1, 1, getRndInteger(30, 120));
				if (getRndInteger(1, 100) > 50)
					createGreen(1, 1, getRndInteger(30, 120));

				clearTimeout(redTimeout);
				clearTimeout(yellowTimeout);
				clearTimeout(pinkTimeout);
				clearTimeout(greenTimeout);

				if (getRndInteger(1, 100) > 50)
					createRed(1, 1, getRndInteger(-35, 0));
				if (getRndInteger(1, 100) > 50)
					createYellow(1, 1, getRndInteger(-35, 0));
				if (getRndInteger(1, 100) > 50)
					createPink(1, 1, getRndInteger(-35, 0));
				if (getRndInteger(1, 100) > 50)
					createGreen(1, 1, getRndInteger(-35, 0));

				clearTimeout(redTimeout);
				clearTimeout(yellowTimeout);
				clearTimeout(pinkTimeout);
				clearTimeout(greenTimeout);

				setTimeout(() => {
					createRed();
				}, getRndInteger(1000, 2500));

				setTimeout(() => {
					createYellow();
				}, getRndInteger(1000, 2500));

				setTimeout(() => {
					createPink();
				}, getRndInteger(1000, 2500));

				setTimeout(() => {
					createGreen();
				}, getRndInteger(1000, 2500));

				moveCircles();

				progressBarStart('game', __timePlay);
				return;
			}
			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackInfo.style.display = 'block';
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

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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

function createRed(min = 1, max = 1, pos = -35) {
	if (allRed >= allCircles) return;

	for (let i = 0; i < getRndInteger(min, max); i++) {
		const line0 = document.getElementById('line0');
		const circle = document.createElement('div');
		circle.classList.add('circle');
		circle.setAttribute('id', 'red' + allRed);
		circle.style.setProperty('--offset-color', '233 34 38');
		circle.style.setProperty('--offset-left', '-10px');
		circle.style.top = pos + 'px';
		line0.appendChild(circle);
		allRed++;
	}

	redTimeout = setTimeout(() => {
		createRed();
	}, getRndInteger(1000, 2000));
}

function createYellow(min = 1, max = 1, pos = -35) {
	if (allYellow >= allCircles) return;

	for (let i = 0; i < getRndInteger(min, max); i++) {
		const line1 = document.getElementById('line1');
		const circle = document.createElement('div');
		circle.classList.add('circle');
		circle.setAttribute('id', 'yellow' + allYellow);
		circle.style.setProperty('--offset-color', '254 231 8');
		circle.style.setProperty('--offset-left', '-10px');
		circle.style.top = pos + 'px';
		line1.appendChild(circle);
		allYellow++;
	}

	yellowTimeout = setTimeout(() => {
		createYellow();
	}, getRndInteger(1000, 2000));
}

function createPink(min = 1, max = 1, pos = -35) {
	if (allPink >= allCircles) return;

	for (let i = 0; i < getRndInteger(min, max); i++) {
		const line2 = document.getElementById('line2');
		const circle = document.createElement('div');
		circle.classList.add('circle');
		circle.setAttribute('id', 'pink' + allPink);
		circle.style.setProperty('--offset-color', '254 0 198');
		circle.style.setProperty('--offset-left', '-10px');
		circle.style.top = pos + 'px';
		line2.appendChild(circle);
		allPink++;
	}

	pinkTimeout = setTimeout(() => {
		createPink();
	}, getRndInteger(1000, 2000));
}

function createGreen(min = 1, max = 1, pos = -35) {
	if (allGreen >= allCircles) return;

	for (let i = 0; i < getRndInteger(min, max); i++) {
		const line3 = document.getElementById('line3');
		const circle = document.createElement('div');
		circle.classList.add('circle');
		circle.setAttribute('id', 'green' + allGreen);
		circle.style.setProperty('--offset-color', '55 224 8');
		circle.style.setProperty('--offset-left', '-10px');
		circle.style.top = pos + 'px';
		line3.appendChild(circle);
		allGreen++;
	}

	greenTimeout = setTimeout(() => {
		createGreen();
	}, getRndInteger(1000, 2000));
}

function moveCircles() {
	circleInterval = setInterval(function () {
		if (!finish) {
			if (
				allGreen === allCircles &&
				allPink >= allCircles &&
				allYellow === allCircles &&
				allRed === allCircles
			) {
				let allC = 0;
				const circles = document.querySelectorAll('.circle');
				circles.forEach(cir => {
					allC++;
				});

				if (!allC) gameWin();
			}

			for (let i = clickRed; i < allRed; i++) {
				var y = parseInt(
					document.getElementById('red' + i).style.top,
					10
				);

				y += 2;

				if (y >= 590) {
					gameOver();
					return;
				}

				document.getElementById('red' + i).style.top = y + 'px';
			}

			for (let i = clickYellow; i < allYellow; i++) {
				var y = parseInt(
					document.getElementById('yellow' + i).style.top,
					10
				);

				y += 2;

				if (y >= 590) {
					gameOver();
					return;
				}

				document.getElementById('yellow' + i).style.top = y + 'px';
			}

			for (let i = clickPink; i < allPink; i++) {
				var y = parseInt(
					document.getElementById('pink' + i).style.top,
					10
				);

				y += 2;

				if (y >= 590) {
					gameOver();
					return;
				}

				document.getElementById('pink' + i).style.top = y + 'px';
			}

			for (let i = clickGreen; i < allGreen; i++) {
				var y = parseInt(
					document.getElementById('green' + i).style.top,
					10
				);

				y += 2;

				if (y >= 590) {
					gameOver();
					return;
				}

				document.getElementById('green' + i).style.top = y + 'px';
			}
		}
	}, 15);
}

document.addEventListener(
	'keypress',
	event => {
		var name = event.key;
		if (finish) return;
		if (name === 'a') {
			if (
				isColliding(
					document.getElementById('red' + clickRed),
					document.getElementById('activeA')
				)
			) {
				document.getElementById('red' + clickRed).remove();
				document.getElementById('boxA').classList.add('blur');
				setTimeout(() => {
					document.getElementById('boxA').classList.remove('blur');
				}, 300);

				clickRed++;
			} else gameOver();
		}

		if (name === 's') {
			if (
				isColliding(
					document.getElementById('yellow' + clickYellow),
					document.getElementById('activeS')
				)
			) {
				document.getElementById('yellow' + clickYellow).remove();
				document.getElementById('boxS').classList.add('blur');
				setTimeout(() => {
					document.getElementById('boxS').classList.remove('blur');
				}, 300);

				clickYellow++;
			} else gameOver();
		}

		if (name === 'k') {
			if (
				isColliding(
					document.getElementById('pink' + clickPink),
					document.getElementById('activeK')
				)
			) {
				document.getElementById('pink' + clickPink).remove();
				document.getElementById('boxK').classList.add('blur');
				setTimeout(() => {
					document.getElementById('boxK').classList.remove('blur');
				}, 300);

				clickPink++;
			} else gameOver();
		}

		if (name === 'l') {
			if (
				isColliding(
					document.getElementById('green' + clickGreen),
					document.getElementById('activeL')
				)
			) {
				document.getElementById('green' + clickGreen).remove();
				document.getElementById('boxL').classList.add('blur');
				setTimeout(() => {
					document.getElementById('boxL').classList.remove('blur');
				}, 300);

				clickGreen++;
			} else gameOver();
		}
	},
	false
);
