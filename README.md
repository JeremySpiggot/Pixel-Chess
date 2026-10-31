const BOARD_SIZE = 8;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const PIECE_PATTERNS = {
  p: [
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  n: [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  b: [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  r: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  q: [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  k: [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

const PIECE_COLORS = {
  w: "#f6efe5",
  b: "#1b2430"
};

const boardElement = document.getElementById("board");
const moveHistoryElement = document.getElementById("move-history");
const turnIndicator = document.getElementById("turn-indicator");
const statusText = document.getElementById("status-text");
const newGameButton = document.getElementById("new-game");

let game = null;

function createInitialBoard() {
  return [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
  ];
}

function opponent(color) {
  return color === "w" ? "b" : "w";
}

function colorName(color) {
  return color === "w" ? "White" : "Black";
}

function inBounds(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function squareToNotation(row, col) {
  return `${FILES[col]}${BOARD_SIZE - row}`;
}

function getPieceColor(piece) {
  return piece ? piece[0] : null;
}

function getPieceType(piece) {
  return piece ? piece[1] : null;
}

function buildPixelPieceSVG(pieceCode) {
  const pattern = PIECE_PATTERNS[getPieceType(pieceCode)];
  const fill = PIECE_COLORS[getPieceColor(pieceCode)];
  const stroke = getPieceColor(pieceCode) === "w" ? "#d9d0c0" : "#243344";

  let svg = `<svg class="piece-svg" viewBox="0 0 12 12" role="img" aria-label="${pieceCode}">`;
  for (let y = 0; y < pattern.length; y += 1) {
    for (let x = 0; x < pattern[y].length; x += 1) {
      if (pattern[y][x] === 1) {
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}" stroke="${stroke}" stroke-width="0.08" />`;
      }
    }
  }
  svg += "</svg>";
  return svg;
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function getKingPosition(board, color) {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (board[row][col] === `${color}k`) {
        return { row, col };
      }
    }
  }
  return null;
}

function squareIsAttacked(board, row, col, byColor) {
  for (let r = 0; r < BOARD_SIZE; r += 1) {
    for (let c = 0; c < BOARD_SIZE; c += 1) {
      const piece = board[r][c];
      if (!piece || getPieceColor(piece) !== byColor) continue;

      const type = getPieceType(piece);
      const color = getPieceColor(piece);
      const rowDiff = Math.abs(r - row);
      const colDiff = Math.abs(c - col);

      if (type === "p") {
        const forward = color === "w" ? -1 : 1;
        if ((row - r) === forward && colDiff === 1) {
          return true;
        }
        continue;
      }

      if (type === "n") {
        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
          return true;
        }
        continue;
      }

      if (type === "k") {
        if (rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0)) {
          return true;
        }
        continue;
      }

      const directions = [];
      if (type === "b" || type === "q") {
        directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
      }
      if (type === "r" || type === "q") {
        directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);
      }

      for (const [dr, dc] of directions) {
        let rr = r + dr;
        let cc = c + dc;
        while (inBounds(rr, cc)) {
          if (rr === row && cc === col) {
            return true;
          }
          if (board[rr][cc]) break;
          rr += dr;
          cc += dc;
        }
      }
    }
  }

  return false;
}

function isKingInCheck(board, color) {
  const king = getKingPosition(board, color);
  if (!king) return false;
  return squareIsAttacked(board, king.row, king.col, opponent(color));
}

function simulateMove(board, move) {
  const nextBoard = cloneBoard(board);
  const piece = nextBoard[move.from.row][move.from.col];
  nextBoard[move.from.row][move.from.col] = null;
  nextBoard[move.to.row][move.to.col] = piece;
  return nextBoard;
}

function generatePseudoMoves(board, row, col, piece) {
  const type = getPieceType(piece);
  const color = getPieceColor(piece);
  const moves = [];

  const addMove = (toRow, toCol, special = null) => {
    moves.push({
      from: { row, col },
      to: { row: toRow, col: toCol },
      piece,
      captured: board[toRow][toCol],
      special
    });
  };

  if (type === "p") {
    const direction = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;
    const promotionRow = color === "w" ? 0 : 7;

    if (inBounds(row + direction, col) && !board[row + direction][col]) {
      if (row + direction === promotionRow) {
        addMove(row + direction, col, "promotion");
      } else {
        addMove(row + direction, col);
      }

      if (row === startRow) {
        const twoStepRow = row + direction * 2;
        if (!board[twoStepRow][col]) {
          addMove(twoStepRow, col, "double");
        }
      }
    }

    for (const dc of [-1, 1]) {
      const r = row + direction;
      const c = col + dc;
      if (!inBounds(r, c)) continue;
      const target = board[r][c];
      if (target && getPieceColor(target) !== color) {
        if (r === promotionRow) {
          addMove(r, c, "promotion");
        } else {
          addMove(r, c, "capture");
        }
      }
    }
  }

  if (type === "n") {
    const offsets = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    for (const [dr, dc] of offsets) {
      const r = row + dr;
      const c = col + dc;
      if (!inBounds(r, c)) continue;
      const target = board[r][c];
      if (!target || getPieceColor(target) !== color) {
        addMove(r, c, target ? "capture" : null);
      }
    }
  }

  if (type === "b" || type === "r" || type === "q") {
    const directions = [];
    if (type === "b" || type === "q") directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    if (type === "r" || type === "q") directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);

    for (const [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      while (inBounds(r, c)) {
        const target = board[r][c];
        if (!target) {
          addMove(r, c);
        } else {
          if (getPieceColor(target) !== color) {
            addMove(r, c, "capture");
          }
          break;
        }
        r += dr;
        c += dc;
      }
    }
  }

  if (type === "k") {
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        if (!inBounds(r, c)) continue;
        const target = board[r][c];
        if (!target || getPieceColor(target) !== color) {
          addMove(r, c, target ? "capture" : null);
        }
      }
    }
  }

  return moves;
}

function generateLegalMovesForColor(board, color) {
  const pseudoMoves = [];

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (!piece || getPieceColor(piece) !== color) continue;
      pseudoMoves.push(...generatePseudoMoves(board, row, col, piece));
    }
  }

  return pseudoMoves.filter((move) => {
    const nextBoard = simulateMove(board, move);
    return !isKingInCheck(nextBoard, color);
  });
}

function moveToNotation(move) {
  const type = getPieceType(move.piece);
  const target = squareToNotation(move.to.row, move.to.col);

  if (type === "p") {
    return move.captured ? `${FILES[move.from.col]}x${target}` : target;
  }

  const label = type.toUpperCase();
  return move.captured ? `${label}x${target}` : `${label}${target}`;
}

function startNewGame() {
  game = {
    board: createInitialBoard(),
    turn: "w",
    selected: null,
    legalMoves: [],
    moveHistory: [],
    status: "White to move"
  };
  render();
}

function renderMoveHistory() {
  const rows = [];
  for (let i = 0; i < game.moveHistory.length; i += 1) {
    const entry = game.moveHistory[i];
    rows.push(`
      <div class="move-row">
        <span class="move-index">${i + 1}.</span>
        <span class="move-cell">${entry.white || ""}</span>
        <span class="move-cell">${entry.black || ""}</span>
      </div>
    `);
  }
  moveHistoryElement.innerHTML = rows.join("");
}

function renderBoard() {
  boardElement.innerHTML = "";

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const square = document.createElement("button");
      square.type = "button";
      square.className = "square";
      const dark = (row + col) % 2 === 1;
      square.style.background = dark ? "var(--board-dark)" : "var(--board-light)";

      if (game.selected && game.selected.row === row && game.selected.col === col) {
        square.classList.add("selected");
      }

      const legalMove = game.legalMoves.find((move) => move.to.row === row && move.to.col === col);
      if (legalMove) {
        square.classList.add(legalMove.captured ? "legal capture" : "legal");
      }

      const piece = game.board[row][col];
      if (piece) {
        square.innerHTML = buildPixelPieceSVG(piece);
      }

      square.addEventListener("click", () => handleSquareClick(row, col));
      boardElement.appendChild(square);
    }
  }
}

function renderStatus() {
  turnIndicator.textContent = colorName(game.turn);
  statusText.textContent = game.status;
}

function render() {
  renderBoard();
  renderStatus();
  renderMoveHistory();
}

function selectPiece(row, col) {
  const piece = game.board[row][col];
  if (!piece || getPieceColor(piece) !== game.turn) return;

  game.selected = { row, col };
  game.legalMoves = generateLegalMovesForColor(game.board, game.turn).filter(
    (move) => move.from.row === row && move.from.col === col
  );
  render();
}

function applyMove(move) {
  const piece = game.board[move.from.row][move.from.col];
  const captured = game.board[move.to.row][move.to.col];

  game.board[move.from.row][move.from.col] = null;
  game.board[move.to.row][move.to.col] = piece;

  const notation = moveToNotation(move);
  const moveNumber = Math.ceil((game.moveHistory.length + 1) / 2);

  if (game.turn === "w") {
    const last = game.moveHistory[game.moveHistory.length - 1];
    if (last && !last.black) {
      last.white = notation;
    } else {
      game.moveHistory.push({ white: notation, black: "" });
    }
  } else {
    const last = game.moveHistory[game.moveHistory.length - 1];
    if (last) {
      last.black = notation;
    }
  }

  if (captured) {
    // no extra sound logic for now
  }

  game.selected = null;
  game.legalMoves = [];

  const nextTurn = opponent(game.turn);
  const legalMoves = generateLegalMovesForColor(game.board, nextTurn);

  if (legalMoves.length === 0) {
    const inCheck = isKingInCheck(game.board, nextTurn);
    game.status = inCheck ? `${colorName(game.turn)} wins by checkmate` : "Draw by stalemate";
  } else if (isKingInCheck(game.board, nextTurn)) {
    game.status = `${colorName(nextTurn)} is in check`;
  } else {
    game.status = `${colorName(nextTurn)} to move`;
  }

  game.turn = nextTurn;
  render();
}

function handleSquareClick(row, col) {
  const piece = game.board[row][col];

  if (game.selected) {
    const chosenMove = game.legalMoves.find((move) => move.to.row === row && move.to.col === col);
    if (chosenMove) {
      applyMove(chosenMove);
      return;
    }

    if (piece && getPieceColor(piece) === game.turn) {
      selectPiece(row, col);
      return;
    }

    game.selected = null;
    game.legalMoves = [];
    render();
    return;
  }

  if (piece && getPieceColor(piece) === game.turn) {
    selectPiece(row, col);
  }
}

newGameButton.addEventListener("click", () => {
  startNewGame();
});

startNewGame();
