/* =============================================
   Sofia AI — Shared JavaScript
   ============================================= */

// ========================================
// MOBILE HAMBURGER MENU
// ========================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = document.getElementById('hamburger-icon');
    if (mobileMenu.classList.contains('open')) {
      icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    } else {
      icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = document.getElementById('hamburger-icon');
      if (icon) icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });
  });
}

// ========================================
// SCROLL REVEAL (IntersectionObserver with stagger)
// ========================================
function initScrollReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQAccordion() {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const chevron = btn.querySelector('.faq-chevron');
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-chevron').forEach(c => c.classList.remove('rotated'));
      document.querySelectorAll('.faq-toggle').forEach(b => b.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        answer.classList.add('open');
        chevron.classList.add('rotated');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ========================================
// PRICING MONTHLY/ANNUAL TOGGLE
// ========================================
function initPricingToggle() {
  const monthlyBtn = document.getElementById('toggle-monthly');
  const annualBtn = document.getElementById('toggle-annual');
  if (!monthlyBtn || !annualBtn) return;

  const prices = {
    starter: { monthly: 79, annual: 63 },
    professional: { monthly: 199, annual: 159 },
    enterprise: { monthly: 499, annual: 399 }
  };

  function updatePrices(period) {
    document.querySelectorAll('[data-price-tier]').forEach(el => {
      const tier = el.getAttribute('data-price-tier');
      const price = prices[tier];
      if (price) {
        el.textContent = '\u20AC' + price[period];
      }
    });

    document.querySelectorAll('[data-annual-note]').forEach(el => {
      el.style.display = period === 'annual' ? 'block' : 'none';
    });
  }

  monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active');
    annualBtn.classList.remove('active');
    updatePrices('monthly');
  });

  annualBtn.addEventListener('click', () => {
    annualBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    updatePrices('annual');
  });
}

// ========================================
// COPY TO CLIPBOARD
// ========================================
function copyToClipboard(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btnEl.textContent;
    btnEl.textContent = 'Copied!';
    btnEl.classList.add('text-savings');
    setTimeout(() => {
      btnEl.textContent = original;
      btnEl.classList.remove('text-savings');
    }, 2000);
  });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS (with offset for fixed nav)
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav-sticky')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
function animateCounter(element, target, duration, prefix, suffix) {
  prefix = prefix || '';
  suffix = suffix || '';
  duration = duration || 2000;
  let start = 0;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = prefix + target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(step);
}

function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.counter);
        const prefix = entry.target.dataset.prefix || '';
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 2000, prefix, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ========================================
// PAYMENT EXPANDABLE SECTIONS
// ========================================
function togglePaymentSection(detailsId, chevronId) {
  const details = document.getElementById(detailsId);
  const chevron = document.getElementById(chevronId);
  if (!details || !chevron) return;

  details.classList.toggle('open');
  chevron.style.transform = details.classList.contains('open') ? 'rotate(180deg)' : '';
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ========================================
// NAV SCROLL EFFECT (transparent -> solid)
// ========================================
function initNavScrollEffect() {
  const nav = document.querySelector('.nav-sticky');
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
function initParallax() {
  const blobs = document.querySelectorAll('.hero-blob');
  if (!blobs.length) return;

  function handleScroll() {
    const scrollY = window.pageYOffset;
    blobs.forEach((blob, i) => {
      const speed = 0.08 + (i * 0.04);
      blob.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ========================================
// CURSOR GLOW ON HERO
// ========================================
function initCursorGlow() {
  const heroSection = document.querySelector('.hero-section');
  const glow = document.querySelector('.hero-cursor-glow');
  if (!heroSection || !glow) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glow.style.opacity = '1';
  });

  heroSection.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

// ========================================
// DYNAMIC YEAR
// ========================================
function initDynamicYear() {
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// ========================================
// BACKEND CONNECTION (Sofia AI on Fly.io)
// ========================================
const BACKEND_URL = 'https://api.sofia.zedigital.tech';
let backendConnected = false;
let backendHealth = null;

async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_URL}/health`);
    if (!res.ok) throw new Error('Health check failed');
    backendHealth = await res.json();
    backendConnected = true;
    return true;
  } catch (e) {
    backendConnected = false;
    return false;
  }
}

// ========================================
// CHAT ENGINE (Sofia AI Receptionist)
// ========================================
let chatLang = 'de';
let soundEnabled = true;
let isTyping = false;

const responses = {
  appointment: {
    keywords: ['appointment', 'schedule', 'book', 'termin', 'buchen', 'consultation', 'meeting', 'available', 'time', 'slot', 'reservation', 'reservierung', 'verfügbar', 'verfugbar'],
    de: "Gerne helfe ich Ihnen bei der Terminvereinbarung! Welcher Tag und welche Uhrzeit passen Ihnen am besten?",
    en: "I'd be happy to help you schedule an appointment! What day and time works best for you?",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  services: {
    keywords: ['service', 'offer', 'what do you do', 'pricing', 'cost', 'help with', 'dienstleistung', 'angebot', 'preis', 'kosten', 'price', 'rate', 'tarif', 'how much', 'wieviel', 'wie viel'],
    de: "Ich informiere Sie gerne über unsere Dienstleistungen. Wofür interessieren Sie sich konkret?",
    en: "I'd be happy to tell you about our services. What specifically are you interested in?",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  hours: {
    keywords: ['hours', 'open', 'close', 'when', 'schedule', 'öffnungszeiten', 'geöffnet', 'geschlossen', 'wann', 'zeit'],
    de: "Unsere Bürozeiten sind Montag bis Freitag, 9:00 bis 18:00 Uhr. Sofia ist jedoch rund um die Uhr erreichbar, um Anrufe entgegenzunehmen und Termine zu vereinbaren.",
    en: "Our office hours are Monday through Friday, 9 AM to 6 PM. However, Sofia is available 24/7 to take your call and schedule appointments.",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  location: {
    keywords: ['address', 'where', 'location', 'direction', 'parking', 'adresse', 'wo', 'weg', 'anfahrt', 'parkplatz', 'lage'],
    de: "Ich kann Ihnen gerne unsere Adresse und eine Wegbeschreibung geben. Soll ich Ihnen diese Informationen mitteilen?",
    en: "I can provide you with our address and directions. Would you like me to share that information?",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  transfer: {
    keywords: ['speak to', 'human', 'person', 'real person', 'manager', 'transfer', 'weiterleiten', 'mitarbeiter', 'mensch', 'rezeption'],
    de: "Natürlich! Ich verbinde Sie mit einem Teammitglied. Einen Moment bitte.",
    en: "Of course! Let me transfer you to a team member. One moment please.",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  hello: {
    keywords: ['hallo', 'hello', 'hi', 'hey', 'guten tag', 'guten morgen', 'guten abend', 'grüß gott', 'gruss gott', 'servus', 'moin', 'good morning', 'good evening', 'good afternoon'],
    de: "Hallo! Ich bin Sofia, Ihre KI-Rezeptionistin. Wie kann ich Ihnen helfen?",
    en: "Hi! I'm Sofia, your AI receptionist. How can I help you today?",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  thanks: {
    keywords: ['danke', 'thank', 'bye', 'tschüss', 'tschuss', 'auf wiedersehen', 'goodbye', 'ciao', 'thanks', 'vielen dank', 'great', 'super', 'toll', 'perfect', 'perfekt', 'wonderful', 'wunderbar', 'awesome', 'excellent', 'appreciate'],
    de: "Gerne geschehen! Kann ich Ihnen noch mit etwas anderem helfen?",
    en: "You're welcome! Is there anything else I can help you with?",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  },
  complaint: {
    keywords: ['problem', 'complaint', 'beschwerde', 'issue', 'unhappy', 'unzufrieden', 'schlecht', 'bad', 'terrible', 'awful', 'wrong', 'hilfe'],
    de: "Das tut mir leid. Lassen Sie mich Sie mit einem Teammitglied verbinden, das Ihnen sofort weiterhelfen kann.",
    en: "I'm sorry to hear that. Let me connect you with a team member who can help resolve this right away.",
    chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
    chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
  }
};

const defaultResponse = {
  de: "Da bin ich mir nicht ganz sicher. Soll ich Sie mit einem Teammitglied verbinden, das Ihnen weiterhelfen kann?",
  en: "I'm not quite sure about that. Would you like me to connect you with a team member who can help?",
  chips_de: ["Termin vereinbaren", "Unsere Dienste", "Öffnungszeiten", "Weiterleiten"],
  chips_en: ["Schedule appointment", "Our services", "Business hours", "Talk to someone"]
};

function getTimestamp() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function addMessage(sender, text, showTimestamp) {
  if (showTimestamp === undefined) showTimestamp = true;
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const wrapper = document.createElement('div');
  wrapper.className = sender === 'sofia' ? 'flex items-start gap-3' : 'flex items-start gap-3 justify-end';
  const time = getTimestamp();

  if (sender === 'sofia') {
    wrapper.innerHTML = '<div class="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0 mt-1"><svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></div><div><div class="chat-bubble-sofia px-4 py-3"><p class="text-sm leading-relaxed">' + formatMessage(text) + '</p></div>' + (showTimestamp ? '<p class="text-[10px] text-navy/30 mt-1 ml-1">' + time + '</p>' : '') + '</div>';
  } else {
    wrapper.innerHTML = '<div><div class="chat-bubble-user px-4 py-3"><p class="text-sm leading-relaxed font-medium">' + formatMessage(text) + '</p></div>' + (showTimestamp ? '<p class="text-[10px] text-navy/30 mt-1 mr-1 text-right">' + time + '</p>' : '') + '</div>';
  }

  container.appendChild(wrapper);
  scrollChatToBottom();
}

function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const typing = document.createElement('div');
  typing.id = 'typing-indicator';
  typing.className = 'flex items-start gap-3';
  typing.innerHTML = '<div class="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0 mt-1"><svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></div><div class="chat-bubble-sofia px-4 py-3 inline-flex gap-1.5 items-center"><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div></div>';
  container.appendChild(typing);
  scrollChatToBottom();

  const statusEl = document.getElementById('chat-status');
  if (statusEl) {
    statusEl.textContent = chatLang === 'de' ? 'Sofia tippt...' : 'Sofia is typing...';
  }
}

function hideTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
  const statusEl = document.getElementById('chat-status');
  if (statusEl) {
    statusEl.textContent = backendConnected
      ? 'Connected to Sofia AI'
      : 'Offline Mode - Sofia AI';
  }
}

function showChips(chips) {
  const chipsContainer = document.getElementById('chat-chips');
  if (!chipsContainer) return;
  chipsContainer.innerHTML = '';
  chips.forEach(chip => {
    const btn = document.createElement('button');
    btn.className = 'chip bg-gold/10 text-navy text-xs font-medium px-3 py-1.5 rounded-full border border-gold/20 hover:bg-gold/20 hover:border-gold/40 transition-all';
    btn.textContent = chip;
    btn.onclick = () => {
      const input = document.getElementById('chat-input');
      if (input) input.value = chip;
      sendMessage();
    };
    chipsContainer.appendChild(btn);
  });
}

function findResponse(input) {
  const words = input.toLowerCase().replace(/[^a-z\u00e4\u00f6\u00fc\u00df\s-]/g, '').split(/\s+/);
  let bestMatch = null;
  let bestScore = 0;

  for (const [key, data] of Object.entries(responses)) {
    let score = 0;
    for (const word of words) {
      for (const keyword of data.keywords) {
        if (word === keyword) score += 3;
        else if (word.length > 3 && keyword.includes(word)) score += 2;
        else if (keyword.length > 3 && word.includes(keyword)) score += 1;
        if (word.length > 4 && keyword.length > 4) {
          let matches = 0;
          const shorter = word.length < keyword.length ? word : keyword;
          const longer = word.length < keyword.length ? keyword : word;
          for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
          }
          if (matches / shorter.length > 0.8) score += 0.5;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = data;
    }
  }

  if (bestScore >= 1) {
    return {
      text: bestMatch[chatLang],
      chips: bestMatch[chatLang === 'de' ? 'chips_de' : 'chips_en']
    };
  }

  return {
    text: defaultResponse[chatLang],
    chips: defaultResponse[chatLang === 'de' ? 'chips_de' : 'chips_en']
  };
}

function playNotificationSound() {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = 'sine';
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}
}

function sendMessage() {
  if (isTyping) return;
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  addMessage('user', text);

  const chipsContainer = document.getElementById('chat-chips');
  if (chipsContainer) chipsContainer.innerHTML = '';

  isTyping = true;
  showTypingIndicator();

  const result = findResponse(text);
  const delay = 600 + Math.random() * 600;

  setTimeout(() => {
    hideTypingIndicator();
    addMessage('sofia', result.text);
    showChips(result.chips);
    playNotificationSound();
    isTyping = false;
  }, delay);
}

function scrollChatToBottom() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

function clearChat() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  container.innerHTML = '';
  const chipsContainer = document.getElementById('chat-chips');
  if (chipsContainer) chipsContainer.innerHTML = '';
  initChat();
}

function setLang(lang) {
  chatLang = lang;
  const deBtn = document.getElementById('lang-de');
  const enBtn = document.getElementById('lang-en');
  if (!deBtn || !enBtn) return;

  if (lang === 'de') {
    deBtn.className = 'px-3 py-1.5 text-xs font-semibold text-white bg-gold/80 transition-colors';
    enBtn.className = 'px-3 py-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors';
    const input = document.getElementById('chat-input');
    if (input) input.placeholder = 'Nachricht eingeben...';
  } else {
    enBtn.className = 'px-3 py-1.5 text-xs font-semibold text-white bg-gold/80 transition-colors';
    deBtn.className = 'px-3 py-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors';
    const input = document.getElementById('chat-input');
    if (input) input.placeholder = 'Type your message...';
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const onIcon = document.getElementById('sound-on-icon');
  const offIcon = document.getElementById('sound-off-icon');
  if (onIcon) onIcon.classList.toggle('hidden', !soundEnabled);
  if (offIcon) offIcon.classList.toggle('hidden', soundEnabled);
}

function setConnectionStatus(status) {
  const dot = document.getElementById('connection-dot');
  const text = document.getElementById('connection-text');
  const chatStatus = document.getElementById('chat-status');
  if (!dot) return;

  if (status === 'connected') {
    dot.className = 'w-2 h-2 rounded-full bg-green-400';
    if (text) { text.textContent = 'Live'; text.className = 'text-[10px] text-green-400 font-medium uppercase tracking-wider'; }
    if (chatStatus) chatStatus.textContent = 'Connected to Sofia AI';
  } else if (status === 'offline') {
    dot.className = 'w-2 h-2 rounded-full bg-red-400';
    if (text) { text.textContent = 'Offline'; text.className = 'text-[10px] text-red-400 font-medium uppercase tracking-wider'; }
    if (chatStatus) chatStatus.textContent = 'Offline Mode - Sofia AI';
  } else {
    dot.className = 'w-2 h-2 rounded-full bg-yellow-400 animate-pulse';
    if (text) { text.textContent = 'Checking'; text.className = 'text-[10px] text-white/40 font-medium uppercase tracking-wider'; }
    if (chatStatus) chatStatus.textContent = 'Connecting...';
  }
}

async function initChat() {
  await new Promise(resolve => setTimeout(resolve, 600));
  const healthOk = await checkBackendHealth();

  if (healthOk) {
    setConnectionStatus('connected');
  } else {
    setConnectionStatus('offline');
  }

  const greeting = backendConnected
    ? "Hallo! Ich bin Sofia, Ihre KI-Rezeptionistin. Ich bin mit dem Live-Backend verbunden und bereit, Ihnen zu helfen.\n\nHi! I'm Sofia, your AI receptionist. I'm connected to the live backend and ready to assist you."
    : "Hallo! Ich bin Sofia, Ihre KI-Rezeptionistin. Wie kann ich Ihnen helfen?\n\nHi! I'm Sofia, your AI receptionist. How can I help you today?";

  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    addMessage('sofia', greeting);
    showChips(['Termin vereinbaren / Schedule appointment', 'Unsere Dienste / Our services', 'Öffnungszeiten / Business hours', 'Weiterleiten / Talk to someone']);
  }, 800);
}

// ========================================
// ROI CALCULATOR
// ========================================
function initROICalculator() {
  const callsSlider = document.getElementById('calls-slider');
  const durationSlider = document.getElementById('duration-slider');
  if (!callsSlider || !durationSlider) return;

  const callsValue = document.getElementById('calls-value');
  const durationValue = document.getElementById('duration-value');
  const humanCostEl = document.getElementById('human-cost');
  const savingsMonthEl = document.getElementById('savings-month');
  const savingsYearEl = document.getElementById('savings-year');

  const HOURLY_RATE = 14.50;
  const OVERHEAD = 1.3;
  const SOFIA_COST = 79;
  let currentHuman = 0;
  let targetHuman = 0;
  let animFrame = null;

  function calculateROI() {
    const calls = parseInt(callsSlider.value);
    const duration = parseInt(durationSlider.value);
    if (callsValue) callsValue.textContent = calls;
    if (durationValue) durationValue.textContent = duration;
    const hours = (calls * duration) / 60;
    targetHuman = HOURLY_RATE * hours * OVERHEAD;
    if (!animFrame) animateNumbers();
  }

  function animateNumbers() {
    const diff = targetHuman - currentHuman;
    if (Math.abs(diff) < 0.5) {
      currentHuman = targetHuman;
      renderCosts();
      animFrame = null;
      return;
    }
    currentHuman += diff * 0.15;
    renderCosts();
    animFrame = requestAnimationFrame(animateNumbers);
  }

  function renderCosts() {
    const human = currentHuman;
    const savingsM = Math.max(0, human - SOFIA_COST);
    const savingsY = savingsM * 12;
    if (humanCostEl) humanCostEl.textContent = '$' + human.toFixed(2);
    if (savingsMonthEl) savingsMonthEl.textContent = '$' + savingsM.toFixed(2);
    if (savingsYearEl) savingsYearEl.textContent = '$' + savingsY.toFixed(2) + '/year';
  }

  callsSlider.addEventListener('input', calculateROI);
  durationSlider.addEventListener('input', calculateROI);
  calculateROI();
}

// ========================================
// TIMELINE SCROLL ANIMATION
// ========================================
function initTimeline() {
  const timelineContainer = document.getElementById('timeline-container');
  const timelineFill = document.getElementById('timeline-fill');
  const timelineSteps = document.querySelectorAll('.timeline-step');
  if (!timelineContainer) return;

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.3 });

  timelineSteps.forEach(step => timelineObserver.observe(step));

  function updateTimelineFill() {
    const rect = timelineContainer.getBoundingClientRect();
    const containerHeight = rect.height;
    const viewportCenter = window.innerHeight * 0.6;
    const progress = Math.min(Math.max((viewportCenter - rect.top) / containerHeight, 0), 1);
    if (timelineFill) timelineFill.style.height = (progress * containerHeight) + 'px';
    requestAnimationFrame(updateTimelineFill);
  }
  updateTimelineFill();
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initFAQAccordion();
  initPricingToggle();
  initSmoothScroll();
  initCounterAnimations();
  initROICalculator();
  initTimeline();
  initScrollProgress();
  initNavScrollEffect();
  initParallax();
  initCursorGlow();
  initDynamicYear();

  // Chat enter key
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    initChat();
    setInterval(checkBackendHealth, 30000);
  }
});
