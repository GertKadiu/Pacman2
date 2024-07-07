import layout from "./Matrix.js";
import { movePacman } from "./PacmanMove.js";
import { Ghost } from "./ghostMovment.js";
import { startGame, pauseGame, resumeGame, restartGame } from "./GameControls.js";

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.getElementById("score");
  const livesDisplay = document.getElementById("lives-display");
  const startPauseButton = document.getElementById("start-pause-button");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const width = 28;
  const eatDotsSound = new Audio("./Sound/waka.wav");
  const eatSound = new Audio("./Sound/power_dot.wav");
  const gameOverSound = new Audio("./Sound/gameOver.wav");
  const gameWin = new Audio("./Sound/gameWin.wav");
  let score = 0;
  let pacmanCurrentIndex = 321;
  let gameStarted = false;
  let gamePaused = false;
  let lives = 3;
  let intervalId;

  const ghosts = [
    new Ghost("blinky", 172, 250),
    new Ghost("pinky", 171, 250),
    new Ghost("inky", 199, 250),
    new Ghost("clyde", 200, 250),
  ];

  ghosts.forEach((ghost) => {
    squares[ghost.startIndex].classList.add(ghost.className, "ghost");
  });

  function startAutoMove(direction) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      const gameState = {
        squares,
        width,
        gameStarted,
        gamePaused,
        pacmanCurrentIndex,
        score,
        lives,
        ghosts,
        handleKeyup,
        intervalId,
        showModal,
        modal,
        overlay,
        startPauseButton,
        pauseGame
      };
      
      const dependencies = {
        scoreDisplay,
        livesDisplay,
        eatDotsSound,
        eatSound,
        gameOverSound,
        gameWin
      };

      const newState = movePacman(direction, gameState, dependencies);
      
      pacmanCurrentIndex = newState.pacmanCurrentIndex;
      score = newState.score;
      lives = newState.lives;
      gameStarted = newState.gameStarted;
    }, 150);
  }

  function handleKeyup(e) {
    startAutoMove(e.key);
  }

  function toggleGame() {
    const gameState = {
      squares,
      width,
      gameStarted,
      gamePaused,
      pacmanCurrentIndex,
      score,
      lives,
      ghosts,
      handleKeyup,
      intervalId,
      showModal,
      modal,
      overlay,
      startPauseButton
    };

    const dependencies = {
      scoreDisplay,
      livesDisplay,
      eatDotsSound,
      eatSound,
      gameOverSound,
      gameWin
    };

    if (!gameStarted) {
      const newState = startGame(gameState, dependencies);
      gameStarted = newState.gameStarted;
      gamePaused = newState.gamePaused;
    } else if (gamePaused) {
      const newState = resumeGame(gameState, dependencies);
      gamePaused = newState.gamePaused;
    } else {
      const newState = pauseGame(gameState);
      gamePaused = newState.gamePaused;
    }
  }

  startPauseButton.addEventListener("click", toggleGame);

  document.getElementById("close-modal").addEventListener("click", hideModal);
  document.getElementById("restartbtn").addEventListener("click", hideModal);

  function hideModal() {
    overlay.style.display = "none";
    gameWin.pause();
    gameOverSound.pause();
    const newState = restartGame(squares, layout, scoreDisplay, livesDisplay, ghosts, pacmanCurrentIndex, startPauseButton);
    score = newState.score;
    lives = newState.lives;
    pacmanCurrentIndex = newState.pacmanCurrentIndex;
    gameStarted = newState.gameStarted;
  }

  function showModal(modal, overlay, message) {
    modal.querySelector("h3").textContent = message;
    overlay.style.display = "flex";
  }
});