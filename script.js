const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let dinoBottom = 0;
let score = 0;
let speed = 5;
let gameOver = false;

// salto del dino (funciona con teclado y pantalla táctil)
document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);

function jump() {
  if (!isJumping) {
    isJumping = true;
    let jumpHeight = 0;
    let upInterval = setInterval(() => {
      if (jumpHeight >= 80) {
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (jumpHeight <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          }
          jumpHeight -= 5;
          dinoBottom = jumpHeight;
          dino.style.bottom = dinoBottom + "px";
        }, 20);
      }
      jumpHeight += 5;
      dinoBottom = jumpHeight;
      dino.style.bottom = dinoBottom + "px";
    }, 20);
  }
}

// movimiento del obstáculo
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
        obstacle.style.width = "8%";
        obstacle.style.height = "50px";
        obstacle.style.background = "url('cactus.PNG') no-repeat center/cover";
      } else {
        obstacle.style.width = "10%";
        obstacle.style.height = "25px";
        obstacle.style.background = "url('rocas.PNG') no-repeat center/cover";
      }
    } else {
      obstacleLeft -= speed;
    }
    obstacle.style.left = obstacleLeft + "px";

    // detección de colisión
    if (obstacleLeft > 50 && obstacleLeft < 90 && dinoBottom < obstacle.offsetHeight) {
      alert("¡Game Over! Puntuación final: " + score);
      gameOver = true;
      setTimeout(() => location.reload(), 2000);
    }
  }, 20);
}

moveObstacle();
