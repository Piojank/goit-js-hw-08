import Player from '@vimeo/player';
import { save, load } from './storage.js';
let throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

const handleTimeUpdate = throttle((event) => {
    const currentTime = event.seconds;
    console.log(event.seconds);
    save('playerCurrentTime', currentTime);
}, 1000);

player.on('timeupdate', handleTimeUpdate);

const currentTime = load('playerCurrentTime');
if (currentTime !== undefined) {
    player.setCurrentTime(currentTime); 
}


