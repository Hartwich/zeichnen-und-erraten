import Phaser from "phaser";
import { zeichnenUndErratenManifest } from "../manifest.js";
import { renderZeichnenUndErratenState } from "./ZeichnenUndErratenRenderer.js";

type SupportedLanguage = "de" | "en";

interface HostAppStateLike {
  room?: {
    language?: SupportedLanguage;
  } | null;
  game?: {
    message?: string;
    state?: unknown;
  } | null;
}

interface HostClientLike {
  subscribe(listener: (state: HostAppStateLike) => void): () => void;
}

export class ZeichnenUndErratenHostScene extends Phaser.Scene {
  private unsubscribe?: () => void;

  constructor() {
    super(zeichnenUndErratenManifest.hostView);
  }

  create(): void {
    const client = this.registry.get("hostClient") as HostClientLike;

    this.unsubscribe = client.subscribe((state) => {
      const gameState = state.game?.state as
        | {
            drawerName?: string;
            maskedWord?: string;
            revealedWord?: string;
            winnerName?: string;
            strokes?: Array<{ id: string; color: string; points: Array<{ x: number; y: number }> }>;
            guesses?: Array<{ playerName: string; guess: string; correct: boolean }>;
          }
        | undefined;
      const en = state.room?.language === "en";

      this.children.removeAll(true);
      this.cameras.main.setBackgroundColor("#020617");

      renderZeichnenUndErratenState(
        this,
        gameState ?? {},
        state.game?.message ?? (en ? "The drawer paints while the others guess." : "Der Zeichner malt, die anderen raten."),
        state.room?.language
      );
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
      this.unsubscribe = undefined;
    });
  }
}

export const hostGame = {
  id: zeichnenUndErratenManifest.id,
  displayName: zeichnenUndErratenManifest.displayName,
  sceneKey: zeichnenUndErratenManifest.hostView,
  scene: ZeichnenUndErratenHostScene
} as const;
