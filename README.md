# L'Oréal Product-Aware Routine Builder Chatbot

An AI-powered skincare routine builder. Users browse real products from
L'Oréal Paris, CeraVe, and La Roche-Posay, select their favorites, generate a
personalized AM/PM routine, and chat with an AI beauty advisor that knows
their selected products.

## ✨ Features

- 🛍️ **Product catalog** — 21 real products with ingredients, benefits,
  skin-type suitability, and usage instructions (`products.js`)
- 🔍 **Search & filter** — search by name/brand/ingredient, filter by category
- ❤️ **Product selection** — Add/Remove buttons, selection counter,
  Clear All, saved in `localStorage`
- 🗂️ **Product details modal** — full verified info for every product
- 🧴 **Routine generator** — builds Morning (AM) and Evening (PM) routines
  from your selected products, flags missing steps, and warns about
  incompatible combos (e.g. retinol + glycolic acid)
- 🤖 **AI chatbot** — answers questions using your selected products and
  generated routine as context, with friendly fallbacks if the AI is down
- 🙋 **Personalization** — optional skin type and skin-concern selection
- 📱 **Responsive** — works on desktop, tablet, and mobile

## 📁 Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page layout: catalog, selection, routine, chatbot, modal |
| `style.css` | L'Oréal branding (white/black/red), responsive styles |
| `products.js` | The product catalog data (`PRODUCTS` array) |
| `script.js` | All app logic: browsing, selection, routine, AI chat |
| `RESOURCE_cloudflare-worker.js` | Code to paste into your Cloudflare Worker |

## 🚀 Run locally (no installs needed!)

This is a plain HTML/CSS/JS project — there are **no dependencies** to install.

1. In the GitHub repo, click **Code → Open with Codespaces → New codespace**
   (or clone the repo locally).
2. Open `index.html` with a live preview / Live Server, **or** run:

   ```bash
   python3 -m http.server 8000
   ```

   and open `http://localhost:8000` in your browser.

## 🔐 Configuration — the AI backend (Cloudflare Worker)

The frontend never touches the OpenAI API key. All AI requests go through a
Cloudflare Worker that holds the key as a secret:

1. Create a Worker at [dash.cloudflare.com](https://dash.cloudflare.com)
   and paste in the code from `RESOURCE_cloudflare-worker.js`.
2. In the Worker's **Settings → Variables and Secrets**, add a secret named
   `OPENAI_API_KEY` with your OpenAI key. **Never put the key in this repo.**
3. Click **Deploy** and copy your Worker URL.
4. Paste that URL into the `WORKER_URL` constant at the top of `script.js`.

The request body sends a `messages` array, and the response is read from
`data.choices[0].message.content`.

## 🌍 Deploy the frontend

Because the site is static, you can host it anywhere:

- **GitHub Pages** — repo **Settings → Pages → Deploy from branch → main**.
- **Cloudflare Pages / Netlify / Vercel** — point it at this repo; no build
  step is required.

The backend (the Worker) is already deployed on Cloudflare — no extra server
is needed.

Enjoy building your L'Oréal routine! 💄
