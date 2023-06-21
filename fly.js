var backgroundColor;
var myGamePiece;
var point = 0;
var myObstacles = [];
var myObstacles2 = [];
var conf = 0;
var w = window.innerWidth;
var h = window.innerHeight;
console.log(w, h);
var link = location.href;   
console.log(link);
const button = document.getElementById("btn");
const ptn = document.getElementById("ptn");
console.log(button);
console.log(w / 3);
function startGame() {
    myGamePiece = new component2(100, 70, "red", w / 3, h / 3);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
    },
    start2: function () {
        if (conf == 0) {
            clearInterval(this.interval);
            this.frameNo = 0;
            this.frameNo2 = 1;
            myGamePiece.gravity = 0.35;
            this.interval = setInterval(updateGameArea2, 10);
            conf = 1;
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
function component2(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.bounce = 7;
    this.updateBird = function () {
        ctx = myGameArea.context;
        var bird = document.getElementById("bird");
        ctx.drawImage(bird, this.x, this.y,this.width, this.height);
    }
    // this.update = function () {
    //     ctx = myGameArea.context;
    //     ctx.fillStyle = color;
    //     ctx.fillRect(this.x, this.y, this.width, this.height);
    // }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.hitBottom = function () {
        this.gravitySpeed = -this.bounce;
    }
    this.crashWith = function (otherobj, otherobj2) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var otherleft2 = otherobj2.x;
        var otherright2 = otherobj2.x + (otherobj2.width);
        var othertop2 = otherobj2.y;
        var otherbottom2 = otherobj2.y + (otherobj2.height);

        var crash = true;
        if ((mytop > 0 && mybottom < h) && ((mybottom <= othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) && ((mytop > otherbottom2) || (mybottom < othertop2) || (myright < otherleft) || (myleft > otherright))) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {

    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.updateBird();

}

function updateGameArea2() {
    var x, y;
    for (i = 0; i < myObstacles.length; i++) {
        if (myGamePiece.crashWith(myObstacles[i], myObstacles2[i])) {
            myGameArea.stop();
            button.style.display = `block`;
            button.addEventListener("click", () => {
                location.href = `${link}`;
            })
            return;
        }
    }
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.updateBird();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        y = Math.floor(Math.random() * (window.innerHeight - 400)) + 300;
        myObstacles.push(new component(50, window.innerHeight - y, "#FDB81E", x, y));
        myObstacles2.push(new component(50, y - 200, "#FDB81E", x, 0));
    }
    if (everyinterval(537) && point == 0) {
        point++;
        ptn.innerHTML = `${point}`
    }
    if (myGameArea.frameNo >= 537) {
        myGameArea.frameNo2++;
    }
    if (everyinterval2(200)) {
        point++;
        ptn.innerHTML = `${point}`
    }
    for (i = 0; i < myObstacles.length; ++i) {
        myObstacles[i].x += -2;
        myObstacles[i].update();

        //myObstacles2[i]--;
        //myObstacles2[i].update();
    }
    for (i = 0; i < myObstacles2.length; i += 1) {
        myObstacles2[i].x += -2;
        myObstacles2[i].update();
    }
    //myGamePiece.update();

}
function everyinterval(n) {
    if ((myGameArea.frameNo % n) == 0) { return true; }
    return false;
}
function everyinterval2(n) {
    if ((myGameArea.frameNo2 % n) == 0) { return true; }
    return false;
}