import Phaser from "phaser";
import { tokens, tokenColor } from "./platformTheme.js";

type SupportedLanguage = "de" | "en";

/**
 * This screen is chrome, not artwork.
 *
 * There is no painted background here — a header, a drawing board and a guess
 * list, all of them surfaces. They used to be fixed dark slate while the text
 * on top already read the room's tokens, which in the light theme produced dark
 * ink on a dark panel. Surfaces and ink now come from the same place, so the
 * whole screen follows the room.
 */
const hostTheme = {
  titleFont: "Arial, Helvetica, sans-serif",
  bodyFont: "Arial, Helvetica, sans-serif"
} as const;

interface DrawingPoint {
  x: number;
  y: number;
}

interface DrawingStroke {
  id: string;
  color: string;
  points: DrawingPoint[];
}

interface GuessEntry {
  playerName: string;
  guess: string;
  correct: boolean;
}

export interface ZeichnenUndErratenRenderState {
  drawerName?: string;
  maskedWord?: string;
  revealedWord?: string;
  strokes?: DrawingStroke[];
  guesses?: GuessEntry[];
  winnerName?: string;
}

/**
 * A stroke without a colour falls back to the board's own ink, so an older
 * stroke recorded before a theme switch still contrasts with the board.
 */
function parseStrokeColor(color: string | undefined): number {
  if (!color) {
    return tokenColor((theme) => theme.color.text);
  }

  return Phaser.Display.Color.HexStringToColor(color).color;
}

export function renderZeichnenUndErratenState(
  scene: Phaser.Scene,
  state: ZeichnenUndErratenRenderState,
  message: string,
  language?: SupportedLanguage
): void {
  const en = language === "en";
  const width = scene.scale.width;
  const height = scene.scale.height;
  const pad = 28;
  const boardX = pad;
  const boardY = 120;
  const boardWidth = Math.max(320, width - pad * 2 - 340);
  const boardHeight = Math.max(240, height - boardY - pad);

  const surface = tokenColor((theme) => theme.color.surface);
  const line = tokenColor((theme) => theme.color.lineStrong);

  scene.add
    .rectangle(width / 2, 56, width - pad * 2, 88, surface, 0.96)
    .setStrokeStyle(2, line, 0.8);

  const title = `${en ? "Drawer" : "Zeichner"}: ${state.drawerName ?? "-"}`;
  const wordLabel = state.revealedWord
    ? `${en ? "Word" : "Wort"}: ${state.revealedWord}`
    : `${en ? "Word" : "Wort"}: ${state.maskedWord ?? "_ _ _"}`;

  scene.add.text(pad + 18, 26, `${title}\n${wordLabel}`, {
    fontFamily: hostTheme.titleFont,
    fontSize: "28px",
    color: tokens().color.textSoft
  });

  // The board is the canvas people draw on, so it takes the room's brightest
  // surface: paper in the light theme, the raised slate in the dark one.
  scene.add
    .rectangle(
      boardX + boardWidth / 2,
      boardY + boardHeight / 2,
      boardWidth,
      boardHeight,
      tokenColor((theme) => theme.color.surfaceRaised),
      1
    )
    .setStrokeStyle(3, line, 0.9);

  const graphics = scene.add.graphics();

  for (const stroke of state.strokes ?? []) {
    const color = parseStrokeColor(stroke.color);

    if (stroke.points.length < 2) {
      const p = stroke.points[0];
      if (p) {
        graphics.fillStyle(color, 1);
        graphics.fillCircle(boardX + p.x * boardWidth, boardY + p.y * boardHeight, 3.5);
      }
      continue;
    }

    graphics.lineStyle(6, color, 1);
    graphics.beginPath();
    stroke.points.forEach((point, index) => {
      const x = boardX + point.x * boardWidth;
      const y = boardY + point.y * boardHeight;
      if (index === 0) {
        graphics.moveTo(x, y);
      } else {
        graphics.lineTo(x, y);
      }
    });
    graphics.strokePath();
  }

  const panelX = boardX + boardWidth + 16;
  const panelWidth = width - panelX - pad;
  const guesses = (state.guesses ?? []).slice(-9).reverse();

  scene.add
    .rectangle(panelX + panelWidth / 2, boardY + boardHeight / 2, panelWidth, boardHeight, surface, 0.92)
    .setStrokeStyle(2, line, 0.9);

  scene.add.text(panelX + 14, boardY + 12, en ? "Guesses" : "Tipps", {
    fontFamily: hostTheme.titleFont,
    fontSize: "26px",
    color: tokens().color.text
  });

  guesses.forEach((entry, index) => {
    scene.add.text(panelX + 14, boardY + 50 + index * 34, `${entry.playerName}: ${entry.guess}`, {
      fontFamily: hostTheme.bodyFont,
      fontSize: "21px",
      color: entry.correct ? tokens().color.success : tokens().color.textSoft
    });
  });

  scene.add.text(
    panelX + 14,
    boardY + boardHeight - 70,
    state.winnerName
      ? `${en ? "Winner" : "Gewinner"}: ${state.winnerName}`
      : en ? "No correct word yet" : "Noch kein korrektes Wort",
    {
      fontFamily: hostTheme.bodyFont,
      fontSize: "20px",
      color: state.winnerName ? tokens().color.success : tokens().color.muted,
      wordWrap: { width: panelWidth - 28 }
    }
  );

  scene.add.text(panelX + 14, boardY + boardHeight - 38, message, {
    fontFamily: hostTheme.bodyFont,
    fontSize: "18px",
    color: tokens().color.muted,
    wordWrap: { width: panelWidth - 28 }
  });
}
