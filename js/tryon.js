/* ============================================================
   LUXE AI — Try-On JavaScript
   ============================================================ */

const outfits = [
  { name:'Đầm Dạ Hội Velvet', price:'2.850.000 ₫', cat:'Elegant', grad:'linear-gradient(145deg,#1a0a2e,#3d1a5e)', tips:['Phối giày cao gót nude tôn dáng hoàn hảo','Túi clutch metallic gold tạo điểm nhấn','Tóc búi thấp hoặc sóng lớn thả vai','Tông trang điểm đỏ berry hoặc nude hồng'] },
  { name:'Vest Công Sở Premium', price:'1.650.000 ₫', cat:'Formal', grad:'linear-gradient(145deg,#0d1a2e,#1e3a5f)', tips:['Áo sơ mi trắng bên trong luôn đúng điệu','Giày Oxford hoặc loafer da bóng','Thắt lưng da đồng màu giày','Tóc gọn gàng, trang điểm tự nhiên'] },
  { name:'Set Casual Linen', price:'890.000 ₫', cat:'Casual', grad:'linear-gradient(145deg,#2e1a0a,#5e3d1a)', tips:['Sneaker trắng hoặc sandal flat thoải mái','Túi tote canvas hoặc cói nhẹ nhàng','Tóc đuôi ngựa hoặc búi cẩu tự nhiên','Trang điểm nhẹ với son tint hồng cam'] },
  { name:'Oversized Jacket', price:'1.290.000 ₫', cat:'Streetwear', grad:'linear-gradient(145deg,#0a0a0a,#2a2a2a)', tips:['Quần cargo hoặc jogger phù hợp nhất','Giày chunky sneaker hoặc boots ankle','Bucket hat hay beanie tạo vibe cá tính','Phối cùng crossbody bag nhỏ'] },
  { name:'Váy Hoa Nhí Tầng', price:'780.000 ₫', cat:'Romantic', grad:'linear-gradient(145deg,#ffe0e6,#ffb6c1)', tips:['Áo crop top trắng hoặc off-shoulder nhẹ','Giày mary jane hoặc block heel cute','Túi nhỏ mini bag phong cách vintage','Tóc mái curtain bangs hoặc uốn nhẹ'] },
  { name:'Jumpsuit Lụa', price:'2.350.000 ₫', cat:'Elegant', grad:'linear-gradient(145deg,#1a2a1a,#3a5a3a)', tips:['Thắt dây belt vải cùng màu để tôn eo','Giày mũi nhọn cao gót tăng chiều cao','Tóc xoã hoặc búi Pháp tinh tế','Son màu đất hoặc nude rose quyến rũ'] },
];

let selectedOutfit = 0;
let userImageData = null;
let isProcessed = false;

// ---- USER IMAGE UPLOAD ----
const tryonUserUpload = document.getElementById('tryonUserUpload');
const tryonUserInput = document.getElementById('tryonUserInput');
const tryonPreview = document.getElementById('tryonPreview');

if (tryonUserUpload) {
  tryonUserUpload.addEventListener('click', () => tryonUserInput?.click());
  tryonUserUpload.addEventListener('dragover', e => {
    e.preventDefault();
    tryonUserUpload.style.borderColor = 'var(--gold)';
  });
  tryonUserUpload.addEventListener('dragleave', () => tryonUserUpload.style.borderColor = '');
  tryonUserUpload.addEventListener('drop', e => {
    e.preventDefault();
    tryonUserUpload.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file) handleUserImage(file);
  });
}
if (tryonUserInput) {
  tryonUserInput.addEventListener('change', () => {
    if (tryonUserInput.files[0]) handleUserImage(tryonUserInput.files[0]);
  });
}

function handleUserImage(file) {
  if (!file.type.startsWith('image/')) { showToast('Vui lòng chọn file ảnh!'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('Ảnh tối đa 5MB!'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    userImageData = e.target.result;
    // Show preview
    if (tryonPreview) {
      tryonPreview.innerHTML = `
        <img src="${userImageData}" alt="Ảnh của bạn" />
        <p style="color:var(--success);font-size:0.78rem;">✓ Đã tải ảnh thành công</p>
      `;
    }
    showToast('✓ Ảnh đã sẵn sàng — Nhấn "Áp Dụng AI Try-On"', 'gold');
  };
  reader.readAsDataURL(file);
}

// ---- OUTFIT SELECTION ----
document.querySelectorAll('.outfit-thumb').forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.outfit-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    selectedOutfit = i;
    updateOutfitInfo(i);
    if (isProcessed) renderViews(i);
  });
});

function updateOutfitInfo(idx) {
  const o = outfits[idx];
  if (!o) return;
  const swatch = document.getElementById('outfitSwatch');
  const nameEl = document.getElementById('outfitName');
  const priceEl = document.getElementById('outfitPrice');
  const tipsEl = document.getElementById('aiTipList');
  if (swatch) swatch.style.background = o.grad;
  if (nameEl) nameEl.textContent = o.name;
  if (priceEl) priceEl.textContent = o.price;
  if (tipsEl) {
    tipsEl.innerHTML = o.tips.map(t => `
      <div class="ai-tip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        ${t}
      </div>`).join('');
  }
}

// ---- COLOR SELECTION ----
document.querySelectorAll('.palette-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (isProcessed) {
      // update color tint on views
      const color = btn.dataset.color;
      document.querySelectorAll('.tryon-view__placeholder').forEach(p => {
        p.style.filter = `hue-rotate(${getHueRotate(color)}deg)`;
      });
    }
  });
});

function getHueRotate(hex) {
  const hues = { '#1a0a2e':270, '#8B0000':0, '#1a2a1a':120, '#2c3e50':210, '#c0392b':10, '#f5e6d3':40, '#4a9e6e':150, '#9b59b6':290 };
  return hues[hex] || 0;
}

// ---- APPLY TRY-ON ----
const applyBtn = document.getElementById('applyTryonBtn');
if (applyBtn) {
  applyBtn.addEventListener('click', () => {
    applyBtn.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
    applyBtn.disabled = true;

    // Show result container
    const empty = document.getElementById('canvasEmpty');
    const result = document.getElementById('canvasResult');
    const processing = document.getElementById('processingOverlay');
    const actions = document.getElementById('canvasActions');
    if (empty) empty.style.display = 'none';
    if (result) result.classList.remove('hidden');
    if (processing) processing.style.display = 'flex';

    setTimeout(() => {
      if (processing) processing.style.display = 'none';
      renderViews(selectedOutfit);
      if (actions) actions.style.display = 'flex';
      isProcessed = true;
      applyBtn.innerHTML = '✓ Đã Áp Dụng — Đổi & Thử Lại';
      applyBtn.disabled = false;
      showToast('✨ AI Try-On hoàn tất! Xem kết quả bên phải.', 'gold');
    }, 2400);
  });
}

function renderViews(idx) {
  const o = outfits[idx];
  const selectedColor = document.querySelector('.palette-btn.active')?.dataset.color || o.grad.match(/#[0-9a-f]+/i)?.[0];

  const gradients = [
    o.grad,
    o.grad.replace('145deg', '315deg'),
    o.grad.replace('145deg', '225deg'),
    o.grad.replace('145deg', '45deg'),
  ];

  const viewIds = ['mainViewPlaceholder','view2Placeholder','view3Placeholder','view4Placeholder'];
  viewIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.cssText = `
      background: ${gradients[i] || o.grad};
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.25);
      font-family: var(--font-serif);
      font-size: ${i === 0 ? '1.8rem' : '1.2rem'};
      font-weight: 300;
      font-style: italic;
      min-height: ${i === 0 ? '400px' : 'auto'};
      aspect-ratio: ${i === 0 ? '2/3' : '3/4'};
    `;
    el.textContent = i === 0 ? o.name : ['↑ Sau', '← Trái', 'Phải →'][i-1];
    el.setAttribute('data-grad', gradients[i]);
  });
}

// ---- CANVAS ACTIONS ----
document.getElementById('saveResult')?.addEventListener('click', () => {
  showToast('✓ Đã lưu ảnh try-on vào Cloud Storage!', 'gold');
});
document.getElementById('shareResult')?.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({ title: 'LUXE AI Try-On', url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('✓ Đã sao chép link chia sẻ!');
  }
});
document.getElementById('buyOutfit')?.addEventListener('click', () => {
  window.location.href = 'shop.html';
});

// INIT
updateOutfitInfo(0);
