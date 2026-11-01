CC ?= gcc
all: dining
dining: game_cli.c menu.c menu.h
	$(CC) -Wall -O2 -o dining game_cli.c menu.c
# Optional: needs Emscripten (emcc). Produces ../web/menu.wasm used by the website.
wasm:
	emcc menu.c -O2 -s STANDALONE_WASM=1 --no-entry -o ../web/menu.wasm
clean:
	rm -f dining ../web/menu.wasm
