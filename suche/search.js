let indexData = {};
const input = document.getElementById("search-input");
const btn = document.getElementById("search-btn");
const resultsContainer = document.getElementById("search-results");

// Index laden
fetch("index.json")
  .then(res => res.json())
  .then(data => indexData = data)
  .catch(err => console.error("Index konnte nicht geladen werden:", err));

function runSearch() {
  const query = input.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (!query) {
    resultsContainer.innerHTML = "<li>Bitte Suchbegriff eingeben</li>";
    return;
  }

  const results = Object.entries(indexData)
    .filter(([url, entry]) => {
      const text = (entry.title + " " + entry.desc + " " + (entry.keywords || []).join(" ")).toLowerCase();
      return text.includes(query);
    });

  if (results.length === 0) {
    resultsContainer.innerHTML = "<li>Keine Treffer gefunden</li>";
  } else {
    results.forEach(([url, entry]) => {
      const li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.marginBottom = "8px";

      const a = document.createElement("a");
      a.href = "/" + url; // Root-Pfad
      a.style.display = "block";
      a.style.padding = "8px 12px";
      a.style.borderRadius = "6px";
      a.style.textDecoration = "none";
      a.style.color = "#1a73e8";
      a.style.transition = "background 0.2s";

      // Text + Premium
      a.innerHTML = entry.title + (entry.premium ? " 👑" : "") + "<br><small style='color:#6b7280;'>" + entry.desc + "</small>";

      // Hover-Effekt wie vorher
      a.addEventListener("mouseover", () => a.style.background = "#dbeafe");
      a.addEventListener("mouseout", () => a.style.background = "transparent");

      li.appendChild(a);
      resultsContainer.appendChild(li);
    });
  }
}

// Button-Klick
btn.addEventListener("click", runSearch);

// Enter-Taste
input.addEventListener("keypress", e => {
  if (e.key === "Enter") runSearch();
});
