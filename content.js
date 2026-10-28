(() => {
  const defaultSettings = {
    themePreset: "midnight-orange",
    hideGrid: false,
    fullScreenChat: false,
    hideSmartPrompts: false,
    ircMode: false,
    cyberMode: false,
    skeuoMode: false,
    arcadeMode: false,
    brutalMode: false,
    spookyMode: false,
    spookyBlood: false,
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
    "cyber": "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap",
    "skeuo": "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
    "brutal": "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap",
    "arcade": "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@600;700;800&display=swap",
    "spooky": "https://fonts.googleapis.com/css2?family=Creepster&family=Nunito:wght@600;700;800&display=swap"
  };

  const CYBER_HUD_ID = "convose-cyber-hud";
  const SKEUO_DEFS_ID = "convose-skeuo-defs";
  const SKEUO_FX_ID = "convose-skeuo-fx";
  const SPOOKY_FX_ID = "convose-spooky-fx";

  // Only one chat style can be active. Priority: skeuo > cyber > irc.
  function activeMode(s) {
    if (s.skeuoMode) return "skeuo";
    if (s.arcadeMode) return "arcade";
    if (s.brutalMode) return "brutal";
    if (s.spookyMode) return "spooky";
    if (s.cyberMode) return "cyber";
    if (s.ircMode) return "irc";
    return "";
  }

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
    const interestHover = `color-mix(in srgb, ${settings.bubbleColor} 70%, ${settings.accentColor})`;
    const interestSelected = `color-mix(in srgb, ${settings.bubbleColor} 55%, ${settings.accentColor})`;

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
      "--color-text-color": settings.textColor,

      "--bg-interest-header-hover": interestHover,
      "--selected-interest-bg": interestSelected,
      "--interest-selected": interestSelected,
      "--interest-icon-light-bg": settings.cardColor,
      "--knowledge-level-color": settings.accentColor,
      "--modal-knowledge-level-border-color": settings.accentColor,
      "--color-bg-interest-header": settings.bubbleColor,
      "--color-bg-interest-header-hover": interestHover,
      "--color-selected-interest-bg": interestSelected,
      "--color-interest-selected": interestSelected,
      "--color-interest-icon-light-bg": settings.cardColor,
      "--color-knowledge-level-bg": settings.bubbleColor,
      "--color-knowledge-level-color": settings.accentColor,
      "--color-modal-knowledge-level-bg": settings.bubbleColor,
      "--color-modal-knowledge-level-border-color": settings.accentColor
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
      background-color: ${settings.cardColor} !important;
    }

    /* Flatten gradient layers on the big surfaces, but never wipe a picture (banner, avatar, cover) */
    .bg-card-bg:not([style*="url("]):not([class*="url("]):not(.bg-cover):not(.bg-contain),
    .bg-chat-message-list-bg,
    .bg-group-card-chat-screen-bg,
    .bg-user-card-chat-open-bg,
    [data-component="my-account"],
    [data-component="paid-plans-page"],
    [data-component="group-card-header"],
    [data-chatbox],
    [data-suggestion-card] {
      background-image: none;
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

    /* Interest chips (profile modal + sidebar): no black or white pills, level dots follow the accent */
    .bg-bg-interest-header,
    .bg-selected-interest-bg,
    .bg-interest-selected,
    .bg-interest-icon-light-bg {
      border-color: ${subtleBorder} !important;
    }

    .bg-bg-interest-header {
      background-color: ${settings.bubbleColor} !important;
    }

    .bg-bg-interest-header:hover,
    .hover\\:bg-bg-interest-header-hover:hover,
    .bg-bg-interest-header-hover {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 70%, ${settings.accentColor}) !important;
    }

    .bg-selected-interest-bg,
    .bg-interest-selected {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 55%, ${settings.accentColor}) !important;
    }

    .bg-interest-icon-light-bg {
      background-color: ${settings.cardColor} !important;
    }

    [data-component="my-interests"] [data-interest-chip],
    [data-component="my-interests"] [data-interest-chip]:hover {
      color: ${settings.textColor} !important;
    }

    [data-component="my-interests"] [data-interest-chip]:hover {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 70%, ${settings.accentColor}) !important;
    }

    [data-component="my-interests"] [data-interest-chip] [class*="knowledge-level"] {
      border-color: ${settings.accentColor} !important;
    }

    .border-knowledge-level-color,
    .border-modal-knowledge-level-border-color {
      border-color: ${settings.accentColor} !important;
    }

    .bg-modal-knowledge-level-bg,
    .bg-knowledge-level-bg {
      background-color: color-mix(in srgb, ${settings.bubbleColor} 88%, ${settings.cardColor}) !important;
    }
    .bg-social-link-item-bg {
      background-color: ${settings.cardColor} !important;
      border-color: ${subtleBorder} !important;
    }

    [data-component="my-banner"]:not([style*="background-image"]):not([style*="url("]):not([class*="url("]):not([class*="bg-["]):not(.bg-cover):not(:has(img)),
    [data-component="profile-banner"]:not([style*="background-image"]):not([style*="url("]):not([class*="url("]):not([class*="bg-["]):not(.bg-cover):not(:has(img)),
    [data-component="group-banner"]:not([style*="background-image"]):not([style*="url("]):not([class*="url("]):not([class*="bg-["]):not(.bg-cover):not(:has(img)) {
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

    ${activeMode(settings) === "irc" ? `
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

    ${activeMode(settings) === "cyber" ? buildCyberCss(settings, fontStack) : ""}

    ${activeMode(settings) === "skeuo" ? buildSkeuoCss(settings, fontStack) : ""}

    ${activeMode(settings) === "arcade" ? buildArcadeCss(settings, fontStack) : ""}

    ${activeMode(settings) === "brutal" ? buildBrutalCss(settings, fontStack) : ""}

    ${activeMode(settings) === "spooky" ? buildSpookyCss(settings, fontStack) : ""}
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
    const callPanel = `color-mix(in srgb, ${CARD} 90%, ${A})`;
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

      /* ---- Continuation rows (partner): bubble stays flush left, hover time moves to its right ----
         Convose reserves a 33px left gutter (avatar column) and shows the hover time inside it.
         Avatars are hidden here, so drop the gutter and put the time after the bubble. */
      [data-msg-row]:not([data-irc-mine="true"]) .pl-\\[33px\\] {
        padding-left: 0 !important;
      }

      [data-msg-row]:not([data-irc-mine="true"]) span.invisible.absolute.right-full {
        position: static !important;
        inset: auto !important;
        order: 1 !important;
        flex: 0 0 auto !important;
        align-self: center !important;
        margin: 0 8px 0 10px !important;
        white-space: nowrap !important;
        font-family: ${mono} !important;
        font-size: 10px !important;
        letter-spacing: 0.1em !important;
        color: ${mix(T, 50)} !important;
      }

      [data-msg-row]:not([data-irc-mine="true"]) [data-msg-actions] {
        order: 2 !important;
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

      [data-msg-bubble="true"] {
        --msg-reply-text-color: ${T} !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] {
        --msg-reply-text-color: ${T} !important;
      }

      [data-msg-bubble="true"] [data-msg-transcript],
      [data-msg-bubble="true"] [data-msg-transcript] *,
      [data-msg-bubble="true"] .text-msg-reply-text-color,
      [data-msg-bubble="true"] .text-msg-reply-text-color * {
        color: ${T} !important;
        text-shadow: none !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] [data-msg-transcript],
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] [data-msg-transcript] *,
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] .text-msg-reply-text-color,
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] .text-msg-reply-text-color * {
        color: ${T} !important;
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

      aside[data-component="sidebar"] :is(p, span, button, a, input, div) {
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

      /* ---- Call section: replace Convose's grey panel, green banner and pill buttons ---- */
      :root,
      :host,
      html,
      html[data-theme="dark"],
      html[data-theme="light"] {
        --call-screen-inchat-bg: ${callPanel} !important;
        --color-call-screen-inchat-bg: ${callPanel} !important;
        --full-screen-call-bg: ${BG} !important;
        --full-screen-call-header-bg: ${CARD} !important;
        --call-screen-overlay-bg: ${BG} !important;
        --mask-overlay-call-screen-bg: ${mix(BG, 88)} !important;
        --btn-call-group-hover-bg: ${mix(A, 14)} !important;
        --btn-start-quick-group-call-bg: ${mix(A, 14)} !important;
        --inchat-call-shadow: 0 0 0 1px ${dimA} !important;
        --inchat-call-one-to-one-shadow: 0 0 0 1px ${dimA} !important;
      }

      .bg-call-screen-inchat-bg,
      .dark\\:bg-call-screen-inchat-bg {
        background: linear-gradient(0deg, ${faintA}, transparent 70%), ${callPanel} !important;
        border-radius: 0 !important;
        box-shadow: 0 0 0 1px ${dimA}, inset 0 1px 0 ${mix(A, 45)} !important;
      }

      .bg-call-screen-inchat-bg *,
      .dark\\:bg-call-screen-inchat-bg * {
        font-family: ${mono} !important;
        letter-spacing: 0.06em;
      }

      /* Green status banner ("Connecting ...", join / in-call strips): outlined secondary colour */
      .bg-\\[\\#599C66\\]:not(.rounded-full):not([class*="size-"]),
      [class*="bg-[#599c66" i]:not(.rounded-full):not([class*="size-"]) {
        background: linear-gradient(${mix(S, 14)}, ${mix(S, 14)}), ${CARD} !important;
        border: 1px solid ${lineS} !important;
        border-radius: 0 !important;
        color: ${S} !important;
        font-family: ${mono} !important;
        text-transform: uppercase !important;
        letter-spacing: 0.14em !important;
        ${fx ? `box-shadow: inset 0 0 18px -8px ${mix(S, 60)} !important;` : ""}
      }

      .bg-\\[\\#599C66\\]:not(.rounded-full):not([class*="size-"]) * {
        color: ${S} !important;
        font-family: ${mono} !important;
      }

      .text-\\[\\#599c66\\] { color: ${S} !important; }
      .border-\\[\\#599C66\\] { border-color: ${S} !important; }

      /* Round pill control buttons (screen share, camera, fullscreen, next ...): angled outline */
      [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]) {
        border-radius: 0 !important;
        border-color: ${lineA} !important;
        background-color: ${mix(A, 8)} !important;
        color: ${A} !important;
      }

      [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]):hover {
        background-color: ${mix(A, 18)} !important;
        border-color: ${A} !important;
      }

      /* Red mute / hang-up buttons: keep red, angled outline */
      [data-chatbox] button[class*="bg-[#C54445" i],
      [data-chatbox] button[class*="bg-[#e5484d" i] {
        border-radius: 0 !important;
        background-color: color-mix(in srgb, #ff3b5c 20%, ${CARD}) !important;
        border: 1px solid #ff3b5c !important;
        color: #ff3b5c !important;
      }

      [data-chatbox] button[class*="bg-[#C54445" i] svg *,
      [data-chatbox] button[class*="bg-[#e5484d" i] svg * {
        fill: #ff3b5c !important;
        stroke: #ff3b5c !important;
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

  /* =============================================================
     SKEUOMORPHIC STYLE: wood, denim, leather, paper, glossy buttons
     Palette mapping:
       bgColor = wood tint, sidebarColor = denim, cardColor = paper,
       bubbleColor = partner bubble paper, accentColor = glossy highlight,
       secondaryColor = own bubble, textColor = ink on paper
     ============================================================= */

  // Darken a #rrggbb colour by pct percent (used to estimate the colour under text).
  function darkenHex(hex, pct) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!m) return "#222222";
    const n = parseInt(m[1], 16);
    const f = 1 - pct / 100;
    const ch = (v) => Math.round(v * f).toString(16).padStart(2, "0");
    return "#" + ch((n >> 16) & 255) + ch((n >> 8) & 255) + ch(n & 255);
  }

  function buildSkeuoCss(settings, fontStack) {
    const BG = settings.bgColor;
    const SIDE = settings.sidebarColor;
    const PAPER = settings.cardColor;
    const PB = settings.bubbleColor;
    const A = settings.accentColor;
    const S = settings.secondaryColor || "#5cb85c";
    const INK = settings.textColor;
    const fx = settings.cyberFx !== false;

    // Sidebar text follows the brightness of the denim under the pressed-in slots
    const slotBg = darkenHex(SIDE, 24);
    const sideLight = inkOn(slotBg) === "#ffffff";
    const cream = "#f4ead2";
    const sideCream = sideLight ? "#f4ead2" : "#1d1a14";
    const sideBright = sideLight ? "#fff6dc" : "#111111";
    const sideShadow = sideLight ? "rgba(0, 0, 0, 0.65)" : "rgba(255, 255, 255, 0.55)";
    const hoverInk = inkOn(A);
    const tone = (c, w) => `color-mix(in srgb, ${c}, white ${w}%)`;
    const shade = (c, b) => `color-mix(in srgb, ${c}, black ${b}%)`;
    const rgba = (c, pct) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
    // Glossy "split highlight" gradient (the classic top-half shine)
    const gloss = (c) => `linear-gradient(180deg, ${tone(c, 42)} 0%, ${tone(c, 12)} 49%, ${shade(c, 4)} 50%, ${shade(c, 18)} 100%)`;
    const metal = "linear-gradient(180deg, #f7f8f9 0%, #dcdfe2 48%, #b9bdc2 50%, #cfd2d6 100%)";
    const font = fontStack || `"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`;

    const gridSlot = `[data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]`;
    const callDark = shade(SIDE, 55);

    return `
      /* =========================================================
         SKEUOMORPHIC STYLE: wood desk, denim rail, leather header, paper chat
         ========================================================= */

      :root,
      :host,
      html,
      html[data-theme="dark"],
      html[data-theme="light"] {
        --call-screen-inchat-bg: ${callDark} !important;
        --color-call-screen-inchat-bg: ${callDark} !important;
        --full-screen-call-bg: ${shade(BG, 35)} !important;
        --full-screen-call-header-bg: ${shade(SIDE, 40)} !important;
        --call-screen-overlay-bg: ${shade(BG, 35)} !important;
        --mask-overlay-call-screen-bg: ${rgba(shade(BG, 50), 85)} !important;
        --btn-call-group-hover-bg: ${rgba("#ffffff", 14)} !important;
        --inchat-call-shadow: 0 3px 8px rgba(0, 0, 0, 0.55) !important;
        --inchat-call-one-to-one-shadow: 0 3px 8px rgba(0, 0, 0, 0.55) !important;
        --card-header-in-call-bg: ${callDark} !important;
      }

      /* ---- Desk: dark wood with plank seams ---- */
      html {
        background-color: ${BG} !important;
      }

      body,
      [data-component="suggestions-grid"] {
        background-color: ${BG} !important;
        background-image:
          radial-gradient(ellipse at 50% 25%, rgba(255, 255, 255, 0.10), transparent 62%),
          repeating-linear-gradient(90deg, ${shade(BG, 30)} 0 2px, ${tone(BG, 8)} 2px 3px, transparent 3px 190px) !important;
      }

      [data-component="suggestions-grid"]:not(.fixed):not(.absolute) {
        position: relative !important;
      }

      /* Keep the chat canvas above the desk seams (they are the last child of the grid) */
      [data-component="suggestions-grid"] > div:not(.fixed) {
        position: relative;
        z-index: 1;
      }

      [data-component="suggestions-grid"]::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-color: ${BG};
        ${fx ? `background-image:
          repeating-linear-gradient(90deg, transparent 0 53px, ${shade(BG, 22)} 53px 55px, transparent 55px 131px),
          linear-gradient(180deg, ${tone(BG, 6)}, transparent 40%, ${shade(BG, 12)});` : ""}
      }

      [data-component="suggestions-grid"]::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          repeating-linear-gradient(90deg, transparent 0 238px, rgba(0, 0, 0, 0.5) 238px 240px, rgba(255, 255, 255, 0.07) 240px 241px),
          radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(0, 0, 0, 0.5) 100%);
      }

      /* ---- Chat cards: paper in a stitched frame, floating above the desk ---- */
      ${gridSlot} {
        border-radius: 10px !important;
        border-color: transparent !important;
        background: ${PAPER} !important;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 4px 0 rgba(0, 0, 0, 0.35) !important;
      }

      ${gridSlot}.bg-modal-input-border-focus-color {
        background: ${PAPER} !important;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.7), 0 0 0 3px ${rgba(A, 85)}, 0 4px 0 rgba(0, 0, 0, 0.35) !important;
      }

      [data-chatbox],
      [data-chatbox] > div,
      [data-chatbox] > div > div {
        border-radius: 10px !important;
      }

      [data-chatbox] {
        font-family: ${font};
      }

      /* ---- Header: black leather strip with stitching ---- */
      [data-chatbox] [data-component="group-card-header"],
      [data-chatbox] header {
        position: relative !important;
        isolation: isolate;
        border-radius: 9px 9px 0 0 !important;
        border-bottom: none !important;
        background: #232120 !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -3px 4px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.45) !important;
      }

      [data-chatbox] [data-component="group-card-header"]::before,
      [data-chatbox] header::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        border-radius: inherit;
        pointer-events: none;
        background-color: #232120;
        
      }

      [data-chatbox] header::after {
        content: "";
        position: absolute;
        left: 9px;
        right: 9px;
        bottom: 4px;
        z-index: 1;
        pointer-events: none;
        border-bottom: 1.5px dashed rgba(240, 226, 190, 0.55);
      }

      [data-chatbox] header > * {
        z-index: 2;
      }

      [data-chatbox] [data-component="group-card-header"] p,
      [data-chatbox] header [data-cy-title] {
        display: inline-block !important;
        max-width: 100% !important;
        min-width: 0 !important;
        vertical-align: middle !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        letter-spacing: 0 !important;
        text-transform: none !important;
        color: ${cream} !important;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.9) !important;
      }

      [data-chatbox] header :has(> [data-cy-title]),
      [data-chatbox] header :has(> p) {
        min-width: 0 !important;
      }

      [data-chatbox] header button,
      [data-chatbox] header svg {
        color: ${cream} !important;
      }

      [data-chatbox] header svg {
        filter: none;
      }

      [data-chatbox] header img {
        border-radius: 50% !important;
        box-shadow: 0 0 0 2px #e9ddc0, 0 1px 3px #000 !important;
      }

      /* ---- Message list: warm paper with fine weave and top light ---- */
      [data-chatbox] .bg-chat-message-list-bg,
      [data-chatbox] .bg-group-card-chat-screen-bg {
        background:
          radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.38), transparent 65%),
          ${PAPER} !important;
        box-shadow: inset 0 3px 0 -1px rgba(0, 0, 0, 0.18);
      }

      /* Text that Convose draws in white must stay readable on paper */
      [data-chatbox] .bg-chat-message-list-bg .text-white,
      [data-chatbox] .bg-chat-message-list-bg .dark\\:text-white,
      [data-chatbox] .bg-group-card-chat-screen-bg .text-white,
      [data-chatbox] .bg-group-card-chat-screen-bg .dark\\:text-white {
        color: ${INK} !important;
      }

      /* ---- Rows: avatars hidden, tag line moves into the bubble ---- */
      [data-msg-row] > div.mt-\\[4px\\].h-\\[16px\\],
      [data-msg-row] img.size-\\[30px\\],
      [data-msg-row] > div > div.flex.items-baseline.gap-\\[6px\\],
      [data-msg-row] > div > p.block.w-fit.text-left.text-\\[11px\\].font-bold {
        display: none !important;
      }

      [data-msg-row] {
        margin-top: 3px !important;
      }

      [data-msg-row]:not([data-irc-mine="true"]) .pl-\\[33px\\] {
        padding-left: 0 !important;
      }

      [data-msg-row]:not([data-irc-mine="true"]) span.invisible.absolute.right-full {
        position: static !important;
        inset: auto !important;
        order: 1 !important;
        flex: 0 0 auto !important;
        align-self: center !important;
        margin: 0 8px 0 10px !important;
        white-space: nowrap !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        color: ${rgba(INK, 55)} !important;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
      }

      [data-msg-row]:not([data-irc-mine="true"]) [data-msg-actions] {
        order: 2 !important;
      }

      /* ---- Bubbles: paper (others) and glossy colour (you) ---- */
      [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        position: relative !important;
        display: block !important;
        border-radius: 16px !important;
        outline: none !important;
        font-family: ${font} !important;
        border: 1px solid ${shade(PB, 34)} !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.32) !important;
      }

      [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]) {
        background-image: linear-gradient(180deg, ${tone(PB, 55)} 0%, ${PB} 55%, ${shade(PB, 7)} 100%) !important;
        max-width: min(100%, 560px) !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border-color: ${shade(S, 42)} !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.42) !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]) {
        background-image: ${gloss(S)} !important;
      }

      [data-msg-row]:hover [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        opacity: 0.96 !important;
      }

      /* Tag line inside the first bubble of a speaker block */
      [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before {
        content: attr(data-cy-nick) "   " attr(data-cy-time);
        display: block;
        padding: 6px 13px 0 13px;
        font-size: 10px;
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        color: ${rgba(INK, 58)};
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"])::before {
        color: rgba(255, 255, 255, 0.82);
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.35);
      }

      [data-msg-row] [data-msg-bubble="true"] > div.block {
        padding: 6px 13px 7px 13px !important;
        font-family: ${font} !important;
        font-size: 14.5px !important;
        font-weight: 500 !important;
        line-height: 1.25 !important;
        letter-spacing: 0 !important;
        color: ${INK} !important;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.55);
      }

      [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"] > div.block {
        padding-top: 3px !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block,
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block span {
        color: #ffffff !important;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
      }

      [data-msg-row] [data-msg-bubble="true"] .Linkify,
      [data-msg-row] [data-msg-bubble="true"] span {
        font-family: ${font} !important;
      }

      [data-msg-row] [data-msg-bubble="true"] a {
        color: ${shade(A, 10)} !important;
        text-decoration: underline !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] a {
        color: #ffffff !important;
      }

      [data-msg-row] [data-msg-bubble="true"] > span.absolute {
        color: ${rgba(INK, 50)} !important;
      }

      [data-msg-bubble="true"] > div.flex.max-w-full.flex-col.overflow-hidden {
        border-radius: 10px !important;
        margin: 2px 6px 6px !important;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.35) !important;
      }

      /* ---- Voice notes ---- */
      [data-msg-bubble="true"][data-message-type="audio"] [data-msg-fill],
      [data-msg-bubble="true"][data-message-type="audio"] [data-msg-transcript] {
        border-radius: 0 !important;
        background-image: none !important;
        background-color: transparent !important;
      }

      [data-msg-bubble="true"][data-message-type="audio"] [data-msg-transcript] {
        border-top: 1px solid rgba(0, 0, 0, 0.14) !important;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset !important;
        color: ${INK} !important;
      }

      [data-msg-bubble="true"] {
        --msg-reply-text-color: ${INK} !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] {
        --msg-reply-text-color: #ffffff !important;
      }

      [data-msg-bubble="true"] [data-msg-transcript],
      [data-msg-bubble="true"] [data-msg-transcript] *,
      [data-msg-bubble="true"] .text-msg-reply-text-color,
      [data-msg-bubble="true"] .text-msg-reply-text-color * {
        color: ${INK} !important;
        text-shadow: none !important;
      }

      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] [data-msg-transcript],
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] [data-msg-transcript] *,
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] .text-msg-reply-text-color,
      [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] .text-msg-reply-text-color * {
        color: #ffffff !important;
      }

      .audio-seek {
        --audio-fill: ${A} !important;
        --audio-rest: rgba(0, 0, 0, 0.22) !important;
      }

      [data-msg-row][data-irc-mine="true"] .audio-seek {
        --audio-fill: #ffffff !important;
        --audio-rest: rgba(0, 0, 0, 0.28) !important;
      }

      /* ---- Replies and reactions ---- */
      [data-component="chat-message-reply"] > div.mt-\\[5px\\],
      [data-component="chat-message-reply"] > div.mt-\\[5px\\] * {
        font-size: 10.5px !important;
        font-weight: 700 !important;
        color: ${rgba(INK, 62)} !important;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
      }

      [data-component="chat-message-reply"] > div.bg-msg-bubble-reply-bg {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.05)) !important;
        border: 1px solid rgba(0, 0, 0, 0.2) !important;
        border-left: 4px solid ${A} !important;
        border-radius: 7px !important;
        box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.5) !important;
        color: ${INK} !important;
        font-size: 12px !important;
      }

      [data-msg-reactions],
      .bg-buble-reaction-bg {
        background: linear-gradient(180deg, #ffffff, ${shade(PB, 6)}) !important;
        border: 1px solid ${shade(PB, 36)} !important;
        border-radius: 12px !important;
        box-shadow: inset 0 1px 0 #ffffff, 0 1px 2px rgba(0, 0, 0, 0.3) !important;
        color: ${INK} !important;
      }

      .bg-buble-reacted-bg,
      [data-msg-reactions].bg-buble-reacted-bg {
        background: ${gloss(A)} !important;
        border-color: ${shade(A, 40)} !important;
        color: #ffffff !important;
      }

      /* ---- Input bar: tan toolbar with a recessed text field ---- */
      [data-component="chat-input"] {
        background: linear-gradient(180deg, ${tone(PAPER, 30)} 0%, ${shade(PAPER, 14)} 100%) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 -1px 0 rgba(0, 0, 0, 0.35) !important;
      }

      [data-component="chat-input"] .bg-input-text-msg-form {
        background: linear-gradient(180deg, ${shade(PB, 4)}, ${tone(PB, 60)}) !important;
        border: 1px solid ${shade(PAPER, 45)} !important;
        border-radius: 15px !important;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.8) !important;
      }

      [data-component="chat-input"] textarea,
      [data-component="chat-input"] input,
      [data-component="chat-input"] [contenteditable] {
        color: ${INK} !important;
        caret-color: ${A} !important;
        font-family: ${font} !important;
      }

      [data-component="chat-input"] ::placeholder {
        color: ${rgba(INK, 45)} !important;
        opacity: 1 !important;
      }

      [data-component="chat-input"] svg {
        color: ${shade(PAPER, 62)} !important;
        filter: none;
      }

      .group\\/smart > div > div {
        background: linear-gradient(180deg, #ffffff, ${shade(PB, 8)}) !important;
        border: 1px solid ${shade(PB, 36)} !important;
        border-radius: 13px !important;
        box-shadow: inset 0 1px 0 #ffffff, 0 1px 2px rgba(0, 0, 0, 0.3) !important;
        color: ${INK} !important;
      }

      /* ---- Glossy accent buttons (primary / call / mic) ---- */
      .bg-primary,
      .bg-start-quick-call-btn-bg,
      [data-component="group-call-banner"],
      [data-component="mic-button"].bg-\\[\\#5865f2\\],
      .bg-\\[\\#5865f2\\] {
        background-color: ${A} !important;
        background-image: ${gloss(A)} !important;
        border: 1px solid ${shade(A, 42)} !important;
        border-radius: 14px !important;
        color: #ffffff !important;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.45);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 3px rgba(0, 0, 0, 0.5) !important;
      }

      /* ---- Sidebar: denim fabric, stitched edge, debossed rows ---- */
      .group\\/sidebar,
      aside[data-component="sidebar"] {
        background-color: ${SIDE} !important;
        background-image:
          linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(0, 0, 0, 0.28)),
          repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 3px),
          repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.11) 0 1px, transparent 1px 3px) !important;
        border-right: 1px solid #000 !important;
        box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.12), 3px 0 0 rgba(0, 0, 0, 0.4) !important;
      }

      .group\\/sidebar::after {
        content: "";
        position: absolute;
        top: 6px;
        bottom: 6px;
        right: 6px;
        pointer-events: none;
        border-right: 2px dashed rgba(240, 226, 190, 0.34);
      }

      aside[data-component="sidebar"] {
        color: ${sideCream};
        text-shadow: 0 ${sideLight ? "-1px" : "1px"} 0 ${sideShadow};
      }

      aside[data-component="sidebar"] :is(p, span, button, a, input, div) {
        font-family: ${font} !important;
      }

      /* Bright, readable sidebar text (beats the base text colour rule) */
      html aside[data-component="sidebar"] article.group\\/row.group\\/row span,
      html aside[data-component="sidebar"] article.group\\/row.group\\/row div,
      html aside[data-component="sidebar"] article.group\\/row.group\\/row p,
      html aside[data-component="sidebar"] [data-interest-chip] span,
      html aside[data-component="sidebar"] [data-interest-chip] div,
      html aside[data-component="sidebar"]:not(#sk) [data-interest-chip],
      html aside[data-component="sidebar"]:not(#sk) > div.mb-\\[7px\\] > :is(button, a),
      html aside[data-component="sidebar"]:not(#sk) > div.mb-\\[7px\\] > :is(button, a) * {
        color: ${sideBright} !important;
      }

      html aside[data-component="sidebar"] article.group\\/row.group\\/row .text-\\[14px\\].font-bold {
        color: ${sideLight ? "#ffffff" : "#000000"} !important;
        font-weight: 700 !important;
      }

      aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p,
      aside[data-component="sidebar"] section > div.-mb-0\\.5 > span {
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important;
        font-size: 10.5px !important;
        font-weight: 700 !important;
        color: ${sideLight ? "rgba(240, 226, 190, 0.78)" : "rgba(17, 17, 17, 0.75)"} !important;
      }

      aside[data-component="sidebar"] article.group\\/row,
      aside[data-component="sidebar"] [data-interest-chip],
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a {
        border-radius: 9px !important;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.15)) !important;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(0, 0, 0, 0.28), 0 1px 0 rgba(255, 255, 255, 0.15) !important;
      }

      aside[data-component="sidebar"] article.group\\/row:hover,
      aside[data-component="sidebar"] [data-interest-chip]:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a:hover {
        background-image: ${gloss(A)} !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 3px rgba(0, 0, 0, 0.55) !important;
      }

      html aside[data-component="sidebar"]:not(#sk) article.group\\/row:hover *,
      html aside[data-component="sidebar"]:not(#sk) [data-interest-chip]:hover,
      html aside[data-component="sidebar"]:not(#sk) [data-interest-chip]:hover *,
      html aside[data-component="sidebar"]:not(#sk) > div.mb-\\[7px\\] > :is(button, a):hover,
      html aside[data-component="sidebar"]:not(#sk) > div.mb-\\[7px\\] > :is(button, a):hover * {
        color: ${hoverInk} !important;
        text-shadow: none !important;
      }

      /* Metal pill buttons (+ Add interests, Upgrade) */
      aside[data-component="sidebar"] [data-component="add-interest-input"],
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a) {
        background-color: #c5c8cc !important;
        background-image: ${metal} !important;
        border: 1px solid #5c6065 !important;
        border-radius: 18px !important;
        box-shadow: inset 0 1px 0 #ffffff, 0 2px 3px rgba(0, 0, 0, 0.55) !important;
      }

      aside[data-component="sidebar"] [data-component="add-interest-input"],
      aside[data-component="sidebar"] [data-component="add-interest-input"] *,
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a),
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a) * {
        color: #1d2024 !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.85) !important;
      }

      html aside[data-component="sidebar"] > div.absolute.bottom-2 {
        background-color: ${shade(SIDE, 35)} !important;
        border-top: 1px solid rgba(0, 0, 0, 0.7) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14) !important;
        border-radius: 0 !important;
      }

      /* ---- Unread badge: glossy red ---- */
      aside[data-component="sidebar"] [data-cy-badge] {
        background-color: #d93a3a !important;
        background-image: ${gloss("#e04848")} !important;
        border: 1px solid #8e1f1f !important;
        border-radius: 50% !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.6) !important;
      }

      /* ---- Call section: leather panel, glossy green banner, metal and red buttons ---- */
      .bg-call-screen-inchat-bg,
      .dark\\:bg-call-screen-inchat-bg {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.25)), ${callDark} !important;
        border-radius: 10px !important;
        box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.06) !important;
      }

      .bg-call-screen-inchat-bg *,
      .dark\\:bg-call-screen-inchat-bg * {
        font-family: ${font} !important;
        color: ${cream};
      }

      .bg-\\[\\#599C66\\]:not(.rounded-full):not([class*="size-"]),
      [class*="bg-[#599c66" i]:not(.rounded-full):not([class*="size-"]) {
        background-color: #4a9a52 !important;
        background-image: ${gloss("#5cb85c")} !important;
        border: 1px solid #2f6a35 !important;
        border-radius: 12px !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.45) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 3px rgba(0, 0, 0, 0.5) !important;
      }

      .bg-\\[\\#599C66\\]:not(.rounded-full):not([class*="size-"]) * {
        color: #ffffff !important;
      }

      .text-\\[\\#599c66\\] { color: ${shade(S, 20)} !important; }
      .border-\\[\\#599C66\\] { border-color: ${shade(S, 25)} !important; }

      [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]) {
        background-color: #c5c8cc !important;
        background-image: ${metal} !important;
        border: 1px solid #5c6065 !important;
        border-radius: 18px !important;
        color: #2a2d31 !important;
        box-shadow: inset 0 1px 0 #ffffff, 0 2px 3px rgba(0, 0, 0, 0.55) !important;
      }

      [data-chatbox] button[class*="bg-[#C54445" i],
      [data-chatbox] button[class*="bg-[#e5484d" i] {
        background-color: #c23a3a !important;
        background-image: ${gloss("#d9483f")} !important;
        border: 1px solid #7f1f1f !important;
        border-radius: 18px !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 2px 3px rgba(0, 0, 0, 0.55) !important;
      }

      /* ---- Scrollbars: dark leather thumb on an inset track ---- */
      html, [data-chatbox], aside[data-component="sidebar"] {
        scrollbar-width: thin;
        scrollbar-color: #5a5650 rgba(0, 0, 0, 0.22);
      }

      /* ---- Overlay: fine grain, vignette, hanging denim tab ---- */
      #${SKEUO_FX_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147482999;
        pointer-events: none;
      }

      #${SKEUO_FX_ID} .sk-noise {
        position: absolute;
        inset: 0;
        display: none;
      }

      #${SKEUO_FX_ID} .sk-vig {
        display: none;
      } .sk-vig {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 50% 45%, transparent 62%, rgba(0, 0, 0, 0.28) 100%);
      }

      #${SKEUO_FX_ID} .sk-tab {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 1px 22px 3px;
        border-radius: 0 0 10px 10px;
        background-color: ${SIDE};
        background-image:
          linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0.3));
        border: 1px solid #000;
        border-top: none;
        box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.15), 0 3px 6px rgba(0, 0, 0, 0.55);
        font-family: "Pacifico", "Brush Script MT", cursive;
        font-size: 12px;
        line-height: 16px;
        color: ${cream};
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.8);
      }

      #${SKEUO_FX_ID} .sk-tab::after {
        content: "";
        position: absolute;
        left: 6px;
        right: 6px;
        bottom: 2px;
        border-bottom: 1.5px dashed rgba(240, 226, 190, 0.45);
      }
    `;
  }

  function hexToRgb01(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    const h = m ? m[1] : "4a2c19";
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  }

  /* =============================================================
     ARCADE STYLE (settings.arcadeMode): bright 8-bit game look.
     Built on the skeuo layout rules (same hooks) with textures switched off,
     then flattened: thick black outlines, hard offset shadows, brick-block
     sidebar, sky desk, chunky yellow buttons, pixel-font labels.
     Palette: bgColor = sky, sidebarColor = brick, cardColor = cream panel,
     bubbleColor = other bubbles, accentColor = gold, secondaryColor = own bubbles,
     textColor = ink. No characters, logos or game art are used.
     ============================================================= */

  function buildArcadeCss(settings, fontStack) {
    const BG = settings.bgColor;
    const SIDE = settings.sidebarColor;
    const PAPER = settings.cardColor;
    const PB = settings.bubbleColor;
    const A = settings.accentColor;
    const S = settings.secondaryColor || "#e52521";
    const INK = settings.textColor;
    const K = "#1a1a1a";
    const px = `"Press Start 2P", "Courier New", monospace`;
    const body = fontStack || `"Nunito", "Segoe UI", Arial, sans-serif`;
    const shade = (c, b) => `color-mix(in srgb, ${c}, black ${b}%)`;
    const gridSlot = `[data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]`;
    const pill = `html [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]),
      aside[data-component="sidebar"] [data-component="add-interest-input"],
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a)`;

    const base = buildSkeuoCss({ ...settings, cyberFx: false }, body);

    return base + `
      /* ===== Arcade layer: flatten the skeuo look into chunky 8-bit panels ===== */

      html body,
      [data-component="suggestions-grid"] {
        background-image:
          repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.10) 0 14px, transparent 14px 28px) !important;
      }

      [data-component="suggestions-grid"]::before,
      [data-component="suggestions-grid"]::after { display: none !important; }

      ${gridSlot} {
        border-radius: 8px !important;
        box-shadow: 0 0 0 4px ${K}, 7px 7px 0 4px rgba(0, 0, 0, 0.35) !important;
      }

      ${gridSlot}.bg-modal-input-border-focus-color {
        box-shadow: 0 0 0 4px ${K}, 0 0 0 8px ${A}, 0 0 0 11px ${K}, 7px 7px 0 11px rgba(0, 0, 0, 0.35) !important;
      }

      /* Header: gold strip */
      html [data-chatbox] [data-component="group-card-header"],
      html [data-chatbox] header {
        background: ${A} !important;
        border-bottom: 4px solid ${K} !important;
        box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.16) !important;
        border-radius: 6px 6px 0 0 !important;
      }

      [data-chatbox] [data-component="group-card-header"]::before,
      [data-chatbox] header::before {
        background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.07) 0 8px, transparent 8px 16px) !important;
      }

      [data-chatbox] header::after { display: none !important; }

      html [data-chatbox] [data-component="group-card-header"] p,
      html [data-chatbox] header [data-cy-title] {
        font-family: ${px} !important;
        font-size: 10px !important;
        font-weight: 400 !important;
        line-height: 1.6 !important;
        letter-spacing: 0 !important;
        color: ${K} !important;
        text-shadow: none !important;
      }

      html [data-chatbox] header button,
      html [data-chatbox] header svg { color: ${K} !important; filter: none !important; }

      html [data-chatbox] header img {
        border-radius: 4px !important;
        box-shadow: 0 0 0 3px ${K} !important;
      }

      /* Message area: cream panel with a faint dot grid */
      [data-chatbox] .bg-chat-message-list-bg,
      [data-chatbox] .bg-group-card-chat-screen-bg {
        background:
          radial-gradient(rgba(0, 0, 0, 0.07) 1.5px, transparent 1.7px) 0 0 / 16px 16px,
          ${PAPER} !important;
        box-shadow: none !important;
      }

      /* Bubbles: flat colour, thick outline, hard shadow */
      html [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border: 3px solid ${K} !important;
        border-radius: 8px !important;
        box-shadow: 3px 3px 0 ${K} !important;
        background-image: none !important;
        background-color: ${PB} !important;
        filter: none !important;
      }

      html [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]),
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]) {
        background-image: none !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        background-color: ${S} !important;
        border-color: ${K} !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      html [data-msg-row] [data-msg-bubble="true"] > div.block {
        font-family: ${body} !important;
        font-weight: 700 !important;
        text-shadow: none !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block span {
        text-shadow: 1px 1px 0 ${K} !important;
      }

      html [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before {
        font-family: ${px};
        font-size: 7px;
        line-height: 1.4;
        padding-top: 8px;
        color: ${K};
        text-shadow: none;
        opacity: 0.75;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"])::before {
        color: #ffffff;
        text-shadow: 1px 1px 0 ${K};
        opacity: 1;
      }

      /* Sidebar: brick-block wall */
      html aside[data-component="sidebar"] {
        background-image:
          linear-gradient(0deg, rgba(0, 0, 0, 0.35) 2px, transparent 2px),
          conic-gradient(rgba(255, 255, 255, 0.08) 25%, transparent 0 50%, rgba(255, 255, 255, 0.08) 0 75%, transparent 0) !important;
        background-size: 100% 16px, 32px 32px !important;
        border-right: 4px solid ${K} !important;
      }

      html aside[data-component="sidebar"] {
        text-shadow: 1px 1px 0 ${K};
      }

      aside[data-component="sidebar"] article.group\\/row,
      aside[data-component="sidebar"] [data-interest-chip],
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a {
        background-image: none !important;
        background-color: ${shade(SIDE, 40)} !important;
        border: 3px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      aside[data-component="sidebar"] article.group\\/row:hover,
      aside[data-component="sidebar"] [data-interest-chip]:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a:hover {
        background-image: none !important;
        background-color: ${A} !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      html aside[data-component="sidebar"] article.group\\/row.group\\/row:hover :is(span, div, p),
      html aside[data-component="sidebar"] [data-interest-chip]:hover :is(span, div),
      html aside[data-component="sidebar"] > div.mb-\\[7px\\] > :is(button, a):hover,
      html aside[data-component="sidebar"] > div.mb-\\[7px\\] > :is(button, a):hover * {
        color: ${K} !important;
        text-shadow: none !important;
      }

      aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p,
      aside[data-component="sidebar"] section > div.-mb-0\\.5 > span {
        font-family: ${px} !important;
        font-size: 9px !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
        color: ${A} !important;
      }

      html aside[data-component="sidebar"] > div.absolute.bottom-2 {
        background-color: ${shade(SIDE, 55)} !important;
        border-top: 4px solid ${K} !important;
        box-shadow: none !important;
      }

      /* Chunky buttons */
      ${pill} {
        background-color: ${A} !important;
        background-image: none !important;
        border: 3px solid ${K} !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 0 ${K} !important;
        color: ${K} !important;
        text-shadow: none !important;
      }

      html aside[data-component="sidebar"] [data-component="add-interest-input"] *,
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a),
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a) * {
        color: ${K} !important;
        text-shadow: none !important;
        font-weight: 800 !important;
      }

      aside[data-component="sidebar"] [data-cy-badge] {
        background-image: none !important;
        background-color: ${S} !important;
        border: 2px solid ${K} !important;
        border-radius: 4px !important;
        box-shadow: 2px 2px 0 ${K} !important;
      }

      /* Call section */
      .bg-call-screen-inchat-bg,
      .dark\\:bg-call-screen-inchat-bg {
        background: ${shade(SIDE, 45)} !important;
        border: 3px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      .bg-\\[\\#599C66\\]:not(.rounded-full):not([class*="size-"]),
      [class*="bg-[#599c66" i]:not(.rounded-full):not([class*="size-"]) {
        background-image: none !important;
        background-color: #43b047 !important;
        border: 3px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 3px 3px 0 ${K} !important;
        text-shadow: 1px 1px 0 ${K} !important;
      }

      [class*="bg-[#c54445" i],
      .bg-\\[\\#C54445\\] {
        background-image: none !important;
        background-color: ${S} !important;
        border: 3px solid ${K} !important;
        box-shadow: 0 3px 0 ${K} !important;
      }

      html [data-chatbox] button[class*="bg-[#C54445" i],
      html [data-chatbox] button[class*="bg-[#e5484d" i] {
        background-image: none !important;
        background-color: ${S} !important;
        border: 3px solid ${K} !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 0 ${K} !important;
        color: #ffffff !important;
      }

      html [data-msg-row] [data-msg-bubble="true"] a { color: #1b4fd8 !important; }
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] a { color: #ffffff !important; }

      /* Scrollbars */
      html, [data-chatbox], aside[data-component="sidebar"] {
        scrollbar-width: thin;
        scrollbar-color: ${A} rgba(0, 0, 0, 0.25);
      }
    `;
  }


  /* =============================================================
     NEO-BRUTALIST STYLE (settings.brutalMode): flat cream page, thick black
     outlines, hard offset shadows, bold condensed headings, bright flat colours
     (yellow, pink, teal). Built on the arcade layer, then re-coloured for
     light panels with dark text. No textures, no overlay nodes, no filters.
     Palette: bgColor = page, sidebarColor = sidebar, cardColor = chat panel,
     bubbleColor = other bubbles, accentColor = headers/buttons,
     secondaryColor = own bubbles and hover, textColor = ink.
     ============================================================= */

  /* =============================================================
     SPOOKY STYLE (settings.spookyMode): Halloween.
     Built on the skeuo layout hooks (no textures), then flattened and re-coloured:
     dark purple night, pumpkin-orange outlines, Creepster headings.
     Pumpkins, bats, cobwebs, a spider, a ghost and a moon are inline SVG in a
     fixed overlay (#convose-spooky-fx, top frame only, pointer-events none), so no
     image URLs are needed (CSP safe) and React's tree is never touched.
     Palette: bgColor = night, sidebarColor = crypt, cardColor = chat panel,
     bubbleColor = other bubbles, accentColor = pumpkin, secondaryColor = own bubbles.
     ============================================================= */

  function spookyPumpkin(face) {
    const eyes = face
      ? '<path d="M28 47 L40 47 L34 34 Z" fill="#ffd44a"/><path d="M60 47 L72 47 L66 34 Z" fill="#ffd44a"/>' +
        '<path d="M46 56 L54 56 L50 48 Z" fill="#ffd44a"/>' +
        '<path d="M24 62 Q50 90 76 62 L68 62 L63 70 L56 63 L50 72 L44 63 L37 70 L32 62 Z" fill="#ffd44a"/>'
      : '';
    return '<svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="50" cy="86" rx="38" ry="4" fill="#000" opacity=".35"/>' +
      '<ellipse cx="27" cy="55" rx="25" ry="31" fill="#d9560a" stroke="#6e2a03" stroke-width="2.5"/>' +
      '<ellipse cx="73" cy="55" rx="25" ry="31" fill="#d9560a" stroke="#6e2a03" stroke-width="2.5"/>' +
      '<ellipse cx="38" cy="55" rx="24" ry="33" fill="#f06c14" stroke="#6e2a03" stroke-width="2.5"/>' +
      '<ellipse cx="62" cy="55" rx="24" ry="33" fill="#f06c14" stroke="#6e2a03" stroke-width="2.5"/>' +
      '<ellipse cx="50" cy="55" rx="18" ry="34" fill="#ff8a24" stroke="#6e2a03" stroke-width="2.5"/>' +
      '<path d="M45 22 Q46 9 56 5 L62 10 Q55 14 55 23 Z" fill="#4d7a1c" stroke="#27400c" stroke-width="2"/>' +
      '<path d="M56 12 Q70 6 72 16" fill="none" stroke="#4d7a1c" stroke-width="2.5" stroke-linecap="round"/>' +
      eyes + '</svg>';
  }

  function spookyBat() {
    return '<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M30 11 C26 3 14 1 1 8 C8 9 10 14 9 21 C13 16 18 16 21 22 C24 18 27 18 30 25 C33 18 36 18 39 22 C42 16 47 16 51 21 C50 14 52 9 59 8 C46 1 34 3 30 11 Z" fill="#150a20" stroke="#6b3fa0" stroke-width="1"/>' +
      '<circle cx="27" cy="11" r="1.2" fill="#ff5a3c"/><circle cx="33" cy="11" r="1.2" fill="#ff5a3c"/>' +
      '<path d="M27 8 L28 4 L30 8 L32 4 L33 8" fill="#150a20"/></svg>';
  }

  function spookyWeb() {
    let arcs = "";
    [30, 55, 80, 105].forEach((r) => {
      arcs += '<path d="M' + r + ' 0 Q' + (r * 0.5) + ' ' + (r * 0.5) + ' 0 ' + r + '" fill="none"/>';
    });
    return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g stroke="#d8d0e6" stroke-width="1" opacity=".55">' +
      '<path d="M0 0 L120 0 M0 0 L112 40 M0 0 L86 86 M0 0 L40 112 M0 0 L0 120" fill="none"/>' + arcs + '</g></svg>';
  }

  function spookySpider() {
    return '<svg viewBox="0 0 40 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<line x1="20" y1="0" x2="20" y2="70" stroke="#d8d0e6" stroke-width="1" opacity=".7"/>' +
      '<g stroke="#120818" stroke-width="2" fill="none" stroke-linecap="round">' +
      '<path d="M14 80 L4 70 L1 78"/><path d="M14 84 L2 84 L0 92"/><path d="M15 88 L5 98 L8 106"/><path d="M17 91 L12 104 L16 108"/>' +
      '<path d="M26 80 L36 70 L39 78"/><path d="M26 84 L38 84 L40 92"/><path d="M25 88 L35 98 L32 106"/><path d="M23 91 L28 104 L24 108"/></g>' +
      '<ellipse cx="20" cy="86" rx="8" ry="9" fill="#1a0c26" stroke="#6b3fa0" stroke-width="1"/>' +
      '<circle cx="20" cy="74" r="5.5" fill="#1a0c26" stroke="#6b3fa0" stroke-width="1"/>' +
      '<circle cx="18" cy="73" r="1.3" fill="#ff3b2f"/><circle cx="22" cy="73" r="1.3" fill="#ff3b2f"/>' +
      '<path d="M17 84 L20 92 L23 84 Z" fill="#ff7a1a" opacity=".8"/></svg>';
  }

  function spookyGhost() {
    return '<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M30 4 C14 4 6 16 6 32 L6 72 L14 64 L22 74 L30 64 L38 74 L46 64 L54 72 L54 32 C54 16 46 4 30 4 Z" fill="#ece7f8" opacity=".92"/>' +
      '<ellipse cx="22" cy="30" rx="4" ry="6" fill="#1c1030"/><ellipse cx="38" cy="30" rx="4" ry="6" fill="#1c1030"/>' +
      '<ellipse cx="30" cy="45" rx="5" ry="7" fill="#1c1030"/></svg>';
  }

  function spookyTomb() {
    return '<svg viewBox="0 0 50 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M4 62 L4 24 C4 8 46 8 46 24 L46 62 Z" fill="#6c6779" stroke="#2c2836" stroke-width="2.5"/>' +
      '<path d="M25 22 L25 42 M17 29 L33 29" stroke="#2c2836" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<path d="M4 62 Q10 54 14 62 M30 62 Q36 56 46 62" stroke="#3f7a2a" stroke-width="3" fill="none"/></svg>';
  }

  function spookyEyes() {
    return '<svg viewBox="0 0 50 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="13" cy="11" rx="9" ry="6" fill="#b6ff3a"/><ellipse cx="37" cy="11" rx="9" ry="6" fill="#b6ff3a"/>' +
      '<ellipse cx="13" cy="11" rx="2" ry="6" fill="#0b0510"/><ellipse cx="37" cy="11" rx="2" ry="6" fill="#0b0510"/></svg>';
  }

  function spookyDrips() {
    // Blood running down from the top edge of the screen (stretches to the full width).
    const drops = [[3, 38], [9, 70], [14, 26], [21, 52], [27, 90], [33, 34], [41, 60], [47, 24], [54, 78], [61, 40], [68, 56], [74, 28], [81, 84], [88, 36], [94, 62]];
    let p = '<path d="M0 0 H100 V9 ';
    drops.slice().reverse().forEach(([x, h]) => {
      p += 'L' + (x + 1.1) + ' 9 L' + (x + 1.1) + ' ' + (h * 0.5) + ' Q' + x + ' ' + (h * 0.5 + 6) + ' ' + (x - 1.1) + ' ' + (h * 0.5) + ' L' + (x - 1.1) + ' 9 ';
    });
    p += 'Z" fill="#8a0a14"/>';
    let d = "";
    drops.forEach(([x, h]) => { d += '<ellipse cx="' + x + '" cy="' + (h * 0.5 + 3) + '" rx="1.1" ry="2.6" fill="#b30f1d"/>'; });
    return '<svg viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + p + '<path d="M0 0 H100 V2.5 H0 Z" fill="#5c060d"/>' + d + '</svg>';
  }

  function spookySkull() {
    return '<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M30 4 C12 4 4 18 6 32 C7 40 12 44 14 48 L14 58 L22 58 L22 52 L26 58 L34 58 L38 52 L38 58 L46 58 L46 48 C48 44 53 40 54 32 C56 18 48 4 30 4 Z" fill="#d9d2c0" stroke="#3a3328" stroke-width="2"/>' +
      '<ellipse cx="20" cy="30" rx="7" ry="8" fill="#0a0507"/><ellipse cx="40" cy="30" rx="7" ry="8" fill="#0a0507"/>' +
      '<circle cx="20" cy="31" r="2" fill="#d4121f"/><circle cx="40" cy="31" r="2" fill="#d4121f"/>' +
      '<path d="M30 38 L26 46 L34 46 Z" fill="#0a0507"/>' +
      '<path d="M22 52 V58 M30 52 V58 M38 52 V58" stroke="#3a3328" stroke-width="1.5"/>' +
      '<path d="M44 8 L40 20 L45 28" stroke="#6e0a12" stroke-width="2" fill="none"/>' +
      '<path d="M16 58 Q16 66 18 66 Q20 66 20 58" fill="#a30f1b"/></svg>';
  }

  function spookySplat() {
    return '<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M45 8 C52 6 56 14 62 12 C70 10 72 22 78 26 C86 30 80 40 74 44 C80 52 70 60 62 56 C58 66 48 64 44 58 C38 66 26 60 28 52 C18 54 12 44 20 38 C10 32 18 22 26 24 C26 14 36 10 45 8 Z" fill="#7a0810"/>' +
      '<circle cx="12" cy="14" r="3" fill="#7a0810"/><circle cx="82" cy="10" r="2.2" fill="#7a0810"/><circle cx="6" cy="52" r="2.5" fill="#7a0810"/>' +
      '<path d="M30 30 C38 26 44 32 52 28" stroke="#b30f1d" stroke-width="2" fill="none" opacity=".6"/></svg>';
  }
  function spookyFxMarkup(blood) {
    const el = (cls, inner) => '<div class="' + cls + '">' + inner + '</div>';
    return el("sp-web sp-web-l", spookyWeb()) +
      el("sp-web sp-web-r", spookyWeb()) +
      el("sp-spider", spookySpider()) +

      el("sp-bat sp-bat-1", spookyBat()) +
      el("sp-bat sp-bat-2", spookyBat()) +
      el("sp-bat sp-bat-3", spookyBat()) +

      el("sp-tomb", spookyTomb()) +
      el("sp-pump sp-pump-a", spookyPumpkin(true)) +
      el("sp-pump sp-pump-b", spookyPumpkin(false)) +
      el("sp-pump sp-pump-c", spookyPumpkin(true)) +
      el("sp-eyes", spookyEyes()) +
      (blood ? el("sp-drips", spookyDrips()) + el("sp-skull", spookySkull()) + el("sp-splat", spookySplat()) : "");
  }

  function buildSpookyCss(settings, fontStack) {
    const BG = settings.bgColor;
    const SIDE = settings.sidebarColor;
    const PAPER = settings.cardColor;
    const PB = settings.bubbleColor;
    const A = settings.accentColor;
    const S = settings.secondaryColor || "#6b2fa0";
    const INK = settings.textColor;
    const fx = settings.cyberFx !== false;
    const K = "#0b0510";
    const crt = `"Creepster", "Chiller", "Papyrus", cursive`;
    const body = fontStack || `"Nunito", "Segoe UI", Arial, sans-serif`;
    const shade = (c, b) => `color-mix(in srgb, ${c}, black ${b}%)`;
    const tone = (c, w) => `color-mix(in srgb, ${c}, white ${w}%)`;
    const rgba = (c, pct) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
    const ink = inkOn(A);
    const edge = rgba(A, 50);
    const gridSlot = `[data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]`;
    const pill = `html [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]),
      aside[data-component="sidebar"] [data-component="add-interest-input"],
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a)`;

    const base = buildSkeuoCss({ ...settings, cyberFx: false }, body);

    return base + `
      /* ===== Spooky layer: flatten the skeuo look into a haunted night ===== */

      html body,
      [data-component="suggestions-grid"] {
        background-color: ${BG} !important;
        background-image:
          radial-gradient(ellipse at 82% 0%, ${rgba(S, 30)}, transparent 55%),
          radial-gradient(ellipse at 8% 100%, ${rgba(A, 14)}, transparent 50%) !important;
      }

      [data-component="suggestions-grid"]::before,
      [data-component="suggestions-grid"]::after { display: none !important; }

      ${gridSlot} {
        border-radius: 12px !important;
        box-shadow: 0 0 0 2px ${edge}, 0 4px 0 ${K} !important;
      }

      ${gridSlot}.bg-modal-input-border-focus-color {
        box-shadow: 0 0 0 2px ${A}, 0 4px 0 ${K} !important;
      }

      /* Header */
      html [data-chatbox] [data-component="group-card-header"],
      html [data-chatbox] header {
        background: ${shade(PAPER, 30)} !important;
        border-bottom: 2px solid ${A} !important;
        box-shadow: none !important;
        border-radius: 10px 10px 0 0 !important;
      }

      [data-chatbox] [data-component="group-card-header"]::before,
      [data-chatbox] header::before { background: transparent !important; }

      [data-chatbox] header::after { border-bottom: 1.5px dashed ${rgba(A, 40)} !important; }

      html [data-chatbox] [data-component="group-card-header"] p,
      html [data-chatbox] header [data-cy-title] {
        font-family: ${crt} !important;
        font-size: 18px !important;
        font-weight: 400 !important;
        letter-spacing: 0.05em !important;
        color: ${A} !important;
        text-shadow: none !important;
      }

      html [data-chatbox] header button,
      html [data-chatbox] header svg { color: ${A} !important; filter: none !important; }

      html [data-chatbox] header img {
        border-radius: 50% !important;
        box-shadow: 0 0 0 2px ${A} !important;
      }

      /* Message area */
      [data-chatbox] .bg-chat-message-list-bg,
      [data-chatbox] .bg-group-card-chat-screen-bg {
        background: ${PAPER} !important;
        box-shadow: none !important;
      }

      /* Bubbles */
      html [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border: 2px solid ${edge} !important;
        border-radius: 14px !important;
        box-shadow: none !important;
        background-image: none !important;
        background-color: ${PB} !important;
        opacity: 1 !important;
      }

      html [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]),
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="image"]):not([data-message-type="intro"]) {
        background-image: none !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        background-color: ${S} !important;
        border-color: ${rgba(tone(S, 40), 70)} !important;
      }

      html [data-msg-row] [data-msg-bubble="true"] > div.block {
        font-family: ${body} !important;
        font-weight: 600 !important;
        text-shadow: none !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block span {
        text-shadow: none !important;
      }

      html [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before {
        font-family: ${crt};
        font-size: 13px;
        letter-spacing: 0.06em;
        color: ${A};
        text-shadow: none;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"])::before {
        color: ${tone(S, 70)};
        text-shadow: none;
      }

      html [data-msg-row] [data-msg-bubble="true"] a { color: ${tone(A, 25)} !important; }
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] a { color: #ffffff !important; }

      [data-component="chat-message-reply"] > div.bg-msg-bubble-reply-bg {
        background: rgba(0, 0, 0, 0.28) !important;
        border: 1px solid ${edge} !important;
        border-left: 4px solid ${A} !important;
        box-shadow: none !important;
      }

      [data-msg-reactions],
      .bg-buble-reaction-bg,
      .group\\/smart > div > div {
        background: ${PB} !important;
        border: 1px solid ${edge} !important;
        box-shadow: none !important;
        color: ${INK} !important;
      }

      .bg-buble-reacted-bg,
      [data-msg-reactions].bg-buble-reacted-bg {
        background: ${A} !important;
        border-color: ${shade(A, 45)} !important;
        color: ${ink} !important;
      }

      /* Input bar */
      [data-component="chat-input"] {
        background: ${shade(PAPER, 25)} !important;
        box-shadow: inset 0 1px 0 ${rgba(A, 35)} !important;
      }

      [data-component="chat-input"] .bg-input-text-msg-form {
        background: ${PB} !important;
        border: 1px solid ${edge} !important;
        box-shadow: none !important;
      }

      [data-component="chat-input"] svg { color: ${A} !important; filter: none !important; }

      /* Sidebar */
      html aside[data-component="sidebar"] {
        text-shadow: none;
        border-right: 2px solid ${edge} !important;
      }

      aside[data-component="sidebar"] article.group\\/row,
      aside[data-component="sidebar"] [data-interest-chip],
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a {
        background-image: none !important;
        background-color: ${tone(SIDE, 7)} !important;
        border: 1px solid ${rgba(A, 30)} !important;
        border-radius: 10px !important;
        box-shadow: none !important;
      }

      aside[data-component="sidebar"] article.group\\/row:hover,
      aside[data-component="sidebar"] [data-interest-chip]:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a:hover {
        background-image: none !important;
        background-color: ${A} !important;
        box-shadow: none !important;
      }

      aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p,
      aside[data-component="sidebar"] section > div.-mb-0\\.5 > span {
        font-family: ${crt} !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        letter-spacing: 0.06em !important;
        text-transform: none !important;
        color: ${A} !important;
      }

      html aside[data-component="sidebar"] > div.absolute.bottom-2 {
        background-color: ${shade(SIDE, 35)} !important;
        border-top: 2px solid ${edge} !important;
        box-shadow: none !important;
      }

      /* Pumpkin buttons */
      ${pill} {
        background-color: ${A} !important;
        background-image: none !important;
        border: 2px solid ${shade(A, 55)} !important;
        border-radius: 16px !important;
        box-shadow: 0 3px 0 ${shade(A, 60)} !important;
        color: ${ink} !important;
        text-shadow: none !important;
      }

      html aside[data-component="sidebar"] [data-component="add-interest-input"] *,
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a),
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a) * {
        color: ${ink} !important;
        text-shadow: none !important;
        font-weight: 800 !important;
      }

      aside[data-component="sidebar"] [data-cy-badge] {
        background-image: none !important;
        background-color: ${S} !important;
        border: 1px solid ${K} !important;
        box-shadow: none !important;
        color: #ffffff !important;
      }

      .bg-primary,
      .bg-start-quick-call-btn-bg,
      [data-component="group-call-banner"],
      [data-component="mic-button"].bg-\\[\\#5865f2\\],
      .bg-\\[\\#5865f2\\] {
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }

      html, [data-chatbox], aside[data-component="sidebar"] {
        scrollbar-width: thin;
        scrollbar-color: ${A} rgba(0, 0, 0, 0.3);
      }

      ${settings.spookyBlood ? `
      /* ===== Blood variant: near-black surfaces, dripping headers, red wash ===== */
      html body,
      [data-component="suggestions-grid"] {
        background-image:
          radial-gradient(ellipse at 50% 125%, ${rgba(A, 30)}, transparent 55%),
          radial-gradient(ellipse at 50% -20%, ${rgba(A, 12)}, transparent 50%) !important;
      }

      [data-chatbox] .bg-chat-message-list-bg,
      [data-chatbox] .bg-group-card-chat-screen-bg {
        background:
          linear-gradient(${A}, ${A}) 0 0 / 100% 3px no-repeat,
          linear-gradient(90deg, transparent 0 40px, ${shade(A, 8)} 40px 46px, transparent 46px) 0 0 / 97px 16px repeat-x,
          radial-gradient(circle at 43px 16px, ${shade(A, 8)} 4.5px, transparent 5px) 0 0 / 97px 22px repeat-x,
          linear-gradient(90deg, transparent 0 18px, ${shade(A, 20)} 18px 22px, transparent 22px) 0 0 / 143px 9px repeat-x,
          radial-gradient(circle at 20px 9px, ${shade(A, 20)} 3.2px, transparent 3.7px) 0 0 / 143px 13px repeat-x,
          linear-gradient(180deg, ${rgba(A, 10)}, transparent 30%),
          ${PAPER} !important;
      }

      html [data-chatbox] [data-component="group-card-header"],
      html [data-chatbox] header {
        background: ${shade(PAPER, 45)} !important;
        border-bottom: 3px solid ${shade(A, 5)} !important;
      }

      html [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border-color: ${rgba(A, 60)} !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border-color: ${A} !important;
        box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.35) !important;
      }

      html [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before {
        color: ${tone(A, 25)};
      }

      ${gridSlot} {
        box-shadow: 0 0 0 2px ${shade(A, 20)}, 0 5px 0 ${K} !important;
      }

      ${gridSlot}.bg-modal-input-border-focus-color {
        box-shadow: 0 0 0 2px ${A}, 0 0 0 5px ${rgba(A, 30)}, 0 5px 0 ${K} !important;
      }

      #${SPOOKY_FX_ID} .sp-web svg g { stroke: #c9a3a8; }
      ` : ""}
      /* ===== Overlay: pumpkins, bats, cobwebs, spider, ghost, moon ===== */
      #${SPOOKY_FX_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147482999;
        pointer-events: none;
        overflow: hidden;
      }

      #${SPOOKY_FX_ID} > div { position: absolute; }
      #${SPOOKY_FX_ID} svg { display: block; width: 100%; height: 100%; overflow: visible; }

      #${SPOOKY_FX_ID} .sp-web { top: 0; width: 130px; height: 130px; }
      #${SPOOKY_FX_ID} .sp-web-l { left: 0; }
      #${SPOOKY_FX_ID} .sp-web-r { right: 0; transform: scaleX(-1); }
      #${SPOOKY_FX_ID} .sp-spider { top: 0; right: 34px; width: 30px; height: 84px; transform-origin: 50% 0; }

      #${SPOOKY_FX_ID} .sp-bat { width: 40px; height: 20px; }
      #${SPOOKY_FX_ID} .sp-bat-1 { top: 46px; left: 34%; }
      #${SPOOKY_FX_ID} .sp-bat-2 { top: 22px; left: 52%; width: 30px; height: 15px; }
      #${SPOOKY_FX_ID} .sp-bat-3 { top: 70px; left: 72%; width: 34px; height: 17px; }

      #${SPOOKY_FX_ID} .sp-tomb { right: 150px; bottom: -8px; width: 34px; height: 42px; }
      #${SPOOKY_FX_ID} .sp-pump-a { right: 6px; bottom: -14px; width: 76px; height: 70px; }
      #${SPOOKY_FX_ID} .sp-pump-b { right: 80px; bottom: -12px; width: 50px; height: 46px; }
      #${SPOOKY_FX_ID} .sp-pump-c { right: 118px; bottom: -10px; width: 38px; height: 35px; }
      #${SPOOKY_FX_ID} .sp-eyes { left: 8px; bottom: 74px; width: 34px; height: 15px; opacity: 0.85; }
      #${SPOOKY_FX_ID} .sp-drips { top: 0; left: 0; width: 100%; height: 64px; opacity: 0.95; }
      #${SPOOKY_FX_ID} .sp-skull { left: 78px; bottom: -6px; width: 34px; height: 40px; }
      #${SPOOKY_FX_ID} .sp-splat { right: 210px; bottom: -22px; width: 80px; height: 62px; opacity: 0.9; }

      ${fx ? `
      #${SPOOKY_FX_ID} .sp-bat-1 { animation: sp-drift 9s ease-in-out infinite; }
      #${SPOOKY_FX_ID} .sp-bat-2 { animation: sp-drift 7s ease-in-out -2s infinite; }
      #${SPOOKY_FX_ID} .sp-bat-3 { animation: sp-drift 11s ease-in-out -5s infinite; }
      #${SPOOKY_FX_ID} .sp-spider { animation: sp-sway 4s ease-in-out infinite; }

      @keyframes sp-drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(34px, 12px); } }
      @keyframes sp-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }

      @media (prefers-reduced-motion: reduce) {
        #${SPOOKY_FX_ID} > div { animation: none !important; }
      }` : ""}
    `;
  }

  // Pick black or white text for a background colour (whichever has more contrast).
  function inkOn(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!m) return "#111111";
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const n = parseInt(m[1], 16);
    const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    const darkText = (L + 0.05) / 0.05;      // contrast of black text
    const lightText = 1.05 / (L + 0.05);     // contrast of white text
    return darkText >= lightText ? "#111111" : "#ffffff";
  }

  function buildBrutalCss(rawSettings, fontStack) {
    // Text colours follow the surface they sit on, so bright colours always get dark text.
    const settings = { ...rawSettings, textColor: inkOn(rawSettings.bubbleColor) };
    const iA = inkOn(settings.accentColor);
    const iS = inkOn(settings.secondaryColor || "#ff90e8");
    const iP = inkOn(settings.bubbleColor);
    const iSide = inkOn(settings.sidebarColor);
    const SIDE = settings.sidebarColor;
    const A = settings.accentColor;
    const S = settings.secondaryColor || "#ff90e8";
    const K = "#111111";
    const head = `"Bebas Neue", "Impact", "Arial Narrow", sans-serif`;
    const mono = `"Space Mono", "Courier New", monospace`;
    const body = settings.fontFamily === "default" ? `"Space Grotesk", "Segoe UI", Arial, sans-serif` : fontStack;
    const base = buildArcadeCss(settings, body);
    const gridSlot = `[data-component="suggestions-grid"] > div:not(.fixed) > div.relative.block.size-full > div[data-chat-id]`;

    return base + `
      /* ===== Neo-brutalist layer ===== */

      html body,
      [data-component="suggestions-grid"] {
        background-image: radial-gradient(rgba(0, 0, 0, 0.16) 1px, transparent 1.3px) !important;
        background-size: 18px 18px !important;
      }

      ${gridSlot} {
        border-radius: 6px !important;
        box-shadow: 0 0 0 2px ${K}, 6px 6px 0 2px ${K} !important;
      }

      ${gridSlot}.bg-modal-input-border-focus-color {
        box-shadow: 0 0 0 2px ${K}, 0 0 0 6px ${A}, 0 0 0 8px ${K}, 8px 8px 0 8px ${K} !important;
      }

      html [data-chatbox] [data-component="group-card-header"],
      html [data-chatbox] header {
        border-bottom: 2px solid ${K} !important;
        box-shadow: none !important;
        border-radius: 4px 4px 0 0 !important;
      }

      [data-chatbox] [data-component="group-card-header"]::before,
      [data-chatbox] header::before { background: none !important; }

      html [data-chatbox] [data-component="group-card-header"] p,
      html [data-chatbox] header [data-cy-title] {
        font-family: ${head} !important;
        font-size: 20px !important;
        line-height: 1.1 !important;
        letter-spacing: 0.03em !important;
        text-transform: uppercase !important;
      }

      html [data-chatbox] header img { border-radius: 50% !important; box-shadow: 0 0 0 2px ${K} !important; }

      [data-chatbox] .bg-chat-message-list-bg,
      [data-chatbox] .bg-group-card-chat-screen-bg {
        background: radial-gradient(rgba(0, 0, 0, 0.09) 1px, transparent 1.3px) 0 0 / 16px 16px, ${settings.cardColor} !important;
      }

      html [data-msg-row] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border: 2px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"]:not([data-message-type="intro"]) {
        border-color: ${K} !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      /* Dark text on every bubble (pink and white are both light) */
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] > div.block span,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] [data-msg-transcript],
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] [data-msg-transcript] *,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] .text-msg-reply-text-color,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] .text-msg-reply-text-color * {
        color: ${iS} !important;
        text-shadow: none !important;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] { --msg-reply-text-color: ${iS} !important; }
      html [data-msg-row]:not([data-irc-mine="true"]) [data-msg-bubble="true"],
      html [data-msg-row]:not([data-irc-mine="true"]) [data-msg-bubble="true"] :is(div.block, div.block span, span, p, [data-msg-transcript], .text-msg-reply-text-color, .text-msg-reply-text-color *, [data-msg-transcript] *) {
        --msg-reply-text-color: ${iP};
        color: ${iP} !important;
      }

      html [data-msg-row]:not([data-irc-mine="true"]) [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before { color: ${iP}; }
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"])::before { color: ${iS}; }

      html [data-msg-row] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"]):not([data-message-type="intro"])::before,
      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"][data-cy-first="true"]:not([data-message-type="image"])::before {
        font-family: ${mono};
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        text-shadow: none;
        opacity: 0.8;
      }

      html [data-msg-row][data-irc-mine="true"] [data-msg-bubble="true"] a { color: ${iS} !important; }
      html [data-msg-row] [data-msg-bubble="true"] a { color: ${iP} !important; text-decoration: underline !important; font-weight: 700 !important; }

      .audio-seek { --audio-fill: ${K} !important; --audio-rest: rgba(0, 0, 0, 0.25) !important; }
      html [data-msg-row][data-irc-mine="true"] .audio-seek { --audio-fill: ${K} !important; --audio-rest: rgba(0, 0, 0, 0.25) !important; }

      /* Sidebar: flat panel, white blocks, black text */
      html aside[data-component="sidebar"] {
        background-image: radial-gradient(rgba(0, 0, 0, 0.16) 1px, transparent 1.3px) !important;
        background-size: 18px 18px !important;
        border-right: 2px solid ${K} !important;
        color: ${K};
        text-shadow: none;
      }

      aside[data-component="sidebar"] article.group\\/row,
      aside[data-component="sidebar"] [data-interest-chip],
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a {
        background-color: #ffffff !important;
        border: 2px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      aside[data-component="sidebar"] article.group\\/row:hover,
      aside[data-component="sidebar"] [data-interest-chip]:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > button:hover,
      aside[data-component="sidebar"] > div.mb-\\[7px\\] > a:hover {
        background-color: ${S} !important;
        box-shadow: 3px 3px 0 ${K} !important;
      }

      html body aside[data-component="sidebar"] article.group\\/row.group\\/row :is(span, div, p),
      html body aside[data-component="sidebar"] [data-interest-chip] :is(span, div),
      html body aside[data-component="sidebar"] > div.mb-\\[7px\\] > :is(button, a),
      html body aside[data-component="sidebar"] > div.mb-\\[7px\\] > :is(button, a) * {
        color: ${K} !important;
        text-shadow: none !important;
      }

      html body aside[data-component="sidebar"] > div.-mb-0\\.5.mt-1\\.5 > p,
      html body aside[data-component="sidebar"] section > div.-mb-0\\.5 > span {
        font-family: ${head} !important;
        font-size: 17px !important;
        letter-spacing: 0.04em !important;
        color: ${K} !important;
      }

      html aside[data-component="sidebar"] > div.absolute.bottom-2 {
        background-color: #ffffff !important;
        border-top: 2px solid ${K} !important;
      }

      html body aside[data-component="sidebar"] > div.absolute.bottom-2 :is(span, p, div) {
        color: ${K} !important;
        text-shadow: none !important;
      }

      html [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]),
      aside[data-component="sidebar"] [data-component="add-interest-input"],
      html aside[data-component="sidebar"] > div.absolute.bottom-2 :is(button, a) {
        border: 2px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 3px 3px 0 ${K} !important;
        background-color: ${A} !important;
        text-transform: uppercase;
        letter-spacing: 0.02em;
      }

      aside[data-component="sidebar"] [data-cy-badge] {
        color: ${K} !important;
        background-color: ${S} !important;
        border: 2px solid ${K} !important;
        border-radius: 50% !important;
        box-shadow: 2px 2px 0 ${K} !important;
      }

      .bg-call-screen-inchat-bg,
      .dark\\:bg-call-screen-inchat-bg {
        background: ${K} !important;
        border: 2px solid ${K} !important;
        border-radius: 6px !important;
        box-shadow: 4px 4px 0 ${K} !important;
      }

      html body aside[data-component="sidebar"]:not(#bk) article.group\\/row *,
      html body aside[data-component="sidebar"]:not(#bk) [data-interest-chip],
      html body aside[data-component="sidebar"]:not(#bk) [data-interest-chip] *,
      html body aside[data-component="sidebar"]:not(#bk) > div.absolute.bottom-2,
      html body aside[data-component="sidebar"]:not(#bk) > div.absolute.bottom-2 * {
        color: ${K} !important;
        text-shadow: none !important;
      }

      html body [data-chatbox] button[class*="bg-[#C54445" i],
      html body [data-chatbox] button[class*="bg-[#e5484d" i],
      html body [data-chatbox] button[class*="bg-[#C54445" i] * {
        color: ${K} !important;
        text-shadow: none !important;
      }

      /* Auto contrast: text colour follows the colour it sits on */
      html body [data-chatbox] [data-component="group-card-header"] p,
      html body [data-chatbox] header [data-cy-title],
      html body [data-chatbox] header button,
      html body [data-chatbox] header svg {
        color: ${iA} !important;
      }

      html body [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]),
      html body [data-chatbox] button.border[class*="rounded"]:not([data-component="mic-button"]) *,
      html body aside[data-component="sidebar"]:not(#bk) [data-component="add-interest-input"],
      html body aside[data-component="sidebar"]:not(#bk) [data-component="add-interest-input"] *,
      html body aside[data-component="sidebar"]:not(#bk) > div.absolute.bottom-2 :is(button, a),
      html body aside[data-component="sidebar"]:not(#bk) > div.absolute.bottom-2 :is(button, a) * {
        color: ${iA} !important;
      }

      html body [data-chatbox] button[class*="bg-[#C54445" i],
      html body [data-chatbox] button[class*="bg-[#e5484d" i],
      html body [data-chatbox] button[class*="bg-[#C54445" i] * {
        color: ${iS} !important;
      }

      html body aside[data-component="sidebar"]:not(#bk) article.group\\/row:hover *,
      html body aside[data-component="sidebar"]:not(#bk) [data-interest-chip]:hover,
      html body aside[data-component="sidebar"]:not(#bk) [data-interest-chip]:hover *,
      html body aside[data-component="sidebar"]:not(#bk) > div.mb-\\[7px\\] > :is(button, a):hover,
      html body aside[data-component="sidebar"]:not(#bk) > div.mb-\\[7px\\] > :is(button, a):hover * {
        color: ${iS} !important;
      }

      html body aside[data-component="sidebar"]:not(#bk) > div.-mb-0\\.5.mt-1\\.5 > p,
      html body aside[data-component="sidebar"]:not(#bk) section > div.-mb-0\\.5 > span {
        color: ${iSide} !important;
      }

      html body aside[data-component="sidebar"] [data-cy-badge] { color: ${iS} !important; }

      .bg-buble-reacted-bg, [data-msg-reactions].bg-buble-reacted-bg {
        background: ${S} !important;
        color: ${iS} !important;
        border: 2px solid ${K} !important;
      }
    `;
  }


  // Textures are plain CSS gradients now (cheap to paint). No SVG filters are used.
  function skeuoDefsMarkup() {
    return "";
  }

  function syncSkeuoOverlay() {
    const on = activeMode(currentSettings) === "skeuo";
    const defs = document.getElementById(SKEUO_DEFS_ID);
    const fxEl = document.getElementById(SKEUO_FX_ID);

    if (!on) {
      if (defs) defs.remove();
      if (fxEl) fxEl.remove();
      return;
    }
    if (!document.documentElement || !document.body) return;

    const sig = String(currentSettings.bgColor);
    let svg = defs;
    if (!svg) {
      const holder = document.createElement("div");
      holder.innerHTML = '<svg id="' + SKEUO_DEFS_ID + '" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"></svg>';
      svg = holder.firstChild;
      document.documentElement.appendChild(svg);
    }
    if (svg.getAttribute("data-sig") !== sig) {
      svg.innerHTML = skeuoDefsMarkup(currentSettings);
      svg.setAttribute("data-sig", sig);
    }

    if (window.top === window && !fxEl) {
      const fx = document.createElement("div");
      fx.id = SKEUO_FX_ID;
      fx.setAttribute("aria-hidden", "true");
      fx.innerHTML = '<div class="sk-noise"></div><div class="sk-vig"></div><div class="sk-tab">Convose</div>';
      document.documentElement.appendChild(fx);
    }
  }

  // Halloween decorations: one fixed overlay on <html>, top frame only, removed when the style is off.
  function syncSpookyOverlay() {
    const on = activeMode(currentSettings) === "spooky" && window.top === window;
    const existing = document.getElementById(SPOOKY_FX_ID);
    if (!on) {
      if (existing) existing.remove();
      return;
    }
    const blood = currentSettings.spookyBlood ? "1" : "0";
    if (existing && existing.getAttribute("data-blood") === blood) return;
    if (existing) existing.remove();
    if (!document.documentElement || !document.body) return;
    const fx = document.createElement("div");
    fx.id = SPOOKY_FX_ID;
    fx.setAttribute("data-blood", blood);
    fx.setAttribute("aria-hidden", "true");
    fx.innerHTML = spookyFxMarkup(blood === "1");
    document.documentElement.appendChild(fx);
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
    const mode = activeMode(currentSettings);
    if (!mode) return;
    // Cyber and skeuo styles both use the per-bubble tag attributes
    const cyber = mode === "cyber" || mode === "skeuo" || mode === "arcade" || mode === "brutal" || mode === "spooky";

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
          if (bubble.getAttribute("data-cy-nick") !== nick) bubble.setAttribute("data-cy-nick", nick);
          if (bubble.getAttribute("data-cy-time") !== timeStr) bubble.setAttribute("data-cy-time", timeStr);
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
    const mode = activeMode(currentSettings);
    if (mode !== "cyber" && mode !== "skeuo" && mode !== "arcade" && mode !== "brutal" && mode !== "spooky") {
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
    const wantHud = activeMode(currentSettings) === "cyber" && window.top === window;
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

  // ---------------------------------------------------------------
  // Runtime: one live instance at a time, build CSS only when settings change
  // ---------------------------------------------------------------
  const MY_GEN = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const MY_STYLE_ID = CUSTOMIZER_STYLE_ID + "-" + MY_GEN;
  const GEN_ATTR = "data-convose-gen";
  let mySheet = null;
  try {
    if ("adoptedStyleSheets" in document) mySheet = new CSSStyleSheet();
  } catch (_) {
    mySheet = null;
  }
  let torn = false;
  let observer = null;
  let throttleTimer = null;
  var lastKeyAt = 0;
  let appliedSig = "";
  let cachedCss = "";

  // After the extension is reloaded, the old script keeps running in already-open tabs but its
  // chrome.* APIs are dead. Detect that so it can clean itself up instead of fighting the new one.
  function contextAlive() {
    try {
      return Boolean(chrome && chrome.runtime && chrome.runtime.id);
    } catch (_) {
      return false;
    }
  }

  function isSuperseded() {
    const root = document.documentElement;
    const gen = root && root.getAttribute(GEN_ATTR);
    return Boolean(gen && gen !== MY_GEN);
  }

  function teardown() {
    if (torn) return;
    torn = true;
    if (observer) observer.disconnect();
    if (throttleTimer) clearTimeout(throttleTimer);
    try {
      chrome.storage.onChanged.removeListener(onStorageChanged);
      chrome.runtime.onMessage.removeListener(onRuntimeMessage);
    } catch (_) {
      // context already gone
    }
    window.removeEventListener("DOMContentLoaded", onDomReady);
    window.removeEventListener("keydown", onTypingEvent, true);
    window.removeEventListener("input", onTypingEvent, true);
    window.removeEventListener("load", onWindowLoad);
    try {
      if (mySheet) {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter((sh) => sh !== mySheet);
      }
    } catch (_) {
      // ignore
    }
    const el = document.getElementById(MY_STYLE_ID);
    if (el) el.remove();
  }

  function ensureStyleEl() {
    const parent = document.head || document.documentElement;
    let el = document.getElementById(MY_STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = MY_STYLE_ID;
      el.textContent = cachedCss;
      parent.appendChild(el);
    } else if (el.parentElement !== parent || parent.lastElementChild !== el) {
      parent.appendChild(el);
    }
    return el;
  }

  function applyStylesToDOM() {
    if (torn) return;
    const root = document.documentElement;
    if (!root) return;

    if (!contextAlive() || isSuperseded()) {
      teardown();
      return;
    }
    if (root.getAttribute(GEN_ATTR) !== MY_GEN) root.setAttribute(GEN_ATTR, MY_GEN);

    // Heavy part: only when settings actually changed
    const sig = JSON.stringify(currentSettings);
    if (sig !== appliedSig) {
      appliedSig = sig;
      cachedCss = buildStylesheet(currentSettings);

      const mode = activeMode(currentSettings);
      const useDefaultFont = currentSettings.fontFamily === "default";
      const fontKey = (mode === "cyber" && useDefaultFont) ? "cyber"
        : (mode === "skeuo" && useDefaultFont) ? "skeuo"
        : (mode === "arcade" && useDefaultFont) ? "arcade"
        : (mode === "brutal" && useDefaultFont) ? "brutal"
        : (mode === "spooky" && useDefaultFont) ? "spooky"
        : (mode === "irc" && useDefaultFont) ? "jetbrains-mono"
        : currentSettings.fontFamily;
      ensureGoogleFont(fontKey);

      const vars = getRootVariables(currentSettings);
      for (const [k, v] of Object.entries(vars)) {
        root.style.setProperty(k, v, "important");
      }

      if (mySheet) {
        try {
          mySheet.replaceSync(cachedCss);
        } catch (_) {
          // fall back to the <style> element below
        }
      }
      ensureStyleEl().textContent = cachedCss;
    }

    // Cheap part: make sure our styles are still attached (React / Next.js can drop them)
    try {
      if (mySheet && !document.adoptedStyleSheets.includes(mySheet)) {
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, mySheet];
      }
    } catch (_) {
      // ignore
    }
    ensureStyleEl();

    // Per-chat tags and overlays (each one returns early when its style is off)
    syncIrcMetadata();
    syncCyberTags();
    syncCyberOverlay();
    syncSkeuoOverlay();
    syncSpookyOverlay();
  }

  function updateSettings(settings) {
    currentSettings = { ...defaultSettings, ...settings };
    applyStylesToDOM();
  }

  function onStorageChanged() {
    if (torn || !contextAlive()) return;
    chrome.storage.local.get(defaultSettings, (settings) => {
      updateSettings(settings);
    });
  }

  function onRuntimeMessage(msg, _sender, sendResponse) {
    if (torn) return;
    if (msg && (msg.type === "APPLY_CONVOSE_STYLES" || msg.type === "CONVOSE_APPLY_SETTINGS")) {
      updateSettings(msg.settings);
      sendResponse({ ok: true });
    }
  }

  function onDomReady() {
    startObserver();
    applyStylesToDOM();
  }

  function onWindowLoad() {
    applyStylesToDOM();
  }

  function startObserver() {
    if (torn || !observer || !document.documentElement) return;
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  window.__applyConvoseCustomizer = updateSettings;

  // Claim the page: any older live instance sees a different generation id and shuts itself down
  if (document.documentElement) document.documentElement.setAttribute(GEN_ATTR, MY_GEN);

  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(defaultSettings, (settings) => {
      updateSettings(settings);
    });
    if (chrome.storage.onChanged) chrome.storage.onChanged.addListener(onStorageChanged);
  } else {
    applyStylesToDOM();
  }

  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(onRuntimeMessage);
  }

  // Page changes (new messages, route changes) are frequent: re-check at most ~10 times a second
  // Typing performance: mutations that come from the message input (contenteditable / textarea)
  // never change anything we tag, so they are ignored. While keys are being pressed, the heavy
  // sync is postponed until the user pauses.
  function onTypingEvent() { lastKeyAt = Date.now(); }
  window.addEventListener("keydown", onTypingEvent, true);
  window.addEventListener("input", onTypingEvent, true);

  function isTypingNoise(records) {
    for (const r of records) {
      const t = r.target;
      const el = t && t.nodeType === 1 ? t : (t && t.parentElement);
      if (!el || !el.closest) return false;
      if (!el.closest('[data-component="chat-input"], [contenteditable], textarea, [role="textbox"]')) return false;
    }
    return true;
  }

  function scheduleApply() {
    if (throttleTimer || torn) return;
    const sinceKey = Date.now() - lastKeyAt;
    const delay = sinceKey < 600 ? 650 - sinceKey : 150;
    throttleTimer = setTimeout(() => {
      throttleTimer = null;
      if (Date.now() - lastKeyAt < 600) {
        scheduleApply();
        return;
      }
      const run = () => applyStylesToDOM();
      if (typeof requestIdleCallback === "function") requestIdleCallback(run, { timeout: 500 });
      else requestAnimationFrame(run);
    }, delay);
  }

  observer = new MutationObserver((records) => {
    if (torn || throttleTimer) return;
    if (isTypingNoise(records)) return;
    scheduleApply();
  });

  startObserver();
  window.addEventListener("DOMContentLoaded", onDomReady);
  window.addEventListener("load", onWindowLoad);
})();
