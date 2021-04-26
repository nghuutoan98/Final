import { Node } from './Node.js';
import { Card } from './Card.js';
import { Label } from './Label.js';
import { Button } from './Button.js';
import { Animate } from './Animate.js';

var clickedImg = [];
var score = 10000;
var countClick = 0;
var clickable = false;
var timeright = 0;
var timewrong = 0;
var right;
var wrong;
var win = 0;
var time = 0;
var animate = new Animate();

export class Game extends Node {
    init() {
        let bg = new Card('./img/bg.jpg','','',window.innerWidth, window.innerHeight);

        let title = new Card('./img/title.jpg','title','',window.innerWidth / 6, window.innerHeight / 6, 
                                2 * window.innerWidth / 6 * 0.95 + window.innerHeight * 0.2);

        let btnPlay = new Button('play','PLAY','30px','LightGreen','White',window.innerWidth/14
                                        ,window.innerHeight/12,window.innerWidth/2.2,window.innerHeight/3);
        btnPlay.elm.style.borderRadius = '12px';
        btnPlay.on('click', this.play.bind(this));
        btnPlay.on('mouseenter', animate.mouseenter.bind(this));
        btnPlay.on('mouseleave', animate.mouseleave.bind(this));

        let btnMode = new Button('mode','MODE','30px','LightGreen','White',window.innerWidth/14
                                        ,window.innerHeight/12,window.innerWidth / 2.2,window.innerHeight / 2.34);
        btnMode.elm.style.borderRadius = '12px';
        btnMode.on('click', this.mode.bind(this)); 
        btnMode.on('mouseenter', animate.mouseenter.bind(this));
        btnMode.on('mouseleave', animate.mouseleave.bind(this));

        let btnQuit = new Button('quit','QUIT','30px','LightGreen','White',window.innerWidth/14
                                        ,window.innerHeight/12,window.innerWidth / 2.2,window.innerHeight / 1.9);
        btnQuit.elm.style.borderRadius = '12px';
        btnQuit.on('click', this.quit.bind(this)); 
        btnQuit.on('mouseenter', animate.mouseenter.bind(this));
        btnQuit.on('mouseleave', animate.mouseleave.bind(this));

        this.addChild(bg);
        this.addChild(btnPlay);
        this.addChild(btnMode);
        this.addChild(btnQuit);
        this.addChild(title);
    }

    play() {
        if(document.getElementById('play')) document.getElementById('play').remove();
        if(document.getElementById('quit')) document.getElementById('quit').remove();
        if(document.getElementById('mode')) document.getElementById('mode').remove();
        if(document.getElementById('btnNormal')) document.getElementById('btnNormal').remove();
        if(document.getElementById('btnHard')) document.getElementById('btnHard').remove();
        if(document.getElementById('btnHell')) document.getElementById('btnHell').remove();

        if(!timeright) timeright = 0;
        if(!timewrong) timewrong = 0;
        if(!right) right = 1000;
        if(!wrong) wrong = 500;

        score = 10000;
        time = 180;
        countClick = 0;
        win = 0;
        clickedImg = [];

        let vic = new Card('./img/victory.jpeg', 'victory','',window.innerWidth,window.innerHeight);
        vic.elm.style.display = 'none';

        let showScore = new Label('score', score, 80,'','',window.innerWidth / (10.5), 
                                    window.innerHeight / 7,window.innerWidth / 11,window.innerHeight / 7);

        let labelScore = new Label('labelscore', 'Score', 60, 'red','','','',window.innerWidth / 10,window.innerHeight / 8.5);

        let timer = new Label('timer', time, 60, 'black','','','',window.innerWidth / 1.3,window.innerHeight / 7);
        timer.elm.style.display = 'none';

        let btnPlayAgain = new Button('btnAgain','Play Again','40px','White','LightGreen',
                                    window.innerWidth / 5, window.innerHeight / 6,window.innerWidth / 2.5, window.innerHeight / 1.3);
        btnPlayAgain.elm.style.display = 'none';
        btnPlayAgain.elm.style.borderRadius = '12px';
        btnPlayAgain.on('click', this.onClickAgain.bind(this));

        let imgLose = new Card('./img/lose.jpeg', 'lose','',window.innerWidth / 4,window.innerWidth / 4,window.innerWidth / 2.6,window.innerHeight / 5);
        imgLose.elm.style.display = 'none';

        let btnReturn = new Button('btnReturn','Return','40px','Black','White',window.innerWidth / 5,window.innerHeight / 6, 
                                    window.innerWidth / 2.52, window.innerHeight / 1.38);
        btnReturn.elm.style.display = 'none';
        btnReturn.elm.style.borderRadius = '12px';
        btnReturn.on('click', this.onClickAgain.bind(this));

        this.addChild(imgLose);
        this.addChild(vic);
        this.addChild(showScore);
        this.addChild(labelScore);
        this.addChild(timer);
        this.addChild(btnPlayAgain);
        this.addChild(btnReturn);
        this._initSize();
        this._initCards();
        this._initRandom();
    }

    mode() {
        document.getElementById('play').remove();
        document.getElementById('quit').remove();
        document.getElementById('mode').remove();

        let btnHard = new Button('btnHard','Hard','30px','LightGreen','White',window.innerWidth/14
                                        ,window.innerHeight/12,window.innerWidth / 2.2,window.innerHeight / 2.34);
        btnHard.elm.style.borderRadius = '12px';
        let hardtip = new Label('Hardtip', 'In this mode, each corrected pair gives 1000 pts, otherwise lose 2000 pts',20, 'black',
                                        '',500,500,window.innerWidth / 1.8,window.innerHeight / 2.34);
        hardtip.elm.style.opacity = 0;
        btnHard.on('mouseenter', this.enterMode.bind(this));
        btnHard.on('mouseleave', this.leaveMode.bind(this));
        btnHard.on('click', this.chooseMode.bind(this));

        let btnNormal = new Button('btnNormal','Normal','30px','LightGreen','White',window.innerWidth/14
                                        ,window.innerHeight/12,window.innerWidth/2.2,window.innerHeight/3);
        btnNormal.elm.style.borderRadius = '12px';
        let normaltip = new Label('Normaltip', 'In this mode each corrected pair gives 1000 pts, otherwise lose 500 pts',20, 'black',
                                        '',500,500,window.innerWidth / 1.8,window.innerHeight / 3);
        normaltip.elm.style.opacity = 0;
        btnNormal.on('mouseenter', this.enterMode.bind(this));
        btnNormal.on('mouseleave', this.leaveMode.bind(this));
        btnNormal.on('click', this.chooseMode.bind(this));

        
        let btnHell = new Button('btnHell','Hell','30px','LightGreen','White',window.innerWidth/14
                                        ,window.innerHeight/12,window.innerWidth / 2.2,window.innerHeight / 1.9);
        btnHell.elm.style.borderRadius = '12px';
        let helltip = new Label('Helltip', 'In this mode each corrected pair gives 5 seconds, otherwise lose 20 seconds', 20, 'black',
                                        '',500,500,window.innerWidth / 1.8,window.innerHeight / 1.9);
        helltip.elm.style.opacity = 0;
        btnHell.on('mouseenter', this.enterMode.bind(this));
        btnHell.on('mouseleave', this.leaveMode.bind(this));
        btnHell.on('click', this.chooseMode.bind(this));

        this.addChild(btnNormal);
        this.addChild(btnHell);
        this.addChild(btnHard);
        this.addChild(hardtip);
        this.addChild(helltip)
        this.addChild(normaltip);
    }

    enterMode(evt) {
        animate.mouseenter(evt);
        var id = evt.target.innerHTML + 'tip';
        var timeline = gsap.timeline();
        timeline.to(document.getElementById(id), { opacity: 0, duration: 0.2 });
        timeline.to(document.getElementById(id), { opacity: 1, duration: 0.2 });
    }

    leaveMode(evt) {
        animate.mouseleave(evt);
        var id = evt.target.innerHTML + 'tip';
        var timeline = gsap.timeline();
        timeline.to(document.getElementById(id), { opacity: 1, duration: 0.2 });
        timeline.to(document.getElementById(id), { opacity: 0, duration: 0.2  });
    }

    chooseMode(evt) {
        var level = evt.target.innerHTML;
        if(level === 'Normal') {right = 1000; wrong = 500;}
        else if(level === 'Hard') {right = 1000; wrong = 2000;}
        else {timeright = 5; timewrong = 20;}
        var id = evt.target.innerHTML + 'tip';
        document.getElementById(id).remove();
        this.play();
    }

    quit() {
        window.close();
    }

    _initSize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    countdown(time) {
        var min = Math.floor(time/60);
        var sec = time % 60;
        if (sec < 10) document.getElementById('timer').innerHTML = '0' + min + ':' + '0' + sec;
        else document.getElementById('timer').innerHTML = '0' + min + ':' + sec;
        if(time === 0) this.checkOver();
    }

    _initRandom() {
        var name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var arr = [];
        for (let i = 0; i < 20; i++) arr.push(-1);
        for (let i = 0; i < 20; i++) {
            let random = Math.floor(Math.random() * 10);
            while (name[random] >= 2) {
                random = Math.floor(Math.random() * 10);
            }
            name[random]++;
            arr[i] = random;
        }
        return arr;
    }

    _initCards() {
        var randomname = this._initRandom();
        for (let i = 0, img = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++, img++) {
                let card = new Card('./img/back.jpeg', img, randomname[img]);
                let posy = i * (window.innerWidth / 12) + window.innerHeight * 0.2;
                let posx = j * (window.innerWidth / 12) + window.innerWidth * 0.3;
                card.y = window.innerHeight / 2.5;
                card.x = window.innerWidth / 1.2;
                card.width = window.innerWidth / 8;
                card.height = window.innerHeight / 4;
                card.id = img;
                card.valueCard = randomname[img];
                this.addChild(card);
                animate.cardMove(card, posx, posy, card.width, card.height, img);
                card.on("click", this.onClickCard.bind(this));
            }
        }
        gsap.delayedCall(6.5, () => {
            clickable = true;
            gsap.delayedCall(1,() => {document.getElementById('timer').style.display = 'block';})
            var x = setInterval(() => {
                this.countdown(time);
                time--;
            }
            ,1000)
            if (score <= 0 || time <= 0) clearInterval(x);
        });
    }

    onClickCard(evt) {
        if (clickable === false) return;
        if (countClick >= 2) return;
        let card = evt.target;
        clickedImg.push(card);
        countClick++;
        if (countClick === 2) {
            if (clickedImg[0].id === clickedImg[1].id) {
                countClick--; clickedImg.pop();
                return;
            }
        }
        if (countClick === 2) clickable = false;
        animate.cardFlipAnimate(card);
        gsap.delayedCall(0.4, () => {
            clickedImg[countClick - 1].src = './img/trucxanh' + card.valueCard + '.jpg';
            if (countClick === 2) {
                clickable = false;
                gsap.delayedCall(0.4, () => {
                    this.checkValue(clickedImg[0], clickedImg[1]);
                })
            }
        })
    }

    checkOver() {
        if (score <= 0 || time <= 0) {
            for (let index = 0; index < 20; index++) {
                document.getElementById(index).remove();
            }
            document.getElementById('score').remove();
            document.getElementById('labelscore').remove();
            document.getElementById('timer').remove();
            document.getElementById('btnAgain').style.display = 'block';
            document.getElementById('lose').style.display = 'block';
        }
        if (win === 10) {
            for (let index = 0; index < 20; index++) {
                document.getElementById(index).remove();
            }
            document.getElementById('score').remove();
            document.getElementById('labelscore').remove();
            document.getElementById('title').remove();
            document.getElementById('timer').remove();
            document.getElementById('victory').style.display = 'block';
            document.getElementById('btnReturn').style.display = 'block';
        }
    }

    reset() {
        clickable = true;
        clickedImg = [];
        countClick = 0;
    }

    onClickAgain() {
        location.reload();
    }

    checkValue(item1, item2) {
        var result = [];
        if (item1.valueCard === item2.valueCard) {
            animate.cardCorrect(item1);
            animate.cardCorrect(item2);
            result = animate.updateScore(true, score, 'score',right,wrong,timeright,timewrong,time);
            score = result.score;
            time = result.time;
            console.log(result);
            win++;
            var correctsound = new Audio('./sound/correct.wav');
            correctsound.play();
        }
        else {
            setTimeout(() => {
                document.getElementById(item1.id).src = './img/back.jpeg';
                document.getElementById(item2.id).src = './img/back.jpeg';
            }, 400)
            var wrongsound = new Audio('./sound/wrong.wav');
            wrongsound.play();
            result = animate.updateScore(false, score, 'score',right,wrong,timeright,timewrong,time);
            score = result.score;
            time = result.time;
            console.log(result);
            animate.cardFlipAnimate(item1);
            animate.cardFlipAnimate(item2);
        }
        
        this.countdown(time);
        gsap.delayedCall(0.4, this.reset);
        gsap.delayedCall(1, this.checkOver);;
    }
}