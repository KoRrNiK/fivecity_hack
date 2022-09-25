const hackFunction = document.querySelector('.hackFunction');
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

var symbols = ['🡪', '🡨', '🡩', '🡫'];

var symbols1 = [
	['🡩', '🡨', '🡪', '🡫'],
	['🡫', '🡨', '🡩', '🡪'],
	['🡪', '🡨', '🡩', '🡫'],
	['🡪', '🡩', '🡨', '🡫'],
];

let path;

let R = 6;
let C = 6;
var arr1 = [
	[0, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
];

const start = () => {
	path = randomPath(R, C);
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
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameFinish = () => {
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
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay);
				createNumbers();
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackInfo.style.display = 'block';
				textInfo.innerHTML = 'Hack Udany';
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

function hasClass(element, className) {
	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function createNumbers() {
	hackFunction.innerHTML = '';

	var width = 6;
	var height = 6;

	for (var i = 0; i < width * height; i++) {
		const el = document.createElement('div');
		el.classList.add('el');
		if (i != 0) el.classList.add('block');

		var yCoord = Math.floor(i / width) + 1;
		var xCoord = (i % width) + 1;

		el.dataset.x = xCoord;
		el.dataset.y = yCoord;

		el.setAttribute('id', xCoord + ',' + yCoord);

		for (var j = 0; j < 4; j++) {
			const square = document.createElement('div');
			square.classList.add('smallel');
			if (i < 1 || i > 34) square.textContent = symbols[j];
			else
				square.textContent =
					symbols[Math.floor(Math.random() * symbols.length)];

			square.setAttribute('id', 's' + xCoord + ',' + yCoord);

			square.onclick = function () {
				if (el.classList.contains('aha')) return;

				if (!el.classList.contains('block')) {
					square.classList.add('checked');
					el.classList.add('block');
					el.classList.add('aha');

					let clickElement = square.textContent;

					for (var x = 0; x < 4; x++) {
						if (clickElement === symbols[x]) {
							//console.log(symbols[x]);

							if (clickElement === symbols[0]) {
								const x = Number(el.dataset.x) + 1;
								const y = Number(el.dataset.y);
								const nextElement = document.getElementById(
									x + ',' + y
								);
								if (nextElement)
									nextElement.classList.remove('block');
							}
							if (clickElement === symbols[1]) {
								const x = Number(el.dataset.x) - 1;
								const y = Number(el.dataset.y);
								const nextElement = document.getElementById(
									x + ',' + y
								);
								if (nextElement)
									nextElement.classList.remove('block');
							}
							if (clickElement === symbols[2]) {
								const x = Number(el.dataset.x);
								const y = Number(el.dataset.y) - 1;
								const nextElement = document.getElementById(
									x + ',' + y
								);
								if (nextElement)
									nextElement.classList.remove('block');
							}
							if (clickElement === symbols[3]) {
								const x = Number(el.dataset.x);
								const y = Number(el.dataset.y) + 1;
								const nextElement = document.getElementById(
									x + ',' + y
								);
								if (nextElement)
									nextElement.classList.remove('block');
							}
						}
					}

					let endSquare = document.getElementById('6,6');

					arr1[Number(el.dataset.y) - 1][
						Number(el.dataset.x) - 1
					] = 0;

					for (let index = 0; index < arr1.length; index++) {
						if (
							arr1[index] === '1' ||
							arr1[index] === '2' ||
							arr1[index] === '3' ||
							arr1[index] === '4' ||
							arr1[index] === '5'
						) {
							arr1[index] = '0';
							break;
						}
					}

					if (endSquare == el && square.textContent == symbols[3]) {
						arr1[0][0] = 0;

						if (countPaths(arr1) > 0) {
							gameFinish();
						}
					}
				}
				//	};
			};
			el.appendChild(square);
		}

		hackFunction.appendChild(el);
	}
	generateArrows();
	displayPath(R, C, path);
}

function generateArrows() {
	let x = 0,
		y = 0;

	let squareElement;

	for (let i = 0; i < path.length; i++) {
		x = Number(path[i][0]) + 1;
		y = Number(path[i][1]) + 1;
		//console.log(x + ' ' + y);

		squareElement = document.getElementById(x + ',' + y);

		var random = Math.floor(Math.random() * symbols.length);

		for (var j = 0; j < 4; j++) {
			const square = document.getElementById('s' + x + ',' + y);
			square.classList.add('smallel');

			square.textContent = symbols1[random][j];

			squareElement.appendChild(square);
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

hackFunction.style.display = 'none';
hackText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';

document.addEventListener('contextmenu', event => event.preventDefault());

function countPaths(maze) {
	if (maze[0][0] == -1) return 0;

	for (let i = 0; i < R; i++) {
		if (maze[i][0] == 0) maze[i][0] = 1;
		else break;
	}

	for (let i = 1; i < C; i++) {
		if (maze[0][i] == 0) maze[0][i] = 1;
		else break;
	}

	for (let i = 1; i < R; i++) {
		for (let j = 1; j < C; j++) {
			if (maze[i][j] == -1) continue;

			if (maze[i - 1][j] > 0) maze[i][j] = maze[i][j] + maze[i - 1][j];

			if (maze[i][j - 1] > 0) maze[i][j] = maze[i][j] + maze[i][j - 1];
		}
	}
	return maze[R - 1][C - 1] > 0 ? maze[R - 1][C - 1] : 0;
}

function randint(range) {
	return Math.floor(Math.random() * range);
}

function randomPath(sizeX, sizeY) {
	let x = R - 1;
	let path = [];
	for (let y = sizeY - 1; y >= 0; y--) {
		let upX = y ? randint(sizeX) : 0;
		while (x != upX) {
			path.push([x, y]);
			if (x < upX) x++;
			else x--;
		}
		path.push([x, y]);
	}
	for (let i = path.length - 4; i >= 0; i--) {
		if (
			i + 3 < path.length &&
			path[i][1] === path[i + 3][1] + 1 &&
			path[i][0] === path[i + 3][0]
		) {
			path.splice(i + 1, 2);
		}
	}
	return path;
}

function displayPath(sizeX, sizeY, path) {
	let grid = Array.from({ length: sizeY }, () => Array(sizeX).fill('.'));
	for (let [x, y] of path) {
		grid[y][x] = 'X';
	}
	console.log(grid.map(row => row.join(' ')).join('\n'));
}
