import angular from 'angular';

import animationModule from './animation/animation.module';
import mainModule from './main/main.module';
import profileModule from './profile/profile.module';

export default angular
    .module('components', [
        animationModule,
        mainModule,
        profileModule
    ]).name;