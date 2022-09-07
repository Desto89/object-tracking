var ctx = document.getElementById("canvas").getContext("2d");
window.requestAnimationFrame(gameLoop)


function generateRandom(min = 30, max = 550) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}


function findDistance(missleX, missleY, enemyX, enemyY) {
    let y = missleY - enemyY
    let x = missleX - enemyX

    let distance = Math.sqrt((x * x) + (y * y))
    return distance
}

function findDiff(missleP, enemyP, distance) {
    let difference = (enemyP - missleP) / distance
    return difference
}

let enemy = null;
let missle = null;
let distance = null;
let xDiff = null;
let yDiff = null;


function gameLoop() {

    ctx.clearRect(0, 0, 600, 600)
    ctx.fillStyle = "#000000";
    
    //player
    ctx.fillRect(275, 275, 50, 50);

    //enemy
    if (enemy === null) {
        enemy = {x: generateRandom(), y: generateRandom()}
    }
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(enemy.x, enemy.y, 50, 50)

    //missle
    if (missle === null) {
        missle = {x:275, y:275}
    }
    
    if (distance === null) {
        distance = findDistance(missle.x, missle.y, enemy.x, enemy.y)
        xDiff = findDiff(missle.x, enemy.x, distance)
        yDiff = findDiff(missle.y, enemy.y, distance)
    }

    if (distance !== null && xDiff !== null && yDiff !== null) {
        missle.x += xDiff * 10
        missle.y += yDiff * 10
        ctx.fillStyle = "#0000FF"
        ctx.fillRect(missle.x, missle.y, 25, 25);   
    }


    if (findDistance(missle.x, missle.y, enemy.x, enemy.y) < 5) {
        enemy = null;
        missle = null;
        distance = null;
        xDiff = null;
        yDiff = null;
    }

    window.requestAnimationFrame(gameLoop)
} 