require('./config/config');

var reveal = require('./common/reveal');
var scroll = require('./common/scroll');

reveal.init({
	offset: 0.1
});

scroll.init();