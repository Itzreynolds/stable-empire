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


# MUSIC SYSTEM

Stable Empire includes an original looping background track.

Players can:
- Turn music on/off
- Adjust volume from 0% to 100%
- Keep their audio preference between visits in the same browser

Music file:

`assets/stable-empire-theme.mp3`

Modern browsers block unsolicited audio, so the player must press **Turn On** before the track starts.

To replace the music later, replace the MP3 with another file using the same filename. Only use music you own or have permission to use.


# GAME MUSIC PLAYLIST

Stable Empire now has an official built-in game soundtrack system.

Players can:
- Play/pause music
- Adjust volume
- Skip to another song
- Go back to a previously played song

Players CANNOT upload or add their own music.

When a song finishes, Stable Empire automatically chooses a different song at random.

## Adding another official game song

### 1. Add the MP3

Put your MP3 inside:

`assets/`

Example:

`assets/riders-moon.mp3`

Use simple lowercase filenames with hyphens.

### 2. Add it to GAME_PLAYLIST

Open:

`app.js`

Near the top you will find:

```javascript
const GAME_PLAYLIST = [
  { title: "Morning at the Stable", file: "assets/morning-at-the-stable.mp3" },
  { title: "Cedar Valley Roads", file: "assets/cedar-valley-roads.mp3" },
  { title: "Hooves at Sundown", file: "assets/hooves-at-sundown.mp3" },
  { title: "County Fair Lights", file: "assets/county-fair-lights.mp3" }
];
```

Add another line before the closing `];`:

```javascript
{ title: "Rider's Moon", file: "assets/riders-moon.mp3" }
```

Remember to add a comma after the previous song.

That is the only playlist list you need to maintain.

## GitHub update

Upload these updated items:

- `index.html`
- `styles.css`
- `app.js`
- the entire `assets` folder

Commit the files to `main`. GitHub Pages will update automatically.

Use only music that you created, commissioned, purchased with an appropriate game-use license, or otherwise have permission to distribute with the game.


# PLAYER MUSIC CONTROLS

The official soundtrack playlist is hidden from players.

Players can only:
- Play/pause music
- Skip to the next song
- Go back to the previous song
- Adjust volume

Players cannot:
- View the full playlist
- Upload songs
- Add songs
- Remove songs
- Reorder songs

The built-in playlist is controlled only by the developer through `GAME_PLAYLIST` in `app.js`.

When a track ends, the game automatically shuffles to another official track.


# MAP UPDATE

Stable Empire now includes a more visual Sims-style county map on the Map page.

What changed:
- The old flat town card layout was replaced with a clickable world map
- Locations sit directly on the map
- Trails and roads visually connect the major places
- Players can click destinations like the Stable, Horse Market, Race Track and Oak Hollow Trails
- The right-side panel changes based on the selected location

Important files:
- `app.js` contains the map locations in `TOWN_LOCATIONS`
- `styles.css` contains the map styling
- `index.html` only needed a small nav label change

If you want to move map locations around later, edit the `x` and `y` values in `TOWN_LOCATIONS`.


# CONTRACT SYSTEM UPDATE

Stable Empire v6 improves the contract system.

Changes:
- Accepted contracts now remain active after ending the day
- Contract board refreshes no longer delete accepted contracts
- Active contracts count down using `daysLeft`
- Contracts fail only when their time limit actually runs out
- Completed contracts keep a short recent-history section
- The notice board now offers up to six available jobs at once
- Older save files are automatically migrated to the new contract format

New contract types include:
- Basic Training
- Race Preparation
- Horse Care
- Stable Maintenance
- Trail Conditioning
- Local Horse Purchase
- Successful Sale
- Stable Expansion
- Hire a Helping Hand
- County Competition
- Winning Form
- Specialist Training


# EVENTS, CHALLENGES & ADVERTISING

Stable Empire v7 replaces the old single County Race system with a full event system.

## Practice Types
- Sprint Drills
- Endurance Conditioning
- Handling Course
- Ranch Skills Practice

Each practice type improves different horse stats.

## Official Competitions
- Cedar Valley Sprint
- Long Meadow Endurance
- Cloverleaf Handling Challenge
- Cedar Valley Ranch Trial
- County Showmanship
- Heavy Horse Pull

Each competition:
- Has its own entry fee
- Has a minimum training requirement
- Uses different horse stats to calculate performance
- Has a matching specialization bonus
- Has its own prize range and reputation reward

## Event Challenges
Players can complete career challenges such as:
- Track Regular
- Three Event Tour
- Winner's Circle
- Versatile Stable

Completed challenges have claimable cash and reputation rewards.

## Stable Advertising
Players can advertise their stable using:
- Town Flyers
- Newspaper Advertisement
- Race Day Posters
- County-Wide Campaign

Advertising can:
- Raise Stable Exposure
- Raise reputation
- Generate extra daily customer income while active
- Give higher-level campaigns an event prize bonus

Only one campaign can be active at a time.

## Save Compatibility
Older Stable Empire saves are migrated automatically with:
- competition records
- challenge claim state
- marketing state
- recent event results


# STORY CAMPAIGN

Stable Empire v8 adds a full story questline titled:

**The Cedar Valley Legacy**

The campaign contains:
- 8 chapters
- 40 sequential quests
- Story narration
- Objective tracking
- Cash rewards
- Reputation rewards
- Stable exposure rewards
- Supply rewards
- A final player title

## Chapters

1. The Inheritance
2. Beyond the Barn
3. The Cedar Valley Circuit
4. Riverview Takes Notice
5. The Business of Horses
6. Restore the Legacy
7. County Championship Season
8. Stable Empire

The story uses existing gameplay systems, including:
- horse care
- stable repairs
- shopping
- contracts
- reputation
- practice
- trail riding
- horse buying
- specialization
- staff
- competitions
- advertising
- property condition
- horse training
- stable expansion
- money earned

Existing saves are migrated automatically. Some action-count objectives begin counting after the v8 update, while progress-based objectives such as reputation, money, horses, staff, competition history and property condition use the player's current save values.


# CINEMATIC CAMPAIGN UPDATE

Stable Empire v9 adds a cinematic cutscene system to The Cedar Valley Legacy.

## Included Features

- 13 major story cinematics
- Recurring fictional Cedar Valley characters
- Illustrated character assets
- Illustrated location backgrounds
- Cinematic camera motion
- Letterbox presentation
- Dialogue UI
- Continue / Skip Scene controls
- Story choices
- Riverview relationship system
- Relationship-sensitive later dialogue
- Cinematic Archive for replaying unlocked scenes
- Optional spoken dialogue using the player's browser-installed voices
- Background music automatically ducks during scenes
- Existing story and save data migrate automatically

## Recurring Characters

- Eleanor Rivers — Owner of Riverview Stables
- Mae Holloway — Early client and local supporter
- Thomas Bell — Cedar Valley Equestrian Grounds organizer
- Samuel Mercer — County auctioneer
- Dr. Clara Whitmore — Veterinarian
- Jonah Reed — Local rancher

## Custom AI / Recorded Voice Upgrade

The current spoken-dialogue option uses the browser's Speech Synthesis API because no external voice service is required.

If custom AI-generated or recorded dialogue is added later, individual MP3/OGG voice files can be attached to cutscene lines and played instead.

## Art Assets

Character art:
`assets/characters/`

Scene backgrounds:
`assets/scenes/`

The included SVG artwork keeps the build lightweight and can be replaced later with higher-detail PNG/WebP AI-generated artwork without rewriting the cutscene engine.


# V10 — EMPIRE EXPANSION

Stable Empire v10 is designed to preserve existing careers while adding much deeper game systems.

## SAVE SAFETY — IMPORTANT

The browser save key remains:

`stableEmpireSave_v1`

It was intentionally NOT renamed.

That means players who already started on the existing GitHub Pages URL keep using the same browser save location.

v10 adds:

- `SAVE_SCHEMA_VERSION = 10`
- automatic migration of older save structures
- deep merging with new default fields
- horse-data normalization for old horses
- an automatic pre-update backup stored separately
- a Restore Pre-Update Backup button when a backup exists
- automatic save when the page is hidden/closed
- migrated saves are immediately written back to the same original save key
- imported JSON saves also go through the migration system

Important browser limitation:
LocalStorage belongs to the exact website origin/domain and browser profile. If the game is moved to a different domain, browser, device, incognito profile, or storage is manually cleared, browser LocalStorage does not automatically follow. Players should use Export Save before changing domains/devices.

## HORSE LIFE & GENETICS

Old horses are automatically upgraded with:

- fitness
- stress
- natural potential
- injuries
- health records
- pedigree
- generation
- coat genetics label
- breeding uses
- favorite status

New horses receive these fields at creation.

Horse stat gains respect natural potential ceilings.

Foals inherit potential from both parents with variation.

## BREEDING

New Breeding page:

- eligible mares and stallions
- breeding-use limits
- 12-day pregnancy
- 9-day pregnancy with Foaling Barn
- foal births
- inherited potential
- inherited coat/temperament/traits
- sire and dam records
- generation tracking
- Bloodline Book

## HORSE HEALTH

Hard work can now produce minor injuries when horses are:

- low fitness
- highly stressed
- low energy
- overdue for hoof care

The Vet can clear injuries.
The Veterinary Wing lowers treatment cost and improves daily recovery.

## WEATHER

Daily and next-day weather are stored in the save.

Weather changes by season and can affect:

- practice efficiency
- energy costs
- trail availability
- competition score

An Indoor Arena removes most outdoor practice penalties.

## LIVING CEDAR VALLEY

Advertising and reputation now create named Customer Inquiries.

Customer jobs can be accepted from the Contracts page and remain active like normal contracts.

NPC rival stables now have changing:

- reputation
- competition wins
- horse counts

Rival standings include the player's stable.

## AUCTION YARD

The map now includes an Auction Yard.

- one highlighted auction horse
- higher potential stock
- player bidding
- NPC rival counterbids
- auction closes when the player ends the day
- winning horse transfers to the player's stable if cash and stall capacity are available

## ESTATE BUILDER

The Stable page now includes land and facility development.

Build:

- Additional Barn
- Improved Paddocks
- Indoor Arena
- Foaling Barn
- Veterinary Wing
- Feed Warehouse
- Trophy Hall
- Private Training Track

Land can be purchased in 5-acre parcels.

Facilities have permanent gameplay effects instead of being cosmetic only.

## COMPATIBILITY

This build still includes:

- music playlist controls
- Sims-style Cedar Valley map
- contracts
- competition system
- stable advertising
- 40-quest Cedar Valley Legacy campaign
- cinematic cutscenes
- Riverview relationship choices
- staff
- stable repair/customization
- export/import saves


# V11 — LOAD SAVED GAME

Stable Empire now presents exported save files as a proper player-facing Load Saved Game system.

Players can load a save from:

- the New Career/startup screen
- the sidebar while already playing

Save files use `.json`.

When a save file is loaded:

1. Stable Empire checks that the file looks like a game save.
2. If a current browser career exists, the game asks before replacing it.
3. The current browser save is backed up automatically.
4. The selected save is migrated to the newest save schema.
5. Older horses, story progress, contracts and other data are preserved.
6. The loaded career is written to the normal browser save slot.
7. The game opens on the Dashboard.

The Export Save button is now labeled:

`Download Save Backup`

Downloaded files use the stable name and date when possible, for example:

`cedar-valley-stables-save-2026-08-27.json`

This makes it easier for players to keep multiple career backups on their own computer.
