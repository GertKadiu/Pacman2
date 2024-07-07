
import { moveGhost } from "./ghostMovment.js";
import { recrateBoard } from "./CreateBoard.js";

export function startGame(gameState, dependencies) {
    gameState.gameStarted = true;
    gameState.squares[gameState.pacmanCurrentIndex].classList.add("pacman-image");

    gameState.gamePaused = false;
    document.addEventListener("keyup", gameState.handleKeyup);
    gameState.ghosts.forEach((ghost) => {
        ghost.currentIndex = ghost.startIndex;
        gameState.squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        moveGhost(ghost, gameState, dependencies);
    });
    gameState.startPauseButton.textContent = "Pause Game";
    updateLivesDisplay(dependencies.livesDisplay, gameState.lives);
    return gameState;
}

export function pauseGame(gameState) {
    gameState.gamePaused = true;
    gameState.ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", gameState.handleKeyup);
    if (gameState.intervalId) clearInterval(gameState.intervalId);
    gameState.startPauseButton.textContent = "Resume Game";
    return gameState;
}

export function resumeGame(gameState, dependencies) {
    gameState.gamePaused = false;
    gameState.ghosts.forEach((ghost) => moveGhost(ghost, gameState, dependencies));
    document.addEventListener("keyup", gameState.handleKeyup);
    gameState.startPauseButton.textContent = "Pause Game";
    return gameState;
}



export function restartGame(squares, layout, scoreDisplay, livesDisplay, ghosts, pacmanCurrentIndex, startPauseButton) {
    let score = 0;
    scoreDisplay.innerHTML = `${score}`;
    let lives = 3;
    updateLivesDisplay(livesDisplay, lives);
    pacmanCurrentIndex = 321;
  
    squares.forEach((square) => {
        square.classList.remove(
            "big-dot",
            "ghost",
            "scared-ghost",
            "inky",
            "pinky",
            "blinky",
            "clyde",
            "pacman-image",
            "pacman-image-left",
            "pacman-image-up",
            "pacman-image-down",
            "pac-dot"
        );
    });
  
    squares[pacmanCurrentIndex].classList.add("pacman-image");
  
    ghosts.forEach((ghost) => {
        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    });
  
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  
    recrateBoard(squares, layout);
  
    let gameStarted = false;
    startPauseButton.textContent = "Start Game";

    return { score, lives, pacmanCurrentIndex, gameStarted };
}



export function checkForWin(score, gameWin, eatDotsSound, ghosts, handleKeyup, intervalId, showModal, modal, overlay, startPauseButton) {
    if (score >= 232) {
      gameWin.play();
      eatDotsSound.pause();
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", handleKeyup);
      if (intervalId) clearInterval(intervalId);
      showModal(modal, overlay, "YOU WIN!");
      startPauseButton.textContent = "Start Game";
      return true;
    }
    return false;
  }


 export function checkForGameOvers(squares, pacmanCurrentIndex, gameOverSound, eatDotsSound, lives, livesDisplay, ghosts, handleKeyup, intervalId, showModal, modal, overlay, startPauseButton, pauseGame) {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      gameOverSound.play();
      eatDotsSound.pause();
      lives--;
      updateLivesDisplay(livesDisplay, lives);
      squares[pacmanCurrentIndex].classList.remove(
        "pacman-image",
        "pacman-image-left",
        "pacman-image-up",
        "pacman-image-down"
      );
      pacmanCurrentIndex = 321;
      squares[pacmanCurrentIndex].classList.add("pacman-image");
  
      ghosts.forEach((ghost) => {
        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      });
      if (lives === 0) {
        ghosts.forEach((ghost) => clearInterval(ghost.timerId));
        document.removeEventListener("keyup", handleKeyup);
        if (intervalId) clearInterval(intervalId);
        showModal(modal, overlay, "Game Over");
        startPauseButton.textContent = "Start Game";
        return true;
      } else {
        pauseGame();
        startPauseButton.textContent = "Resume Game";
      }
    }
    return false;
  }


  export function updateLivesDisplay(livesDisplay, lives) {
    const lifeImages = livesDisplay.querySelectorAll('.life-image');
    lifeImages.forEach((img, index) => {
      if (index < lives) {
        img.style.display = 'inline';
      } else {
        img.style.display = 'none';
      }
    });
  }
