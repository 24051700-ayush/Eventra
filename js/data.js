/* ===== Event data + shared helpers ===== */
const EVENTS = [
  { id: 1, name: "Neon Nights Music Festival", category: "Music", date: "2026-12-12T18:00", venue: "Biju Patnaik Stadium, Bhubaneswar", price: 799, capacity: 500, booked: 342, featured: true, icon: "🎵",
    short: "A 12-hour open-air festival with top indie bands and electronic DJs.",
    description: "Dance under the lights at Odisha's biggest open-air music festival. Three stages, 20+ artists, food trucks, art installations and a laser-light finale you will not forget.",
    highlights: ["20+ live acts across 3 stages", "Food court & craft market", "Laser light finale", "Free parking"] },
  { id: 2, name: "CodeCraft Hackathon 2027", category: "Tech", date: "2026-12-19T09:00", venue: "KIIT Campus 14, Bhubaneswar", price: 0, capacity: 300, booked: 221, featured: true, icon: "💻",
    short: "36 hours of building, mentoring and pitching. Cash prizes worth ₹2 lakh.",
    description: "Form a team of up to four and build something that matters. Mentors from top product companies, free meals, swag for every participant and a final demo day with industry judges.",
    highlights: ["36-hour build marathon", "Mentors from industry", "₹2,00,000 prize pool", "Meals & swag included"] },
  { id: 3, name: "Startup Pitch Summit", category: "Business", date: "2027-01-08T10:00", venue: "Mayfair Convention, Bhubaneswar", price: 499, capacity: 250, booked: 118, featured: true, icon: "🚀",
    short: "Founders, investors and builders under one roof for a day of pitches.",
    description: "Watch 25 early-stage startups pitch live to a panel of investors, attend fireside chats with unicorn founders and network at the investor lounge.",
    highlights: ["25 live startup pitches", "Investor networking lounge", "Fireside chats", "Pitch feedback booths"] },
  { id: 4, name: "Abstract Canvas Art Expo", category: "Art", date: "2027-01-15T11:00", venue: "Kalinga Art Gallery, Bhubaneswar", price: 150, capacity: 180, booked: 64, featured: false, icon: "🎨",
    short: "Contemporary paintings, sculpture and live painting by 40 artists.",
    description: "A weekend celebration of modern art. Walk through curated galleries, join live-painting sessions and pick up original pieces directly from the artists.",
    highlights: ["40 featured artists", "Live painting sessions", "Meet-the-artist hours", "Art for sale"] },
  { id: 5, name: "Inter-College Cricket Cup", category: "Sports", date: "2027-01-24T08:00", venue: "Barabati Ground, Cuttack", price: 100, capacity: 400, booked: 275, featured: false, icon: "🏏",
    short: "16 college teams, one trophy. Knockout T20 action all day long.",
    description: "Cheer for your college as 16 teams battle through the knockout rounds. Includes live commentary, a fan zone, and the grand final under floodlights.",
    highlights: ["16 teams, T20 format", "Fan zone & live commentary", "Floodlit final", "Refreshments available"] },
  { id: 6, name: "UI/UX Design Workshop", category: "Workshop", date: "2027-02-02T10:00", venue: "Design Lab, Infocity, Bhubaneswar", price: 350, capacity: 60, booked: 41, featured: false, icon: "✏️",
    short: "Hands-on Figma workshop: from wireframe to a clickable prototype.",
    description: "Learn the full design process in one day. Research, wireframes, visual design and prototyping, guided by senior designers. Bring your laptop!",
    highlights: ["Hands-on with Figma", "Portfolio-ready project", "Certificate of completion", "Small batch of 60"] },
  { id: 7, name: "Street Food Carnival", category: "Food", date: "2027-02-07T12:00", venue: "Janpath Market, Bhubaneswar", price: 99, capacity: 600, booked: 300, featured: false, icon: "🍜",
    short: "60+ stalls serving regional favourites, fusion bites and desserts.",
    description: "A foodie's paradise. Sample Odia classics, North-Eastern momos, Hyderabadi biryani and wild fusion creations. Includes cooking demos and eating contests.",
    highlights: ["60+ food stalls", "Live cooking demos", "Eating contests", "Kids' play area"] },
  { id: 8, name: "AI & Future Tech Conference", category: "Tech", date: "2027-02-20T09:30", venue: "KIIT Convention Centre", price: 999, capacity: 450, booked: 190, featured: true, icon: "🤖",
    short: "Talks, demos and panels on generative AI, robotics and the next decade.",
    description: "Two tracks, 30 speakers, and live demos of the newest AI tools. Perfect for students, engineers and curious minds who want to see where technology is going.",
    highlights: ["30 expert speakers", "Live AI demos", "Two parallel tracks", "Networking dinner"] },
  { id: 9, name: "Stand-Up Comedy Night", category: "Music", date: "2027-02-27T19:30", venue: "Utkal Auditorium, Bhubaneswar", price: 450, capacity: 220, booked: 205, featured: false, icon: "🎤",
    short: "An evening of laughs with five of India's sharpest stand-up comics.",
    description: "Relax and laugh your way through a two-hour show headlined by nationally touring comedians. Limited seating, so book early!",
    highlights: ["5 touring comedians", "2-hour live show", "Reserved seating", "Cafe on site"] },
  { id: 10, name: "Marathon for Green Earth", category: "Sports", date: "2027-03-07T05:30", venue: "Marine Drive, Puri", price: 250, capacity: 800, booked: 410, featured: false, icon: "🏃",
    short: "5K, 10K and half-marathon routes along the sea. Run for the planet.",
    description: "Lace up for a good cause. Every registration plants ten trees. Includes a finisher medal, tee, timing chip and a post-run breakfast on the beach.",
    highlights: ["5K / 10K / 21K routes", "Finisher medal & tee", "10 trees planted per runner", "Beach breakfast"] },
  { id: 11, name: "Digital Marketing Masterclass", category: "Business", date: "2027-03-13T10:00", venue: "Hotel Swosti Premium, Bhubaneswar", price: 599, capacity: 120, booked: 52, featured: false, icon: "📈",
    short: "SEO, social ads and analytics taught by agency leaders.",
    description: "A practical masterclass on growing a brand online. Includes live campaign teardowns, templates and one-on-one Q&A sessions.",
    highlights: ["Live campaign teardowns", "Templates & toolkits", "1:1 Q&A with experts", "Lunch included"] },
  { id: 12, name: "Heritage Dance Festival", category: "Art", date: "2027-03-21T17:00", venue: "Konark Sun Temple Arena", price: 300, capacity: 350, booked: 140, featured: false, icon: "💃",
    short: "Classical Odissi and folk performances against a temple backdrop.",
    description: "Experience centuries of tradition in a spectacular setting. Renowned dancers perform Odissi, Chhau and folk dances at sunset, with cultural exhibits all evening.",
    highlights: ["Odissi, Chhau & folk", "Sunset temple backdrop", "Cultural exhibits", "Traditional dinner"] },
];

const CATEGORY_COLORS = {
  Music: ["#ec4899", "#8b5cf6"], Tech: ["#06b6d4", "#3b82f6"], Business: ["#f59e0b", "#ef4444"],
  Art: ["#f43f5e", "#f97316"], Sports: ["#10b981", "#06b6d4"], Workshop: ["#6366f1", "#a855f7"],
  Food: ["#f97316", "#eab308"],
};

/* Generates a unique SVG cover image for each event (no external images needed) */
function coverArt(ev) {
  const [c1, c2] = CATEGORY_COLORS[ev.category] || ["#6366f1", "#ec4899"];
  let s = ev.id * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let shapes = "";
  for (let i = 0; i < 7; i++) {
    const x = Math.round(rnd() * 400), y = Math.round(rnd() * 260), r = 25 + Math.round(rnd() * 70);
    shapes += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${(0.06 + rnd() * 0.12).toFixed(2)}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <rect width="400" height="260" fill="url(#g)"/>${shapes}
  <text x="200" y="165" font-size="96" text-anchor="middle" style="filter:drop-shadow(0 6px 10px rgba(0,0,0,.25))">${ev.icon}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ---------- Local Storage helpers ---------- */
const STORE_KEY = "eventra_registrations";
function getRegistrations() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; } }
function saveRegistrations(list) { try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch {} }
function seatsLeft(ev) {
  const extra = getRegistrations().filter(r => r.eventId === ev.id).reduce((n, r) => n + r.tickets, 0);
  return Math.max(0, ev.capacity - ev.booked - extra);
}

/* ---------- Formatting ---------- */
const fmtDate = d => new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const fmtTime = d => new Date(d).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
const fmtPrice = p => (p === 0 ? "Free" : "₹" + p.toLocaleString("en-IN"));
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function eventCard(ev) {
  const left = seatsLeft(ev), d = new Date(ev.date);
  const badge = left === 0 ? `<span class="badge badge-sold">Sold out</span>` : left <= 30 ? `<span class="badge badge-low">Only ${left} left</span>` : "";
  return `<article class="card reveal">
    <a class="card-img" href="event.html?id=${ev.id}" aria-label="View ${escapeHTML(ev.name)}">
      <img src="${coverArt(ev)}" alt="${escapeHTML(ev.name)} cover" loading="lazy">
      <span class="chip">${ev.category}</span>${badge}
      <div class="date-tile"><b>${d.getDate()}</b><span>${d.toLocaleString("en-IN", { month: "short" })}</span></div>
    </a>
    <div class="card-body">
      <h3><a href="event.html?id=${ev.id}">${escapeHTML(ev.name)}</a></h3>
      <p class="meta">📍 ${escapeHTML(ev.venue)}</p>
      <p class="meta">🕒 ${fmtDate(ev.date)} · ${fmtTime(ev.date)}</p>
      <p class="desc">${escapeHTML(ev.short)}</p>
      <div class="card-foot"><strong class="price">${fmtPrice(ev.price)}</strong>
        <a class="btn btn-sm" href="event.html?id=${ev.id}">View &amp; Register →</a></div>
    </div></article>`;
}
