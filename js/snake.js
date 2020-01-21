var ctx = null;
var gameId = null;
px = py = 10
vx = 0
vy = 0
schwanz = 3
var spielfeld = 20
var kachel = 20
trail = [{"x":px,"y":py}]
var pause = true
var appleposition = function () {
    return Math.floor(Math.random() * (20 - 1) + 1)
}
var ax = appleposition()
var ay = appleposition()

function gameLoop() {
 
    if (!pause) {
        // Position updaten
        px += vx
        py += vy
        if (px > spielfeld - 1) px=0;
        if (px < 0) px= spielfeld - 1
        if (py > spielfeld - 1) py=0
        if (py < 0) py = spielfeld - 1

        // Kollision mit Schwanz
        for (var pos of trail) {
            if (px == pos.x && py ==pos.y){
                vx = 0
                vy = 0
                schwanz = 3
                px = py = 10
                
            } 
        }

        trail.push({"x":px, "y":py})
        while (trail.length > schwanz) {
            trail.shift()
        }
        //Kollision Apfels
        if (ax==px && ay==py) {
            schwanz++
            ax = appleposition()
            ay = appleposition()
        }
    }
    // Spielfeld zeichnen
    drawField()
}

function drawField () {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width,canvas.height);

    ctx.fillStyle = "lime";
    for (var point of trail) {
        ctx.fillRect(point.x*kachel,point.y*kachel,kachel-2, kachel-2);
    }
    ctx.fillStyle = "red";
    ctx.fillRect (ax*kachel,ay*kachel,kachel - 2,kachel - 2)
}

function directionchange (evt) {

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const KeyR = 82;
    const KeyPause = 80;
   

    if (evt.keyCode == LEFT_KEY) {
        vx = -1;
        vy = 0;
        pause = false
    } else if (evt.keyCode == RIGHT_KEY) {
        vx = 1
        vy = 0
        pause = false
    } else if (evt.keyCode == UP_KEY) {
        vx = 0
        vy = -1
        pause = false
    } else if (evt.keyCode == DOWN_KEY) {
        vx = 0
        vy = 1
        pause = false
    } else if (evt.keyCode == KeyR) {
        vx = 0
        vy = 0
        pause = true
    } else if (evt.keyCode == KeyPause) {
        pause = !pause;
    }
}

window.onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', directionchange);
    gameId = setInterval(gameLoop, 100);
}