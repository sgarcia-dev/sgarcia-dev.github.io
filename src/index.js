import angular from 'angular';

import componentsModule from './components/components.module';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
    .module(app, ['ui.router',  componentsModule])
    .config(routesConfig);