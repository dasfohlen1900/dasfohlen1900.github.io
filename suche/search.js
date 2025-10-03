let indexData = {};

// Index laden
fetch("index.json")
  .then(res => res.json())
  .then(data => indexData = data)
  .catch(err => console.error("Index konnte nicht geladen werden:", err));

document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase().trim();
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  if (!query) {
    resultsContainer.innerHTML = "<li>Bitte Suchbegriff eingeben</li>";
    return;
  }

  const results = Object.entries(indexData)
    .filter(([url, text]) => text.toLowerCase().includes(query))
    .map(([url, text]) => url);

  if (results.length === 0) {
    resultsContainer.innerHTML = "<li>Keine Treffer gefunden</li>";
  } else {
    results.forEach(url => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${url}">${url}</a>`;
      resultsContainer.appendChild(li);
    });
  }
});

// Optional: Enter-Taste im Eingabefeld unterstützt Suche
document.getElementById("search-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") document.getElementById("search-btn").click();
});
