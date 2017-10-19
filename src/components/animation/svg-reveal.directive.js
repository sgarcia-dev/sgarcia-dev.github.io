import anime from 'animejs';

function svgRevealLink(scope, el, attrs) {
    const {selector, delay} = attrs;
    
    anime({
        targets: selector || 'path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1000,
        delay: parseToMilliseconds(delay || '0'),
        direction: "alternate",
        loop: false
    });    
}

const svgRevealDirective = () => ({
    restrict: 'AEC',
    link: svgRevealLink
});

export {svgRevealDirective};

function parseToMilliseconds(timeString) {
    let number;
    if (timeString.includes('s')) {
        const numberString = timeString.substring(0, timeString.length - 1);
        number = Math.round(parseFloat(numberString) * 1000);
    } else if (timeString.includes('ms')) {
        const numberString = timeString.substring(0, timeString.length - 2);
        number = parseInt(numberString);
    } else {
        throw new Error('svgReveal.parseToMilliseconds ERROR: Was not passed a valid s or ms delay');
    }

    return parseInt(number);
}