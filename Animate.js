export class Animate {
    cardFlipAnimate(item) {
        var timeline = gsap.timeline();
        timeline.to(item, { duration: 0.4, scaleX: 0 });
        timeline.to(item, { duration: 0.4, scaleX: 1 });
    }


    cardCorrect(item) {
        var timeline = gsap.timeline();
        timeline.to(item, { duration: 0.4, opacity: 0, scaleX: 2, scaleY: 2, zIndex: 99 });
        gsap.delayedCall(0.4, this.hide, [item]);
    }

    hide(item) {
        if (item) document.getElementById(item.id).style.display = 'none';
    }

    disappear(id) {
        var timeline = gsap.timeline();
        timeline.to(document.getElementById(id), { opacity: 0, duration: 0.4 });
        timeline.to(document.getElementById(id), { opacity: 1, duration: 0.4 });
    }

    updateScore(correct, score, id,right,wrong,timeright,timewrong,time) {
        //Id: Label Score Id
        let sco = score; //Score before update
        let ti = time;
        if (correct === true) { //If choose correct matching pair
            score += right;
            time += timeright;
        } else {score -= wrong; time -= timewrong;}
        var obj = {
            value: sco
        }
        TweenLite.to(obj, 0.4, {
            value: score,
            roundProps: {   //Round up to 10
                value: 100
            },
            onUpdate: function () {
                document.getElementById(id).innerHTML = obj.value;
            }
        })
        return {score,time}
    }

    cardMove(item, posx, posy, oldx, oldy, dur) {
        var timeline = gsap.timeline({ delay: dur * 0.3 });
        timeline.to(item, { duration: 0.5, x: item.x, y: item.y, width: oldx, height: oldy });
        timeline.to(item, { duration: 0.5, x: posx, y: posy, width: window.innerWidth / 12, height: window.innerWidth / 12, ease: 'back' });
    }

    mouseenter(evt) {
        var btn = evt.target;
        btn.style.color = 'White';
        btn.style.background = 'LightGreen';
        gsap.to(document.getElementById(btn.id), { duration: 0.5, opacity: 1, scaleX: 1.5, scaleY: 1.5, zIndex: 99 });
    }

    mouseleave(evt) {
        var btn = evt.target;
        btn.style.color = 'LightGreen';
        btn.style.background = 'white';
        gsap.to(document.getElementById(btn.id), { duration: 0.5, opacity: 1, scaleX: 1, scaleY: 1, zIndex: 1 });
    }

    clickButton(id) {
        gsap.to(document.getElementById(id), { duration: 1, opacity: 0, scaleX: 3, scaleY: 3, zIndex: 99 });
    }
}