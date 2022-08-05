import _default from '../../node_modules/@vimeo/player';
let throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(event => {
    console.log(event.seconds);
    localStorage.setItem('videoplayer-current-time', `${event.seconds}`);
  }, 1000),
);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
