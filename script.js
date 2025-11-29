const page = document.querySelector('.page');
const yearEl = document.getElementById('year');
const card = document.getElementById('card');
const clapCountEl = document.getElementById('clapCount');
const themeToggle = document.querySelector('.theme-toggle');

yearEl.textContent = new Date().getFullYear();

const socials = document.querySelector('.socials');
if (socials) socials.remove();
const formEl = document.getElementById('waitlist');
if (formEl) formEl.remove();

let raf = null;
page.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  const rotateX = y * -6;
  const rotateY = x * 6;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});
page.addEventListener('mouseleave', () => {
  card.style.transform = 'none';
});

const resetFlag = localStorage.getItem('cheersResetDone');
if (!resetFlag) {
  localStorage.removeItem('cheers');
  localStorage.setItem('cheersResetDone', '1');
}
let cheers = Number(localStorage.getItem('cheers') || 0);
clapCountEl.textContent = cheers;
const cheerBtn = document.getElementById('cheerBtn');
cheerBtn.addEventListener('click', () => {
  spawnCardBurst();
  cheerBtn.classList.add('pop');
  setTimeout(() => cheerBtn.classList.remove('pop'), 260);
  cheers += 1;
  clapCountEl.textContent = cheers;
  localStorage.setItem('cheers', cheers);
});

function spawnCardBurst(count = 36) {
  const rect = card.getBoundingClientRect();
  const emojis = ['🎉','✨','💥','🔥','💫','💖','👏','🥳','🪄','🌟','🎊','🚀'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const startX = rect.left + Math.random() * rect.width;
    const startY = rect.top + Math.random() * rect.height;
    el.style.left = startX + 'px';
    el.style.top = startY + 'px';
    const dx = (Math.random() - 0.5) * rect.width * 0.6;
    const dy = - (20 + Math.random() * rect.height * 0.5);
    const rot = (Math.random() - 0.5) * 120 + 'deg';
    const dur = 700 + Math.random() * 900 + 'ms';
    el.style.setProperty('--dx', dx + 'px');
    el.style.setProperty('--dy', dy + 'px');
    el.style.setProperty('--rot', rot);
    el.style.setProperty('--dur', dur);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const state = {
  theme: localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light')
};
applyTheme(state.theme);
updateGlyph();
themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', state.theme);
  applyTheme(state.theme);
  updateGlyph();
});

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'light') {
    root.style.setProperty('--bg', '#f5f7fb');
    root.style.setProperty('--fg', '#111318');
    root.style.setProperty('--muted', '#535b66');
    root.style.setProperty('--border', 'rgba(0,0,0,0.12)');
    root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.6)');
  } else {
    root.style.setProperty('--bg', '#0b0f1a');
    root.style.setProperty('--fg', '#e6e8eb');
    root.style.setProperty('--muted', '#9aa1a9');
    root.style.setProperty('--border', 'rgba(255,255,255,0.12)');
    root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.08)');
  }
}

function updateGlyph() {
  const glyph = themeToggle.querySelector('.glyph');
  if (!glyph) return;
  glyph.textContent = state.theme === 'dark' ? '🌙' : '☀️';
}