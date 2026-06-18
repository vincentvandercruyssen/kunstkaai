# FutureProof — Minigame

A browser-based mini-game that combines tower defense and energy management in a colourful eco-themed interface.

## What it does

- **Eco Defense mode**: Place sustainable defense units along the pollution route to protect the river corridor and the base.
- **Power Station mode**: Build energy generators on the field to passively collect energy over time.- **Sell placed items**: Click a placed tower or generator to sell it and free the space for a new deployment.
- **Radical tower upgrades**: Each defense tower gains stronger, more dramatic upgrades and unique visual shapes inspired by real-world eco devices.- **Wave progression**: Launch pollution waves and earn energy for each enemy defeated.
- **Upgrade system**: Improve deployed towers with better damage, faster attack rate, and larger range.

## How to play

1. Open `index.html` in a web browser.
2. Use the left panel to choose between:
   - **Eco Defense**: deploy towers beside the path.
   - **Power Station**: place generators on the field.
3. Click an item to select it, then click a valid grid cell to place it.
4. Press **Launch Wave** to start the next wave of enemies.
5. Monitor stats in the right panel:
   - `Energy`: available currency for placing and upgrading units.
   - `Base Health`: if this falls to zero, the game ends.
   - `Wave`: current wave number.
   - `Threat`: number of enemies remaining.
6. Use the **Restart** button to reset the game.

## Main files

- `index.html` — game interface and layout.
- `style.css` — visual styling for the app and game UI.
- `script.js` — game logic for both defense and power station modes.

## Game mechanics

- Towers attack enemies automatically when placed in defense mode.
- Towers have unique stats: cost, damage, range, and fire rate.
- Power objects generate passive energy when placed in power station mode.
- The game alternates between path-based defense gameplay and field-based energy collection.

## Notes

- The game is fully client-side and works by opening `index.html` in a browser.
- The interface adapts to smaller screens using responsive layout rules in `style.css`.
