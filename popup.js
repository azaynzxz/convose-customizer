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
  // Cyber packs also switch on Cyber Style (and switch off IRC style, which conflicts with it)
  "cyber-hud": {
    cyberMode: true,
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

function syncPresetChips(activePreset) {
  presetChips.forEach((chip) => {
    if (chip.dataset.preset === activePreset) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
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
      Object.assign(current, THEME_PRESETS[chosen]);
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
    Object.assign(current, THEME_PRESETS[chosen]);
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
    // IRC style and Cyber style are two different chat looks: only one can be on
    if (key === "cyberMode" && updated.cyberMode) updated.ircMode = false;
    if (key === "ircMode" && updated.ircMode) updated.cyberMode = false;
    saveAndPush(updated);
  });
});

// Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
  saveAndPush({ ...defaultSettings });
});
