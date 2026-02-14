/* ============================================
   APP CONTABILIDAD - PROYECTO SENA
============================================ */

const entityData = {
  name: 'ContaPro Enterprise',
  description:
    'Sistema de contabilidad integral para pequeñas y grandes empresas. Automatiza facturación electrónica, nómina, impuestos y reportes financieros.',
  identifier: 'ACC-2024',

  contact: {
    email: 'soporte@contapro.com',
    phone: '+57 300 123 4567',
    location: 'Bogotá, Colombia'
  },

  modules: [
    { name: 'Facturación Electrónica', level: 95 },
    { name: 'Gestión de Nómina', level: 90 },
    { name: 'Reportes Financieros', level: 92 },
    { name: 'Control de Inventario', level: 85 },
    { name: 'Impuestos Automáticos', level: 88 },
    { name: 'Conciliación Bancaria', level: 80 }
  ],

  links: [
    { platform: 'Website', url: '#', icon: '🌐' },
    { platform: 'LinkedIn', url: '#', icon: '💼' },
    { platform: 'Soporte', url: '#', icon: '📞' }
  ],

  stats: {
    clients: 1250,
    activeCompanies: 980,
    transactionsProcessed: 450000
  }
};

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Referencias DOM
  ========================= */

  const userName = document.getElementById('userName');
  const userTitle = document.getElementById('userTitle');
  const userLocation = document.getElementById('userLocation');
  const userBio = document.getElementById('userBio');
  const userEmail = document.getElementById('userEmail');
  const userPhone = document.getElementById('userPhone');
  const skillsList = document.getElementById('skillsList');
  const socialLinks = document.getElementById('socialLinks');
  const statsContainer = document.getElementById('stats');
  const themeToggle = document.getElementById('themeToggle');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const toggleSkillsBtn = document.getElementById('toggleSkills');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  /* =========================
     Animación contador
  ========================= */

  const animateCounter = (element, start, end, duration) => {
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  /* =========================
     Render básico
  ========================= */

  const renderBasicInfo = () => {
    const { name, description, contact } = entityData;

    userName.textContent = name;
    userTitle.textContent = 'Enterprise Accounting Software';
    userLocation.textContent = `📍 ${contact.location}`;
    userBio.textContent = description;
    userEmail.textContent = contact.email;
    userPhone.textContent = contact.phone;
  };

  /* =========================
     Render módulos
  ========================= */

  const renderModules = (showAll = false) => {
    const items = showAll
      ? entityData.modules
      : entityData.modules.slice(0, 4);

    skillsList.innerHTML = items.map(
      ({ name, level }) => `
        <div class="skill-item">
          <div class="skill-name">${name}</div>
          <div class="skill-level">
            <span>${level}%</span>
            <div class="skill-bar">
              <div class="skill-bar-fill" data-width="${level}%"></div>
            </div>
          </div>
        </div>
      `
    ).join('');

    // Animación barras
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 100);
  };

  /* =========================
     Render links
  ========================= */

  const renderLinks = () => {
    socialLinks.innerHTML = entityData.links.map(
      ({ platform, url, icon }) => `
        <a href="${url}" target="_blank" class="social-link">
          ${icon} ${platform}
        </a>
      `
    ).join('');
  };

  /* =========================
     Render estadísticas
  ========================= */

  const renderStats = () => {
    const { stats, modules } = entityData;

    const avgLevel =
      modules.reduce((acc, mod) => acc + mod.level, 0) /
      modules.length;

    const data = [
      { label: 'Clientes', value: stats.clients },
      { label: 'Empresas Activas', value: stats.activeCompanies },
      { label: 'Transacciones', value: stats.transactionsProcessed },
      { label: 'Nivel Promedio', value: Math.floor(avgLevel) }
    ];

    statsContainer.innerHTML = data.map(
      stat => `
        <div class="stat-item">
          <span class="stat-value" data-value="${stat.value}">0</span>
          <span class="stat-label">${stat.label}</span>
        </div>
      `
    ).join('');

    document.querySelectorAll('.stat-value').forEach(el => {
      const finalValue = Number(el.dataset.value);
      animateCounter(el, 0, finalValue, 1500);
    });
  };

  /* =========================
     Tema
  ========================= */

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme;
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    themeToggle.querySelector('.theme-icon').textContent =
      newTheme === 'dark' ? '☀️' : '🌙';

    localStorage.setItem('theme', newTheme);
  };

  const loadTheme = () => {
    const saved = localStorage.getItem('theme') ?? 'light';
    document.documentElement.dataset.theme = saved;
  };

  /* =========================
     Toast
  ========================= */

  const showToast = message => {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(entityData.contact.email);
    showToast('✅ Email copiado');
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(entityData.contact.phone);
    showToast('📱 Número copiado');
  };

  /* =========================
     Mostrar más
  ========================= */

  let showAll = false;

  const toggleModules = () => {
    showAll = !showAll;
    renderModules(showAll);
    toggleSkillsBtn.textContent =
      showAll ? 'Mostrar menos' : 'Mostrar más';
  };

  /* =========================
     Event Listeners
  ========================= */

  themeToggle.addEventListener('click', toggleTheme);
  copyEmailBtn.addEventListener('click', copyEmail);
  copyPhoneBtn.addEventListener('click', copyPhone);
  toggleSkillsBtn.addEventListener('click', toggleModules);

  /* =========================
     Init
  ========================= */

  loadTheme();
  renderBasicInfo();
  renderModules();
  renderLinks();
  renderStats();

});
