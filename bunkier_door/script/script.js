const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const hackOptions = document.querySelector('.hackOptions');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const tower1 = document.getElementById('a');
const tower2 = document.getElementById('b');
const tower3 = document.getElementById('c');

const towerChangeInput = document.getElementById('towerChangeInput');

var defaultBoxes = 8;
var allBoxes;

var __timePlay = 600;
var progressBarInterval;

const gameReset = () => {
	tower1.innerHTML = '';
	tower2.innerHTML = '';
	tower3.innerHTML = '';
	for (var i = 1; i <= allBoxes; i++) {
		tower1.innerHTML += '<div class="cube" id="tower_' + i + '" draggable="true"></div>';
	}
	draged_drop();
};

const gameInit = () => {
	gameReset();
	document.getElementById('towerChangeId').innerHTML = String(defaultBoxes);
	hackOptions.style.display = '';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	gameReset();
	hackOptions.style.display = 'none';
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	progressBarStart('start', 2);
};

const gameOver = () => {
	gameReset();
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBarStart('end', 2);
};

const gameWin = () => {
	gameReset();
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
			else if (type == 'game') width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
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
				hackOptions.style.display = '';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function draged_drop() {
	var tower = document.querySelectorAll('div#hackFunction > div > div');
	var boxes = document.querySelectorAll('div#hackFunction > div');

	for (var i = 0; i < tower.length; i++) {
		tower[i].addEventListener('dragstart', dragStart, false);
		tower[i].addEventListener('dragend', stopDrag, false);
	}
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('dragenter', e => e.preventDefault(), false);
		boxes[i].addEventListener('dragover', e => e.preventDefault(), false);
		boxes[i].addEventListener('drop', dropFinal, false);
	}
}

function dragStart(e) {
	var body = e.target.parentNode;
	if (body.childNodes[0].id === e.target.id) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('Text', e.target.id);
	}
}
function stopDrag(e) {
	e.preventDefault();
	var final = document.getElementById('c');
	if (final.childNodes.length == allBoxes) {
		gameWin();
	}
}

function dropFinal(e) {
	e.preventDefault();
	var boxes = e.target;
	var body = document.getElementById(boxes.id).childNodes;
	var item = e.dataTransfer.getData('Text');

	if (
		compareArray(body, item) &&
		boxes.id != 'tower_1' &&
		boxes.id != 'tower_2' &&
		boxes.id != 'tower_3' &&
		boxes.id != 'tower_4' &&
		boxes.id != 'tower_5' &&
		boxes.id != 'tower_6' &&
		boxes.id != 'tower_7' &&
		boxes.id != 'tower_8' &&
		boxes.id != 'tower_9' &&
		boxes.id != 'tower_10' &&
		item != ''
	) {
		var rem = document.getElementById(item);
		rem.parentNode.removeChild(rem);
		boxes.innerHTML = '<div class="cube" id="' + item + '" draggable="true"></div>' + boxes.innerHTML;
	}

	draged_drop();
}

function compareArray(array, string) {
	if (array[0] == undefined) string = true;
	else var string = string.split('_')[1] < array[0].id.split('_')[1] ? true : false;
	return string;
}

function towerChangeFunction() {
	document.getElementById('towerChangeId').innerHTML = towerChangeInput.value;
	allBoxes = towerChangeInput.value;
}
