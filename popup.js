const THEME_PRESETS = {
  "midnight-orange": {
    bgColor: "#0a0a0a",
    sidebarColor: "#121212",
    cardColor: "#161616",
    bubbleColor: "#242424",
    accentColor: "#ff6b00",
    textColor: "#ffffff"
  },
  "crimson-velvet": {
    bgColor: "#160404",
    sidebarColor: "#220606",
    cardColor: "#290808",
    bubbleColor: "#481010",
    accentColor: "#e11d48",
    textColor: "#fff1f2"
  },
  "cyberpunk-neon": {
    bgColor: "#08090f",
    sidebarColor: "#0f111c",
    cardColor: "#151828",
    bubbleColor: "#222742",
    accentColor: "#2859a9",
    textColor: "#e2f1ff"
  },
  "catppuccin-mocha": {
    bgColor: "#11111b",
    sidebarColor: "#181825",
    cardColor: "#1e1e2e",
    bubbleColor: "#313244",
    accentColor: "#cba6f7",
    textColor: "#cdd6f4"
  },
  "nord-frost": {
    bgColor: "#242933",
    sidebarColor: "#2e3440",
    cardColor: "#3b4252",
    bubbleColor: "#434c5e",
    accentColor: "#88c0d0",
    textColor: "#eceff4"
  },
  "emerald-forest": {
    bgColor: "#06140e",
    sidebarColor: "#0a1f17",
    cardColor: "#0f291e",
    bubbleColor: "#163b2c",
    accentColor: "#10b981",
    textColor: "#ecfdf5"
  },
  "dracula-pro": {
    bgColor: "#191a21",
    sidebarColor: "#21222c",
    cardColor: "#282a36",
    bubbleColor: "#44475a",
    accentColor: "#ff79c6",
    textColor: "#f8f8f2"
  },
  "solarized-dark": {
    bgColor: "#001e26",
    sidebarColor: "#002b36",
    cardColor: "#073642",
    bubbleColor: "#0f4654",
    accentColor: "#2aa198",
    textColor: "#eee8d5"
  },
  "komanda-irc": {
    bgColor: "#1d2328",
    sidebarColor: "#283037",
    cardColor: "#1d2328",
    bubbleColor: "#283037",
    accentColor: "#5294e2",
    textColor: "#e6edf3"
  },
  // Skeuomorphic packs switch on Skeuomorphic Style (and switch off the other chat styles)
  // bg = wood tint, sidebar = denim, card = paper, bubble = partner bubble, accent = glossy highlight,
  // secondary = own bubble, text = ink on paper
  "walnut-denim": {
    skeuoMode: true,
    cyberMode: false,
    ircMode: false,
    bgColor: "#4a2c19",
    sidebarColor: "#2f4a6b",
    cardColor: "#e8dcc0",
    bubbleColor: "#f6f0df",
    accentColor: "#2d7be0",
    secondaryColor: "#5cb85c",
    textColor: "#2b2118"
  },
  "leather-brass": {
    skeuoMode: true,
    cyberMode: false,
    ircMode: false,
    bgColor: "#2e2016",
    sidebarColor: "#5a3a22",
    cardColor: "#dccaa2",
    bubbleColor: "#f3e8cc",
    accentColor: "#b8862e",
    secondaryColor: "#c9923a",
    textColor: "#2a1d10"
  },
  "brushed-steel": {
    skeuoMode: true,
    cyberMode: false,
    ircMode: false,
    bgColor: "#5d6065",
    sidebarColor: "#4a4d52",
    cardColor: "#cfd2d6",
    bubbleColor: "#eceeef",
    accentColor: "#3b7fd6",
    secondaryColor: "#4f94e6",
    textColor: "#25272a"
  },
  // Neo-brutalist packs
  "gumroad-pink": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#f4f1ea", sidebarColor: "#ffc900", cardColor: "#fffdf8", bubbleColor: "#ffffff",
    accentColor: "#ffc900", secondaryColor: "#ff90e8", textColor: "#111111"
  },
  "taxi-brutal": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#faf7f0", sidebarColor: "#f8f5ee", cardColor: "#ffffff", bubbleColor: "#ffffff",
    accentColor: "#f7b900", secondaryColor: "#ff6a1a", textColor: "#111111"
  },
  "mint-brutal": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#e6f6ec", sidebarColor: "#5ee6a0", cardColor: "#ffffff", bubbleColor: "#ffffff",
    accentColor: "#5ee6a0", secondaryColor: "#ffd23f", textColor: "#111111"
  },
  "lilac-brutal": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#efeaff", sidebarColor: "#8b7bff", cardColor: "#ffffff", bubbleColor: "#ffffff",
    accentColor: "#8b7bff", secondaryColor: "#ff90e8", textColor: "#111111"
  },
  "sky-brutal": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#e8f3ff", sidebarColor: "#4aa8ff", cardColor: "#ffffff", bubbleColor: "#ffffff",
    accentColor: "#ffd23f", secondaryColor: "#ff7a7a", textColor: "#111111"
  },
  "tangerine-brutal": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#fff1e0", sidebarColor: "#ff8a3d", cardColor: "#fffaf3", bubbleColor: "#ffffff",
    accentColor: "#ff8a3d", secondaryColor: "#7be0c3", textColor: "#111111"
  },
  "ink-brutal": {
    brutalMode: true, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#f4f1ea", sidebarColor: "#2b2b2b", cardColor: "#fffdf8", bubbleColor: "#ffffff",
    accentColor: "#111111", secondaryColor: "#c8f542", textColor: "#111111"
  },
  // Halloween packs
  "blood-crypt": {
    spookyMode: true, spookyBlood: true, brutalMode: false, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#050204", sidebarColor: "#0b0407", cardColor: "#0d0508", bubbleColor: "#1b0a0e",
    accentColor: "#c1121f", secondaryColor: "#5e0b15", textColor: "#ead9d2"
  },  "haunted-night": {
    spookyMode: true, brutalMode: false, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#0d0614", sidebarColor: "#1a0b24", cardColor: "#20102c", bubbleColor: "#321a47",
    accentColor: "#ff7a1a", secondaryColor: "#7a2fb8", textColor: "#f6e8d6"
  },
  "pumpkin-patch": {
    spookyMode: true, brutalMode: false, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#1a0e05", sidebarColor: "#2e1708", cardColor: "#261308", bubbleColor: "#4a2810",
    accentColor: "#ff8c1a", secondaryColor: "#5f8a1c", textColor: "#fbe9cf"
  },
  "witch-brew": {
    spookyMode: true, brutalMode: false, arcadeMode: false, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#07120b", sidebarColor: "#0f2216", cardColor: "#112619", bubbleColor: "#1d3b28",
    accentColor: "#9bf03a", secondaryColor: "#6a2a9c", textColor: "#e4f5d8"
  },  // Arcade packs: bright 8-bit look (own style, no other chat style)
  "sky-arcade": {
    arcadeMode: true, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#5c94fc", sidebarColor: "#b5502b", cardColor: "#fff3c4", bubbleColor: "#ffffff",
    accentColor: "#fbd000", secondaryColor: "#e52521", textColor: "#2b1b0e"
  },
  "castle-arcade": {
    arcadeMode: true, skeuoMode: false, cyberMode: false, ircMode: false,
    bgColor: "#3b3b46", sidebarColor: "#8a2323", cardColor: "#f1e6d0", bubbleColor: "#ffffff",
    accentColor: "#ff9a1f", secondaryColor: "#2f8f3a", textColor: "#241a12"
  },
  // Cyber packs also switch on Cyber Style (and switch off the other chat styles, which conflict with it)
  "cyber-hud": {
    cyberMode: true,
    skeuoMode: false,
    ircMode: false,
    bgColor: "#04080a",
    sidebarColor: "#060d10",
    cardColor: "#050b0e",
    bubbleColor: "#0b1d22",
    accentColor: "#19f0ff",
    secondaryColor: "#3dff9a",
    textColor: "#cdf8ff"
  },
  "night-city": {
    cyberMode: true,
    skeuoMode: false,
    ircMode: false,
    bgColor: "#0a0508",
    sidebarColor: "#10080d",
    cardColor: "#0c060a",
    bubbleColor: "#1f0c18",
    accentColor: "#ff2a6d",
    secondaryColor: "#f5e642",
    textColor: "#ffe9f1"
  },
  "olive-union": {
    cyberMode: true,
    skeuoMode: false,
    ircMode: false,
    bgColor: "#0e110c",
    sidebarColor: "#12160f",
    cardColor: "#0f130d",
    bubbleColor: "#1a2016",
    accentColor: "#d2dc86",
    secondaryColor: "#5ee0b8",
    textColor: "#e2e8c8"
  }
};

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

const colorKeys = ["bgColor", "sidebarColor", "cardColor", "bubbleColor", "accentColor", "secondaryColor", "textColor"];
const keys = Object.keys(defaultSettings);
const statusEl = document.getElementById("statusText");
const radiusValEl = document.getElementById("borderRadiusVal");
const presetChips = document.querySelectorAll(".preset-chip");

function setStatus(text, color = "#9ca3af") {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.style.color = color;
}

function showCategory(cat) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.cat === cat));
  document.querySelectorAll(".pane").forEach((pn) => pn.classList.toggle("on", pn.dataset.pane === cat));
}

document.querySelectorAll(".tab").forEach((t) => {
  t.addEventListener("click", () => showCategory(t.dataset.cat));
});

function syncPresetChips(activePreset) {
  let activeCat = "";
  presetChips.forEach((chip) => {
    const on = chip.dataset.preset === activePreset;
    chip.classList.toggle("active", on);
    if (on) activeCat = chip.dataset.cat;
  });
  // Open the category of the active preset (keep the current tab for "custom")
  if (activeCat) showCategory(activeCat);
  else if (!document.querySelector(".pane.on")) showCategory("classic");
}

function populateInputs(settings) {
  keys.forEach((key) => {
    const el = document.getElementById(key);
    if (!el) return;
    if (el.type === "checkbox") {
      el.checked = Boolean(settings[key]);
    } else {
      el.value = settings[key] ?? defaultSettings[key];
    }
  });
  if (radiusValEl) {
    radiusValEl.textContent = `${settings.borderRadius ?? 12}px`;
  }
  syncPresetChips(settings.themePreset);
}

function getCurrentSettingsFromInputs() {
  const result = { ...defaultSettings };
  keys.forEach((key) => {
    const el = document.getElementById(key);
    if (!el) return;
    if (el.type === "checkbox") {
      result[key] = el.checked;
    } else if (el.type === "range") {
      result[key] = Number(el.value);
    } else {
      result[key] = el.value;
    }
  });
  return result;
}

function pushSettingsToActiveTab(settings) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs && tabs[0];
    if (!activeTab || !activeTab.id) {
      setStatus("No active tab found", "#f87171");
      return;
    }

    chrome.tabs.sendMessage(
      activeTab.id,
      { type: "APPLY_CONVOSE_STYLES", settings },
      (res) => {
        if (!chrome.runtime.lastError && res && res.ok) {
          setStatus("Applied to active tab", "#4ade80");
          return;
        }

        if (chrome.scripting && chrome.scripting.executeScript) {
          chrome.scripting.executeScript(
            {
              target: { tabId: activeTab.id, allFrames: true },
              files: ["content.js"]
            },
            () => {
              if (chrome.runtime.lastError) {
                setStatus("Reload extension in edge://extensions", "#f87171");
              } else {
                chrome.tabs.sendMessage(activeTab.id, {
                  type: "APPLY_CONVOSE_STYLES",
                  settings
                });
                setStatus("Injected and applied to tab", "#4ade80");
              }
            }
          );
        }
      }
    );
  });
}

function saveAndPush(updated) {
  populateInputs(updated);
  chrome.storage.local.set(updated, () => {
    pushSettingsToActiveTab(updated);
  });
}

// Load saved settings into inputs and apply immediately
chrome.storage.local.get(defaultSettings, (settings) => {
  const merged = { ...defaultSettings, ...settings };
  populateInputs(merged);
  pushSettingsToActiveTab(merged);
});

// Handle preset dropdown change
const presetSelect = document.getElementById("themePreset");
if (presetSelect) {
  presetSelect.addEventListener("change", () => {
    const chosen = presetSelect.value;
    const current = getCurrentSettingsFromInputs();
    current.themePreset = chosen;
    if (THEME_PRESETS[chosen]) {
      Object.assign(current, { ircMode: false, cyberMode: false, skeuoMode: false, arcadeMode: false, brutalMode: false, spookyMode: false, spookyBlood: false }, THEME_PRESETS[chosen]);
    }
    saveAndPush(current);
  });
}

// Handle quick preset chip clicks
presetChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const chosen = chip.dataset.preset;
    if (!chosen || !THEME_PRESETS[chosen]) return;
    const current = getCurrentSettingsFromInputs();
    current.themePreset = chosen;
    Object.assign(current, { ircMode: false, cyberMode: false, skeuoMode: false, arcadeMode: false, brutalMode: false, spookyMode: false, spookyBlood: false }, THEME_PRESETS[chosen]);
    saveAndPush(current);
  });
});

// Handle individual input changes
keys.forEach((key) => {
  if (key === "themePreset") return;
  const el = document.getElementById(key);
  if (!el) return;

  el.addEventListener("input", () => {
    const updated = getCurrentSettingsFromInputs();
    if (colorKeys.includes(key)) {
      updated.themePreset = "custom";
    }
    // IRC, Cyber and Skeuomorphic are three different chat looks: only one can be on
    const modeKeys = ["ircMode", "cyberMode", "skeuoMode", "arcadeMode", "brutalMode", "spookyMode"];
    if (modeKeys.includes(key) && updated[key]) {
      modeKeys.forEach((k) => {
        if (k !== key) updated[k] = false;
      });
    }
    saveAndPush(updated);
  });
});

// Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
  saveAndPush({ ...defaultSettings });
});
