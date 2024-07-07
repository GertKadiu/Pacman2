
export function pacmanEatsDots(squares, pacmanCurrentIndex, eatDotsSound, score, scoreDisplay) {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      eatDotsSound.play();
      score++;
      scoreDisplay.innerHTML = `${score}`;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
  }
  return score;
}

export function pacmanEatsBigDot(squares, pacmanCurrentIndex, eatSound, score, scoreDisplay, ghosts) {
  if (squares[pacmanCurrentIndex].classList.contains("big-dot")) {
      eatSound.play();
      score += 20;
      scoreDisplay.innerHTML = `${score}`;
      ghosts.forEach((ghost) => (ghost.isScared = true));
      setTimeout(unScareGhosts, 8000);
      squares[pacmanCurrentIndex].classList.remove("big-dot");
  }
  return score;
}

function unScareGhosts() {
  ghosts.forEach((ghost) => {
      ghost.isScared = false;
      squares[ghost.currentIndex].classList.remove("scared-ghost");
  });
}