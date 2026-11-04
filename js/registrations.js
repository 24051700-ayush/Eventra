/* My Registrations: read from + delete from Local Storage */
const listEl = document.getElementById("list");
function render() {
  const regs = getRegistrations().slice().reverse();
  if (!regs.length) { listEl.innerHTML = `<div class="empty"><b>🎟️</b><h3>No registrations yet</h3><p>Register for an event and it will show up here.</p><br><a class="btn" href="events.html">Browse events</a></div>`; return; }
  listEl.innerHTML = regs.map(r => {
    const ev = EVENTS.find(e => e.id === r.eventId); if (!ev) return "";
    return `<div class="reg reveal in"><img src="${coverArt(ev)}" alt="">
      <div><h3><a href="event.html?id=${ev.id}">${escapeHTML(ev.name)}</a></h3>
        <p class="meta">📅 ${fmtDate(ev.date)} · ${fmtTime(ev.date)}</p><p class="meta">📍 ${escapeHTML(ev.venue)}</p>
        <p class="meta">👤 ${escapeHTML(r.name)} · ${escapeHTML(r.email)} · ${r.tickets} ticket${r.tickets > 1 ? "s" : ""} · ${fmtPrice(r.total)}</p>
        <span class="code">${r.code}</span></div>
      <button class="btn btn-danger btn-sm" data-code="${r.code}">Cancel</button></div>`;
  }).join("");
}
listEl.addEventListener("click", e => {
  const b = e.target.closest("button[data-code]"); if (!b) return;
  if (!confirm("Cancel this registration?")) return;
  saveRegistrations(getRegistrations().filter(r => r.code !== b.dataset.code)); render(); toast("Registration cancelled.");
});
render();
