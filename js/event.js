/* Event detail + registration form with validation */
const root = document.getElementById("detailRoot");
const id = parseInt(new URLSearchParams(location.search).get("id"), 10);
const ev = EVENTS.find(e => e.id === id);

if (!ev) {
  root.innerHTML = `<div class="empty" style="padding:100px 0"><b>🔍</b><h2>Event not found</h2><p>The event you're looking for doesn't exist.</p><br><a class="btn" href="events.html">Browse events</a></div>`;
} else {
  document.title = ev.name + " — Eventra";
  const left = seatsLeft(ev), pct = Math.round(((ev.capacity - left) / ev.capacity) * 100);
  const opts = EVENTS.map(e => `<option value="${e.id}" ${e.id === ev.id ? "selected" : ""}>${escapeHTML(e.name)}</option>`).join("");
  root.innerHTML = `
  <div class="detail">
    <div>
      <div class="detail-hero"><img src="${coverArt(ev)}" alt="${escapeHTML(ev.name)}"></div>
      <span class="eyebrow" style="margin:24px 0 0">${ev.category}</span>
      <h1>${escapeHTML(ev.name)}</h1>
      <div class="info-grid">
        <div class="info"><div class="i">📅</div><div><small>Date</small><b>${fmtDate(ev.date)}</b></div></div>
        <div class="info"><div class="i">🕒</div><div><small>Time</small><b>${fmtTime(ev.date)}</b></div></div>
        <div class="info"><div class="i">📍</div><div><small>Venue</small><b>${escapeHTML(ev.venue)}</b></div></div>
        <div class="info"><div class="i">💰</div><div><small>Price</small><b>${fmtPrice(ev.price)}</b></div></div>
      </div>
      <h2>About this event</h2><p class="long">${escapeHTML(ev.description)}</p>
      <h2>Highlights</h2><ul class="highlights">${ev.highlights.map(h => `<li>${escapeHTML(h)}</li>`).join("")}</ul>
    </div>

    <aside class="side">
      <div class="panel"><h3>Starts in</h3><div class="countdown" id="cd" style="margin-top:14px"></div>
        <div class="seats"><b id="seatText">${left} seats left</b><div class="bar"><i id="seatBar" style="width:${pct}%"></i></div><small>${pct}% booked</small></div></div>

      <div class="panel" id="formPanel">
        <h3>Register now</h3><p class="sub">Fill in your details to secure your spot.</p>
        <form id="regForm" novalidate>
          <div class="field"><label for="name">Full name</label><input id="name" name="name" type="text" placeholder="e.g. Aarav Sharma" autocomplete="name"><div class="error"></div></div>
          <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" autocomplete="email"><div class="error"></div></div>
          <div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="10-digit mobile number" autocomplete="tel" maxlength="14"><div class="error"></div></div>
          <div class="form-row">
            <div class="field"><label for="event">Selected event</label><select id="event" name="event">${opts}</select><div class="error"></div></div>
            <div class="field"><label for="tickets">Tickets</label><input id="tickets" name="tickets" type="number" min="1" max="10" value="1"><div class="error"></div></div>
          </div>
          <label class="check"><input type="checkbox" id="terms"> <span>I agree to the terms &amp; conditions and confirm the details above are correct.</span></label>
          <div class="field" id="termsField" style="margin-top:-10px"><div class="error">Please accept the terms to continue.</div></div>
          <div class="total"><span>Total</span><span id="total">${fmtPrice(ev.price)}</span></div>
          <button type="submit" class="btn btn-block" id="submitBtn">Confirm Registration</button>
        </form>
      </div>
    </aside>
  </div>`;

  startCountdown(ev.date, c => { document.getElementById("cd").innerHTML = c.done ? "<p>This event has started!</p>" : countdownHTML(c); });
  if (left === 0) { const b = document.getElementById("submitBtn"); b.disabled = true; b.textContent = "Sold out"; }

  const form = document.getElementById("regForm");
  const F = { name: form.name, email: form.email, phone: form.phone, event: form.event, tickets: form.tickets };
  const currentEvent = () => EVENTS.find(e => e.id === +F.event.value);

  /* ---- Validators: return an error string, or "" if valid ---- */
  const validators = {
    name: v => { v = v.trim(); if (!v) return "Please enter your full name."; if (v.length < 3) return "Name must be at least 3 characters."; if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) return "Name can only contain letters and spaces."; return ""; },
    email: v => { v = v.trim(); if (!v) return "Please enter your email address."; if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v)) return "Enter a valid email like name@example.com."; return ""; },
    phone: v => { const d = v.replace(/[\s-]/g, "").replace(/^(\+91|0)/, ""); if (!v.trim()) return "Please enter your phone number."; if (!/^\d+$/.test(d)) return "Phone number can only contain digits."; if (!/^[6-9]\d{9}$/.test(d)) return "Enter a valid 10-digit mobile number (starts with 6-9)."; return ""; },
    event: v => (v ? "" : "Please select an event."),
    tickets: v => { const n = Number(v); if (!Number.isInteger(n) || n < 1) return "Enter at least 1 ticket."; if (n > 10) return "Maximum 10 tickets per booking."; if (n > seatsLeft(currentEvent())) return `Only ${seatsLeft(currentEvent())} seats left for this event.`; return ""; },
  };
  function check(key) {
    const el = F[key], msg = validators[key](el.value), field = el.closest(".field");
    field.classList.toggle("invalid", !!msg); field.classList.toggle("valid", !msg);
    field.querySelector(".error").textContent = msg; return !msg;
  }
  Object.keys(F).forEach(k => { F[k].addEventListener("blur", () => check(k)); F[k].addEventListener("input", () => { if (F[k].closest(".field").classList.contains("invalid")) check(k); updateTotal(); }); });
  const updateTotal = () => { const n = Math.max(1, parseInt(F.tickets.value) || 1); document.getElementById("total").textContent = fmtPrice(currentEvent().price * n); };
  F.event.addEventListener("change", () => { if (+F.event.value !== ev.id) history.replaceState(null, "", "event.html?id=" + F.event.value); updateTotal(); });

  const terms = document.getElementById("terms"), termsField = document.getElementById("termsField");
  terms.addEventListener("change", () => termsField.classList.toggle("invalid", !terms.checked));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const results = Object.keys(F).map(check);
    termsField.classList.toggle("invalid", !terms.checked);
    if (results.includes(false) || !terms.checked) { const bad = form.querySelector(".invalid input, .invalid select"); if (bad) bad.focus(); toast("Please fix the highlighted fields."); return; }

    const chosen = currentEvent(), tickets = parseInt(F.tickets.value, 10), email = F.email.value.trim().toLowerCase();
    if (getRegistrations().some(r => r.eventId === chosen.id && r.email === email)) {
      const f = F.email.closest(".field"); f.classList.add("invalid"); f.classList.remove("valid"); f.querySelector(".error").textContent = "This email is already registered for this event."; F.email.focus(); return;
    }
    const reg = { code: "EVT-" + Math.random().toString(36).slice(2, 8).toUpperCase(), eventId: chosen.id, name: F.name.value.trim(), email, phone: F.phone.value.trim(), tickets, total: chosen.price * tickets, at: new Date().toISOString() };
    const all = getRegistrations(); all.push(reg); saveRegistrations(all);

    // Confirmation message
    document.getElementById("formPanel").innerHTML = `
      <div class="success"><div class="tick">✓</div><h3>You're registered! 🎉</h3>
      <p class="sub">Thank you, <b>${escapeHTML(reg.name)}</b>. A confirmation has been sent to <b>${escapeHTML(reg.email)}</b>.</p>
      <div class="ticket">
        <div><span>Booking ID</span><b>${reg.code}</b></div><div><span>Event</span><b>${escapeHTML(chosen.name)}</b></div>
        <div><span>Date</span><b>${fmtDate(chosen.date)}</b></div><div><span>Tickets</span><b>${tickets}</b></div><div><span>Total paid</span><b>${fmtPrice(reg.total)}</b></div>
      </div>
      <a href="registrations.html" class="btn btn-block">View my registrations</a>
      <a href="events.html" class="btn btn-ghost btn-block" style="margin-top:10px">Explore more events</a></div>`;
    const l = seatsLeft(ev), p = Math.round(((ev.capacity - l) / ev.capacity) * 100);
    document.getElementById("seatText").textContent = l + " seats left"; document.getElementById("seatBar").style.width = p + "%";
    toast("Registration successful! 🎉");
  });
}
