import type { GameManifest } from "@open-party-lab/game-core";

export const zeichnenUndErratenManifest = {
  id: "zeichnen-und-erraten",
  displayName: "Zeichnen & Erraten",
  description: "Eine Person zeichnet auf dem Handy, alle anderen raten das Wort.",
  minPlayers: 2,
  maxPlayers: 20,
  hostView: "ZeichnenUndErratenHostScene",
  controllerView: "zeichnen-und-erraten",
  controllerLayout: "drawing_guess",
  supportsTeams: false,
  estimatedRoundDurationMs: 95_000,
  roundCompletionMode: "wait_for_ready",
  lobbySetup: {
    title: "Wortkategorie",
    description: "Waehlt, welche Begriffe in der Runde vorkommen duerfen.",
    fields: [
      {
        kind: "select",
        id: "category",
        settingKey: "zeichnenUndErratenWordCategory",
        actionKey: "category",
        label: "Kategorie",
        defaultValue: "standard",
        options: [
          {
            id: "standard",
            label: "U18",
            description: "Familienfreundliche Zeichenbegriffe."
          },
          {
            id: "adult",
            label: "Ue18",
            description: "Erwachsene Party-Begriffe."
          },
          {
            id: "all",
            label: "Alle",
            description: "U18- und Ue18-Begriffe zusammen."
          }
        ]
      },
      {
        kind: "number",
        id: "roundSeconds",
        settingKey: "zeichnenUndErratenRoundSeconds",
        actionKey: "roundSeconds",
        label: "Rundenzeit in Sekunden (0 = ohne Limit)",
        description: "Legt fest, wie lange geraten werden kann.",
        min: 0,
        max: 180,
        step: 15,
        defaultValue: 90
      }
    ]
  },
  phaseDurations: {
    roundIntroMs: 800,
    countdownMs: 900,
    resultMs: 4_000,
    scoreboardMs: 4_000
  },

  ownsScreens: ["round_intro", "result"],
  visual: { accent: "#4f7d8c", icon: "brush", eyebrow: "Drawing" },
  audio: { track: { profile: "gentle", bpm: 90, rootMidi: 62, masterGain: 0.11 } },
  hostChrome: { hud: false, roomCode: false },
  controllerChrome: { bare: true, hideSubtitle: true, hideScore: true },
} as const satisfies GameManifest;

export const manifest = zeichnenUndErratenManifest;
