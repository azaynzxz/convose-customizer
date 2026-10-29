# Convose Theme & Layout Customizer - Agent Context & DOM Mapping

## 1. Project Overview
This repository (`D:\Praktek\convose-customizer`) is a Manifest V3 Chrome/Edge extension that customizes the theme, typography, geometry, layout, and chat presentation of `https://www.convose.com/` (`https://*.convose.com/*`).

### Core Files
- `manifest.json`: Manifest V3 configuration (`storage`, `activeTab`, `scripting` permissions; `content.js` injected at `document_start` with `all_frames: true`).
- `popup.html`: Extension popup UI containing Theme Pack Presets (dropdown + quick swatch chips), Layout & Focus toggles (including Experimental IRC Chat Style), Typography & Shape controls (Font Family + Corner Radius slider), and 6 granular Palette Color pickers.
- `popup.js`: Manages `chrome.storage.local` persistence, preset application (`THEME_PRESETS`), live broadcasting (`APPLY_CONVOSE_STYLES`) to active tabs, and fallback on-demand injection via `chrome.scripting.executeScript`.
- `content.js`: IIFE-wrapped content script (`(() => { ... })()`) that applies styles via three simultaneous layers:
  1. Inline CSS variables on `document.documentElement` (`root.style.setProperty(k, v, "important")`)
  2. Constructable Stylesheets (`document.adoptedStyleSheets` via `window.__convoseAdoptedSheet`) so Next.js/React hydration cannot wipe injected styles
  3. Fallback `<style id="convose-customizer-styles">` element appended as the last child of `<head>` / `<html>`, guarded by a `MutationObserver` on `requestAnimationFrame`.

---

## 2. Convose Frontend Architecture & Styling Mechanics
Convose is built with **Next.js (App Router / Turbopack)** and **Tailwind CSS v4**. Understanding how Convose styles its DOM is essential before modifying any selectors:

1. **Dual Theme Variable System**:
   - Convose defines raw variables on `:root`, `[data-theme="light"]`, and `[data-theme="dark"]` (e.g., `--body-background`, `--card-bg`, `--msg-bubble-partner-bg`, `--primary-color`), and maps them to Tailwind v4 `--color-*` tokens (e.g., `--color-body-background: var(--body-background)`).
   - Always override **both** the raw variable (`--card-bg`) and the Tailwind v4 token (`--color-card-bg`) with `!important` on `:root, :host, html, html[data-theme="dark"], html[data-theme="light"]`.

2. **Hardcoded Arbitrary Tailwind Classes**:
   - Several Convose components bypass CSS variables and use hardcoded hex classes in dark mode, such as:
     - `.dark\:bg-\[\#1a1b1e\]` / `.dark\:bg-\[\#1A1B1E\]` on the Sidebar
     - `.\[\&_path\]\:fill-\[\#5B65EA\]` on the Audio Player play/pause SVG button
     - `.bg-\[\#5865f2\]` and `.hover\:bg-\[\#4752c4\]` on the focused Microphone button (`[data-component="mic-button"]`)
     - `.\[\&\:\:-webkit-scrollbar-thumb\]\:bg-\[rgba\(91\,101\,234\,0\.3\)\]` on chat scrollbars
   - These require explicit escaped utility class overrides in `buildStylesheet()`.

3. **Re-injection Safety (IIFE)**:
   - Because `popup.js` can call `chrome.scripting.executeScript({ files: ["content.js"] })` on already-open tabs, `content.js` **must** remain wrapped in an IIFE `(() => { ... })()` so top-level `const`/`let` declarations never throw `Uncaught SyntaxError: Identifier '...' has already been declared`.
   - Global hooks (`window.__applyConvoseCustomizer`, `window.__convoseCustomizerInitialized`, `window.__convoseAdoptedSheet`) coordinate state across re-executions.

---

## 3. Complete Convose DOM & CSS Variable Mapping

### 3.1 Main Background (`settings.bgColor`)
- **CSS Variables**:
  - `--body-background`, `--color-body-background`
  - `--profile-grid-bg`, `--color-profile-grid-bg`
  - `--main-background`, `--surface-bg`
- **DOM Selectors**:
  - `html`, `body`, `[data-component="homepage"]`, `[data-component="suggestions-grid"]`
  - `.bg-body-background`
  - `.bg-profile-grid-bg:not(.group\/sidebar):not([data-component="sidebar"] *)` (excludes sidebar elements that reuse `.bg-profile-grid-bg`)

### 3.2 Left Sidebar (`settings.sidebarColor`)
- **DOM Structure**:
  ```html
  <div class="relative z-[2000] h-full w-[70px] ...">
    <div class="group/sidebar absolute inset-y-0 left-0 box-border w-[250px] bg-profile-grid-bg dark:bg-[#1a1b1e] ...">
      <aside data-component="sidebar" class="... w-[250px] max-w-[250px] min-w-[250px] p-2">
        <!-- 1. Brand Row: div.mb-[18px].h-10 -->
        <!-- 2. Add Interest Button: div[data-component="add-interest-slot"] > ... > div[data-component="add-interest-input"] -->
        <!-- 3. Action Buttons (Search a call, Start a group, Convose events): div.mb-[7px] > button / a -->
        <!-- 4. My Interests Header: div.-mb-0.5.mt-1.5 > p -->
        <!-- 5. My Interests List: ul[data-component="sidebar-interests"] > li > div[data-interest-chip] -->
        <!-- 6. My Chats Section: section.mt-[22px] > div[data-wheel-scroll] > article.group/row -->
        <!-- 7. Bottom Profile Bar: div.absolute.bottom-2 -->
      </aside>
    </div>
  </div>
  ```
- **Collapsed vs Expanded State**:
  - When expanded: `aside[data-component="sidebar"]` has class `w-[250px]`.
  - When collapsed: `aside[data-component="sidebar"]` has class `w-[70px]`.
  - Any layout overrides targeting expanded sidebar rows should scope to `aside[data-component="sidebar"]:not(.w-\[70px\])` so collapsed icon-rail mode stays intact.
- **Sidebar Row Surface Variable**:
  - Each `article.group/row` sets `--row-surface` for online status rings and hover masks. Override `aside[data-component="sidebar"] article.group\/row { --row-surface: ${settings.sidebarColor} !important; }`.
- **Bottom Nav Shadow**:
  - `aside[data-component="sidebar"] > div.absolute.bottom-2` uses a hardcoded dark box-shadow (`shadow-[-8px_0_0_0_#1a1b1e,8px_0_0_0_#1a1b1e,0_8px_0_0_#1a1b1e]`). Override both `background-color` and `box-shadow` with `settings.sidebarColor`.

### 3.3 Suggestion Grid & Chat Box Containers (`settings.cardColor`)
- **DOM Structure of the Grid**:
  ```html
  <div data-component="suggestions-grid" class="box-border m-0 flex ... items-start justify-center ... p-5">
    <div class="h-[...] w-full translate-x-[180px]"> <!-- gridWrap (shifted 180px right when sidebar is expanded) -->
      <div class="relative block size-full"> <!-- Top-level grid canvas -->
        <!-- Suggestion Card Slots (no data-chat-id): -->
        <div class="pointer-events-auto absolute top-0 left-0 ..." style="transform: translate3d(...)">
          <div data-suggestion-card="true">...</div>
        </div>
        <!-- Open Chat Box Slots (have data-chat-id): -->
        <div data-chat-id="..." class="pointer-events-auto absolute top-0 left-0 ...">
          <div data-chatbox="..." data-component="group-chatbox">
            <!-- Header: header[data-component="group-card-header"] -->
            <!-- Message List: .bg-chat-message-list-bg / .bg-group-card-chat-screen-bg -->
            <!-- Smart Reply Chips: .group/smart -->
            <!-- Input Form: div[data-component="chat-input"] -->
          </div>
        </div>
      </div>
    </div>
  </div>
  ```
- **CRITICAL PITFALL (`.relative.block.size-full`)**:
  - Inside `[data-chatbox]`, the message list wrapper **also** uses `<div class="relative block size-full">`.
  - **NEVER** write a descendant selector like `[data-component="suggestions-grid"] .relative.block.size-full > div:not([data-chat-id]) { display: none }`, because it will match the inner `.relative.block.size-full` inside `[data-chatbox]` and hide the entire chat conversation UI!
  - **ALWAYS** use strict direct-child combinators from `[data-component="suggestions-grid"]`:
    `[data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full`
- **Active/Selected Chat Box Focus Ring**:
  - When a chat box is focused, Convose adds `.bg-modal-input-border-focus-color.p-\[2px\].shadow-\[0_0_0_2px_var\(--modal-input-border-focus-color\)\]` to `div[data-chat-id]`, where `--modal-input-border-focus-color` defaults to `#80aff6` (bright light blue).
  - We override `--modal-input-border-focus-color` and `[data-chat-id].bg-modal-input-border-focus-color` to use `settings.cardColor` and `subtleBorder` so there is no harsh blue frame around active chats.

### 3.4 Message Rows & Bubbles (`settings.bubbleColor`)
- **DOM Structure of a Message Row (`[data-msg-row]`)**:
  - 1-on-1 chats use `[data-component="chat-message"][data-msg-row="true"]`.
  - Group chats use `[data-component="group-chat-message"][data-msg-row="true"]`.
  ```html
  <div data-component="group-chat-message" data-message-uuid="..." data-msg-row="true" class="relative flex ...">
    <!-- 1. Sender Avatar (only on top message of a partner group): -->
    <div class="mt-[4px] h-[16px] w-fit self-start pr-[3px] ...">
      <div class="relative top-[9.8px]">
        <img class="inline-block size-[30px] rounded-[10.5px] object-cover" src="..." />
      </div>
    </div>
    <!-- 2. Message Column: -->
    <div class="w-[calc(100%-62px)] flex-1">
      <!-- 2a. Optional Reply Header & Quote: div[data-component="chat-message-reply"] -->
      <!-- 2b. Optional Sender Name + Time Header (top message of partner group): -->
      <div class="flex items-baseline gap-[6px]">
        <p class="block w-fit cursor-pointer text-left font-sans text-[11px] font-bold" style="color: #...">Username</p>
        <span class="font-sans text-[10px] font-semibold text-[#8b8d91]">21:03</span>
      </div>
      <!-- 2c. Message Line Wrapper: -->
      <div class="relative z-[2] flex w-full items-center pr-[8px] justify-start|justify-end pl-[33px]?">
        <div class="relative min-h-[31px] w-full text-left">
          <div class="relative flex items-center justify-end?">
            <!-- Hover timestamp on continuation rows: span.invisible.absolute.inset-y-0.right-full -->
            <!-- Hover action buttons (BEFORE bubble when mine=true): div[data-msg-actions="true"].contents -->
            <!-- Message Bubble: -->
            <div data-msg-bubble="true" data-message-type="text|audio|image|intro" class="... bg-msg-bubble-partner-bg|bg-msg-bubble-mine|bg-transparent">
              <!-- Text Content: -->
              <div class="block items-center justify-center break-words whitespace-pre-wrap px-[10.5px] py-[6.5px]">
                <span class="Linkify">Message text</span>
              </div>
              <!-- Hidden Timestamp (present on all non-audio messages): -->
              <span class="absolute right-px bottom-px hidden h-[18px] ...">21:03</span>
              <!-- Optional Link Preview Card: div.flex.max-w-full.flex-col.overflow-hidden -->
            </div>
            <!-- Hover action buttons (AFTER bubble when mine=false): div[data-msg-actions="true"] -->
          </div>
          <!-- Optional Reactions Row: div > div[data-msg-reactions="true"].bg-buble-reacted-bg|.bg-buble-reaction-bg -->
        </div>
      </div>
    </div>
  </div>
  ```
- **Message Bubble Hover Selector**:
  - Convose uses high-specificity `:where()` hover selectors in CSS:
    `.msg-hover\:bg-msg-bubble-hover-light:is(:where(html:not([data-recording-audio])) :where([data-msg-row]):hover:not(:has([data-msg-reactions]:hover)) *)`
    and `.msg-hover\:bg-primary-hover:is(...)`.
  - Both must be overridden so hovering a message row does not revert the bubble to default grey/blue.
- **Message Reactions (`[data-msg-reactions]`)**:
  - Unreacted chip uses `.bg-buble-reaction-bg` (`--buble-reaction-bg`, `--color-buble-reaction-bg`). Note the single `b` spelling (`buble`) in Convose's source code.
  - Reacted chip (when current user reacted) uses `.bg-buble-reacted-bg` (`--buble-reacted-bg`, `--color-buble-reacted-bg`, which defaults to `#5b65ea` blue) in normal state and `hover:bg-primary-hover` on hover. Both normal and hover states are overridden.

### 3.5 Audio Player (`[data-message-type="audio"]`)
- **DOM Structure**:
  - When an audio message has a voice transcript, `[data-msg-bubble="true"]` has class `bg-transparent` and contains two children:
    1. `<div data-msg-fill="true" class="bg-msg-bubble-mine | bg-msg-bubble-partner-bg">` containing `<div class="group/player ...">`
    2. `<div data-msg-transcript="true" class="flex items-end gap-[6px] bg-msg-bubble-partner-bg ...">`
  - Inside `.group/player`:
    - Play/Pause `<button>` has `.\[\&_path\]\:fill-\[\#5B65EA\]` (hardcoded blue SVG path) and `.animate-audio-ring`.
    - Range input `<input type="range" class="audio-seek">` uses CSS variables `--audio-fill` (default `#5b65ea`) and `--audio-rest` (default `#5b65ea30` / `#5b65ea66`).

### 3.6 Profile Modal & Info Surfaces (`[data-component="my-account"]`)
- **CSS Variables**:
  - Outer modal surface: `--info-surface-bg`, `--color-info-surface-bg`, `--modal-bg`, `--user-menu-modal-background`, `--modal-profile-menu-bg` -> mapped to `settings.cardColor`.
  - Inner field boxes ("Edit name:", "Add interests" `[data-component="my-interests"]`, "My Convose link:", "Paste your social links:" `[data-component="social-links-input"]`, app download chips): use `.bg-input-on-surface-bg` (`--input-on-surface-bg`, `--color-input-on-surface-bg`) and `--modal-input-border-color` -> mapped to `settings.bubbleColor` and `subtleBorder`.
  - Social link item chips: use `.bg-social-link-item-bg` (`--social-link-item-bg`) -> mapped to `settings.cardColor`.
  - Profile/Group Banner Placeholder (`[data-component="my-banner"]`, `[data-component="profile-banner"]`, `[data-component="group-banner"]`): when no custom image is set (`:not([style*="background-image"])`), Convose applies either a dark grey radial/linear gradient or an inline `background-color` extracted from the default avatar. We override `:not([style*="background-image"])` with a dot-matrix + linear gradient blended from `settings.bubbleColor` and `settings.cardColor`.

### 3.7 Convose Native Theme Sync (`syncNativeTheme`)
- **Native Theme Architecture**:
  - Convose reads `localStorage.getItem("USER_SELECTED_THEME")` ("light" or "dark") and sets `document.documentElement.setAttribute("data-theme", "light" | "dark")`.
  - Convose listens on `window.addEventListener("convose:theme-change", ...)` to recompute internal Tailwind color classes.
- **Customizer Sync Logic (`syncNativeTheme(settings)`)**:
  - Neo-Brutalist themes and custom themes with bright surfaces (`inkOn(bgColor) === "#111111" && inkOn(cardColor) === "#111111"`) automatically sync Convose's native theme to `"light"`.
  - Dark themes, IRC (`komanda-irc`), Arcade, Cyber, Skeuo, and Spooky automatically sync to `"dark"`.
  - Updates `document.documentElement.setAttribute("data-theme", targetTheme)`, `localStorage.setItem("USER_SELECTED_THEME", targetTheme)`, and dispatches `window.dispatchEvent(new Event("convose:theme-change"))`.
  - Ensures Convose native popups, dropdowns, and un-customized subcomponents match the active preset tone.

---

## 4. Experimental View: IRC Chat Style (`settings.ircMode`)

IRC Chat Style is strictly scoped to the `komanda-irc` preset or when `settings.ircMode === true`. It is **never** applied by default to other themes (e.g., Brutalism, Arcade, Skeuo, Spooky).

1. **`syncIrcMetadata()` in `content.js`**:
   - Iterates through each `[data-chatbox]` (and its `[data-msg-row]` children in top-to-bottom DOM order).
   - Determines whether each message row is sent by the current user (`isMine`) or a partner.
   - Extracts the message timestamp (`timeStr`) from `bubble > span.hidden`, `data-tooltip-content`, or `span.text-[10px]`, carrying forward `lastTime` for grouped continuation rows.
   - Extracts the sender's nickname (`nick`) and color (`nickColor`) from `p.cursor-pointer.font-bold` (or reply headers), carrying forward `lastPartnerNick` and `lastPartnerColor` across grouped continuation rows from the same speaker, and falling back to deterministic nickname hashing (`IRC_NICK_PALETTE`).
   - Stamps `data-irc-mine="true"` on own rows, `data-irc-time` on `bubble.parentElement`, and `data-irc-nick` + `--irc-nick-color` on `[data-msg-bubble="true"]`.
   - Does **not** insert or remove DOM nodes inside React's tree, preventing React reconciliation/hydration crashes.

2. **IRC Chat Layout CSS**:
   - **Avatars Hidden in Chat**: Hides `[data-msg-row] > div.mt-\[4px\].h-\\[16px\]`, `[data-msg-row] img.size-\\[30px\]`, and header group avatars, and prefixes group channel names with `#`.
   - **Left-Alignment of Own Messages (`you:`)**:
     - On own messages (`mine === true`), Convose renders `<div class="contents" data-msg-actions="true">` (`display: contents`) *before* `[data-msg-bubble="true"]`, which exposes 4 invisible action buttons (~110px wide) to the left of the message.
     - Overriding `[data-msg-row] [data-msg-actions].contents { display: inline-flex !important; order: 10 !important; margin-left: auto !important; }` boxes those buttons and pins them to the far right edge of the row so `you:` aligns flush-left with partner messages.
   - **Inline `[time] <nick:> message` Rendering**:
     - `div:has(> [data-msg-bubble="true"])::before` renders `attr(data-irc-time)` in muted monospace (`min-width: 44px; margin-right: 10px`).
     - `[data-msg-bubble="true"]::before` renders `attr(data-irc-nick)` in bold with `color: var(--irc-nick-color)`.
     - `[data-msg-bubble="true"] > div.block` is set to `display: inline !important; padding: 0 !important;` so multi-line messages wrap naturally.
   - **Link Preview Suppression**:
     - Hides `[data-msg-bubble="true"] > div.flex.max-w-full.flex-col.overflow-hidden`, `div.flex.flex-col.items-start.justify-center`, and `div:has(> a[target="_blank"] > img)` so only the clickable text URL is displayed.
   - **Audio Messages in IRC Mode**:
     - Strips bubble backgrounds from `[data-msg-fill]` and `[data-msg-transcript]`, styles `.group\/player` as a compact `22px`-tall inline player right next to `nick:`, and formats the voice transcript below with a `2px` left accent border.
   - **IRC / Hacker Sidebar Revamp**:
     - Preserves all interest icons and `My Chats` profile pictures (`30px` square with `5px` radius) while stripping excess margins, compacting top action buttons and single-line interest rows, removing the spacer dot before relative timestamps (`1m`, `11h`), and switching sidebar typography to `JetBrains Mono` so chat titles and previews do not get cut off prematurely with `"..."`.

---

## 4b. Experimental View: Cyber Style (`settings.cyberMode`)

A sci-fi / Jarvis-style HUD look (references: Cyberpunk 2077 chat UI, HUD element sheets, a "Lower Planetary Union" archive card). Related settings: `cyberFx` (scanlines, glow, sweep, blink) and `secondaryColor` (own-message colour; `accentColor` is the partner/HUD colour).

1. **Entry point**: `buildCyberCss(settings, fontStack)` in `content.js`. Helpers `cyberFrame()` and `cyberPolygon()` build chamfered outlines.
2. **Metadata (`syncIrcMetadata()` also runs for cyber mode)**: stamps `data-irc-mine` on the row, `data-cy-meta` (`NICK // HH:MM`) and `data-cy-first="true"` (first bubble of each speaker block) on `[data-msg-bubble]`. Attributes only, no DOM nodes inside React's tree.
3. **Bubbles**: partner = cut top-right/bottom-left, accent colour; own = cut top-left/bottom-right, `secondaryColor`. Fill uses `background-image` (not `background-color`) so Convose's `!important` hover colour rules cannot override it. The outline is a layered-gradient `::after` frame. The `NICK // TIME` tag is `::before` on the bubble. Glow is a `drop-shadow` on the wrapper `div:has(> [data-msg-bubble])`.
4. **Chat boxes**: frame and corner brackets are `::before` / `::after` on the grid slot `div[data-chat-id]` (strict child-combinator path). Cut corners use background-coloured triangles instead of `clip-path` to avoid clipping popovers.
5. **Interactive containers**: Avoid `clip-path` on input bar and sidebar rows; use borders and inset box-shadows instead.
6. **Overlay**: `syncCyberOverlay()` injects `#convose-cyber-hud` on `<html>` (top frame only): viewport corner brackets, top title tab with live clock, and scan sweep. `pointer-events: none`. Clock updates `nodeValue` (characterData) to prevent triggering `MutationObserver`.
7. **Fonts**: `Rajdhani` (message text) + `Share Tech Mono` (labels/HUD) via the `cyber` entry in `GOOGLE_FONT_URLS`.
8. **Presets**: `cyber-hud`, `night-city`, `olive-union`.

---

## 4c. Experimental View: Skeuomorphic Style (`settings.skeuoMode`)

Retro "real objects" look (denim, leather, paper, wood, brushed metal, glossy buttons). Priority: skeuo > arcade > brutal > spooky > cyber > irc.

1. **Entry point**: `buildSkeuoCss(settings, fontStack)`. Palette mapping: `bgColor` = wood tint, `sidebarColor` = denim, `cardColor` = paper, `bubbleColor` = partner bubble paper, `accentColor` = glossy highlight, `secondaryColor` = own bubble, `textColor` = ink on paper.
2. **Sidebar & Interest Contrast Fix**:
   - Bright paper background is scoped strictly to non-sidebar / modal chips (`:not(aside) > * > [data-interest-chip]`).
   - Sidebar interest chips (`html body aside[data-component="sidebar"] [data-interest-chip]`) use a dark inset denim surface (`linear-gradient(180deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.15))`) with cream `${sideBright}` (`#fff6dc`) text, preventing bright-on-bright contrast issues.
   - Date and time separators in chat use dark ink (`${INK}`) on warm paper with clear text shadows.
3. **Chat Layout**:
   - When `settings.ircMode` is false: partner avatars are visible with rounded frames (`border-radius: 6px; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4)`), partner names are visible above group messages, and own messages remain right-aligned.
   - When `settings.ircMode` is true: compact IRC format is activated with tag line pseudo-elements.
4. **Textures**: Injected by `syncSkeuoOverlay()` as `#convose-skeuo-defs` on `<html>`: `sk-wood`, `sk-leather`, `sk-grain`. CSP-safe inline SVG filters via `feTurbulence`. Flat fallbacks are provided if filters are disabled.
5. **Glossy Buttons**: Split-highlight gradients via `gloss(c)` and `metal`. Bubble fills use `background-image` so Convose's `!important` hover rules cannot wipe them.
6. **Overlay**: `#convose-skeuo-fx` (top frame only) provides fine grain, vignette, and denim header tab.
7. **Presets**: `walnut-denim`, `leather-brass`, `brushed-steel`.

---

## 4d. Experimental View: Arcade Style (`settings.arcadeMode`)

8-bit retro arcade aesthetic with pixel borders, brick-patterned sidebar, and Press Start 2P headers.

1. **Entry point**: `buildArcadeCss(settings, fontStack)` in `content.js`.
2. **Sidebar Contrast Fix**:
   - Computes `sideText` and `sideTitle` based on surface luminance.
   - Sidebar chat rows, interest chips, and buttons use bright gold/white (`#ffffff` / `#f5a623`) with a crisp black shadow (`text-shadow: 1px 1px 0 #000`) so all rows stand out clearly on the dark brick sidebar.
3. **Chat Layout**:
   - When `settings.ircMode` is false: partner avatars are visible (`img.size-[30px]` with 2px solid black border and 2px shadow), partner names appear above group bubbles, and own messages remain right-aligned (`justify-end`).
   - When `settings.ircMode` is true: compact IRC row format is applied.
4. **Preset**: `arcade`.

---

## 4e. Experimental View: Neo-Brutal Style (`settings.brutalMode`)

Flat neo-brutalist aesthetic with high-contrast surfaces, solid black outlines, and hard offset drop shadows.

1. **Entry point**: `buildBrutalCss(rawSettings, fontStack)` in `content.js`.
2. **Stacked Border Elimination**:
   - Chat slot (`${gridSlot}`) uses a crisp single `border: 2px solid #111 !important; box-shadow: 4px 4px 0 #111 !important;` (removed outer double-stroke `0 0 0 2px`).
   - Chat input form (`.bg-input-text-msg-form`) uses a clean `border: 2px solid #111 !important; box-shadow: 2px 2px 0 #111 !important;`.
   - Controls inside the input form (`[data-component="chat-input"] [data-component="mic-button"]` and auxiliary buttons) use `box-shadow: none !important; border: 1.5px solid #111 !important;` so shadows do not collide or produce thick black blobs.
3. **Chat Layout**:
   - When `settings.ircMode` is false: partner avatars are visible with 2px black border and 2px shadow (`border-radius: 4px`), partner usernames and timestamps are displayed above bubbles, and own messages remain right-aligned with no `order: 10` displacement.
   - When `settings.ircMode` is true: compact IRC single-line layout is activated.
4. **Auto-Contrast**: `inkOn(hex)` selects `#111111` or `#ffffff` for text on any surface. Automatically pairs with native `data-theme="light"` via `syncNativeTheme`.
5. **Presets**: `gumroad-pink`, `taxi-brutal`, `mint-brutal`, `lilac-brutal`, `sky-brutal`, `tangerine-brutal`, `ink-brutal`.

---

## 5. Development Rules & Constraints
- **Strict Ban on Emojis**: Never use emojis anywhere in code, UI components, HTML, JSX, CSS, templates, strings, comments, logs, or user notifications. Use SVG icons or clear text badges (such as `EXP`).
- **Syntax Validation**: Always run `node --check "D:\Praktek\convose-customizer\content.js"; node --check "D:\Praktek\convose-customizer\popup.js"` after editing JavaScript files.
- **IIFE Wrapping**: Keep `content.js` wrapped in an IIFE `(() => { ... })()` so on-demand re-injection via `chrome.scripting.executeScript` never throws duplicate identifier errors.
- **Clickable Symbol Links**: When referencing files or symbols in responses or documentation, provide clickable markdown links with `file:///` URLs using forward slashes.
