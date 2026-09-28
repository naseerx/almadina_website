# Brand asset templates

HTML templates used to render the icons and share image in `public/` with
headless Chrome (no image packages needed). Serve the repo root so the logo
path resolves, then screenshot:

```sh
python3 -m http.server 8765   # from the repo root
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
B=http://localhost:8765/scripts/brand
# share image
"$CH" --headless=new --hide-scrollbars --virtual-time-budget=4000 --window-size=1200,630 --screenshot=$PWD/public/og-image.png "$B/og.html"
# full mark (apple-touch-icon 180, icon-192, icon-512): white, 10% padding
"$CH" --headless=new --hide-scrollbars --window-size=512,512 --screenshot=$PWD/public/icon-512.png "$B/crop.html?size=512&bg=white&pad=0.1"
# house-only mark for favicon.ico (16/32/48), rounded, transparent corners
"$CH" --headless=new --hide-scrollbars --default-background-color=00000000 --window-size=32,32 --screenshot=/tmp/favicon-32.png "$B/crop.html?size=32&bg=white&radius=0.2&pad=0.04&cx=40&cy=12&cw=200&ch=140"
```

`favicon.ico` bundles the 16/32/48 PNGs (ICO with embedded PNG entries).
