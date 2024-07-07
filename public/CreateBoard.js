export  function createBoard(layout, squares = []) {
  const grid = document.querySelector(".grid");

  for (let div = 0; div < layout.length; div++) {
    const square = document.createElement("div");
    square.id = div;
    grid.appendChild(square);
    squares.push(square);

    if (layout[div] === 0) {
     squares[div].classList.add("pac-dot");
    }

    if (layout[div] === 1) {
      squares[div].classList.add("wall");
    }

    if (layout[div] === 2) {
      squares[div].classList.add("ghost-lair");
    }

    if (layout[div] === 3) {
      squares[div].classList.add("big-dot");
    }

    if (layout[div] === 5) {
      squares[div].classList.add("topRightWall");
    }

    if (layout[div] === 6) {
      squares[div].classList.add("bottomRightWall");
    }

    if (layout[div] === 7) {
      squares[div].classList.add("radius");
    }

    if (layout[div] === 8) {
      squares[div].classList.add("topLeftWall");
    }

    if (layout[div] === 9) {
      squares[div].classList.add("bottomLeftWall");
    }
    if (layout[div] === 10) {
      squares[div].classList.add("leftWall");
    }

    if (layout[div] === 11) {
      squares[div].classList.add("rightWall");
    }

    if (layout[div] === 12) {
      squares[div].classList.add("wallRadius");
    }
    if (layout[div] === 13) {
      squares[div].classList.add("VCase");
    }
    if (layout[div] === 14) {
      squares[div].classList.add("VCase2");
    }
    if (layout[div] === 15) {
      squares[div].classList.add("VCase3");
    }

    if (layout[div] === 16) {
      squares[div].classList.add("wallRadiusBottom");
    }
    if (layout[div] === 17) {
      squares[div].classList.add("vider");
    }
    if (layout[div] === 18) {
      squares[div].classList.add("StartWall");
    }
  }
}



export function recrateBoard(squares, layout) {
  squares.forEach((square, index) => {
      square.className = "";
      if (layout[index] === 0) {
          squares[index].classList.add("pac-dot");
      }
      if (layout[index] === 1) {
          squares[index].classList.add("wall");
      }
      if (layout[index] === 2) {
          squares[index].classList.add("ghost-lair");
      }
      if (layout[index] === 3) {
          squares[index].classList.add("big-dot");
      }
      if (layout[index] === 5) {
          squares[index].classList.add("topRightWall");
      }
      if (layout[index] === 6) {
          squares[index].classList.add("bottomRightWall");
      }
      if (layout[index] === 7) {
          squares[index].classList.add("radius");
      }
      if (layout[index] === 8) {
          squares[index].classList.add("topLeftWall");
      }
      if (layout[index] === 9) {
          squares[index].classList.add("bottomLeftWall");
      }
      if (layout[index] === 10) {
          squares[index].classList.add("leftWall");
      }
      if (layout[index] === 11) {
          squares[index].classList.add("rightWall");
      }
      if (layout[index] === 12) {
          squares[index].classList.add("wallRadius");
      }
      if (layout[index] === 13) {
          squares[index].classList.add("VCase");
      }
      if (layout[index] === 14) {
          squares[index].classList.add("VCase2");
      }
      if (layout[index] === 15) {
          squares[index].classList.add("VCase3");
      }
      if (layout[index] === 16) {
          squares[index].classList.add("wallRadiusBottom");
      }
      if (layout[index] === 17) {
          squares[index].classList.add("vider");
      }
  });
}
