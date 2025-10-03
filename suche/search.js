let indexData = {};

// Index laden
fetch("index.json")
  .then(res => res.json())
  .then(data => indexData = data)
  .catch(err => console.error("Index konnte nicht geladen werden:", err));

const input = document.getElementById("search-input");
const btn = document.getElementById("search-btn");
const resultsContainer = document.getElementById("search-results");

function runSearch() {
  const query = input.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (!query) {
    resultsContainer.innerHTML = "<li>Bitte Suchbegriff eingeben</li>";
    return;
  }

  const results = Object.entries(indexData)
    .filter(([url, text]) => text.toLowerCase().includes(query))
    .map(([url]) => url);

  if (results.length === 0) {
    resultsContainer.innerHTML = "<li>Keine Treffer gefunden</li>";
  } else {
    results.forEach(url => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${url}" style="
          text-decoration: none;
          color: #1a73e8;
          padding: 8px 12px;
          display: block;
          border-radius: 6px;
          transition: background 0.2s;
      ">${url}</a>`;
      li.querySelector("a").addEventListener("mouseover", () => li.querySelector("a").style.background = "#dbeafe");
      li.querySelector("a").addEventListener("mouseout", () => li.querySelector("a").style.background = "transparent");
      resultsContainer.appendChild(li);
    });
  }
}

// Button-Klick
btn.addEventListener("click", runSearch);

// Enter-Taste im Input
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") runSearch();
});
