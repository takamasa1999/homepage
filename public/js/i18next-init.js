const SUPPORTED = ["en", "ja"];

function translateNode(el) {
  const attrSpec = el.getAttribute("data-i18n-attr");
  if (attrSpec) {
    attrSpec.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, i18next.t(key));
    });
  }

  const key = el.getAttribute("data-i18n");
  if (key) el.innerHTML = i18next.t(key);
}

function updateContent() {
  document
    .querySelectorAll("[data-i18n], [data-i18n-attr]")
    .forEach(translateNode);

  document.title = i18next.t("meta.title");
  document.documentElement.setAttribute("lang", i18next.language);

  // その時点の実際の言語を保存
  localStorage.setItem("lang", i18next.language);

  applyRainbow();
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    // URL・LS を同期 → 表示更新
    const url = new URL(window.location);
    url.searchParams.set("lang", lng);
    window.history.replaceState({}, "", url);
    localStorage.setItem("lang", lng);

    updateContent();
  });
}

function setLanguageParam() {
  const storedLang = localStorage.getItem("lang");
  const isStoredLangSupported = SUPPORTED.includes(storedLang);

  const url = new URL(window.location);
  if (isStoredLangSupported) {
    url.searchParams.set("lang", storedLang);
  } else {
    const locale = navigator.language || navigator.userLanguage;
    const isJapanese = (locale || "").toLowerCase().startsWith("ja");
    url.searchParams.set("lang", isJapanese ? "ja" : "en");
  }
  window.history.replaceState({}, "", url);
}

setLanguageParam();

// Detect language from the search parameter
const params = new URLSearchParams(location.search);
const qsLng = (params.get("lng") || params.get("lang") || "").toLowerCase();
const chosenLng = SUPPORTED.includes(qsLng) ? qsLng : "en";

i18next.init(
  {
    lng: chosenLng,
    debug: true,
    interpolation: { escapeValue: false },
    resources: i18nextResources,
  },
  (err) => {
    if (err) return console.error(err);
    // init時点の i18next.language を保存＆反映
    updateContent();
  },
);
