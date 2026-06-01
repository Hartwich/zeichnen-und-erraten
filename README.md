# Zeichnen & Erraten

Zeichnen & Erraten is an optional Open Party Lab game package.

This repo is not a standalone app. Run it through the Open Party Lab platform:

```bash
cd ../../
npm install
npm run games:sync-local
npm run dev:all
```

The platform loads this game only when the repo exists locally and `npm run games:sync-local` links it.

## Lobby Setup

The word-category setup is declared in `src/manifest.ts` via `lobbySetup`. Open Party Lab renders that generic setup UI in the host lobby and sends `configure-lobby` actions back to this package.

Game-specific validation stays in `src/server/zeichnenUndErratenConfig.ts` and `src/server/index.ts`.

## Package Entrypoints

- `@open-party-lab/game-zeichnen-und-erraten/manifest`
- `@open-party-lab/game-zeichnen-und-erraten/protocol`
- `@open-party-lab/game-zeichnen-und-erraten/server`
- `@open-party-lab/game-zeichnen-und-erraten/host`
- `@open-party-lab/game-zeichnen-und-erraten/controller`

## Development Checks

```bash
npm install
npm run typecheck
npm run build
npm run pack:dry-run
```
