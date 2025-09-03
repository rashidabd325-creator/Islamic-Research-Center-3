body.dark-mode {
  background: #121212;
  color: #e0e0e0;
}

body.dark-mode .header {
  background: #1c1c1c;
}

body.dark-mode .service-card,
body.dark-mode .dua-card,
body.dark-mode .contact,
body.dark-mode .hero {
  background: #1e1e1e;
  color: #e0e0e0;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
}

body.dark-mode .prayer-table th {
  background: #333;
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--accent);
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
}

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Hijri Date Loader
function loadHijriDate() {
  const today = new Date();
  const hijri = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);
  document.getElementById('hijri-date').textContent = `আজকের হিজরি তারিখ: ${hijri}`;
}

// Load Prayer Times
function loadPrayerTimes() {
  fetch('assets/data/prayer-times.json')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('prayer-times');
      const today = new Date().toLocaleDateString('bn-BD', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      data.times.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.date}</td>
          <td>${item.Fajr}</td>
          <td>${item.Dhuhr}</td>
          <td>${item.Asr}</td>
          <td>${item.Maghrib}</td>
          <td>${item.Isha}</td>
        `;
        if (item.date.includes(today)) {
          tr.style.background = '#f0f9ff';
          tr.style.fontWeight = 'bold';
        }
        tbody.appendChild(tr);
      });
    });
}

// Load Duas from JSON
function loadDuas() {
  fetch('assets/data/duas.json')
    .then(res => res.json())
    .then(duas => {
      const container = document.getElementById('dua-list');
      container.innerHTML = '';

      duas.forEach(dua => {
        const card = document.createElement('div');
        card.className = 'dua-card';
        card.innerHTML = `
          <h3>${dua.title}</h3>
          <p class="arabic" dir="rtl" lang="ar">${dua.arabic}</p>
          <p><strong>উচ্চারণ:</strong> ${dua.pronunciation}</p>
          <p><strong>অর্থ:</strong> ${dua.meaning}</p>
        `;
        container.appendChild(card);
      });
    });
}

// Dua Search Filter
function setupDuaSearch() {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const duaCards = document.querySelectorAll('.dua-card');
    duaCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
}

// Initialize All
loadHijriDate();
loadPrayerTimes();
loadDuas();
setupDuaSearch();

