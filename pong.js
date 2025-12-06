// J'ai fait des recherches exterieures sur différents sites et vidéos
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const barImage = new Image();
barImage.src = 'pongo (2).png'; 
const ballImage = new Image();
ballImage.src = 'ball.png';

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 20;

let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
};

let rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
};

let ball = {
    x: canvas.width / 2 - ballSize / 2,
    y: canvas.height / 2 - ballSize / 2,
    radius: ballSize / 2,
    dx: 5,
    dy: 5
};

let upArrowPressed = false;
let downArrowPressed = false;

let wPressed = false;
let sPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'z') wPressed = true;
    if (e.key === 's') sPressed = true;
    if (e.key === 'ArrowUp') upArrowPressed = true;
    if (e.key === 'ArrowDown') downArrowPressed = true;
    
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') upArrowPressed = false;
    if (e.key === 'ArrowDown') downArrowPressed = false;
    if (e.key === 'z') wPressed = false;
    if (e.key === 's') sPressed = false;
});

function drawBall() {
    ctx.drawImage(ballImage, ball.x, ball.y, ball.radius * 2, ball.radius * 2);
}

function drawPaddle(paddle) {
    ctx.drawImage(barImage, paddle.x, paddle.y, paddle.width, paddle.height);
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (
        ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + leftPaddle.height ||
        ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + rightPaddle.height
    ) {
        ball.dx = -ball.dx;
    }

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2 - ball.radius;
        ball.y = canvas.height / 2 - ball.radius;
        ball.dx = -ball.dx;
    }
}

function movePaddles() {
    if (upArrowPressed && leftPaddle.y > 0) {
        leftPaddle.y -= leftPaddle.dy;
    }
    if (downArrowPressed && leftPaddle.y + leftPaddle.height < canvas.height) {
        leftPaddle.y += leftPaddle.dy;
    }

    if (wPressed && rightPaddle.y > 0) {
        rightPaddle.y -= rightPaddle.dy;
    }
    if (sPressed && rightPaddle.y + rightPaddle.height < canvas.height) {
        rightPaddle.y += rightPaddle.dy;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);

    updateBall();
    movePaddles();

    requestAnimationFrame(gameLoop);
}

gameLoop();