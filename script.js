const dino = document.getElementById("dino");
const scoreDisplay = document.getElementById("score");
const game = document.getElementById("game");

let isJumping = false;
let score = 0;
let speed = 5;
let gameOver = false;
let frame = 1;
let jumpPhase = "up";
let obstacles = [];


// salto del dino
document.addEventListener("keydown", e => {
  if (e.code === "Space") jump(true); // mantener apretado
});
document.addEventListener("keyup", e => {
  if (e.code === "Space") jump(false); // soltar
});

function jump(holding) {
  if (!isJumping) {
    isJumping = true;
    let jumpHeight = 0;
    let maxHeight = holding ? 120 : 80; // más alto si mantenés
    let upInterval = setInterval(() => {
      if (jumpHeight >= maxHeight) {
        clearInterval(upInterval);
        jumpPhase = "down";
        let downInterval = setInterval(() => {
          if (jumpHeight <= 0) {
            clearInterval(downInterval);
            isJumping = false;
            jumpPhase = "up";
          }
          jumpHeight -= 5;
          dino.style.bottom = jumpHeight + "px";
        }, 20);
      }
      jumpHeight += 5;
      dino.style.bottom = jumpHeight + "px";
    }, 20);
  }
}

// animación del dino
function animateDino() {
  if (!gameOver) {
    if (!isJumping) {
      frame = frame === 1 ? 4 : 1;
      dino.style.background = `url('Dino${frame}.PNG') no-repeat center/contain`;
    } else {
      dino.style.background = jumpPhase === "up"
        ? "url('Dino2.PNG') no-repeat center/contain"
        : "url('Dino3.PNG') no-repeat center/contain";
    }
    setTimeout(animateDino, 150);
  }
}
animateDino();

// creación de obstáculos
function createObstacle() {
  const obstacle = document.createElement("div");
  let type = Math.random();

  if (type < 0.3) {
    obstacle.classList.add("obstacle", "cactus1");
  } else if (type < 0.6) {
    obstacle.classList.add("obstacle", "cactus2");
  } else if (type < 0.8) {
    obstacle.classList.add("obstacle", "rock");
  } else {
    obstacle.classList.add("obstacle", "ptero");
    let randomHeight = Math.floor(Math.random() * 70) + 80;
    obstacle.style.bottom = randomHeight + "px";
    animatePtero(obstacle);
  }

  obstacle.style.left = "800px";
  game.appendChild(obstacle);
  obstacles.push(obstacle);
}

// animación de pterodáctilo
function animatePtero(ptero) {
  let frame = 1;
  setInterval(() => {
    frame = frame === 1 ? 2 : 1;
    ptero.style.background = `url('Pterodacty${frame}.PNG') no-repeat center/contain`;
  }, 120); // más rápido para simular aleteo
}

// movimiento y colisión
function moveObstacles() {
  obstacles.forEach((obstacle, index) => {
    let obstacleLeft = parseInt(obstacle.style.left);
    obstacleLeft -= speed;
    obstacle.style.left = obstacleLeft + "px";

    if (obstacleLeft < -60) {
      obstacle.remove();
      obstacles.splice(index, 1);
    score++;
scoreDisplay.textContent = "Score: " + score;
if (score % 10 === 0) speed++;
updateDayNight();

    }

    const dinoRect = dino.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
if (
  dinoRect.right > obsRect.left &&
  dinoRect.left < obsRect.right &&
  dinoRect.bottom > obsRect.top &&
  !(obstacle.classList.contains("ptero") && dinoRect.top > obsRect.bottom)
) {
  endGame();
}

  });
}

// fin del juego con reinicio sin recargar
function endGame() {
  gameOver = true;

  const gameOverDiv = document.createElement("div");
  gameOverDiv.id = "game-over";
  gameOverDiv.innerHTML = `
    <div>GAME OVER</div>
    <div>Score: ${score}</div>
  `;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Reiniciar";
  restartBtn.onclick = () => restartGame();

  gameOverDiv.appendChild(restartBtn);
  game.appendChild(gameOverDiv);
}

function restartGame() {
  score = 0;
  speed = 5;
  gameOver = false;
  scoreDisplay.textContent = "Score: 0";

  obstacles.forEach(o => o.remove());
  obstacles = [];

  document.getElementById("game-over").remove();

  // crear obstáculo inicial inmediato
  createObstacle();
}
function updateDayNight() {
  if (score > 0 && score % 10 === 0) { 
    // cada 50 puntos cambia
    if (game.classList.contains("day")) {
      game.classList.remove("day");
      game.classList.add("night");
    } else {
      game.classList.remove("night");
      game.classList.add("day");
    }
  }
}

// bucles principales
setInterval(() => {
  if (!gameOver && Math.random() < 0.1) createObstacle();
}, 700);

setInterval(() => {
  if (!gameOver) moveObstacles();
}, 20);
