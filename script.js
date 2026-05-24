// ---- View Management ----
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  window.scrollTo(0, 0);
}

function showDashboard() {
  showView('dashboard-view');
  showPanel('overview');
}

// ---- Auth ----
function switchAuthTab(tab) {
  document.getElementById('login-tab').classList.toggle('active', tab === 'login');
  document.getElementById('register-tab').classList.toggle('active', tab === 'register');
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin(event) {
  const btn = event.target;
  const orig = btn.textContent;
  btn.innerHTML = '<span class="spinner"></span> Signing in...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.disabled = false;
    showDashboard();
    showToast('Welcome back, Rahul! 👋', 'success');
  }, 1200);
}

// ---- Dashboard Panels ----
const panelMeta = {
  'overview': ['Dashboard Overview', 'Your health summary for today'],
  'appointments': ['My Appointments', 'Manage all your scheduled visits'],
  'reports': ['Health Records', 'Your medical documents & reports'],
  'find-doctors': ['Find Doctors', 'Search 50,000+ verified specialists'],
  'hospitals-dash': ['Hospitals & Clinics', 'Find and compare hospitals near you'],
  'vitals': ['Vitals Tracker', 'Monitor your daily health metrics'],
  'medications': ['Medications', 'Track your prescriptions & doses'],
  'payments': ['Payments & Billing', 'All your healthcare transactions'],
  'alerts': ['Alerts & Notifications', 'Stay updated on your health'],
  'profile': ['My Profile', 'Personal & medical information'],
  'settings': ['Settings', 'Preferences & security'],
};

function showPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  const panel = document.getElementById('panel-' + name);
  if (panel) panel.classList.add('active');
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  const meta = panelMeta[name] || [name, ''];
  document.getElementById('panel-title').textContent = meta[0];
  document.getElementById('panel-subtitle').textContent = meta[1] + ' · PatientFirst';
}

// ---- Modal ----
function openBookingModal(name, spec) {
  document.getElementById('modal-doctor-name').textContent = name;
  document.getElementById('modal-doctor-spec').textContent = spec;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('appt-date').value = tomorrow.toISOString().split('T')[0];
  document.getElementById('booking-modal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function selectSlot(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function confirmBooking() {
  closeModal('booking-modal');
  setTimeout(() => {
    document.getElementById('payment-modal').classList.add('open');
  }, 300);
}

function selectPayment(el) {
  document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
}

function processPayment(event) {
  const btn = event.target;
  const orig = btn.textContent;
  btn.innerHTML = '<span class="spinner"></span> Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.disabled = false;
    closeModal('payment-modal');
    showToast('Payment of ₹850 successful! Appointment confirmed. 🎉', 'success');
    setTimeout(() => showToast('Confirmation sent to rahul.sharma@email.com 📧', 'info'), 1500);
  }, 2000);
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

// ---- Filter Chips ----
function filterChip(el) {
  el.closest('.filter-chips').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// ---- Upload ----
function triggerUpload() {
  showToast('File upload dialog opened. Select a PDF, JPG, or PNG.', 'info');
  setTimeout(() => showToast('report_blood_test.pdf uploaded successfully! 📋', 'success'), 2500);
}

// ---- Toast Notifications ----
function showToast(msg, type = 'info') {
  const icons = { success: '✅', warning: '⚠️', info: 'ℹ️' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(24px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });
});

setTimeout(() => {
  if (document.getElementById('dashboard-view').classList.contains('active')) {
    showToast('💊 Reminder: Take your Metformin 500mg with dinner', 'warning');
  }
}, 4000);
