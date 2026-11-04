/* Events listing: search + category filter + sort */
const CATS2 = ["All", ...new Set(EVENTS.map(e => e.category))];
const params = new URLSearchParams(location.search);
let cat = CATS2.includes(params.get("cat")) ? params.get("cat") : "All";
const fEl = document.getElementById("filters"), g = document.getElementById("eventGrid"), s = document.getElementById("search"), so = document.getElementById("sort"), cnt = document.getElementById("count");
function paintFilters() { fEl.innerHTML = CATS2.map(c => `<button class="filter-btn${c === cat ? " active" : ""}" data-cat="${c}">${c}</button>`).join(""); }
function render() {
  const q = s.value.trim().toLowerCase();
  let list = EVENTS.filter(e => (cat === "All" || e.category === cat) && (e.name + e.venue + e.category + e.short + e.description).toLowerCase().includes(q));
  const sorters = { date: (a, b) => new Date(a.date) - new Date(b.date), priceLow: (a, b) => a.price - b.price, priceHigh: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name) };
  list.sort(sorters[so.value]);
  cnt.textContent = `Showing ${list.length} event${list.length === 1 ? "" : "s"}${cat !== "All" ? " in " + cat : ""}`;
  g.innerHTML = list.length ? list.map(eventCard).join("") : `<div class="empty"><b>😕</b><h3>No events found</h3><p>Try a different keyword or category.</p></div>`;
  observeReveals();
}
fEl.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; cat = b.dataset.cat; paintFilters(); render(); });
s.addEventListener("input", render); so.addEventListener("change", render);
paintFilters(); render();
