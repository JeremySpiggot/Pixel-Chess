const BOARD_SIZE = 8;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const PIECE_PATTERNS = {
  p: [
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  n: [
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  b: [
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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
const turnIndicator = document.getElementById("turn-indicator");
const statusText = document.getElementById("status-text");
const moveHistoryElement = document.getElementById("move-history");
const newGameButton = document.getElementById("new-game");

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

function playTone({ frequency = 440, duration = 0.08, type = "triangle", volume = 0.05, slide = 0 }) {
  if (!audioContext) return;

  const start = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  if (slide) {
    osc.frequency.linearRampToValueAtTime(frequency + slide, start + duration);
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(start);
  osc.stop(start + duration);
}

function playMoveSound() {
  initializeAudio();
  playTone({ frequency: 220, duration: 0.06, type: "triangle", volume: 0.04, slide: 25 });
}

function playCaptureSound() {
  initializeAudio();
  playTone({ frequency: 170, duration: 0.1, type: "sawtooth", volume: 0.05, slide: 90 });
}

function playCheckSound() {
  initializeAudio();
  playTone({ frequency: 190, duration: 0.12, type: "square", volume: 0.05, slide: 110 });
  setTimeout(() => playTone({ frequency: 150, duration: 0.18, type: "square", volume: 0.04, slide: 90 }), 80);
}

function playWinSound() {
  initializeAudio();
  playTone({ frequency: 420, duration: 0.12, type: "triangle", volume: 0.05, slide: 80 });
  setTimeout(() => playTone({ frequency: 560, duration: 0.16, type: "triangle", volume: 0.05, slide: 120 }), 100);
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

function squareToNotation(row, col) {
  return `${FILES[col]}${BOARD_SIZE - row}`;
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

function makeGameState() {
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
    enPassant: null,
    moveHistory: [],
    lastMove: null
  };
}

function startNewGame() {
  game = makeGameState();
  render();
}

function getPieceColor(piece) {
  return piece ? piece[0] : null;
}

function getPieceType(piece) {
  return piece ? piece[1] : null;
}

function buildPixelPieceSVG(pieceCode) {
  const type = getPieceType(pieceCode);
  const color = getPieceColor(pieceCode);
  const fill = PIECE_COLORS[color];
  const stroke = color === "w" ? "#d9d1c4" : "#223140";
  const pattern = PIECE_PATTERNS[type];

  let svg = `<svg class="piece-svg" viewBox="0 0 12 12" aria-label="${pieceCode}" role="img">`;

  for (let y = 0; y < pattern.length; y += 1) {
    for (let x = 0; x < pattern[y].length; x += 1) {
      if (pattern[y][x] === 1) {
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}" stroke="${stroke}" stroke-width="0.08" />`;
      }
    }
  }

  svg += `</svg>`;
  return svg;
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
    let row = fromRow + dr;
    let col = fromCol + dc;

    while (inBounds(row, col)) {
      if (row === targetRow && col === targetCol) return true;
      if (board[row][col]) break;
      row += dr;
      col += dc;
    }
  }

  return false;
}

function isSquareUnderAttack(board, row, col, byColor) {
  for (let r = 0; r < BOARD_SIZE; r += 1) {
    for (let c = 0; c < BOARD_SIZE; c += 1) {
      const piece = board[r][c];
      if (!piece || piece[0] !== byColor) continue;
      if (canPieceAttackSquare(board, r, c, piece, row, col)) {
        return true;
      }
    }
  }
  return false;
}

function isKingInCheck(board, color) {
  const king = getKingPosition(board, color);
  if (!king) return false;
  return isSquareUnderAttack(board, king.row, king.col, opponent(color));
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
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

  nextBoard[move.to.row][move.to.col] = move.promotion
    ? `${movingPiece[0]}${move.promotion}`
    : movingPiece;

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

  const addMove = (toRow, toCol, special = null, promotion = null) => {
    moves.push({
      from: { row, col },
      to: { row: toRow, col: toCol },
      piece,
      captured: board[toRow][toCol] || null,
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

      const target = board[targetRow][targetCol];
      if (target && target[0] !== color) {
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
        if (board[row][targetCol] === `${opponent(color)}p`) {
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
      const r = row + dr;
      const c = col + dc;
      if (!inBounds(r, c)) continue;

      const target = board[r][c];
      if (!target || target[0] !== color) {
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
          if (target[0] !== color) {
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
        if (!target || target[0] !== color) {
          addMove(r, c, target ? "capture" : null);
        }
      }
    }

    const homeRow = color === "w" ? 7 : 0;
    if (row === homeRow && col === 4) {
      if (game.castling[color].k && board[homeRow][5] === null && board[homeRow][6] === null && board[homeRow][7] === `${color}r`) {
        addMove(homeRow, 6, "castle");
      }
      if (game.castling[color].q && board[homeRow][1] === null && board[homeRow][2] === null && board[homeRow][3] === null && board[homeRow][0] === `${color}r`) {
        addMove(homeRow, 2, "castle");
      }
    }
  }

  return moves;
}

function generateLegalMovesForColor(color) {
  const moves = [];

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = game.board[row][col];
      if (!piece || piece[0] !== color) continue;

      const pseudoMoves = generatePseudoMovesForPiece(game.board, row, col, piece);
      for (const move of pseudoMoves) {
        const nextBoard = simulateMove(game.board, move);
        if (!isKingInCheck(nextBoard, color)) {
          moves.push(move);
        }
      }
    }
  }

  return moves;
}

function moveToNotation(move) {
  const piece = move.piece;
  const pieceType = getPieceType(piece);
  const fromSquare = squareToNotation(move.from.row, move.from.col);
  const toSquare = squareToNotation(move.to.row, move.to.col);

  if (move.special === "castle") {
    return move.to.col === 6 ? "O-O" : "O-O-O";
  }

  if (pieceType === "p") {
    if (move.captured) {
      return `${FILES[move.from.col]}x${toSquare}`;
    }
    return toSquare;
  }

  const letter = pieceType.toUpperCase();
  const prefix = move.captured ? `${letter}x` : letter;
  return `${prefix}${toSquare}`;
}

function renderMoveHistory() {
  const rows = [];
  const history = game.moveHistory;

  for (let i = 0; i < history.length; i += 1) {
    const pair = history[i];
    rows.push(`
      <div class="move-history-row">
        <span class="move-index">${i + 1}.</span>
        <span class="move-pair">${pair.white || ""}</span>
        <span class="move-pair">${pair.black || ""}</span>
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
      square.dataset.row = String(row);
      square.dataset.col = String(col);

      const isDark = (row + col) % 2 === 1;
      square.style.background = isDark ? "var(--board-dark)" : "var(--board-light)";

      if (game.selected && game.selected.row === row && game.selected.col === col) {
        square.classList.add("selected");
      }

      if (game.lastMove && ((game.lastMove.from.row === row && game.lastMove.from.col === col) || (game.lastMove.to.row === row && game.lastMove.to.col === col))) {
        square.style.boxShadow = "inset 0 0 0 3px rgba(255,255,255,0.35)";
      }

      const legalMove = game.legalMoves.find((move) => move.to.row === row && move.to.col === col);
      if (legalMove) {
        square.classList.add(legalMove.capture || legalMove.special === "enPassant" ? "legal capture" : "legal");
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

  const moveNotation = moveToNotation(move);

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

  game.lastMove = {
    from: { row: move.from.row, col: move.from.col },
    to: { row: move.to.row, col: move.to.col }
  };

  if (capturedPiece) {
    playCaptureSound();
  } else {
    playMoveSound();
  }

  const nextTurn = opponent(game.turn);
  const moveEntry = {
    white: game.turn === "w" ? moveNotation : "",
    black: game.turn === "b" ? moveNotation : ""
  };

  if (game.turn === "w") {
    const historyLength = game.moveHistory.length;
    if (historyLength > 0 && !game.moveHistory[historyLength - 1].black) {
      game.moveHistory[historyLength - 1].white = moveNotation;
    } else {
      game.moveHistory.push({ white: moveNotation, black: "" });
    }
  } else {
    const last = game.moveHistory[game.moveHistory.length - 1];
    if (last) {
      last.black = moveNotation;
    }
  }

  game.turn = nextTurn;
  game.selected = null;
  game.legalMoves = [];

  const legalMovesForNextTurn = generateLegalMovesForColor(nextTurn);
  if (legalMovesForNextTurn.length === 0) {
    const inCheck = isKingInCheck(game.board, nextTurn);
    game.status = inCheck ? `${colorName(opponent(nextTurn))} wins by checkmate` : "Draw by stalemate";
    if (inCheck) playWinSound();
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
    const chosenMove = game.legalMoves.find((move) => move.to.row === row && move.to.col === col);
    if (chosenMove) {
      applyMove(chosenMove);
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
