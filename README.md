# Convose Theme & Layout Customizer

A Chrome / Edge extension that changes how https://www.convose.com looks and feels. It runs only on convose.com and keeps your settings in the browser.

Version: 1.4

## What it does

- Colour themes with ready-made presets and your own colours
- Hides the suggestion grid and makes active chats full screen
- Two chat styles: IRC Chat Style and Cyber Style (new in 1.4)
- Font choice and corner roundness

## Install

1. Unpack the archive into a folder
2. Open `edge://extensions` (or `chrome://extensions`).
3. Turn on Developer mode.
4. Click Load unpacked and choose the folder.
5. Open convose.com, click the extension icon, and change settings. Changes show right away.

To update, unpack the new files over the old folder, then press the reload button on the extension card.

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
| Cyber HUD | Cyan and green, turns Cyber Style on |
| Night City | Magenta and yellow, turns Cyber Style on |
| Olive Union | Khaki and teal, turns Cyber Style on |

### Layout and Focus

- **Hide Suggestion Grid**: removes the suggestion cards.
- **Full-Screen Active Chat**: open chats fill the screen.
- **Hide Chat Starter Chips**: removes the conversation starter bar.
- **IRC Chat Style**: log-style lines like `[21:03] nick: message`.
- **Cyber Style**: the sci-fi HUD look (see below).
- **Cyber FX**: scanlines, glow, pulse and blinking. Turn it off for a calmer, lighter look.

IRC Chat Style and Cyber Style cannot both be on. Turning one on turns the other off.

### Typography and Shape

- **Font Family**: Nunito (default), Inter, Plus Jakarta Sans, Poppins, Space Grotesk, JetBrains Mono, Lora, or system font. In Cyber Style the default font becomes Rajdhani for messages and Share Tech Mono for labels. A font you pick yourself is used for messages instead.
- **Corner Radius**: roundness of cards and bubbles (not used by Cyber Style, which uses angled corners).

### Palette Colors

Main Background, Sidebar Background, Chat Box Background, Message Bubble, Primary Accent, Own Messages (Cyber), and Text Color. Changing any colour switches the preset to Custom Colors.

In Cyber Style, Primary Accent is the colour for HUD lines and other people's messages. Own Messages is the colour for your messages.

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
