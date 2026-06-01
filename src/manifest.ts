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
      }
    ]
  },
  phaseDurations: {
    roundIntroMs: 1_500,
    countdownMs: 2_000,
    resultMs: 4_000,
    scoreboardMs: 4_000
  }
} as const satisfies GameManifest;

export const manifest = zeichnenUndErratenManifest;
