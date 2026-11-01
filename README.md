# Budget Bites – Dining Simulation Game
## Run the website
    cd web && python3 -m http.server 8000   # open http://localhost:8000
## Use the C engine in the browser (optional, needs Emscripten)
    cd c && make wasm      # creates web/menu.wasm, the page picks it up automatically
## Play the C terminal version
    cd c && make && ./dining
## Files
web/ (index.html, style.css, game.js) · c/ (menu.c, menu.h, game_cli.c, Makefile) · report.md
