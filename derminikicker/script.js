// ----- CONFIG -----
const SEASON = 2025; // falls schon neue Saison -> anpassen
const LEAGUE = 'bl1'; // 1. Bundesliga
const MATCH_API = `https://api.openligadb.de/getmatchdata/${LEAGUE}/${SEASON}`;
const TABLE_API = `https://api.openligadb.de/getbltable/${LEAGUE}/${SEASON}`;

// ----- HILFSFUNKTIONEN -----
function formatTime(isoString) {
  const date = new Date(isoString);
  // deutsche Zeit
  return date.toLocaleString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ----- SPIELE LADEN -----
async function ladeSpiele() {
  const container = document.getElementById('matches');
  try {
    const res = await fetch(MATCH_API);
    if (!res.ok) throw new Error(res.status);
    const matches = await res.json();

    // nur zukünftige oder laufende Spiele (ohne fertiges Endergebnis)
    const upcoming = matches.filter(m => {
      const end = m.MatchResults?.find(r => r.ResultName === 'Endergebnis');
      return !end; // kein Endergebnis = läuft oder kommt noch
    });

    if (upcoming.length === 0) {
      container.textContent = 'Keine kommenden Spiele gefunden.';
      return;
    }

    container.innerHTML = upcoming.slice(0,10).map(m => {
      const t1 = m.Team1.TeamName;
      const t2 = m.Team2.TeamName;
      const time = formatTime(m.MatchDateTime);
      return `
        <div class="match">
          <span class="team">${t1}</span>
          <span class="time">${time}</span>
          <span class="team">${t2}</span>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error(err);
    container.textContent = 'Fehler beim Laden der Spiele.';
  }
}

// ----- TABELLE LADEN -----
async function ladeTabelle() {
  const tbody = document.querySelector('#table tbody');
  try {
    const res = await fetch(TABLE_API);
    if (!res.ok) throw new Error(res.status);
    const table = await res.json();

    tbody.innerHTML = table.map((team, i) => `
      <tr>
        <td>${i+1}</td>
        <td>${team.TeamName}</td>
        <td>${team.Matches}</td>
        <td>${team.Won}</td>
        <td>${team.Draw}</td>
        <td>${team.Lost}</td>
        <td>${team.Goals}:${team.OpponentGoals}</td>
        <td>${team.GoalDiff}</td>
        <td>${team.Points}</td>
      </tr>
    `).join('');

  } catch (err) {
    console.error(err);
    tbody.innerHTML = '<tr><td colspan="9">Fehler beim Laden der Tabelle</td></tr>';
  }
}

// ----- START -----
document.addEventListener('DOMContentLoaded', () => {
  ladeSpiele();
  ladeTabelle();
});
