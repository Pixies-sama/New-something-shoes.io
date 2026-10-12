# New Something Shoes

Static, mobile-first catalogue site (HTML, CSS, vanilla ES modules). Orders happen on WhatsApp.

## Run locally
`products.json` is loaded with `fetch`, so use a local server (not double-click):
`npx serve .` or `python3 -m http.server 8000` then open http://localhost:8000

## Edit
- **Add or change a product:** `assets/data/products.json` (one object per product).
- **Change the WhatsApp number or message:** `assets/js/config.js` and `assets/js/whatsapp.js`.
- **Colours / fonts / spacing:** CSS variables at the top of `assets/css/base.css`.
- **Photos:** the SVGs in `assets/images/` are placeholders. Drop in real photos (WebP/JPG, ~1000x1000, <200KB), then update the `images` paths in `products.json`. Replace `hero/hero.svg` and `about/*.svg` in the HTML pages too.

## Deploy
Upload the folder to Netlify, Vercel or GitHub Pages. Replace `YOUR-DOMAIN.com` in `sitemap.xml` and `robots.txt`, and use absolute URLs for `og:image` once you have a domain.
