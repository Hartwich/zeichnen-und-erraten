# AI Agent Guide

This repo contains only the Zeichnen & Erraten game package.

- It is not a standalone app.
- Run and test it through the Open Party Lab platform.
- Keep public exports limited to manifest, protocol, server, host, and controller entrypoints.
- Do not import private Platform app files from this package.
- Declare shared lobby/setup controls through `manifest.lobbySetup`.
- Validate setup actions in the server package before writing `roomSettings`.
