const gameArea = document.getElementById("gameArea");
const game = gameArea.getContext("2d")

var snake = [{
        x: 250,
        y: 250
    },
    {
        x: 240,
        y: 250
    },
    {
        x: 240,
        y: 250
    },
    {
        x: 230,
        y: 250
    },
    {
        x: 220,
        y: 250
    },
];

const areaBG = 'green';
const border = 'black';
const snakeColor = 'red';
const edgeColor = 'yellow';
const foodColor = 'darksalmon';
let foodX;
let foodY;
let vx = 10;
let vy = 0;
let score = 0;
let time = 150;

main();

setFood();

function main() {
    if (collision()) return;

    setTimeout(
        function onTick() {
            setCanvas();
            drawFood();
            drawSnake();
            moveSnake();
            printScore();
            main();
        }, time);
}


function setCanvas() {
    game.fillStyle = areaBG;
    game.strokestyle = border;
    game.fillRect(0, 0, gameArea.width, gameArea.height);
    game.strokeRect(0, 0, gameArea.width, gameArea.height);
    drawEdges();
}

function drawEdges() {
    for (var a = 0; a < 495; a += 10) {
        game.fillStyle = edgeColor;
        game.strokestyle = border;
        game.fillRect(0, a, 10, 10);
        game.strokeRect(0, a, 10, 10);
        game.fillRect(490, a, 10, 10);
        game.strokeRect(490, a, 10, 10);
        game.fillRect(a, 0, 10, 10);
        game.strokeRect(a, 0, 10, 10);
        game.fillRect(a, 490, 10, 10);
        game.strokeRect(a, 490, 10, 10);
    }
}

function drawSnakePart(snakePart) {
    game.fillStyle = snakeColor;
    game.strokestyle = border;
    game.fillRect(snakePart.x, snakePart.y, 10, 10);
    game.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = {
        x: snake[0].x + vx,
        y: snake[0].y + vy
    };
    snake.unshift(head);
    const eating = snake[0].x === foodX && snake[0].y === foodY;
    if (eating) {
        score += 25 - time/10;
        setFood();
    } else {
        snake.pop();
    }
}

document.addEventListener("keydown", changeDirection)

function changeDirection(key) {
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;
    const a = 65;
    const d = 68;
    const w = 87;
    const s = 83;
    const f = 70;
    const enter = 13;

    const keyPressed = key.keyCode;
    const moveUp = vy === -10;
    const moveDown = vy === 10;
    const moveRight = vx === 10;
    const moveLeft = vx === -10;

    if (keyPressed === left && !moveRight || keyPressed === a && !moveRight) {
        vx = -10;
        vy = 0;
    }

    if (keyPressed === up && !moveDown || keyPressed === w && !moveDown) {
        vx = 0;
        vy = -10;
    }

    if (keyPressed === right && !moveLeft || keyPressed === d && !moveLeft) {
        vx = 10;
        vy = 0;
    }

    if (keyPressed === down && !moveUp || keyPressed === s && !moveUp) {
        vx = 0;
        vy = 10;
    }
    if (keyPressed === f || keyPressed === enter) {
        time -= 10;
    }
}

document.getElementById("btn").addEventListener("click", function fast() {
    time -= 10;
});

function collision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 10;
    const hitRightWall = snake[0].x > gameArea.width - 20;
    const hitToptWall = snake[0].y < 10;
    const hitBottomWall = snake[0].y > gameArea.height - 20;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function setFood() {
    foodX = food(10, gameArea.width - 20);
    foodY = food(10, gameArea.height - 20);
    snake.forEach(function eating(part) {
        const has_eaten = part.x == foodX && part.y == foodY;
        if (has_eaten) {
            setFood()
        };
    });
}

function drawFood() {
    game.fillStyle = foodColor;
    game.strokestyle = border;
    game.fillRect(foodX, foodY, 10, 10);
    game.strokeRect(foodX, foodY, 10, 10);
}

function printScore() {
    game.fillStyle = "white"
    game.font = "20px Roboto"
    game.fillText("Score : "+ score, 380,40);
}