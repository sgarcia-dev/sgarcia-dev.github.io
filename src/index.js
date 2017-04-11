require('./config/config');

var reveal = require('./common/reveal');

reveal.init({
	offset: 0.1
});

document.querySelector('body').addEventListener('click', e => {
	dataLayer.push({
		'event': 'page_click',
		'target_el_id': e.target.id,
		'target_el_class': e.target.className
	});
	console.info('data-layer event triggered.');
});
