import {WOW} from 'wowjs';

class WowService {
    constructor() {
        this.WOW = new WOW({
            // offset: 300,
            boxClass: 'reveal',
            mobile: true,
            live: false
        });
        this.WOW.init();
    }

    sync() {
        this.WOW.sync();
    }
}

export {WowService};