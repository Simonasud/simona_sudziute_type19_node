document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Čia galite pridėti prisijungimo logiką, pavyzdžiui, siųsti užklausą į serverį
    console.log('Email:', email);
    console.log('Password:', password);
  });
});
