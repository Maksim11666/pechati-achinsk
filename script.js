const defaults = {
  brand: "Печати Ачинск",
  email: "griseko@yandex.ru",
  newPrice: "2 000 ₽ + оснастка",
  stampPrice: "1 000 ₽",
  restorePrice: "от 1 500 ₽"
};

const saved = JSON.parse(localStorage.getItem("pechatiAchinskConfig") || "null");
const config = {...defaults, ...(saved || {})};

function setText(key, value) {
  document.querySelectorAll(`[data-edit="${key}"]`).forEach(el => {
    el.textContent = value;
    if (el.tagName === "A" && key === "email") el.href = `mailto:${value}`;
  });
}

function applyConfig() {
  setText("brand", config.brand);
  setText("email", config.email);
  document.title = `${config.brand} — изготовление печатей в Ачинске`;
  document.querySelectorAll(".price").forEach((el, i) => {
    if (i === 0) el.firstChild.textContent = config.newPrice + " ";
    if (i === 1) el.firstChild.textContent = config.stampPrice + " ";
    if (i === 2) el.firstChild.textContent = config.restorePrice + " ";
  });
  document.getElementById("brandInput").value = config.brand;
  document.getElementById("emailInput").value = config.email;
  document.getElementById("newPriceInput").value = config.newPrice;
  document.getElementById("stampPriceInput").value = config.stampPrice;
  document.getElementById("restorePriceInput").value = config.restorePrice;
}

document.getElementById("year").textContent = new Date().getFullYear();
applyConfig();

const panel = document.getElementById("editPanel");
document.getElementById("editToggle").onclick = () => panel.classList.toggle("open");
document.getElementById("closeEdit").onclick = () => panel.classList.remove("open");

document.getElementById("saveEdits").onclick = () => {
  config.brand = document.getElementById("brandInput").value.trim() || defaults.brand;
  config.email = document.getElementById("emailInput").value.trim() || defaults.email;
  config.newPrice = document.getElementById("newPriceInput").value.trim() || defaults.newPrice;
  config.stampPrice = document.getElementById("stampPriceInput").value.trim() || defaults.stampPrice;
  config.restorePrice = document.getElementById("restorePriceInput").value.trim() || defaults.restorePrice;
  localStorage.setItem("pechatiAchinskConfig", JSON.stringify(config));
  applyConfig();
  panel.classList.remove("open");
  alert("Изменения сохранены в этом браузере.");
};

document.getElementById("resetEdits").onclick = () => {
  localStorage.removeItem("pechatiAchinskConfig");
  location.reload();
};
