const getTitle = (group, type, city, title) => {
	if (group === 'transport') {
		let result = '';
		switch (type) {
		case 'flight':
			result += `Рейс ${title} в город ${city}`;
			break;
		default:
			result += `Поезд ${title} в город ${city}`;
		}

		return result;
	}

	if (group === 'hotel') {
		return `Соседи в отеле «${title}» в городе ${city} `;
	}

	return 'Попутчики в город ' + city;
}

export default getTitle;