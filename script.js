:root {
  --bg-1: #0f151a;
  --bg-2: #1a2835;
  --panel: rgba(23, 34, 44, 0.96);
  --panel-alt: rgba(35, 48, 60, 0.96);
  --panel-soft: rgba(19, 29, 37, 0.78);
  --board-light: #d6b177;
  --board-dark: #7e4d33;
  --board-border: #362016;
  --board-shadow: rgba(0, 0, 0, 0.28);
  --text: #edf4ff;
  --muted: #a8bfce;
  --accent: #f4c86b;
  --accent-2: #d58a3b;
  --gold: #ffdc7a;
  --selected: rgba(255, 219, 96, 0.94);
  --legal-dot: rgba(17, 28, 40, 0.28);
  --capture-ring: rgba(255, 236, 136, 0.96);
  --history-row: rgba(255,255,255,0.04);
  --square-size: min(70vmin, 560px);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top, rgba(117, 156, 210, 0.22), transparent 34%),
    linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 18px;
  overflow: hidden;
}

button {
  font: inherit;
}

.app-shell {
  width: min(96vw, 1100px);
  background: rgba(15, 22, 30, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.32);
  padding: 18px 18px 20px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.1;
}

#new-game {
  background: linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 100%);
  border: none;
  border-radius: 10px;
  color: #25170a;
  font-weight: 800;
  padding: 10px 16px;
  cursor: pointer;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
}

#new-game:hover {
  filter: brightness(1.04);
}

#new-game:active {
  transform: translateY(1px);
}

.game-layout {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 280px;
  gap: 20px;
  align-items: start;
}

.board-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
}

.board-frame {
  width: min(100%, var(--square-size));
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  padding: 0;
}

.board {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  border: 10px solid var(--board-border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 14px 26px var(--board-shadow);
  background: #000;
}

.square {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  user-select: none;
  line-height: 0;
  font-size: 0;
  aspect-ratio: 1 / 1;
}

.square.selected {
  box-shadow: inset 0 0 0 4px var(--selected);
}

.square.legal::after {
  content: "";
  position: absolute;
  width: 22%;
  height: 22%;
  border-radius: 50%;
  background: var(--legal-dot);
  box-shadow: 0 0 0 5px rgba(255,255,255,0.05);
}

.square.legal.capture::after {
  width: 72%;
  height: 72%;
  border-radius: 50%;
  box-shadow: inset 0 0 0 5px var(--capture-ring);
  background: transparent;
}

.piece-svg {
  width: 80%;
  height: 80%;
  display: block;
  pointer-events: none;
  filter: drop-shadow(0 3px 0 rgba(0, 0, 0, 0.18));
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-card,
.history-card {
  background: linear-gradient(180deg, var(--panel) 0%, var(--panel-alt) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
}

.status-card {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 70px;
}

.status-card .label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.68rem;
}

.status-card strong {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
}

.history-card {
  padding: 12px 12px 10px;
}

.history-header h2 {
  margin: 0 0 10px;
  font-size: 1.06rem;
}

.history-scroll {
  width: 100%;
  max-height: 440px;
  overflow: auto;
}

.history-grid,
.move-history-row {
  display: grid;
  grid-template-columns: 34px 1fr 1fr;
  gap: 8px;
  align-items: center;
}

.history-grid-headings {
  padding: 0 4px 8px;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 8px;
}

.move-history {
  display: grid;
  gap: 4px;
}

.move-history-row {
  min-height: 32px;
  padding: 6px 4px;
  border-radius: 8px;
  background: var(--history-row);
}

.move-history-row span {
  font-size: 0.92rem;
  color: var(--text);
}

.move-history-row .move-index {
  color: var(--muted);
  font-weight: 700;
}

.move-history-row .move-pair {
  text-align: center;
}

@media (max-width: 860px) {
  .game-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    width: 100%;
  }

  .history-scroll {
    max-height: 220px;
  }
}

@media (max-width: 560px) {
  body {
    padding: 10px;
    overflow: auto;
  }

  .app-shell {
    padding: 12px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .board {
    border-width: 7px;
  }
}
