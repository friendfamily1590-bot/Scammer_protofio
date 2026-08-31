// ============================================================
// XALIF Portfolio — interactions (ES module)
// ============================================================
/* ---------------- Mobile menu ---------------- */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

/* ---------------- Scroll progress bar ---------------- */
const scrollProgress = document.getElementById('scroll-progress');
function updateScrollProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ---------------- Cursor spotlight (advanced JS: pointer-tracked radial glow) ---------------- */
const spotlight = document.getElementById('spotlight');
let targetX = 50, targetY = 20, curX = 50, curY = 20;
window.addEventListener('pointermove', (e) => {
  targetX = (e.clientX / window.innerWidth) * 100;
  targetY = (e.clientY / window.innerHeight) * 100;
});
function animateSpotlight(){
  curX += (targetX - curX) * 0.06;
  curY += (targetY - curY) * 0.06;
  spotlight.style.setProperty('--mx', curX + '%');
  spotlight.style.setProperty('--my', curY + '%');
  requestAnimationFrame(animateSpotlight);
}
animateSpotlight();

/* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-scale');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------------- Typewriter: "Hello, I'm" ---------------- */
(function typeHello(){

  const el = document.getElementById('typed-hello');

  const texts = [
    "Hello, I'm",
    "Hi, I'm",
    "I'm, Scammer"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {

    const text = texts[textIndex];

    if (!deleting) {

      el.textContent = text.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex >= text.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, 1500);

        return;
      }

      setTimeout(tick, 110);

    } else {

      el.textContent = text.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex <= 0) {

        deleting = false;
        textIndex = (textIndex + 1) % texts.length;

        setTimeout(tick, 400);
        return;
      }

      setTimeout(tick, 70);
    }
  }

  tick();

})();

/* ---------------- Hero name — stamped letter tiles ---------------- */
(function buildTileName(){
  const el = document.getElementById('tile-name');
  const name = "XALIF";
  const styles = ['fill-ink', 'outline', 'fill-accent', 'outline', 'fill-ink'];
  const rotations = [-6, 4, -3, 6, -4];
  el.innerHTML = name.split('').map((ch, i) => `
    <span class="name-tile ${styles[i % styles.length]}"
          style="--r:${rotations[i % rotations.length]}deg; --td:${i * 0.08}s">${ch}</span>
  `).join('');
})();

/* ---------------- Stat counters (animate on view) ---------------- */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const iv = setInterval(() => {
      cur += step;
      if (cur >= target){ cur = target; clearInterval(iv); }
      el.textContent = cur;
    }, 30);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---------------- About_Me.exe file tabs ---------------- */
const fileData = {
  bio: {
    path: 'C:/portfolio/about_me/bio.md',
    html: `<p class="mb-3">こんにちは、<span class="text-accent">XALIF </span>です。ジュニアのWeb開発者で、Python開発者です。フルスタック開発とUI/UXデザインもやっています。残りの時間は攻撃者の視点で物事を考えています。</p>
    <p class="mb-3">私は直感的に使えるインターフェースを設計し、プレッシャーの中でも耐えられるバックエンドを構築します。そして通常のレビューでは見逃される脆弱性も監査します。</p>
    <p>現在は高パフォーマンスなWebアプリ、攻撃的セキュリティツール、そして複雑なシステムをシンプルにすることに夢中です</p>

  <div class="mt-6 flex justify-center md:justify-start">
    <img
      src="AX/bio.svg"
      alt="Bio"
      class="w-40 md:w-52 h-auto"
    >
  </div>`
  },
  education: {
    path: 'C:/portfolio/about_me/edu.md',
    html: `<p class="text-ink/40 mb-4"># education.md</p>  
  <ul class="space-y-3">  
    <li><span class="text-accent">2029 — Present</span><br>Scammer Government School &amp; Engineering</li>  
    <li><span class="text-accent">Self-taught</span><br>Offensive Security &amp; Web Application Penetration Testing</li>  
    <li><span class="text-accent">Ongoing</span><br>Advanced Frontend Systems &amp; Design Engineering</li>  
  </ul>

  <div class="mt-6 flex justify-center md:justify-start">
    <img
      src="AX/education.svg"
      alt="Education"
      class="w-56 md:w-72 lg:w-80 h-auto object-contain"
    >
  </div>`
  },
  location: {
    path: 'C:/portfolio/about_me/location.md',
    html: `<p class="text-ink/40 mb-4"># location.md</p>
  <p class="mb-3">
    Based in <span class="text-accent">Dhaka, Bangladesh</span> — working with clients and teams worldwide.
  </p>
  <p>Comfortable across time zones, remote-first, and always online.</p>

  <div class="mt-6 flex justify-center md:justify-start">
    <img
      src="AX/bd.svg"
      alt="Bangladesh Map"
      class="w-56 md:w-72 lg:w-80 h-auto object-contain"
    >
  </div>`
  
  
  }
};
const fileTabs = document.querySelectorAll('.file-tab');
const fileContent = document.getElementById('file-content');
const filePath = document.getElementById('file-path');
fileTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    fileTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const data = fileData[tab.dataset.file];
    filePath.textContent = data.path;
    fileContent.innerHTML = data.html;
  });
});

/* ---------------- Skills ---------------- */
const skills = [
  { name: 'JavaScript / TypeScript', level: 95 },
  { name: 'React / Next.js', level: 92 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'Python', level: 85 },
  { name: 'UI/UX Design (Figma)', level: 90 },
  { name: 'Web App Security', level: 87 },
  { name: 'Databases (SQL/NoSQL)', level: 84 },
  { name: 'DevOps / CI-CD', level: 78 },
];
const skillsList = document.getElementById('skills-list');
skillsList.innerHTML = skills.map(s => `
  <div class="skill-row">
    <div class="skill-head"><span>${s.name}</span><span class="text-accent">${s.level}%</span></div>
    <div class="skill-track"><div class="skill-fill" data-level="${s.level}"></div></div>
  </div>
`).join('');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.level + '%');
    skillObserver.disconnect();
  });
}, { threshold: 0.3 });
skillObserver.observe(skillsList);

/* ---------------- Tools grid ---------------- */
const tools = [
  ['<i class="fa-brands fa-square-js"></i>', 'JavaScript'],
  ['<i class="fa-solid fa-code"></i>', 'TypeScript'],
  ['<i class="fa-brands fa-react"></i>', 'React'],
  ['<i class="fa-solid fa-caret-right"></i>', 'Next.js'],
  ['<i class="fa-brands fa-node-js"></i>', 'Node.js'],
  ['<i class="fa-brands fa-python"></i>', 'Python'],
  ['<i class="fa-brands fa-figma"></i>', 'Figma'],
  ['<i class="fa-brands fa-docker"></i>', 'Docker'],
  ['<i class="fa-brands fa-linux"></i>', 'Linux'],
  ['<i class="fa-brands fa-git-alt"></i>', 'Git'],
  ['<i class="fa-brands fa-aws"></i>', 'AWS'],
  ['<i class="fa-solid fa-bug-slash"></i>', 'Burp Suite'],
];
document.getElementById('tool-grid').innerHTML = tools.map(([g, n]) => `
  <div class="tool-chip"><span class="tool-glyph">${g}</span><span>${n}</span></div>
`).join('');

/* ---------------- Gallery ---------------- */
const gallery = [
  { img: 'https://picsum.photos/seed/xalif-desk/500/500', caption: 'Late-night build session' },
  { img: 'https://picsum.photos/seed/xalif-conf/500/500', caption: 'Speaking at a security meetup' },
  { img: 'https://picsum.photos/seed/xalif-code/500/500', caption: 'Deep in a code review' },
  { img: 'https://picsum.photos/seed/xalif-team/500/500', caption: 'Working with the team' },
];
document.getElementById('gallery-grid').innerHTML = gallery.map(g => `
  <div class="gallery-item">
    <img src="${g.img}" alt="${g.caption}" loading="lazy">
    <div class="gallery-caption">${g.caption}</div>
  </div>
`).join('');

/* ---------------- Projects ---------------- */
const projects = [
  {
    title: 'HOST_SERVER',
    tag: 'Python',
    cat: 'Script',
    desc: 'Html, CSS JS live Server Host',
    img: 'AX/1.png',
    demo: 'https://raw.githubusercontent.com/Xylon-404/HOST_SERVER/refs/heads/main/assets/Screenshot_20250928_155148_Termux.png',
    source: 'https://github.com/Xylon-404/HOST_SERVER'
  },
  {
    title: 'FB AUTO SHARE',
    tag: 'Python',
    cat: 'Script',
    desc: 'Facebook auto shere script Tool termux.',
    img: 'AX/2.png',
    demo: 'https://private-user-images.githubusercontent.com/161955932/455284235-bfb3229d-77aa-454c-93bc-f307f8f107a6.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODgwMDM0NzcsIm5iZiI6MTc4ODAwMzE3NywicGF0aCI6Ii8xNjE5NTU5MzIvNDU1Mjg0MjM1LWJmYjMyMjlkLTc3YWEtNDU0Yy05M2JjLWYzMDdmOGYxMDdhNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwODI5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDgyOVQxMTMyNTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00ZDg2ODkzNzQ0ZjQ5NjE1N2FkMDk4ZmRiZGM1MmZmODFjODk2MDQ0YzlmNTU1YWE4ZDcxNjc0OGY5MDFiMTJhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.W_LWnyTDj7FsQt7velCC1HG8HYzPssFNk_H1_u1nHf0',
    source: 'https://github.com/Xylon-404/XYLON-SHERE'
  },
  {
    title: 'WHATSAPP AI BOT',
    tag: 'NODE JS',
    cat: 'Script',
    desc: 'Whatsapp ai chat bot.',
    img: 'AX/3.png',
    demo: 'https://github.com/Xylon-404/WHATSAPP_AI',
    source: 'https://github.com/Xylon-404/WHATSAPP_AI'
  },
  {
    title: 'ALL IS ONE',
    tag: 'Web App',
    cat: 'design',
    desc: 'All is one tool web app.',
    img: 'AX/4.png',
    demo: 'https://one-x.top/',
    source: 'https://github.com/Xylon-404/ALL_IS_ONE'
  },
  {
    title: 'ENCODE',
    tag: 'Security',
    cat: 'security',
    desc: 'python hard encode tool.',
    img: 'AX/5.png',
    demo: 'https://raw.githubusercontent.com/Xylon-404/PYTHON_ENC/refs/heads/main/assets/Screenshot_20250928_160032_Termux.png',
    source: 'https://github.com/Xylon-404/PYTHON_ENC'
  }
];

const projectGrid = document.getElementById('project-grid');

function renderProjects(filter) {
  const list = filter === 'all'
    ? projects
    : projects.filter(p => p.cat === filter);

  projectGrid.innerHTML = list.map((p, i) => `
    <div class="project-card" style="animation-delay:${i * 0.06}s">
      <div class="project-thumb">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
      </div>

      <div class="project-body">
        <p class="project-tag">${p.tag}</p>

        <h3 class="font-stamp text-xl mb-2">${p.title}</h3>

        <p class="font-body text-paper/70 text-sm">
          ${p.desc}
        </p>

        <div class="project-links">
          <a href="${p.demo}" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            Live Demo
          </a>

          <a href="${p.source}" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github"></i>
            Source
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

renderProjects('all');

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip')
      .forEach(c => c.classList.remove('active'));

    chip.classList.add('active');
    renderProjects(chip.dataset.filter);
  });
});

/* ---------------- ChatBox AI (API) ---------------- */
const AI_API = 'https://one-x.top/ALL_APIS/AI_AI.php?msg=';

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function addMsg(text, who){
  const div = document.createElement('div');
  div.className = `chat-msg ${who}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showTyping(){
  const div = document.createElement('div');
  div.className = 'chat-typing';
  div.id = 'typing-indicator';
  div.innerHTML = '<span></span><span></span><span></span>';
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function hideTyping(){
  document.getElementById('typing-indicator')?.remove();
}

addMsg(
  "Hey! I'm XALIF's AI assistant. Ask me anything.",
  'bot'
);

async function botReply(msg){
  try {
    const url = AI_API + encodeURIComponent(msg);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.text();

    return data.trim() || "Sorry, I didn't get a response.";
  } catch (error) {
    console.error('AI API Error:', error);
    return "Sorry, the AI service is temporarily unavailable.";
  }
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const val = chatInput.value.trim();
  if (!val) return;

  addMsg(val, 'user');
  chatInput.value = '';

  showTyping();

  const reply = await botReply(val);

  hideTyping();
  addMsg(reply, 'bot');
});

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

const CONTACT_API = 'https://one-x.top/CONTACT/index.php';
const API_KEY = 'QjcThwtSQt9qe45s9TbE';

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = this.elements['name'].value.trim();
  const email = this.elements['email'].value.trim();
  const subject = this.elements['subject'].value.trim();
  const message = this.elements['message'].value.trim();

  // Validate
  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all fields.', false);
    return;
  }

  const button = this.querySelector('button[type="submit"]');
  const buttonText = button.querySelector('span');

  button.disabled = true;
  buttonText.textContent = 'Sending...';

  try {
    const response = await fetch(CONTACT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'send_message',
        api_key: API_KEY,
        name: name,
        email: email,
        message: `Subject: ${subject}\n\n${message}`
      })
    });

    const data = await response.json();

    if (data.success === true) {
      showStatus(
        data.message || 'Message received successfully.',
        true
      );

      contactForm.reset();

    } else {
      showStatus(
        data.error || 'Failed to send message.',
        false
      );
    }

  } catch (error) {
    console.error('Contact API Error:', error);

    showStatus(
      'Unable to send message. Please try again later.',
      false
    );

  } finally {
    button.disabled = false;
    buttonText.textContent = 'Send Message';
  }
});


function showStatus(message, success) {
  contactStatus.textContent = message;

  contactStatus.classList.remove(
    'hidden',
    'text-green-500',
    'text-red-500'
  );

  contactStatus.classList.add(
    success ? 'text-green-500' : 'text-red-500'
  );
}

/* ---------------- Back to top ---------------- */
const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
