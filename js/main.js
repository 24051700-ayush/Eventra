/* ===== Shared: header, footer, theme, scroll effects ===== */
(function () {
  const page = document.body.dataset.page;
  const links = [["index.html", "Home", "home"], ["events.html", "Events", "events"], ["registrations.html", "My Registrations", "regs"]];
  const header = `
  <header class="site-header" id="header">
    <div class="container nav">
      <a href="index.html" class="logo"><span class="logo-mark">✦</span>Eventra</a>
      <nav id="nav" class="nav-links" aria-label="Main">
        ${links.map(l => `<a href="${l[0]}" class="${page === l[2] ? "active" : ""}">${l[1]}</a>`).join("")}
        <a href="events.html" class="btn btn-sm nav-cta">Register Now</a>
      </nav>
      <div class="nav-actions">
        <button id="themeToggle" class="icon-btn" aria-label="Toggle dark mode" title="Toggle theme">🌙</button>
        <button id="menuBtn" class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>`;
  const footer = `
  <footer class="site-footer"><div class="container foot-grid">
    <div><a href="index.html" class="logo"><span class="logo-mark">✦</span>Eventra</a>
      <p>Discover, join and enjoy the best events in your city. Built with HTML, CSS &amp; JavaScript.</p></div>
    <div><h4>Explore</h4><a href="index.html">Home</a><a href="events.html">All Events</a><a href="registrations.html">My Registrations</a></div>
    <div><h4>Categories</h4><a href="events.html?cat=Music">Music</a><a href="events.html?cat=Tech">Tech</a><a href="events.html?cat=Sports">Sports</a><a href="events.html?cat=Art">Art</a></div>
    <div><h4>Contact</h4><p>📧 hello@eventra.example<br>📞 +91 98765 43210<br>📍 Bhubaneswar, India</p></div>
  </div><div class="container copy">© <span id="yr"></span> Eventra. All rights reserved.</div></footer>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>`;
  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);
  document.getElementById("yr").textContent = new Date().getFullYear();

  // Theme
  const root = document.documentElement, btn = document.getElementById("themeToggle");
  const setTheme = t => { root.dataset.theme = t; btn.textContent = t === "dark" ? "☀️" : "🌙"; try { localStorage.setItem("eventra_theme", t); } catch {} };
  let saved = null; try { saved = localStorage.getItem("eventra_theme"); } catch {}
  setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  btn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // Mobile menu
  const menu = document.getElementById("menuBtn"), nav = document.getElementById("nav");
  menu.addEventListener("click", () => { const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", o); menu.textContent = o ? "✕" : "☰"; });

  // Header shadow on scroll
  const hdr = document.getElementById("header");
  const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();

function toast(msg) {
  const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3000);
}

/* Reveal-on-scroll animation (call after rendering cards) */
function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* Countdown: calls cb({d,h,m,s,done}) every second */
function startCountdown(dateStr, cb) {
  const target = new Date(dateStr).getTime();
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) return cb({ d: 0, h: 0, m: 0, s: 0, done: true });
    cb({ d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60, done: false });
  };
  tick(); return setInterval(tick, 1000);
}
const countdownHTML = c => ["d:Days", "h:Hours", "m:Mins", "s:Secs"].map(k => { const [a, l] = k.split(":"); return `<div class="cd-box"><b>${String(c[a]).padStart(2, "0")}</b><span>${l}</span></div>`; }).join("");
document.addEventListener("DOMContentLoaded", observeReveals);
