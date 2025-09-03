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
