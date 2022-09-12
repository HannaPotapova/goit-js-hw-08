import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector("iframe");
const player = new Player(iframe);
const PLAYER_KEY = 'videoplayer-current-time';

const savedTime = localStorage.getItem(PLAYER_KEY) || 0;
console.log(savedTime);
player.on("timeupdate", throttle(onPlay, 1000));
function onPlay(data) {
    localStorage.setItem(PLAYER_KEY, data.seconds)
};
player.setCurrentTime(savedTime);