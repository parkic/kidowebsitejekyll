function setLanguage(lang) {
  console.log("test", lang);
  localStorage.setItem("lang", lang);

  fetch(`lang/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");

        const keyParts = key.split(".");
        let value = data;

        keyParts.forEach((part) => {
          value = value ? value[part] : undefined;
        });

        if (value !== undefined) {
          el.innerHTML = value;
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
});
