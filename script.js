// script.js
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let dinoBottom = 0;
let score = 0;
let speed = 5;

// salto
function jump() {
  if (isJumping) return;
  isJumping = true;
  // Pausar animación de correr
  dino.style.animation = "none";
  dino.style.backgroundPosition = "0px";

  let upInterval = setInterval(() => {
    if (dinoBottom >= 80) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (dinoBottom <= 0) {
          clearInterval(downInterval);
          isJumping = false;
           // Reanudar animación de correr
          dino.style.animation = "run 0.5s steps(2) infinite";

        }
        dinoBottom -= 5;
        dino.style.bottom = dinoBottom + "px";
      }, 20);
    }
    dinoBottom += 5;
    dino.style.bottom = dinoBottom + "px";
  }, 20);
}

// mover obstáculo
let score = 0;
let speed = 5;
let gameOver = false;

function moveObstacle() {
  let obstacleLeft = 600;
  obstacle.style.left = obstacleLeft + "px";

  let moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      return;
    }

    if (obstacleLeft < -40) {
      obstacleLeft = 600;
      score++;
      scoreDisplay.textContent = "Puntuación: " + score;

      if (score % 5 === 0) speed++;

      // alternar cactus y roca
      if (Math.random() > 0.5) {
        obstacle.style.width = "30px";
        obstacle.style.height = "50px";
        obstacle.style.background = "url('cactus.png') no-repeat center/cover";
      } else {
        obstacle.style.width = "40px";
        obstacle.style.height = "25px";
        obstacle.style.background = "url('roca.png') no-repeat center/cover";
      }
    } else {
      obstacleLeft -= speed;
    }
    obstacle.style.left = obstacleLeft + "px";

    // colisión
    if (obstacleLeft > 50 && obstacleLeft < 90 && dinoBottom < obstacle.offsetHeight) {
      alert("¡Game Over! Puntuación final: " + score);
      gameOver = true;
      setTimeout(() => location.reload(), 2000); // reinicia el juego
    }
  }, 20);
}



document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump); // para celular

moveObstacle();
