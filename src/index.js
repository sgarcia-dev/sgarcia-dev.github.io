import angular from 'angular';
import {WOW} from 'wowjs';

import commonModule from './common/common.module';
import componentsModule from './components/components.module';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
    .module(app, ['ui.router',  commonModule, componentsModule])
    .config(routesConfig);
