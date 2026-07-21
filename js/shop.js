/* ============================================================
   LUXE AI — Shop JavaScript
   ============================================================ */

const shopProducts = [
  { id:1, name:'Đầm Dạ Hội Velvet', cat:'elegant', price:2850000, sizes:['S','M','L'], colors:['#1a0a2e','#8B0000','#1a2a1a'], grad:'linear-gradient(145deg,#1a0a2e,#3d1a5e)', badge:'Mới', desc:'Sang trọng tuyệt đối cho đêm tiệc', rating:4.9, sold:148 },
  { id:2, name:'Vest Công Sở Premium', cat:'formal', price:1650000, oldPrice:1950000, sizes:['S','M','L','XL'], colors:['#2c3e50','#7f8c8d','#1a1a1a'], grad:'linear-gradient(145deg,#0d1a2e,#1e3a5f)', badge:'-15%', desc:'Chuyên nghiệp và lịch lãm tại văn phòng', rating:4.7, sold:97 },
  { id:3, name:'Set Casual Linen', cat:'casual', price:890000, sizes:['XS','S','M','L','XL'], colors:['#f5e6d3','#d4a96a','#8fbc8f'], grad:'linear-gradient(145deg,#2e1a0a,#5e3d1a)', badge:null, desc:'Nhẹ nhàng, thoải mái cho ngày thường', rating:4.8, sold:203 },
  { id:4, name:'Oversized Jacket', cat:'streetwear', price:1290000, sizes:['Free'], colors:['#000','#fff','#c0392b'], grad:'linear-gradient(145deg,#0a0a0a,#2a2a2a)', badge:'Hot', desc:'Năng động, cá tính, đầy phong cách', rating:4.6, sold:76 },
  { id:5, name:'Jumpsuit Lụa Thắt Eo', cat:'elegant', price:2350000, sizes:['S','M','L'], colors:['#2e4a7e','#8fbc8f','#c9a0dc'], grad:'linear-gradient(145deg,#1a2a1a,#3a5a3a)', badge:'Mới', desc:'Đẳng cấp trong từng đường chỉ', rating:4.9, sold:54 },
  { id:6, name:'Áo Sơ Mi Trắng Premium', cat:'formal', price:580000, sizes:['S','M','L','XL','XXL'], colors:['#fff','#f0f0f0','#e8e8f0'], grad:'linear-gradient(145deg,#2c3e50,#7f8c8d)', badge:null, desc:'Cổ điển, không bao giờ lỗi mốt', rating:4.5, sold:312 },
  { id:7, name:'Váy Hoa Nhí Tầng', cat:'romantic', price:780000, sizes:['XS','S','M'], colors:['#ffb6c1','#ffd0e0','#ffe4e1'], grad:'linear-gradient(145deg,#ffe0e6,#ffb6c1)', badge:null, desc:'Dịu dàng và lãng mạn như nắng sớm', rating:4.7, sold:89 },
  { id:8, name:'Bộ Co-ord Sọc', cat:'casual', price:950000, sizes:['S','M','L'], colors:['#f5f5f5','#1a1a1a','#4a9e6e'], grad:'linear-gradient(145deg,#1a3a1a,#2a5a2a)', badge:null, desc:'Trẻ trung và thoải mái mọi lúc', rating:4.6, sold:67 },
  { id:9, name:'Áo Lụa + Chân Váy Midi', cat:'elegant', price:1950000, sizes:['XS','S','M','L'], colors:['#d4a96a','#c9a0dc','#f5e6d3'], grad:'linear-gradient(145deg,#2e1a0a,#6e4a2a)', badge:null, desc:'Nhẹ nhàng, tinh tế, nữ tính', rating:4.8, sold:42 },
  { id:10, name:'Bomber Jacket Graphic', cat:'streetwear', price:1490000, sizes:['S','M','L','XL'], colors:['#c0392b','#000','#2c3e50'], grad:'linear-gradient(145deg,#c0392b,#5a0000)', badge:'Limited', desc:'Nổi bật giữa đám đông', rating:4.5, sold:33 },
  { id:11, name:'Bộ Suit Kẻ Sọc Fine', cat:'formal', price:2890000, sizes:['S','M','L','XL'], colors:['#1c1c1c','#2c3e50','#4a4a4a'], grad:'linear-gradient(145deg,#1c1c1c,#3a3a3a)', badge:'Premium', desc:'Tạo ấn tượng trong cuộc họp quan trọng', rating:4.9, sold:28 },
  { id:12, name:'Set Đính Nơ Crop', cat:'romantic', price:890000, sizes:['XS','S','M'], colors:['#f5e6ff','#ffd0e0','#ffe4b5'], grad:'linear-gradient(145deg,#f5e6ff,#e0c0ff)', badge:null, desc:'Đáng yêu và trẻ trung mọi nơi', rating:4.7, sold:95 },
];

let currentProducts = [...shopProducts];
let currentView = 'grid';

// ---- RENDER PRODUCTS ----
function renderProducts(products) {
  const grid = document.getElementById('shopGrid');
  const count = document.getElementById('shopCount');
  if (!grid) return;
  if (count) count.textContent = `${products.length} sản phẩm`;

  grid.innerHTML = products.map(p => `
    <div class="product-card reveal" data-category="${p.cat}" data-id="${p.id}">
      <div class="product-card__image">
        <div class="product-card__placeholder" style="background:${p.grad};">
          <span>${p.name}</span>
        </div>
        <div class="product-card__overlay">
          <button class="btn-icon-circle fav-btn" data-id="${p.id}" title="Yêu thích">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="btn-icon-circle btn-tryon" data-id="${p.id}">3D Try</button>
        </div>
        ${p.badge ? `<span class="product-card__badge ${p.badge.includes('%') ? 'product-card__badge--sale' : ''}">${p.badge}</span>` : ''}
        <div class="product-card__rating">
          <span>★ ${p.rating}</span>
          <span>${p.sold} đã bán</span>
        </div>
      </div>
      <div class="product-card__info">
        <span class="product-card__cat">${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</span>
        <h3>${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__sizes">
          ${p.sizes.map(s => `<span class="size-chip">${s}</span>`).join('')}
        </div>
        <div class="product-card__colors">
          ${p.colors.map(c => `<span class="color-dot" style="background:${c};${c==='#fff'?'border:1px solid #ddd;':''}"></span>`).join('')}
        </div>
        <div class="product-card__footer">
          <div>
            <span class="price">${p.price.toLocaleString('vi-VN')} ₫</span>
            ${p.oldPrice ? `<span class="price-old">${p.oldPrice.toLocaleString('vi-VN')} ₫</span>` : ''}
          </div>
          <button class="btn-add" onclick="addToCart(${p.id})">+ Giỏ</button>
        </div>
      </div>
    </div>
  `).join('');

  // trigger reveal
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 60);
  });

  // fav buttons
  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('faved');
      btn.style.background = btn.classList.contains('faved') ? 'var(--gold)' : '';
      btn.style.color = btn.classList.contains('faved') ? 'var(--dark)' : '';
    });
  });

  // 3d try
  grid.querySelectorAll('.btn-tryon').forEach(btn => {
    btn.addEventListener('click', () => window.location.href = 'tryon.html');
  });
}

// ---- FILTER + SORT ----
function applyShopFilters() {
  const search = document.getElementById('shopSearch')?.value.toLowerCase() || '';
  const priceMax = +document.getElementById('priceRange')?.value || 10000000;
  const selectedSize = document.querySelector('.size-opt.active')?.dataset.size || 'all';
  const checkedCats = [...document.querySelectorAll('#catFilter input:checked')].map(i => i.value);

  let filtered = shopProducts.filter(p => {
    const catMatch = checkedCats.includes('all') || checkedCats.includes(p.cat);
    const priceMatch = p.price <= priceMax;
    const sizeMatch = selectedSize === 'all' || p.sizes.includes(selectedSize);
    const searchMatch = !search || p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search) || p.cat.toLowerCase().includes(search);
    return catMatch && priceMatch && sizeMatch && searchMatch;
  });

  const sort = document.getElementById('sortSelect')?.value || 'default';
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  else if (sort === 'new') filtered.sort((a, b) => b.id - a.id);

  currentProducts = filtered;
  renderProducts(filtered);
}

// EVENT BINDINGS
document.getElementById('applyFilter')?.addEventListener('click', applyShopFilters);
document.getElementById('sortSelect')?.addEventListener('change', applyShopFilters);
document.getElementById('shopSearchBtn')?.addEventListener('click', applyShopFilters);
document.getElementById('shopSearch')?.addEventListener('keypress', e => { if (e.key === 'Enter') applyShopFilters(); });

document.getElementById('priceRange')?.addEventListener('input', function() {
  const label = document.getElementById('priceMax');
  if (label) label.textContent = (+this.value).toLocaleString('vi-VN') + ' ₫';
});

document.querySelectorAll('.size-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('#catFilter input').forEach(cb => {
  cb.addEventListener('change', function() {
    if (this.value === 'all' && this.checked) {
      document.querySelectorAll('#catFilter input:not([value="all"])').forEach(i => i.checked = false);
    } else if (this.value !== 'all') {
      const allCb = document.querySelector('#catFilter input[value="all"]');
      if (allCb) allCb.checked = false;
    }
  });
});

// VIEW TOGGLE
document.getElementById('viewGrid')?.addEventListener('click', () => {
  currentView = 'grid';
  document.getElementById('shopGrid')?.classList.remove('list-view');
  document.getElementById('viewGrid')?.classList.add('active');
  document.getElementById('viewList')?.classList.remove('active');
});
document.getElementById('viewList')?.addEventListener('click', () => {
  currentView = 'list';
  document.getElementById('shopGrid')?.classList.add('list-view');
  document.getElementById('viewList')?.classList.add('active');
  document.getElementById('viewGrid')?.classList.remove('active');
});

// ADD TO CART
function addToCart(id) {
  const p = shopProducts.find(p => p.id === id);
  if (!p) return;
  showToast('✓ Đã thêm: ' + p.name);
}

// INIT
renderProducts(shopProducts);

// extra CSS for shop-specific elements
const extraStyle = document.createElement('style');
extraStyle.textContent = `
  .product-card__rating {
    position: absolute; bottom: 0.75rem; right: 0.75rem;
    display: flex; gap: 0.5rem;
    font-size: 0.65rem; font-weight: 600;
    color: rgba(255,255,255,0.9);
    background: rgba(0,0,0,0.4);
    padding: 0.25rem 0.6rem;
    border-radius: 100px;
  }
  .product-card__desc {
    font-size: 0.75rem; color: var(--text-3);
    margin: 0.4rem 0 0.75rem;
    line-height: 1.5;
  }
  .product-card__sizes {
    display: flex; flex-wrap: wrap; gap: 0.3rem;
    margin-bottom: 0.6rem;
  }
  .size-chip {
    padding: 0.15rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 0.65rem;
    color: var(--text-3);
  }
`;
document.head.appendChild(extraStyle);
