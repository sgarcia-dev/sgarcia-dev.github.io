import {WOW} from 'wowjs';

export const Animation = {
    init: () => {
        Animation.instance = new WOW({
            offset: 200,
            boxClass: 'reveal',
            mobile: true,
            live: true
        });
        Animation.instance.init();
    },
    sync: () => {
        Animation.instance.sync();
    }
}
