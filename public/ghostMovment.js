
import { checkForGameOvers, updateLivesDisplay } from "./GameControls.js";

export class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

export function moveGhost(ghost, gameState, dependencies) {
  const {
    squares,
    width,
    gamePaused,
    pacmanCurrentIndex,
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
    gameOverSound,
    eatDotsSound,
    livesDisplay
  } = dependencies;

  if (gamePaused) return;

  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost") && 
      !squares[ghost.currentIndex + direction].classList.contains("leftWall") &&
      !squares[ghost.currentIndex + direction].classList.contains("rightWall") &&
      !squares[ghost.currentIndex + direction].classList.contains("topLeftWall") &&
      !squares[ghost.currentIndex + direction].classList.contains("topRightWall") &&
      !squares[ghost.currentIndex + direction].classList.contains("bottomLeftWall") &&
      !squares[ghost.currentIndex + direction].classList.contains("bottomRightWall") &&
      !squares[ghost.currentIndex + direction].classList.contains("wallRadius") &&
      !squares[ghost.currentIndex + direction].classList.contains("wallRadiusBottom")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );

      ghost.currentIndex += direction;

      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    if (ghost.currentIndex === pacmanCurrentIndex) {
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      } else {
        const gameOver = checkForGameOvers(squares, pacmanCurrentIndex, gameOverSound, eatDotsSound, lives, livesDisplay, ghosts, handleKeyup, intervalId, showModal, modal, overlay, startPauseButton, pauseGame);
        if (gameOver) {
          gameState.gameStarted = false;
          gameState.lives = 3;
          updateLivesDisplay(livesDisplay, gameState.lives);
        }
      }
    }

    if(!ghost.isScared){
      const newDirection = getDirectionTowardsPacman(ghost.currentIndex, pacmanCurrentIndex, width, squares);
      if (newDirection !== null) {
        direction = newDirection;
      }
    }
  }, ghost.speed);
}

export function getDirectionTowardsPacman(ghostIndex, pacmanCurrentIndex, width, squares) {
  const ghostX = ghostIndex % width;
  const ghostY = Math.floor(ghostIndex / width);
  const pacmanX = pacmanCurrentIndex % width;
  const pacmanY = Math.floor(pacmanCurrentIndex / width);

  const directions = [];


  function DirectionForGhostClear(squares, index) {
    return (
      !squares[index].classList.contains("ghost") &&
      !squares[index].classList.contains("wall") &&
      !squares[index].classList.contains("leftWall") &&
      !squares[index].classList.contains("rightWall") &&
      !squares[index].classList.contains("topLeftWall") &&
      !squares[index].classList.contains("topRightWall") &&
      !squares[index].classList.contains("bottomLeftWall") &&
      !squares[index].classList.contains("bottomRightWall") &&
      !squares[index].classList.contains("wallRadius") &&
      !squares[index].classList.contains("wallRadiusBottom")
    );
}

  if (pacmanX < ghostX && DirectionForGhostClear(squares, ghostIndex - 1)) {
    directions.push(-1);
  }
  if (pacmanX > ghostX && DirectionForGhostClear(squares, ghostIndex + 1)) {
    directions.push(1);
  }
  if (pacmanY < ghostY && DirectionForGhostClear(squares, ghostIndex - width)) {
    directions.push(-width);
  }
  if (pacmanY > ghostY && DirectionForGhostClear(squares, ghostIndex + width)) {
    directions.push(width);
  }

  if (directions.length > 0) {
    return directions[Math.floor(Math.random() * directions.length)];
  }

  return null;
}