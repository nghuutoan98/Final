import {Sprite} from "./Sprite.js";


let cover = new Sprite('./img/bg.jpg');
cover.width = 300;
cover.height = 300;
document.body.appendChild(cover.elm);

console.log(gsap);
let timeline = gsap.timeline();
timeline.to(cover, {duration: 1, scaleX: 0})
timeline.to(cover, {duration: 1, scaleX: 1})