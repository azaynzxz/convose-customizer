(() => {
  const defaultSettings = {
    themePreset: "midnight-orange",
    hideGrid: false,
    fullScreenChat: false,
    hideSmartPrompts: false,
    ircMode: false,
    cyberMode: false,
    cyberFx: true,
    bgColor: "#0a0a0a",
    sidebarColor: "#121212",
    cardColor: "#161616",
    bubbleColor: "#242424",
    accentColor: "#ff6b00",
    secondaryColor: "#3dff9a",
    textColor: "#ffffff",
    fontFamily: "default",
    borderRadius: 12
  };

  const FONT_MAP = {
    "default": "",
    "inter": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "plus-jakarta": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "poppins": "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "space-grotesk": "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "jetbrains-mono": "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    "lora": "'Lora', Georgia, serif",
    "system": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const GOOGLE_FONT_URLS = {
    "inter": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    "plus-jakarta": "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
    "poppins": "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    "space-grotesk": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
    "jetbrains-mono": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
    "lora": "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
    "cyber": "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap"
  };

  const CYBER_HUD_ID = "convose-cyber-hud";

  const CUSTOMIZER_STYLE_ID = "convose-customizer-styles";
  const FONT_LINK_ID = "convose-customizer-google-font";
  let currentSettings = { ...defaultSettings };

  function ensureGoogleFont(fontKey) {
    const url = GOOGLE_FONT_URLS[fontKey];
    let linkEl = document.getElementById(FONT_LINK_ID);
    if (!url) {
      if (linkEl) linkEl.remove();
      return;
    }
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.id = FONT_LINK_ID;
      linkEl.rel = "stylesheet";
      const target = document.head || document.documentElement;
      if (target) target.appendChild(linkEl);
    }
    if (linkEl.href !== url) {
      linkEl.href = url;
    }
  }

  function getRootVariables(settings) {
    const radiusPx = `${Number(settings.borderRadius ?? 12)}px`;
    const subtleBorder = `color-mix(in srgb, ${settings.bubbleColor} 80%, rgba(255, 255, 255, 0.25))`;
    const reactedBg = `color-mix(in srgb, ${settings.bubbleColor} 35%, ${settings.accentColor})`;
    const hoverAccent = `color-mix(in srgb, ${settings.bubbleColor} 55%, ${settings.accentColor})`;

    return {
      "--body-background": settings.bgColor,
      "--profile-grid-bg": settings.bgColor,
      "--main-background": settings.bgColor,
      "--surface-bg": settings.bgColor,

      "--card-bg": settings.cardColor,
      "--profile-card-bg": settings.cardColor,
      "--profile-card-bg-layers": settings.cardColor,
      "--profile-card-bg-layers-hover": settings.cardColor,
      "--user-card-chat-open-bg": settings.cardColor,
      "--group-card-bg": settings.cardColor,
      "--group-card-chat-screen-bg": settings.cardColor,
      "--group-header-bg": settings.cardColor,
      "--card-header-in-call-bg": settings.cardColor,
      "--chat-message-list-bg": settings.cardColor,
      "--chat-box-bg": settings.cardColor,
      "--chat-header-bg": settings.cardColor,
      "--chat-input-bg": settings.cardColor,
      "--info-surface-bg": settings.cardColor,
      "--modal-bg": settings.cardColor,
      "--user-menu-modal-background": settings.cardColor,
      "--modal-profile-menu-bg": settings.cardColor,
      "--modal-inbox-bg": settings.cardColor,
      "--social-link-item-bg": settings.cardColor,
      "--social-link-item-border": subtleBorder,

      "--msg-bubble-partner-bg": settings.bubbleColor,
      "--msg-bubble-mine": settings.bubbleColor,
      "--msg-bubble-has-reply-bg": settings.bubbleColor,
      "--msg-bubble-reply-bg": `color-mix(in srgb, ${settings.bubbleColor} 82%, white)`,
      "--msg-bubble-hover-light": `color-mix(in srgb, ${settings.bubbleColor} 84%, white)`,
      "--buble-reaction-bg": settings.bubbleColor,
      "--buble-reacted-bg": reactedBg,
      "--border-reaction": subtleBorder,
      "--border-reaction-hover": settings.accentColor,
      "--input-text-msg-form": settings.bubbleColor,
      "--knowledge-level-bg": settings.bubbleColor,
      "--input-on-surface-bg": settings.bubbleColor,
      "--info-card-bg": settings.bubbleColor,
      "--modal-input-bg": settings.bubbleColor,
      "--modal-category-bg": settings.bubbleColor,
      "--modal-input-color": settings.bubbleColor,
      "--modal-knowledge-level-bg": settings.bubbleColor,
      "--social-link-bg": settings.bubbleColor,
      "--modal-inbox-input-bg": settings.bubbleColor,
      "--bg-interest-header": settings.bubbleColor,
      "--form-btn-bg": `color-mix(in srgb, ${settings.bubbleColor} 78%, white)`,

      "--modal-input-border-color": subtleBorder,
      "--social-link-border": subtleBorder,
      "--cream-surface-border": subtleBorder,
      "--modal-input-border-focus-color": subtleBorder,

      "--primary-color": settings.accentColor,
      "--primary-color-hover": hoverAccent,
      "--primary": settings.accentColor,
      "--primary-hover": hoverAccent,
      "--start-quick-call-btn-bg": settings.accentColor,
      "--start-quick-call-btn-hover-bg": `${settings.accentColor}cc`,
      "--btn-add-interest-color": settings.accentColor,
      "--scroll-bar-bg": `color-mix(in srgb, ${settings.accentColor} 45%, transparent)`,

      "--text-color": settings.textColor,
      "--text-primary": settings.textColor,
      "--chat-input-color": settings.textColor,
      "--profile-card-radius": radiusPx,

      "--color-body-background": settings.bgColor,
      "--color-profile-grid-bg": settings.bgColor,
      "--color-card-bg": settings.cardColor,
      "--color-profile-card-bg": settings.cardColor,
      "--color-user-card-chat-open-bg": settings.cardColor,
      "--color-group-card-bg": settings.cardColor,
      "--color-group-card-chat-screen-bg": settings.cardColor,
      "--color-group-header-bg": settings.cardColor,
      "--color-chat-message-list-bg": settings.cardColor,
      "--color-info-surface-bg": settings.cardColor,
      "--color-modal-profile-menu-bg": settings.cardColor,
      "--color-social-link-item-bg": settings.cardColor,
      "--color-social-link-item-border": subtleBorder,
      "--color-msg-bubble-partner-bg": settings.bubbleColor,
      "--color-msg-bubble-mine": settings.bubbleColor,
      "--color-buble-reaction-bg": settings.bubbleColor,
      "--color-buble-reacted-bg": reactedBg,
      "--color-border-reaction": subtleBorder,
      "--color-border-reaction-hover": settings.accentColor,
      "--color-input-text-msg-form": settings.bubbleColor,
      "--color-input-on-surface-bg": settings.bubbleColor,
      "--color-info-card-bg": settings.bubbleColor,
      "--color-modal-input-border-color": subtleBorder,
      "--color-modal-input-border-focus-color": subtleBorder,
      "--color-primary": settings.accentColor,
      "--color-primary-hover": hoverAccent,
      "--color-start-quick-call-btn-bg": settings.accentColor,
      "--color-scroll-bar-bg": `color-mix(in srgb, ${settings.accentColor} 45%, transparent)`,
      "--color-text-color": settings.textColor
    };
  }

  function buildStylesheet(settings) {
    const vars = getRootVariables(settings);
    const varDeclarations = Object.entries(vars)
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join("\n      ");

    const radius = Number(settings.borderRadius ?? 12);
    const radiusPx = `${radius}px`;
    const bubbleRadiusPx = `${Math.max(0, Math.min(28, Math.round(radius * 0.85)))}px`;
    const chipRadiusPx = `${Math.max(0, Math.min(24, Math.round(radius * 0.75)))}px`;
    const fontStack = FONT_MAP[settings.fontFamily] || "";
    const subtleBorder = `color-mix(in srgb, ${settings.bubbleColor} 80%, rgba(255, 255, 255, 0.25))`;
    const reactedBg = `color-mix(in srgb, ${settings.bubbleColor} 35%, ${settings.accentColor})`;

    return `
    :root,
    :host,
    html,
    html[data-theme="dark"],
    html[data-theme="light"] {
      ${varDeclarations}
    }

    /* Main Background Overrides */
    html,
    body,
    [data-component="homepage"],
    [data-component="suggestions-grid"],
    .bg-body-background,
    .bg-profile-grid-bg:not(.group\\/sidebar):not([data-component="sidebar"] *) {
      background-color: ${settings.bgColor} !important;
    }

    /* Sidebar Overrides */
    .group\\/sidebar,
    aside[data-component="sidebar"],
    aside[data-component="sidebar"] .bg-profile-grid-bg,
    .dark\\:bg-\\[\\#1a1b1e\\],
    .dark\\:bg-\\[\\#1A1B1E\\] {
      background-color: ${settings.sidebarColor} !important;
    }

    aside[data-component="sidebar"] > div.absolute.bottom-2 {
      background-color: ${settings.sidebarColor} !important;
      box-shadow: -8px 0 0 0 ${settings.sidebarColor}, 8px 0 0 0 ${settings.sidebarColor}, 0 8px 0 0 ${settings.sidebarColor} !important;
    }

    aside[data-component="sidebar"] article.group\\/row {
      --row-surface: ${settings.sidebarColor} !important;
    }

    /* Chat Box, Suggestion Card & Profile Modal Surface Overrides */
    .bg-card-bg,
    .bg-chat-message-list-bg,
    .bg-group-card-chat-screen-bg,
    .bg-user-card-chat-open-bg,
    .bg-info-surface-bg,
    .dark\\:bg-modal-profile-menu-bg,
    [data-component="my-account"],
    [data-component="paid-plans-page"],
    [data-component="group-card-header"],
    [data-chatbox],
    [data-chatbox] .bg-card-bg,
    [data-suggestion-card] {
      background: ${settings.cardColor} !important;
      background-color: ${settings.cardColor} !important;
    }

    /* Remove Bright Blue Border on Active/Selected Chat Box */
    [data-chat-id].bg-modal-input-border-focus-color,
    .bg-modal-input-border-focus-color {
      background-color: ${settings.cardColor} !important;
      box-shadow: 0 0 0 1px ${subtleBorder} !important;
      border-color: ${subtleBorder} !important;
    }

    /* Profile Modal Inner Fields, Interests Box, Link Box & Banner Placeholder */
    .bg-input-on-surface-bg,
    [data-component="my-interests"],
    [data-component="social-links-input"],
    [data-component="my-account"] .bg-input-on-surface-bg {
      background-color: ${settings.bubbleColor} !important;
      border-color: ${subtleBorder} !important;
    }

    .bg-social-link-item-bg {
      background-color: ${settings.cardColor} !important;
      border-color: ${subtleBorder} !important;
    }

    [data-component="my-banner"]:not([style*="background-image"]),
    [data-component="profile-banner"]:not([style*="background-image"]),
    [data-component="group-banner"]:not([style*="background-image"]) {
      background: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1.6px) 0 0 / 14px 14px,
        linear-gradient(135deg, ${settings.bubbleColor} 0%, ${settings.cardColor} 100%) !important;
    }

    [data-component="my-avatar"] .border-info-surface-bg {
      border-color: ${settings.cardColor} !important;
    }

    /* Message Bubble Overrides (Partner, Own, Reply, Audio Transcript, Inner Fills) */
    .bg-msg-bubble-partner-bg,
    .bg-msg-bubble-mine,
    .bg-msg-bubble-has-reply-bg,
    [data-msg-bubble="true"]:not([data-message-type="image"]),
    [data-msg-fill],
    [data-msg-transcript],
    .bg-input-text-msg-form,
    .bg-knowledge-level-bg {
      background-color: ${settings.bubbleColor} !important;
    }

    .bg-msg-bubble-reply-bg,
    [data-component="chat-message-reply"] > div.bg-msg-bubble-reply-bg {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 82%, white) !important;
    }

    /* Message Reaction Chips (Reacted & Unreacted States + Hover) */
    .bg-buble-reaction-bg,
    [data-msg-reactions].bg-buble-reaction-bg {
      background-color: ${settings.bubbleColor} !important;
      border-color: ${subtleBorder} !important;
    }

    .bg-buble-reacted-bg,
    [data-msg-reactions].bg-buble-reacted-bg {
      background-color: ${reactedBg} !important;
      border-color: color-mix(in srgb, ${settings.accentColor} 65%, transparent) !important;
    }

    [data-msg-reactions]:hover {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 20%, ${settings.accentColor}) !important;
      border-color: ${settings.accentColor} !important;
    }

    /* Audio Player (Seek Slider, Play/Pause Button & Ring) */
    .audio-seek,
    [data-theme="dark"] .audio-seek,
    [data-theme="light"] .audio-seek,
    .audio-seek[data-mine="true"] {
      --audio-fill: ${settings.accentColor} !important;
      --audio-rest: color-mix(in srgb, ${settings.accentColor} 32%, transparent) !important;
    }

    .\\[\\&_path\\]\\:fill-\\[\\#5B65EA\\] path,
    [data-msg-bubble="true"] button svg path {
      fill: ${settings.accentColor} !important;
    }

    .animate-audio-ring {
      border-color: ${settings.accentColor} !important;
    }

    /* Message Bubble Hover States */
    .msg-hover\\:bg-msg-bubble-hover-light:is(:where(html:not([data-recording-audio])) :where([data-msg-row]):hover:not(:has([data-msg-reactions]:hover)) *) {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 84%, white) !important;
    }

    .msg-hover\\:bg-primary-hover:is(:where(html:not([data-recording-audio])) :where([data-msg-row]):hover:not(:has([data-msg-reactions]:hover)) *) {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 55%, ${settings.accentColor}) !important;
    }

    /* Primary Accent Overrides (including Focused Mic Button) */
    .bg-primary,
    .bg-start-quick-call-btn-bg,
    [data-component="add-interest-input"],
    [data-component="group-call-banner"],
    [data-component="mic-button"].bg-\\[\\#5865f2\\],
    .bg-\\[\\#5865f2\\] {
      background-color: ${settings.accentColor} !important;
    }

    .hover\\:bg-primary-hover:hover,
    [data-component="mic-button"].hover\\:bg-\\[\\#4752c4\\]:hover {
      background-color: ${settings.accentColor}cc !important;
    }

    /* Scrollbar Overrides */
    .\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-\\[rgba\\(91\\,101\\,234\\,0\\.3\\)\\]::-webkit-scrollbar-thumb,
    .\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-scroll-bar-bg::-webkit-scrollbar-thumb {
      background-color: color-mix(in srgb, ${settings.accentColor} 45%, transparent) !important;
    }

    /* Text Color Overrides */
    body,
    .text-text-color,
    .text-chat-input-color,
    [data-msg-bubble="true"],
    [data-msg-bubble="true"] span,
    aside[data-component="sidebar"] article.group\\/row span.dark\\:text-white,
    aside[data-component="sidebar"] article.group\\/row div.dark\\:text-white,
    [data-suggestion-card] .dark\\:text-\\[\\#f9fbff\\],
    [data-suggestion-card] .text-\\[\\#1f2937\\] {
      color: ${settings.textColor} !important;
    }

    /* Border Radius Customizer */
    [data-suggestion-card],
    [data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id],
    [data-chatbox],
    [data-chatbox] > div,
    [data-chatbox] > div > div {
      border-radius: ${radiusPx} !important;
    }

    [data-msg-bubble="true"],
    [data-msg-fill],
    [data-msg-transcript],
    .bg-msg-bubble-partner-bg,
    .bg-msg-bubble-mine,
    .bg-msg-bubble-reply-bg,
    .bg-knowledge-level-bg,
    .bg-input-on-surface-bg,
    [data-component="my-interests"],
    [data-component="social-links-input"] {
      border-radius: ${bubbleRadiusPx} !important;
    }

    [data-component="add-interest-input"],
    .bg-input-text-msg-form,
    .group\\/smart > div > div {
      border-radius: ${chipRadiusPx} !important;
    }

    ${fontStack ? `
      /* Font Family Customizer */
      html,
      body,
      button,
      input,
      textarea,
      select,
      .font-sans,
      [data-component="homepage"],
      [data-component="sidebar"],
      [data-component="suggestions-grid"],
      [data-chatbox],
      [data-msg-bubble="true"] {
        font-family: ${fontStack} !important;
      }
    ` : ""}

    ${settings.hideGrid ? `
      /* Hide ONLY top-level suggestion card slots in the grid (never inner chatbox elements) */
      [data-suggestion-card],
      [data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div:not([data-chat-id]):not(:has([data-chatbox])) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    ` : ""}

    ${settings.fullScreenChat ? `
      /* When at least one chat is open, hide non-chat grid cards so chats occupy the full screen cleanly */
      [data-component="suggestions-grid"]:has([data-chat-id]) [data-suggestion-card],
      [data-component="suggestions-grid"]:has([data-chat-id]) > div:not(.fixed) > div.relative.block.size-full > div:not([data-chat-id]):not(:has([data-chatbox])) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Align suggestions-grid to flex-start so width: calc(100% - 180px) does not get centered with a 90px left gap */
      [data-component="suggestions-grid"]:has([data-chat-id]) {
        justify-content: flex-start !important;
      }

      /* Prevent horizontal overflow and dead left spacing when sidebar is expanded */
      [data-component="suggestions-grid"]:has([data-chat-id]) > div.translate-x-\\[180px\\] {
        width: calc(100% - 180px) !important;
      }

      /* Make ONLY the top-level grid canvas a flex container (never the inner .relative.block.size-full inside [data-chatbox]) */
      [data-component="suggestions-grid"]:has([data-chat-id]) > div:not(.fixed) > div.relative.block.size-full {
        display: flex !important;
        flex-direction: row !important;
        gap: 12px !important;
        width: 100% !important;
        height: 100% !important;
      }

      /* Target ONLY the top-level chat slot wrapper inside the grid canvas */
      [data-component="suggestions-grid"]:has([data-chat-id]) > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id],
      [data-component="suggestions-grid"]:has([data-chat-id]) > div:not(.fixed) > div.relative.block.size-full > div:has([data-chatbox]) {
        position: relative !important;
        transform: none !important;
        translate: none !important;
        top: auto !important;
        left: auto !important;
        width: 100% !important;
        height: 100% !important;
        flex: 1 1 0% !important;
        min-width: 0 !important;
        max-width: 100% !important;
        border: 1px solid rgba(255, 255, 255, 0.14) !important;
        z-index: 10 !important;
      }

      /* Keep inner chat elements (call banner & input bar) at natural height */
      [data-chatbox] [data-component="group-call-banner"],
      [data-chatbox] [data-component="chat-input"] {
        height: auto !important;
        flex: 0 0 auto !important;
      }
    ` : ""}

    ${settings.hideSmartPrompts ? `
      /* Hide conversation starter chips bar inside chats */
      .group\\/smart {
        display: none !important;
      }
    ` : ""}

    ${settings.ircMode && !settings.cyberMode ? `
      /* =========================================================
         EXPERIMENTAL VIEW: Classic IRC Chat Style
         ========================================================= */

      /* 1. Hide profile pictures (avatars) inside chat messages & headers (keep sidebar untouched) */
      [data-msg-row] > div.mt-\\[4px\\].h-\\[16px\\],
      [data-msg-row] img.size-\\[30px\\],
      [data-component="group-card-header"] button[aria-label="Group details"],
      [data-chatbox] header img {
        display: none !important;
      }

      /* 2. Style chat header like an IRC channel bar (#channel) */
      [data-component="group-card-header"] {
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        padding-left: 12px !important;
      }

      [data-component="group-card-header"] p::before {
        content: "#";
        color: ${settings.accentColor} !important;
        margin-right: 3px !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      /* 3. Hide standalone sender/timestamp headers above bubbles & hover floating timestamps */
      [data-msg-row] > div > div.flex.items-baseline.gap-\\[6px\\],
      [data-msg-row] > div > p.block.w-fit.text-left.text-\\[11px\\].font-bold,
      [data-msg-row] span.invisible.absolute.right-full {
        display: none !important;
      }

      /* 4. Flatten message rows into compact, left-aligned IRC log lines */
      [data-msg-row] {
        margin-top: 0 !important;
        padding: 2px 10px !important;
        justify-content: flex-start !important;
        align-items: flex-start !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.025) !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      [data-msg-row]:hover {
        background-color: rgba(255, 255, 255, 0.04) !important;
      }

      [data-msg-row][data-irc-mine="true"] {
        background-color: color-mix(in srgb, ${settings.accentColor} 6%, transparent) !important;
      }

      /* 5. Remove avatar left padding and force left-alignment for all messages (including own) */
      [data-msg-row] > div {
        width: 100% !important;
        padding-left: 0 !important;
      }

      [data-msg-row] .pl-\\[33px\\] {
        padding-left: 0 !important;
      }

      [data-msg-row] .min-h-\\[31px\\] {
        min-height: 20px !important;
      }

      [data-msg-row].justify-end,
      [data-msg-row] .justify-end {
        justify-content: flex-start !important;
      }

      [data-msg-row] .self-end {
        align-self: flex-start !important;
      }

      /* 6. IRC Line Layout: [timestamp] <nick:> message */
      div:has(> [data-msg-bubble="true"]) {
        display: flex !important;
        flex-direction: row !important;
        align-items: baseline !important;
        justify-content: flex-start !important;
        width: 100% !important;
      }

      div:has(> [data-msg-bubble="true"])::before {
        content: attr(data-irc-time);
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11px !important;
        line-height: 18px !important;
        color: color-mix(in srgb, ${settings.textColor} 38%, transparent) !important;
        margin-right: 10px !important;
        min-width: 44px !important;
        flex-shrink: 0 !important;
        user-select: none !important;
      }

      /* 7. Strip message bubble background, border, and padding (including higher-specificity & hover selectors) */
      [data-msg-bubble="true"],
      [data-msg-bubble="true"]:not([data-message-type="image"]),
      [data-msg-bubble="true"].bg-msg-bubble-partner-bg,
      [data-msg-bubble="true"].bg-msg-bubble-mine,
      [data-msg-bubble="true"].bg-msg-bubble-has-reply-bg,
      [data-msg-row]:hover [data-msg-bubble="true"],
      [data-msg-row]:hover [data-msg-bubble="true"]:not([data-message-type="image"]),
      [data-msg-row]:hover [data-msg-fill],
      [data-msg-row]:hover [data-msg-transcript] {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 0 !important;
        margin: 0 !important;
        max-width: calc(100% - 60px) !important;
        width: auto !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 12.5px !important;
        line-height: 19px !important;
        translate: none !important;
      }

      [data-msg-bubble="true"]::before {
        content: attr(data-irc-nick);
        font-weight: 700 !important;
        color: var(--irc-nick-color, ${settings.accentColor}) !important;
        margin-right: 7px !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      [data-msg-bubble="true"] > div.block {
        display: inline !important;
        padding: 0 !important;
      }

      [data-msg-bubble="true"] .Linkify {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 12.5px !important;
        line-height: 19px !important;
      }

      /* 8. Hide link preview image cards inside text messages (keep only the clickable URL text) */
      [data-msg-bubble="true"] > div.flex.max-w-full.flex-col.overflow-hidden,
      [data-msg-bubble="true"] > div.flex.flex-col.items-start.justify-center,
      [data-msg-bubble="true"] > div:has(> a[target="_blank"] > img) {
        display: none !important;
      }

      /* 9. Audio Messages in IRC Style (inline compact player + flat transcript line) */
      [data-msg-bubble="true"][data-message-type="audio"],
      [data-msg-bubble="true"]:has(.group\\/player) {
        display: block !important;
        background: transparent !important;
        background-color: transparent !important;
      }

      [data-msg-fill],
      [data-msg-bubble="true"] [data-msg-fill] {
        display: inline-flex !important;
        vertical-align: middle !important;
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      [data-msg-bubble="true"] .group\\/player {
        display: inline-flex !important;
        align-items: center !important;
        vertical-align: middle !important;
        height: 22px !important;
        width: 220px !important;
        max-width: 60vw !important;
        padding: 0 6px !important;
        background: rgba(255, 255, 255, 0.06) !important;
        border: 1px solid rgba(255, 255, 255, 0.14) !important;
        border-radius: 3px !important;
      }

      [data-msg-transcript],
      [data-msg-bubble="true"][data-message-type="audio"] > div.flex.items-end,
      [data-msg-bubble="true"] > div.bg-msg-bubble-partner-bg.flex.items-end {
        display: flex !important;
        align-items: baseline !important;
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        border-left: 2px solid ${settings.accentColor} !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        padding: 1px 0 1px 8px !important;
        margin: 3px 0 1px 0 !important;
      }

      [data-msg-transcript] > div,
      [data-msg-bubble="true"][data-message-type="audio"] > div.flex.items-end > div {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 12px !important;
        line-height: 18px !important;
        color: color-mix(in srgb, ${settings.textColor} 85%, transparent) !important;
      }

      /* 10. Override .contents on [data-msg-actions] so own-message action buttons move to the far right instead of pushing "you:" right */
      [data-msg-row] [data-msg-actions],
      [data-msg-row] [data-msg-actions].contents {
        display: inline-flex !important;
        align-items: center !important;
        order: 10 !important;
        margin-left: auto !important;
        flex: 0 0 auto !important;
      }

      /* 11. Align message reaction chips to the left under the message text */
      [data-msg-row] div:has(> [data-msg-reactions]) {
        justify-content: flex-start !important;
        padding-left: 54px !important;
        margin-top: 2px !important;
      }

      /* 8. Style quoted replies as compact IRC blockquotes */
      [data-component="chat-message-reply"] {
        align-items: flex-start !important;
        justify-content: flex-start !important;
        padding: 1px 0 2px 54px !important;
        margin-bottom: 0 !important;
      }

      [data-component="chat-message-reply"] > div.mt-\\[5px\\] {
        margin: 0 !important;
        justify-content: flex-start !important;
        opacity: 0.65 !important;
        font-size: 10.5px !important;
      }

      [data-component="chat-message-reply"] > div.bg-msg-bubble-reply-bg {
        background: transparent !important;
        background-color: transparent !important;
        border-left: 2px solid ${settings.accentColor} !important;
        border-radius: 0 !important;
        padding: 0 8px !important;
        margin: 1px 0 2px 0 !important;
        align-self: flex-start !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11.5px !important;
        opacity: 0.72 !important;
      }

      /* 9. Style bottom chat input bar like a clean IRC client command input */
      [data-component="chat-input"] form {
        border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
        padding: 6px 8px !important;
      }

      [data-component="chat-input"] .bg-input-text-msg-form {
        border-radius: 4px !important;
        border: 1px solid rgba(255, 255, 255, 0.14) !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      /* 12. IRC / Hacker Sidebar Revamp (compact margins, full-width text without "...", keep profile pics) */
      .group\\/sidebar,
      aside[data-component="sidebar"] {
        border-right: 1px solid rgba(255, 255, 255, 0.09) !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) {
        padding: 4px !important;
      }

      /* Top Brand Bar */
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.mb-\\[18px\\] {
        margin-bottom: 4px !important;
        height: 28px !important;
        padding: 0 4px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.mb-\\[18px\\] button {
        width: 24px !important;
        height: 24px !important;
        border-radius: 3px !important;
      }

      /* + Add interests button */
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-component="add-interest-slot"] {
        height: 28px !important;
        padding: 0 2px !important;
        margin-bottom: 2px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-component="add-interest-input"] {
        height: 24px !important;
        border-radius: 3px !important;
        padding: 0 8px !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11.5px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-component="add-interest-input"] * {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11.5px !important;
      }

      /* Top Action Menu (Search a call, Start a group, Convose events) */
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.mb-\\[7px\\] {
        margin-bottom: 3px !important;
        padding: 2px 0 !important;
        gap: 1px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.mb-\\[7px\\] > button,
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.mb-\\[7px\\] > a {
        height: 23px !important;
        min-height: 23px !important;
        padding: 1px 6px !important;
        gap: 6px !important;
        border-radius: 3px !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11.5px !important;
        font-weight: 500 !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.mb-\\[7px\\] svg {
        width: 13px !important;
        height: 13px !important;
      }

      /* My Interests Section Header & List */
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.-mb-0\\.5.mt-1\\.5 {
        margin-top: 2px !important;
        margin-bottom: 1px !important;
        padding: 0 4px !important;
        height: 18px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.-mb-0\\.5.mt-1\\.5 > p {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.8px !important;
        color: ${settings.accentColor} !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) > div.-mb-0\\.5.mt-1\\.5 > button {
        width: 18px !important;
        height: 18px !important;
        border-radius: 3px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) ul[data-component="sidebar-interests"] {
        padding-bottom: 3px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) ul[data-component="sidebar-interests"] > li {
        max-height: 23px !important;
        padding: 0 !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-interest-chip] {
        height: 22px !important;
        min-height: 22px !important;
        padding: 0 4px !important;
        border-radius: 3px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-interest-chip] > img {
        width: 15px !important;
        height: 15px !important;
        min-width: 15px !important;
        border-radius: 3px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-interest-chip] > div.ml-2\\.5 {
        margin-left: 6px !important;
        height: 20px !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 4px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-interest-chip] > div.ml-2\\.5 > span {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11px !important;
        line-height: 16px !important;
        letter-spacing: 0 !important;
        max-width: none !important;
        flex: 1 1 auto !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) [data-interest-chip] > div.ml-2\\.5 > div {
        width: auto !important;
        flex-shrink: 0 !important;
        opacity: 0.65 !important;
        transform: scale(0.8) !important;
        transform-origin: right center !important;
      }

      /* My Chats Section Header & Rows (keep profile pics, maximize text width) */
      aside[data-component="sidebar"] section.mt-\\[22px\\] {
        margin-top: 3px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) section > div.-mb-0\\.5 {
        padding: 0 4px !important;
        height: 18px !important;
        margin-bottom: 2px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) section > div.-mb-0\\.5 > span {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.8px !important;
        color: ${settings.accentColor} !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) section > div.-mb-0\\.5 > button {
        width: 18px !important;
        height: 18px !important;
        border-radius: 3px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) section > div[data-wheel-scroll] {
        padding-right: 2px !important;
        padding-bottom: 42px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row {
        min-height: 42px !important;
        padding: 6px 5px !important;
        margin-bottom: 3px !important;
        gap: 8px !important;
        border-radius: 4px !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      /* Keep profile pics in My Chats balanced with the added vertical breathing room */
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row > div.min-w-\\[40px\\],
      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row > div.min-w-\\[40px\\] > div[style*="width: 40px"] {
        width: 30px !important;
        height: 30px !important;
        min-width: 30px !important;
        border-radius: 5px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row > div.min-w-\\[40px\\] div[style*="border-radius: 14px"] {
        border-radius: 5px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row > div.min-w-0.flex-auto {
        gap: 2.5px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row > button[title="Delete conversation"] {
        right: 2px !important;
        top: 4px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row .text-\\[14px\\].font-bold {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 11px !important;
        line-height: 14px !important;
        padding-right: 2px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row .min-h-\\[22px\\] {
        min-height: 13px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row .text-\\[15px\\] {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 10px !important;
        line-height: 13px !important;
        opacity: 0.72 !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row span.ml-4 {
        margin-left: 4px !important;
        font-size: 9.5px !important;
        opacity: 0.48 !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row span.ml-4::after {
        display: none !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row div[role="button"] {
        height: 19px !important;
        min-width: 42px !important;
        padding: 0 5px !important;
        border-radius: 3px !important;
      }

      aside[data-component="sidebar"]:not(.w-\\[70px\\]) article.group\\/row div[role="button"] p {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        font-size: 10px !important;
      }

      /* Bottom User Bar (Zen / Free / Upgrade) */
      aside[data-component="sidebar"] > div.absolute.bottom-2 {
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        padding: 4px 6px !important;
        border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
      }

      aside[data-component="sidebar"] > div.absolute.bottom-2 .size-8 {
        width: 24px !important;
        height: 24px !important;
        border-radius: 4px !important;
      }

      aside[data-component="sidebar"] > div.absolute.bottom-2 * {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
      }

      aside[data-component="sidebar"] > div.absolute.bottom-2 button.rounded-xl {
        padding: 2px 6px !important;
        font-size: 10px !important;
        border-radius: 3px !important;
      }
    ` : ""}

    ${settings.cyberMode ? buildCyberCss(settings, fontStack) : ""}
  `;
  }

  /* =============================================================
     CYBER STYLE: HUD interface + chamfered sci-fi chat bubbles
     ============================================================= */

  // Builds a layered-gradient outline for a box with two chamfered corners.
  // kind "tl-br": cuts top-left and bottom-right. kind "tr-bl": cuts top-right and bottom-left.
  function cyberFrame(color, kind, c, w) {
    const solid = `linear-gradient(${color}, ${color})`;
    const d = `${c}px`;
    const rest = `calc(100% - ${c}px)`;
    const band = 1.5;
    if (kind === "tr-bl") {
      return [
        `${solid} 0 0 / ${rest} ${w}px no-repeat`,
        `${solid} 100% ${d} / ${w}px ${rest} no-repeat`,
        `${solid} 100% 100% / ${rest} ${w}px no-repeat`,
        `${solid} 0 0 / ${w}px ${rest} no-repeat`,
        `linear-gradient(to top right, transparent calc(50% - ${band}px), ${color} calc(50% - ${band}px) 50%, transparent 50%) 100% 0 / ${d} ${d} no-repeat`,
        `linear-gradient(to top right, transparent 50%, ${color} 50% calc(50% + ${band}px), transparent calc(50% + ${band}px)) 0 100% / ${d} ${d} no-repeat`
      ].join(", ");
    }
    return [
      `${solid} 100% 0 / ${rest} ${w}px no-repeat`,
      `${solid} 100% 0 / ${w}px ${rest} no-repeat`,
      `${solid} 0 100% / ${rest} ${w}px no-repeat`,
      `${solid} 0 100% / ${w}px ${rest} no-repeat`,
      `linear-gradient(to bottom right, transparent 50%, ${color} 50% calc(50% + ${band}px), transparent calc(50% + ${band}px)) 0 0 / ${d} ${d} no-repeat`,
      `linear-gradient(to bottom right, transparent calc(50% - ${band}px), ${color} calc(50% - ${band}px) 50%, transparent 50%) 100% 100% / ${d} ${d} no-repeat`
    ].join(", ");
  }

  function cyberPolygon(kind, c) {
    if (kind === "tr-bl") {
      return `polygon(0 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% 100%, ${c}px 100%, 0 calc(100% - ${c}px))`;
    }
    return `polygon(${c}px 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%, 0 ${c}px)`;
  }

  function buildCyberCss(settings, fontStack) {
    const A = settings.accentColor;
    const S = settings.secondaryColor || "#3dff9a";
    const T = settings.textColor;
    const BG = settings.bgColor;
    const CARD = settings.cardColor;
    const BUB = settings.bubbleColor;
    const fx = settings.cyberFx !== false;

    const mono = "'Share Tech Mono', 'JetBrains Mono', 'Fira Code', Consolas, monospace";
    const ui = fontStack || "'Rajdhani', 'Segoe UI', system-ui, sans-serif";

    const mix = (c, pct) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
    const lineA = mix(A, 55);
    const dimA = mix(A, 26);
    const faintA = mix(A, 9);
    const lineS = mix(S, 60);

    const fillPartner = `color-mix(in srgb, ${BUB} 90%, ${A})`;
    const fillMine = `color-mix(in srgb, ${BUB} 84%, ${S})`;
    const bubCut = 9;
    const boxCut = 16;

    const partnerFrame = cyberFrame(lineA, "tr-bl", bubCut, 1);
    const mineFrame = cyberFrame(lineS, "tl-br", bubCut, 1);

    const boxFrame = cyberFrame(mix(A, 42), "tl-br", boxCut, 1);
    const boxFrameFocus = cyberFrame(mix(A, 85), "tl-br", boxCut, 1);
    const boxCorners = (cut) => `
      linear-gradient(135deg, ${BG} 0 50%, transparent 50%) 0 0 / ${cut}px ${cut}px no-repeat,
      linear-gradient(315deg, ${BG} 0 50%, transparent 50%) 100% 100% / ${cut}px ${cut}px no-repeat`;

    const gridSlot = `[data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]`;

    const scan = fx ? `repeating-linear-gradient(0deg, ${mix(A, 4)} 0 1px, transparent 1px 3px)` : "none";
    const glowP = fx ? `drop-shadow(0 0 4px ${mix(A, 30)})` : "none";
    const glowM = fx ? `drop-shadow(0 0 4px ${mix(S, 30)})` : "none";
    const txtGlow = fx ? `0 0 7px ${mix(A, 28)}` : "none";

    return `
      /* =========================================================
         CYBER STYLE: HUD interface, chamfered bubbles, scan grid
         ========================================================= */

      :root { --cy-a: ${A}; --cy-s: ${S}; --cy-line: ${lineA}; }

      /* ---- Page background: fixed fine grid + crosshair marks ---- */
      body,
      [data-component="suggestions-grid"] {
        background-image:
          radial-gradient(circle at 0 0, ${mix(A, 60)} 1.4px, transparent 2.4px),
          linear-gradient(${mix(A, 10)} 1px, transparent 1px),
          linear-gradient(90deg, ${mix(A, 10)} 1px, transparent 1px),
          linear-gradient(${mix(A, 4)} 1px, transparent 1px),
          linear-gradient(90deg, ${mix(A, 4)} 1px, transparent 1px),
          radial-gradient(ellipse at 50% 0%, ${mix(A, 9)}, transparent 60%) !important;
        background-size: 80px 80px, 80px 80px, 80px 80px, 20px 20px, 20px 20px, 100% 100% !important;
        background-position: 0 0 !important;
        background-repeat: repeat, repeat, repeat, repeat, repeat, no-repeat !important;
        background-attachment: fixed !important;
      }

      /* ---- Chat slots: chamfered HUD frame with corner brackets ---- */
      ${gridSlot} {
        border-radius: 0 !important;
        border-color: transparent !important;
        background: ${CARD} !important;
        box-shadow: none !important;
      }

      ${gridSlot}::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 30;
        pointer-events: none;
        background: ${boxCorners(boxCut)}, ${boxFrame};
      }

      ${gridSlot}::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 31;
        pointer-events: none;
        background:
          linear-gradient(${A}, ${A}) 100% 0 / 24px 2px no-repeat,
          linear-gradient(${A}, ${A}) 100% 0 / 2px 24px no-repeat,
          linear-gradient(${A}, ${A}) 0 100% / 24px 2px no-repeat,
          linear-gradient(${A}, ${A}) 0 100% / 2px 24px no-repeat,
          linear-gradient(${A}, ${A}) ${boxCut}px 0 / 28px 2px no-repeat,
          linear-gradient(${A}, ${A}) 0 ${boxCut}px / 2px 28px no-repeat,
          linear-gradient(${A}, ${A}) right ${boxCut}px bottom 0 / 28px 2px no-repeat,
          linear-gradient(${A}, ${A}) right 0 bottom ${boxCut}px / 2px 28px no-repeat,
          repeating-linear-gradient(90deg, ${mix(A, 50)} 0 1px, transparent 1px 5px) right 46px top 4px / 70px 4px no-repeat;
        ${fx ? `filter: drop-shadow(0 0 3px ${mix(A, 55)});` : ""}
      }

      ${gridSlot}.bg-modal-input-border-focus-color {
        background: ${CARD} !important;
      }

      ${gridSlot}.bg-modal-input-border-focus-color::before {
        background: ${boxCorners(boxCut)}, ${boxFrameFocus};
      }

      [data-chatbox],
      [data-chatbox] > div,
      [data-chatbox] > div > div {
        border-radius: 0 !important;
      }

      /* ---- Chat header: "> NAME <" title with ruler ticks ---- */
      [data-chatbox] [data-component="group-card-header"],
      [data-chatbox] header {
        background:
          linear-gradient(90deg, ${A} 0 54px, transparent 54px) 0 100% / 100% 2px no-repeat,
          linear-gradient(${dimA}, ${dimA}) 0 100% / 100% 1px no-repeat,
          repeating-linear-gradient(90deg, ${mix(A, 40)} 0 1px, transparent 1px 6px) 100% 100% / 110px 6px no-repeat,
          linear-gradient(0deg, ${faintA}, transparent 80%),
          ${CARD} !important;
        border-bottom: none !important;
      }

      /* Title: same "> NAME" look for group and 1-on-1 chats, one line, long names end with "..." */
      [data-chatbox] [data-component="group-card-header"] p,
      [data-chatbox] header [data-cy-title] {
        display: inline-block !important;
        max-width: 100% !important;
        min-width: 0 !important;
        vertical-align: middle !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        font-family: ${mono} !important;
        font-size: 12.5px !important;
        font-weight: 400 !important;
        line-height: 1.3 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        color: ${A} !important;
        ${fx ? `text-shadow: 0 0 8px ${mix(A, 45)};` : ""}
      }

      [data-chatbox] header :has(> [data-cy-title]),
      [data-chatbox] header :has(> p) {
        min-width: 0 !important;
      }

      [data-chatbox] [data-component="group-card-header"] p::before,
      [data-chatbox] header [data-cy-title]::before {
        content: "> ";
        opacity: 0.75;
      }

      /* Header avatar: angled frame instead of a circle */
      [data-chatbox] header img {
        border-radius: 0 !important;
        clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px) !important;
      }

      /* ---- Replies: "RE:" tag line + hatched quote ---- */
      [data-component="chat-message-reply"] > div.mt-\\[5px\\] {
        font-family: ${mono} !important;
        font-size: 9.5px !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        color: ${mix(T, 62)} !important;
      }

      [data-component="chat-message-reply"] > div.mt-\\[5px\\] * {
        font-family: ${mono} !important;
        font-size: 9.5px !important;
        letter-spacing: 0.12em !important;
      }

      [data-component="chat-message-reply"] > div.mt-\\[5px\\] svg {
        color: ${A} !important;
        fill: ${A} !important;
      }

      [data-component="chat-message-reply"] > div.bg-msg-bubble-reply-bg::before {
        content: "RE:";
        display: inline-block;
        margin-right: 7px;
        padding: 0 4px;
        font-family: ${mono};
        font-size: 9px;
        letter-spacing: 0.14em;
        color: ${BG};
        background: ${A};
        vertical-align: 1px;
      }

      /* ---- Unread badge (tagged by content.js): angled alert tag ---- */
      [data-cy-badge] {
        border-radius: 0 !important;
        clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px) !important;
        background: #ff3b5c !important;
        background-color: #ff3b5c !important;
        color: #0a0a0a !important;
        font-family: ${mono} !important;
        font-weight: 700 !important;
        font-size: 11px !important;
        letter-spacing: 0 !important;
        min-width: 17px !important;
        ${fx ? "animation: cy-badge 1.8s ease-in-out infinite;" : ""}
      }

      /* ---- Focus: active chat glows and pulses, the other chats step back ---- */
      [data-component="suggestions-grid"]:has([data-chat-id].bg-modal-input-border-focus-color) > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]:not(.bg-modal-input-border-focus-color) {
        opacity: 0.74;
        transition: opacity 0.2s ease;
      }

      [data-component="suggestions-grid"]:has([data-chat-id].bg-modal-input-border-focus-color) > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]:not(.bg-modal-input-border-focus-color):hover {
        opacity: 1;
      }

      ${gridSlot}.bg-modal-input-border-focus-color::after {
        filter: drop-shadow(0 0 7px ${mix(A, 90)});
        ${fx ? "animation: cy-pulse 3.2s ease-in-out infinite;" : ""}
      }

      ${gridSlot}.bg-modal-input-border-focus-color header [data-cy-title],
      ${gridSlot}.bg-modal-input-border-focus-color [data-component="group-card-header"] p {
        text-shadow: 0 0 10px ${mix(A, 80)};
      }

      /* ---- Message list: scan grid surface ---- */
      [data-chatbox] .bg-chat-message-list-bg,
      [data-chatbox] .bg-group-card-chat-screen-bg {
        background:
          radial-gradient(${mix(A, 14)} 1px, transparent 1.4px) 0 0 / 22px 22px,
          ${scan},
          ${CARD} !important;
      }

      /* ---- Rows: hide avatars + native name header (info moves into the bubble tag) ---- */
      [data-msg-row] > div.mt-\\[4px\\].h-\\[16px\\],
      [data-msg-row] img.size-\\[30px\\],
      [data-msg-row] > div > div.flex.items-baseline.gap-\\[6px\\],
      [data-msg-row] > div > p.block.w-fit.text-left.text-\\[11px\\].font-bold {
        display: none !important;
      }

      [data-msg-row] {
        margin-top: 3px !important;
      }

      [data-msg-row]:hover {
        background: linear-gradient(90deg, ${faintA}, transparent 70%) !important;
      }

      /* ---- Chat bubbles: chamfered HUD panels ---- */
      [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        position: relative !important;
        display: block !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        font-family: ${ui} !important;
      }

      [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]) {
        background-image: linear-gradient(${fillPartner}, ${fillPartner}) !important;
        clip-path: ${cyberPolygon("tr-bl", bubCut)} !important;
        max-width: min(100%, 560px) !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]) {
        background-image: linear-gradient(${fillMine}, ${fillMine}) !important;
        clip-path: ${cyberPolygon("tl-br", bubCut)} !important;
      }

      [data-msg-row] [data-msg-bubble="true"][data-message-type="image"] {
        clip-path: ${cyberPolygon("tr-bl", bubCut)} !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-message-type="image"] {
        clip-path: ${cyberPolygon("tl-br", bubCut)} !important;
      }

      [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"])::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        background: ${partnerFrame};
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="intro"])::after {
        background: ${mineFrame};
      }

      [data-msg-row]:hover [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        filter: brightness(1.18) !important;
      }

      /* Soft neon glow around each bubble (applied on the wrapper so the clip-path does not cut it) */
      [data-msg-row]:not([data-irc-mine="true"]) div:has(> [data-msg-bubble="true"]:not([data-message-type="intro"])) {
        filter: ${glowP};
      }

      [data-msg-row][data-irc-mine="true"] div:has(> [data-msg-bubble="true"]:not([data-message-type="intro"])) {
        filter: ${glowM};
      }

      /* Tag line inside the bubble: NICK // HH:MM (first message of each speaker block) */
      [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before {
        content: attr(data-cy-meta);
        display: block;
        padding: 6px 12px 0 12px;
        font-family: ${mono};
        font-size: 10px;
        line-height: 1;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        white-space: nowrap;
        color: color-mix(in srgb, var(--irc-nick-color, ${A}) 62%, white);
        opacity: 0.95;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"])::before {
        color: ${S};
      }

      [data-msg-row] [data-msg-bubble="true"] > div.block {
        padding: 5px 12px 6px 12px !important;
        font-family: ${ui} !important;
        font-size: 15.5px !important;
        font-weight: 500 !important;
        line-height: 1.22 !important;
        letter-spacing: 0.015em !important;
        color: ${T} !important;
        ${fx ? `text-shadow: ${txtGlow};` : ""}
      }

      [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"] > div.block {
        padding-top: 3px !important;
      }

      [data-msg-row] [data-msg-bubble="true"] .Linkify,
      [data-msg-row] [data-msg-bubble="true"] span {
        font-family: ${ui} !important;
      }

      [data-msg-row] [data-msg-bubble="true"] a {
        color: ${S} !important;
        text-decoration: underline dotted !important;
        text-underline-offset: 3px !important;
      }

      [data-msg-row] [data-msg-bubble="true"] > span.absolute {
        font-family: ${mono} !important;
        color: ${mix(T, 50)} !important;
      }

      /* Link preview cards: square off */
      [data-msg-bubble="true"] > div.flex.max-w-full.flex-col.overflow-hidden {
        border-radius: 0 !important;
        border-top: 1px solid ${dimA} !important;
      }

      /* ---- Audio messages: segmented HUD player ---- */
      [data-msg-bubble="true"][data-message-type="audio"] [data-msg-fill],
      [data-msg-bubble="true"][data-message-type="audio"] [data-msg-transcript] {
        border-radius: 0 !important;
        background-image: none !important;
      }

      [data-msg-bubble="true"][data-message-type="audio"] [data-msg-transcript] {
        border-top: 1px dashed ${dimA} !important;
        font-family: ${ui} !important;
      }

      [data-msg-bubble="true"] .group\\/player {
        font-family: ${mono} !important;
      }

      .audio-seek {
        --audio-fill: ${A} !important;
        --audio-rest: ${mix(A, 24)} !important;
      }

      [data-msg-row][data-irc-mine="true"] .audio-seek {
        --audio-fill: ${S} !important;
        --audio-rest: ${mix(S, 24)} !important;
      }

      /* ---- Replies + reactions ---- */
      [data-component="chat-message-reply"] > div.bg-msg-bubble-reply-bg {
        border-radius: 0 !important;
        border-left: 2px solid ${A} !important;
        background:
          repeating-linear-gradient(135deg, ${mix(A, 7)} 0 4px, transparent 4px 8px),
          ${BUB} !important;
        font-family: ${mono} !important;
        font-size: 11.5px !important;
      }

      [data-msg-reactions] {
        border-radius: 0 !important;
        clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%) !important;
        font-family: ${mono} !important;
        border-color: ${lineA} !important;
      }

      /* ---- Input bar: terminal prompt ---- */
      [data-component="chat-input"] {
        background: linear-gradient(0deg, ${faintA}, transparent 85%), ${CARD} !important;
        box-shadow: inset 0 1px 0 ${dimA} !important;
      }

      [data-component="chat-input"] .bg-input-text-msg-form {
        border-radius: 0 !important;
        border: 1px solid ${lineA} !important;
        border-left: 3px solid ${A} !important;
        font-family: ${mono} !important;
      }

      [data-component="chat-input"] textarea,
      [data-component="chat-input"] input,
      [data-component="chat-input"] [contenteditable] {
        caret-color: ${A} !important;
        font-family: ${mono} !important;
        font-size: 13px !important;
        letter-spacing: 0.04em !important;
      }

      [data-component="chat-input"] ::placeholder {
        color: ${mix(A, 55)} !important;
        text-transform: uppercase !important;
        letter-spacing: 0.12em !important;
        font-size: 11px !important;
        opacity: 1 !important;
      }

      .group\\/smart > div > div {
        border-radius: 0 !important;
        border: 1px solid ${dimA} !important;
        font-family: ${mono} !important;
        text-transform: uppercase !important;
        letter-spacing: 0.06em !important;
        font-size: 10.5px !important;
      }

      /* ---- Accent-filled controls become outlined neon controls ---- */
      .bg-primary,
      .bg-start-quick-call-btn-bg,
      [data-component="group-call-banner"],
      [data-component="mic-button"].bg-\\[\\#5865f2\\],
      .bg-\\[\\#5865f2\\] {
        background-color: ${mix(A, 16)} !important;
        border: 1px solid ${A} !important;
        border-radius: 0 !important;
        color: ${A} !important;
      }

      [data-component="add-interest-input"] {
        border-radius: 0 !important;
        background-color: ${mix(A, 12)} !important;
        border: 1px solid ${lineA} !important;
        font-family: ${mono} !important;
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important;
      }

      /* ---- Sidebar: HUD rail ---- */
      .group\\/sidebar,
      aside[data-component="sidebar"] {
        font-family: ${mono} !important;
        border-right: 1px solid ${lineA} !important;
        background-image:
          ${scan},
          linear-gradient(90deg, transparent calc(100% - 1px), ${mix(A, 70)} calc(100% - 1px)) !important;
        ${fx ? `box-shadow: 1px 0 14px -5px ${mix(A, 45)} !important;` : ""}
      }

      aside[data-component="sidebar"] * {
        font-family: ${mono} !important;
        letter-spacing: 0.01em;
      }

      /* Wider sidebar (250px -> 320px) so chat titles and previews are not cut off with "..." */
      aside[data-component="sidebar"]:not(.w-\\[70px\\]),
      .group\\/sidebar:has(> aside[data-component="sidebar"]:not(.w-\\[70px\\])) {
        width: 320px !important;
        min-width: 320px !important;
        max-width: 320px !important;
      }

      /* Convose shifts the grid by 180px (sidebar 250px - rail 70px); shift it 70px more */
      html:has(aside[data-component="sidebar"]:not(.w-\\[70px\\])) [data-component="suggestions-grid"] > div.translate-x-\\[180px\\] {
        --tw-translate-x: 250px !important;
        translate: 250px 0 !important;
      }

      ${settings.fullScreenChat ? `
      html:has(aside[data-component="sidebar"]:not(.w-\\[70px\\])) [data-component="suggestions-grid"]:has([data-chat-id]) > div.translate-x-\\[180px\\] {
        width: calc(100% - 250px) !important;
      }
      ` : ""}

      aside[data-component="sidebar"] article.group\\/row .text-\\[14px\\].font-bold {
        font-size: 13px !important;
        letter-spacing: 0 !important;
      }

      aside[data-component="sidebar"] article.group\\/row .text-\\[15px\\] {
        font-size: 12px !important;
        letter-spacing: 0 !important;
      }

      aside[data-component="sidebar"] [data-interest-chip] span {
        font-size: 13px !important;
        letter-spacing: 0 !important;
      }

      aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p,
      aside[data-component="sidebar"] section > div.-mb-0\\.5 > span {
        text-transform: uppercase !important;
        letter-spacing: 0.18em !important;
        font-size: 10.5px !important;
        color: ${A} !important;
      }

      aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p::before,
      aside[data-component="sidebar"] section > div.-mb-0\\.5 > span::before {
        content: "[ ";
      }

      aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p::after,
      aside[data-component="sidebar"] section > div.-mb-0\\.5 > span::after {
        content: " ]";
      }

      aside[data-component="sidebar"] article.group\\/row,
      aside[data-component="sidebar"] [data-interest-chip],
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a {
        border-radius: 0 !important;
        box-shadow: inset 2px 0 0 ${dimA};
      }

      aside[data-component="sidebar"] article.group\\/row:hover,
      aside[data-component="sidebar"] [data-interest-chip]:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a:hover {
        background-image: linear-gradient(90deg, ${mix(A, 14)}, transparent 85%) !important;
        box-shadow: inset 2px 0 0 ${A};
      }

      aside[data-component="sidebar"] > div.absolute.bottom-2 {
        border-top: 1px solid ${lineA} !important;
        border-radius: 0 !important;
      }

      /* ---- Scrollbars ---- */
      *::-webkit-scrollbar { width: 6px; height: 6px; }
      *::-webkit-scrollbar-thumb { background-color: ${mix(A, 45)} !important; border-radius: 0 !important; }
      *::-webkit-scrollbar-track { background: ${faintA} !important; }

      /* ---- Top-level HUD overlay (injected by content.js, pointer-events: none) ---- */
      #${CYBER_HUD_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483000;
        pointer-events: none;
        font-family: ${mono};
        color: ${A};
      }

      #${CYBER_HUD_ID} .cy-c {
        position: absolute;
        width: 10px;
        height: 10px;
        border: 0 solid ${A};
        opacity: 0.9;
      }

      #${CYBER_HUD_ID} .cy-tl { top: 2px; left: 2px; border-top-width: 2px; border-left-width: 2px; }
      #${CYBER_HUD_ID} .cy-tr { top: 2px; right: 2px; border-top-width: 2px; border-right-width: 2px; }
      #${CYBER_HUD_ID} .cy-bl { bottom: 2px; left: 2px; border-bottom-width: 2px; border-left-width: 2px; }
      #${CYBER_HUD_ID} .cy-br { bottom: 2px; right: 2px; border-bottom-width: 2px; border-right-width: 2px; }

      #${CYBER_HUD_ID} .cy-top {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 16px;
        padding: 0 22px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 9px;
        letter-spacing: 0.22em;
        white-space: nowrap;
        text-transform: uppercase;
        background:
          linear-gradient(${A}, ${A}) 0 100% / 100% 1px no-repeat,
          linear-gradient(${mix(A, 14)}, ${mix(A, 14)});
        clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 10px 100%);
        ${fx ? `filter: drop-shadow(0 0 4px ${mix(A, 50)});` : ""}
      }

      #${CYBER_HUD_ID} .cy-dot {
        width: 5px;
        height: 5px;
        background: ${S};
        ${fx ? `box-shadow: 0 0 6px ${S}; animation: cy-blink 1.6s steps(2, jump-none) infinite;` : ""}
      }

      #${CYBER_HUD_ID} .cy-sweep {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 90px;
        display: ${fx ? "block" : "none"};
        background: linear-gradient(180deg, transparent, ${mix(A, 6)} 70%, ${mix(A, 20)} 99%, transparent);
        opacity: 0.55;
        animation: cy-sweep 9s linear infinite;
      }

      @keyframes cy-blink { 0% { opacity: 1; } 100% { opacity: 0.15; } }
      @keyframes cy-pulse {
        0%, 100% { filter: drop-shadow(0 0 4px ${mix(A, 70)}); }
        50% { filter: drop-shadow(0 0 11px ${mix(A, 100)}); }
      }
      @keyframes cy-badge { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      @keyframes cy-sweep { 0% { transform: translateY(-100px); } 100% { transform: translateY(100vh); } }

      @media (prefers-reduced-motion: reduce) {
        #${CYBER_HUD_ID} .cy-dot,
        #${CYBER_HUD_ID} .cy-sweep,
        [data-cy-badge],
        ${gridSlot}.bg-modal-input-border-focus-color::after { animation: none !important; }
      }
    `;
  }

  const IRC_NICK_PALETTE = [
    "#5294e2",
    "#2ecc71",
    "#e67e22",
    "#bb86fc",
    "#1abc9c",
    "#ff79c6",
    "#8be9fd",
    "#ffb86c"
  ];

  function hashNickColor(nick) {
    let h = 0;
    for (let i = 0; i < nick.length; i++) {
      h = (h * 31 + nick.charCodeAt(i)) >>> 0;
    }
    return IRC_NICK_PALETTE[h % IRC_NICK_PALETTE.length];
  }

  function syncIrcMetadata() {
    if (!currentSettings.ircMode && !currentSettings.cyberMode) return;
    const cyber = Boolean(currentSettings.cyberMode);

    const myInput = document.querySelector('[data-component="my-username"]');
    const myName = (myInput && myInput.value && myInput.value.trim()) ? myInput.value.trim() : "you";

    const chatboxes = document.querySelectorAll("[data-chatbox]");
    const roots = chatboxes.length > 0 ? chatboxes : [document];

    roots.forEach((container) => {
      const headerTitleEl = container.querySelector?.('[data-component="group-card-header"] p, header p, header span');
      const fallbackPartner = headerTitleEl?.textContent?.trim() || "user";

      let lastPartnerNick = "";
      let lastPartnerColor = "";
      let lastTime = "";
      let prevSpeakerKey = "";

      const rows = container.querySelectorAll?.("[data-msg-row]") || [];
      rows.forEach((row) => {
        const bubble = row.querySelector('[data-msg-bubble="true"]');
        if (!bubble || !bubble.parentElement) return;

        const isMine =
          bubble.classList.contains("bg-msg-bubble-mine") ||
          row.classList.contains("justify-end") ||
          bubble.classList.contains("self-end") ||
          !!row.querySelector(".bg-msg-bubble-mine");

        if (isMine) {
          row.setAttribute("data-irc-mine", "true");
        } else {
          row.removeAttribute("data-irc-mine");
        }

        // Extract timestamp
        let timeStr = "";
        const hiddenTime = bubble.querySelector(":scope > span.hidden");
        if (hiddenTime && hiddenTime.textContent) {
          timeStr = hiddenTime.textContent.trim();
        }
        if (!timeStr) {
          const tooltipTime = bubble.getAttribute("data-tooltip-content");
          if (tooltipTime) timeStr = tooltipTime.trim();
        }
        if (!timeStr) {
          const anyTimeSpan = row.querySelector('span.text-\\[10px\\]');
          if (anyTimeSpan && anyTimeSpan.textContent) {
            timeStr = anyTimeSpan.textContent.trim();
          }
        }
        if (timeStr) {
          lastTime = timeStr;
        } else {
          timeStr = lastTime;
        }

        // Extract sender nickname & color
        let nick = "";
        let nickColor = "";
        if (isMine) {
          nick = myName;
          nickColor = "#f1c40f";
        } else {
          const senderP = row.querySelector("p.cursor-pointer.font-bold");
          const replySenderSpan = row.querySelector('[data-component="chat-message-reply"] span.cursor-pointer.font-bold');
          const senderEl = senderP || replySenderSpan;
          if (senderEl && senderEl.textContent && senderEl.textContent.trim()) {
            lastPartnerNick = senderEl.textContent.trim();
            lastPartnerColor = senderEl.style.color || hashNickColor(lastPartnerNick);
          }
          nick = lastPartnerNick || fallbackPartner;
          nickColor = lastPartnerColor || hashNickColor(nick);
        }

        const formattedNick = `${nick}:`;
        if (bubble.parentElement.getAttribute("data-irc-time") !== timeStr) {
          bubble.parentElement.setAttribute("data-irc-time", timeStr);
        }
        if (bubble.getAttribute("data-irc-nick") !== formattedNick) {
          bubble.setAttribute("data-irc-nick", formattedNick);
        }
        if (bubble.style.getPropertyValue("--irc-nick-color") !== nickColor) {
          bubble.style.setProperty("--irc-nick-color", nickColor);
        }

        if (cyber) {
          // Cyber style: "NICK // HH:MM" tag shown only on the first bubble of each speaker block
          const speakerKey = isMine ? "\u0000me" : nick;
          const isFirst = speakerKey !== prevSpeakerKey;
          prevSpeakerKey = speakerKey;
          const meta = timeStr ? `${nick} // ${timeStr}` : nick;
          if (bubble.getAttribute("data-cy-meta") !== meta) {
            bubble.setAttribute("data-cy-meta", meta);
          }
          if (isFirst) {
            if (bubble.getAttribute("data-cy-first") !== "true") bubble.setAttribute("data-cy-first", "true");
          } else if (bubble.hasAttribute("data-cy-first")) {
            bubble.removeAttribute("data-cy-first");
          }
        }
      });
    });
  }

  // Cyber style helpers that need to find elements by content (no stable class names for them):
  //  - data-cy-title on the chat name inside each chat header (works for group and 1-on-1 headers)
  //  - data-cy-badge on unread-count bubbles in the sidebar chat list
  // Only attributes are touched, never DOM nodes.
  function syncCyberTags() {
    if (!currentSettings.cyberMode) {
      document.querySelectorAll("[data-cy-title]").forEach((el) => el.removeAttribute("data-cy-title"));
      document.querySelectorAll("[data-cy-badge]").forEach((el) => el.removeAttribute("data-cy-badge"));
      return;
    }

    // 1. Chat header titles: first non-empty text node in each <header>
    document.querySelectorAll("[data-chatbox] header").forEach((header) => {
      const walker = document.createTreeWalker(header, NodeFilter.SHOW_TEXT);
      let node;
      let titleEl = null;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && node.nodeValue.trim()) {
          titleEl = node.parentElement;
          break;
        }
      }
      header.querySelectorAll("[data-cy-title]").forEach((el) => {
        if (el !== titleEl) el.removeAttribute("data-cy-title");
      });
      if (titleEl && titleEl !== header && titleEl.getAttribute("data-cy-title") !== "true") {
        titleEl.setAttribute("data-cy-title", "true");
      }
    });

    // 2. Unread badges: leaf element with only digits (e.g. "2", "9+") and a painted background
    const found = new Set();
    document.querySelectorAll('aside[data-component="sidebar"] article.group\\/row *').forEach((el) => {
      if (el.children.length) return;
      const text = el.textContent ? el.textContent.trim() : "";
      if (!/^\d{1,3}\+?$/.test(text)) return;
      const bg = getComputedStyle(el).backgroundColor;
      if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") return;
      found.add(el);
      if (el.getAttribute("data-cy-badge") !== "true") el.setAttribute("data-cy-badge", "true");
    });
    document.querySelectorAll("[data-cy-badge]").forEach((el) => {
      if (!found.has(el)) el.removeAttribute("data-cy-badge");
    });
  }

  // Top-level HUD overlay (corner brackets, title tab, status clock, scan sweep).
  // Lives on <html>, outside React's tree, and never intercepts pointer events.
  function syncCyberOverlay() {
    const wantHud = Boolean(currentSettings.cyberMode) && window.top === window;
    const existing = document.getElementById(CYBER_HUD_ID);

    if (!wantHud) {
      if (existing) existing.remove();
      if (window.__convoseCyberClock) {
        clearInterval(window.__convoseCyberClock);
        window.__convoseCyberClock = null;
      }
      return;
    }

    if (existing || !document.documentElement || !document.body) return;

    const hud = document.createElement("div");
    hud.id = CYBER_HUD_ID;
    hud.setAttribute("aria-hidden", "true");
    hud.innerHTML =
      '<div class="cy-sweep"></div>' +
      '<i class="cy-c cy-tl"></i><i class="cy-c cy-tr"></i><i class="cy-c cy-bl"></i><i class="cy-c cy-br"></i>' +
      '<div class="cy-top"><span class="cy-dot"></span><span>Convose // Uplink</span><span class="cy-clock">--:--:--</span></div>';
    document.documentElement.appendChild(hud);

    const clockEl = hud.querySelector(".cy-clock");
    const textNode = clockEl && clockEl.firstChild;
    const tick = () => {
      if (!textNode) return;
      const d = new Date();
      const p = (n) => String(n).padStart(2, "0");
      // nodeValue (characterData) so the MutationObserver on childList is not triggered every second
      textNode.nodeValue = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    tick();
    if (window.__convoseCyberClock) clearInterval(window.__convoseCyberClock);
    window.__convoseCyberClock = setInterval(tick, 1000);
  }

  function applyStylesToDOM() {
    const root = document.documentElement;
    if (!root) return;

    const fontKey = (currentSettings.cyberMode && currentSettings.fontFamily === "default")
      ? "cyber"
      : (currentSettings.ircMode && currentSettings.fontFamily === "default" ? "jetbrains-mono" : currentSettings.fontFamily);
    ensureGoogleFont(fontKey);
    syncIrcMetadata();
    syncCyberTags();
    syncCyberOverlay();
    const css = buildStylesheet(currentSettings);

    // 1. Set inline CSS custom properties directly on <html>
    const vars = getRootVariables(currentSettings);
    for (const [k, v] of Object.entries(vars)) {
      root.style.setProperty(k, v, "important");
    }

    // 2. Apply via Constructable Stylesheets (cannot be wiped by React hydration)
    try {
      if ("adoptedStyleSheets" in document) {
        if (!window.__convoseAdoptedSheet) {
          window.__convoseAdoptedSheet = new CSSStyleSheet();
        }
        // Skip identical rewrites so running CSS animations are not restarted on every DOM mutation
        if (window.__convoseLastCss !== css) {
          window.__convoseAdoptedSheet.replaceSync(css);
          window.__convoseLastCss = css;
        }
        if (!document.adoptedStyleSheets.includes(window.__convoseAdoptedSheet)) {
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, window.__convoseAdoptedSheet];
        }
      }
    } catch (_) {
      // Fallback to <style> element below
    }

    // 3. Also maintain <style id="convose-customizer-styles"> at the end of <head> or <html>
    const targetParent = document.head || root;
    let styleEl = document.getElementById(CUSTOMIZER_STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = CUSTOMIZER_STYLE_ID;
      targetParent.appendChild(styleEl);
    } else if (styleEl.parentElement !== targetParent || targetParent.lastElementChild !== styleEl) {
      targetParent.appendChild(styleEl);
    }

    if (styleEl.textContent !== css) {
      styleEl.textContent = css;
    }
  }

  function updateSettings(settings) {
    currentSettings = { ...defaultSettings, ...settings };
    applyStylesToDOM();
  }

  window.__applyConvoseCustomizer = updateSettings;

  // Load saved settings immediately
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(defaultSettings, (settings) => {
      updateSettings(settings);
    });
  } else {
    applyStylesToDOM();
  }

  // Always register message and storage listeners safely
  if (!window.__convoseCustomizerInitialized) {
    window.__convoseCustomizerInitialized = true;

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(() => {
        chrome.storage.local.get(defaultSettings, (settings) => {
          updateSettings(settings);
        });
      });
    }

    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
        if (msg && (msg.type === "APPLY_CONVOSE_STYLES" || msg.type === "CONVOSE_APPLY_SETTINGS")) {
          if (window.__applyConvoseCustomizer) {
            window.__applyConvoseCustomizer(msg.settings);
          } else {
            updateSettings(msg.settings);
          }
          sendResponse({ ok: true });
        }
      });
    }

    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        applyStylesToDOM();
      });
    });

    const startObserver = () => {
      if (document.documentElement) {
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
    };

    startObserver();
    window.addEventListener("DOMContentLoaded", () => {
      startObserver();
      applyStylesToDOM();
    });
    window.addEventListener("load", applyStylesToDOM);
  }
})();
