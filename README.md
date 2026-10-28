# Convose Theme & Layout Customizer

A Chrome / Edge extension that changes how https://www.convose.com looks and feels. It runs only on convose.com and keeps your settings in the browser.

Version: 1.6

## What it does

- Colour themes with ready-made presets and your own colours
- Hides the suggestion grid and makes active chats full screen
- Four chat styles: IRC, Cyber (1.4), Skeuomorphic (1.5) and Arcade (1.6)
- Font choice and corner roundness

## Install

1. Unpack the archive into a folder, for example `D:\Praktek\convose-customizer`.
2. Open `edge://extensions` (or `chrome://extensions`).
3. Turn on Developer mode.
4. Click Load unpacked and choose the folder.
5. Open convose.com, click the extension icon, and change settings. Changes show right away.

To update, unpack the new files over the old folder, then press the reload button on the extension card. Open Convose tabs reload by themselves.

## Popup settings

### Theme Pack Presets

Pick a preset from the dropdown or click a chip.

| Preset | Look |
| --- | --- |
| Midnight Orange | Black with orange accent |
| Crimson Velvet | Dark red |
| Cyberpunk Neon | Dark blue |
| Catppuccin Mocha | Soft purple |
| Nord Frost | Cool grey-blue |
| Emerald Forest | Dark green |
| Dracula Pro | Purple and pink |
| Solarized Dark | Teal |
| Komanda IRC | Slate blue, made for IRC style |
| Walnut and Denim | Wood desk, blue denim sidebar, kraft paper chat, turns Skeuomorphic Style on |
| Leather and Brass | Brown leather sidebar, tan paper, brass accent, turns Skeuomorphic Style on |
| Brushed Steel | Grey metal with blue gloss, turns Skeuomorphic Style on |
| Cyber HUD | Cyan and green, turns Cyber Style on |
| Night City | Magenta and yellow, turns Cyber Style on |
| Olive Union | Khaki and teal, turns Cyber Style on |

### Layout and Focus

- **Hide Suggestion Grid**: removes the suggestion cards.
- **Full-Screen Active Chat**: open chats fill the screen.
- **Hide Chat Starter Chips**: removes the conversation starter bar.
- **IRC Chat Style**: log-style lines like `[21:03] nick: message`.
- **Cyber Style**: the sci-fi HUD look (see below).
- **Skeuomorphic Style**: the retro, "real object" look (see below).
- **Style FX**: for Cyber it means scanlines, glow, pulse and blinking. For Skeuomorphic it means the wood and leather textures (drawn with light CSS gradients, so no lag). Turn it off for a calmer, lighter look.

Only one chat style can be on at a time. Turning one on turns the others off.

### Typography and Shape

- **Font Family**: Nunito (default), Inter, Plus Jakarta Sans, Poppins, Space Grotesk, JetBrains Mono, Lora, or system font. In Cyber Style the default font becomes Rajdhani for messages and Share Tech Mono for labels. A font you pick yourself is used for messages instead.
- **Corner Radius**: roundness of cards and bubbles (not used by Cyber Style, which uses angled corners).

### Palette Colors

Main Background, Sidebar Background, Chat Box Background, Message Bubble, Primary Accent, Own Messages (Cyber), and Text Color. Changing any colour switches the preset to Custom Colors.

In Cyber Style, Primary Accent is the colour for HUD lines and other people's messages. Own Messages is the colour for your messages.

In Skeuomorphic Style the colours map to real materials: Main Background is the wood, Sidebar Background is the denim, Chat Box Background is the paper, Message Bubble is the paper of other people's bubbles, Primary Accent is the glossy highlight (hover, buttons), Own Messages is the colour of your glossy bubbles, and Text Color is the ink on paper.

## Cyber Style

A sci-fi HUD look inspired by the Cyberpunk 2077 chat screen and game HUD element sheets.

- **Chat bubbles**: angled-corner panels with a thin neon outline and soft glow. Other people are cyan, you are green. The first bubble of each speaker shows a `NICK // TIME` tag.
- **Chat boxes**: HUD frames with cut corners, bright corner brackets and ruler ticks. Titles read `> NAME` in one line, long names end with "...". Header pictures have angled corners.
- **Active chat**: the chat you are typing in has a stronger, slowly pulsing frame. The other chats fade a little and come back when you hover over them.
- **Replies**: a small spaced-out capital line with an arrow, and a `RE:` tag in front of the quoted text.
- **Unread badge**: an angled red tag.
- **Sidebar**: wider (320px) so chat names and previews fit. Section titles look like `[ MY CHATS ]`, and rows get a left accent bar that lights up on hover.
- **Input bar**: terminal style, with a left accent bar and a capital-letter hint.
- **Page**: fine grid with larger dots, corner brackets at the screen edges, a top tab `CONVOSE // UPLINK` with a live clock, and a slow scan line. The overlay never blocks clicks.

## Skeuomorphic Style

A retro look where everything seems like a real object you can touch, inspired by early iOS and Mac apps (denim, leather, paper, wood, brushed metal, glossy buttons).

- **Desk:** dark wood with grain and plank seams behind the chats.
- **Chat cards:** paper with a fine weave, floating above the desk with a shadow. The active chat gets a blue glow ring.
- **Header:** black pebbled leather with a stitched edge and a pressed-in (letterpress) cream title.
- **Bubbles:** other people are paper with a soft edge. Yours are glossy, with a bright top half like a glass button. The first bubble of each speaker shows a small `Name  time` line.
- **Sidebar:** blue denim with a stitched edge. Chats and interests are pressed-in slots, and hovering one makes it glossy blue like a selected menu item. "+ Add interests" and "Upgrade" are metal pills.
- **Input bar:** a tan toolbar with a recessed text field.
- **Call section:** leather panel, glossy green status banner, metal and glossy red buttons.
- **Extras:** a soft vignette, and a small denim tab at the top with "Convose" in script writing.
- **Textures** are drawn with CSS gradients (no images to download, fast to paint). The script font (Pacifico) loads from Google Fonts.

## Arcade Style

A bright 8-bit game look with original art made only from CSS (no characters, logos or game images).

- **Page:** sky-blue desk with soft diagonal stripes.
- **Chat cards:** cream panels with a thick black outline and a hard shadow. The active chat gets a gold double frame.
- **Header:** gold strip with a pixel-font title (Press Start 2P).
- **Bubbles:** flat colour with a thick black outline and a hard shadow. Other people are white, you are red (colours can be changed).
- **Sidebar:** brick-block wall. Rows are dark blocks that turn gold on hover.
- **Buttons:** chunky gold buttons with a black edge and a solid bottom shadow.
- **Presets:** Sky Arcade and Castle Arcade. Colour mapping is the same as Skeuomorphic Style.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Extension settings (Manifest V3) |
| `background.js` | Re-applies the content script to open Convose tabs |
| `content.js` | Builds the CSS and applies it to the page |
| `popup.html` / `popup.js` | The settings popup and saved settings |
| `major.css` | A copy of Convose's own CSS, for reference when writing selectors. It is not loaded by the extension. |
| `AGENTS.md` | Technical notes on how Convose's page is built and how each style works |

## Known limits

- Convose can change its page code at any time. If a part of the style stops working after a Convose update, a selector probably needs a small fix. `AGENTS.md` lists the ones used.
- The Cyber fonts load from Google Fonts. Without internet access they fall back to a plain monospace or sans font.
- The unread badge and chat titles in Cyber Style are found by a small script, not by class names, so odd layouts may need a tweak.

## Development notes

- No emojis anywhere in code, HTML, CSS, comments or UI text.
- After editing, run `node --check content.js` and `node --check popup.js`.
- `content.js` must stay wrapped in one `(() => { ... })()` block, because it can be injected more than once.
