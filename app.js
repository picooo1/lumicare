// ===== Firebase =====
const firebaseConfig = {
  apiKey: "AIzaSyCvsQt5n0W85v0Ys-h7lB0wdgKxtKTS-vI",
  authDomain: "smart-mat-dbc27.firebaseapp.com",
  databaseURL: "https://smart-mat-dbc27-default-rtdb.firebaseio.com",
  projectId: "smart-mat-dbc27",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===== DOM =====
const alertOverlay = document.getElementById("alert-overlay");
const alertMessage = document.getElementById("alert-message");
const statusPill = document.getElementById("status-pill");
const lastActive = document.getElementById("last-active");

// ===== State =====
let alertLocked = false;

// ===== Navigation =====
window.switchTab = function(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

// ===== Alerts =====
window.resolveAlert = function() {
  alertOverlay.classList.remove("show");
  alertLocked = true;
};

// ===== Listen to mat =====
db.ref("lumicare/mat_status").on("value", snap => {
  const data = snap.val();
  if (!data) return;

  if (data.active && !alertLocked) {
    statusPill.textContent = "Out of Bed";
    statusPill.className = "status out";
    alertMessage.textContent = "User has been out of bed too long.";
    alertOverlay.classList.add("show");
    lastActive.textContent = new Date().toLocaleTimeString();
  }

  if (!data.active) {
    statusPill.textContent = "Safe / In Bed";
    statusPill.className = "status safe";
    alertLocked = false;
    alertOverlay.classList.remove("show");
  }
});
