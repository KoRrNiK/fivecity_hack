let includeLetters;
let excludeLetters;
let correctLetters = [null, null, null, null, null];
const inputPurple = document.getElementById('input-purple');
const inputNone = document.getElementById('input-none');

const generateSuggestion = collection => {
	let wordEl = '';
	let length = collection.length > 500 ? 500 : collection.length;

	for (let i = 0; i < length; i++) {
		let letters = '';

		for (let l = 0; l < 5; l++) {
			const letter = collection[i][l];
			const purpleColor =
				includeLetters && includeLetters.includes(letter)
					? 'purpleColor'
					: '';
			const greenColor = correctLetters.includes(letter)
				? 'greenColor'
				: '';

			letters += `<i class="${
				purpleColor + ' ' + greenColor
			}"> ${letter} </i>`;
		}
		wordEl += `<span class="word">${letters}</span>`;
	}
	document.getElementById('results').innerHTML = wordEl;
};

const preventKeys = (e, n) => {
	if (
		!(
			(e.key.match(/^[A-Za-z]+$/) && e.target.value.length < n) ||
			e.key === 'Backspace' ||
			e.code === 'Backspace' ||
			e.keyCode === 8
		)
	) {
		e.preventDefault();
	}
};

const validateKeys = (e, n) => {
	preventKeys(e, n);

	if (
		(e.key.length === 1 &&
			includeLetters &&
			includeLetters.includes(e.key)) ||
		(e.key.length === 1 && excludeLetters && excludeLetters.includes(e.key))
	) {
		e.preventDefault();
	}
};

const wordFilter = () => {
	let POLISHSYMBOLS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż', 'ł'];

	let wordsList = COLLECTION;

	if (correctLetters) {
		correctLetters.forEach((latter, i) => {
			if (latter) {
				for (let x = 0; x < POLISHSYMBOLS.length; x++) {
					wordsList = wordsList.filter(
						word =>
							word[i] == latter &&
							!word.includes(POLISHSYMBOLS[x])
					);
				}
			}
		});
	}

	if (excludeLetters) {
		for (let x = 0; x < POLISHSYMBOLS.length; x++) {
			wordsList = wordsList.filter(word => {
				if (word.includes(POLISHSYMBOLS[x])) return;
				for (let i = 0; i < excludeLetters.length; i++) {
					if (word.includes(excludeLetters[i])) {
						return false;
					}
					if (excludeLetters.length === i + 1) {
						return true;
					}
				}
			});
		}
	}

	if (includeLetters) {
		for (let x = 0; x < POLISHSYMBOLS.length; x++) {
			wordsList = wordsList.filter(word => {
				if (word.includes(POLISHSYMBOLS[x])) return;
				for (let i = 0; i < includeLetters.length; i++) {
					if (!word.includes(includeLetters[i])) {
						return false;
					}
					if (includeLetters.length === i + 1) {
						return true;
					}
				}
			});
		}
	}

	if (wordsList.length != 0 && wordsList.length < 6000) {
		document.querySelector('.hackFind').style.display = '';
		document.getElementById('findWords').textContent = wordsList.length;
	} else document.querySelector('.hackFind').style.display = 'none';

	generateSuggestion(wordsList);
};

inputPurple.addEventListener('keydown', e => validateKeys(e, 5));
inputPurple.addEventListener('input', e => {
	includeLetters = e.target.value.replace(/[.,\s]/g, '').toLowerCase();
	wordFilter();
});

inputNone.addEventListener('keydown', e => validateKeys(e, 22));
inputNone.addEventListener('input', e => {
	excludeLetters = e.target.value.replace(/[.,\s]/g, '').toLowerCase();
	wordFilter();
});

document.querySelectorAll('#form-green input').forEach(correctInput => {
	correctInput.addEventListener('keydown', e => preventKeys(e, 1));
	correctInput.addEventListener('input', e => {
		correctLetters[parseInt(e.target.dataset.index)] =
			e.target.value.toLowerCase();
		wordFilter();
	});
});
