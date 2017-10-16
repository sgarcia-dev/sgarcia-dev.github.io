class mainController {
    constructor(profileService) {
        this.profileService = profileService;

        this.profile = profileService.profile;
        this.positions = profileService.positions;
    }
}

export const mainComponent = {
    template: require('./main.component.html'),
    controllerAs: 'mainCtrl',
    controller: mainController
};