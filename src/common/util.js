module.exports = {
	throttle: throttle,
	debounce: debounce,
	forEachElement: forEachElement,
	addEventListenerToElements: addEventListenerToElements
};

function throttle (callback, limit) {
	var wait = false;
	return function () {
		if (!wait) {
			callback.call();
			wait = true;
			setTimeout(function () {
				wait = false;
			}, limit);
		}
	}
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function forEachElement(array, callback) {
	var arrayLength = array.length;
	for (var i = 0; i < arrayLength; i++) {
		callback(array[i], i, array);
	}
}

function addEventListenerToElements(elements, eventName, callback) {

}
