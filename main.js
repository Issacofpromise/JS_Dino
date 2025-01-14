var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image(); img2.src = 'dinosaur.png';
var img4 = new Image(); img4.src = 'dino_dead.png';
var dd = new Image(); dd.src = 'refr.png';
var sc = { tx() { ctx.font = '20px Arial'; ctx.fillText('Score : ' + ten, 80, 30); } };
var life = { tx() { ctx.font = '20px Arial'; ctx.fillText('Life : ' + fe, 250, 30); } };
var death = { tx(x) { ctx.font = '30px Arial'; ctx.fillText('G A M E  O V E R', x, 162); } };
var death1 = { tx(x) { ctx.font = '27px Arial'; ctx.fillText('You have lost all your lives.', x, 162); } };

class Dino {
    constructor(img2, img4) {
        this.x = 80; this.y = 280; this.wid = 80;
        this.hei = 80; this.img2 = img2; this.img4 = img4;
        this.curr = this.img2; this.ternate = false;
    }
    draw() { ctx.drawImage(this.curr, this.x, this.y, this.wid, this.hei); }
};
var dino = new Dino(img2, img4);

var img1 = new Image(); img1.src = 'cactus.png';
var cloud = new Image(); cloud.src = 'cloud.png';
var at = new Image(); at.src = 'flat.png';
var gh = new Image(); gh.src = 'rough.png';
class Cactus {
    constructor(f, d, id, r, img, w) {
        this.x = r; this.y = f; this.width = w;
        this.height = d; this.id = id; this.img = img;
    }
    draw() { ctx.drawImage(this.img, this.x, this.y, this.width, this.height); }
};
var timer = 0, cacts = [], animate, ten = 0, isDead = false;
var esh = new Cactus(190, 55, 'ret', 330, dd, 80);
var fl = new Cactus(310, 40, 'at', 1200, at, 1790);
var rou = new Cactus(310, 40, 'gh', 2800, gh, 1800);
var point = new Audio('point.wav');
var jumpSound = new Audio('jump.wav');
var dead = new Audio('die.wav');
var soundPlayed = false, 점프중 = false, 점프타임아웃;

var fe = localStorage.getItem('mi');
if (fe === null || fe < 0 || isNaN(fe)) {
    fe = 3;
    localStorage.setItem('mi', fe);
} else {
    fe = Number(fe);
}

function 충돌(dino, cactus) {
    var x축 = cactus.x - (dino.x + dino.wid);
    var y축 = cactus.y - (dino.y + dino.hei);
    var last = (cactus.x + cactus.width) - dino.x;

    if (x축 < -48 && y축 < -35 && last > 30) {
        dead.play();
        fe -= 1;
        localStorage.setItem('mi', fe);
        isDead = true;
        cancelAnimationFrame(animate);

        if (fe > 0) {
            setTimeout(() => {
                dino = new Dino(img2, img4);
                isDead = false;
                cacts = [];
                byframe();
            }, 1500);
        } else {
            setTimeout(() => {
                localStorage.setItem('mi', 3);
                alert("Game Over! Restarting game...");
                location.reload();
            }, 2000);
        }
    }
}

function byframe() {
    timer++;
    animate = requestAnimationFrame(byframe);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sc.tx(); life.tx(); fl.x -= 3; fl.draw(); rou.x -= 3; rou.draw();
    if (fl.x + fl.width <= 0) { fl.x = canvas.width; }
    if (rou.x + rou.width <= 0) { rou.x = fl.x + fl.width; }

    if (timer % 330 == 0) {
        var clo = new Cactus(170, 50, 'tus', 2000, cloud, 300);
        var ud = new Cactus(240, 40, 'us', 1000, cloud, 100);
        var cactus = new Cactus(280, 80, 'cactus', 1400, img1, 70);
        var cactus1 = new Cactus(300, 60, 'cactus1', 780, img1, 70);
        cacts.push(clo, ud, cactus, cactus1);
    }

    cacts.forEach((a, i, o) => {
        a.x -= 3; a.draw();
        if (a.x < 0) { o.splice(i, 1); if (a.id === 'cactus1') { ten += 10; if (ten % 100 === 0) { point.play(); } } }
        if (a.id === 'cactus1' || a.id === 'cactus') { 충돌(dino, a); }
    });

    if (isDead) {
        dino.curr = dino.img4; dino.wid = 70; dino.draw();
        if (window.innerWidth <= 968 && fe >= 0) { death.tx(250); esh.draw(); }
        else if (window.innerWidth > 968 && fe >= 0) { death.tx(600); esh.x = 686; esh.draw(); }
        if (window.innerWidth <= 968 && fe < 0) { death1.tx(200); }
        else if (window.innerWidth > 968 && fe < 0) { death1.tx(600); }
    } else {
        dino.draw();
    }

    if (점프중 == true && dino.y > 150) {
        dino.y -= 3;
        if (!soundPlayed) { jumpSound.play(); soundPlayed = true; }
    }
    if (dino.y <= 150) { if (dino.y < 280) { dino.y += 2; } }
    if (점프중 == false) { if (dino.y < 280) { dino.y += 3; } soundPlayed = false; }
}

document.addEventListener('keydown', e => {
    if (e.code === 'ArrowUp' || e.code === 'Space') {
        점프중 = true;
        clearTimeout(점프타임아웃); // 기존 타임아웃을 취소
        점프타임아웃 = setTimeout(() => {
            점프중 = false;
        }, 1000); // 1초 후 점프 중지
    }
});
document.addEventListener('keyup', e => {
    if (e.code === 'ArrowUp' || e.code === 'Space') {
        점프중 = false;
        clearTimeout(점프타임아웃); // 타임아웃 초기화
    }
});
canvas.addEventListener('click', (e) => {
    var x = e.clientX; var y = e.clientY;
    if (x >= esh.x && x <= esh.x + esh.width && y >= esh.y && y <= esh.y + esh.height) {
        location.reload();
    }
});

byframe();
