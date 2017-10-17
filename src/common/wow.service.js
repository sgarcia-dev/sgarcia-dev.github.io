import {WOW} from 'wowjs';

class WowService {
    constructor() {
        this.WOW = new WOW({
            offset: 100
        });
        this.WOW.init();
    }

    sync() {
        this.WOW.sync();
    }
}

export {WowService};