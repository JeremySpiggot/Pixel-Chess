:root {
  --bg-1: #111a22;
  --bg-2: #1b2b36;
  --panel: rgba(25, 36, 45, 0.96);
  --panel-alt: rgba(35, 48, 60, 0.96);
  --board-light: #d8b679;
  --board-dark: #7d4d31;
  --board-border: #311f13;
  --selected: rgba(255, 220, 110, 0.96);
  --legal-dot: rgba(17, 25, 34, 0.28);
  --capture-ring: rgba(255, 240, 170, 0.96);
  --text: #edf4ff;
  --muted: #a9bfd1;
  --accent: #f4c96e;
  --accent-2: #d68a3e;
  --panel-soft: rgba(255, 255, 255, 0.04);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: radial-gradient(circle at top, rgba(126, 160, 210, 0.3), transparent 36%),
    linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 18px;
}

button {
  font: inherit;
}

.app-shell {
  width: min(96vw, 1100px);
  background: rgba(16, 23, 31, 0.92);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.28);
  padding: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 20px;
}

.board-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.board-wrapper {
  width: min(76vmin, 640px);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
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
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.34);
}

.square {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
}

.square.selected {
  box-shadow: inset 0 0 0 4px var(--selected);
}

.square.legal::after {
  content: "";
  position: absolute;
  width: 24%;
  height: 24%;
  border-radius: 50%;
  background: var(--legal-dot);
  box-shadow: 0 0 0 6px rgba(255,255,255,0.04);
}

.square.legal.capture::after {
  width: 72%;
  height: 72%;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 0 0 0 5px var(--capture-ring);
}

.piece-svg {
  width: 78%;
  height: 78%;
  display: block;
  pointer-events: none;
  filter: drop-shadow(0 3px 0 rgba(0, 0, 0, 0.18));
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.eyebrow {
  margin: 0 0 4px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.68rem;
  color: var(--muted);
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.1;
}

#new-game {
  appearance: none;
  border: none;
  border-radius: 10px;
  background: linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #251709;
  font-weight: 800;
  padding: 10px 14px;
  cursor: pointer;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.12);
}

#new-game:hover {
  filter: brightness(1.04);
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
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.68rem;
}

.status-card strong {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
}

.history-card {
  padding: 12px;
}

.history-header h2 {
  margin: 0 0 8px;
  font-size: 1.05rem;
}

.history-grid,
.move-row {
  display: grid;
  grid-template-columns: 34px 1fr 1fr;
  gap: 8px;
  align-items: center;
}

.history-grid {
  color: var(--muted);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 8px;
}

.move-history {
  display: grid;
  gap: 6px;
  max-height: 420px;
  overflow-y: auto;
}

.move-row {
  background: var(--panel-soft);
  border-radius: 8px;
  min-height: 30px;
  padding: 6px 6px;
}

.move-index {
  color: var(--muted);
  font-weight: 700;
}

.move-cell {
  text-align: center;
  font-size: 0.92rem;
}

@media (max-width: 840px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .board-wrapper {
    width: min(88vw, 560px);
  }
}

@media (max-width: 520px) {
  body {
    padding: 12px;
  }

  .app-shell {
    padding: 12px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .board-wrapper {
    width: min(90vw, 460px);
  }
}
