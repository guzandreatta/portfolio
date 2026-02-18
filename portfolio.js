// ─── DATA ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'designer2025';
const SITE_PASSWORD  = 'portfolio2025';

// ─── SITE GATE ───────────────────────────────────────────────────────────
function gateUnlock() {
  const val = document.getElementById('gate-pwd').value;
  if (val === SITE_PASSWORD) {
    sessionStorage.setItem('ga_unlocked', '1');
    const gate = document.getElementById('site-gate');
    gate.classList.add('unlocked');
    document.body.classList.remove('gated');
    setTimeout(() => gate.remove(), 600);
  } else {
    document.getElementById('gate-error').style.display = 'block';
    document.getElementById('gate-pwd').value = '';
    document.getElementById('gate-pwd').focus();
  }
}

function initGate() {
  if (sessionStorage.getItem('ga_unlocked') === '1') {
    const gate = document.getElementById('site-gate');
    if (gate) gate.remove();
    document.body.classList.remove('gated');
  } else {
    document.body.classList.add('gated');
    setTimeout(() => document.getElementById('gate-pwd').focus(), 100);
  }
}

const defaultFonts = {
  embed: '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">',
  display: 'Bebas Neue',
  serif: 'DM Serif Display',
  body: 'DM Sans'
};

const defaultCases = [
  {
    id: 1,
    title: 'Revamping the Onboarding Experience',
    client: 'Fintech SaaS — 2023',
    summary: 'Reduced time-to-value by 60% through a redesigned onboarding flow that guided users to their first "aha moment" in under 4 minutes.',
    overview: 'A B2B financial platform was losing 72% of trial users in the first 7 days. Through research and hypothesis-driven design, we rebuilt the onboarding from the ground up.',
    challenge: 'The original onboarding asked for 28 fields before letting users see any value. Users abandoned because the perceived effort was too high relative to the unknown benefit.',
    solution: 'We introduced a progressive disclosure model — showing a live preview of the product before asking for any data, then collecting information contextually as users needed features. We also created a personalised checklist system.',
    outcome: 'Trial-to-paid conversion improved by 38%. Time-to-first-value dropped from 11 minutes to under 4 minutes. The design was adopted across 3 additional product lines.',
    tags: ['UX Research', 'Fintech', 'Onboarding', 'B2B SaaS', 'Conversion Optimisation'],
    images: []
  },
  {
    id: 2,
    title: 'Building a Design System at Scale',
    client: 'Enterprise Platform — 2022',
    summary: 'Created a unified component library and design language that cut design-to-dev handoff time by 50% across 6 product teams.',
    overview: 'An enterprise software company had 6 product teams operating independently, resulting in a fragmented UI with 140+ button variants and 80 shades of blue across their suite.',
    challenge: 'No shared design language existed. Designers were solving the same problems repeatedly while developers were building components from scratch for every team. The product felt disjointed to users navigating between modules.',
    solution: 'Led a cross-functional team to audit the existing UI, identify patterns, and create a three-tier token system (global → alias → component). Built a Figma library with 200+ components and a documentation site with usage guidelines and code snippets.',
    outcome: 'Handoff time reduced by 50%. Designer onboarding time cut from 3 weeks to 4 days. NPS for enterprise users improved 14 points in the 6 months following rollout.',
    tags: ['Design Systems', 'Leadership', 'Enterprise', 'Figma', 'Tokens'],
    images: []
  },
  {
    id: 3,
    title: 'Zero-to-One Mobile App for Urban Mobility',
    client: 'Startup — 2021',
    summary: 'Designed and shipped a consumer mobility app from concept to launch in 14 weeks, reaching 50k users in the first month.',
    overview: 'An early-stage startup approached me to design their flagship mobile app for urban micro-mobility — scooters and e-bikes in European cities. No product existed yet, only a vision.',
    challenge: 'Speed was critical — investors needed an MVP in 14 weeks. We had no existing user data and a founder team with engineering backgrounds but no design experience.',
    solution: 'Ran a two-week discovery sprint to map user journeys and identify the riskiest assumptions. Used rapid prototyping to validate key flows with 40 users before writing a line of code. Designed a minimal, location-first UI that prioritised the 3 core actions: find, unlock, ride.',
    outcome: "Launched on schedule. 50,000 users in Month 1. App Store rating of 4.7. The design team grew from 1 (me) to 4 designers based on the product's success.",
    tags: ['Zero-to-One', 'Mobile', 'Consumer', 'Startup', 'iOS', 'Rapid Prototyping'],
    images: []
  }
];

const defaultAbout = {
  bio1: document.getElementById('about-bio1').textContent,
  bio2: document.getElementById('about-bio2').textContent,
  skills: 'Product Strategy,Design Systems,UX Research,Interaction Design,Prototyping,Figma,User Testing,Visual Design,Mobile / iOS,B2B SaaS,Design Leadership,Workshop Facilitation'
};

const defaultContact = {
  email: 'gumo@example.com',
  linkedin: 'https://linkedin.com/in/gumoandreatta',
  location: 'Milano, Italy — Available Globally',
  bio: document.getElementById('contact-bio').textContent
};

function loadData(key, def) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(def));
  } catch(e) { return JSON.parse(JSON.stringify(def)); }
}
function saveData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

let fontData    = loadData('ga_fonts',   defaultFonts);
let caseData    = loadData('ga_cases',   defaultCases);
let aboutData   = loadData('ga_about',   defaultAbout);
let contactData = loadData('ga_contact', defaultContact);

// Migration: ensure all cases have images array
caseData = caseData.map(c => ({ images: [], ...c }));

// ─── FONTS ───────────────────────────────────────────────────────────────
function applyFonts(data) {
  const existing = document.getElementById('google-fonts-link');
  const tmp = document.createElement('div');
  tmp.innerHTML = data.embed.trim();
  const newLink = tmp.querySelector('link');
  if (newLink) {
    newLink.id = 'google-fonts-link';
    if (existing) existing.replaceWith(newLink);
  }
  const root = document.documentElement;
  root.style.setProperty('--font-display', "'" + data.display + "', sans-serif");
  root.style.setProperty('--font-serif',   "'" + data.serif   + "', serif");
  root.style.setProperty('--font-body',    "'" + data.body    + "', sans-serif");
}

function saveFonts() {
  fontData = {
    embed:   document.getElementById('cms-font-embed').value.trim(),
    display: document.getElementById('cms-font-display').value.trim(),
    serif:   document.getElementById('cms-font-serif').value.trim(),
    body:    document.getElementById('cms-font-body').value.trim()
  };
  saveData('ga_fonts', fontData);
  applyFonts(fontData);
  updateFontPreviews();
  showToast();
}

function populateFontForm() {
  document.getElementById('cms-font-embed').value   = fontData.embed;
  document.getElementById('cms-font-display').value = fontData.display;
  document.getElementById('cms-font-serif').value   = fontData.serif;
  document.getElementById('cms-font-body').value    = fontData.body;
  updateFontPreviews();
  ['cms-font-display','cms-font-serif','cms-font-body'].forEach(id => {
    const el = document.getElementById(id);
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
    clone.addEventListener('input', updateFontPreviews);
  });
}

function updateFontPreviews() {
  const d = document.getElementById('cms-font-display').value || 'Bebas Neue';
  const s = document.getElementById('cms-font-serif').value   || 'DM Serif Display';
  const b = document.getElementById('cms-font-body').value    || 'DM Sans';
  const pd = document.getElementById('preview-display');
  const ps = document.getElementById('preview-serif');
  const pb = document.getElementById('preview-body');
  pd.style.fontFamily = "'" + d + "', sans-serif";
  pd.textContent = d + ' — DISPLAY HEADING';
  pd.style.fontSize = '1.3rem';
  ps.style.fontFamily = "'" + s + "', serif";
  ps.style.fontStyle = 'italic';
  ps.textContent = s + ' — Accent & Italic';
  ps.style.fontSize = '1.1rem';
  pb.style.fontFamily = "'" + b + "', sans-serif";
  pb.textContent = b + ' — the quick brown fox jumps over the lazy dog';
}

// ─── SLIDESHOW ───────────────────────────────────────────────────────────
let currentSlide = 0;
let currentImages = [];

function buildSlideshow(images) {
  currentImages = images || [];
  currentSlide  = 0;
  const slideshow = document.getElementById('modal-slideshow');
  const track     = document.getElementById('slideshow-track');
  const dots      = document.getElementById('slide-dots');
  const prevBtn   = document.getElementById('slide-prev');
  const nextBtn   = document.getElementById('slide-next');

  if (!currentImages.length) {
    slideshow.classList.add('hidden');
    return;
  }
  slideshow.classList.remove('hidden');

  track.innerHTML = currentImages.map(src =>
    '<div class="slide"><img src="' + src + '" alt="Case study image" loading="lazy"></div>'
  ).join('');

  dots.innerHTML = currentImages.map((_, i) =>
    '<div class="slide-dot' + (i === 0 ? ' active' : '') +
    '" onclick="goToSlide(' + i + ')"></div>'
  ).join('');

  const multi = currentImages.length > 1;
  prevBtn.style.display = multi ? 'flex' : 'none';
  nextBtn.style.display = multi ? 'flex' : 'none';
  dots.style.display    = multi ? 'flex' : 'none';

  goToSlide(0);
}

function goToSlide(n) {
  currentSlide = (n + currentImages.length) % currentImages.length;
  document.getElementById('slideshow-track').style.transform =
    'translateX(-' + (currentSlide * 100) + '%)';
  document.querySelectorAll('.slide-dot').forEach((d, i) =>
    d.classList.toggle('active', i === currentSlide)
  );
}
function slideNext() { goToSlide(currentSlide + 1); }
function slidePrev() { goToSlide(currentSlide - 1); }

document.addEventListener('keydown', e => {
  if (!document.getElementById('modal-overlay').classList.contains('active')) return;
  if (e.key === 'ArrowRight') slideNext();
  if (e.key === 'ArrowLeft')  slidePrev();
});

// ─── RENDER PORTFOLIO ────────────────────────────────────────────────────
function renderPortfolio() {
  document.getElementById('about-bio1').textContent = aboutData.bio1;
  document.getElementById('about-bio2').textContent = aboutData.bio2;
  const skillsEl = document.getElementById('skills-container');
  skillsEl.innerHTML = aboutData.skills.split(',').map(s =>
    '<span class="skill-tag">' + s.trim() + '</span>'
  ).join('');

  const emailEl = document.getElementById('contact-email');
  emailEl.textContent = contactData.email;
  emailEl.href = 'mailto:' + contactData.email;
  const linkedinEl = document.getElementById('contact-linkedin');
  linkedinEl.textContent = contactData.linkedin;
  linkedinEl.href = contactData.linkedin;
  document.getElementById('contact-location').textContent = contactData.location;
  document.getElementById('contact-bio').textContent      = contactData.bio;
  document.getElementById('contact-cta-email').href = 'mailto:' + contactData.email;

  const container = document.getElementById('cases-container');
  container.innerHTML = caseData.map((c, i) =>
    '<div class="case-card" onclick="openModal(' + i + ')">' +
      '<div class="case-num">' + String(i + 1).padStart(2, '0') + '</div>' +
      '<div class="case-body"><h3>' + c.title + '</h3><p>' + c.summary + '</p></div>' +
      '<div class="case-tags">' + (c.tags || []).slice(0, 3).map(t =>
        '<span class="case-tag">' + t + '</span>').join('') + '</div>' +
      '<div class="case-arrow">→</div>' +
    '</div>'
  ).join('');
}

// ─── MODAL ───────────────────────────────────────────────────────────────
function openModal(i) {
  const c = caseData[i];
  document.getElementById('modal-kicker').textContent    = c.client;
  document.getElementById('modal-title').textContent     = c.title;
  document.getElementById('modal-overview').textContent  = c.overview;
  document.getElementById('modal-challenge').textContent = c.challenge;
  document.getElementById('modal-solution').textContent  = c.solution;
  document.getElementById('modal-outcome').textContent   = c.outcome;
  document.getElementById('modal-tags').innerHTML = (c.tags || []).map(t =>
    '<span class="case-tag">' + t + '</span>'
  ).join('');
  buildSlideshow(c.images || []);
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalBtn();
}
function closeModalBtn() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ─── ADMIN ───────────────────────────────────────────────────────────────
let isLoggedIn = false;

function openAdmin(e) {
  e.preventDefault();
  document.getElementById('admin-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  if (isLoggedIn) { showCMS(); } else { showLogin(); }
}
function closeAdmin() {
  document.getElementById('admin-overlay').classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('pwd-input').value = '';
  document.getElementById('login-error').style.display = 'none';
}
function showLogin() {
  document.getElementById('login-panel').style.display = 'block';
  document.getElementById('cms-panel').style.display   = 'none';
}
function showCMS() {
  document.getElementById('login-panel').style.display = 'none';
  document.getElementById('cms-panel').style.display   = 'block';
  populateCMSForms();
}
function doLogin() {
  const pwd = document.getElementById('pwd-input').value;
  if (pwd === ADMIN_PASSWORD) {
    isLoggedIn = true;
    document.getElementById('login-error').style.display = 'none';
    showCMS();
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('pwd-input').value = '';
  }
}
function doLogout() {
  isLoggedIn = false;
  showLogin();
}

function populateCMSForms() {
  populateFontForm();
  document.getElementById('cms-bio1').value             = aboutData.bio1;
  document.getElementById('cms-bio2').value             = aboutData.bio2;
  document.getElementById('cms-skills').value           = aboutData.skills;
  document.getElementById('cms-email').value            = contactData.email;
  document.getElementById('cms-linkedin').value         = contactData.linkedin;
  document.getElementById('cms-location-contact').value = contactData.location;
  document.getElementById('cms-contact-bio').value      = contactData.bio;
  renderCMSCases();
}

function saveAbout() {
  aboutData = {
    bio1:   document.getElementById('cms-bio1').value,
    bio2:   document.getElementById('cms-bio2').value,
    skills: document.getElementById('cms-skills').value
  };
  saveData('ga_about', aboutData);
  renderPortfolio();
  showToast();
}

function saveContact() {
  contactData = {
    email:    document.getElementById('cms-email').value,
    linkedin: document.getElementById('cms-linkedin').value,
    location: document.getElementById('cms-location-contact').value,
    bio:      document.getElementById('cms-contact-bio').value
  };
  saveData('ga_contact', contactData);
  renderPortfolio();
  showToast();
}

// ─── IMAGE HANDLING ───────────────────────────────────────────────────────
const caseImages = {};

function initImageUploader(idx) {
  caseImages[idx] = [...(caseData[idx].images || [])];
  renderImageThumbs(idx);
}

function triggerUpload(idx) {
  const input = document.getElementById('img-input-' + idx);
  if (input) input.click();
}

function handleImageUpload(idx, input) {
  const MAX = 4;
  const files = Array.from(input.files);
  const slots = MAX - (caseImages[idx] || []).length;
  if (slots <= 0) { alert('Maximum 4 images per case study.'); input.value = ''; return; }
  const toAdd = files.slice(0, slots);
  let loaded = 0;
  toAdd.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      caseImages[idx].push(e.target.result);
      loaded++;
      if (loaded === toAdd.length) renderImageThumbs(idx);
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function removeImage(idx, imgIdx) {
  caseImages[idx].splice(imgIdx, 1);
  renderImageThumbs(idx);
}

function renderImageThumbs(idx) {
  const container = document.getElementById('img-thumbs-' + idx);
  const count     = document.getElementById('img-count-'  + idx);
  const zone      = document.getElementById('img-zone-'   + idx);
  if (!container) return;
  const imgs = caseImages[idx] || [];
  const MAX  = 4;

  container.innerHTML = imgs.map((src, j) =>
    '<div class="img-thumb">' +
      '<img src="' + src + '" alt="img' + j + '">' +
      '<button class="img-thumb-del" onclick="removeImage(' + idx + ',' + j + ')">✕</button>' +
    '</div>'
  ).join('');

  count.textContent = imgs.length + ' / ' + MAX + ' images';
  if (zone) zone.style.opacity = imgs.length >= MAX ? '0.4' : '1';
}

// ─── CMS CASES ───────────────────────────────────────────────────────────
function renderCMSCases() {
  const el = document.getElementById('cms-cases');
  el.innerHTML = caseData.map((c, i) =>
    '<div class="cms-card" id="cms-card-' + i + '">' +
      '<div class="cms-card-header">' +
        '<div>' +
          '<div class="cms-card-title">' + (c.title || 'Untitled') + '</div>' +
          '<p style="margin-top:0.3rem;">' + (c.client || '') + '</p>' +
        '</div>' +
        '<div class="cms-card-actions">' +
          '<button class="btn-ghost" onclick="toggleEdit(' + i + ')">Edit</button>' +
          '<button class="btn-ghost btn-danger" onclick="deleteCase(' + i + ')">Delete</button>' +
        '</div>' +
      '</div>' +
      '<div class="edit-form" id="edit-form-' + i + '">' +
        '<div class="field"><label>Title</label>' +
          '<input type="text" id="ef-title-' + i + '" value="' + escHtml(c.title || '') + '"></div>' +
        '<div class="field"><label>Client / Year</label>' +
          '<input type="text" id="ef-client-' + i + '" value="' + escHtml(c.client || '') + '"></div>' +
        '<div class="field"><label>Summary (card)</label>' +
          '<textarea id="ef-summary-' + i + '" rows="2">' + escHtml(c.summary || '') + '</textarea></div>' +
        '<div class="field"><label>Overview</label>' +
          '<textarea id="ef-overview-' + i + '" rows="3">' + escHtml(c.overview || '') + '</textarea></div>' +
        '<div class="field"><label>Challenge</label>' +
          '<textarea id="ef-challenge-' + i + '" rows="3">' + escHtml(c.challenge || '') + '</textarea></div>' +
        '<div class="field"><label>Solution</label>' +
          '<textarea id="ef-solution-' + i + '" rows="3">' + escHtml(c.solution || '') + '</textarea></div>' +
        '<div class="field"><label>Outcome</label>' +
          '<textarea id="ef-outcome-' + i + '" rows="2">' + escHtml(c.outcome || '') + '</textarea></div>' +
        '<div class="field"><label>Tags (comma-separated)</label>' +
          '<input type="text" id="ef-tags-' + i + '" value="' + escHtml((c.tags || []).join(', ')) + '"></div>' +

        '<div class="field">' +
          '<label>Images <span style="color:var(--muted);font-size:0.65rem;letter-spacing:0;">' +
          '(up to 4 — displayed as slideshow in the case study modal)</span></label>' +
          '<div class="img-upload-zone" id="img-zone-' + i + '" onclick="triggerUpload(' + i + ')">' +
            '<p>Click to upload images</p>' +
            '<span>JPG, PNG, WEBP · max 4 images</span>' +
          '</div>' +
          '<input type="file" id="img-input-' + i + '" accept="image/*" multiple style="display:none"' +
            ' onchange="handleImageUpload(' + i + ', this)">' +
          '<div class="img-thumbs" id="img-thumbs-' + i + '"></div>' +
          '<div class="img-count" id="img-count-' + i + '"></div>' +
        '</div>' +

        '<div class="save-bar">' +
          '<button class="btn" onclick="saveCase(' + i + ')">Save Case Study</button>' +
          '<button class="btn-ghost" onclick="toggleEdit(' + i + ')">Cancel</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  ).join('');
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toggleEdit(i) {
  const form = document.getElementById('edit-form-' + i);
  const opening = !form.classList.contains('open');
  form.classList.toggle('open');
  if (opening) initImageUploader(i);
}

function saveCase(i) {
  caseData[i] = {
    id:        caseData[i].id,
    title:     document.getElementById('ef-title-'    + i).value,
    client:    document.getElementById('ef-client-'   + i).value,
    summary:   document.getElementById('ef-summary-'  + i).value,
    overview:  document.getElementById('ef-overview-' + i).value,
    challenge: document.getElementById('ef-challenge-'+ i).value,
    solution:  document.getElementById('ef-solution-' + i).value,
    outcome:   document.getElementById('ef-outcome-'  + i).value,
    tags:      document.getElementById('ef-tags-' + i).value
                 .split(',').map(s => s.trim()).filter(Boolean),
    images:    caseImages[i] || []
  };
  saveData('ga_cases', caseData);
  renderPortfolio();
  renderCMSCases();
  showToast();
}

function deleteCase(i) {
  if (!confirm('Delete this case study?')) return;
  caseData.splice(i, 1);
  saveData('ga_cases', caseData);
  renderPortfolio();
  renderCMSCases();
}

function addCase() {
  const newIdx = caseData.length;
  caseData.push({
    id: Date.now(), title: 'New Case Study', client: 'Client — Year',
    summary: 'A brief summary of the project and its impact.',
    overview: '', challenge: '', solution: '', outcome: '',
    tags: [], images: []
  });
  saveData('ga_cases', caseData);
  renderPortfolio();
  renderCMSCases();
  setTimeout(() => {
    toggleEdit(newIdx);
    document.getElementById('cms-cases').lastElementChild
      .scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// ─── TOAST ───────────────────────────────────────────────────────────────
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── INIT ────────────────────────────────────────────────────────────────
initGate();
applyFonts(fontData);
renderPortfolio();
