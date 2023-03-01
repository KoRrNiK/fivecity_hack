const hackList = document.querySelector('.hackList');
const hackCount = document.getElementById('hackCount');
const credits = document.getElementById('credits');

const listCategory = [
	{ name: 'CarDealer', category: 'CAR', new: 0 },
	{ name: 'MazeBank', category: 'MAZEBANK', new: 0 },
	{ name: 'Flecca', category: 'FLECCA', new: 0 },
	{ name: 'Magazyn SGOC', category: 'SGOC', new: 0 },
	{ name: 'Vangelico', category: 'VANGELICO', new: 0 },
	{ name: 'Bunkier', category: 'BUNKER', new: 0 },
	{ name: 'Boosting', category: 'BOOSTING', new: 1 }
];

const fixed_credits = [
	{
		hack: 'Vangelico - Jubiler',
		name: 'Vistar#5482',
		desc: 'Naprawa szybkosci opadania i szybkosci pojawiania się kulek',
		link: 'https://github.com/mateusz-brzozowski',
	},
];

const listHacks = [
	{
		name: 'CAR - DEALER',
		desc: 'Znajdź number i zapamiętaj',
		category: 'CAR',
		link: 'car_dealer_number',
	},
	{
		name: 'CAR - DEALER',
		desc: 'Zdejmowanie nadajnika',
		category: 'CAR',
		link: 'car_dealer_gps',
	},
	{
		name: 'Maze - Bank',
		desc: 'Wyłączanie Zasilania',
		category: 'MAZEBANK',
		link: 'mazebank_power',
	},
	{
		name: 'Maze - Bank',
		desc: 'Wyłączanie zabezpieczenia sejfu',
		category: 'MAZEBANK',
		link: 'mazebank_pc',
	},
	{
		name: 'Maze - Bank',
		desc: 'Pobieranie hasła do sejfu',
		category: 'MAZEBANK',
		link: 'mazebank_pc2',
	},
	{
		name: 'Maze - Bank',
		desc: 'SOLVER MATH',
		category: 'MAZEBANK',
		link: 'mazebank_solver',
	},
	{
		name: 'Flecca - Bank',
		desc: 'Otwieranie głównych drzwi sejfu',
		category: 'FLECCA',
		link: 'flecca_panel',
	},
	{
		name: 'Flecca - Bank',
		desc: 'Otwieranie drugich drzwi sejfu',
		category: 'FLECCA',
		link: 'flecca_door',
	},
	{
		name: 'Magazyn - SGOC',
		desc: 'Wyłączanie komputera',
		category: 'SGOC',
		link: 'sgoc_pc',
	},
	{
		name: 'Magazyn - SGOC',
		desc: 'Usuwanie zapisu z kamer',
		category: 'SGOC',
		link: 'sgoc_camera',
	},
	{
		name: 'Magazyn - SGOC',
		desc: 'Wyłączanie zabezpieczenia',
		category: 'SGOC',
		link: 'sgoc_power',
	},
	{
		name: 'Vangelico - Jubiler',
		desc: 'Wyłączanie zabezpieczenia małego sejfu',
		category: 'VANGELICO',
		link: 'vangelico_pc',
	},
	{
		name: 'Vangelico - Jubiler',
		desc: 'Otwieranie drzwi do drugiego pomieszczenia',
		category: 'VANGELICO',
		link: 'vangelico_door',
	},
	{
		name: 'Vangelico - Jubiler',
		desc: 'Wyłączanie zabezpieczenia dużego sejfu',
		category: 'VANGELICO',
		link: 'vangelico_pc2',
	},
	{
		name: 'Vangelico - Jubiler',
		desc: 'Otwieranie głównego sejfu',
		category: 'VANGELICO',
		link: 'vangelico_safe',
	},
	{
		name: 'Bunkier',
		desc: 'Otwieranie paczki',
		category: 'BUNKER',
		link: 'bunker_box',
	},
	{
		name: 'Bunkier',
		desc: 'Otwieranie skrzyni',
		category: 'BUNKER',
		link: 'bunker_case',
	},
	{
		name: 'Bunkier',
		desc: 'Otwieranie bocznych drzwi',
		category: 'BUNKER',
		link: 'bunker_door',
	},
	{ 
		name: 'Boosting',
		desc: 'Zapamiętywanie ciągu znaków',
		category: 'BOOSTING',
		link: 'boosting_memory',
	}
];

const hubInit = () => {
	hackCount.textContent = listHacks.length;

	for (let i = 0; i < listCategory.length; i++) {
		const el1 = document.createElement('h3');
		if (listCategory[i].new) {
			el1.textContent = listCategory[i].name + ' (new)';
			el1.classList.add('new');
		} else el1.textContent = listCategory[i].name;

		hackList.appendChild(el1);

		for (let x = 0; x < listHacks.length; x++) {
			if (listHacks[x].category !== listCategory[i].category) continue;

			const el2 = document.createElement('a');

			el2.setAttribute('href', './' + listHacks[x].link + '/');

			hackList.appendChild(el2);

			const button = document.createElement('button');
			button.classList.add('boxButton');
			el2.appendChild(button);

			const div1 = document.createElement('div');
			div1.textContent = listHacks[x].name;
			button.appendChild(div1);

			const div2 = document.createElement('div');
			div2.textContent = listHacks[x].desc;
			button.appendChild(div2);
		}
	}

	for (let i = 0; i < fixed_credits.length; i++) {
		const el2 = document.createElement('div');
		el2.style.left = '-300px';
		el2.innerHTML = 'Hack: ' + fixed_credits[i].hack + '</br> Fixed:' + fixed_credits[i].name + '</br> Desc:' + fixed_credits[i].desc;
		el2.classList.add('box_credits');
		el2.style.animationDelay = 0.5 * i + 's';

		el2.onclick = function () {
			return window.open(fixed_credits[i].link, '_blank');
		};

		setTimeout(() => {
			setTimeout(() => {
				el2.style.left = '10px';
				el2.style.animation = 'animation-right-credits 1s cubic-bezier(0.55, 0.5, 0.45, 0.5) forwards';
				setTimeout(() => {
					el2.remove();
				}, 500);
			}, 4000 * i);
		}, 10000);

		credits.appendChild(el2);
	}
};
