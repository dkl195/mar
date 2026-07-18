/* ============================================================
   LUXE AI — Dashboard JavaScript
   ============================================================ */

// ---- KPI COUNTER ANIMATION ----
const kpiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.kpi-card__value[data-val]').forEach(el => {
      const raw = +el.dataset.val;
      const isPercent = el.textContent.includes('%');
      const isCurrency = raw > 1000000;
      const duration = 1600;
      const steps = 60;
      const step = raw / steps;
      let current = 0;
      let count = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, raw);
        count++;
        if (isCurrency) {
          el.textContent = Math.floor(current).toLocaleString('vi-VN') + ' ₫';
        } else if (isPercent || raw < 100) {
          el.textContent = current.toFixed(raw < 10 ? 1 : 0) + (isPercent ? '%' : '');
        } else {
          el.textContent = Math.floor(current).toLocaleString('vi-VN');
        }
        if (count >= steps) clearInterval(timer);
      }, duration / steps);
    });
    kpiObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.kpi-grid').forEach(el => kpiObserver.observe(el));

// ---- REVENUE BAR CHART ----
const chartData = {
  week: {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    values: [120, 185, 95, 210, 167, 280, 145],
    unit: 'triệu ₫'
  },
  month: {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    values: [450, 520, 480, 610, 580, 720, 847, 0, 0, 0, 0, 0],
    unit: 'triệu ₫'
  },
  year: {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    values: [2400, 3800, 5200, 7800, 10200],
    unit: 'triệu ₫'
  }
};

function renderBarChart(period) {
  const canvas = document.getElementById('revenueChart');
  if (!canvas) return;
  const data = chartData[period];
  const maxVal = Math.max(...data.values.filter(v => v > 0));
  canvas.innerHTML = data.labels.map((label, i) => {
    const pct = data.values[i] ? Math.round((data.values[i] / maxVal) * 100) : 0;
    return `
      <div class="chart-bar" style="height:${pct}%;">
        <span class="chart-bar__tooltip">${data.values[i]}M</span>
        <span class="chart-bar__label">${label}</span>
      </div>`;
  }).join('');
}

renderBarChart('week');

document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBarChart(btn.dataset.period);
  });
});

// ---- EXPORT REPORT BUTTON ----
const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    exportBtn.textContent = 'Đang xuất...';
    exportBtn.disabled = true;
    setTimeout(() => {
      exportBtn.textContent = '✓ Đã Xuất PDF';
      exportBtn.style.background = 'var(--success)';
      setTimeout(() => {
        exportBtn.textContent = 'Xuất Báo Cáo';
        exportBtn.style.background = '';
        exportBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}
