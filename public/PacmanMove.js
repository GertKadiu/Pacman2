import { pacmanEatsBigDot, pacmanEatsDots } from "./PacmanEats.js";
import { checkForGameOvers, checkForWin, updateLivesDisplay } from "./GameControls.js";

export function movePacman(direction, gameState, dependencies) {
  const {
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
  } = gameState;

  const {
    scoreDisplay,
    livesDisplay,
    eatDotsSound,
    eatSound,
    gameOverSound,
    gameWin
  } = dependencies;

  if (!gameStarted || gamePaused) return gameState;

  squares[pacmanCurrentIndex].classList.remove(
    "pacman-image",
    "pacman-image-left",
    "pacman-image-up",
    "pacman-image-down"
  );

  function isWall(index) {
    return (
      squares[index].classList.contains("wall") ||
      squares[index].classList.contains("leftWall") ||
      squares[index].classList.contains("rightWall") ||
      squares[index].classList.contains("topLeftWall") ||
      squares[index].classList.contains("topRightWall") ||
      squares[index].classList.contains("bottomLeftWall") ||
      squares[index].classList.contains("bottomRightWall") ||
      squares[index].classList.contains("wallRadius") ||
      squares[index].classList.contains("wallRadiusBottom")
    );
  }

  let newPacmanIndex = pacmanCurrentIndex;

  switch (direction) {
    case "ArrowLeft":
      if (newPacmanIndex - 1 && !isWall(newPacmanIndex - 1)) {
        newPacmanIndex -= 1;
        squares[newPacmanIndex].classList.add("pacman-image-left");
      }
      if (newPacmanIndex - 1 === 307) {
        squares[newPacmanIndex].classList.remove("pacman-image-left");
        newPacmanIndex = 335;
      }
      break;
    case "ArrowRight":
      if (newPacmanIndex + 1 && !isWall(newPacmanIndex + 1)) {
        newPacmanIndex += 1;
        squares[newPacmanIndex].classList.add("pacman-image");
      }
      if (newPacmanIndex + 1 === 336) {
        squares[newPacmanIndex].classList.remove("pacman-image");
        newPacmanIndex = 309;
      }
      break;
    case "ArrowUp":
      if (newPacmanIndex - width && !isWall(newPacmanIndex - width)) {
        newPacmanIndex -= width;
        squares[newPacmanIndex].classList.add("pacman-image-up");
      }
      break;
    case "ArrowDown":
      if (newPacmanIndex + width && !isWall(newPacmanIndex + width)) {
        newPacmanIndex += width;
        squares[newPacmanIndex].classList.add("pacman-image-down");
      }
      break;
  }

  squares[newPacmanIndex].classList.add("pacman-image");
  
  let newScore = pacmanEatsDots(squares, newPacmanIndex, eatDotsSound, score, scoreDisplay);
  newScore = pacmanEatsBigDot(squares, newPacmanIndex, eatSound, newScore, scoreDisplay, ghosts);
  
  const gameOver = checkForGameOvers(squares, newPacmanIndex, gameOverSound, eatDotsSound, lives, livesDisplay, ghosts, handleKeyup, intervalId, showModal, modal, overlay, startPauseButton, pauseGame);
  
  let newLives = lives;
  let newGameStarted = gameStarted;
  
  if (gameOver) {
    newGameStarted = false;
    newLives = 3;
    updateLivesDisplay(livesDisplay, newLives);
  }
  
  const gameWon = checkForWin(newScore, gameWin, eatDotsSound, ghosts, handleKeyup, intervalId, showModal, modal, overlay, startPauseButton);
  
  if (gameWon) {
    newGameStarted = false;
  }

  return {
    ...gameState,
    pacmanCurrentIndex: newPacmanIndex,
    score: newScore,
    lives: newLives,
    gameStarted: newGameStarted
  };
}