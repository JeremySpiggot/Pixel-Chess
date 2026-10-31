const boardElement = document.getElementById("board");
const turnIndicator = document.getElementById("turn-indicator");
const statusText = document.getElementById("status-text");
const newGameButton = document.getElementById("new-game");

const BOARD_SIZE = 8;
const PIECE_ORDER = ["p", "n", "b", "r", "q", "k"];
let game = null;
let audioContext = null;

function initializeAudio() {
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioCtor) {
      audioContext = new AudioCtor();
    }
  }
}

function playTone({ frequency = 440, duration = 0.08, type = "square", volume = 0.06, slide = 0 }) {
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  if (slide) {
    oscillator.frequency.linearRampToValueAtTime(frequency + slide, now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playMoveSound() {
  initializeAudio();
  playTone({ frequency: 230, duration: 0.06, type: "triangle", volume: 0.04, slide: 30 });
}

function playCaptureSound() {
  initializeAudio();
  playTone({ frequency: 190, duration: 0.1, type: "sawtooth", volume: 0.05, slide: 80 });
}

function playCheckSound() {
  initializeAudio();
  playTone({ frequency: 180, duration: 0.12, type: "square", volume: 0.06, slide: 140 });
  setTimeout(() => playTone({ frequency: 140, duration: 0.18, type: "square", volume: 0.05, slide: 120 }), 90);
}

function playWinSound() {
  initializeAudio();
  playTone({ frequency: 420, duration: 0.12, type: "triangle", volume: 0.05, slide: 80 });
  setTimeout(() => playTone({ frequency: 560, duration: 0.18, type: "triangle", volume: 0.05, slide: 120 }), 120);
}

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

function colorName(color) {
  return color === "w" ? "White" : "Black";
}

function opponent(color) {
  return color === "w" ? "b" : "w";
}

function inBounds(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function getPieceColor(piece) {
  return piece ? piece[0] : null;
}

function getPieceType(piece) {
  return piece ? piece[1] : null;
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

function isSquareUnderAttack(board, targetRow, targetCol, byColor) {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (!piece || piece[0] !== byColor) continue;

      if (canPieceAttackSquare(board, row, col, piece, targetRow, targetCol)) {
        return true;
      }
    }
  }

  return false;
}

function canPieceAttackSquare(board, fromRow, fromCol, piece, targetRow, targetCol) {
  const type = getPieceType(piece);
  const color = getPieceColor(piece);

  if (!piece) return false;

  if (type === "p") {
    const direction = color === "w" ? -1 : 1;
    return targetRow === fromRow + direction && Math.abs(targetCol - fromCol) === 1;
  }

  if (type === "n") {
    const rowDiff = Math.abs(fromRow - targetRow);
    const colDiff = Math.abs(fromCol - targetCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  }

  if (type === "k") {
    return Math.abs(fromRow - targetRow) <= 1 && Math.abs(fromCol - targetCol) <= 1;
  }

  const directions = [];
  if (type === "b" || type === "q") {
    directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
  }
  if (type === "r" || type === "q") {
    directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);
  }

  for (const [dr, dc] of directions) {
    let r = fromRow + dr;
    let c = fromCol + dc;

    while (inBounds(r, c)) {
      if (r === targetRow && c === targetCol) return true;
      if (board[r][c]) break;
      r += dr;
      c += dc;
    }
  }

  return false;
}

function isKingInCheck(board, color) {
  const kingPos = getKingPosition(board, color);
  if (!kingPos) return false;
  return isSquareUnderAttack(board, kingPos.row, kingPos.col, opponent(color));
}

function getPieceIconMarkup(pieceCode) {
  const pieceName = pieceCode.toLowerCase();
  return `
    <svg class="piece-icon" viewBox="0 0 16 16" aria-label="${pieceName}" role="img">
      <use href="assets/chess-sprites.svg#${pieceName}" xlink:href="assets/chess-sprites.svg#${pieceName}"></use>
    </svg>
  `;
}

function createGameState() {
  return {
    board: createInitialBoard(),
    turn: "w",
    selected: null,
    legalMoves: [],
    status: "White to move",
    castling: {
      w: { k: true, q: true },
      b: { k: true, q: true }
    },
    enPassant: null
  };
}

function startNewGame() {
  game = createGameState();
  render();
}

function simulateMove(board, move) {
  const nextBoard = cloneBoard(board);
  const movingPiece = nextBoard[move.from.row][move.from.col];

  nextBoard[move.from.row][move.from.col] = null;

  if (move.special === "enPassant") {
    nextBoard[move.from.row][move.to.col] = null;
  }

  if (move.special === "castle") {
    if (move.to.col === 6) {
      nextBoard[move.from.row][5] = nextBoard[move.from.row][7];
      nextBoard[move.from.row][7] = null;
    } else if (move.to.col === 2) {
      nextBoard[move.from.row][3] = nextBoard[move.from.row][0];
      nextBoard[move.from.row][0] = null;
    }
  }

  const finalPiece = move.promotion ? `${movingPiece[0]}${move.promotion}` : movingPiece;
  nextBoard[move.to.row][move.to.col] = finalPiece;

  return nextBoard;
}

function updateCastlingRights(move, movingPiece, capturedPiece) {
  const color = movingPiece[0];

  if (movingPiece[1] === "k") {
    game.castling[color].k = false;
    game.castling[color].q = false;
  }

  if (movingPiece[1] === "r") {
    if (move.from.row === 7 && move.from.col === 0) game.castling.w.q = false;
    if (move.from.row === 7 && move.from.col === 7) game.castling.w.k = false;
    if (move.from.row === 0 && move.from.col === 0) game.castling.b.q = false;
    if (move.from.row === 0 && move.from.col === 7) game.castling.b.k = false;
  }

  if (capturedPiece && capturedPiece[1] === "r") {
    if (move.to.row === 7 && move.to.col === 0) game.castling.w.q = false;
    if (move.to.row === 7 && move.to.col === 7) game.castling.w.k = false;
    if (move.to.row === 0 && move.to.col === 0) game.castling.b.q = false;
    if (move.to.row === 0 && move.to.col === 7) game.castling.b.k = false;
  }
}

function generatePseudoMovesForPiece(board, row, col, piece) {
  const type = getPieceType(piece);
  const color = getPieceColor(piece);
  const moves = [];

  const addMove = (targetRow, targetCol, special = null, promotion = null) => {
    const captured = board[targetRow][targetCol] || null;
    moves.push({
      from: { row, col },
      to: { row: targetRow, col: targetCol },
      piece,
      captured,
      special,
      promotion
    });
  };

  if (type === "p") {
    const direction = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;
    const promotionRow = color === "w" ? 0 : 7;

    const oneStep = row + direction;
    if (inBounds(oneStep, col) && !board[oneStep][col]) {
      if (oneStep === promotionRow) {
        addMove(oneStep, col, "promotion", "q");
        addMove(oneStep, col, "promotion", "r");
        addMove(oneStep, col, "promotion", "b");
        addMove(oneStep, col, "promotion", "n");
      } else {
        addMove(oneStep, col);
      }

      const twoStep = row + direction * 2;
      if (row === startRow && !board[twoStep][col]) {
        addMove(twoStep, col, "double");
      }
    }

    for (const deltaCol of [-1, 1]) {
      const targetRow = row + direction;
      const targetCol = col + deltaCol;

      if (!inBounds(targetRow, targetCol)) continue;

      const targetPiece = board[targetRow][targetCol];
      if (targetPiece && targetPiece[0] !== color) {
        if (targetRow === promotionRow) {
          addMove(targetRow, targetCol, "promotion", "q");
          addMove(targetRow, targetCol, "promotion", "r");
          addMove(targetRow, targetCol, "promotion", "b");
          addMove(targetRow, targetCol, "promotion", "n");
        } else {
          addMove(targetRow, targetCol, "capture");
        }
      }

      if (game.enPassant && game.enPassant.row === targetRow && game.enPassant.col === targetCol) {
        const capturedTarget = board[row][targetCol];
        if (capturedTarget === `${opponent(color)}p`) {
          addMove(targetRow, targetCol, "enPassant");
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
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (!inBounds(nextRow, nextCol)) continue;

      const targetPiece = board[nextRow][nextCol];
      if (!targetPiece || targetPiece[0] !== color) {
        addMove(nextRow, nextCol, targetPiece ? "capture" : null);
      }
    }
  }

  if (type === "b" || type === "r" || type === "q") {
    const directions = [];
    if (type === "b" || type === "q") {
      directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    }
    if (type === "r" || type === "q") {
      directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);
    }

    for (const [dr, dc] of directions) {
      let nextRow = row + dr;
      let nextCol = col + dc;

      while (inBounds(nextRow, nextCol)) {
        const targetPiece = board[nextRow][nextCol];

        if (!targetPiece) {
          addMove(nextRow, nextCol);
        } else {
          if (targetPiece[0] !== color) {
            addMove(nextRow, nextCol, "capture");
          }
          break;
        }

        nextRow += dr;
        nextCol += dc;
      }
    }
  }

  if (type === "k") {
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        if (dr === 0 && dc === 0) continue;
        const nextRow = row + dr;
        const nextCol = col + dc;

        if (!inBounds(nextRow, nextCol)) continue;

        const targetPiece = board[nextRow][nextCol];
        if (!targetPiece || targetPiece[0] !== color) {
          addMove(nextRow, nextCol, targetPiece ? "capture" : null);
        }
      }
    }

    const homeRow = color === "w" ? 7 : 0;
    if (row === homeRow && col === 4) {
      if (game.castling[color].k && board[homeRow][5] === null && board[homeRow][6] === null) {
        if (board[homeRow][7] === `${color}r`) {
          addMove(homeRow, 6, "castle");
        }
      }

      if (game.castling[color].q && board[homeRow][1] === null && board[homeRow][2] === null && board[homeRow][3] === null) {
        if (board[homeRow][0] === `${color}r`) {
          addMove(homeRow, 2, "castle");
        }
      }
    }
  }

  return moves;
}

function generateLegalMovesForColor(color) {
  const legalMoves = [];

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = game.board[row][col];
      if (!piece || piece[0] !== color) continue;

      const candidateMoves = generatePseudoMovesForPiece(game.board, row, col, piece);

      for (const move of candidateMoves) {
        const nextBoard = simulateMove(game.board, move);
        if (!isKingInCheck(nextBoard, color)) {
          legalMoves.push(move);
        }
      }
    }
  }

  return legalMoves;
}

function renderBoard() {
  boardElement.innerHTML = "";

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const squareButton = document.createElement("button");
      squareButton.type = "button";
      squareButton.className = "square";
      squareButton.dataset.row = String(row);
      squareButton.dataset.col = String(col);

      const isDark = (row + col) % 2 === 1;
      squareButton.style.background = isDark ? "var(--wood-dark)" : "var(--wood-light)";
      squareButton.setAttribute("aria-label", `Square ${row + 1}, ${col + 1}`);

      if (game.selected && game.selected.row === row && game.selected.col === col) {
        squareButton.classList.add("selected");
      }

      const legalMove = game.legalMoves.find((move) => move.to.row === row && move.to.col === col);
      if (legalMove) {
        squareButton.classList.add(legalMove.capture || legalMove.special === "enPassant" ? "legal capture" : "legal");
      }

      const piece = game.board[row][col];
      if (piece) {
        squareButton.innerHTML = getPieceIconMarkup(piece);
      }

      squareButton.addEventListener("click", () => handleSquareClick(row, col));
      boardElement.appendChild(squareButton);
    }
  }
}

function updateStatusText() {
  turnIndicator.textContent = colorName(game.turn);
  statusText.textContent = game.status;
}

function render() {
  renderBoard();
  updateStatusText();
}

function selectPiece(row, col) {
  const piece = game.board[row][col];
  if (!piece || piece[0] !== game.turn) return;

  game.selected = { row, col };
  game.legalMoves = generateLegalMovesForColor(game.turn).filter(
    (move) => move.from.row === row && move.from.col === col
  );

  render();
}

function applyMove(move) {
  const movingPiece = game.board[move.from.row][move.from.col];
  const capturedPiece = game.board[move.to.row][move.to.col];

  game.board = simulateMove(game.board, move);
  updateCastlingRights(move, movingPiece, capturedPiece);

  if (movingPiece[1] === "p" && Math.abs(move.to.row - move.from.row) === 2) {
    game.enPassant = { row: (move.from.row + move.to.row) / 2, col: move.from.col };
  } else {
    game.enPassant = null;
  }

  if (move.special === "enPassant") {
    game.enPassant = null;
  }

  const nextTurn = opponent(game.turn);
  game.turn = nextTurn;
  game.selected = null;
  game.legalMoves = [];

  if (capturedPiece) {
    playCaptureSound();
  } else {
    playMoveSound();
  }

  const legalMovesForNextTurn = generateLegalMovesForColor(nextTurn);

  if (legalMovesForNextTurn.length === 0) {
    const inCheck = isKingInCheck(game.board, nextTurn);
    game.status = inCheck
      ? `${colorName(opponent(nextTurn))} wins by checkmate`
      : "Draw by stalemate";
    if (inCheck) {
      playWinSound();
    }
  } else if (isKingInCheck(game.board, nextTurn)) {
    game.status = `${colorName(nextTurn)} is in check`;
    playCheckSound();
  } else {
    game.status = `${colorName(nextTurn)} to move`;
  }

  render();
}

function handleSquareClick(row, col) {
  const piece = game.board[row][col];

  if (game.selected) {
    const selectedMove = game.legalMoves.find(
      (move) => move.to.row === row && move.to.col === col
    );

    if (selectedMove) {
      applyMove(selectedMove);
      return;
    }

    if (piece && piece[0] === game.turn) {
      selectPiece(row, col);
      return;
    }

    game.selected = null;
    game.legalMoves = [];
    render();
    return;
  }

  if (piece && piece[0] === game.turn) {
    selectPiece(row, col);
  }
}

newGameButton.addEventListener("click", () => {
  startNewGame();
  playMoveSound();
});

startNewGame();
