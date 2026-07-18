/* ============================================================
   LUXE AI — Warehouse JavaScript
   ============================================================ */

// ---- INVENTORY DATA ----
let inventory = [
  { sku:'LUXE-001-M-BL', name:'Đầm Velvet Đêm', cat:'elegant', size:'M', color:'Đen', qty:3, cost:1200000, price:2850000, threshold:10 },
  { sku:'LUXE-001-L-BL', name:'Đầm Velvet Đêm', cat:'elegant', size:'L', color:'Đen', qty:12, cost:1200000, price:2850000, threshold:10 },
  { sku:'LUXE-001-S-RD', name:'Đầm Velvet Đêm', cat:'elegant', size:'S', color:'Đỏ', qty:0, cost:1200000, price:2850000, threshold:8 },
  { sku:'LUXE-002-L-NV', name:'Vest Premium', cat:'formal', size:'L', color:'Xanh Navy', qty:7, cost:750000, price:1650000, threshold:15 },
  { sku:'LUXE-002-M-GR', name:'Vest Premium', cat:'formal', size:'M', color:'Xám', qty:24, cost:750000, price:1650000, threshold:10 },
  { sku:'LUXE-002-XL-BK', name:'Vest Premium', cat:'formal', size:'XL', color:'Đen', qty:18, cost:750000, price:1650000, threshold:10 },
  { sku:'LUXE-003-S-BE', name:'Set Casual Linen', cat:'casual', size:'S', color:'Beige', qty:22, cost:380000, price:890000, threshold:20 },
  { sku:'LUXE-003-M-GR', name:'Set Casual Linen', cat:'casual', size:'M', color:'Xanh lá', qty:45, cost:380000, price:890000, threshold:20 },
  { sku:'LUXE-003-L-CR', name:'Set Casual Linen', cat:'casual', size:'L', color:'Caramel', qty:31, cost:380000, price:890000, threshold:15 },
  { sku:'LUXE-004-F-BK', name:'Oversized Jacket', cat:'streetwear', size:'Free', color:'Đen', qty:67, cost:550000, price:1290000, threshold:15 },
  { sku:'LUXE-004-F-WH', name:'Oversized Jacket', cat:'streetwear', size:'Free', color:'Trắng', qty:52, cost:550000, price:1290000, threshold:15 },
  { sku:'LUXE-005-S-GR', name:'Jumpsuit Lụa', cat:'elegant', size:'S', color:'Xanh sage', qty:15, cost:950000, price:2350000, threshold:8 },
  { sku:'LUXE-005-M-RO', name:'Jumpsuit Lụa', cat:'elegant', size:'M', color:'Hồng nude', qty:9, cost:950000, price:2350000, threshold:8 },
  { sku:'LUXE-006-M-WH', name:'Áo Sơ Mi Trắng', cat:'formal', size:'M', color:'Trắng', qty:45, cost:220000, price:580000, threshold:20 },
  { sku:'LUXE-007-S-LV', name:'Váy Hoa Nhí', cat:'casual', size:'S', color:'Lavender', qty:0, cost:350000, price:780000, threshold:10 },
];

let filteredInventory = [...inventory];
const PAGE_SIZE = 8;
let currentPage = 1;

function getStatus(item) {
  if (item.qty === 0) return 'out';
  if (item.qty <= item.threshold) return 'low';
  if (item.qty > item.threshold * 4) return 'slow';
  return 'ok';
}
function getStatusLabel(s) {
  return { ok: 'Đủ hàng', low: 'Sắp hết', out: 'Hết hàng', slow: 'Tồn nhiều' }[s] || s;
}
function getStatusClass(s) {
  return { ok: 'status--success', low: 'status--warning', out: 'status--error', slow: 'status--info' }[s];
}

function renderTable() {
  const tbody = document.getElementById('inventoryBody');
  const countEl = document.getElementById('inventoryCount');
  if (!tbody) return;
  const start = (currentPage - 1) * PAGE_SIZE;
  const page = filteredInventory.slice(start, start + PAGE_SIZE);
  tbody.innerHTML = page.map(item => {
    const status = getStatus(item);
    const pct = Math.min(100, Math.round((item.qty / (item.threshold * 4)) * 100));
    const barClass = status === 'out' ? 'out' : status === 'low' ? 'low' : 'ok';
    return `
      <tr>
        <td class="mono">${item.sku}</td>
        <td><strong>${item.name}</strong></td>
        <td><span class="status ${getStatusClass(status === 'ok' ? 'ok' : 'ok')}" style="background:transparent;padding:0;color:var(--text-2);">${item.cat.charAt(0).toUpperCase()+item.cat.slice(1)}</span></td>
        <td>${item.size}</td>
        <td>${item.color}</td>
        <td>
          <div class="stock-bar-wrap">
            <strong>${item.qty}</strong>
            <div class="stock-bar"><div class="stock-bar__fill stock-bar__fill--${barClass}" style="width:${pct}%;"></div></div>
          </div>
        </td>
        <td>${item.cost.toLocaleString('vi-VN')} ₫</td>
        <td>${item.price.toLocaleString('vi-VN')} ₫</td>
        <td><span class="status ${getStatusClass(status)}">${getStatusLabel(status)}</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn" onclick="quickImport('${item.sku}')">+Nhập</button>
            <button class="action-btn action-btn--danger" onclick="deleteItem('${item.sku}')">Xoá</button>
          </div>
        </td>
      </tr>`;
  }).join('');
  if (countEl) countEl.textContent = `Hiển thị ${filteredInventory.length} sản phẩm`;
  renderPagination();
}

function renderPagination() {
  const pg = document.getElementById('pagination');
  if (!pg) return;
  const total = Math.ceil(filteredInventory.length / PAGE_SIZE);
  pg.innerHTML = Array.from({length: total}, (_, i) => i + 1).map(n =>
    `<button class="page-btn ${n === currentPage ? 'active' : ''}" onclick="goPage(${n})">${n}</button>`
  ).join('');
}

function goPage(n) { currentPage = n; renderTable(); }
function quickImport(sku) {
  const item = inventory.find(i => i.sku === sku);
  if (!item) return;
  const qty = prompt(`Nhập số lượng muốn nhập thêm cho ${item.name} (${item.size} - ${item.color}):`, '20');
  if (qty && +qty > 0) {
    item.qty += +qty;
    filteredInventory = [...inventory];
    renderTable();
    showToast(`✓ Nhập thêm ${qty} sản phẩm thành công!`, 'gold');
  }
}
function deleteItem(sku) {
  if (!confirm('Xác nhận xoá SKU này khỏi kho?')) return;
  inventory = inventory.filter(i => i.sku !== sku);
  filteredInventory = [...inventory];
  renderTable();
  showToast('Đã xoá SKU khỏi kho!');
}

// ---- FILTERS ----
function applyFilters() {
  const search = document.getElementById('searchInventory')?.value.toLowerCase() || '';
  const cat = document.getElementById('filterCategory')?.value || '';
  const status = document.getElementById('filterStatus')?.value || '';
  filteredInventory = inventory.filter(item => {
    const s = getStatus(item);
    return (!search || item.name.toLowerCase().includes(search) || item.sku.toLowerCase().includes(search) || item.color.toLowerCase().includes(search))
      && (!cat || item.cat === cat)
      && (!status || s === status);
  });
  currentPage = 1;
  renderTable();
}
document.getElementById('searchInventory')?.addEventListener('input', applyFilters);
document.getElementById('filterCategory')?.addEventListener('change', applyFilters);
document.getElementById('filterStatus')?.addEventListener('change', applyFilters);

// ---- IMPORT MODAL ----
const importModal = document.getElementById('importModal');
document.getElementById('importBtn')?.addEventListener('click', () => importModal?.classList.add('open'));
document.getElementById('closeModal')?.addEventListener('click', () => importModal?.classList.remove('open'));
document.getElementById('cancelModal')?.addEventListener('click', () => importModal?.classList.remove('open'));
importModal?.addEventListener('click', e => { if (e.target === importModal) importModal.classList.remove('open'); });

document.getElementById('importForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('imp-name').value;
  const cat = document.getElementById('imp-cat').value;
  const size = document.getElementById('imp-size').value;
  const color = document.getElementById('imp-color').value || 'Mặc định';
  const qty = +document.getElementById('imp-qty').value;
  const cost = +document.getElementById('imp-cost').value || 0;
  const price = +document.getElementById('imp-price').value || 0;
  const threshold = +document.getElementById('imp-threshold').value || 10;
  const sku = 'LUXE-' + Date.now().toString().slice(-4) + '-' + size.toUpperCase() + '-' + color.substring(0,2).toUpperCase();
  inventory.push({ sku, name, cat, size, color, qty, cost, price, threshold });
  filteredInventory = [...inventory];
  renderTable();
  importModal?.classList.remove('open');
  e.target.reset();
  showToast('✓ Nhập hàng thành công: ' + name);
});

// ---- EXPORT ----
document.getElementById('exportWarehouseBtn')?.addEventListener('click', () => {
  const btn = document.getElementById('exportWarehouseBtn');
  btn.textContent = 'Đang xuất...'; btn.disabled = true;
  setTimeout(() => {
    // Build CSV
    const headers = ['SKU','Sản Phẩm','Danh Mục','Size','Màu','Tồn Kho','Giá Nhập','Giá Bán','Trạng Thái'];
    const rows = inventory.map(i => [i.sku,i.name,i.cat,i.size,i.color,i.qty,i.cost,i.price,getStatusLabel(getStatus(i))]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = 'kho-hang-luxeai-' + new Date().toISOString().slice(0,10) + '.csv';
    a.click(); URL.revokeObjectURL(url);
    btn.textContent = '✓ Đã Xuất'; btn.style.background = 'var(--success)';
    setTimeout(() => { btn.textContent = 'Xuất Excel'; btn.style.background = ''; btn.disabled = false; }, 3000);
  }, 800);
});

// ---- INIT ----
renderTable();
