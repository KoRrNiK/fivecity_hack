const check = document.querySelector('.check');
const inputs = document.querySelectorAll('.input');
const operators = document.querySelectorAll('.op');
const reset = document.querySelector('.reset');
const all = document.querySelector('.all');

let solutions = [];
let clickAll = 0;

const solverInit = () => {
	inputs.forEach(item => {
		item.pattern = '\\d+';

		item.addEventListener('input', function (event) {
			if (isNaN(event.target.value)) {
				event.target.value = event.target.value.slice(0, -1);
			}
		});
	});

	operators.forEach(item => {
		item.pattern = '[x+-]';

		item.addEventListener('input', function () {
			if (this.value.length > 1) {
				this.value = this.value.slice(0, 1);
			}
		});
		item.addEventListener('keypress', function (event) {
			if (!/^[\+\-\xX]$/.test(event.key)) {
				event.preventDefault();
			}
		});
	});

	check.addEventListener('click', () => check_math());
	all.addEventListener('click', () => change_value());

	reset.addEventListener('click', () => {
		const elements = document.querySelectorAll('input');
		for (let i = 0; i < elements.length; i++) elements[i].value = '';
	});

	document.addEventListener('input', event => {
		if (!event.target.matches('[number]')) return;

		const value = event.target.value;
		const pos = event.target.getAttribute('pos-on-board');
		let typePos;

		switch (true) {
			case pos.startsWith('top-'):
				typePos = pos.replace('top-', 'bottom-');
				break;
			case pos.startsWith('right-'):
				typePos = pos.replace('right-', 'left-');
				break;
			case pos.startsWith('bottom-'):
				typePos = pos.replace('bottom-', 'top-');
				break;
			case pos.startsWith('left-'):
				typePos = pos.replace('left-', 'right-');
				break;
		}
		document.querySelector(`[pos-on-board="${typePos}"]`).value = value;
	});
};

function check_math() {
	all.textContent = '0/0';

	const areInputsFilled = Array.from(inputs).every(input => {
		return input.value !== '';
	});

	const areOperatorsFilled = Array.from(operators).every(op => {
		return op.value !== '';
	});

	if (!areInputsFilled) return;
	if (!areOperatorsFilled) return;

	let resultValues = Array.from(document.querySelectorAll('[result-value]')).map(resultValueElement => resultValueElement.value);
	resultValues.unshift(undefined);

	let symbols = Array.from(document.querySelectorAll('[symbol]'))
		.map(symbolElement => symbolElement.value)
		.map(symbol => (symbol == 'x' ? '*' : symbol == 'X' ? '*' : symbol));
	symbols.unshift(undefined);

	let utln, utmn, utrn, umln, ummn, umrn, ubln, ubmn, ubrn;

	let firstEquals = [],
		secondEquals = [],
		thirdEquals = [];

	for (uln = 0; uln < 10; uln++) {
		for (umn = 0; umn < 10; umn++) {
			for (urn = 0; urn < 10; urn++) {
				if (eval(`${uln}${symbols[1]}${umn}${symbols[2]}${urn}==${resultValues[4]}`)) {
					firstEquals.push([uln, umn, urn]);
				}
				if (eval(`${uln}${symbols[6]}${umn}${symbols[7]}${urn}==${resultValues[5]}`)) {
					secondEquals.push([uln, umn, urn]);
				}
				if (eval(`${uln}${symbols[11]}${umn}${symbols[12]}${urn}==${resultValues[6]}`)) {
					thirdEquals.push([uln, umn, urn]);
				}
			}
		}
	}

	solutions = [];
	clickAll = 0;

	for (const fisrtEqual of firstEquals) {
		for (const secondEqual of secondEquals) {
			for (const thirdEqual of thirdEquals) {
				[utln, utmn, utrn] = fisrtEqual;
				[umln, ummn, umrn] = secondEqual;
				[ubln, ubmn, ubrn] = thirdEqual;
				const isSolution =
					eval(`${utln}${symbols[3]}${umln}${symbols[8]}${ubln}==${resultValues[1]}`) &&
					eval(`${utmn}${symbols[4]}${ummn}${symbols[9]}${ubmn}==${resultValues[2]}`) &&
					eval(`${utrn}${symbols[5]}${umrn}${symbols[10]}${ubrn}==${resultValues[3]}`);

				if (isSolution) {
					let solution = [];
					for (let i = 0; i < 3; i++) {
						for (let x = 0; x < 3; x++) {
							const type = x => {
								return x == 0 ? fisrtEqual[i] : x == 1 ? secondEqual[i] : thirdEqual[i];
							};
							solution.push(type(x));
						}
					}
					solutions.push(solution);
				}
			}
		}
	}

	if (solutions.length > 0) {
		for (let i = 0; i < 3; i++) {
			for (let x = 0; x < 3; x++) {
				document.getElementById('R' + x + '_' + i).value = solutions[0][x + i * 3];
			}
		}
		all.textContent = 1 + '/' + solutions.length;
	} else {
		for (let i = 0; i < 3; i++) {
			for (let x = 0; x < 3; x++) {
				document.getElementById('R' + x + '_' + i).value = '';
			}
		}
		all.textContent = '0/0';
	}
}

function change_value() {
	if (solutions.length > 0) {
		let size = solutions.length;

		clickAll = (clickAll + 1) % solutions.length;

		all.textContent = clickAll + 1 + '/' + solutions.length;

		for (let i = 0; i < 3; i++) {
			for (let x = 0; x < 3; x++) {
				document.getElementById('R' + x + '_' + i).value = solutions[clickAll][x + i * 3];
			}
		}
	}
}

solverInit();
