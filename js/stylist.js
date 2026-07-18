/* ============================================================
   LUXE AI — Stylist Page Logic
   ============================================================ */

// ---- STEP NAVIGATION ----
let currentStep = 1;
function goToStep(n) {
  document.getElementById('panel-' + currentStep).classList.add('hidden');
  document.getElementById('panel-' + n).classList.remove('hidden');
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.toggle('step--active', i + 1 === n);
    s.classList.toggle('step--done', i + 1 < n);
  });
  currentStep = n;
}
document.querySelectorAll('.step-next').forEach(btn => {
  btn.addEventListener('click', () => goToStep(+btn.dataset.next));
});
document.querySelectorAll('.step-prev').forEach(btn => {
  btn.addEventListener('click', () => goToStep(+btn.dataset.prev));
});
document.querySelectorAll('.step[data-step]').forEach(el => {
  el.addEventListener('click', () => {
    const n = +el.dataset.step;
    if (n <= currentStep || el.classList.contains('step--done')) goToStep(n);
  });
});

// ---- PICKERS ----
document.querySelectorAll('.skin-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const label = document.getElementById('skinLabel');
    if (label) label.textContent = '✓ Đã chọn: ' + (btn.dataset.name || '');
  });
});
document.querySelectorAll('.shape-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
document.querySelectorAll('.style-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});

// ---- BUDGET SLIDER ----
const slider = document.getElementById('budgetSlider');
const budgetVal = document.getElementById('budgetVal');
if (slider && budgetVal) {
  slider.addEventListener('input', () => {
    const val = +slider.value;
    budgetVal.textContent = val.toLocaleString('vi-VN') + ' ₫';
  });
}

// ---- FACE UPLOAD ----
const faceUpload2 = document.getElementById('faceUpload2');
const faceInput2 = document.getElementById('faceInput2');
if (faceUpload2 && faceInput2) {
  faceUpload2.addEventListener('click', () => faceInput2.click());
  faceInput2.addEventListener('change', () => {
    if (faceInput2.files.length) {
      const p = faceUpload2.querySelector('p');
      if (p) { p.innerHTML = '✓ Ảnh đã tải lên thành công'; p.style.color = 'var(--success)'; }
    }
  });
}

// ---- SIZE CALCULATOR ----
function calcSize(height, weight, chest, gender) {
  const bmi = weight / ((height / 100) ** 2);
  if (gender === 'female') {
    if (chest) {
      if (chest <= 80) return 'XS';
      if (chest <= 84) return 'S';
      if (chest <= 88) return 'M';
      if (chest <= 92) return 'L';
      if (chest <= 96) return 'XL';
      return 'XXL';
    }
    if (bmi < 18.5) return 'XS';
    if (bmi < 21) return 'S';
    if (bmi < 24) return 'M';
    if (bmi < 27) return 'L';
    return 'XL';
  } else {
    if (chest) {
      if (chest <= 88) return 'S';
      if (chest <= 92) return 'M';
      if (chest <= 96) return 'L';
      if (chest <= 100) return 'XL';
      return 'XXL';
    }
    if (bmi < 19) return 'S';
    if (bmi < 22.5) return 'M';
    if (bmi < 25.5) return 'L';
    if (bmi < 28) return 'XL';
    return 'XXL';
  }
}

// ---- AI DATA ----
const outfitData = {
  casual: [
    { name: 'Set Casual Linen Pastel', price: '890.000 ₫', desc: 'Áo thun linen nhẹ nhàng + quần wide-leg', grad: 'linear-gradient(145deg, #f5e6d3, #d4a96a)', style: 'Casual' },
    { name: 'Jeans Trắng + Blouse', price: '1.150.000 ₫', desc: 'Phối đồ năng động cho ngày đẹp trời', grad: 'linear-gradient(145deg, #e8f0fe, #b0c4de)', style: 'Casual' },
    { name: 'Bộ Co-ord Sọc Đơn Giản', price: '780.000 ₫', desc: 'Trẻ trung và thoải mái mọi lúc', grad: 'linear-gradient(145deg, #f0e6ff, #c9b0de)', style: 'Casual' }
  ],
  formal: [
    { name: 'Vest Blazer Công Sở', price: '1.650.000 ₫', desc: 'Chuyên nghiệp và lịch lãm tại văn phòng', grad: 'linear-gradient(145deg, #1a2a4a, #2d4a6a)', style: 'Formal' },
    { name: 'Áo Sơ Mi Trắng + Quần Âu', price: '980.000 ₫', desc: 'Cổ điển không bao giờ lỗi mốt', grad: 'linear-gradient(145deg, #2c3e50, #7f8c8d)', style: 'Formal' },
    { name: 'Bộ Suit Kẻ Sọc Fine', price: '2.890.000 ₫', desc: 'Tạo ấn tượng trong các cuộc họp quan trọng', grad: 'linear-gradient(145deg, #1c1c1c, #3a3a3a)', style: 'Formal' }
  ],
  elegant: [
    { name: 'Đầm Dạ Hội Velvet Deep', price: '2.850.000 ₫', desc: 'Sang trọng tuyệt đối cho đêm tiệc', grad: 'linear-gradient(145deg, #1a0a2e, #3d1a5e)', style: 'Elegant' },
    { name: 'Áo Lụa + Chân Váy Midi', price: '1.950.000 ₫', desc: 'Nhẹ nhàng, tinh tế, nữ tính', grad: 'linear-gradient(145deg, #2e1a0a, #6e4a2a)', style: 'Elegant' },
    { name: 'Jumpsuit Lụa Thắt Eo', price: '2.350.000 ₫', desc: 'Đẳng cấp trong từng đường chỉ', grad: 'linear-gradient(145deg, #0a1a0a, #1a3a1a)', style: 'Elegant' }
  ],
  streetwear: [
    { name: 'Oversized Hoodie + Cargo', price: '1.290.000 ₫', desc: 'Năng động, cá tính, đầy phong cách', grad: 'linear-gradient(145deg, #0a0a0a, #2a2a2a)', style: 'Street' },
    { name: 'Bomber Jacket Graphic', price: '1.490.000 ₫', desc: 'Nổi bật giữa đám đông', grad: 'linear-gradient(145deg, #c0392b, #5a0000)', style: 'Street' },
    { name: 'Co-ord Sporty Utility', price: '1.150.000 ₫', desc: 'Vừa thể thao vừa thời thượng', grad: 'linear-gradient(145deg, #0a2a1a, #1a5a3a)', style: 'Street' }
  ],
  romantic: [
    { name: 'Váy Hoa Nhí Tầng', price: '1.050.000 ₫', desc: 'Dịu dàng và lãng mạn như nắng sớm', grad: 'linear-gradient(145deg, #ffe0e6, #ffb6c1)', style: 'Romantic' },
    { name: 'Đầm Ren Trắng Ống Tay', price: '1.450.000 ₫', desc: 'Tinh khiết và đầy nữ tính', grad: 'linear-gradient(145deg, #fff0f5, #ffd0e0)', style: 'Romantic' },
    { name: 'Set Crop Đính Nơ', price: '890.000 ₫', desc: 'Đáng yêu và trẻ trung mọi nơi', grad: 'linear-gradient(145deg, #f5e6ff, #e0c0ff)', style: 'Romantic' }
  ]
};

const colorsByTone = {
  '#FDECD2': [
    { color: '#1a0a2e', name: 'Tím huyền bí', note: 'Tôn làn da sáng hoàn hảo' },
    { color: '#2c3e50', name: 'Xanh hải quân', note: 'Thanh lịch và đẳng cấp' },
    { color: '#8B0000', name: 'Đỏ đậm', note: 'Nổi bật và quyến rũ' },
    { color: '#d4a96a', name: 'Caramel', note: 'Harmonize với tông da' },
    { color: '#4a9e6e', name: 'Xanh lá mint', note: 'Tươi mát và hiện đại' }
  ],
  '#E8A87C': [
    { color: '#1c3a1c', name: 'Xanh đậm rừng', note: 'Tương phản đẹp với da lúa mì' },
    { color: '#c0392b', name: 'Đỏ rực', note: 'Tôn màu da khỏe mạnh' },
    { color: '#f5f5dc', name: 'Beige kem', note: 'Hòa sắc tự nhiên' },
    { color: '#2e4a7e', name: 'Cobalt Blue', note: 'Tươi sáng và trẻ trung' },
    { color: '#8b5a2b', name: 'Chocolate', note: 'Tone-on-tone tinh tế' }
  ]
};

const hairstyles = {
  oval: [
    { icon: '💇', name: 'Bob thẳng', desc: 'Phù hợp mọi phong cách' },
    { icon: '👩', name: 'Tóc dài thả', desc: 'Nữ tính, thanh lịch' },
    { icon: '💆', name: 'Pixie Cut', desc: 'Cá tính, hiện đại' }
  ],
  round: [
    { icon: '💇', name: 'Tóc layer dài', desc: 'Kéo dài khuôn mặt' },
    { icon: '👩', name: 'Búi cao', desc: 'Tôn lên vẻ thanh thoát' },
    { icon: '💆', name: 'Sóng lớn', desc: 'Tạo chiều sâu' }
  ]
};

const faceShapeLabels = { oval: 'Trái xoan', round: 'Tròn', square: 'Vuông', heart: 'Trái tim', rectangle: 'Chữ nhật' };

// ---- ANALYZE ----
const analyzeBtn = document.getElementById('analyzeBtn');
if (analyzeBtn) {
  analyzeBtn.addEventListener('click', () => {
    const height = +document.getElementById('s-height').value;
    const weight = +document.getElementById('s-weight').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'female';
    const chest = +document.getElementById('s-chest').value || 0;
    if (!height || !weight) { showToast('Vui lòng nhập chiều cao và cân nặng!'); return; }

    const selectedStyles = [...document.querySelectorAll('.style-btn.active')].map(b => b.dataset.val);
    const primaryStyle = selectedStyles[0] || 'casual';
    const skinColor = document.querySelector('.skin-btn.active')?.dataset.color || '#E8A87C';
    const size = calcSize(height, weight, chest, gender);
    const budget = +document.getElementById('budgetSlider').value;

    analyzeBtn.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
    analyzeBtn.disabled = true;

    setTimeout(() => {
      analyzeBtn.innerHTML = '✓ Phân Tích Hoàn Tất';
      renderResults({ size, primaryStyle, skinColor, selectedStyles, height, weight, gender, budget });
    }, 2000);
  });
}

function renderResults({ size, primaryStyle, skinColor, selectedStyles, height, weight, gender, budget }) {
  const empty = document.getElementById('resultsEmpty');
  const content = document.getElementById('resultsContent');
  if (!empty || !content) return;
  empty.classList.add('hidden');
  content.classList.remove('hidden');

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const outfits = (outfitData[primaryStyle] || outfitData.casual).filter(o => {
    const p = parseInt(o.price.replace(/\D/g, ''));
    return p <= budget;
  });
  const colors = colorsByTone[skinColor] || colorsByTone['#E8A87C'];
  const hStyles = hairstyles.oval;

  content.innerHTML = `
    <div class="results-header reveal">
      <div class="results-header__size-badge">✦ Size Phù Hợp: ${size}</div>
      <h3>Phong Cách ${primaryStyle.charAt(0).toUpperCase() + primaryStyle.slice(1)} — BMI ${bmi}</h3>
      <p>Gợi ý dành riêng cho bạn dựa trên số đo cơ thể và sở thích phong cách</p>
    </div>

    <div class="result-section reveal">
      <h3>✦ Bộ Trang Phục Đề Xuất</h3>
      <div class="outfits-grid">
        ${outfits.map((o, i) => `
          <div class="outfit-card ${i === 0 ? 'selected' : ''}">
            <div class="outfit-card__img" style="background:${o.grad};">
              <span class="outfit-card__style-tag">${o.style}</span>
            </div>
            <div class="outfit-card__info">
              <h4>${o.name}</h4>
              <p>${o.desc}</p>
              <div class="outfit-card__price">${o.price}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="result-section reveal">
      <h3>✦ Màu Sắc Phù Hợp Với Làn Da</h3>
      <div class="color-suggestions">
        ${colors.map(c => `
          <div class="color-suggestion-row">
            <div class="color-swatch" style="background:${c.color};"></div>
            <div>
              <strong>${c.name}</strong>
              <span>${c.note}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="result-section reveal">
      <h3>✦ Kiểu Tóc Gợi Ý</h3>
      <div class="hairstyle-grid">
        ${hStyles.map(h => `
          <div class="hairstyle-card">
            <div class="hairstyle-card__icon">${h.icon}</div>
            <h4>${h.name}</h4>
            <p>${h.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="reveal">
      <a href="shop.html" class="btn-primary btn-full btn-large">Mua Sắm Theo Phong Cách Này →</a>
    </div>
  `;

  // re-observe new reveals
  content.querySelectorAll('.reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });

  // outfit card select
  content.querySelectorAll('.outfit-card').forEach(card => {
    card.addEventListener('click', () => {
      content.querySelectorAll('.outfit-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
