/* Home page logic */
const upcoming = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));
const CATS = ["All", ...new Set(EVENTS.map(e => e.category))];
const CAT_ICONS = { Music: "🎵", Tech: "💻", Business: "💼", Art: "🎨", Sports: "⚽", Workshop: "🛠️", Food: "🍔" };
let activeCat = "All";

// Featured
document.getElementById("featuredGrid").innerHTML = EVENTS.filter(e => e.featured).slice(0, 3).map(eventCard).join("");

// Category tiles
document.getElementById("catGrid").innerHTML = CATS.slice(1).map(c => {
  const [a, b] = CATEGORY_COLORS[c];
  return `<a class="cat reveal" href="events.html?cat=${c}" style="background:linear-gradient(135deg,${a},${b})"><span>${CAT_ICONS[c]}</span>${c}</a>`;
}).join("");

// Hero "next event" card with countdown
const nextEv = upcoming.find(e => new Date(e.date) > Date.now()) || upcoming[0];
const nc = document.getElementById("nextCard");
nc.href = `event.html?id=${nextEv.id}`;
nc.innerHTML = `<img src="${coverArt(nextEv)}" alt=""><div class="nc-body"><small>Next up</small><h3>${escapeHTML(nextEv.name)}</h3><div class="countdown" id="cd"></div></div>`;
startCountdown(nextEv.date, c => document.getElementById("cd").innerHTML = countdownHTML(c));

// Search + filter section
const filtersEl = document.getElementById("filters"), gridEl = document.getElementById("eventGrid"), searchEl = document.getElementById("search");
filtersEl.innerHTML = CATS.map(c => `<button class="filter-btn${c === "All" ? " active" : ""}" data-cat="${c}">${c}</button>`).join("");
function render() {
  const q = searchEl.value.trim().toLowerCase();
  const list = upcoming.filter(e => (activeCat === "All" || e.category === activeCat) && (e.name + e.venue + e.category + e.short).toLowerCase().includes(q)).slice(0, 6);
  gridEl.innerHTML = list.length ? list.map(eventCard).join("") : `<div class="empty"><b>😕</b>No events match your search.</div>`;
  observeReveals();
}
filtersEl.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; activeCat = b.dataset.cat; filtersEl.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b)); render(); });
searchEl.addEventListener("input", render);
render();
