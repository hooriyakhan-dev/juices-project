# Voltix Energy – GSAP Animation

## Kaise chalayein
1. Zip extract karo.
2. Folder ko VS Code mein kholo (File > Open Folder).
3. `index.html` par right-click > **Open with Live Server** (Live Server extension install kar lo).
   Ya seedha `index.html` ko browser mein double-click karo.

Internet chahiye (GSAP aur Google Fonts online se load hote hain).

## Files
- `index.html`  – page ka structure
- `style.css`   – saare colors, fonts, buttons, hover
- `script.js`   – saari GSAP animation
- `assets/`     – can images aur fruit cut-outs (.webp)

## Kahan kya badlein
- **Rang:** `style.css` mein `.scene[data-t=berry]` jaisi lines (`--c1`, `--c2`, `--acc`), aur `script.js` ke top mein `T` array.
- **Text / flavor naam:** `script.js` mein `T` array (`name`, `desc`, `w`).
- **Har flavor kitni der:** `script.js` mein `DUR` (seconds, abhi 5).
- **Fruits ki tadaad aur size:** `KIND`, `SZ`, `RX`, `RY`.
- **Can ki image badalni ho:** `assets/` mein file replace karo (same naam rakho).
- **Fonts:** `index.html` ka Google Fonts link aur `style.css` mein `Anton` / `Barlow Condensed`.
