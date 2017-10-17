class mainController {
    constructor(profileService, wowService) {
        this.profileService = profileService;
        this.wowService = wowService;

        this.profile = profileService.profile;
        this.positions = profileService.positions;
        this.skills = profileService.skills;
        this.certifications = profileService.certifications;
        this.recommendations = profileService.recommendations;
    }

    $postLink() {
        this.wowService.sync();
    }
}

export const mainComponent = {
    template: require('./main.component.html'),
    controllerAs: 'mainCtrl',
    controller: mainController
};