/* ============================================================
   LUXE AI — Main JavaScript
   ============================================================ */

// ---- LOADER ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 1000);
});
document.body.classList.add('loading');

// ---- CUSTOM CURSOR (desktop only) ----
if (window.innerWidth > 768) {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (cursor && follower) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.querySelectorAll('a, button, .product-card, .feat-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.classList.add('active'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.classList.remove('active'); });
    });
  }
}

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- THEME TOGGLE ----
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const saved = localStorage.getItem('luxe-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('luxe-theme', next);
  });
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- STAT COUNTER ANIMATION ----
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat__num').forEach(el => {
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString('vi-VN');
        if (current >= target) clearInterval(timer);
      }, 16);
    });
    statObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero__stats');
if (heroStats) statObserver.observe(heroStats);

// ---- PARTICLE SYSTEM ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth > 768 ? 30 : 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- SKIN PICKER ----
document.querySelectorAll('.skin-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- FILE UPLOAD ZONES ----
function initUploadZone(zoneId, inputId) {
  const zone = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  if (!zone) return;
  const fileInput = input || zone.querySelector('input[type="file"]');
  zone.addEventListener('click', () => fileInput && fileInput.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--gold)'; });
  zone.addEventListener('dragleave', () => zone.style.borderColor = '');
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.style.borderColor = '';
    const files = e.dataTransfer.files;
    if (files.length) handleFilePreview(zone, files[0]);
  });
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) handleFilePreview(zone, fileInput.files[0]);
    });
  }
}

function handleFilePreview(zone, file) {
  if (!file.type.startsWith('image/')) { showToast('Vui lòng chọn file ảnh!'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('Ảnh tối đa 5MB!'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    zone.style.backgroundImage = `url(${e.target.result})`;
    zone.style.backgroundSize = 'cover';
    zone.style.backgroundPosition = 'center';
    zone.querySelector('p') && (zone.querySelector('p').textContent = '✓ ' + file.name);
    zone.style.color = 'var(--gold)';
  };
  reader.readAsDataURL(file);
}
initUploadZone('faceUpload', 'faceInput');
initUploadZone('tryonUpload', null);

// ---- COLLECTION FILTERS ----
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) { card.style.animation = 'scaleIn 0.3s ease both'; }
    });
  });
});

// ---- AI SEARCH ----
function setSearch(el) {
  const input = document.getElementById('aiSearchInput');
  if (input) {
    input.value = el.textContent;
    input.focus();
  }
}
const aiSearchBtn = document.getElementById('aiSearchBtn');
const aiSearchInput = document.getElementById('aiSearchInput');
if (aiSearchBtn && aiSearchInput) {
  function doSearch() {
    const q = aiSearchInput.value.trim();
    if (!q) return;
    showToast('🔍 Đang tìm: ' + q.substring(0, 30) + '...');
  }
  aiSearchBtn.addEventListener('click', doSearch);
  aiSearchInput.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
}

// ---- CHATBOT ----
const chatbotTrigger = document.getElementById('chatbotTrigger');
const chatbot = document.getElementById('chatbot');
const closeChatbot = document.getElementById('closeChatbot');
const openChatBtn = document.getElementById('openChatBtn');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const chatMessages = document.getElementById('chatMessages');

function openChatbotPanel() {
  if (!chatbot) return;
  chatbot.classList.add('open');
  const badge = document.querySelector('.chatbot-trigger__badge');
  if (badge) badge.style.display = 'none';
}
function closeChatbotPanel() { chatbot && chatbot.classList.remove('open'); }

if (chatbotTrigger) chatbotTrigger.addEventListener('click', openChatbotPanel);
if (closeChatbot) closeChatbot.addEventListener('click', closeChatbotPanel);
if (openChatBtn) { openChatBtn.addEventListener('click', e => { e.preventDefault(); openChatbotPanel(); }); }

const aiReplies = {
  'tư vấn size': 'Bạn muốn tư vấn size cho loại trang phục nào? Vui lòng cho biết chiều cao và cân nặng của bạn nhé! 😊',
  'xem sản phẩm mới': 'Bộ sưu tập mới nhất của chúng tôi bao gồm Đầm Velvet, Vest Premium và nhiều mẫu Casual độc đáo. Bạn muốn xem phong cách nào? ✨',
  'theo dõi đơn hàng': 'Vui lòng cung cấp mã đơn hàng của bạn (ví dụ: LUXE-2026-XXXXX) để tôi kiểm tra ngay nhé!',
  'default': 'Cảm ơn bạn đã nhắn tin! Tôi sẽ hỗ trợ bạn ngay. Bạn có thể hỏi về sản phẩm, size, đơn hàng hoặc phong cách thời trang. 💬'
};

function addMessage(text, isUser = false) {
  if (!chatMessages) return;
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg--${isUser ? 'user' : 'ai'}`;
  const span = document.createElement('span');
  span.textContent = text;
  msg.appendChild(span);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'chat-msg chat-msg--ai';
  div.id = 'typing';
  div.innerHTML = '<span><div class="loading-dots"><span></span><span></span><span></span></div></span>';
  chatMessages && chatMessages.appendChild(div);
  chatMessages && (chatMessages.scrollTop = chatMessages.scrollHeight);
}

function removeTypingIndicator() {
  const el = document.getElementById('typing');
  el && el.remove();
}

function getAIReply(text) {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(aiReplies)) {
    if (lower.includes(key)) return reply;
  }
  return aiReplies['default'];
}

function sendMessage(text) {
  if (!text || !text.trim()) return;
  addMessage(text, true);
  if (chatInput) chatInput.value = '';
  addTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    addMessage(getAIReply(text));
  }, 900 + Math.random() * 600);
}

if (sendChat) sendChat.addEventListener('click', () => chatInput && sendMessage(chatInput.value));
if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(chatInput.value); });

function sendQuickReply(btn) {
  sendMessage(btn.textContent);
  btn.closest('.chat-quickreplies') && btn.closest('.chat-quickreplies').remove();
}

// ---- ADD TO CART ----
document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.closest('.product-card')?.querySelector('h3')?.textContent || 'Sản phẩm';
    showToast('✓ Đã thêm vào giỏ: ' + name);
    btn.textContent = '✓ Đã Thêm';
    btn.style.background = 'var(--success)';
    setTimeout(() => { btn.textContent = '+ Giỏ'; btn.style.background = ''; }, 2500);
  });
});

// ---- TOAST ----
let toastTimer;
function showToast(msg, type = 'gold') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast toast--${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ---- 3D TRY BUTTON ----
document.querySelectorAll('.btn-tryon').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'tryon.html';
  });
});

// ---- SMOOTH ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });
