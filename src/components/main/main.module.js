import angular from 'angular';
import {mainComponent} from './main.component';

export default angular.module('mainModule', [])
    .component('main', mainComponent).name;