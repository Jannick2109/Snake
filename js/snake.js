var ctx = null;
px = py = 10
vx = 1
vy = 0
schwanz = 3
var spielfeld = 20
var kachel = 20
trail = [{"x":px,"y":py}]

function gameLoop() {
    // Position updaten
    px += vx
    py += vy

    if (px > spielfeld - 1) px=0;
    if (px < 0) px= spielfeld - 1
    if (py > spielfeld - 1) py=0
    if (py < 0) py = spielfeld - 1

    trail.push({"x":px, "y":py})
    while (trail.length > schwanz) {
        trail.shift()
    }


    // Kollision mit Schwanz

    // Kollision mit Apfel

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
}

window.onload = function () {
    var canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    setInterval(gameLoop, 200)
}
