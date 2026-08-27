# Stable Empire

Stable Empire is a browser-based horse stable management game prototype built with plain HTML, CSS and JavaScript.

## What is included

- New-game setup
- Local browser save system
- Export/import save files
- Horse ownership and market
- Horse stats, care, training, specialization and selling
- Stable repairs and condition
- Stable expansion
- Stable customization
- Cedar Valley town
- General Store, Tack Shop, Veterinarian, Farrier and Bank
- Horse market
- Race track practice
- County races
- NPC contracts
- Hireable staff
- Seasons, days, weather-style random events and maintenance
- Responsive desktop/mobile layout

## Folder contents

- `index.html` — the game page
- `styles.css` — all visual styling
- `app.js` — all game logic
- `README.md` — setup instructions

---

# OPTION 1 — Easiest: run it by double-clicking

1. Extract the Stable Empire ZIP.
2. Open the `stable-empire` folder.
3. Double-click `index.html`.
4. The game opens in your default browser.

For the current prototype this is usually enough.

Your game saves in the browser using `localStorage`.

Important: if you clear browser site data/cache, your local save can be removed. Use **Export Save** inside the game to create a backup `.json` file.

---

# OPTION 2 — Recommended local setup with Visual Studio Code

## Step 1: Install VS Code

Download and install Visual Studio Code:
https://code.visualstudio.com/

## Step 2: Open the project

1. Extract the ZIP.
2. Open Visual Studio Code.
3. Click **File > Open Folder**.
4. Select the `stable-empire` folder.

## Step 3: Install Live Server

1. Click Extensions on the left side.
2. Search for `Live Server`.
3. Install the extension by Ritwick Dey.
4. Open `index.html`.
5. Click **Go Live** in the bottom-right corner.

The game will open at an address similar to:

`http://127.0.0.1:5500/`

This is the best setup while editing the game.

---

# OPTION 3 — Run using Node.js

Install Node.js from:

https://nodejs.org/

Then open a terminal in the project folder and run:

```bash
npx serve .
```

Open the local address shown in the terminal.

---

# PUT THE GAME ONLINE — GitHub Pages

This works because the current version is a static browser game.

## Step 1: Create a GitHub account

Go to:
https://github.com/

## Step 2: Create a repository

1. Click **New repository**.
2. Name it something like `stable-empire`.
3. Make it Public.
4. Create the repository.

## Step 3: Upload the files

Upload:

- `index.html`
- `styles.css`
- `app.js`

You can also upload `README.md`.

## Step 4: Enable GitHub Pages

1. Open the repository.
2. Click **Settings**.
3. Click **Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.

GitHub will provide a website address similar to:

`https://yourusername.github.io/stable-empire/`

---

# PUT THE GAME ONLINE — Netlify

Netlify is even easier for a static project.

1. Go to https://www.netlify.com/
2. Create an account.
3. Open the Netlify dashboard.
4. Choose the manual deploy / drag-and-drop option.
5. Drag the entire `stable-empire` folder into Netlify.

Netlify creates a public web address for the game.

You can later connect your own domain.

---

# WHERE TO EDIT THINGS

## Change the title or page structure

Edit:

`index.html`

## Change colors and appearance

Edit:

`styles.css`

Look near the top for:

```css
:root {
  --bg: #151511;
  --panel: #211f19;
  --accent: #d8a94d;
}
```

## Change horse breeds

Open `app.js` and find:

```javascript
const BREEDS = [...]
```

## Change horse coats

Find:

```javascript
const COATS = [...]
```

## Change starting money

Find this inside `DEFAULT_STATE`:

```javascript
money: 650,
```

## Change starting stable capacity

Find:

```javascript
capacity: 3,
```

## Change repair condition

Find:

```javascript
condition: {
```

## Change shop prices

Search `app.js` for:

`data-cost=`

## Change race prize / difficulty

Search for:

```javascript
function enterRace()
```

## Change stable expansion price

Search for:

```javascript
function expansionCost()
```

---

# HOW SAVING WORKS

The game automatically stores its state in the browser using:

```javascript
localStorage
```

The key is:

```javascript
stableEmpireSave_v1
```

The player can also click:

- Save Game
- Export Save
- Import Save

Exporting produces a JSON backup file.

---

# IMPORTANT LIMITATION OF VERSION 1

This version is a **single-player local browser game**.

It does NOT yet have:

- User accounts
- Online database
- Multiplayer
- Cloud saves
- Shared horse market
- Online auctions
- Player-to-player sales
- Real-time other players
- Admin dashboard
- Server-side anti-cheat

Those features require a backend.

A later production version can use:

- Frontend: HTML/CSS/JavaScript or React
- Backend: Node.js
- Database: PostgreSQL / Supabase
- Authentication: Supabase Auth or another account system
- Hosting: Vercel / Netlify / Cloudflare Pages
- API hosting: Render / Railway / Fly.io / Supabase Edge Functions

Do not add multiplayer by simply storing important economy values in browser JavaScript. A multiplayer economy needs server-side validation.

---

# RECOMMENDED DEVELOPMENT ORDER

1. Test the current prototype.
2. Adjust the economy and horse prices.
3. Add more breeds and coat genetics.
4. Add visual stable areas.
5. Add breeding and bloodlines.
6. Add customer boarding.
7. Add auctions.
8. Add rival NPC stables.
9. Add equipment and saddles.
10. Add weather and deeper seasonal systems.
11. Add achievements.
12. Add story events.
13. Add a larger county map and multiple towns.
14. Only after the single-player systems feel good, build accounts/backend.
15. Add online leaderboards or multiplayer market last.

This keeps the project manageable and prevents the database/backend from being built around unfinished game rules.
