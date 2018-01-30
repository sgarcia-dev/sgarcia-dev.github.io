import angular from 'angular';
import {ProfileService} from './profile.service';

export default angular
    .module('profileModule', [])
    .service('profileService', ProfileService)
    .name;