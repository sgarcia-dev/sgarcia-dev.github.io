import {svgRevealDirective} from './svg-reveal.directive';

export default angular
    .module('animation', [])
    .directive('svgReveal', svgRevealDirective)
    .name;