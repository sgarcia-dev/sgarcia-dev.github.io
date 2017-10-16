import angular from 'angular';
import mainModule from './main/main.module';
import profileModule from './profile/profile.module';

export default angular
    .module('components', [
        mainModule, profileModule
    ]).name;