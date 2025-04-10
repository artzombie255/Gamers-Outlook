const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const canvas = document.getElementById("sandbox");
const CANVAS_CONTEXT = canvas.getContext("2d");
canvas.style.width = CANVAS_WIDTH + "px";
canvas.style.height = CANVAS_HEIGHT + "px";

var count = 0;
const context = CANVAS_CONTEXT;
var score = 0;
var balls = [];
var paddle = { x: 50, y: 100, w: 5, h: 60 };
var Key = {
    DOWN: 40,
    UP: 38,
};

function update() {
    window.requestAnimationFrame(drawPong);
}

function drawPong() {
    context.fillStyle = "black";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = "wheat";
    context.fillRect(2, 2, CANVAS_WIDTH - 4, CANVAS_HEIGHT - 4);

    context.fillStyle = "green";
    context.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

    balls.forEach((ball) => {
        context.fillStyle = "black";
        context.beginPath();
        context.arc(ball.position.x, ball.position.y, 5, 0, 2 * Math.PI);
        context.stroke();
        context.fill();

        // check for walls

        // check for left and right walls
        if (ball.position.x <= 0 + 5  || ball.position.x >= CANVAS_WIDTH - 5) {
            ball.velocity.x *= -1;
        }
        // check for top and bottom walls
        if (ball.position.y <= 0 + 5 || ball.position.y >= CANVAS_HEIGHT - 5) {
            ball.velocity.y *= -1;
        }

        // check for collisions
        var newPosition = {
            x: ball.position.x + ball.velocity.x,
            y: ball.position.y + ball.velocity.y,
        };

        const paddleRightSide = paddle.x + paddle.w;
        const paddleBottomSide = paddle.y + paddle.h;
        const hHitTest =
            newPosition.x > paddle.x && newPosition.x < paddleRightSide;
        const vHitText =
            newPosition.y > paddle.y && newPosition.y < paddleBottomSide;
        // if new ball position hits the paddle at all
        if (hHitTest && vHitText) {
            const ballWillIntersectLeftPaddlePosition =
                ball.position.x < paddle.x && newPosition.x > paddle.x;
            const ballWillIntersectRightPaddlePosition =
                ball.position.x > paddleRightSide && newPosition.x < paddleRightSide;
            if (
                ballWillIntersectLeftPaddlePosition ||
                ballWillIntersectRightPaddlePosition
            ) {
                ball.velocity.x *= -1;
            }
            const ballWillIntersectTopPaddlePosition =
                ball.position.y < paddle.y && newPosition.y > paddle.y;
            const ballWillIntersectBottomPaddlePosition =
                ball.position.y > paddleBottomSide && newPosition.y < paddleBottomSide;
            if (
                ballWillIntersectTopPaddlePosition ||
                ballWillIntersectBottomPaddlePosition
            ) {
                ball.velocity.y *= -1;
            }
        }

        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;
        if (ball.position.x < 20) {
            count = 0;
            score = 0;
            console.log(score);
        }
        if (ball.position.x > 280) {
            count++;
        }
        if (count === 21) {
            score++;
            count = 0;
            console.log(score);
        }
    });

    window.requestAnimationFrame(drawPong);
}

window.addEventListener("keydown", (event) => {
    const keyName = event.key
    const distance = 10;
    if (keyName === "w") {
        paddle.y -= distance;
        if (paddle.y === -10)
            paddle.y += distance
    }
    if (keyName === "s") {
        paddle.y += distance;
        if (paddle.y + paddle.h === CANVAS_HEIGHT + 10)
            paddle.y -= distance
    }
});

function addBall() {
    const randomPosition = {
        x: 250,
        y: 150,
    };

    const randomVelocity = {
        x: -2,
        y: -2,
    };
    const newBall = {
        position: randomPosition,
        velocity: randomVelocity,
    };
    if (balls.length < 3)
        balls.push(newBall);
}




