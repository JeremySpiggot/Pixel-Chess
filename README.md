# Pixel-Chess

A small, browser-based chess game built with HTML, CSS, and JavaScript.

Features:
- Pixel-art chess pieces rendered from an SVG sprite sheet
- Sound effects generated in-browser with Web Audio
- Legal move validation
- Turn management
- Check, checkmate, and stalemate detection
- Castling, en passant, and pawn promotion
- Lightweight open-source structure for learning

## Run locally

1. Open the project folder in a browser, or serve it locally with a simple static server.
2. Open `index.html` directly in a browser.

Example using Python:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## File overview

- `index.html` – game shell and layout
- `styles.css` – pixel-art board styling and UI
- `script.js` – chess logic, interaction, and sound effects
- `assets/chess-sprites.svg` – sprite sheet for all chess pieces

## Learning goals

This project is designed as a teaching tool:
- learn board representation and move generation
- understand legal-move checking
- see how turn state and special rules work
- practice building a small game loop in plain JavaScript

## License

MIT
