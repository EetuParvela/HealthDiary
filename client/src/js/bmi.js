// Prevent seeing the webpage if not logged in
const checkLogin = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }
};
checkLogin();

const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  })
}

const calculateBMI = () => {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const resultText = document.querySelector('.result-box h2');
  const rows = document.querySelectorAll('.bmi-table tr');

  if (!weight || !height || height <= 0) {
    alert('Syötä kelvollinen pituus ja paino.');
    return;
  }

  // Calculate BMI
  const bmi = (weight / (height * height)).toFixed(1);

  resultText.innerHTML = `Tuloksesi: ${bmi}`;

  // Reset table highlights
  rows.forEach((row) => (row.style.backgroundColor = ''));
  rows.forEach((row) => (row.style.color = ''));

  if (bmi < 19) {
    highlightRow(rows[0], '#f1c40f');
  } else if (bmi >= 19 && bmi <= 24.9) {
    highlightRow(rows[1], '#2ecc71');
  } else {
    highlightRow(rows[2], '#e67e22');
  }

  document.querySelector('.result-box').classList.add('active');
  setTimeout(() => {
    document.querySelector('.result-box').classList.remove('active');
  }, 500);
};

const highlightRow = (row, color) => {
  row.style.backgroundColor = color;
  row.style.color = 'white';
  row.style.fontWeight = 'bold';
};

document.querySelector('.btn').addEventListener('click', calculateBMI);
