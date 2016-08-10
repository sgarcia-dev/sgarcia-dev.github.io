var util = require('./../common/util'),
	reveal = {};

module.exports = {
	init: init
};

function init(config) {
	if (config) {
		reveal.offset = config.offset || 0;
	}

	reveal.elements = [];
	window.addEventListener('load', function () {
		util.forEachElement(document.getElementsByClassName('reveal'),
			function(el) {
				reveal.elements.push({
					element: el,
					offset: el.dataset.revealOffset || reveal.offset
				});
			});

		window.addEventListener('scroll', util.throttle(checkForRevealElements, 250));
		checkForRevealElements();
	});
}

function checkForRevealElements() {
	util.forEachElement(reveal.elements, function (el) {
		var coords = el.element.getBoundingClientRect();
		// if element is visible
		if (el.element.getBoundingClientRect().top <= window.innerHeight) {
			// check if user set an offset
			if(el.offset) {
				setTimeout(function () {
					el.element.classList.add('is-revealed');
				}, parseFloat(el.offset) * 1000)
			} else {
				el.element.classList.add('is-revealed');
			}
		}
	})
}