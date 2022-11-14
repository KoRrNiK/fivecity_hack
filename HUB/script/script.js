const hackList = document.querySelector('.hackList');

const listCategory = [
	{ name: 'CarDealer', category: 'CAR', new: 0 },
	{ name: 'MazeBank', category: 'MAZEBANK', new: 0 },
	{ name: 'Flecca', category: 'FLECCA', new: 0 },
	{ name: 'Magazyn SGOC', category: 'SGOC', new: 0 },
	{ name: 'Vangelico', category: 'VANGELICO', new: 1 },
];

const listHacks = [
	{
		name: 'CAR - DEALER',
		desc: 'ZNAJDŹ NUMER I ZAPAMIĘTAJ',
		category: 'CAR',
		link: 'car_dealer_number',
	},
	{
		name: 'CAR - DEALER',
		desc: 'ZDEJMOWANIE NADANIA',
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
];

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
